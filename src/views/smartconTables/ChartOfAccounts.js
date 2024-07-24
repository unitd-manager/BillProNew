import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import { Link } from 'react-router-dom';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';

const ChartOfAccounts = () => {
  //Const Variables
  const [chartofaccounts, setChartOfAccounts] = useState(null);
  const [loading, setLoading] = useState(false);


  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
const selectedLanguage = getSelectedLanguageFromLocalStorage();

// Use the selected language value as needed
console.log('Selected language from localStorage:', selectedLanguage);

const [arabic, setArabic] = useState([]);

const arb =selectedLanguage === 'Arabic'

const getArabicCompanyName = () => {
  api
  .get('/translation/getTranslationForCompanyAcc')
  .then((res) => {
    setArabic(res.data.data);
  })
  .catch(() => {
    // Handle error if needed
  });   
};

console.log('arabic',arabic)
useEffect(() => {
getArabicCompanyName();
}, []);

let genLabel = '';

if (arb === true) {
  genLabel = 'arb_value';
} else {
  genLabel = 'value';
}


  // get Chart Of Accounts List
  const getChartOfAccounts = (language) => {
    api
      .get('/chartofaccounts/getChartOfAccounts', { params: { language } })
      .then((res) => {
        setChartOfAccounts(res.data.data);
        $('#example').DataTable({
          pagingType: 'full_numbers',
          pageLength: 20,
          processing: true,
          dom: 'Bfrtip',
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getChartOfAccounts(selectedLanguage);
  }, [selectedLanguage]);



  //  stucture of Chart Of Accounts list view
  const columns = [

    {
      name: arabic.find(item => item.key_text === 'mdChartAcc.Id')?.[genLabel],
      selector: 'acc_head_id',
      grow: 0,
      wrap: true,
      width: '4%',
    },
  
    {
      name: arabic.find(item => item.key_text === 'mdChartAcc.Edit')?.[genLabel],
      selector: 'edit',
      cell: () => <Icon.Edit2 />,
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
   
    {
      name:  arabic.find(item => item.key_text === 'mdChartAcc.Title')?.[genLabel],
      selector: 'title',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name:  arabic.find(item => item.key_text === 'mdChartAcc.Category')?.[genLabel],
      selector: 'category_title',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdChartAcc.Code')?.[genLabel],
      selector: 'code',
      sortable: true,
      grow: 0,
    },
      
  ];



  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />
       
        <CommonTable
          loading={loading}
          title="Chart Of Account List"
          module='ChartOfAccount'
          Button={
            <Link to="/ChartOfAccountDetails">
              <Button color="primary" className="shadow-none mr-2">
                New
              </Button>
            </Link>
          }
        >
          <thead>

            <tr>
              
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          
          </thead>

          <tbody>
            {chartofaccounts &&
              chartofaccounts.map((element, i) => {
                return (
                  
                  <tr key={element.acc_head_id}>
                    <td>{i + 1}</td>
                    <td>
                      <Link to={`/ChartofACEdit/${element.acc_head_id}`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{arb && element.title_arb ? element.title_arb : element.title}</td>
                    <td>{arb && element.category_arb ? element.category_arb : element.category}</td>
                    <td>{element.code}</td>
                    </tr>
                );
              })}
          </tbody>
        
        </CommonTable>
    
       
      </div>
    </div>
  );
};

export default ChartOfAccounts;

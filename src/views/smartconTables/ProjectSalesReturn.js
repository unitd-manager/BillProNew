import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import { Link } from 'react-router-dom';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';

const ProjectSalesReturn = () => {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(false);
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  const selectedLanguage = getSelectedLanguageFromLocalStorage();

  const getOrders = () => {
    api
      .get('/projectsalesreturn/getSalesReturns')
      .then((res) => {
        setInvoice(res.data.data);
        setLoading(false);
      }) 
      .catch(() => {
        setLoading(false);
      });
  };
  const [arabic, setArabic] = useState([]);


  const arb =selectedLanguage === 'Arabic'

  // const eng =selectedLanguage === 'English'
   

  const getArabicCompanyName = () => {
      api
      .get('/projectsalesreturn/getTranslationforTradingProjSalesReturn')
      .then((res) => {
        setArabic(res.data.data);
      })
      .catch(() => {
        // Handle error if needed
      });   
  };
  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }
 
  useEffect(() => {
    getOrders();
    getArabicCompanyName();

  }, []);

  const columns = [
    {
      name: '#',
      selector: '',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
       name: arb ? 'يحرر' : 'Edit' ,

      selector: 'edit',
      cell: () => <Icon.Edit2 />,
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
    {
      name: arabic.find(item => item.key_text === 'mdTradingSalesReturn.Invoice Code')?.[genLabel],
      selector: 'project_invoice_id',
      sortable: true,
      grow: 0,
      wrap: true,
      
    
    },
   
    {
    name: arabic.find(item => item.key_text === 'mdTradingSalesReturn.Date')?.[genLabel],
    selector: 'return_date',
    sortable: true,
    grow: 0,
    wrap: true,
    
    
    },
    {
    name: arabic.find(item => item.key_text === 'mdTradingSalesReturn.Status')?.[genLabel],
    selector: 'status',
    sortable: true,
    grow: 0,
    wrap: true,
           
    },

  ];

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />
        <CommonTable 
          loading={loading}
          title={arb ?'قائمة إرجاع المبيعات':'Sales Return List'}
          module='Sales Return'
          Button={
            <Link to="/ProjectReturnDetails">
              <Button color="primary" className="shadow-none">
              {arb ?'اضف جديد':'Add New'}
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
            {invoice &&
              invoice.map((element, index) => {
                return (
                  <tr key={element.proj_sales_return_id }>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/ProjectReturnEdit/${element.proj_sales_return_id }/${element.project_invoice_id }`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.project_invoice_code}</td>
                   <td>{element.return_date}</td>
                    <td>{element.status}</td>
                   
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
};

export default ProjectSalesReturn;

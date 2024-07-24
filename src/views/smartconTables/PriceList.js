import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import moment from 'moment';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
// import 'datatables.net-buttons/js/buttons.html5';
// import 'datatables.net-buttons/js/buttons.print';
import { Link } from 'react-router-dom';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';

const Leaves = () => {
  //Const Variables
  const [planning, setPlanning] = useState(null);
  const [loading, setLoading] = useState(false);

  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
  const selectedLanguage = getSelectedLanguageFromLocalStorage();


  // get Leave
  const getPlanning = () => {
    api
      .get('/pricelistitem/getPriceList')
      .then((res) => {
        setPlanning(res.data.data);
        $('#example').DataTable({
          pagingType: 'full_numbers',
          pageLength: 20,
          processing: true,
          dom: 'Bfrtip',
          // buttons: [
          //   {
          //     extend: 'print',
          //     text: 'Print',
          //     className: 'shadow-none btn btn-primary',
          //   },
          // ],
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getPlanning();
  }, []);

  const [arabic, setArabic] = useState([]);


  const arb =selectedLanguage === 'Arabic'

  // const eng =selectedLanguage === 'English'
   

  const getTranslationForPriceList = () => {
      api
      .get('/pricelistitem/getTranslationForPriceList')
      .then((res) => {
        setArabic(res.data.data);
      })
      .catch(() => {
        // Handle error if needed
      });   
  };


  useEffect(() => {
    getTranslationForPriceList();
  }, []);

  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }

  //  stucture of leave list view
  const columns = [
    {
      name:arabic.find(item => item.key_text === 'mdPriceList.ID')?.[genLabel],
      selector: 'price_list_id',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: arabic.find(item => item.key_text === 'mdPriceList.Edit')?.[genLabel],
      selector: 'edit',
      cell: () => <Icon.Edit2 />,
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },

    {
      name: arabic.find(item => item.key_text === 'mdPriceList.CustomerName')?.[genLabel], 
      selector: 'customer_name',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdPriceList.EffectiveDate')?.[genLabel],
      selector: 'effective_date',
      sortable: true,
      grow: 2,
      width: 'auto',
    },
    {
      name: arabic.find(item => item.key_text === 'mdPriceList.Status')?.[genLabel],
      selector: 'status',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    
  ];

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />
        <CommonTable
          loading={loading}
          title={arb ? 'قائمة الاسعار': 'Price List'}
          module='Price List'
          Button={
            <Link to="/PriceListDetails">
              <Button color="primary" className="shadow-none mr-2">
                Add New
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
            {planning &&
              planning.map((element, i) => {
                return (
                  <tr key={element.price_list_id}>
                    <td>{i + 1}</td>
                    <td>
                      <Link to={`/PriceListEdit/${element.price_list_id}?tab=1`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{arb && element.customer_name_arb ?element.customer_name_arb : element.customer_name}</td>
                    <td>{(element.effective_date)?moment(element.effective_date).format('DD-MM-YYYY'):''}</td>
                    <td>{arb && element.status_arb ?element.status_arb : element.status}</td>
                    </tr>
                );
              })}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
};

export default Leaves;

import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
// import 'datatables.net-buttons/js/buttons.html5';
// import 'datatables.net-buttons/js/buttons.print';
import { Link } from 'react-router-dom';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';

const PurchaseReturn = () => {
  const [tenders, setTenders] = useState(null);
  const [loading, setLoading] = useState(false);

  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
  const selectedLanguage = getSelectedLanguageFromLocalStorage();

  const [arabic, setArabic] = useState([]);


  const arb =selectedLanguage === 'Arabic'

  //const eng =selectedLanguage === 'English'
  

  const getArabicCompanyName = () => {
      api
      .get('/purchasereturn/getTranslationForPurchaseReturn')
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

  const getTenders = () => {
    api
      .get('/purchasereturn/getPurchaseReturn')
      .then((res) => {
        setTenders(res.data.data);
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
    getTenders();
    getArabicCompanyName();
  }, []);

  const columns = [
    {
      name: '#',
      selector: 'purchase_return_id',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: 'Edit',
      selector: 'edit',
      cell: () => <Icon.Edit2 />,
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
    {
      name: arabic.find((item) => item.key_text === 'mdPurchaseReturn.PurchaseReturnCode')?.[genLabel],
      selector: 'purchase_return_code',
      sortable: true,
      grow: 0,
      wrap: true,
    },

    {
      name: arabic.find((item) => item.key_text === 'mdPurchaseReturn.PoCode')?.[genLabel],
      selector: 'po_code',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: arabic.find((item) => item.key_text === 'mdPurchaseReturn.Return Date')?.[genLabel],
      selector: 'purchase_return_date',
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
          title={arb ?'قائمة إرجاع المشتريات':'Purchase Return List'}
          module='Purchase Return'
          Button={
            <Link to="/PurchaseReturnDetails">
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
            {tenders &&
              tenders.map((element, index) => {
                return (
                  <tr key={element.purchase_return_id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/PurchaseReturnEdit/${element.purchase_return_id}/${element.purchase_order_id}?tab=1`}>
                        <Icon.Edit2/>
                      </Link>
                    </td>
                   
                    <td>{arb?element.purchase_invoice_code_arb:element.purchase_return_code}</td>
                    <td>{arb?element.po_code_arb:element.po_code}</td>
                    <td>{element.purchase_return_date}</td>
                   
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
};

export default PurchaseReturn;

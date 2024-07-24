import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';

const PurchaseInvoice = () => {
  //All state variable
  const [purchaseinvoicedata, setPurchaseInvoiceData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };

  const selectedLanguage = getSelectedLanguageFromLocalStorage();
  //Get data from Training table
  const getPurchaseInvoice= () => {
    api
      .get('/purchaseinvoice/getPurchaseInvoice')
      .then((res) => {
        setPurchaseInvoiceData(res.data.data);
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
 const [arabic, setArabic] = useState([]);


  const arb =selectedLanguage === 'Arabic'

  const getArabicCompanyName = () => {
    api
    .get('/purchaseinvoice/getTranslationForPurchaseInvoiceList')
    .then((res) => {
      setArabic(res.data.data);
    })
    .catch(() => {
      // Handle error if needed
    });   
};

  useEffect(() => {
    getPurchaseInvoice();
    getArabicCompanyName();
  }, []);
  //structure of Training list view
  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }

  const columns = [
    {
      name: 'id',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: 'Edit',
      selector: 'edit',
      cell: () => (
        <Link to="/">
          <Icon.Edit3 />
        </Link>
      ),
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
    {
      name: arabic.find(item => item.key_text === 'mdPurchaseInvoice.Invoice Code')?.[genLabel],
      selector: 'purchase_invoice_code',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
        name: arabic.find(item => item.key_text === 'mdPurchaseInvoice.Project Title')?.[genLabel],
        selector: 'title',
        grow: 0,
        wrap: true,
        width: '4%',
      },
      {
        name: arabic.find(item => item.key_text === 'mdPurchaseInvoice.Client Name')?.[genLabel],
        selector: 'company_name',
        sortable: true,
        grow: 0,
        wrap: true,
      },
    {
      name: arabic.find(item => item.key_text === 'mdPurchaseInvoice.Invoice Date')?.[genLabel],
      selector: 'purchse_invoice_date',
      grow: 0,
      wrap: true,
      width: '4%',
    },

    {
      name: arabic.find(item => item.key_text === 'mdPurchaseInvoice.Amount')?.[genLabel],
      selector: 'invoice_amount',
      sortable: true,
      grow: 0,
      wrap: true,
    },
      {
        name: arabic.find(item => item.key_text === 'mdPurchaseInvoice.Due Date')?.[genLabel],
        selector: 'due_date',
        sortable: true,
        grow: 0,
        wrap: true,
      },
      {
        name: arabic.find(item => item.key_text === 'mdPurchaseInvoice.Status')?.[genLabel],
        selector: 'status',
        sortable: true,
        grow: 0,
        wrap: true,
      },
    
  ];
  return (
    <div className="container pt-xs-25">
      <BreadCrumbs />
      <ToastContainer></ToastContainer>
      <CommonTable
        loading={loading}
        title="Purchase Invoice"
        module='Purchase Invoice'
        Button={
          <Link to="/PurchaseInvoiceDetails">
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
          {purchaseinvoicedata &&
            purchaseinvoicedata.map((element, index) => {
              return (
                <tr key={element.purchase_invoice_id}>
                  <td>{index + 1}</td>
                  <td>
                    <Link to={`/PurchaseInvoiceEdit/${element.purchase_invoice_id }`}>
                      <Icon.Edit2 />
                    </Link>
                  </td>
                  <td>{arb ? element.purchase_invoice_code_arb : element.purchase_invoice_code}</td>
                  <td>{arb ? element.title_arb : element.title}</td>
                  <td>{arb ? element.company_name_arb : element.company_name}</td>
                  <td>{moment(element.purchse_invoice_date).format('YYYY-MM-DD')}</td>
                  <td>{arb ? element.invoice_amount_arb : element.invoice_amount}</td>
                  <td>{element.due_date}</td>
                  <td>{arb ? element.status_arb : element.status}</td>
                </tr>
              );
            })}
        </tbody>
      </CommonTable>
    </div>
  );
};
export default PurchaseInvoice;

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
// import moment from 'moment'; 
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';

const Opportunity = () => {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(false);
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  const selectedLanguage = getSelectedLanguageFromLocalStorage();

  const getinvoice = () => {
    api
      .get('/projectsalesinvoice/getProjectInvoices')
      .then((res) => {
        setInvoice(res.data.data);
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

  // const eng =selectedLanguage === 'English'
   

  const getArabicCompanyName = () => {
      api
      .get('/projectsalesinvoice/getTranslationforProjectSalesInvoice')
      .then((res) => {
        setArabic(res.data.data);
      })
      .catch(() => {
        // Handle error if needed
      });   
  };

  useEffect(() => {
    getinvoice();
    getArabicCompanyName();
  }, []);
  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }

  const columns = [
    {
      name: '#',
      selector: '',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: arabic.find(item => item.key_text === 'mdProjectSalesInvoice.Edit')?.[genLabel],
      selector: 'edit',
      cell: () => <Icon.Edit2 />,
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
    {
      name: arabic.find(item => item.key_text === 'mdProjectSalesInvoice.InvoiceCode')?.[genLabel], 
      selector: 'invoice_code',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    // {
    //   name: 'Source Code',
    //   selector: 'source_code',
    //   sortable: true,
    //   grow: 0,
    //   wrap: true,
    // },
    {
      name:arabic.find(item => item.key_text === 'mdProjectSalesInvoice.CompanyName')?.[genLabel],
      selector: 'company_name',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name:arabic.find(item => item.key_text === 'mdProjectSalesInvoice.InvoiceDate')?.[genLabel],
      selector: 'invoice_date',
      sortable: true,
      grow: 0,
    },
    {
      name:arabic.find(item => item.key_text === 'mdProjectSalesInvoice.InvoiceAmount')?.[genLabel],
      selector: 'invoice_amount',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name:arabic.find(item => item.key_text === 'mdProjectSalesInvoice.InvoiceDueDate')?.[genLabel],
     selector: 'invoice_due_date',
      sortable: true,
      grow: 2,
      width: 'auto',
    },
    {
      name:arabic.find(item => item.key_text === 'mdProjectSalesInvoice.Status')?.[genLabel],
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
          title={arb ?'قائمة فاتورة المشروع':'Project Invoice List'}
          module='Project Invoice'
          Button={
            <Link to="/ProjectSalesInvoiceDetails">
              <Button color="primary" className="shadow-none mr-2">
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
                  <tr key={element.project_invoice_id }>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/ProjectSalesInvoiceEdit/${element.project_invoice_id }/${element.project_invoice_source_id}?tab=1`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.project_invoice_code}</td>
                    {/* <td>
                    {element.source_type === 'Goods_Delivery' && element.goods_delivery_code}
                      {element.source_type === 'Sales_Order' && element.order_code}
                      {!element.source_type && 'No Source'}
                    </td> */}
                    <td>{arb && element.company_name_arb ?element.company_name_arb : element.company_name}</td>
                    <td>{arb && element.project_invoice_date_arb ?element.project_invoice_date_arb : element.project_invoice_date}</td>
                    <td>{arb && element.project_invoice_amount ?element.project_invoice_amount : element.project_invoice_amount}</td>
                    <td>{arb && element.project_invoice_due_date_arb ?element.project_invoice_due_date_arb : element.project_invoice_due_date}</td>
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

export default Opportunity;

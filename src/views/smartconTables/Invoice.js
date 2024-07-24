import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net-buttons/js/buttons.colVis';
import moment from 'moment';
import 'datatables.net-buttons/js/buttons.flash';
// import 'datatables.net-buttons/js/buttons.html5';
// import 'datatables.net-buttons/js/buttons.print';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';

//geting data from invoice
const InvoiceData = () => {
  //State variable
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(false);

  //getting data from invoice table
  const getInvoice = () => {
    api
      .get('/invoice/getMainInvoice')
      .then((res) => {
        setInvoice(res.data.data);
        console.log(res.data.data);
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
    getInvoice();
  }, []);
  //Structure of Invoice list view
  const columns = [
    {
      name: '#',
      grow: 0,
      wrap: true,
      width: '4%',
    },

    {
      name: 'Invoice Code',
      selector: 'invoice_code',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Project Name',
      selector: 'project_title',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Client Name',
      selector: 'company_name',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'Invoice Date',
      selector: 'invoice_date',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Amount',
      selector: 'invoice_amount',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'Due Date',
      selector: 'invoice_due_date',
      sortable: true,
      grow: 2,
      width: 'auto',
    },
    {
      name: 'Age',
      selector: 'age',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
      width: 'auto',
    },
    {
      name: 'Type',
      selector: 'invoice_type',
      sortable: true,
      width: 'auto',
    },
  ];
  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />

        <CommonTable loading={loading} title="Invoice List">
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
                  <tr key={element.invoice_id}>
                    <td>{index + 1}</td>
                    <td>{element.invoice_code}</td>
                    <td>{element.project_title}</td>
                    <td>{element.company_name}</td>
                    <td>{moment(element.invoice_date).format('YYYY-MM-DD')}</td>
                    <td>{element.invoice_amount}</td>
                    <td>{moment(element.invoice_due_date).format('YYYY-MM-DD')}</td>
                    <td>{element.age}</td>
                    <td>{element.status}</td>
                    <td>{element.invoice_type}</td>
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
};
export default InvoiceData;

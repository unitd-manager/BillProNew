import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';

import moment from 'moment';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { Link } from 'react-router-dom';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';

const Finance = () => {
  //All State Variable
  const [finance, setFinance] = useState(null);
  const [loading, setLoading] = useState(false)

  //getting data from Finance
  const getFinance = () => {
    api.get('/finance/getFinances').then((res) => {
      setFinance(res.data.data);
    
      setLoading(false)
    }).catch(()=>{
      setLoading(false)
    });
  };

  useEffect(() => {
    // setTimeout(() => {
    //   $('#example').DataTable({
    //     pagingType: 'full_numbers',
    //     pageLength: 20,
    //     processing: true,
    //     dom: 'Bfrtip',
    //     buttons: [
    //       'csv',
    //       {
    //         extend: 'print',
    //         text: 'Print',
    //         className: 'shadow-none btn btn-primary',
    //       },
    //     ],
    //   });
    // }, 1000);

    getFinance();
  }, []);

  const columns = [
    {
      name: '#',
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
      name: 'Order Id',
      selector: 'order_id',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Bill NO',
      selector: 'bill_number',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Company Name',
      selector: 'company_name',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Order Date',
      selector: 'order_date',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'Invoice Date',
      selector: 'invoice_date',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'Order Type',
      selector: 'source_type',
      sortable: true,
      grow: 2,
      width: 'auto',
    },
    {
      name: 'Invoice Amount',
      selector: 'invoice_amount',
      sortable: true,
      width: 'auto',
    },

    {
      name: 'Status',
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
        title="Finance List">
          <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {finance &&
              finance.map((element, index) => {
                return (
                  <tr key={element.order_id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/FinanceEdit/${element.order_id}?tab=1`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.order_id}</td>
                    <td>{element.bill_number}</td>
                    <td>{element.company_name}</td>
                    <td>{(element.order_date)? moment(element.order_date).format('DD-MM-YYYY'):''}</td>
                    <td>{(element.invoice_date)? moment(element.invoice_date).format('DD-MM-YYYY'):''}</td>
                    <td>{element.source_type}</td>
                    <td>{element.invoice_amount}</td>
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

export default Finance;

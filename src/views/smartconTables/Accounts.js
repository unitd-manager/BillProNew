import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import moment from 'moment';
import { Link } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
// import 'datatables.net-buttons/js/buttons.html5';
// import 'datatables.net-buttons/js/buttons.print';
import api from '../../constants/api';

const Accounts = () => {
  const [accounts, setAccounts] = useState(null);
  const [loading, setLoading] = useState(false);

  //  get Accounts
  const getAccounts = () => {
    api
      .get('/accounts/getAccounts')
      .then((res) => {
        setAccounts(res.data.data);
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
    getAccounts();
  }, []);

  const columns = [
    {
      name: 'id',
      selector: 'expense_id',
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
      name: 'Date',
      selector: 'date',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Description',
      selector: 'description',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'Amount',
      selector: 'total_amount',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Type',
      selector: 'type',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'Head',
      selector: 'group',
      sortable: true,
      grow: 2,
      width: 'auto',
    },
    {
      name: 'Sub Head',
      selector: 'sub_group',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'Status',
      selector: 'payment_status',
      sortable: true,
      width: 'auto',
    },
    {
      name: 'Updated By',
      selector: 'modified_by',
      sortable: true,
      width: 'auto',
    },
  ];

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />

        <CommonTable
          loading={loading}
          title="Account List"
          module='Accounts'
          Button={
            <Link to="/AccountDetails">
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
            {accounts &&
              accounts.map((element, index) => {
                return (
                  <tr key={element.expense_id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/AccountsEdit/${element.expense_id}`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{moment(element.date).format('DD-MM-YYYY')}</td>
                    <td>{element.description}</td>
                    <td>{element.total_amount}</td>
                    <td>{element.type}</td>
                    <td>{element.type === 'Expense' ? element.group_name : element.income_group_name}</td>
<td>{element.type === 'Expense' ? element.sub_group_name : element.income_sub_group_name}</td>
                    <td>{element.payment_status}</td>
                    <td>{element.modified_by}</td>
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
};

export default Accounts;

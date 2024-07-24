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

const ExpenseHead = () => {
  //Const Variables
  const [accounts, setExpensehead] = useState(null);
  const [loading, setLoading] = useState(false);

  // get ExpenseHead
  const getExpensehead = () => {
    api
      .get('/expensehead/getExpenseHead')
      .then((res) => {
        setExpensehead(res.data.data);
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
    getExpensehead();
  }, []);
  //  stucture of expenseHead list view
  const columns = [
    {
      name: 'id',
      selector: 'expense_group_id',
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
      name: 'Title',
      selector: 'title',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: '	Updated By',
      selector: 'modification_date',
      sortable: true,
      grow: 2,
      wrap: true,
    },
  ];

  return (
    <div className="MainDiv">
      {/* ExpenseHeadDetails */}
      <div className=" pt-xs-25">
        <BreadCrumbs />

        <CommonTable
          loading={loading}
          title="Expense Head List"
          module="Expense Head"
          Button={
            <Link to="/ExpenseHeadDetails">
              <Button color="primary" className=" shadow-none mr-2">
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
              accounts.map((element) => {
                return (
                  <tr key={element.expense_group_id}>
                    <td>{element.expense_group_id}</td>
                    <td>
                      <Link to={`/ExpenseHeadEdit/${element.expense_group_id}`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.title}</td>
                    <td>{element.modification_date}</td>
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
};

export default ExpenseHead;

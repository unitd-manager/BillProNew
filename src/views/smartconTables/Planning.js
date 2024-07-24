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

  // get Leave
  const getPlanning = () => {
    api
      .get('/planning/getPlanning')
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
  //  stucture of leave list view
  const columns = [
    {
      name: 'id',
      selector: 'project_planning_id',
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
      name: 'Code',
      selector: 'code',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Title',
      selector: 'title',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'Customer',
      selector: 'customer',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Date',
      selector: 'date',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'Due Date',
      selector: '	due_date',
      sortable: true,
      grow: 2,
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
          title="Planning List"
          module='Planning'
          Button={
            <Link to="/PlanningDetails">
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
                  <tr key={element.project_planning_id}>
                    <td>{i + 1}</td>
                    <td>
                      <Link to={`/PlanningEdit/${element.project_planning_id}?tab=1`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.code}</td>
                    <td>{element.title}</td>
                    <td>{element.customer}</td>
                    <td>{(element.date)?moment(element.date).format('DD-MM-YYYY'):''}</td>
                    <td>{(element.due_date)?moment(element.due_date).format('DD-MM-YYYY'):''}</td>
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

export default Leaves;

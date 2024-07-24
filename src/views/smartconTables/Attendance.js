import React, {useState, useEffect } from 'react';
import * as Icon from 'react-feather';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
// import 'datatables.net-buttons/js/buttons.html5';
// import 'datatables.net-buttons/js/buttons.print';
import { Link } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';
import api from '../../constants/api';

const Attendance = () => {

const [data, setData] = useState([]);

const getAttendance = () => {
  api
  .get('/attendance/getAllEmployeeData')
  .then(res => {
    setData(res.data.data);
  })
  .catch(() => {
    alert('Network connection error.');
  });
};

  useEffect(() => {
    setTimeout(() => {
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
    }, 1000);

    getAttendance();
  }, []);

  
  const columns = [
    {
      name: 'id',
      selector: 'opportunity_id',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: 'View',
      selector: 'view',
      cell: () => <Icon.Eye />,
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
    {
      name: 'Employee Name',
      selector: 'emp_name',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Project Name',
      selector: 'title',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Staff Id',
      selector: 'staff_id',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'Date',
      selector: 'date',
      sortable: true,
      width: 'auto',
    },
  ];
  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />

        <CommonTable title="Attendance List">
          <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
          {data &&
              data.map((ele) => {
                return (
                  <tr key={ele.id}>
                    <td>{ele.id}</td>
                    <td>
                      <Link to={`/AttendanceEdit/${ele.id}?tab=1`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{ele.first_name}</td>
                    <td>{ele.title}</td>
                    <td>{ele.staff_id}</td>
                    <td>{ele.date}</td>
                  </tr>
                );
              })}
          </tbody>
          <tfoot>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </tfoot>
        </CommonTable>
      </div>
    </div>
  );
};

export default Attendance;
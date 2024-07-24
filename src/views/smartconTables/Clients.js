import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Row, Col, Button } from 'reactstrap';
import Swal from 'sweetalert2';
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

const Claints = () => {
  const [clients, setClients] = useState(null);
  const [loading, setLoading] = useState(false);

  const getClients = () => {
    api
      .get('/clients/getClients')
      .then((res) => {
        setClients(res.data.data);
        $('#example').DataTable({
          pagingType: 'full_numbers',
          pageLength: 20,
          processing: true,
          dom: 'Bfrtip',
        //   buttons: [
        //     {
        //       extend: 'print',
        //       text: 'Print',
        //       className: 'shadow-none btn btn-primary',
        //     },
        //   ],
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getClients();
  }, []);

  const columns = [
    {
      name: '#',
      selector: 'company_id',
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
      name: 'Del',
      selector: 'delete',
      cell: () => <Icon.Trash />,
      grow: 0,
      width: 'auto',
      wrap: true,
    },
    {
      name: 'Name',
      selector: 'company_name',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Email',
      selector: 'email',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Phone',
      selector: 'phone',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
  ];

  const deleteRecord = (id) => {
    Swal.fire({
      title: `Are you sure? ${id}`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        api.post('/clients/deleteCompany', { company_id: id }).then((res) => {
          console.log(res);
          Swal.fire('Deleted!', 'Your Tender has been deleted.', 'success');
          getClients();
        });
      }
    });
  };

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />
        <Row>
          <Col md="6">
            <Link to="/ClientsDetails">
              <Button color="primary" className="shadow-none mr-2">
                New
              </Button>
            </Link>
          </Col>
        </Row>
        <CommonTable loading={loading} title="Client List" module='Client'>
          <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {clients &&
              clients.map((element) => {
                return (
                  <tr key={element.company_id}>
                    <td>{element.company_id}</td>
                    <td>
                      <Link to={`/ClientsEdit/${element.company_id}`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>
                      <Link to="">
                        <span onClick={() => deleteRecord(element.company_id)}>
                          <Icon.Trash2 />
                        </span>
                      </Link>
                    </td>
                    <td>{element.company_name}</td>
                    <td>{element.email}</td>
                    <td>{element.status}</td>
                    <td>{element.phone}</td>
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>{' '}
      </div>
    </div>
  );
};

export default Claints;

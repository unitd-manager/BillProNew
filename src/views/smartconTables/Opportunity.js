import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Button } from 'reactstrap';
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
import CommonTable from '../../components/CommonTable';

const Test = () => {
  const [tenders, setTenders] = useState(null);
  const getTenders = () => {
    api.get('/tender/getTenders').then((res) => {
      setTenders(res.data.data);
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

    getTenders();
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
      name: 'Code',
      selector: 'opportunity_code',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Project',
      selector: 'title',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'Ref No',
      selector: 'office_ref_no',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Main Con',
      selector: 'company_name',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'Actual Closing',
      selector: 'closinactual_closing',
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
    {
      name: 'Quoted By',
      selector: 'quote_ref',
      sortable: true,
      width: 'auto',
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
        api.post('/tender/deleteTender', { opportunity_id: id }).then(() => {
          Swal.fire('Deleted!', 'Your Tender has been deleted.', 'success');
          getTenders();
        });
      }
    });
  };

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />

        <CommonTable
          title="Tender List"
          module='Tender'
          Button={
            <Link to="/TenderDetails">
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
              tenders.map((element) => {
                return (
                  <tr key={element.opportunity_id}>
                    <td>{element.opportunity_id}</td>
                    <td>
                      <Link to={`/TenderEdit/${element.opportunity_id}?tab=1`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>
                      <Link to="">
                        <span onClick={() => deleteRecord(element.opportunity_id)}>
                          <Icon.Trash2 />
                        </span>
                      </Link>
                    </td>
                    <td>{element.opportunity_code}</td>
                    <td>{element.title}</td>
                    <td>{element.office_ref_no}</td>
                    <td>{element.company_name}</td>
                    <td>{element.closinactual_closing}</td>
                    <td>{element.status}</td>
                    <td>{element.quote_ref}</td>
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

export default Test;

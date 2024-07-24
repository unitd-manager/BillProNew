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

const UoM = () => {
  const [uom, setUoM] = useState(null);
  const getUoM = () => {
    api.get('/uom/getUoM').then((res) => {
        setUoM(res.data.data);
    });
  };

  useEffect(() => {
    setTimeout(() => {
      $('#example').DataTable({
        pagingType: 'full_numbers',
        pageLength: 20,
        processing: true,
        dom: 'Bfrtip',
        
      });
    }, 1000);

    getUoM();
  }, []);

  const columns = [
    {
      name: 'id',
      selector: 'uom_id',
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
      selector: 'uom_code',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Name',
      selector: 'uom_name',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Symbol',
      selector: 'uom_symbol',
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

    
  ];

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />

        <CommonTable
          title="UoM List"
          module='UoM'
          Button={
            <Link to="/UomDetails">
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
            {uom &&
              uom.map((element) => {
                return (
                  <tr key={element.uom_id}>
                    <td>{element.uom_id}</td>
                    <td>
                      <Link to={`/UomEdit/${element.uom_id}?tab=1`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.uom_code}</td>
                    <td>{element.uom_name}</td>
                    <td>{element.uom_symbol}</td>
                    <td>{element.status}</td>
                    
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

export default UoM;

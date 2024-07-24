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
import CommonTable from '../../components/CommonTable';

const Vehicle = () => {
  // All state variables
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(false);

  //Api call for getting Vehicle Data
  const getVehicleData = () => {
    api
      .get('/vehicle/getVehicle')
      .then((res) => {
        setVehicle(res.data.data);
        $('#example').DataTable({
          pagingType: 'full_numbers',
          pageLength: 20,
          processing: true,
          dom: 'Bfrtip',
          // // buttons: [
          // //   {
          // //     extend: 'print',
          // //     text: 'Print',
          // //     className: 'shadow-none btn btn-primary',
          // //   },
          // ],
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getVehicleData();
  }, []);

  const columns = [
    {
      name: '#',
      selector: '',
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
      name: 'Vehicle No',
      selector: 'vehicle_no',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Year Of Purchase',
      selector: 'year_of_purchase',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'Model',
      selector: 'model',
      sortable: true,
      grow: 0,
    },
  ];

  return (
    <div className="MainDiv">
      <div className="pt-xs-25">
        <CommonTable
          loading={loading}
          title="VehicleList"
          module='Vehicle'
          Button={
            <Link to="/VehicleDetails">
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
            {vehicle &&
              vehicle.map((element, index) => {
                return (
                  <tr key={element.vehicle_id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/VehicleEdit/${element.vehicle_id}`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.vehicle_no}</td>
                    <td>{element.year_of_purchase}</td>
                    <td>{element.model}</td>
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
};
export default Vehicle;

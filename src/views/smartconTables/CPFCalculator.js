import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Col, Button } from 'reactstrap';
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
import message from '../../components/Message';

const CpfCalculator = () => {
  //All state variable
  const [cpfRecords, setCpfRecords] = useState(null);
  const [loading, setLoading] = useState(false);
  //Getting data from CpfRecords
  const getCpfRecords = () => {
    setLoading(true);
    api
      .get('/cpfCalculator/getCpfCalculatorRecords')
      .then((res) => {
        setCpfRecords(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        message('Unable to get Purchase Data');
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
    getCpfRecords();
  }, []);
  //Structure of CpfRecords list view
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
      cell: () => <Icon.Edit2 />,
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
    {
      name: 'Year',
      selector: 'year',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'From Age',
      selector: 'from_age',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'To Age',
      selector: 'to_age',
      sortable: true,
      grow: 0,
    },
    {
      name: 'CPF(Employer)',
      selector: 'by_employer',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'CPF(Employee)',
      selector: 'by_employee',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'SPR Year',
      selector: 'spr_year',
      sortable: true,
      width: 'auto',
      grow: 3,
    }
  ];
  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />

        <CommonTable
          loading={loading}
          title="Cpf Calculator List"
          module='CpfCalculator'
          Button={
            <>
              
                <Col md="6">
                  <Link to="/CpfCalculatorDetails">
                    <Button color="primary" className="shadow-none mr-2">
                      New
                    </Button>
                  </Link>
                </Col>
                
              
            </>
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
            {cpfRecords &&
              cpfRecords.map((element, index) => {
                return (
                  <tr key={element.cpf_calculator_id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/cpfCalculatorEdit/${element.cpf_calculator_id}`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.year}</td>
                    <td>{element.from_age}</td>
                    <td>{element.to_age}</td>
                    <td>{element.by_employer}</td>
                   
                    <td>{element.by_employee}</td>
                    <td>
                      {element.spr_year
                       }
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
};

export default CpfCalculator;

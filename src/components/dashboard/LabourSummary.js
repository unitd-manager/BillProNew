import React, { useState } from 'react';
import { Row, Col, Button, Input, FormGroup, Label, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import ComponentCard from '../ComponentCard';

import api from '../../constants/api';



const LabourSummary = () => {
  //All state variable
  const [labour, setLabour] = useState([]);
  const [userSearchData, setUserSearchData] = useState([]);
  const [requestType, setRequestType] = useState('');
  //Get data from Reports table

  const getLabour = () => {
    api
      .get('labourrequest/getLabourRequestSummary')
      .then((res) => {
        setLabour(res.data.data);
        
        
      })
      .catch(() => {});
  };

  const handleSearch = () => {
    const newData = labour.filter(
      (x) => x.request_type === (requestType === '' ? x.request_type : requestType),
    );
    setUserSearchData(newData);
  };
  //   const [page, setPage] = useState(0);

  //   const employeesPerPage = 20;
  //   const numberOfEmployeesVistited = page * employeesPerPage;
  //   const displayEmployees = userSearchData.slice(
  //     numberOfEmployeesVistited,
  //     numberOfEmployeesVistited + employeesPerPage,
  //   );
  //   const totalPages = Math.ceil(userSearchData.length / employeesPerPage);
  //   const changePage = ({ selected }) => {
  //     setPage(selected);
  //   };

  const columns = [
    {
      name: '#',
      selector: 's_no',
    },

    {
      name: 'Project Name',
      selector: 'title',
      grow: 0,
      wrap: true,
      width: '4%',
    },

    {
      name: 'Start Date',
      selector: 'request_start_date',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'End Date',
      selector: 'request_end_date',
      sortable: true,
      grow: 10,
      wrap: true,
    },
    {
      name: ' Request Urgency ',
      selector: 'request_urgency',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Request Type',
      selector: 'request_type',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'No Of Employee',
      selector: 'no_of_employees',
      sortable: true,
      grow: 0,
      wrap: true,
    },
  ];
  return (
    <>
<Row>
<Col md="12">
      <ComponentCard title="Labour Summary">
      
          <Row>

            <Col>
              <FormGroup>
                <Label>Request Type</Label>
                <Input
                  type="select"
                  name="request_type"
                  onChange={(e) => setRequestType(e.target.value)
                  
                  }
                >
                  <option value="Skilled">Skilled</option>
                  <option value="UnSkilled">UnSkilled</option>
                  <option value="Temporary">Temporary</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md="1" className="mt-3">
              <Button color="primary" className="shadow-none" onClick={() =>{ handleSearch()
              getLabour();}
              }>
                Go
              </Button>
            </Col>
          </Row>


          <Row>
          
            <Col md="3">
              <Label>
                <b> Request Type:</b>
                {requestType}
              </Label>
            </Col>
            
          </Row>
        

      
          <Table>
            <thead>
              <tr>
                {columns.map((cell) => {
                  return <td key={cell.name}>{cell.name}</td>;
                })}
              </tr>
            </thead>
            <tbody>
              {userSearchData &&
                userSearchData.map((element, index) => {
                  return (
                    <tr key={element.project_id}>
                      <td>{index + 1}</td>
                      <td>{element.title}</td>
                      <td>{element.request_start_date}</td>
                      <td>{element.request_end_date}</td>

                      <td>{element.request_urgency}</td>
                      <td>{element.request_type}</td>
                      <td>{element.no_of_employees}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        
      </ComponentCard>
      </Col>
      </Row>
    </>
  );
};
export default LabourSummary;

import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { useParams } from 'react-router-dom';
import * as Icon from 'react-feather';
import Swal from 'sweetalert2';
import CommonTable from '../CommonTable';
import ChooseEmployee from '../ProposalModal/ChooseEmployee';
import api from '../../constants/api';

const AddEmployee = () => {
  const { id } = useParams();
  const [chooseEmp, setChooseEmp] = useState(false);
  const [getemployeeLinked, setGetEmployeeLinked] = useState([]);

  const Employeecolumns = [
    {
      name: 'Id',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: 'Name',
      selector: 'name',
    },
    {
      name: 'Actions',
      grow: 0,
      wrap: true,
      width: '10%',
    },
  ];
  //getting Employee data by Employee id
  const getLinkedEmployee = () => {
    api.post('/proposal/getEmployeeById', { proposal_id: parseInt(id, 10) }) // Added radix parameter
      .then((res) => {
        console.log("res.data.data", res.data.data);
        setGetEmployeeLinked(res.data.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the employee data!", error);
      });
  };
  const deleteRecord = (deleteID) => {
    Swal.fire({
      title: `Are you sure? ${deleteID}`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        api.post('/proposal/deleteEmployeeTime', { proposal_employee_id: deleteID }).then(() => {
          Swal.fire('Deleted!', 'Your Employee has been deleted.', 'success');
          getLinkedEmployee(); // Refresh the data after deletion
        });
      }
    });
  };



  useEffect(() => {
    getLinkedEmployee();
  }, [id]);

  return (
    <>
      <Row>
        <Col md='10'>
          <CommonTable title="Add Employee"
            Button={
              <Button color="primary" className="shadow-none" onClick={() => { setChooseEmp(true) }}> Choose </Button>
            }>
            <thead>
              <tr>
                {Employeecolumns.map((cell) => {
                  return <td key={cell.name}>{cell.name}</td>;
                })}
              </tr>
            </thead>
            <tbody>
              {getemployeeLinked && getemployeeLinked.map((e) => {
                return (
                  <tr key={e.proposal_employee_id}>
                    <td>{e.proposal_employee_id}</td>
                    <td>{e.first_name}</td>
                    <td style={{ display: 'flex', justifyContent: 'center' }}>
                      <span
                        className="addline"
                        onClick={() => {
                          deleteRecord(e.proposal_employee_id);
                        }}
                      >
                        <Icon.Trash2 />
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </CommonTable>
        </Col>
      </Row>
      <ChooseEmployee chooseEmp={chooseEmp} setChooseEmp={setChooseEmp} getemployeeLinked={getemployeeLinked} />
    </>
  );
};

export default AddEmployee;
import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useParams } from 'react-router-dom';
import random from 'random';
import moment from 'moment';
import Select from 'react-select';
import PropTypes from 'prop-types';
import message from '../Message';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';

const ChooseEmployee = ({ chooseEmp, setChooseEmp, }) => {
  ChooseEmployee.propTypes = {
    chooseEmp: PropTypes.bool,
    setChooseEmp: PropTypes.func,
    //getemployeeLinked: PropTypes.any,
  };

  const { id } = useParams();
  const [employeeLinked, setEmployeeLinked] = useState([]);

  //Get employee name and id for linked employee select field
  const getEmployee = () => {
    api.get('/proposal/getEmployeeName').then((res) => {
      const items = res.data.data;
      const finaldat = items.map((item) => ({ value: item.employee_id, label: item.first_name }));
      setEmployeeLinked(finaldat);
    });
  };

  // Addline item in Link employee
  const [addLineItem, setAddLineItem] = useState([
    {
      id: random.int(1, 99),
      first_name: '',
      employee_id: '',
    },
  ]);

  //Onchange item in training staff employee name selectfield
  const onchangeItem = (str, itemId) => {
    setAddLineItem((prevAddLineItem) =>
      prevAddLineItem.map((item) =>
        item.id === itemId ? { ...item, first_name: str.label, employee_id: str.value.toString() } : item
      )
    );
  };

  // Add new line item in link Employee
  const AddNewLineItem = () => {
    setAddLineItem((prevAddLineItem) => [
      ...prevAddLineItem,
      {
        id: random.int(1, 99),
        first_name: '',
        employee_id: '',
      },
    ]);
  };

  

  // const addEmployeeToTimeSheet = (empObj) => {
  //   api
  //     .post('/proposal/getEmployeeId', { proposal_id: parseInt(id, 10) })
  //     .then((response) => {
  //       const employIds = response.data.data.map((item) => item.employee_id);
  //       console.log('employIds',employIds)
        
  //       if (employIds.includes(empObj.employee_id)) {
  //         message('Employee already linked to this proposal.', 'error');
  //       } else {
  //         api
  //           .post('/proposal/insertEmployee', empObj)
  //           .then((res) => {
  //             if (res.data.data.affectedRows === 1) {
  //               message('Employee Linked', 'success');
  //             }
  //           })
  //           .catch(() => {
  //             message('Unable to insert record.', 'error');
  //           });
  //       }
  //     })
  //     .catch(() => {
  //       message('Unable to fetch employee ID.', 'error');
  //     });
  // };

  const insertTrainingData = () => {
    // Get the list of existing linked employees for the proposal
    api.post('/proposal/getEmployeeId', { proposal_id: parseInt(id, 10) })
      .then((response) => {
        const existingEmployees = response.data.data.map((item) => item.employee_id);
  
        // Iterate through the added employees
        addLineItem.forEach((obj) => {
          if (!existingEmployees.includes(parseInt(obj.employee_id, 10))) {
            // Insert the employee if it's not already linked
            const newData = {
              proposal_id: parseInt(id, 10),
              employee_id: parseInt(obj.employee_id, 10),
              creation_date: creationdatetime,
              month: moment().month() + 1,
              year: moment().year(),
              day: moment().date(),
            };
  
            api.post('/proposal/insertEmployee', newData)
              .then((res) => {
                if (res.data.data.affectedRows === 1) {
                  message('Employee Linked', 'success');
                  setTimeout(() => {
                    window.location.reload();
                  }, 1000);
                }
              })
              .catch(() => {
                message('Unable to insert record.', 'error');
              });
          } else {
            message('Employee already linked to this proposal.', 'error');
          }
        });
      })
      .catch(() => {
        message('Unable to fetch employee IDs.', 'error');
      });
  };


  useEffect(() => {
    getEmployee();
  }, [id]);

  return (
    <>
      <Modal size="s" isOpen={chooseEmp}>
        <ModalHeader>
          Add Employee
          <Button
            color="secondary"
            onClick={() => {
              setChooseEmp(false);
            }}
          >
            X
          </Button>
        </ModalHeader>

        <ModalBody>
          <Row>
            <Col>
              <Button
                color="primary"
                className="shadow-none"
                type="button"
                onClick={() => {
                  AddNewLineItem();
                }}
              >
                Linked Employee
              </Button>
            </Col>
          </Row>
          <br />
          <Row>
            <table className="lineitem newemp border border-secondary rounded">
              <thead>
                <tr>
                  <th scope="col">Employee Name</th>
                </tr>
              </thead>
              <tbody>
                {addLineItem.map((item) => (
                  <tr key={item.id}>
                    <td data-label="Employee Name">
                      <Select
                        key={item.id}
                        defaultValue={{ value: item.employee_id, label: item.first_name }}
                        onChange={(e) => {
                          onchangeItem(e, item.id);
                        }}
                        options={employeeLinked}
                      />
                      <Input
                        value={item.employee_id.toString()}
                        type="hidden"
                        name="employee_id"
                      ></Input>
                    </td>
                    <td>
                      <Input type="hidden" name="id" defaultValue={item.id}></Input>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Row>
        </ModalBody>

        <ModalFooter>
          <Button
            color="primary"
            className="shadow-none"
            onClick={() => {
              insertTrainingData();
            }}
          >
            Save
          </Button>
          <Button
            color="secondary"
            className="shadow-none"
            onClick={() => {
              setChooseEmp(false);
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ChooseEmployee;
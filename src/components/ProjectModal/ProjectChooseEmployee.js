import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useParams } from 'react-router-dom';
import random from 'random';
import * as $ from 'jquery';
import moment from 'moment';
import Select from 'react-select';
import PropTypes from 'prop-types';
import message from '../Message';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';

const ChooseEmployee = ({ chooseEmp, setChooseEmp,ProposalId,arb, projectId }) => {
  ChooseEmployee.propTypes = {
    chooseEmp: PropTypes.bool,
    setChooseEmp: PropTypes.func,
    ProposalId: PropTypes.any,
    arb: PropTypes.any,
    projectId: PropTypes.any,
  };

  const { id } = useParams();
  const [employeeLinked, setEmployeeLinked] = useState();

  //Get employee name and id for linked employee select field
  const getEmployee = () => {
    api.get('/training/getEmployeeName').then((res) => {
      const items = res.data.data;
      const finaldat = [];
      items.forEach((item) => {
        finaldat.push({ value: item.employee_id, label: item.employee_name });
      });
      setEmployeeLinked(finaldat);
    });
  };

  // Addline item in Link employee
  const [addLineItem, setAddLineItem] = useState([
    {
      id: random.int(1, 99),
      employee_name: '',
      employee_id: '',
    },
  ]);

  //Onchange item in training staff employee name selectfield
  const onchangeItem = (str, itemId) => {
    const element = addLineItem.find((el) => el.id === itemId);
    element.employee_name = str.label;
    element.employee_id = str.value.toString();
    setAddLineItem(addLineItem);
  };

  // Add new line item in link Employee
  const AddNewLineItem = () => {
    setAddLineItem([
      ...addLineItem,
      {
        id: random.int(1, 99),
        employee_name: '',
        employee_id: '',
      },
    ]);
  };

  const insertTrainingData = () => {
    const result = [];
    const oldArray = addLineItem;
    $('.newemp tbody tr').each(function input() {
      const allValues = {};
      $(this)
        .find('input')
        .each(function output() {
          const fieldName = $(this).attr('name');
          allValues[fieldName] = $(this).val();
        });
      result.push(allValues);
    });
    result.forEach((obj) => {
      if (obj.id) {
        /* eslint-disable */
        const foundObj = oldArray.find((el) => parseInt(el.id) === parseInt(obj.id));

        if (foundObj) {
          obj.employee_id = foundObj.employee_id;
          obj.project_id = projectId;
          obj.creation_date = creationdatetime;
          obj.month = moment().month() + 1;
          obj.year = moment().year();
          obj.day = moment().date();
          delete obj?.undefined;
          addEmployeeToTimeSheet(obj);
        }
      }
    });
  };

  const addEmployeeToTimeSheet = (empObj) => {
    console.log('ProposalId1',ProposalId)
    empObj.proposal_id= ProposalId
    console.log('ProposalId2',empObj.proposal_id)
    api
      .post('/timesheet/insertTimesheetEmployee', empObj)
      .then((res) => {
        if (res.data.data.affectedRows == 1) {
          message('Employee Linked', 'success');
          setTimeout(() => {
            setChooseEmp(false);
            window.location.reload();
          }, 300);
        }
      })
      .catch(() => {
        message('Unable to insert record.', 'error');
      });
  };
  useEffect(() => {
    getEmployee();
  }, [id]);

  return (
    <>
      <Modal size="s" isOpen={chooseEmp}>
        <ModalHeader>
         {arb?'إضافة موظف':'Add Employee'} 
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
                {arb?'الموظف المرتبط':'Linked Employee'}
              </Button>
            </Col>
          </Row>
          <br />
          <Row>
            <table className="lineitem newemp border border-secondary rounded">
              <thead>
                <tr>
                  <th scope="col">{arb?'اسم الموظف':'Employee Name'}</th>
                </tr>
              </thead>
              <tbody>
                {addLineItem.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td data-label="Employee Name">
                        <Select
                          key={item.id}
                          defaultValue={{ value: item.employee_id, label: item.employee_name }}
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
                  );
                })}
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

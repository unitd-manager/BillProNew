import React, { useState, useEffect } from 'react';
import '../../assets/scss/layout/updateOTModal.scss'
import {
  Input,
  Card,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from 'reactstrap';
import PropTypes from 'prop-types';
import * as $ from 'jquery';
import { ToastContainer } from 'react-toastify';
import api from '../../constants/api';
import message from '../Message';

function UpdateOtModal({ updateOtModal, setUpdateOtModal}) {
  UpdateOtModal.propTypes = {
    updateOtModal: PropTypes.bool,
    setUpdateOtModal: PropTypes.func,
  
    
  };

  const [payrollManagementsData, setPayrollManagementsData] = useState([]);

  //get all records
  const getAllPayrollManagements = () => {
    api
      .get('/payrollmanagement/getpayrollmanagementMain')
      .then((res) => {
        setPayrollManagementsData(res.data.data);
      })
      .catch(() => {
        //message('Payrollmanagement Data Not Found', 'info');
      });
  };

  //editlineitem
  const editLineItemApi = (obj, i, arrLength) => {
    console.log(obj);
    api
      .post('/payrollmanagement/updateOt', {
        payroll_management_id: obj.payroll_management_id,
        employee_name: obj.employee_name,
        overtime_pay_rate: obj.overtime_pay_rate?parseFloat(obj.overtime_pay_rate).toFixed(2):0.00,
        ot_hours: obj.ot_hours?parseFloat(obj.ot_hours).toFixed(2):0.00,
        ot_amount:obj.ot_amount?parseFloat(obj.ot_amount).toFixed(2):0.00,
        allowance1: obj.allowance1?parseFloat(obj.allowance1).toFixed(2):0.00,
        allowance2: obj.allowance2?parseFloat(obj.allowance2).toFixed(2):0.00,
        allowance3: obj.allowance3?parseFloat(obj.allowance3).toFixed(2):0.00,
        allowance4: obj.allowance4?parseFloat(obj.allowance4).toFixed(2):0.00,
        allowance5: obj.allowance5?parseFloat(obj.allowance5).toFixed(2):0.00,
        deduction1: obj.deduction1?parseFloat(obj.deduction1).toFixed(2):0.00,
        deduction2: obj.deduction2?parseFloat(obj.deduction2).toFixed(2):0.00,
        deduction3: obj.deduction3?parseFloat(obj.deduction3).toFixed(2):0.00,
        deduction4: obj.deduction4?parseFloat(obj.deduction4).toFixed(2):0.00,
      })
      .then(() => {
        if (i+1 === arrLength) {
          message('OT Details Edited Successfully', 'success');
        }
      })
      .catch(() => {
        message('Cannot Edit OT Details', 'error');
      });
  };
  const handleOtAmount = (otRate, otHours, index) => {
    if (!otRate) otRate = 0;
    if (!otHours) otHours = 0;
  
    const updatedData = [...payrollManagementsData];
    const otAmount = parseFloat(otRate) * parseFloat(otHours);
    updatedData[index] = { ...updatedData[index], ot_amount: otAmount };
    
    setPayrollManagementsData(updatedData);
  };
  
  // getall values
  const getAllValues = () => {
    // const result = [];
    // $('.display tbody tr').each(() => {
    //   const allValues = {};
    //   $(this)
    //     .find('input')
    //     .each(() => {
    //       const fieldName = $(this).attr('name');
    //       allValues[fieldName] = $(this).val();
    //     });
    //   result.push(allValues);
    // });
    const result = [];
    // const oldArray = payrollManagementsData;
    $(".display tbody tr").each(function input() {
      const allValues = {};
      $(this).find("input").each(function output() {
        const fieldName = $(this).attr("name");
        allValues[fieldName] = $(this).val();
      });
      result.push(allValues);
    })
    console.log(result);
    result.forEach((ob, i) => {
      if (ob.payroll_management_id !== '') {
        editLineItemApi(ob, i, result.length);
      } else {
        alert('No payrollManagement Id');
      }
    });
  };
  useEffect(() => {
    getAllPayrollManagements();
  }, []);

  return (
    <>
      <Modal size="xl" isOpen={updateOtModal}>
        <ToastContainer></ToastContainer>
        <ModalHeader>
          Update OT{' '}
          <Button
            className="shadow-none"
            color="dark"
            onClick={() => {
              getAllValues();
              setUpdateOtModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
              <Card className="shadow-none overflow-auto updateOTModalTableCard">
                <Table className="display">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Name</th>
                      <th scope="col">OT hr/rt</th>
                     <th scope="col">OverTime Rate</th>
                      <th scope="col">OverTime Hours</th>
                      <th scope="col">Over Time Amount</th>
                      <th scope="col">Transport</th>
                      <th scope="col">Entertainment</th>
                      <th scope="col">Food</th>
                      <th scope="col">Shift Allowance</th>
                      <th scope="col">Others</th>
                      <th scope="col">Housing </th>
                      <th scope="col">Transport</th>
                      <th scope="col">Others</th>
                      <th scope="col">Food</th>
                    </tr>
                  </thead>
                  <tbody style={{overflowY:'scroll'}}>
                    {payrollManagementsData.map((item,index) => {
                      return (
                        <tr key={item.payroll_management_id}>
                          <td data-label="payroll_management_id">
                            <Input
                              defaultValue={item.payroll_management_id}
                            
                              type="text"
                              name="payroll_management_id"
                              disabled
                            />
                          </td>
                          <td data-label="employee_name">
                            <Input
                              defaultValue={item.employee_name}
                              className="w-auto"
                              type="text"
                              name="employee_name"
                              disabled
                            />
                          </td>

                          <td >
                          </td>
                          <td data-label="overtime_pay_rate"><Input
                              defaultValue={item.overtime_pay_rate}
                              type="text"
                              name="overtime_pay_rate"
                              disabled
                            />
                            </td>
                            <td data-label="ot_hours">
                              <Input
                                type="text"
                                name="ot_hours"
                                defaultValue={item.ot_hours}
                                onChange={(e) => {
                                  handleOtAmount(e.target.value, item.overtime_pay_rate, index);
                                }}
                              ></Input>
                            </td>
                            <td data-label="ot_amount">
                              <Input
                                value={item.ot_amount}
                                type="text"
                                name="ot_amount"
                                disabled
                              />
                            </td>
                          <td data-label="allowance1">
                            <Input
                              type="text"
                              name="allowance1"
                              defaultValue={item.allowance1}
                            ></Input>
                          </td>
                          <td data-label="allowance2">
                            <Input defaultValue={item.allowance2} type="text" name="allowance2" />
                          </td>
                          <td data-label="allowance3">
                            <Input defaultValue={item.allowance3} type="text" name="allowance3" />
                          </td>
                          <td data-label="allowance4">
                            <Input defaultValue={item.allowance4} type="text" name="allowance4" />
                          </td>
                          <td data-label="allowance5">
                            <Input defaultValue={item.allowance5} type="text" name="allowance5" />
                          </td>
                          <td data-label="deduction1">
                            <Input defaultValue={item.deduction1} type="text" name="deduction1" />
                          </td>
                          <td data-label="deduction2">
                            <Input defaultValue={item.deduction2} type="text" name="deduction2" />
                          </td>
                          <td data-label="deduction3">
                            <Input defaultValue={item.deduction3} type="text" name="deduction3" />
                          </td>
                          <td data-label="deduction4">
                            <Input defaultValue={item.deduction4} type="text" name="deduction4" />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="shadow-none"
            onClick={() => {
              getAllValues();
              setUpdateOtModal(false);
            }}
          >
            {' '}
            Close{' '}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
export default UpdateOtModal;

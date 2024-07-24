import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Form,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
import * as $ from 'jquery';
import random from 'random';
import api from '../../constants/api';
import message from '../Message';

const JobAddLineItemModal = ({
  addJobLineItemModal,
  setAddJobLineItemModal,
  projectInfo,
  jobLine,
}) => {
  JobAddLineItemModal.propTypes = {
    addJobLineItemModal: PropTypes.bool,
    setAddJobLineItemModal: PropTypes.func,
    projectInfo: PropTypes.any,
    jobLine: PropTypes.any,
  };

  const [totalAmount, setTotalAmount] = useState(0);
  const [addLineItem, setAddLineItem] = useState([
    {
      id: random.int(1, 99),
      unit: '',
      quantity: '',
      unit_price: '',
      amount: '',
      remarks: '',
      title: '',
      description: '',
    },
  ]);
  //Insert Invoice Item
  const addLineItemApi = (obj) => {
    obj.project_id = projectInfo;
    obj.quote_id = jobLine;
    api
      .post('/project/insertQuoteItems', obj)
      .then(() => {
        message('Line Item Added Successfully', 'sucess');
         window.location.reload();
      })
      .catch(() => {
        message('Cannot Add Line Items', 'error');
      });
  };
  //Add new line item
  const AddNewLineItem = () => {
    setAddLineItem([
      ...addLineItem,
      {
        id: new Date().getTime().toString(),
        unit: '',
        quantity: '',
        unit_price: '',
        remarks: '',
        amount: '',
        title: '',
        description: '',
      },
    ]);
  };
  //Invoice item values
  const getAllValues = () => {
    const result = [];
    $('.lineitem tbody tr').each(function input() {
      const allValues = {};
      $(this)
        .find('input')
        .each(function output() {
          const fieldName = $(this).attr('name');
          allValues[fieldName] = $(this).val();
        });
      result.push(allValues);
    });
    setTotalAmount(0);
    console.log(result);
    result.forEach((element) => {
      addLineItemApi(element);
    });
    console.log(result);
  };
  //Invoice Items Calculation
  const calculateTotal = () => {
    let totalValue = 0;
    const result = [];
    $('.lineitem tbody tr').each(function input() {
      const allValues = {};
      $(this)
        .find('input')
        .each(function output() {
          const fieldName = $(this).attr('name');
          allValues[fieldName] = $(this).val();
          allValues.amount = allValues.quantity * allValues.unit_price;
        });
      result.push(allValues);
    });
    result.forEach((e) => {
      if (e.amount) {
        totalValue += parseFloat(e.amount);
      }
    });
    console.log(result);
    setAddLineItem(result);
    setTotalAmount(totalValue);
  };
  // Clear row value
  const ClearValue = (ind) => {
    setAddLineItem((current) =>
      current.filter((obj) => {
        return obj.id !== ind.id;
      }),
    );
    if (ind.amount) {
      const finalTotal = totalAmount - parseFloat(ind.amount);
      setTotalAmount(finalTotal);
    }
  };
  return (
    <>
      <Modal size="xl" isOpen={addJobLineItemModal}>
        <ModalHeader>
          Add Quote Items
          <Button
            className="shadow-none"
            color="secondary"
            onClick={() => {
              setAddJobLineItemModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
              <Form>
                <Row>
                  <Row>
                    <Col md="3">
                      <Button
                        className="shadow-none"
                        color="primary"
                        type="button"
                        onClick={() => {
                          AddNewLineItem();
                        }}
                      >
                        Add Line Item
                      </Button>
                    </Col>
                  </Row>
                  {/* Invoice Item */}
                  <Card>
                    <table className="lineitem">
                      <thead>
                        <tr>
                          <th scope="col">Title </th>
                          <th scope="col">Description </th>
                          <th scope="col">Unit </th>
                          <th scope="col">Qty</th>
                          <th scope="col">Unit Price</th>
                          <th scope="col">Amount</th>
                          <th scope="col">Remarks</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {addLineItem &&
                          addLineItem.map((item) => {
                            return (
                              <tr key={item.id}>
                                <td data-label="Title">
                                  <Input Value={item.title} type="text" name="title" />
                                </td>
                                <td data-label="Description">
                                  <Input Value={item.description} type="text" name="description" />
                                </td>
                                <td data-label="Unit">
                                  <Input Value={item.unit} type="text" name="unit" />
                                </td>
                                <td data-label="Qty">
                                  <Input Value={item.quantity} type="number" name="quantity" />
                                </td>
                                <td data-label="Unit Price">
                                  <Input
                                    Value={item.unit_price}
                                    onBlur={() => {
                                      calculateTotal();
                                    }}
                                    type="number"
                                    name="unit_price"
                                  />
                                </td>
                                <td data-label="Amount">
                                  <Input Value={item.amount} type="text" name="amount" disabled />
                                </td>
                                <td data-label="Remarks">
                                  <Input Value={item.remarks} type="text" name="remarks" />
                                </td>
                                <td data-label="Action">
                                 
                                    <Input type="hidden" name="id" Value={item.id}></Input>
                                    <span className='addline'
                                      onClick={() => {
                                        ClearValue(item);
                                      }}
                                    >
                                      Clear
                                    </span>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </Card>
                  <ModalFooter>
                    <Button
                      className="shadow-none"
                      color="primary"
                      onClick={() => {
                        getAllValues();
                      }}
                    >
                      {' '}
                      Submit{' '}
                    </Button>
                    <Button
                      className="shadow-none"
                      color="secondary"
                      onClick={() => {
                        setAddJobLineItemModal(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </ModalFooter>
                </Row>
              </Form>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};
export default JobAddLineItemModal;
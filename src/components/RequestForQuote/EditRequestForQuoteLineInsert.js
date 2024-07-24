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
import Select from 'react-select';
import random from 'random';
import api from '../../constants/api';
import message from '../Message';

const EditRequestForQuoteLineInsert = ({editRequestForQuoteLineInsert, setEditRequestForQuoteLineInsert, data ,PurchaseRequestID }) => {
  EditRequestForQuoteLineInsert.propTypes = {
    editRequestForQuoteLineInsert: PropTypes.bool,
    setEditRequestForQuoteLineInsert: PropTypes.func,
    data: PropTypes.array,
    PurchaseRequestID: PropTypes.array,
  };
  //All state Varible
  const [totalAmount, setTotalAmount] = useState(0);
  const [addLineItem, setAddLineItem] = useState([
    {
      id: random.int(1, 99),
      amount: '',
      description: '',
    },
  ]);
  const [unitdetails, setUnitDetails] = useState();
// Fetch data from API
  const getUnit = () => {
    api.get('/quote/RequestLineItemById', unitdetails)
      .then((res) => {
        const items = res.data.data
        const finaldat = []
        items.forEach(item => {
          finaldat.push({ value: item.value, label: item.value })
        })
        setUnitDetails(finaldat)
      })
  }
  //onchange function
  const onchangeItem = (selectedValue) => {
    const updatedItems = addLineItem.map((item) => {
      if (item.amount === selectedValue.value) {  // Compare with selectedValue.value
        return {
          ...item,
          amount: selectedValue.value,  // Update the unit with the selected option's value
          value: selectedValue.value  // Update the value with the selected option's value
        };
      }
      return item;
    });
  
    setAddLineItem(updatedItems);
  };
  //Insert Invoice Item
  const addLineItemApi = (obj) => {
    obj.purchase_requset_id = projectInfo;
    obj.purchase_quote_id = quoteLine;
    api
      .post('/quote/insertQuoteItems', obj)
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
        amount: '',
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
          allValues.totalamount = allValues.quantity * allValues.amount;
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

  React.useEffect(() => {
    getUnit();
  }, []);

  return (
    <>
      <Modal size="xl" isOpen={editRequestForQuoteLineInsert}>
        <ModalHeader>
          Add Quote Items
          <Button
            className="shadow-none"
            color="secondary"
            onClick={() => {
              setEditRequestForQuoteLineInsert(false);
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
                                  <Input Value={item.code} type="text" name="code" />
                                </td>
                                <td data-label="Unit">
                                <Select
                                name="amount" 
  onChange={(selectedOption) => {
    onchangeItem(selectedOption);
  }}
  options={unitdetails}
/>


                                </td>
                                <td data-label="Qty">
                                  <Input Value={item.quantity} type="number" name="quantity" disabled/>
                                </td>
                                <td data-label="Unit Price">
                                  <Input
                                    Value={item.unit}
                                    type="number"
                                    name="unit"
                                    disabled
                                  />
                                </td>
                                <td data-label="Amount">
                                  <Input Value={item.amount}  onBlur={() => {
                                      calculateTotal();
                                    }} type="text" name="amount" />
                                </td>
                                <td data-label="Remarks">
                                  <Input Value={item.description} type="text" name="description" />
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
                        setEditRequestForQuoteLineInsert(false);
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
export default EditRequestForQuoteLineInsert;

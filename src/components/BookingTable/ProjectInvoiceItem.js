import React, { useState } from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalHeader,
  Button,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
//import * as $ from 'jquery';
//import random from 'random';
import PropTypes from 'prop-types';
import api from '../../constants/api';
import message from '../Message';
// import { TimePicker } from '@mui/lab';

export default function ProjectInvoiceItem({ editInvoiceItemData, setEditInvoiceItemData, invoiceInfo }) {
  InvoiceItem.propTypes = {
    editInvoiceItemData: PropTypes.bool,
    setEditInvoiceItemData: PropTypes.func,
    invoiceInfo: PropTypes.any,
  };
  console.log('invoiceInfo', invoiceInfo);
 
  const [lineItems, setLineItems] = useState([]);

  const AddNewLineItem = () => {
    setLineItems([
      ...lineItems,
      {
        id: new Date().getTime().toString(),
        item_title: '',
        description: '',
        unit: '',
        qty: '',
        unit_price: '',
        remarks: '',
      },
    ]);
  };
  const addLineItemApi = () => {
    const promises = lineItems.map((item) => {
      const itemToInsert = {
        invoice_id: invoiceInfo, // Make sure this is correct
        item_title: item.item_title,
        description: item.description,
        unit: item.unit,
        qty: item.qty,
        unit_price: item.unit_price,
        total_cost: item.qty * item.unit_price,
        remarks: item.remarks,
      };

      return api.post('/projectsalesinvoice/insertInvoiceItem', itemToInsert);
    });

    Promise.all(promises)
      .then(() => {
        message('Line Items Added Successfully', 'success');
        setEditInvoiceItemData(false); // Close the modal or handle as needed
        console.log('All items inserted successfully');
        window.location.reload();
      })
      .catch(() => {
        message('Cannot Add Line Items', 'error');
      });
  };
  const handleInputChange = (index, name, value) => {
    const updatedLineItems = [...lineItems];
    updatedLineItems[index][name] = value;

    // Calculate total_cost here and update it in the state
    updatedLineItems[index].total_cost =
      parseFloat(value) * parseFloat(updatedLineItems[index].unit_price);

    setLineItems(updatedLineItems);
  };

  const clearValue = (index) => {
    const updatedLineItems = [...lineItems];
    updatedLineItems.splice(index, 1);
    setLineItems(updatedLineItems);
  };
  return (
    <>
      <Modal size="xl" isOpen={editInvoiceItemData}>
        <ModalHeader>
          Create Invoice Item
          <Button
            className="shadow-none"
            color="secondary"
            onClick={() => {
              setEditInvoiceItemData(false);
            }}
          >
            X
          </Button>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Row>
                <Col md="12">
                  <Form>
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
                      {/* Invoice Detail */}
                      <Row></Row>
                      {/* Invoice Item */}
                      <Row>
                        <Col>
                          <table className="lineitem">
                            <thead>
                              <tr>
                                <th scope="col">Item</th>
                                <th scope="col">Description </th>
                                <th scope="col">UoM</th>
                                <th scope="col">Qty</th>
                                <th scope="col">Unit Price</th>
                                <th scope="col">Total Price</th>
                                <th scope="col">Remarks</th>
                                <th scope="col"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {lineItems.map((item, index) => {
                                return (
                                  <tr key={item.id}>
                                    <td data-label="Item">
                                      <Input
                                        value={item.item_title}
                                        type="text"
                                        name="item_title"
                                        onChange={(e) =>
                                          handleInputChange(index, 'item_title', e.target.value)
                                        }
                                      />
                                    </td>
                                    <td data-label="Description">
                                      <Input
                                        value={item.description}
                                        type="text"
                                        name="description"
                                        onChange={(e) =>
                                          handleInputChange(index, 'description', e.target.value)
                                        }
                                      />
                                    </td>
                                    <td data-label="UoM">
                                      <Input
                                        value={item.unit}
                                        type="select"
                                        name="unit"
                                        onChange={(e) =>
                                          handleInputChange(index, 'unit', e.target.value)
                                        }
                                      >
                                       <option value="" selected="selected">
                    Please Select
                  </option>
                  <option value="KGS">KGS</option>
                  <option value="PCS">PCS</option>
                  <option value="NOS">NOS</option>
                  <option value="BOX">BOX</option>
                  <option value="EA">EA</option>
                                      </Input>
                                    </td>
                                    <td data-label="Qty">
                                      <Input
                                        value={item.qty}
                                        type="number"
                                        name="qty"
                                        onChange={(e) =>
                                          handleInputChange(index, 'qty', e.target.value)
                                        }
                                      />
                                    </td>
                                    <td data-label="Unit Price">
                                      <Input
                                        value={item.unit_price}
                                        onBlur={() => {
                                          //calculateTotal();
                                        }}
                                        type="number"
                                        name="unit_price"
                                        onChange={(e) =>
                                          handleInputChange(index, 'unit_price', e.target.value)
                                        }
                                      />
                                    </td>
                                    <td data-label="Total Price">
                                      <Input
                                        value={item.qty * item.unit_price}
                                        type="text"
                                        name="total_cost"
                                        disabled
                                      />
                                    </td>
                                    <td data-label="Remarks">
                                      <Input
                                        value={item.remarks}
                                        type="text"
                                        name="remarks"
                                        onChange={(e) =>
                                          handleInputChange(index, 'remarks', e.target.value)
                                        }
                                      />
                                    </td>
                                    <td data-label="Action">
                                      <div className="anchor">
                                        <span
                                          onClick={() => {
                                            clearValue(index);
                                          }}
                                        >
                                          Clear
                                        </span>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </Col>
                      </Row>

                      <ModalFooter>
                        <Button
                          className="shadow-none"
                          color="primary"
                          onClick={() => {
                            addLineItemApi();
                          }}
                        >
                          {' '}
                          Submit{' '}
                        </Button>
                        <Button
                          className="shadow-none"
                          color="secondary"
                          onClick={() => {
                            // setEditInvoiceData(false);
                          }}
                        >
                          Cancel
                        </Button>
                      </ModalFooter>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
}

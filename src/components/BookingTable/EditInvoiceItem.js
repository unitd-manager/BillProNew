import React, { useEffect, useState } from 'react';
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
import PropTypes from 'prop-types';
import api from '../../constants/api';
import message from '../Message';

export default function InvoiceItem({ editModal, setEditModal, selectedInvoiceItemId }) {
  InvoiceItem.propTypes = {
    editModal: PropTypes.bool,
    setEditModal: PropTypes.func,
    selectedInvoiceItemId: PropTypes.any,
  };

  const [invoiceItem, setInvoiceItem] = useState({
    item_title: '',
    description: '',
    unit: '',
    qty: '',
    unit_price: '',
    total_cost: '',
    remarks: '',
  });

  const [lineItems, setLineItems] = useState([]);

  const editInvoiceData = () => {
    const updatedInvoiceItem = {
      ...invoiceItem,
      invoice_item_id: selectedInvoiceItemId, // Include the invoice_item_id in the request
    };
  
    api
      .post('/invoice/editInvoiceItems', updatedInvoiceItem)
      .then(() => {
        message('Record edited successfully', 'success');
        window.location.reload();
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  useEffect(() => {
    if (editModal && selectedInvoiceItemId) {
      api
        .get(`/invoice/getInvoiceItemsByItemsId/${selectedInvoiceItemId}`)
        .then((response) => {
          setInvoiceItem(response.data.data[0]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [editModal, selectedInvoiceItemId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceItem((prevInvoiceItem) => {
      // Create a copy of the previous state
      const updatedInvoiceItem = { ...prevInvoiceItem };
      
      // Update the specific field
      updatedInvoiceItem[name] = value;
  
      // Calculate total_cost when qty or unit_price changes
      if (name === 'qty' || name === 'unit_price') {
        const qty = name === 'qty' ? value : updatedInvoiceItem.qty;
        const unitPrice = name === 'unit_price' ? value : updatedInvoiceItem.unit_price;
        const totalCost = qty * unitPrice;
        
        // Update the total_cost field
        updatedInvoiceItem.total_cost = totalCost;
      }
  
      return updatedInvoiceItem;
    });
  };

  const clearValue = (index) => {
    const updatedLineItems = [...lineItems];
    updatedLineItems.splice(index, 1);
    setLineItems(updatedLineItems);
  };

  return (
    <>
      <Modal size="xl" isOpen={editModal}>
        <ModalHeader>
          Edit Invoice Item
          <Button
            className="shadow-none"
            color="secondary"
            onClick={() => {
              setEditModal(false);
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
                              <tr>
                                <td data-label="Item">
                                  <Input
                                    value={invoiceItem.item_title}
                                    type="text"
                                    name="item_title"
                                    onChange={handleInputChange}
                                  />
                                </td>
                                <td data-label="Description">
                                  <Input
                                    value={invoiceItem.description}
                                    type="text"
                                    name="description"
                                    onChange={handleInputChange}
                                  />
                                </td>
                                <td data-label="UoM">
                                  <Input
                                    value={invoiceItem.unit}
                                    type="select"
                                    name="unit"
                                    onChange={handleInputChange}
                                  >   
                                <option value="KGS">KGS</option>
                                <option value="PCS">PCS</option>
                                <option value="NOS">NOS</option>
                                <option value="BOX">BOX</option>
                                <option value="EA">EA</option></Input>
                                </td>
                                <td data-label="Qty">
                                  <Input
                                    value={invoiceItem.qty}
                                    type="number"
                                    name="qty"
                                    onChange={handleInputChange}
                                  />
                                </td>
                                <td data-label="Unit Price">
                                  <Input
                                    value={invoiceItem.unit_price}
                                    onBlur={() => {
                                      // calculateTotal();
                                    }}
                                    type="number"
                                    name="unit_price"
                                    onChange={handleInputChange}
                                  />
                                </td>
                                <td data-label="Total Price">
                                  <Input
                                    value={invoiceItem.total_cost}
                                    type="text"
                                    name="total_cost"
                                    disabled
                                  />
                                </td>
                                <td data-label="Remarks">
                                  <Input
                                    value={invoiceItem.remarks}
                                    type="text"
                                    name="remarks"
                                    onChange={handleInputChange}
                                  />
                                </td>
                                <td data-label="Action">
                                  <div className="anchor">
                                    <span
                                      onClick={() => {
                                        clearValue();
                                      }}
                                    >
                                      Clear
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </Col>
                      </Row>

                      <ModalFooter>
                        <Button
                          className="shadow-none"
                          color="primary"
                          onClick={() => {
                            editInvoiceData();
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
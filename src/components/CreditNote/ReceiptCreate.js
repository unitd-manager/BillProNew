import React, { useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import api from '../../constants/api';

const FinanceReceiptData = ({ receiptId, orderId }) => {
  FinanceReceiptData.propTypes = {
    receiptId: PropTypes.any,
    orderId: PropTypes.any,
  };

  const [invoiceReceipt, setInvoiceReceipt] = useState([]);
  const [selectedInvoiceAmount, setSelectedInvoiceAmount] = useState(0);
  const [createReceipt, setCreateReceipt] = useState({
    amount: 0,
    credit_note_status: 'Paid',
    credit_note_date: moment().format('YYYY-MM-DD'),
    credit_note_code: '',
    mode_of_payment: 'Cash',
    remarks: '',
    cheque_no: '',
    cheque_date: '',
    bank_name: '',
  });
  const [selectedInvoice, setSelectedInvoice] = useState([]);

  const handleInputreceipt = (e) => {
    const { name, value } = e.target;
    setCreateReceipt({ ...createReceipt, [name]: value });
  };

  const addAndDeductAmount = (checkboxVal, receiptObj) => {
    const remainingAmount = receiptObj.invoice_amount - receiptObj.prev_amount;
    if (checkboxVal.target.checked) {
      setSelectedInvoiceAmount(selectedInvoiceAmount + parseFloat(remainingAmount));
    } else {
      setSelectedInvoiceAmount(selectedInvoiceAmount - parseFloat(remainingAmount));
    }
  };

  const getInvoices = (checkboxVal, invObj) => {
    if (checkboxVal.target.checked) {
      setSelectedInvoice([...selectedInvoice, invObj]);
    } else {
      const updatedInvoices = selectedInvoice.filter((invoice) => invoice.invoice_id !== invObj.invoice_id);
      setSelectedInvoice(updatedInvoices);
    }
  };

  const getinvoiceReceipt = () => {
    if (orderId) {
      api.post('/invoice/getInvoiceForSalesReceipt', { order_id: orderId }).then((res) => {
        const dataFromApi = res.data.data;
        const filteredData = dataFromApi.filter((el) => el.invoice_amount !== el.prev_amount);
        setInvoiceReceipt(filteredData);
      });
    }
  };

  const updateReceipt = () => {
    const updatedAmount = parseFloat(createReceipt.amount) + selectedInvoiceAmount;
    setCreateReceipt({ ...createReceipt, amount: updatedAmount });

    const updatedReceiptData = {
      credit_note_id: receiptId,
      amount: createReceipt.amount,
      mode_of_payment: createReceipt.mode_of_payment,
      credit_note_date: createReceipt.credit_note_date,
      remarks: createReceipt.remarks,
      credit_note_status: 'Paid',
      cheque_date: createReceipt.cheque_date,
      cheque_no: createReceipt.cheque_no,
      bank_name: createReceipt.bank_name,
    };

    const updateReceiptPromise = api.post('/creditnote/editReceipt', updatedReceiptData);

    if (selectedInvoice.length > 0) {
      const invoiceIds = selectedInvoice.map((invoice) => invoice.invoice_id);

      const updatedInvoiceStatusData = {
        invoice_id: invoiceIds,
        status: 'Paid',
      };

      const updateInvoiceStatusPromise = api.post('/creditnote/editInvoice', updatedInvoiceStatusData);

      Promise.all([updateReceiptPromise, updateInvoiceStatusPromise])
        .then(() => {
          console.log('CreditNote updated successfully');
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error updating receipt or invoice status', error);
        });
    } else {
      updateReceiptPromise
        .then(() => {
          console.log('CreditNote updated successfully');
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error updating receipt', error);
        });
    }
  };

  const deleteCreatedReceipt = () => {
    if (receiptId) {
      api
        .delete('/creditnote/deleteReceipt', { data: { credit_note_id: receiptId } })
        .then(() => {
          console.log('Created receipt record deleted successfully');
          setTimeout(() => {
            window.location.reload();
          }, 800);
        })
        .catch((error) => {
          console.error('Error deleting created receipt record', error);
        });
    }
  };

  useEffect(() => {
    if (!receiptId && !selectedInvoiceAmount) {
      deleteCreatedReceipt();
    }
  }, [receiptId, selectedInvoiceAmount]);

  useEffect(() => {
    getinvoiceReceipt();
  }, [orderId]);

  return (
    <>
      <Row>
        <Col md="12">
          <Form>
            {invoiceReceipt.map((element) => (
              <Row key={element.invoice_id}>
                <Col md="12">
                  <FormGroup check>
                    <Input
                      onChange={(e) => {
                        addAndDeductAmount(e, element);
                        getInvoices(e, element);
                      }}
                      name="invoice_code"
                      type="checkbox"
                    />
                    <span>
                      {element.invoice_code} ({element.invoice_amount})
                    </span>
                  </FormGroup>
                </Col>
              </Row>
            ))}
            <Row>
              <Col md="12">
                <FormGroup>
                  <Label>Amount</Label>
                  <Input
                    type="text"
                    onChange={handleInputreceipt}
                    value={selectedInvoiceAmount}
                    name="amount"
                  />
                </FormGroup>
              </Col>
              <Col md="12">
                <FormGroup>
                  <Label>Date</Label>
                  <Input
                    type="date"
                    onChange={handleInputreceipt}
                    value={createReceipt.credit_note_date}
                    name="credit_note_date"
                  />
                </FormGroup>
              </Col>
              <Col md="12">
                <FormGroup>
                  <Label>Mode Of Payment</Label>
                  <Input
                    type="select"
                    name="mode_of_payment"
                    onChange={handleInputreceipt}
                    value={createReceipt.mode_of_payment}
                  >
                    <option value="Cash">Cash</option>
                    <option value="Cheque">Cheque</option>
                    <option value="Giro">Giro</option>
                  </Input>
                </FormGroup>
              </Col>
              {createReceipt.mode_of_payment === 'Cheque' && (
                <>
                  <Col md="12">
                    <FormGroup>
                      <Label>Check No</Label>
                      <Input
                        type="number"
                        onChange={handleInputreceipt}
                        value={createReceipt.cheque_no}
                        name="cheque_no"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <Label>Check date</Label>
                      <Input
                        type="date"
                        onChange={handleInputreceipt}
                        value={createReceipt.cheque_date}
                        name="cheque_date"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <Label>Bank</Label>
                      <Input
                        type="text"
                        onChange={handleInputreceipt}
                        value={createReceipt.bank_name}
                        name="bank_name"
                      />
                    </FormGroup>
                  </Col>
                </>
              )}
              <Col md="12">
                <FormGroup>
                  <Label>Notes</Label>
                  <Input
                    type="text"
                    onChange={handleInputreceipt}
                    value={createReceipt.remarks}
                    name="remarks"
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Button
                onClick={() => {
                  updateReceipt();
                }}
                type="button"
                className="btn btn-dark shadow-none"
              >
                Save
              </Button>

            
              <Button
                onClick={() => {
                  deleteCreatedReceipt();
                }}
                type="button"
                 color="secondary"
                  className="shadow-none"
              >
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default FinanceReceiptData;

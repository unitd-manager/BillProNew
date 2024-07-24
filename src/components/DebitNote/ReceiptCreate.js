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
  //All const Variable
  console.log('orderId',orderId);
  const [invoiceReceipt, setInvoiceReceipt] = useState();
  const [selectedInvoiceAmount, setSelectedInvoiceAmount] = useState(0);
  // const [paymentMethod, setPaymentMethod] = useState('Cash');

  const [createReceipt, setCreateReceipt] = useState({
    amount: 0,
    debit_note_status: 'Paid',
    debit_note_date: moment(),
    debit_note_code: '',
    mode_of_payment:'Cash',
    remarks:'',
  });
  const [selectedInvoice, setSelectedInvoice] = useState([]);
  //Setting Data in createReceipt
  const handleInputreceipt = (e) => {
    if (e.target.name === 'amount') {
      setCreateReceipt({ ...createReceipt, [e.target.name]: e.target.value });
    }  else if (e.target.name === 'debit_note_status') {
      setCreateReceipt({ ...createReceipt, debit_note_status: e.target.value });
    } else {
      setCreateReceipt({ ...createReceipt, [e.target.name]: e.target.value });
    }
  };

  const addAndDeductAmount = (checkboxVal, receiptObj) => {
    const remainingAmount = receiptObj.invoice_amount;
    if (checkboxVal.target.checked === true) {
      setSelectedInvoiceAmount(selectedInvoiceAmount + parseFloat(remainingAmount));
    } else {
      setSelectedInvoiceAmount(selectedInvoiceAmount - parseFloat(remainingAmount));
    }
  };

  let invoices = [];
  const removeObjectWithId = (arr, invoiceId) => {
    const objWithIdIndex = arr.findIndex((obj) => obj.invoiceId === invoiceId);

    if (objWithIdIndex > -1) {
      arr.splice(objWithIdIndex, 1);
    }

    return arr;
  };
  const getInvoices = (checkboxVal, invObj) => {
    if (checkboxVal.target.checked === true) {
      setSelectedInvoice([...selectedInvoice, invObj]);
    } else {
      invoices = removeObjectWithId(invoiceReceipt, invObj.invoice_code);
      setSelectedInvoice(invoices);
    }
  };
 
  //Getting receipt data by order id
  const getinvoiceReceipt = () => {
    if (orderId) {
      api.post('/invoice/getInvoiceForSalesReceipt', { order_id: orderId }).then((res) => {
        const datafromapi = res.data.data;
        datafromapi.forEach((element) => {
          element.remainingAmount = element.invoice_amount - element.prev_amount;
        });
        const result = datafromapi.filter((el) => el.invoice_amount !== el.prev_amount);
        setInvoiceReceipt(result);
      });
    }
  };
  const updateReceipt = () => {
    // Create a payload with updated receipt data
    const updatedReceiptData = {
      debit_note_id: receiptId, // Use the appropriate receipt ID
      amount: createReceipt.amount,
      mode_of_payment: createReceipt.mode_of_payment,
      debit_note_date: createReceipt.debit_note_date,
      remarks: createReceipt.remarks,
      debit_note_status: 'Paid',
      cheque_date: createReceipt.cheque_date,
      cheque_no: createReceipt.cheque_no,
    };
  
    // Define the promises for updating receipt and invoice status
    const updateReceiptPromise = api.post('/debitnote/editReceipt', updatedReceiptData);
  
    // Check if there are selected invoices to update
    if (selectedInvoice.length > 0) {
      const invoiceIds = selectedInvoice.map((invoice) => invoice.invoice_id);
  
      const updatedInvoiceStatusData = {
        invoice_id: invoiceIds,
        status: 'Paid', // Update to the appropriate status
      };
  
      const updateInvoiceStatusPromise = api.post('/debitnote/editInvoice', updatedInvoiceStatusData);
  
      // Use Promise.all to wait for both promises to resolve
      Promise.all([updateReceiptPromise, updateInvoiceStatusPromise])
        .then(([receiptRes, invoiceRes]) => {
          // Handle success (you might want to show a success message)
          console.log('debitnote updated successfully', receiptRes);
          console.log('Invoice status updated successfully', invoiceRes);
           window.location.reload();
        })
        .catch((error) => {
          // Handle error (you might want to show an error message)
          console.error('Error updating receipt or invoice status', error);
        });
    } else {
      // If no selected invoices, only update the receipt
      updateReceiptPromise
        .then((res) => {
          // Handle success (you might want to show a success message)
          console.log('debitnote updated successfully', res);
           window.location.reload();
        })
        .catch((error) => {
          // Handle error (you might want to show an error message)
          console.error('Error updating receipt', error);
        });
    }
  };
  
  const deleteCreatedReceipt = () => {
    if (receiptId) {
      api
        .delete('/debitnote/deleteReceipt', { data: { debit_note_id: receiptId } })
        .then(() => {
          console.log('Created receipt record deleted successfully');
          setTimeout(() => {
            // window.location.reload();
          }, 800);
        
        })
        .catch((error) => {
          console.error('Error deleting created receipt record', error);
        });
    }
  };


  useEffect(() => {
    const updatedAmount = parseFloat(createReceipt.amount) + selectedInvoiceAmount;
    setCreateReceipt({ ...createReceipt, amount: updatedAmount.toString() });
  }, [selectedInvoiceAmount]);
  useEffect(() => {
    getinvoiceReceipt();
  }, [orderId]); // Call the API when bookingId changes
  useEffect(() => {
    // If there are no unpaid invoices, delete the created receipt record
    if (invoiceReceipt && invoiceReceipt.length === 0) {
      deleteCreatedReceipt();
    }
  }, [invoiceReceipt]);
  return (
    <>
      <Row>
        <Col md="12">
          <Form>
          {invoiceReceipt && invoiceReceipt.length > 0 ? (
  invoiceReceipt.map((element) => {
    return (
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
    );
  })
) : (
  <p>No unpaid invoices available.</p>
)}
            <br></br>
            {/* { invoiceReceipt && invoiceReceipt.length>0? */}
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
                    value={createReceipt && moment(createReceipt.debit_note_date).format('YYYY-MM-DD')}
                    name="debit_note_date"
                  />
                </FormGroup>
              </Col>
              <Col md="12">
                <FormGroup>
                  <Label>
                    Mode Of Payment <span className="required">*</span>
                  </Label>
                  <Input
                  type="select"
                  name="mode_of_payment"
                  onChange={(e) => {
                    handleInputreceipt(e); // This will handle other input changes
                  }}
                  value={createReceipt.mode_of_payment}
                >
                  <option value="Cash">Cash</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Giro">Giro</option>
                </Input>

                </FormGroup>
              </Col>
              {createReceipt && createReceipt.mode_of_payment === 'Cheque' && (
                <Col md="12">
                  <FormGroup>
                    <Label>Check No</Label>
                    <Input
                      type="numbers"
                      onChange={handleInputreceipt}
                      value={createReceipt && createReceipt.cheque_no}
                      name="cheque_no"
                    />
                  </FormGroup>
                </Col>
              )}
              {createReceipt && createReceipt.mode_of_payment === 'Cheque' && (
                <Col md="12">
                  <FormGroup>
                    <Label>Check date</Label>
                    <Input
                      type="date"
                      onChange={handleInputreceipt}
                      value={createReceipt && createReceipt.cheque_date}
                      name="cheque_date"
                    />
                  </FormGroup>
                </Col>
              )}
              {createReceipt && createReceipt.mode_of_payment === 'Cheque' && (
                <Col md="12">
                  <FormGroup>
                    <Label>Bank</Label>
                    <Input
                      type="numbers"
                      onChange={handleInputreceipt}
                      value={createReceipt && createReceipt.bank_name}
                      name="bank_name"
                    />
                  </FormGroup>
                </Col>
              )}
              <Col md="12">
                <FormGroup>
                  <Label>Notes</Label>
                  <Input
                    type="text"
                    onChange={handleInputreceipt}
                    value={createReceipt && createReceipt.remarks}
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

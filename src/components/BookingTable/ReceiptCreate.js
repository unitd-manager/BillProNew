import React, { useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import api from '../../constants/api';
import message from '../Message';

const FinanceReceiptData = ({ receiptId, orderId }) => {
  FinanceReceiptData.propTypes = {
    receiptId: PropTypes.any,
    orderId: PropTypes.any,
  };
  //All const Variable
  console.log('orderId',orderId);
  const [invoiceReceipt, setInvoiceReceipt] = useState();
  const [selectedInvoiceAmount, setSelectedInvoiceAmount] = useState(0);
  const [createReceipt, setCreateReceipt] = useState({
    amount: 0,
    receipt_status: 'Paid',
    receipt_date: moment(),
    receipt_code: '',
  });
  const [selectedInvoice, setSelectedInvoice] = useState([]);
  //Setting Data in createReceipt
  const handleInputreceipt = (e) => {
    if (e.target.name === 'amount') {
      setCreateReceipt({ ...createReceipt, [e.target.name]: e.target.value });
    } else if (e.target.name === 'mode_of_payment') {
      setCreateReceipt({ ...createReceipt, mode_of_payment: e.target.value });
    } else if (e.target.name === 'receipt_status') {
      setCreateReceipt({ ...createReceipt, receipt_status: e.target.value });
    }
    else if (e.target.name === 'cheque_date') {
      setCreateReceipt({ ...createReceipt, cheque_date: e.target.value });
    }
    else if (e.target.name === 'bank_name') {
      setCreateReceipt({ ...createReceipt, bank_name: e.target.value });
    }
    else if (e.target.name === 'cheque_no') {
      setCreateReceipt({ ...createReceipt, cheque_no: e.target.value });
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
      api.post('/projectreceipts/getInvoiceForReceipt', { project_order_id : orderId }).then((res) => {
        const datafromapi = res.data.data;
        datafromapi.forEach((element) => {
          element.remainingAmount = element.invoice_amount - element.prev_amount;
        });
        const result = datafromapi.filter((el) => {
          return el.invoice_amount !== el.prev_amount;
        });
        setInvoiceReceipt(result);
      });
    }
  };
  
  // const insertReceipt = (code) =>{
  //   if (createReceipt.mode_of_payment !== '' && createReceipt.project_order_id !== '') {

  //     createReceipt.receipt_code = code;
  //     createReceipt.project_order_id = orderId;
  //     api
  //       .post('/projectreceipts/insertreceipt', createReceipt)
  //       .then(() => {
  //         message('Receipt Created successfully.', 'success');
  //         window.location.reload();
  //       })
  //       .catch(() => {
  //         message('Network connection error.', 'error');
  //       });
  //   } else {
  //     message('Please fill all required fields', 'warning');
  //   }
  // };
  const generateCode = () => {
    // Check if there are selected invoices
    if (selectedInvoice.length > 0) {
      api.post('/commonApi/getCodeValue', { type: 'projectreceipt' })
        .then((res) => {
          const receiptCode = res.data.data;
  
          // Prepare an array to store all promises for receipt history insertion
          const receiptHistoryPromises = [];
  
          // Prepare data for inserting into receipt table
          const receiptData = {
            receipt_code: receiptCode,
            project_order_id: orderId,
            amount: selectedInvoiceAmount,
            receipt_date: createReceipt.receipt_date,
            mode_of_payment: createReceipt.mode_of_payment,
            remarks: createReceipt.remarks,
            receipt_status: 'Paid',
            cheque_date: createReceipt.cheque_date,
            cheque_no: createReceipt.cheque_no,
          };
  
          // Insert into receipt table
          api.post('/projectreceipts/insertreceipt', receiptData)
            .then((receiptRes) => {
              // Extract the project_receipt_id from the response
              const projectReceiptId = receiptRes.data.project_receipt_id;
  
              // Prepare and execute insertion into receipt history for each selected invoice
              selectedInvoice.forEach((invoice) => {
                const historyData = {
                  receipt_code: receiptCode,
                  project_receipt_id: projectReceiptId,
                  project_invoice_id: invoice.project_invoice_id,
                  amount: invoice.invoice_amount,// Corrected line
                };
                // Push each promise into the array
                receiptHistoryPromises.push(api.post('/projectreceipts/insertreceipthistory', historyData));
              });
  
              // Use Promise.all to wait for all receipt history insertions to complete
              Promise.all(receiptHistoryPromises)
                .then(() => {
                  message('Receipt and Receipt History Created successfully.', 'success');
                  window.location.reload();
                })
                .catch(() => {
                  message('Error creating receipt history.', 'error');
                });
            })
            .catch(() => {
              message('Error creating receipt.', 'error');
            });
        })
        .catch(() => {
          message('Error generating receipt code.', 'error');
        });
    } else {
      message('Please select at least one invoice.', 'warning');
    }
  };
  
  const deleteCreatedReceipt = () => {
    if (receiptId) {
      api
        .delete('/invoice/deleteReceipt', { data: { receipt_id: receiptId } })
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
      <Row key={element.project_invoice_id}>
        <Col md="12">
          <FormGroup check>
            <Input
              onChange={(e) => {
                addAndDeductAmount(e, element);
                getInvoices(e, element);
              }}
              name="project_invoice_code"
              type="checkbox"
            />
            <span>
              {element.project_invoice_code} ({element.invoice_amount})
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
                    value={createReceipt && moment(createReceipt.receipt_date).format('YYYY-MM-DD')}
                    name="receipt_date"
                  />
                </FormGroup>
              </Col>
              <Col md="12">
                <FormGroup>
                  <Label>
                    {' '}
                    Mode Of Payment <span className="required">*</span>{' '}
                  </Label>
                  <Input type="select" name="mode_of_payment" onChange={handleInputreceipt}>
                  <option value="" selected="selected">Please Select</option>
                    <option value="cash" >Cash</option>
                    <option value="cheque">Cheque</option>
                    <option value="giro">Giro</option>
                  </Input>
                </FormGroup>
              </Col>
              {createReceipt && createReceipt.mode_of_payment === 'cheque' && (
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
              {createReceipt && createReceipt.mode_of_payment === 'cheque' && (
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
              {createReceipt && createReceipt.mode_of_payment === 'cheque' && (
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
                    defaultValue={createReceipt && createReceipt.remarks}
                    name="remarks"
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Button
                onClick={() => {
                  generateCode();
                }}
                type="button"
                className="btn btn-dark shadow-none"
              >
                Save
              </Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default FinanceReceiptData;

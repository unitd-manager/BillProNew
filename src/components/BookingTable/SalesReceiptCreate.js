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

  const [invoiceReceipt, setInvoiceReceipt] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [createReceipt, setCreateReceipt] = useState({
    amount: 0,
    receipt_status: 'Paid',
    order_id:orderId,
    receipt_date: moment().format('YYYY-MM-DD'),
    receipt_code: '',
  });

  const handleInputreceipt = (e) => {
    if(e.target.name === 'amount'){
      // eslint-disable-next-line
      setTotalAmount(parseInt(e.target.value))
    }
    setCreateReceipt({ ...createReceipt, [e.target.name]: e.target.value });
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

  const result = [];
  const addAndDeductAmount = (checkboxVal, receiptObj) => {
    const remainingAmount = receiptObj.invoice_amount - receiptObj.prev_amount
    if (checkboxVal.target.checked === true) {
      setTotalAmount(parseFloat(totalAmount) + parseFloat(remainingAmount));
      setCreateReceipt({
        ...createReceipt,
        amount: (parseFloat(createReceipt.amount) + parseFloat(remainingAmount)).toString(),
      });
      result.push(remainingAmount);
    } else {
      setTotalAmount(parseFloat(totalAmount) - parseFloat(remainingAmount));
      setCreateReceipt({
        ...createReceipt,
        amount: parseFloat(createReceipt.amount) - parseFloat(remainingAmount),
      });
    }
    
  };

  const insertReceiptHistory = (createReceiptHistory) => {
    api
      .post('/finance/insertInvoiceReceiptHistory', createReceiptHistory)
      .then(() => {
        message('Data inserted successfully.', 'success');
      })
      .catch(() => {
        message('Network connection error.', 'error');
      });
  };

  const editInvoiceStatus = (invoiceId, status) => {
    api
      .post('/invoice/editInvoiceStatus', {
        invoice_id: invoiceId,
        status,
      })
      .then(() => {
        message('Data updated successfully.', 'success');
      })
      .catch(() => {
        message('Network connection error.', 'error');
      });
  };

  const editInvoicePartialStatus = (invoiceId, status) => {
    api
      .post('/invoice/editInvoicePartialStatus', {
        invoice_id: invoiceId,
        status,
      })
      .then(() => {
        message('data inserted successfully.');
      })
      .catch(() => {
        message('Network connection error.');
      });
  };

 
  //Logic for deducting receipt amount
  const finalCalculation = (receipt) => {
    let leftamount = totalAmount 
    // selectedInvoice.forEach(element => {
    //   if(element.prev_amount < leftamount){
    //     leftamount = parseFloat(leftamount) - element.prev_amount
    //     element.paid = true
    //   }
     
    // });
     // Insert Receipt History
  
     for (let j = 0; j < selectedInvoice.length; j++){

      if(selectedInvoice[j].remainingAmount <= leftamount){
        leftamount = parseFloat(leftamount) - selectedInvoice[j].remainingAmount
        selectedInvoice[j].paid = true;
        editInvoiceStatus(selectedInvoice[j].invoice_id, 'Paid');
        insertReceiptHistory({
          invoice_id: selectedInvoice[j].invoice_id,
              receipt_id: receipt,
              published: '1',
              flag: '1',
              creation_date: '',
              modification_date: '',
              created_by: 'admin',
              modified_by: 'admin',
              amount: selectedInvoice[j].remainingAmount,
              site_id: '1'
        })
        
      }else{
        selectedInvoice[j].partiallyPaid = true;
        editInvoicePartialStatus(selectedInvoice[j].invoice_id, 'Partial Payment');
        insertReceiptHistory({
          invoice_id: selectedInvoice[j].invoice_id,
              receipt_id: receipt,
              published: '1',
              flag: '1',
              creation_date: '',
              modification_date: '',
              created_by: 'admin',
              modified_by: 'admin',
              amount:leftamount,
              site_id: '1',
             
        })
      }
      }
  };
  
  const insertReceipt = (code) => {
    const receiptData = {
      ...createReceipt,
      receipt_code: code,
    };

    api
      .post('/finance/insertreceipt', receiptData)
      .then((res) => {
        message('Receipt inserted successfully.', 'success');
        finalCalculation(res.data.data.insertId);
      })
      .catch(() => {
        message('Network connection error.', 'error');
      });
  };

  const generateCode = () => {
    if (selectedInvoice.length > 0) {
      api
        .post('/commonApi/getCodeValue', { type: 'receipt' })
        .then((res) => {
          insertReceipt(res.data.data);
        })
        .catch(() => {
          insertReceipt('');
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
    getinvoiceReceipt();
  }, [orderId]);

  useEffect(() => {
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
              invoiceReceipt.map((element) => (
                <Row key={element.invoice_id}>
                  <Col md="12">
                    <FormGroup check>
                      <Input
                        onChange={(e) => {
                          addAndDeductAmount(e, element);
                          getInvoices(e, element);
                        }}
                        name="invoice_code(prev_amount)"
                        type="checkbox"
                      />
                      <span>
                        {element.invoice_code} ({element.invoice_amount}) Paid - {element.prev_amount}
                      </span>
                    </FormGroup>
                  </Col>
                </Row>
              ))
            ) : (
              <p>No unpaid invoices available.</p>
            )}
            <br />
            <Row>
              <Col md="12">
                <FormGroup>
                  <Label>Amount</Label>
                  <Input
                    type="text"
                    onChange={handleInputreceipt}
                    value={createReceipt.amount}
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
                    Mode Of Payment <span className="required">*</span>
                  </Label>
                  <Input type="select" name="mode_of_payment" onChange={handleInputreceipt}>
                    <option value="" selected="selected">
                      Please Select
                    </option>
                    <option value="cash">Cash</option>
                    <option value="cheque">Cheque</option>
                    <option value="giro">Giro</option>
                  </Input>
                </FormGroup>
              </Col>
              {createReceipt && createReceipt.mode_of_payment === 'cheque' && (
                <>
                  <Col md="12">
                    <FormGroup>
                      <Label>Check No</Label>
                      <Input
                        type="numbers"
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
                onClick={generateCode}
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

import React, { useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import api from '../../constants/api';

const PurchaseorderSupplier = ({ receiptId, orderId,arb,arabic }) => {
  PurchaseorderSupplier.propTypes = {
    receiptId: PropTypes.any,
    orderId: PropTypes.any,
    arb:PropTypes.any,
    arabic:PropTypes.any
  };
  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }
  //All const Variable
  console.log('orderId',orderId);
  const [invoiceReceipt, setInvoiceReceipt] = useState();
  const [selectedInvoiceAmount, setSelectedInvoiceAmount] = useState(0);
  const [createReceipt, setCreateReceipt] = useState({
    amount: 0,
    payment_status: 'Paid',
    date: moment(),
    supplier_receipt_code: '',
  });
  const [selectedInvoice, setSelectedInvoice] = useState([]);
  //Setting Data in createReceipt
  const handleInputreceipt = (e) => {
    if (e.target.name === 'amount') {
      setCreateReceipt({ ...createReceipt, [e.target.name]: e.target.value });
    } else if (e.target.name === 'mode_of_payment') {
      setCreateReceipt({ ...createReceipt, mode_of_payment: e.target.value });
    } else if (e.target.name === 'payment_status') {
      setCreateReceipt({ ...createReceipt, payment_status: e.target.value });
    }
  };

  const addAndDeductAmount = (checkboxVal, receiptObj) => {
    const remainingAmount = receiptObj.prev_inv_amount;
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
      invoices = removeObjectWithId(invoiceReceipt, invObj.po_code);
      setSelectedInvoice(invoices);
    }
  };

  //Getting receipt data by order id
  const getinvoiceReceipt = () => {
    if (orderId) {
      api.post('/supplier/getMakePayment', { supplier_id: orderId }).then((res) => {
        const datafromapi = res.data.data;
        datafromapi.forEach((element) => {
           element.remainingAmount = element.prev_inv_amount - element.prev_amount ;
        });
        const result = datafromapi.filter((el) => {
          return el.prev_inv_amount !== el.prev_amount;
        });
        setInvoiceReceipt(result);
      });
    }
  };
  const updateReceipt = () => {
    // Create a payload with updated receipt data
    const updatedReceiptData = {
      supplier_receipt_id: receiptId, // Use the appropriate receipt ID
      amount: createReceipt.amount,
      mode_of_payment: createReceipt.mode_of_payment,
      date: createReceipt.date,
      remarks: createReceipt.remarks,
      payment_status: 'Paid',
    };
  if(createReceipt.amount){
    // Define the promises for updating receipt and invoice status
    const updateReceiptPromise = api.post('/supplier/edit-SupplierReceipt', updatedReceiptData);
  
    // Check if there are selected invoices to update
    if (selectedInvoice.length > 0) {
      const invoiceIds = selectedInvoice.map((invoice) => invoice.purchase_order_id);
  
      const updatedInvoiceStatusData = {
        po_code: invoiceIds,
        status: 'Paid', // Update to the appropriate status
      };
  
      const updateInvoiceStatusPromise = api.post('/supplier/edit-Supplier', updatedInvoiceStatusData);
  
      // Use Promise.all to wait for both promises to resolve
      Promise.all([updateReceiptPromise, updateInvoiceStatusPromise])
        .then(([receiptRes, invoiceRes]) => {
          // Handle success (you might want to show a success message)
          console.log('Receipt updated successfully', receiptRes);
          console.log('Invoice status updated successfully', invoiceRes);
          setTimeout(() => {
            window.location.reload();
          }, 300);
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
          console.log('Receipt updated successfully', res);
          window.location.reload();
        })
        .catch((error) => {
          // Handle error (you might want to show an error message)
          console.error('Error updating receipt', error);
        });
    }}
  };
  
  const deleteCreatedReceipt = () => {
    if (receiptId) {
      api
        .post('/supplier/deleteReceipt', { data: { supplier_receipt_id: receiptId } })
        .then(() => {
          console.log('Created receipt record deleted successfully');
          
        
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
      <Row key={element.purchase_order_id}>
        <Col md="12">
          <FormGroup check>
            <Input
              onChange={(e) => {
                addAndDeductAmount(e, element);
                getInvoices(e, element);
              }}
              name="po_code"
              type="checkbox"
            />
            <span>
              {element.po_code} ({element.prev_inv_amount})
            </span>
          </FormGroup>
        </Col>
      </Row>
    );
  })
) : (
  <p>No unpaid purchase available.</p>
)}
            <br></br>
            {/* { invoiceReceipt && invoiceReceipt.length>0? */}
            <Row>
            <Col md="12">
        <FormGroup>
          <Label>{arabic.find((item) => item.key_text === 'mdMakeSupplier.Amount')?.[genLabel]}</Label>
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
                  <Label>{arabic.find((item) => item.key_text === 'mdMakeSupplier.Date')?.[genLabel]}</Label>
                  <Input
                    type="date"
                    onChange={handleInputreceipt}
                    value={createReceipt && moment(createReceipt.date).format('YYYY-MM-DD')}
                    name="date"
                  />
                </FormGroup>
              </Col>
              <Col md="12">
                <FormGroup>
                  <Label>
                    {' '}
                 
                    {arabic.find((item) => item.key_text === 'mdMakeSupplier.ModeOfPayment')?.[genLabel]}<span className="required">*</span>{' '}
                  </Label>
                  <Input type="select" name="mode_of_payment" onChange={handleInputreceipt}>
                  
                    <option value="cash" selected="selected">Cash</option>
                    <option value="cheque">Cheque</option>
                    <option value="giro">Giro</option>
                  </Input>
                </FormGroup>
              </Col>
            
              <Col md="12">
                <FormGroup>
                  <Label>
                  {arabic.find((item) => item.key_text === 'mdMakeSupplier.Notes')?.[genLabel]}
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputreceipt}
                    
                  value={
                    arb
                      ? createReceipt && createReceipt.remarks_arb
                      : createReceipt && createReceipt.remarks
                  }
                  name={arb ? 'remarks_arb' : 'remarks'}
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
                {arb?'يحفظ':'Save'}
              </Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default PurchaseorderSupplier;
 
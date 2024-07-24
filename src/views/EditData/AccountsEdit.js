import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import moment from 'moment';
import ComponentCard from '../../components/ComponentCard';
//import AccountsButton from '../../components/AccountTable/AccountsButton';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import message from '../../components/Message';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import api from '../../constants/api';
import AccountsMainEdit from '../../components/AccountTable/AccountsMainEdit';
import AddNote from '../../components/Tender/AddNote';
import ViewNote from '../../components/Tender/ViewNote';
import creationdatetime from '../../constants/creationdatetime';
import ApiButton from '../../components/ApiButton';

const AccountsEdit = () => {
  //Const Variables
  const [totalAmount, setTotalAmount] = useState('');
  const [gstAmount, setGstAmount] = useState('');
  const [gstValue, setGstValue] = useState();
  const gstPercentageValue = parseInt(gstValue?.value, 10) || 0; 
  const [AccountsDetails, setAccountsDetails] = useState();
  const getGstValue = () => {
    api.get('/finance/getGst').then((res) => {
      setGstValue(res.data.data);
      });
  };
  
  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();
  // Button
  //const applyChanges = () => {};
  const backToList = () => {
    navigate('/Accounts');
  };

  useEffect(() => {
    getGstValue();
  }, []);
  // calculation connect with radio button
  const handleRadioGst = (radioVal, totalAmountF, gstValu, serviceCharge) => {
    /* eslint-disable */
    if (serviceCharge == '') {
      serviceCharge = 0;
    }
    if (totalAmountF == '') {
      totalAmountF = 0;
    }
    if (gstValu == '') {
      gstValu = 0;
    }
   
  
    
  let calculatedGstAmount = 0;
  if (radioVal === '1') {
    calculatedGstAmount = parseFloat(totalAmountF) * (gstPercentageValue / 100);
  }

  setGstAmount(calculatedGstAmount);
  setTotalAmount(parseFloat(totalAmountF) + calculatedGstAmount + parseFloat(serviceCharge));
    
  };
  //All Functions/Methods
  /* eslint-disable */
  const handleInputs = (e) => {
    setAccountsDetails({ ...AccountsDetails, [e.target.name]: e.target.value });
  };
 
  // Get Accounts By Id
  const editAccountsById = () => {
    api
      .post('/accounts/getAccountsById', { expense_id: id })
      .then((res) => {
        setAccountsDetails(res.data.data[0]);
        setTotalAmount(res.data.data[0].total_amount);
        setGstAmount(res.data.data[0].gst_amount);
      })
      .catch(() => {
        //message('Accounts Data Not Found', 'info');
      });
  };
  // Edit Accounts Data
 // ... Existing code ...

const editAccountsData = () => {
  // Check if the description is not empty
  if (AccountsDetails.invoice_code !== '') {
    // Check if the description already exists in the database
    api.post('/accounts/checkInvoiceCode', { invoice_code: AccountsDetails.invoice_code,expense_id: id })
      .then((response) => {
        const count = response.data.count;
        if (count > 0) {
          message('Invoice Code must be unique. Another record with the same invoice code already exists.', 'warning');
        } else {
          // If the description is unique, proceed with inserting the expense data

          // Show a confirmation dialog before saving the data
         
            AccountsDetails.total_amount = totalAmount;
            AccountsDetails.modification_date = creationdatetime;
            AccountsDetails.gst_amount = gstAmount;
            api.post('/accounts/editAccounts', AccountsDetails)
              .then(() => {
                message('Record edited successfully', 'success');
                editAccountsById();
                setTimeout(() => {
                  //navigate('/Accounts');
                }, 800);
              })
              .catch(() => {
                message('Error editing record', 'error');
              });
          
        }
      })
      .catch(() => {
        message('Error checking invoice code uniqueness', 'error');
      });
  } else {
    message('Please fill all required fields', 'warning');
  }
};

// ... Rest of the code ...

  // Delete Expense
  const deleteExpense = () => {
    api
      .post('/accounts/deleteExpense', { expense_id: id })
      .then(() => {
        message('Record editted successfully', 'success');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };
  useEffect(() => {
    editAccountsById();
  }, [id]);
  return (
    <>
      <BreadCrumbs heading={AccountsDetails && AccountsDetails.expense_id} />
      {/* Button */}
      {/* <AccountsButton
        id={id}
        editAccountsData={editAccountsData}
        navigate={navigate}
        applyChanges={applyChanges}
        deleteExpense={deleteExpense}
        backToList={backToList}
      ></AccountsButton> */}
       <ApiButton
              editData={editAccountsData}
              navigate={navigate}
              applyChanges={editAccountsData}
              deleteData={deleteExpense}
              backToList={backToList}
              module="Accounts"
            ></ApiButton>
      {/* Main Details */}

      <ToastContainer></ToastContainer>
      <Form>
        <FormGroup>
          <ComponentCard title="Account Details" creationModificationDate={AccountsDetails}>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>
                    Date <span className="required"> *</span>
                  </Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={
                      AccountsDetails &&
                      moment(AccountsDetails.date, 'YYYY-MM-DD').format('YYYY-MM-DD')
                    }
                    name="date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
  <FormGroup>
    <Label>Head</Label>
  <br/>
    {AccountsDetails && AccountsDetails.type === 'Expense' ? (
      <span>{AccountsDetails && AccountsDetails.group_name}</span>
    ) : (
      <span>{AccountsDetails && AccountsDetails.income_group_name}</span>
    )}
  </FormGroup>
</Col>
<Col md="3">
  <FormGroup>
    <Label> Sub Head</Label>
  <br/>
    {AccountsDetails && AccountsDetails.type === 'Expense' ? (
      <span>{AccountsDetails && AccountsDetails.sub_group_name}</span>
    ) : (
      <span>{AccountsDetails && AccountsDetails.income_sub_group_name}</span>
    )}
  </FormGroup>
</Col>

              {/* Radio button */}
              <Col md="3">
                <Label>GST</Label>
                <FormGroup check>
                  <Input
                    name="gst"
                    value="1"
                    onChange={(e) => {
                      handleInputs(e);
                      handleRadioGst(
                        e.target.value,
                        AccountsDetails.amount,
                        AccountsDetails.gst_amount,
                        AccountsDetails.service_charge,
                      );
                    }}
                    defaultChecked={AccountsDetails && AccountsDetails.gst === 1 && true}
                    type="radio"
                  />
                  <Label check>Yes</Label>
                </FormGroup>
                <FormGroup check>
                  <Input
                    name="gst"
                    value="0"
                    onChange={(e) => {
                      handleInputs(e);
                      handleRadioGst(
                        e.target.value,
                        AccountsDetails.amount,
                        AccountsDetails.gst_amount,
                        AccountsDetails.service_charge,
                      );
                    }}
                    defaultChecked={AccountsDetails && AccountsDetails.gst === 0 && true}
                    type="radio"
                  />{' '}
                  <Label check> No </Label>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>Amount before GST</Label>
                  <Input
                    type="text"
                    onChange={(e) => {
                      handleInputs(e);
                      handleRadioGst(
                        AccountsDetails.gst,
                        e.target.value,
                        AccountsDetails.gst_amount,
                        AccountsDetails.service_charge,
                      );
                    }}
                    name="amount"
                    value={AccountsDetails && AccountsDetails.amount}
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>GST Amount </Label>
                  <Input
                  disabled
                    type="text"
                    onChange={(e) => {
                      handleInputs(e);
                    
                    }}
                    name="gst_amount"
                    value={gstAmount.toLocaleString('en-IN', { minimumFractionDigits: 0 })}
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Service Charges</Label>
                  <Input
                    type="number"
                    min={0}
                    onChange={(e) => {
                      handleInputs(e);
                      handleRadioGst(
                        AccountsDetails.gst,
                        AccountsDetails.amount,
                        AccountsDetails.gst_amount,
                        e.target.value,
                      );
                    }}
                    value={AccountsDetails && AccountsDetails.service_charge}
                    name="service_charge"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Total Amount </Label>
                  <Input
                    disabled
                    type="text"
                    onChange={(e) => {
                      handleInputs(e);
                    }}
                    value={totalAmount}
                    name="total_amount"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <AccountsMainEdit
                handleInputs={handleInputs}
                AccountsDetails={AccountsDetails}
              ></AccountsMainEdit>
            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>
      {/* ADD NODE */}

      <ComponentCard title="Add a note">
        <AddNote recordId={id} roomName="AccountEdit" />
        <ViewNote recordId={id} roomName="AccountEdit" />
      </ComponentCard>
    </>
  );
};
export default AccountsEdit;

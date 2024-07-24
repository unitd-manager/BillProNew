import React, { useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import moment from 'moment';
import ComponentCard from '../../components/ComponentCard';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import message from '../../components/Message';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import api from '../../constants/api';
import AccountsMainDetails from '../../components/AccountTable/AccountsMainDetails';
import AccountsDetailsButton from '../../components/AccountTable/AccountsDetailsButton';
import creationdatetime from '../../constants/creationdatetime';

const AccountsDetails = () => {
  //Const Variables
  const [totalAmount, setTotalAmount] = useState('');
  const [gstAmount, setGstAmount] = useState('');
  const [groups, setGroup] = useState();
  const [subgroup, setSubgroup] = useState();
  const [selectedType, setSelectedType] = useState(''); // Default to 'Expense'


  // Navigation and Parameter Constants
  const navigate = useNavigate();
  const { groupss } = useParams();

  // get group
  const getGroup = () => {
    api.get('/accounts/getGroupTitle').then((res) => {
      setGroup(res.data.data);
    });
  };

  const getIncomeGroup = () => {
    api.get('/accounts/getIncomeGroupTitle').then((res) => {
      setGroup(res.data.data);
    });
  };
  // get subgroup
  const getSubGroup = (headId) => {
    api
      .post('/accounts/getSubGroupTitle', { expense_group_id: headId })
      .then((res) => {
        setSubgroup(res.data.data);
      })
      .catch(() => {
        //message('ExpenseHead Data Not Found', 'info');
      });
  };

  const getIncomeSubGroup = (incomeGroupId) => {
    api
      .post('/accounts/getIncomeSubGroupTitle', { income_group_id: incomeGroupId })
      .then((res) => {
        setSubgroup(res.data.data);
      })
      .catch(() => {
        //message('ExpenseHead Data Not Found', 'info');
      });
  };
  // insertExpense const
  const [AccountsDetail, setAccountsDetail] = useState({
    expense_id: '',
    date: moment(Date.now()).format('YYYY-MM-DD'),
    group: '',
    sub_group: '',
    gst: '1',
    amount: 0,
    gst_amount: 0,
    service_charge: 0,
    total_amount: '',
    description: '',
    invoice_code: '',
    invoice_date: '',
    payment_ref_no: '',
    payment_date: '',
    job_id: '',
    payment_status: '',
    remarks: '',
    type: '',
  });
  // calculation connect with radio button
  const handleRadioGst = (radioVal, totalAmountF, gstValue, serviceCharge) => {
    /* eslint-disable */
    if (serviceCharge == '') {
      serviceCharge = 0;
    }
    if (totalAmountF == '') {
      totalAmountF = 0;
    }
    if (gstValue == '') {
      gstValue = 0;
    }
    let calculatedGstAmount = 0;
    if (radioVal === '1') {
      calculatedGstAmount = parseFloat(totalAmountF) * 7 / 100;
    }
  
    setGstAmount(calculatedGstAmount);
    setTotalAmount(parseFloat(totalAmountF) + calculatedGstAmount + parseFloat(serviceCharge));
      
  };
 

  const handleInputs = (e) => {
    setAccountsDetail({ ...AccountsDetail, [e.target.name]: e.target.value });
  
    if (e.target.name === 'group') {
      const selectedGroupId = e.target.value;
      if (selectedType === 'Expense') {
        getSubGroup(selectedGroupId);
      } else if (selectedType === 'Income') {
        getIncomeSubGroup(selectedGroupId);
      }
   
    }
  };
  

  // insertExpense
 // insertExpense
const insertExpense = () => {
  // Check if the description is not empty
  if (
    AccountsDetail.group !== '' &&
    AccountsDetail.amount !== '' &&
    AccountsDetail.description !== '' &&
    AccountsDetail.invoice_code !== ''
  ) {
    // Check if the description already exists in the database
    api
      .post('/accounts/checkInvoiceCodeUnique', { invoice_code: AccountsDetail.invoice_code })
      .then((response) => {
        const count = response.data.count;
        if (count > 0) {
          message('Invoice Code  must be unique. Another record with the same invoice code already exists.', 'warning');
        } else {
          // If the description is unique, proceed with inserting the expense data
          AccountsDetail.date = moment();
          AccountsDetail.total_amount = totalAmount;
          AccountsDetail.gst_amount = gstAmount;
          AccountsDetail.creation_date = creationdatetime;
          api
            .post('/accounts/insertexpense', AccountsDetail)
            .then((res) => {
              const insertedDataId = res.data.data.insertId;
              console.log(insertedDataId);
              message('Expense inserted successfully.', 'success');
              setTimeout(() => {
                navigate(`/AccountsEdit/${insertedDataId}`);
              }, 300);
            })
           
        }
      })
     
  } else {
    message('Please fill all required fields', 'warning');
  }
};
useEffect(() => {
  if (selectedType === 'Income') {
    getIncomeGroup();
  } else if (selectedType === 'Expense') {
    getGroup();
  }
  setSubgroup([]);
}, [selectedType]);


  return (
    <>
      <BreadCrumbs heading={AccountsDetail && AccountsDetail.expense_id} />
      
      <ToastContainer></ToastContainer>
      {/* Main Details Insert */}
      <Form>
        <FormGroup>
          <ComponentCard title="New Accounts">
          <AccountsDetailsButton
              insertExpense={insertExpense}
              navigate={navigate}
            ></AccountsDetailsButton>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>
                    Date <span className="required"> *</span>
                  </Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    defaultValue={moment(Date.now()).format('YYYY-MM-DD')}
                    name="date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
  <Label>Type</Label>
  <select
    name="type"
    value={selectedType}
    onChange={(e) => {
      setSelectedType(e.target.value);
      handleInputs(e);
    }}
  >
    <option value="" selected>
      Please Select
    </option>
    <option value="Income">Income</option>
    <option value="Expense">Expense</option>
  </select>
</Col>
<Col md="3">
  <Label>
    Head <span className="required"> *</span>{' '}
  </Label>
  <Input
    type="select"
    name="group"
    onChange={(e) => {
      handleInputs(e);
      const selectedGroupId = e.target.value;
      if (selectedType === 'Expense') {
        getSubGroup(selectedGroupId);
      } else if (selectedType === 'Income') {
        getIncomeSubGroup(selectedGroupId);
      }
    }}
    value={groupss}
  >
    <option value="" selected>
      Please Select
    </option>
    
    {groups &&
      groups.map((ele) => {
        return (
          <option
            key={ele.expense_group_id}
            value={
              selectedType === 'Income'
                ? ele.income_group_id
                : ele.expense_group_id
            }
          >
            {ele.title}
          </option>
        );
      })}
  </Input>
</Col>

<Col md="3">
  <Label>Sub Head </Label>
  <Input type="select" name="sub_group" onChange={handleInputs} value={AccountsDetail.sub_group}>
    <option value="" selected>
      Please Select
    </option>
    {subgroup &&
      subgroup.map((ele) => {
        return <option key={ele.expense_sub_group_id}
        value={
          selectedType === 'Income'
            ? ele.income_sub_group_id
            : ele.expense_sub_group_id
        }>{ele.title}</option>;
      })}
  </Input>
</Col>

              {/* radio button */}
              <Col md="3">
                <Label>GST</Label>
                <FormGroup defaultcheck>
                  <Input
                    name="gst"
                    value="1"
                    onChange={(e) => {
                      handleInputs(e);
                      handleRadioGst(
                        e.target.value,
                        AccountsDetail.amount,
                        AccountsDetail.gst_amount,
                        AccountsDetail.service_charge,
                      );
                    }}
                    checked={AccountsDetail.gst === '1'}
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
                        AccountsDetail.amount,
                        AccountsDetail.gst_amount,
                        AccountsDetail.service_charge,
                      );
                    }}
                    checked={AccountsDetail.gst === '0'}
                    type="radio"
                  />{' '}
                  <Label check> No </Label>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>
                    Amount before GST <span className="required"> *</span>
                  </Label>
                  <Input
                    type="text"
                    onChange={(e) => {
                      handleInputs(e);
                      handleRadioGst(
                        AccountsDetail.gst,
                        e.target.value,
                        AccountsDetail.gst_amount,
                        AccountsDetail.service_charge,
                      );
                    }}
                    name="amount"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>GST Amount </Label>
                  <Input
                    type="number"
                    onChange={(e) => {
                      handleInputs(e);
                      handleRadioGst(
                        AccountsDetail.gst,
                        AccountsDetail.amount,
                        e.target.value,
                        AccountsDetail.service_charge,
                      );
                    }}
                    name="gst_amount"
                    value={gstAmount}
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
                        AccountsDetail.gst,
                        AccountsDetail.amount,
                        AccountsDetail.gst_amount,
                        e.target.value,
                      );
                    }}
                    value={AccountsDetail && AccountsDetail.service_charge}
                    name="service_charge"
                  />
                </FormGroup>
              </Col>
              {/* Total Amount */}
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
              <AccountsMainDetails
                handleInputs={handleInputs}
                AccountsDetails={AccountsDetails}
              ></AccountsMainDetails>
            </Row>
           
          </ComponentCard>
        </FormGroup>
      </Form>
    </>
  );
};
export default AccountsDetails;

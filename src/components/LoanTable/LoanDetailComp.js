import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import ComponentCard from '../ComponentCard';
import api from '../../constants/api';

export default function LoanDetailComp({ loanDetails, loanStatus, handleInputs }) {
  LoanDetailComp.propTypes = {
    loanDetails: PropTypes.object,
    handleInputs: PropTypes.func,
    loanStatus: PropTypes.string,
    
  };
  const [employee, setEmployee] = useState();

  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };

  const selectedLanguage = getSelectedLanguageFromLocalStorage();

  // Use the selected language value as needed
  console.log('Selected language from localStorage:', selectedLanguage);
  const getEmployee = () => {
    api
      .get('/loan/TabEmployee')
      .then((res) => {
        console.log(res.data.data);
        setEmployee(res.data.data);
      })
      .catch(() => {});
  };

  const [arabic, setArabic] = useState([]);

  const arb = selectedLanguage === 'Arabic';

  // const eng = selectedLanguage === 'English';

  const getArabicCompanyName = () => {
    api
      .get('/loan/getTranslationforHRLoan')
      .then((res) => {
        setArabic(res.data.data);
      })
      .catch(() => {
        // Handle error if needed
      });
  };
  console.log('arabic', arabic);
  useEffect(() => {
    getArabicCompanyName();
    getEmployee();
  }, []);

  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }

  return (
    <Form>
      <FormGroup>
        <ComponentCard title="Loan Details" creationModificationDate={loanDetails}>
          <Row>
          <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                  <span style={{ color: 'red' }}>*</span>
                    {
                      arabic.find((item) => item.key_text === 'mdHRLoan.Employee Name')?.[
                        genLabel
                      ]
                    }
                 
                  </Label>

                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={loanDetails && loanDetails.employee_id}
                    name="employee_id"
                  >
                    <option defaultValue="selected">Please Select</option>
                    {employee &&
                      employee.map((e) => {
                        return (
                          <option key={e.employee_id} value={e.employee_id}>
                            {' '}
                            {arb ? e.employee_name_arb : e.employee_name}{' '}
                          </option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Col>


         
            {(loanStatus ===  'Approved' ||
              loanStatus === 'Hold' ||
                loanStatus ===  'Denied' ||
                  loanStatus ===  'Waiting for Approval' ||
                    loanStatus === 'Applied') && (
                <Col md="3">
                  <FormGroup>
                    <Label dir="rtl" style={{ textAlign: 'right' }}>
                      {arabic.find((item) => item.key_text === 'mdHRLoan.Status')?.[genLabel]}{' '}
                    </Label>
                    <Input
                      type="select"
                      onChange={handleInputs}

                      value={
                        arb
                ? loanDetails && loanDetails.status_arb
                  ? loanDetails.status_arb
                  : loanDetails && loanDetails.status_arb !== null
                  ? ''
                  : loanDetails && loanDetails.status
                : loanDetails && loanDetails.status
            }
            name={arb ? 'status_arb' : 'status'}
             >
                      <option>{arb? 'الرجاء التحديد': 'Please Select'}</option>
                      <option value="Approved">{arb ? 'موافقة' : 'Approved'}</option>
                      <option value="Active">{arb ? 'نشيط' : 'Active'}</option>
                      <option value="Hold">{arb ? 'يمسك' : 'Hold'}</option>
                      <option value="Closed">{arb ? 'مغلق' : 'Closed'}</option>
                      <option value="Denied">{arb ? 'رفض' : 'Denied'}</option>
                      <option value="Waiting for Approval">{arb ? 'بانتظار الموافقة' : 'Waiting for Approval'}</option>
                      <option defaultValue="selected" value="Applied">
                      {arb ? 'مُطبَّق' : 'Applied'}
                      </option>
                  </Input>
                  </FormGroup>
                </Col>
              )}
            {(loanStatus === 'Active' || loanStatus === 'Closed') && (
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                      {arabic.find((item) => item.key_text === 'mdHRLoan.Status')?.[genLabel]}{' '}
                      <span style={{ color: 'red' }}>*</span>
                    </Label>
                                      <Input
                    type="select"
                    disabled
                    value={
                      arb
              ? loanDetails && loanDetails.status_arb
                ? loanDetails.status_arb
                : loanDetails && loanDetails.status_arb !== null
                ? ''
                : loanDetails && loanDetails.status
              : loanDetails && loanDetails.status
          }
          name={arb ? 'status_arb' : 'status'}
           >
                     <option>{arb? 'الرجاء التحديد': 'Please Select'}</option>
                      <option value="Approved">{arb ? 'موافقة' : 'Approved'}</option>
                      <option value="Active">{arb ? 'نشيط' : 'Active'}</option>
                      <option value="Hold">{arb ? 'يمسك' : 'Hold'}</option>
                      <option value="Closed">{arb ? 'مغلق' : 'Closed'}</option>
                      <option value="Denied">{arb ? 'رفض' : 'Denied'}</option>
                      <option value="Waiting for Approval">{arb ? 'بانتظار الموافقة' : 'Waiting for Approval'}</option>
                      <option defaultValue="selected" value="Applied">
                      {arb ? 'مُطبَّق' : 'Applied'}
                      </option>

                   
                   </Input>
                </FormGroup>
              </Col>
            )}

            <Col md="3">
              <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
            <span style={{ color: 'red' }}>*</span>
                      {arabic.find((item) => item.key_text === 'mdHRLoan.Type of Loan')?.[genLabel]}{' '}
                    </Label>
                
                <Input
                   type="select"
                   onChange={handleInputs}
                 
                  value={
                    arb
            ? loanDetails && loanDetails.type_arb
              ? loanDetails.type_arb
              : loanDetails && loanDetails.type_arb !== null
              ? ''
              : loanDetails && loanDetails.type
            : loanDetails && loanDetails.type
        }
        name={arb ? 'type_arb' : 'type'}
         >                
                
                  <option>{arb ?'': 'Please Select'}</option>
                  <option value="Car Loan">{arb ?'':'Car Loan'}</option>
                  <option value="Personal Loan">{arb ?'':"Personal Loan"}</option>
                  <option value="Home Loan">{arb ?'':'Home Loan'}</option>
                  <option value="other">{arb ?'':'Other'}</option>
                  </Input>
 
                  </FormGroup>
            
            </Col>

            <Col md="3">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
              <span style={{ color: 'red' }}>*</span>
                      {arabic.find((item) => item.key_text === 'mdHRLoan.Loan Application Date')?.[genLabel]}{' '}
                  
                    </Label>
                <Input
                  value={
                    arb
            ? loanDetails && loanDetails.date_arb
              ? loanDetails.date_arb
              : loanDetails && loanDetails.date_arb !== null
              ? ''
              : loanDetails && loanDetails.date
            : loanDetails && loanDetails.date
        }
        name={arb ? 'date_arb' : 'date'}
         
                  type="date"
                  onChange={handleInputs}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            {loanStatus !== 'Active' && loanStatus !== 'Closed' && (
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                      {arabic.find((item) => item.key_text === 'mdHRLoan.Total Loan Amount')?.[genLabel]}{' '}
                    </Label>
                                <Input
                    value={
                      arb
              ? loanDetails && loanDetails.amount_arb
                ? loanDetails.amount_arb
                : loanDetails && loanDetails.amount_arb !== null
                ? ''
                : loanDetails && loanDetails.amount
              : loanDetails && loanDetails.amount
          }
          name={arb ? 'amount_arb' : 'amount'}
           
                    type="number"
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>
            )}
            {(loanStatus === 'Active' || loanStatus === 'Closed') && (
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                      {arabic.find((item) => item.key_text === 'mdHRLoan.Total Loan Amount')?.[genLabel]}{' '}
                    </Label>
                 <br />
                  <span>{loanDetails && loanDetails.amount}</span>
                </FormGroup>
              </Col>
            )}
            <Col md="3">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                      {arabic.find((item) => item.key_text === 'mdHRLoan.Amount Payable	')?.[genLabel]}{' '}
                    </Label>
                                <Input
                  type="text"
                  onChange={handleInputs}

                  value={
                    arb
            ? loanDetails && loanDetails.month_amount_arb
              ? loanDetails.month_amount_arb
              : loanDetails && loanDetails.month_amount_arb !== null
              ? ''
              : loanDetails && loanDetails.month_amount
            : loanDetails && loanDetails.month_amount
        }
        name={arb ? 'month_amount_arb' : 'month_amount'}
         
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                      {arabic.find((item) => item.key_text === 'mdHRLoan.Loan Start Date')?.[genLabel]}{' '}
                    </Label>
                              <br />
                {(loanStatus === 'Active' || loanDetails.loan_start_date) && (
                  <span>
                    {loanDetails.loan_start_date
                      ? moment(loanDetails.loan_start_date).format('DD-MM-YYYY')
                      : ''}
                  </span>
                )}
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                      {arabic.find((item) => item.key_text === 'mdHRLoan.Actual Loan Closing Date')?.[genLabel]}{' '}
                    </Label>
                              <br />
                {loanDetails && loanDetails.loan_closing_date && (
                  <span>
                    {loanDetails.loan_closing_date
                      ? moment(loanDetails.loan_closing_date).format('DD-MM-YYYY')
                      : ''}
                  </span>
                )}
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                      {arabic.find((item) => item.key_text === 'mdHRLoan.Amount Payable	')?.[genLabel]}{' '}
                    </Label>
                <br />

                <span>{loanDetails && loanDetails.amount_payable}</span>
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                      {arabic.find((item) => item.key_text === 'mdHRLoan.Notes')?.[genLabel]}{' '}
                    </Label>
                <Input
                  type="textarea"
                  onChange={handleInputs}
                  value={
                    arb
            ? loanDetails && loanDetails.notes_arb
              ? loanDetails.notes_arb
              : loanDetails && loanDetails.notes_arb !== null
              ? ''
              : loanDetails && loanDetails.notes
            : loanDetails && loanDetails.notes
        }
        name={arb ? 'notes_arb' : 'notes'}
         
                />
              </FormGroup>
            </Col>
          </Row>
        </ComponentCard>
      </FormGroup>
    </Form>
  );
}

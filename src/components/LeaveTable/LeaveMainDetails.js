import React, { useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';

import moment from 'moment';
import api from '../../constants/api';
import ComponentCard from '../ComponentCard';

export default function LeaveMainDetails({ handleInputs, leavesDetails,difference }) {
  LeaveMainDetails.propTypes = {
    handleInputs: PropTypes.func,
    leavesDetails: PropTypes.object, 
    difference: PropTypes.any,
  };
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  const selectedLanguage = getSelectedLanguageFromLocalStorage();
  const [arabic, setArabic] = useState([]);


  const arb =selectedLanguage === 'Arabic'

  // const eng =selectedLanguage === 'English'
   

  const getArabicCompanyName = () => {
      api
      .get('/leave/getTranslationforHRLeave')
      .then((res) => {
        setArabic(res.data.data);
      })
      .catch(() => {
        // Handle error if needed
      });   
  };
  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }
  useEffect(() => {
    
    getArabicCompanyName();

  }, []);

 
  return (
    <>
      <ComponentCard title= {arb? 'اترك التعديل': "Leave Edit"} creationModificationDate={leavesDetails}>
        <Form>
          <FormGroup>
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label> {arabic.find((item) => item.key_text === 'mdHRLeave.Employee Name')?.[genLabel]}
</Label>
                  <br />
                  <span>{leavesDetails && leavesDetails.employee_name}</span>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                <Label> {arabic.find((item) => item.key_text === 'mdHRLeave.Designation')?.[genLabel]}
</Label>                  <br />
                  <span>{leavesDetails && leavesDetails.position}</span>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Applied Date</Label>
                  <Input
                    type="Date"
                    onChange={handleInputs}
                    value={leavesDetails && moment(leavesDetails.date).format('YYYY-MM-DD')}
                    name="date"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="4">
                <Label>Status <span style={{ color: 'red' }}>*</span></Label>
                <Input
                  type="select"
                  onChange={handleInputs}
                  value={leavesDetails && leavesDetails.status}
                  name="status"
                >
                  <option defaultValue="selected">Applied</option>
                  <option value="Approved">Approved</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="HR Approved">HR Approved</option>
                  <option value="Denied">Denied</option>
                  <option value="Hold">Hold</option>
                  <option value="Waiting for Approval">Waiting for Approval</option>
                </Input>
              </Col>
              <Col md="4">
                <Label>Type of Leave <span style={{ color: 'red' }}>*</span></Label>
                <Input
                  type="select"
                  onChange={(e) => {
                    handleInputs(e);
                  }}
                  value={leavesDetails && leavesDetails.leave_type}
                  name="leave_type"
                >
                  <option defaultValue="selected">Please Select</option>
                  <option value="Absent">Absent</option>
                  <option value="Annual Leave">Annual Leave</option>
                  <option value="Hospitalization Leave">Hospitalization Leave</option>
                  <option value="Sick Leave">Sick Leave</option>
                </Input>
              </Col>

              {leavesDetails && leavesDetails.leave_type === 'Annual Leave' && (
                <Col md="4">
                  <Label>Went Overseas</Label>
                  <FormGroup>
                    <Input
                      type="radio"
                      name="went_overseas"
                      value="1"
                      onChange={handleInputs}
                      defaultChecked={leavesDetails && leavesDetails.went_overseas === 1 && true}
                    ></Input>
                    <Label>Yes</Label>
                    <br></br>
                    <Input
                      type="radio"
                      name="went_overseas"
                      value="0"
                      onChange={handleInputs}
                      defaultChecked={leavesDetails && leavesDetails.went_overseas === 0 && true}
                    ></Input>
                    <Label>No</Label>
                  </FormGroup>
                </Col>
              )}
            </Row>
          </FormGroup>
        </Form>
      </ComponentCard>
      <ComponentCard title="More Details">
        <Form>
          <Row>
            <Col md="6">
              <FormGroup>
                <Label>From Date <span style={{ color: 'red' }}>*</span></Label>
                <Input
                  type="date"
                  onChange={handleInputs}
                  value={leavesDetails && moment(leavesDetails.from_date).format('YYYY-MM-DD')}
                  name="from_date"
                />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label>To Date <span style={{ color: 'red' }}>*</span></Label>
                <Input
                  type="date"
                  onChange={handleInputs}
                  min={leavesDetails && moment(leavesDetails.from_date).format('YYYY-MM-DD')}
                  value={leavesDetails && moment(leavesDetails.to_date).format('YYYY-MM-DD')}
                  name="to_date"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <FormGroup>
                <Label>No of Days(Current Month) <span style={{ color: 'red' }}>*</span></Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={leavesDetails && leavesDetails.no_of_days}
                  name="no_of_days"
                />
              </FormGroup>
            </Col>
            {difference? (
              <Col md="3">
                <FormGroup>
                  <Label>No of Days(Next Month)</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={leavesDetails && leavesDetails.no_of_days_next_month}
                    name="no_of_days_next_month"
                  />
                </FormGroup>
              </Col>
            ):''}
            <Col md="3">
              <FormGroup>
                <Label>Reason</Label>
                <Input
                  type="textarea"
                  onChange={handleInputs}
                  value={leavesDetails && leavesDetails.reason}
                  name="reason"
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </ComponentCard>
    </>
  );
}

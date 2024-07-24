import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';

export default function JobProbation({ handleInputs, jobModal, handleInputsRadio }) {
  JobProbation.propTypes = {
    handleInputs: PropTypes.object,
    jobModal: PropTypes.object,
    handleInputsRadio: PropTypes.object,
  };
  return (
    <FormGroup>
      <Row>
        <Col md="3">
          <FormGroup>
            <Label>Salary Period</Label>
            <Input
              type="select"
              value={jobModal && jobModal.payment_type}
              name="payment_type"
              onChange={handleInputs}
            >
              <option value="" selected="selected">
                Please Select
              </option>
              <option value="monthly">Monthly</option>
              <option value="fortnightly">Fort Nightly</option>
              <option value="weekly">Weekly</option>
              <option value="daily">Daily</option>
              <option value="hourly">Hourly</option>
            </Input>
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>Date(s) of Salary Payment</Label>
            <Input
              type="textbox"
              onChange={handleInputs}
              value={jobModal && jobModal.salary_payment_dates}
              name="salary_payment_dates"
            />
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>Date(s) of Overtime Payment (if different)</Label>
            <Input
              type="textbox"
              onChange={handleInputs}
              value={jobModal && jobModal.overtime_payment_dates}
              name="overtime_payment_dates"
            />
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>
              Working Calendar(No of Days/Week)(KET) <span className="required"> *</span>
            </Label>
            <Input
              type="select"
              value={jobModal && jobModal.working_days}
              name="working_days"
              onChange={handleInputs}
            >
              <option value="" selected="selected">
                Please Select
              </option>
              <option value="5">5</option>
              <option value="5.5">5.5</option>
              <option value="6">6</option>
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md="3">
          <FormGroup>
            <Label>
              Basic Pay <span className="required"> *</span>
            </Label>
            <Input
              type="numbers"
              onChange={(e) => {
                handleInputs(e);
                handleInputsRadio(jobModal.over_time_rate, e.target.value, jobModal.overtime);
              }}
              value={jobModal && jobModal.basic_pay}
              name="basic_pay"
            />
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label> Overtime Applicable</Label>
            <br></br>
            <Label> Yes </Label>
            &nbsp;
            <Input
              name="overtime"
              value="1"
              type="radio"
              defaultChecked={jobModal && jobModal.overtime === 1 && true}
              onChange={(e) => {
                handleInputs(e);
                handleInputsRadio(jobModal.over_time_rate, e.target.value, jobModal.basic_pay);
              }}
            />
            &nbsp;
            &nbsp;
            <Label> No </Label>
            &nbsp;
            <Input
              name="overtime"
              value="0"
              type="radio"
              defaultChecked={jobModal && jobModal.overtime === 0 && true}
              onChange={(e) => {
                handleInputs(e);
                handleInputsRadio(jobModal.over_time_rate, e.target.value, jobModal.basic_pay);
              }}
            />
          </FormGroup>
        </Col>
        {jobModal && jobModal.overtime === '1' && (
          <Col md="3">
            <FormGroup>
              <Label>
                Over Time Rate<span className="required"> *</span>
              </Label>
              <Input
                type="select"
                value={jobModal && jobModal.over_time_rate}
                name="govt_donation"
                onChange={(e) => {
                  handleInputs(e);
                  handleInputsRadio(jobModal.overtime, e.target.value, jobModal.basic_pay);
                }}
              >
                <option value="" selected="selected">
                  Please Select
                </option>
                <option value="1.5">1.5</option>
                <option value="2.0">2.0</option>
              </Input>
            </FormGroup>
          </Col>
        )}
        {/* <Col md="3">
          <FormGroup>
            <Label>Overtime Pay Rate/ Hour</Label>
            <Input
              type="numbers"
              onChange={handleInputs}
              value={jobModal && jobModal.overtime_pay_rate}
              name="overtime_pay_rate"
            />
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>Transport</Label>
            <Input
              type="numbers"
              onChange={handleInputs}
              value={jobModal && jobModal.allowance1}
              name="allowance1"
            />
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>Entertainment</Label>
            <Input
              type="numbers"
              onChange={handleInputs}
              value={jobModal && jobModal.allowance2}
              name="allowance2"
            />
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>Food</Label>
            <Input
              type="numbers"
              onChange={handleInputs}
              value={jobModal && jobModal.allowance3}
              name="allowance3"
            />
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>Shift Allowance</Label>
            <Input
              type="numbers"
              onChange={handleInputs}
              value={jobModal && jobModal.allowance4}
              name="allowance4"
            />
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>Others</Label>
            <Input
              type="numbers"
              onChange={handleInputs}
              value={jobModal && jobModal.allowance5}
              name="allowance5"
            />
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>Housing</Label>
            <Input
              type="numbers"
              onChange={handleInputs}
              value={jobModal && jobModal.deduction1}
              name="deduction1"
            />
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>Transportation</Label>
            <Input
              type="numbers"
              onChange={handleInputs}
              value={jobModal && jobModal.deduction2}
              name="deduction2"
            />
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>Food</Label>
            <Input
              type="numbers"
              onChange={handleInputs}
              value={jobModal && jobModal.deduction3}
              name="deduction3"
            />
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>Others</Label>
            <Input
              type="numbers"
              onChange={handleInputs}
              value={jobModal && jobModal.deduction4}
              name="deduction4"
            />
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>Levy</Label>
            <Input
              type="numbers"
              onChange={handleInputs}
              value={jobModal && jobModal.levy_amount}
              name="levy_amount"
            />
          </FormGroup>
        </Col> */}
      </Row>
    </FormGroup>
  );
}

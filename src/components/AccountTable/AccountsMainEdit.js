import React from 'react';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';

export default function AccountsMainEdit({ handleInputs, AccountsDetails }) {
  AccountsMainEdit.propTypes = {
    handleInputs: PropTypes.func,
    AccountsDetails: PropTypes.any,
  };
  return (
    <FormGroup>
      <Row>
        <Col md="3">
          <FormGroup>
            <Label>Description </Label>
            <Input
              type="text"
              onChange={handleInputs}
              value={AccountsDetails && AccountsDetails.description}
              name="description"
            />
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>Invoice No </Label>
            <Input
              type="text"
              onChange={handleInputs}
              value={AccountsDetails && AccountsDetails.invoice_code}
              name="invoice_code"
            />
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>invoice Date </Label>
            <Input
              type="date"
              onChange={handleInputs}
              value={AccountsDetails && moment(AccountsDetails.invoice_date).format('YYYY-MM-DD')}
              name="invoice_date"
            />
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>Payment Ref No </Label>
            <Input
              type="text"
              onChange={handleInputs}
              value={AccountsDetails && AccountsDetails.payment_ref_no}
              name="payment_ref_no"
            />
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>Payment Date </Label>
            <Input
              type="date"
              onChange={handleInputs}
              value={AccountsDetails && moment(AccountsDetails.payment_date).format('YYYY-MM-DD')}
              name="payment_date"
            />
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>Job Id </Label>
            <Input
              type="text"
              onChange={handleInputs}
              value={AccountsDetails && AccountsDetails.job_id}
              name="job_id"
            />
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>Status</Label>
            <Input
              type="select"
              onChange={handleInputs}
              name="payment_status"
              value={AccountsDetails && AccountsDetails.payment_status}
            >
              <option defaultValue="selected" value="New">
                please Select
              </option>
              <option value="Due">Due</option>
              <option value="Partial Payment">Partial Payment</option>
              <option value="Paid">Paid</option>
              <option value="On-hold">On-hold</option>
              <option value="Cancelled">Cancelled</option>
            </Input>
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>Remarks </Label>
            <Input
              type="textarea"
              onChange={handleInputs}
              value={AccountsDetails && AccountsDetails.remarks}
              name="remarks"
            />
          </FormGroup>
        </Col>
      </Row>
    </FormGroup>
  );
}

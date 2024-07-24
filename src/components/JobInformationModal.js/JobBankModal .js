import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';

export default function JobBankModal({ handleInputs, jobModal, allBankModal }) {
  JobBankModal.propTypes = {
    handleInputs: PropTypes.object,
    jobModal: PropTypes.object,
    allBankModal: PropTypes.object,
  };
  return (
    <>
      <FormGroup>
        <Row>
          <Col md="3">
            <FormGroup>
              <Label>Mode of Payment</Label>

              <Input
                type="select"
                value={jobModal && jobModal.mode_of_payment}
                name="mode_of_payment"
                onChange={handleInputs}
              >
                <option value="" selected="selected">
                  Please Select
                </option>
                <option value="cheque">Cheque</option>
                <option value="cash">Cash</option>
                <option value="giro payment transfer">giro payment transfer</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label>Account No</Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={jobModal && jobModal.account_no}
                name="account_no"
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label>Bank</Label>
              <Input
                type="select"
                name="bank_name"
                onChange={handleInputs}
                value={jobModal && jobModal.bank_name}
              >
                <option selected="selected" value="">
                  Please Select
                </option>
                {allBankModal &&
                  allBankModal.map((bank) => (
                    <option value={bank.bank_name}>{bank.bank_name}</option>
                  ))}
              </Input>
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label>Bank Code</Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={jobModal && jobModal.bank_code}
                name="bank_code"
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label>Branch Code</Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={jobModal && jobModal.branch_code}
                name="branch_code"
              />
            </FormGroup>
          </Col>
        </Row>
      </FormGroup>
    </>
  );
}

import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';

export default function JobSalary({ handleInputs, jobModal }) {
  JobSalary.propTypes = {
    handleInputs: PropTypes.object,
    jobModal: PropTypes.object,
  };
  return (
    <>
      <Row>
        <Col md="3">
          <FormGroup>
            <Label> CPF Applicable</Label>
            <br></br>
            <Label> Yes </Label>
            <Input
              name="cpf_applicable"
              value="1"
              type="radio"
              defaultChecked={jobModal && jobModal.cpf_applicable === 1 && true}
              onChange={handleInputs}
            />
            <Label> No </Label>
            <Input
              name="cpf_applicable"
              value="0"
              type="radio"
              defaultChecked={jobModal && jobModal.cpf_applicable === 0 && true}
              onChange={handleInputs}
            />
          </FormGroup>
        </Col>

        <Col md="3">
          <FormGroup>
            <Label>
              Govt donation<span className="required"> *</span>
            </Label>
            <Input
              type="select"
              value={jobModal && jobModal.govt_donation}
              name="govt_donation"
              onChange={handleInputs}
            >
              <option value="" selected="selected">
                Please Select
              </option>
              <option value="pay_cdac">CDAC</option>
              <option value="pay_sinda">SINDA</option>
              <option value="pay_mbmf">MBMF</option>
              <option value="pay_eucf">EUEF</option>
            </Input>
          </FormGroup>
        </Col>
        {jobModal && jobModal.govt_donation === 'pay_cdac' && (
          <Col md="3">
            <FormGroup>
              <Label>Pay CDAC</Label>
              <Input
                type="numbers"
                onChange={handleInputs}
                value={jobModal && jobModal.pay_cdac}
                name="pay_cdac"
              />
            </FormGroup>
          </Col>
        )}
        {jobModal && jobModal.govt_donation === 'pay_sinda' && (
          <Col md="3">
            <FormGroup>
              <Label>Pay SINDA</Label>
              <Input
                type="numbers"
                onChange={handleInputs}
                value={jobModal && jobModal.pay_sinda}
                name="pay_sinda"
              />
            </FormGroup>
          </Col>
        )}
        {jobModal && jobModal.govt_donation === 'pay_mbmf' && (
          <Col md="3">
            <FormGroup>
              <Label>Pay MBMF</Label>
              <Input
                type="numbers"
                onChange={handleInputs}
                value={jobModal && jobModal.pay_mbmf}
                name="pay_mbmf"
              />
            </FormGroup>
          </Col>
        )}
        {jobModal && jobModal.govt_donation === 'pay_euef' && (
          <Col md="3">
            <FormGroup>
              <Label>Pay EUEF</Label>
              <Input
                type="numbers"
                onChange={handleInputs}
                value={jobModal && jobModal.pay_euef}
                name="pay_euef"
              />
            </FormGroup>
          </Col>
        )}
        <Col md="3">
          <FormGroup>
            <Label>Income Tax No</Label>
            <Input
              type="text"
              onChange={handleInputs}
              value={jobModal && jobModal.income_tax_id}
              name="income_tax_id"
            />
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>Income Tax Amount</Label>
            <Input
              type="text"
              onChange={handleInputs}
              value={jobModal && jobModal.income_tax_amount}
              name="income_tax_amount"
            />
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>CPF No</Label>
            <Input
              type="text"
              onChange={handleInputs}
              value={jobModal && jobModal.cpf_account_no}
              name="cpf_account_no"
            />
          </FormGroup>
        </Col>
      </Row>
    </>
  );
}

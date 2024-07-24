import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import ComponentCard from '../ComponentCard';

export default function JobLeave({ handleInputs, jobModal }) {
  JobLeave.propTypes = {
    handleInputs: PropTypes.object,
    jobModal: PropTypes.object,
  };
  return (
    <ComponentCard title="Leave and Medical Benefits (KET)">
      <FormGroup>
        <Row>
          <Col md="3">
            <FormGroup>
              <Label>Paid Annual Leave per year</Label>
              <br/>
              <Input
                type="text"
                onChange={handleInputs}
                value={jobModal && jobModal.paid_annual_leave_per_year}
                name="paid_annual_leave_per_year"
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label>Paid Outpatient Sick Leave per year</Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={jobModal && jobModal.paid_outpatient_sick_leave_per_year}
                name="paid_outpatient_sick_leave_per_year"
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label>Paid Hospitalisation Leave per year</Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={jobModal && jobModal.paid_hospitalisation_leave_per_year}
                name="paid_hospitalisation_leave_per_year"
              />
            </FormGroup>
          </Col>

          <Col md="3">
            <FormGroup>
              <Label> Paid medical examination fee</Label>
              <br></br>
              <Label> Yes </Label>
              <Input
                name="paid_medical_examination"
                value="1"
                type="radio"
                defaultChecked={jobModal && jobModal.paid_medical_examination === 1 && true}
                onChange={handleInputs}
              />
              <Label> No </Label>
              <Input
                name="paid_medical_examination"
                value="0"
                type="radio"
                defaultChecked={jobModal && jobModal.paid_medical_examination === 0 && true}
                onChange={handleInputs}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="3">
            <FormGroup>
              <Label>Other types of leave</Label>
              <Input
                type="textarea"
                onChange={handleInputs}
                value={jobModal && jobModal.other_type_of_leave}
                name="other_type_of_leave"
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label>Other Medical Benefits</Label>
              <Input
                type="textarea"
                onChange={handleInputs}
                value={jobModal && jobModal.other_medical_benefits}
                name="other_medical_benefits"
              />
            </FormGroup>
          </Col>
        </Row>
      </FormGroup>
    </ComponentCard>
  );
}

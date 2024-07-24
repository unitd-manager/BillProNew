import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import moment from 'moment';

export default function JobTermination({ handleInputs, jobModal }) {
  JobTermination.propTypes = {
    handleInputs: PropTypes.object,
    jobModal: PropTypes.object,
  };
  return (
    <>
      <FormGroup>
        <Row>
          <Col md="3">
            <FormGroup>
              <Label>Notice Period for Termination</Label>
              <Input
                type="textarea"
                onChange={handleInputs}
                value={jobModal && jobModal.notice_period_for_termination}
                name="notice_period_for_termination"
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label>Date of Resignation Notice</Label>
              <Input
                type="date"
                onChange={handleInputs}
                value={jobModal && moment(jobModal.resignation_notice_date).format('YYYY-MM-DD')}
                name="resignation_notice_date"
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label>Termination/Cessation Date</Label>
              <Input
                type="date"
                onChange={handleInputs}
                value={jobModal && moment(jobModal.termination_date).format('YYYY-MM-DD')}
                name="termination_date"
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label>Reason for Termination</Label>
              <Input
                type="textarea"
                onChange={handleInputs}
                value={jobModal && jobModal.termination_reason}
                name="termination_reason"
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label>Departure Date</Label>
              <Input
                type="date"
                onChange={handleInputs}
                value={jobModal && moment(jobModal.departure_date).format('YYYY-MM-DD')}
                name="departure_date"
              />
            </FormGroup>
          </Col>
        </Row>
      </FormGroup>
    </>
  );
}

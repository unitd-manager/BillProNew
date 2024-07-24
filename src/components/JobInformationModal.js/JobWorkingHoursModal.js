import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';

export default function JobWorkingHoursModal({ handleInputs, jobModal }) {
  JobWorkingHoursModal.propTypes = {
    handleInputs: PropTypes.object,
    jobModal: PropTypes.object,
  };
  return (
    <>
      <FormGroup>
        <Row>
          <Col md="3">
            <FormGroup>
              <Label>Details of Working Hours</Label>
              <Input
                type="textarea"
                onChange={handleInputs}
                value={jobModal && jobModal.work_hour_details}
                name="work_hour_details"
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label>Rest day per Week</Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={jobModal && jobModal.rest_day_per_week}
                name="rest_day_per_week"
              />
            </FormGroup>
          </Col>
        </Row>
      </FormGroup>
    </>
  );
}

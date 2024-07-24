import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import moment from 'moment';

export default function JobProbationModal({ handleInputs, jobModal }) {
  JobProbationModal.propTypes = {
    handleInputs: PropTypes.object,
    jobModal: PropTypes.object,
  };
  return (
    <>
      <FormGroup>
        <Row>
          <Col md="3">
            <FormGroup>
              <Label>Employment Type</Label>
              <Input
                type="select"
                value={jobModal && jobModal.emp_type}
                name="emp_type"
                onChange={handleInputs}
              >
                <option value="" selected="selected">
                  Please Select
                </option>
                <option value="full time">Full Time</option>
                <option value="part time">Part Time</option>
                <option value="contract">Contract</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label>Designation</Label>
              <Input
                type="select"
                value={jobModal && jobModal.designation}
                name="designation"
                onChange={handleInputs}
              >
                <option value="" selected="selected">
                  Please Select
                </option>
                <option value="super visor">Super Visor </option>
                <option value="employee">Employee </option>
                <option value="manager">Manager </option>
              </Input>
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label>Department</Label>
              <Input
                type="select"
                value={jobModal && jobModal.department}
                name="department"
                onChange={handleInputs}
              >
                <option value="" selected="selected">
                  Please Select
                </option>
                <option value="civil">Civil</option>
                <option value="mehanic">Mehanic</option>
                <option value="engineer">Engineer</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label>Joined/Arrival Date</Label>
              <Input
                type="date"
                onChange={handleInputs}
                value={jobModal && moment(jobModal.join_date).format('YYYY-MM-DD')}
                name="join_date"
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label>Status</Label>

              <Input
                type="select"
                value={jobModal && jobModal.status}
                name="status"
                onChange={handleInputs}
              >
                <option value="" selected="selected">
                  Please Select
                </option>
                <option value="current" selected>
                  current
                </option>
                <option value="archive">Archive </option>
                <option value="cancel">Cancel</option>
              </Input>
              {jobModal &&
                jobModal.status === 'archive' &&
                alert(
                  'Please enter TERMINATION INFORMATION of employee if employee is leaving company.',
                )}
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label> Under Probation</Label>
              <br></br>
              <Label> Yes </Label>
              <Input
                name="probationary"
                value="1"
                type="radio"
                defaultChecked={jobModal && jobModal.probationary === 1 && true}
                onChange={handleInputs}
              />
              <Label> No </Label>
              <Input
                name="probationary"
                value="0"
                type="radio"
                defaultChecked={jobModal && jobModal.probationary === 0 && true}
                onChange={handleInputs}
              />
            </FormGroup>
          </Col>
          {jobModal && jobModal.probationary === '1' && (
            <Col md="3">
              <FormGroup>
                <Label>Length of Probation</Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={jobModal && jobModal.length_of_probation}
                  name="length_of_probation"
                />
              </FormGroup>
            </Col>
          )}
          {jobModal && jobModal.probationary === '1' && (
            <Col md="3">
              <FormGroup>
                <Label>Probation Start Date</Label>
                <Input
                  type="date"
                  onChange={handleInputs}
                  value={jobModal && moment(jobModal.probation_start_date).format('YYYY-MM-DD')}
                  name="probation_start_date"
                />
              </FormGroup>
            </Col>
          )}
          {jobModal && jobModal.probationary === '1' && (
            <Col md="3">
              <FormGroup>
                <Label>Probation End Date</Label>
                <Input
                  type="date"
                  onChange={handleInputs}
                  value={jobModal && moment(jobModal.probation_end_date).format('YYYY-MM-DD')}
                  name="probation_end_date"
                />
              </FormGroup>
            </Col>
          )}
        
        </Row>
      </FormGroup>
    </>
  );
}

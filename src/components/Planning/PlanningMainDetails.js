import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

export default function PlanningMainDetails({ handleInputs, plannings }) {
  PlanningMainDetails.propTypes = {
    handleInputs: PropTypes.func,
    plannings: PropTypes.object,
    
  };
  return (
    <>
      <ComponentCard title=" Project Planning Edit">
        <Form>
          <FormGroup>
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label>Code</Label>
                  <br />
                  <span>{plannings && plannings.code}</span>
                </FormGroup>
              </Col>
              <Col md="4">
              <FormGroup>
                <Label>Title <span style={{ color: 'red' }}>*</span></Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={plannings && plannings.title}
                  name="title"
                />
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label>Customer <span style={{ color: 'red' }}>*</span></Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={plannings && plannings.customer}
                  name="customer"
                />
              </FormGroup>
            </Col>
              
            </Row>
            <Row>
            <Col md="4">
                <FormGroup>
                  <Label>Date</Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={plannings && plannings.date}
                    name="date"
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label> Due Date</Label>
                  <Input
                    type="Date"
                    onChange={handleInputs}
                    value={plannings && plannings.due_date}
                    name="due_date"
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <Label>Status</Label>
                <Input
                  type="select"
                  onChange={handleInputs}
                  value={plannings && plannings.status}
                  name="status"
                >
                  <option defaultValue="selected">Please Select</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Re Opened">Re Opened</option>
                </Input>
              </Col>
            </Row>
          </FormGroup>
        </Form>
      </ComponentCard>
     
    </>
  );
}

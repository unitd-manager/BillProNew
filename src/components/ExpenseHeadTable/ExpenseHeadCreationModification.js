import React from 'react';
import { Row, Col, Form, FormGroup, Label } from 'reactstrap';
import PropTypes from 'prop-types';

export default function ExpenseHeadCreationModification({ expenseDetails }) {
  ExpenseHeadCreationModification.propTypes = {
    expenseDetails: PropTypes.object,
  };
  return (
    <Form>
      <FormGroup>
        <Row>
          <Col md="3">
            <FormGroup>
              <Label> Created By</Label>
              <br />
              <span>{expenseDetails && expenseDetails.created_by}</span>
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label> Modified By </Label>
              <br />
              <span>{expenseDetails && expenseDetails.modified_by}</span>
            </FormGroup>
          </Col>
        </Row>
      </FormGroup>
    </Form>
  );
}

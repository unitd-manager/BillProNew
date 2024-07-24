import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';

export default function ExpenseHeadMainDetails({ handleInputs, expenseDetails }) {
  ExpenseHeadMainDetails.propTypes = {
    handleInputs: PropTypes.func,
    expenseDetails: PropTypes.any,
  };
  return (
    <Form>
      <FormGroup>
        <Row>
          <Col md="6">
            <FormGroup>
              <Label>Title *</Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={expenseDetails && expenseDetails.title}
                name="title"
              />
            </FormGroup>
          </Col>
        </Row>
      </FormGroup>
    </Form>
  );
}

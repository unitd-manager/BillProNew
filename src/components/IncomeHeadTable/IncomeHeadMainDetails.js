import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';

export default function IncomeHeadMainDetails({ handleInputs, incomeDetails }) {
  IncomeHeadMainDetails.propTypes = {
    handleInputs: PropTypes.func,
    incomeDetails: PropTypes.any,
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
                value={incomeDetails && incomeDetails.title}
                name="title"
              />
            </FormGroup>
          </Col>
        </Row>
      </FormGroup>
    </Form>
  );
}

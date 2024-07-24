import React from 'react';
import { Row, Col, Form, FormGroup, Label } from 'reactstrap';
import PropTypes from 'prop-types';

export default function AccountsCreationModification({ AccountsDetails }) {
  AccountsCreationModification.propTypes = {
    AccountsDetails: PropTypes.object,
  };
  return (
    <Form>
      <FormGroup>
        <Row>
          <Col md="3">
            <FormGroup>
              <Label> Created By</Label>
              <br />
              <span>{AccountsDetails && AccountsDetails.created_by}</span>
              <span>{AccountsDetails && AccountsDetails.creation_date}</span>
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label> Modified By </Label>
              <br />
              <span>{AccountsDetails && AccountsDetails.modified_by}</span>
              <span>{AccountsDetails && AccountsDetails.modification_date}</span>
            </FormGroup>
          </Col>
        </Row>
      </FormGroup>
    </Form>
  );
}

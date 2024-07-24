import React from 'react';
import { Row, Col, Form, FormGroup, Label } from 'reactstrap';
import PropTypes from 'prop-types';

export default function SectionCreationModification({ section }) {
  SectionCreationModification.propTypes = {
    section: PropTypes.object,
  };
  return (
    <Form>
      <Row>
        <Col md="2">
          <FormGroup>
            <Label>Creation</Label>
            <br />
            <span>{section && section.creation_date}</span>
          </FormGroup>
        </Col>
        <Col md="2">
          <FormGroup>
            <Label>Modification </Label>
            <br />
            <span>{section && section.modification_date}</span>
          </FormGroup>
        </Col>
      </Row>
    </Form>
  );
}

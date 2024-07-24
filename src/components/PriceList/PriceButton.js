import React from 'react';
import { Row, Col, Form, FormGroup, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCardV2 from '../ComponentCardV2';

export default function ClientButton({ editData, applyChanges, saveChanges, backToList, setFormSubmitted }) {
  ClientButton.propTypes = {
    editData: PropTypes.any,
    applyChanges: PropTypes.func,
    backToList: PropTypes.func,
    setFormSubmitted: PropTypes.any,
    saveChanges: PropTypes.any
  };
  return (
    <Form>
      <FormGroup>
        {/* Button */}
        <ComponentCardV2>
          <Row>
            <Col>
              <Button
                className="shadow-none"
                color="primary"
                onClick={() => {
                  setFormSubmitted(true);
                    editData();
                    saveChanges();
                }}
              >
                Save
              </Button>
            </Col>
            <Col>
              <Button
                className="shadow-none"
                color="primary"
                onClick={() => {
                  setFormSubmitted(true);
                    editData();
                  applyChanges();
                }}
              >
                Apply
              </Button>
            </Col>
            <Col>
              <Button
                className="shadow-none"
                color="dark"
                onClick={() => {
                  backToList();
                }}
              >
                Back to List
              </Button>
            </Col>
          </Row>
        </ComponentCardV2>
      </FormGroup>
    </Form>
  );
}

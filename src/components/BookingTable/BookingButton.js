import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, FormGroup, Button } from 'reactstrap';
import ComponentCardV2 from '../ComponentCardV2';

export default function BookingButton({ editBookingData, navigate, applyChanges, backToList }) {
  BookingButton.propTypes = {
    editBookingData: PropTypes.func,
    navigate: PropTypes.func,
    applyChanges: PropTypes.func,
    backToList: PropTypes.func,
  };
  return (
    <Form>
      <FormGroup>
        <ComponentCardV2>
          <Row>
            <Col>
              <Button
                color="primary"
                className="shadow-none"
                onClick={() => {
                  editBookingData();
                  navigate('/Booking');
                }}
              >
                Save
              </Button>
            </Col>
            <Col>
              <Button
                color="primary"
                className="shadow-none"
                onClick={() => {
                  editBookingData();
                  applyChanges();
                }}
              >
                Apply
              </Button>
            </Col>
            <Col>
              <Button
                color="dark"
                className="shadow-none"
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

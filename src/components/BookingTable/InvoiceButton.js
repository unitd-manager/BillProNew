import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, FormGroup, Button } from 'reactstrap';
import ComponentCardV2 from '../ComponentCardV2';

export default function BookingButton({ editInvoiceData ,navigate}) {
  BookingButton.propTypes = {
    editInvoiceData: PropTypes.func,
    navigate: PropTypes.func,
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
                  editInvoiceData();
                  navigate('/Invoice');
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
                  editInvoiceData();
                  
                }}
              >
                Apply
              </Button>
            </Col>
            {/* <Col>
              <Button
                color="dark"
                className="shadow-none"
                onClick={() => {
                  backToList();
                }}
              >
                Back to List
              </Button>
            </Col> */}
          </Row>
        </ComponentCardV2>
      </FormGroup>
    </Form>
  );
}

import React from 'react';
import { Row, Col, Form, FormGroup, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCardV2 from '../ComponentCardV2';

export default function AccountMapButton({ editData, navigate, applyChanges, backToList }) {
    AccountMapButton.propTypes = {
    editData: PropTypes.any,
    navigate: PropTypes.any,
    applyChanges: PropTypes.func,
    backToList: PropTypes.func,
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
                    editData();
                  navigate('/ChartOfAccounts');
                  setTimeout(() => {
                    window.location.reload();
                  }, 300);
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

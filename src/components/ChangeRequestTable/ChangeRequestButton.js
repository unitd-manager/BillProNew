import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'reactstrap';
import ComponentCardV2 from '../ComponentCardV2';

function ChangeRequestButton({ editChangeRequestData, navigate }) {
    ChangeRequestButton.propTypes = {
    editChangeRequestData: PropTypes.any,
    navigate: PropTypes.any,
  };
  return (
    <div>
      <ComponentCardV2>
      <Row>
          <Col>
          <Button
                className="shadow-none"
                color="primary"
                onClick={() => {
                    editChangeRequestData();
                  setTimeout(() => {
                    navigate('/ChangeRequest');
                  }, 800);
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
                editChangeRequestData();
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
                navigate('/ChangeRequest');
              }}
            >
              Back to List
            </Button>
          </Col>
        </Row>
      </ComponentCardV2>
    </div>
  );
}

export default ChangeRequestButton;

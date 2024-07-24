import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'reactstrap';
import ComponentCardV2 from '../ComponentCardV2';

function PurchaseEditButton({ editPurchaseRequestData, navigate }) {
    PurchaseEditButton.propTypes = {
    editPurchaseRequestData: PropTypes.any,
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
                    editPurchaseRequestData();
                  setTimeout(() => {
                    navigate('/PurchaseRequest');
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
                editPurchaseRequestData();
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
                navigate('/PurchaseRequest');
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

export default PurchaseEditButton;

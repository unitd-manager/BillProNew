import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'reactstrap';
import ComponentCardV2 from '../ComponentCardV2';

function PurchaseEditButton({ editGoodsReceiptData, navigate }) {
    PurchaseEditButton.propTypes = {
    editGoodsReceiptData: PropTypes.any,
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
                    editGoodsReceiptData();
                  setTimeout(() => {
                    navigate('/GoodsReceived');
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
                editGoodsReceiptData();
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
                navigate('/GoodsReceived');
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

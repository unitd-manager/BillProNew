import React from 'react';
import { Row, Col, Form, FormGroup, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCardV2 from '../ComponentCardV2';
import PdfQuote from '../PDF/PdfQuote';

export default function TradingQuoteButton({
  editTenderData,
  applyChanges,
  backToList,
  navigate,
  id,
  
}) {
  TradingQuoteButton.propTypes = {
    editTenderData: PropTypes.func,
    navigate: PropTypes.any,
    applyChanges: PropTypes.func,
    backToList: PropTypes.func,
    id: PropTypes.any,
    
      
    
  };
  return (
    <Form>
      <FormGroup>
        <ComponentCardV2>
          <Row>
            <Col >
             
                <PdfQuote id={id} quoteId={id}></PdfQuote>
             
            </Col>
            <Col>
              <Button
                className="shadow-none"
                color="primary"
                onClick={() => {
                  editTenderData();
                  navigate('/Quotation');
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
                  editTenderData();
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

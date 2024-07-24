import React from 'react';
import { Row, Col, Form, FormGroup, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCardV2 from '../ComponentCardV2';

export default function TradingQuoteButton({ editTenderData, applyChanges, backToList, navigate ,arb}) {
    TradingQuoteButton.propTypes = {
    editTenderData: PropTypes.func,
    navigate: PropTypes.any,
    applyChanges: PropTypes.func,
    backToList: PropTypes.func,
    arb: PropTypes.any,
  };
  return (
    <Form>
      <FormGroup>
        <ComponentCardV2>
          <Row>
            <Col>
              <Button
                className="shadow-none"
                color="primary"
                onClick={() => {
                  editTenderData();
                  navigate('/MaterialRequest');
                }}
              >
                {arb ?'يحفظ':'Save'}
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
                {arb ?'يتقدم':'Apply'}
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
                {arb ?'الرجوع للقائمة':'Back to List'}
              </Button>
            </Col>
          </Row>
        </ComponentCardV2>
      </FormGroup>
    </Form>
  );
}

import React from 'react';
import { Row, Col, Form, FormGroup, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCardV2 from '../ComponentCardV2';

export default function ClientButton({ editData, navigate, applyChanges, backToList,arb }) {
  ClientButton.propTypes = {
    editData: PropTypes.any,
    navigate: PropTypes.any,
    applyChanges: PropTypes.func,
    backToList: PropTypes.func,
    arb:PropTypes.any
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
                  navigate('/SupplierPriceList');
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
                    editData();
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

import React from 'react';
import { Row, Col, Form, FormGroup, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCardV2 from '../ComponentCardV2';

export default function ProjectButton({ UpdateData, applyChanges, backToList, navigate,arb }) {
  ProjectButton.propTypes = {
    UpdateData: PropTypes.any,
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
                  UpdateData();
                  navigate('/Project');
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
                  UpdateData();
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

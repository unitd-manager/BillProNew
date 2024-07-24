import React from 'react';
import { Row, Col, Form, FormGroup, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCardV2 from '../ComponentCardV2';

export default function ProposalButtons({ editProposalData, applyChanges,navigate, backToList, arb}) {
  ProposalButtons.propTypes = {
    editProposalData: PropTypes.func,
    applyChanges: PropTypes.func,
    navigate: PropTypes.any,
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
                  editProposalData();
                  navigate('/Proposal');

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
                  editProposalData();
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

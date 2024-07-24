import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, FormGroup, Button } from 'reactstrap';
import ComponentCardV2 from '../ComponentCardV2';
// import DeleteButton from '../DeleteButton';

export default function LoanButtons({
  editLoanData,
  editLoanStartData,
  editLoanClosingData,
  // navigate,
  applyChanges,
  saveChanges,
  // id,
  backToList,
}) {
  LoanButtons.propTypes = {
    editLoanData: PropTypes.func,
    editLoanStartData: PropTypes.func,
    editLoanClosingData:PropTypes.func,
    // navigate: PropTypes.func,
    applyChanges: PropTypes.func,
    saveChanges: PropTypes.func,
    // id: PropTypes.string,
    backToList: PropTypes.func,
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
                  editLoanData();
                  editLoanStartData();
                  editLoanClosingData();
                  saveChanges();                
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
                  editLoanData();
                  editLoanStartData();
                  editLoanClosingData();
                  applyChanges();

                  console.log('cancel process');
                }}
              >
                Apply
              </Button>
            </Col>
           
            <Col>
              <Button
                color="dark"
                className="shadow-none"
                onClick={() => {
                  backToList();
                  console.log('back to list');
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

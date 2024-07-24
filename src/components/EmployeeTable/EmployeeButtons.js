import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Form, FormGroup } from 'reactstrap';
import ComponentCardV2 from '../ComponentCardV2';

export default function EmployeeButtons({
  applyChanges,
  backToList,
  editEmployeeData,
  saveChanges
}) {
  EmployeeButtons.propTypes = {
    applyChanges: PropTypes.func,
    saveChanges: PropTypes.func,
    backToList: PropTypes.func,
    editEmployeeData: PropTypes.any
   
  };
  return (
    <Form>
      <FormGroup>
        <ComponentCardV2>
          <Row>
            <Col>
              <Button className='shadow-none'
                color="primary"
                onClick={() => {
                  editEmployeeData();
                  saveChanges();
                }}
              >
                Save
              </Button>
            </Col>
            
            <Col>
              <Button className='shadow-none'
                color="primary"
                onClick={() => {
                  editEmployeeData();
                  applyChanges();
                }}
              >
                Apply
              </Button>
            </Col>
           
            <Col>
              <Button className='shadow-none'
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
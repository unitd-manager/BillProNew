import React from 'react'
import { Row, Col, Form, FormGroup,Button } from 'reactstrap';
import PropTypes from 'prop-types'
import ComponentCardV2 from '../ComponentCardV2';

export default function LeaveButton({editLeavesData,navigate,applyChanges,backToList}) {
    LeaveButton.propTypes = {
        editLeavesData: PropTypes.object,
        navigate: PropTypes.any,
        applyChanges: PropTypes.object,
        backToList: PropTypes.object
      }
  return (
    <Form>
    <FormGroup>
      <ComponentCardV2>
        <Row>
          <Col>
            <Button className='shadow-none'
              color="primary"
              onClick={() => {
                editLeavesData();
                navigate('/Leave');
              }}
            >
              Save
            </Button>
          </Col>
          <Col>
            <Button className='shadow-none'
              color="primary"
              onClick={() => {
                editLeavesData();
                applyChanges();
              }}>
              Apply
            </Button>
          </Col>
          <Col>
            <Button className='shadow-none'
              color="dark"
              onClick={() => {
                backToList();
                console.log('back to list');
              }}>
              Back to List
            </Button>
          </Col>
        </Row>
      </ComponentCardV2>
    </FormGroup>
  </Form>
  )
}
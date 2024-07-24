import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Form, FormGroup } from 'reactstrap';
import ComponentCardV2 from '../ComponentCardV2';

export default function SubCategoryButton({
  saveChanges,
  applyChanges,
  backToList,
  editSubCategoryData,
  setFormSubmitted,
}) {
  SubCategoryButton.propTypes = {
    saveChanges: PropTypes.func,
    applyChanges: PropTypes.func,
    backToList: PropTypes.func,
    editSubCategoryData: PropTypes.func,
    setFormSubmitted: PropTypes.any,
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
                  setFormSubmitted(true);
                  editSubCategoryData();
                  saveChanges();
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
                  setFormSubmitted(true);
                  editSubCategoryData();
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

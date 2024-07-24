import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, FormGroup, Button } from 'reactstrap';
import ComponentCardV2 from '../ComponentCardV2';

export default function CategoryButton({
  editCategoryData,
  applyChanges,
  saveChanges,
  backToList,
  setFormSubmitted,
}) {
  CategoryButton.propTypes = {
    editCategoryData: PropTypes.any,
    applyChanges: PropTypes.func,
    saveChanges: PropTypes.func,
    backToList: PropTypes.func,
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
                  editCategoryData();
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
                  setFormSubmitted(true);
                  editCategoryData();
                  applyChanges();
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

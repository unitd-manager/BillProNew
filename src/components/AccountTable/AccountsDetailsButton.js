import React from 'react';
import { Row, Form, FormGroup, Button } from 'reactstrap';
import PropTypes from 'prop-types';

export default function AccountsDetailsButton({ insertExpense, navigate }) {
  AccountsDetailsButton.propTypes = {
    insertExpense: PropTypes.object,
    navigate: PropTypes.any,
  };
  return (
    <Form>
      <FormGroup>
        {/* Button */}
        <Row>
          <div className="pt-3 mt-3 d-flex justify-content-end gap-2">
         
            <Button
              color="primary"
              type="button"
              className="btn mr-2 shadow-none"
              onClick={() => {
                insertExpense();
              }}
            >
              {' '}
              Save & Continue
            </Button>
            <Button
              onClick={() => {
                navigate(-1);
              }}
              type="button"
              className="btn btn-dark shadow-none"
            >
              Go to List
            </Button>
          </div>
        </Row>
      </FormGroup>
    </Form>
  );
}

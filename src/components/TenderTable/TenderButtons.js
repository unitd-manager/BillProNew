import React from 'react';
import { Row, Col, Form, FormGroup, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCardV2 from '../ComponentCardV2';

export default function TenderButtons({ editTenderData, applyChanges, backToList, navigate,tenderDetails,setFormSubmitted }) {
  TenderButtons.propTypes = {
    editTenderData: PropTypes.func,
    navigate: PropTypes.any,
    applyChanges: PropTypes.func,
    backToList: PropTypes.func,
    tenderDetails: PropTypes.any,
    setFormSubmitted: PropTypes.any,
  };

  const handleSave = () => {
    console.log('Handling Save...');
  
    
  
    // Validate company name
    const trimmedTitle = tenderDetails?.title?.trim();
    if (!trimmedTitle) {
      // If validation fails, show an error message or take appropriate action
      console.error('Company name cannot be empty. Current value:', trimmedTitle);
      // You can also show an error message to the user using a toast or other UI element
      return;
    }
  
    // If validation passes, proceed with setting formSubmitted to true
    setFormSubmitted(true);
    editTenderData();

  // Now navigate to the '/Client' route
  navigate('/Enquiry');
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
                  //editTenderData();
                  handleSave();
                  setFormSubmitted(true);
                  //navigate('/Enquiry');
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
                  editTenderData();
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

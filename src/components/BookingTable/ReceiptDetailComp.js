import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
//import moment from 'moment';
// import { TimePicker } from '@mui/lab';

export default function BookingDetailComp({ bookingDetails, handleInputs, company }) {
  BookingDetailComp.propTypes = {
    bookingDetails: PropTypes.object,
    handleInputs: PropTypes.func,
   company: PropTypes.array,
   
   
  };

  // const [bookingDetails, setBookingDetails] = useState({
  //   requested_time: '09:00' // Set the default time if needed
  // });



  return (
    <>
      <Form>
        <FormGroup>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>
                    Company <span className="required"> *</span>
                  </Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={bookingDetails && bookingDetails.company_id}
                    name="company_id"
                  >
                    <option defaultValue="selected">Please Select</option>
                    {company &&
                      company.map((e) => {
                        return (
                          <option key={e.company_id} value={e.company_id}>
                            {e.company_name}
                          </option>
                        );

                   
                      })}
                      </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Receipt Code</Label>

                  <Input
                    type="text"
                    value={bookingDetails && bookingDetails.invoice_code}
                    onChange={handleInputs}
                    name="invoice_code"
                    readOnly
                  >
                  
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Receipt Status</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={bookingDetails && bookingDetails.status}
                    name="status"
                  >
                   
                  </Input>
                </FormGroup>
              </Col>
              
              <Col md="3">
                <FormGroup>
                  <Label>Mode of p</Label>

                  <Input
                    type="date"
                    value={bookingDetails && bookingDetails.invoice_date}
                    onChange={handleInputs}
                    name="invoice_date"
                  >
                  
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Invoice Terms</Label>

                  <Input
                    type="text"
                    value={bookingDetails && bookingDetails.invoice_terms}
                    onChange={handleInputs}
                    name="invoice_terms"
                  >
                 
                  </Input>
                </FormGroup>
              </Col>
             
            </Row>
            <Row></Row>
        </FormGroup>
      </Form>
    </>
  );
}

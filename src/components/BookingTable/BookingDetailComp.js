import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default function BookingDetailComp({ bookingDetails, handleInputs, company, employee, setEditCustomerModal }) {
  BookingDetailComp.propTypes = {
    bookingDetails: PropTypes.object,
    handleInputs: PropTypes.func,
    company: PropTypes.array,
    employee: PropTypes.array,
    setEditCustomerModal: PropTypes.func,
   
  };




  return (
    <>
      <Form>
        <FormGroup>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>
                    BookingDate <span className="required"> *</span>
                  </Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={
                      bookingDetails && moment(bookingDetails.booking_date).format('YYYY-MM-DD')
                    }
                    name="booking_date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Customer Name</Label>
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
                  <Label>Address</Label>
                  <br />
                  <span>{bookingDetails && bookingDetails.address}</span>
                </FormGroup>
              </Col>
              <Col md="3">
              <Label>
                  <Link to="" color="primary">
                    <span
                      onClick={() => {
                        setEditCustomerModal(true);
                      }}
                    >
                      <b>
                        <u>Edit Customer</u>
                      </b>
                    </span>
                  </Link>
                </Label>
                  </Col>
                   </Row>
            <Row>

              <Col md="3">
                <FormGroup>
                  <Label>Employee Name</Label>

                  <Input
                    type="select"
                    value={bookingDetails && bookingDetails.employee_id}
                    onChange={handleInputs}
                    name="employee_id"
                  >
                    <option defaultValue="selected">Please Select</option>
                    {employee &&
                      employee.map((e) => {
                        return (
                          <option key={e.employee_id} value={e.employee_id}>
                            {e.employee_name}
                          </option>
                        );
                 
                      })}
                  </Input>
                </FormGroup>
              </Col>
           
              <Col md="3">
                <FormGroup>
                  <Label>Assign Time</Label>
                  <Input
                    type="time"
                    onChange={handleInputs}
                    defaultValue={bookingDetails && bookingDetails.assign_time}
                    name="assign_time"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Status</Label>
                  <Input
                    value={bookingDetails && bookingDetails.status}
                    type="select"
                    onChange={handleInputs}
                    name="status"
                  >
                    <option value="">Please Select</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option defaultValue="selected" value="Scheduled">
                      Scheduled
                    </option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>GPS Parameter</Label>
                  <br />
                  <span> {bookingDetails && bookingDetails.gps_parameter} </span>
                </FormGroup>
              </Col>
            </Row>
            <Row></Row>
        </FormGroup>
      </Form>
    </>
  );
}

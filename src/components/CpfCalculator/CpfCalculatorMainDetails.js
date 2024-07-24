import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

export default function CpfCalculatorMainDetails({ handleInputs, cpfRecordDetails}) {
  CpfCalculatorMainDetails.propTypes = {
    handleInputs: PropTypes.func,
    cpfRecordDetails: PropTypes.object,
   
  };
  return (
    <>
      <ComponentCard title="Cpf Calculator Details">
        <Form>
          <FormGroup>
            <Row>
            <Col md="3">
                <FormGroup>
                  <Label>From Age</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={cpfRecordDetails && cpfRecordDetails.from_age}
                    name="from_age"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>To Age</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={cpfRecordDetails && cpfRecordDetails.to_age}
                    name="to_age"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>By Employer(% of wage)</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={cpfRecordDetails && cpfRecordDetails.by_employer}
                    name="by_employer"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <Label>By Employee(% of wage)</Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={cpfRecordDetails && cpfRecordDetails.by_employee}
                  name="by_employee"
                >
                
                </Input>
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>Total(% of wage)</Label>
                  <br />
                  <span>{cpfRecordDetails && cpfRecordDetails.employee_name}</span>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Year</Label>
                  <br />
                  <span>{cpfRecordDetails && cpfRecordDetails.year}</span>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>From Salary</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={cpfRecordDetails && cpfRecordDetails.from_salary}
                    name="from_salary"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <Label>To Salary</Label>
                <Input
                    type="text"
                    onChange={handleInputs}
                    value={cpfRecordDetails && cpfRecordDetails.to_salary}
                    name="to_salary"
                  />
              </Col>
            </Row>
            <Row>
            <Col md="3">
                <Label>Cap Amount Employer</Label>
                <Input
                    type="text"
                    onChange={handleInputs}
                    value={cpfRecordDetails && cpfRecordDetails.cap_amount_employer}
                    name="cap_amount_employer"
                  />
              </Col>
            
              <Col md="3">
                <Label>Cap Amount Employee</Label>
                <Input
                    type="text"
                    onChange={handleInputs}
                    value={cpfRecordDetails && cpfRecordDetails.cap_amount_employee}
                    name="cap_amount_employee"
                  />
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Total Cap Amount</Label>
                  <br />
                  <span>{cpfRecordDetails && cpfRecordDetails.employee_name}</span>
                </FormGroup>
              </Col>
              <Col md="3">
                <Label>SPR Year</Label>
                   <Input
                  onChange={handleInputs}
                  value={cpfRecordDetails && cpfRecordDetails.spr_year}
                  name="spr_year"
                  type="select"
                >
                  <option selected="selected">Please Select</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                 
                </Input>
              </Col>
            </Row>
          </FormGroup>
        </Form>
      </ComponentCard>
     
    </>
  );
}

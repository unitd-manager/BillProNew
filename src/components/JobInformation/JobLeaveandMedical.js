import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';

export default function JobLeave({ handleInputsJobInformation, job, arb, arabic }) {
  JobLeave.propTypes = {
    handleInputsJobInformation: PropTypes.any,
    job: PropTypes.any,
    arb: PropTypes.any,
    arabic: PropTypes.any,
  };
  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }
  return (
    <FormGroup>
      <Row>
        <Col md="4">
          <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
              {
                arabic.find(
                  (item) => item.key_text === 'mdJobInformation.Paid Annual Leave per year',
                )?.[genLabel]
              }
            </Label>

           <Input
              type="text"
              onChange={handleInputsJobInformation}
              value={
                arb
                  ? job && job.paid_annual_leave_per_year_arb
                  : job && job.paid_annual_leave_per_year
              }
              name={arb ? 'paid_annual_leave_per_year_arb' : 'paid_annual_leave_per_year'}
            /> 
          </FormGroup>
        </Col>
        <Col md="4">
          <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
              {
                arabic.find(
                  (item) =>
                    item.key_text === 'mdJobInformation.Paid Outpatient Sick Leave per year',
                )?.[genLabel]
              }
            </Label>
            <Input
              type="text"
              onChange={handleInputsJobInformation}
              value={
                arb
                  ? job && job.paid_outpatient_sick_leave_per_year_arb
                  : job && job.paid_outpatient_sick_leave_per_year
              }
              name={arb ? 'paid_annual_leave_per_year_arb' : 'paid_outpatient_sick_leave_per_year'}
            /> 
           
          </FormGroup>
        </Col>
        <Col md="4">
          <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
              {
                arabic.find(
                  (item) =>
                    item.key_text === 'mdJobInformation.Paid Hospitalisation Leave per year',
                )?.[genLabel]
              }
            </Label>
            <Input
              type="text"
              onChange={handleInputsJobInformation}
              value={
                arb
                  ? job && job.paid_hospitalisation_leave_per_year_arb
                  : job && job.paid_hospitalisation_leave_per_year
              }
              name={arb ? 'paid_hospitalisation_leave_per_year_arb' : 'paid_hospitalisation_leave_per_year'}
            /> 
           
          </FormGroup>
        </Col>

        <Col md="4">
          <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
              {
                arabic.find(
                  (item) => item.key_text === 'mdJobInformation.Paid medical examination fee',
                )?.[genLabel]
              }
            </Label>
            <br></br>
            <Label> Yes </Label>
            <Input
              name="paid_medical_examination_fee"
              value="1"
              type="radio"
              defaultChecked={job && job.paid_medical_examination_fee === 1 && true}
              onChange={handleInputsJobInformation}
            />
            &nbsp; &nbsp;
            <Label> No </Label>
            <Input
              name="paid_medical_examination_fee"
              value="0"
              type="radio"
              defaultChecked={job && job.paid_medical_examination_fee === 0 && true}
              onChange={handleInputsJobInformation}
            />
          </FormGroup>
        </Col>
        <Col md="4">
          <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
              {
                arabic.find((item) => item.key_text === 'mdJobInformation.Other types of leave')?.[
                  genLabel
                ]
              }
            </Label>
            <Input
              type="textarea"
              onChange={handleInputsJobInformation}
              value={
                arb
                  ? job && job.other_type_of_leave_arb
                  : job && job.other_type_of_leave
              }
              name={arb ? 'other_type_of_leave_arb' : 'other_type_of_leave'}
            /> 
            
          </FormGroup>
        </Col>
        <Col md="4">
          <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
              {
                arabic.find(
                  (item) => item.key_text === 'mdJobInformation.Other Medical Benefits',
                )?.[genLabel]
              }
            </Label>
            <Input
              type="textarea"
              onChange={handleInputsJobInformation}
              value={
                arb
                  ? job && job.other_medical_benefits_arb
                  : job && job.other_medical_benefits
              }
              name={arb ? 'other_medical_benefits_arb' : 'other_medical_benefits'}
            /> 
           
          </FormGroup>
        </Col>
      </Row>
    </FormGroup>
  );
}

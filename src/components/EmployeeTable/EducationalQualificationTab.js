import React from 'react';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import moment from 'moment';
import PropTypes from 'prop-types';

function EducationalQualificationTab({
  educationalQualificationDetails,
  qualifications,
  handleEduInputs,
  arabic,
  arb
}) {
  EducationalQualificationTab.propTypes = {
    educationalQualificationDetails: PropTypes.object,
    handleEduInputs: PropTypes.func,
    qualifications: PropTypes.array,
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
    <div>
      <Row>
      <Col md="4">
          <FormGroup>
          <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Qualification 1')?.[genLabel]}</Label>
            <Input
            name= {arb ? 'educational_qualitifcation1_arb' : 'educational_qualitifcation1'}
            value={
              arb
                ? (
                  educationalQualificationDetails && educationalQualificationDetails.educational_qualitifcation1_arb ? educationalQualificationDetails.educational_qualitifcation1_arb :
                    (educationalQualificationDetails && educationalQualificationDetails.educational_qualitifcation1_arb !== null ? '' : educationalQualificationDetails && educationalQualificationDetails.educational_qualitifcation2)
                  )
                : (educationalQualificationDetails && educationalQualificationDetails.educational_qualitifcation1)
            }
              onChange={handleEduInputs}
              type="select"
            >
              <option defaultValue="selected">{arb ?'الرجاء التحديد':'Please Select'}</option>
              {qualifications &&
                qualifications.map((ele) => {
                  return (
                    <option key={ele.valuelist_id} value={ele.valuelist_id}>
                      {arb?ele.value_arb:ele.value}
                    </option>
                  );
                })}
            </Input>
          </FormGroup>
        </Col>
        <Col md="4">
          <FormGroup>
          <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Degree')?.[genLabel]}</Label>
            <Input
            name= {arb ? 'degree1_arb' : 'degree1'}
            value={
              arb
                ? (
                  educationalQualificationDetails && educationalQualificationDetails.degree1_arb ? educationalQualificationDetails.degree1_arb :
                    (educationalQualificationDetails && educationalQualificationDetails.degree1_arb !== null ? '' : educationalQualificationDetails && educationalQualificationDetails.degree1)
                  )
                : (educationalQualificationDetails && educationalQualificationDetails.degree1)
            }
              
              onChange={handleEduInputs}
              type="text"
            />
          </FormGroup>
        </Col>
        <Col md="4">
          <FormGroup>
          <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Year of completion')?.[genLabel]}</Label>
            <Input
              name="year_of_completion1"
              value={moment(
                educationalQualificationDetails &&
                  educationalQualificationDetails.year_of_completion1,
              ).format('YYYY-MM-DD')}
              onChange={handleEduInputs}
              type="date"
              max={moment().format('YYYY-MM-DD')}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md="4">
          <FormGroup>
          <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Qualification 2')?.[genLabel]}</Label>
            <Input
            name= {arb ? 'educational_qualitifcation2_arb' : 'educational_qualitifcation2'}
            value={
              arb
                ? (
                  educationalQualificationDetails && educationalQualificationDetails.educational_qualitifcation2_arb ? educationalQualificationDetails.educational_qualitifcation2_arb :
                    (educationalQualificationDetails && educationalQualificationDetails.educational_qualitifcation2_arb !== null ? '' : educationalQualificationDetails && educationalQualificationDetails.educational_qualitifcation2)
                  )
                : (educationalQualificationDetails && educationalQualificationDetails.educational_qualitifcation2)
            }
              onChange={handleEduInputs}
              type="select"
            >
              <option defaultValue="selected">{arb ?'الرجاء التحديد':'Please Select'}</option>
              {qualifications &&
                qualifications.map((ele) => {
                  return (
                    <option key={ele.valuelist_id} value={ele.valuelist_id}>
                      {arb?ele.value_arb:ele.value}
                    </option>
                  );
                })}
            </Input>
          </FormGroup>
        </Col>
        <Col md="4">
          <FormGroup>
          <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Degree')?.[genLabel]}</Label>
            <Input
            name= {arb ? 'degree2_arb' : 'degree2'}
            value={
              arb
                ? (
                  educationalQualificationDetails && educationalQualificationDetails.degree2_arb ? educationalQualificationDetails.degree2_arb :
                    (educationalQualificationDetails && educationalQualificationDetails.degree2_arb !== null ? '' : educationalQualificationDetails && educationalQualificationDetails.degree2)
                  )
                : (educationalQualificationDetails && educationalQualificationDetails.degree2)
            }
              onChange={handleEduInputs}
              type="text"
            />
          </FormGroup>
        </Col>
        <Col md="4">
          <FormGroup>
          <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Year of completion')?.[genLabel]}</Label>
            <Input
              name="year_of_completion2"
              value={moment(
                educationalQualificationDetails &&
                  educationalQualificationDetails.year_of_completion2,
              ).format('YYYY-MM-DD')}
              onChange={handleEduInputs}
              type="date"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md="4">
          <FormGroup>
          <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Qualification 3')?.[genLabel]}</Label>
            <Input
            name= {arb ? 'educational_qualitifcation3_arb' : 'educational_qualitifcation3'}
            value={
              arb
                ? (
                  educationalQualificationDetails && educationalQualificationDetails.educational_qualitifcation3_arb ? educationalQualificationDetails.educational_qualitifcation3_arb :
                    (educationalQualificationDetails && educationalQualificationDetails.educational_qualitifcation3_arb !== null ? '' : educationalQualificationDetails && educationalQualificationDetails.educational_qualitifcation3)
                  )
                : (educationalQualificationDetails && educationalQualificationDetails.educational_qualitifcation3)
            }
              onChange={handleEduInputs}
              type="select"
            >
              <option defaultValue="selected">{arb ?'الرجاء التحديد':'Please Select'}</option>
              {qualifications &&
                qualifications.map((ele) => {
                  return (
                    <option key={ele.valuelist_id} value={ele.valuelist_id}>
                      {arb?ele.value_arb:ele.value}
                    </option>
                  );
                })}
            </Input>
          </FormGroup>
        </Col>
        <Col md="4">
          <FormGroup>
          <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Degree')?.[genLabel]}</Label>
            <Input
            name= {arb ? 'degree3_arb' : 'degree3'}
            value={
              arb
                ? (
                  educationalQualificationDetails && educationalQualificationDetails.degree3_arb ? educationalQualificationDetails.degree3_arb :
                    (educationalQualificationDetails && educationalQualificationDetails.degree3_arb !== null ? '' : educationalQualificationDetails && educationalQualificationDetails.degree3)
                  )
                : (educationalQualificationDetails && educationalQualificationDetails.degree3)
            }
              onChange={handleEduInputs}
              type="text"
            />
          </FormGroup>
        </Col>
        <Col md="4">
          <FormGroup>
          <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Year of completion')?.[genLabel]}</Label>
            <Input
              name="year_of_completion3"
              value={moment(
                educationalQualificationDetails &&
                  educationalQualificationDetails.year_of_completion3,
              ).format('YYYY-MM-DD')}
              onChange={handleEduInputs}
              type="date"
            />
          </FormGroup>
        </Col>
      </Row>
    </div>
  );
}

export default EducationalQualificationTab;

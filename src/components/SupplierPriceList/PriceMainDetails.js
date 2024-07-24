import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

export default function PlanningMainDetails({ handleInputs, plannings,arb,
  arabic }) {
  PlanningMainDetails.propTypes = {
    handleInputs: PropTypes.func,
    plannings: PropTypes.object,
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
    <>
      <ComponentCard title={arb?"تحرير قائمة الأسعار":"Price List Edit"}  creationModificationDate={plannings}>
        <Form>
          <FormGroup>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>{arabic.find((item) => item.key_text === 'mdSupplierPriceList.SupplierListName')?.[genLabel]}<span style={{ color: 'red' }}>*</span></Label>
                  <br />
                  <Input
                  type="text"
                  onChange={handleInputs}
                  
                  value={
                    arb
                      ? plannings && plannings.customer_name_arb
                      : plannings && plannings.customer_name
                  }
                  name={arb ? 'customer_name_arb' : 'customer_name'}
                  disabled
                />                </FormGroup>
              </Col>
             
            
            <Col md="3">
                <FormGroup>
                  <Label>{arabic.find((item) => item.key_text === 'mdSupplierPriceList.EffectiveDate')?.[genLabel]}</Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={plannings && plannings.effective_date}
                    name="effective_date"
                  />
                </FormGroup>
              </Col>
            
            
              <Col md="3">
                <FormGroup>
                  <Label> {arabic.find((item) => item.key_text === 'mdSupplierPriceList.ExpiryDate')?.[genLabel]}</Label>
                  <Input
                    type="Date"
                    onChange={handleInputs}
                    value={plannings && plannings.expiry_date}
                    name="expiry_date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
              <FormGroup>
                <Label>{arabic.find((item) => item.key_text === 'mdSupplierPriceList.Status')?.[genLabel]}</Label>
                <Input
                  type="select"
                  onChange={handleInputs}
                 
                  value={
                    arb
                      ? plannings && plannings.status_arb
                      : plannings && plannings.status
                  }
                  name={arb ? 'status_arb' : 'status'}
                >
                  <option defaultValue="selected">Please Select</option>
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                  
                </Input>
                </FormGroup>
              </Col>
              </Row>
              <Row>
              <Col md="6">
              <FormGroup>
                <Label>{arabic.find((item) => item.key_text === 'mdSupplierPriceList.Notes')?.[genLabel]} </Label>
                <Input
                  type="textarea"
                  onChange={handleInputs}
                 
                  value={
                    arb
                      ? plannings && plannings.notes_arb
                      : plannings && plannings.notes
                  }
                  name={arb ? 'notes_arb' : 'notes'}
                />
              </FormGroup>
            </Col>

            </Row>
          </FormGroup>
        </Form>
      </ComponentCard>
     
    </>
  );
}

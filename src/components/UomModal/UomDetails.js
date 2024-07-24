import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

export default function UomDetails({
  handleInputs,
  uom,
  uomStatus,
  
  // setEditPurchaseOrderLinked,
}) {
    UomDetails.propTypes = {
    handleInputs: PropTypes.func,
    uom: PropTypes.object,
    uomStatus: PropTypes.array,
    
     };

  return (
    <Form>
      <FormGroup>
        <ComponentCard title="UoM Details">
          <Row>
            <Col md="4">
              <FormGroup>
                <Label>
                  Name <span className="required"> *</span>
                </Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={uom && uom.uom_name}
                  name="uom_name"
                />
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label>Code</Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={uom && uom.uom_code}
                  name="uom_code"
                />
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label>Symbol</Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={uom && uom.uom_symbol}
                  name="uom_symbol"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <FormGroup>
                <Label>Conversion Factor</Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={uom && uom.conversion_factor}
                  name="conversion_factor"
                />
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label>Status</Label>
                <Input
                  type="select"
                  name="status"
                  onChange={handleInputs}
                  value={uom && uom.status}
                >
                  
                  {uomStatus &&
                    uomStatus.map((ele) => {
                      return <option value={ele.value}>{ele.value}</option>;
                    })}
                </Input>
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label>UoM Type</Label>
                <Input
                  type="select"
                  name="status"
                  onChange={handleInputs}
                  value={uom && uom.status}
                >
                  <option defaultValue="selected">Please Select</option>
                  <option value="Base Unit">Base Unit</option>
                  <option value="Conversion Unit">Conversion Unit</option>
                  <option value="Compound Unit">Compound Unit</option>
                  
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <FormGroup>
                <Label>Description</Label>
                <Input
                  type="textarea"
                  onChange={handleInputs}
                  value={uom && uom.description}
                  name="description"
                />
              </FormGroup>
            </Col>
            
          </Row>
        </ComponentCard>
      </FormGroup>
      
    </Form>
  );
}

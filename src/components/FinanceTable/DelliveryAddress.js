import React from 'react'
import { Row, Col, Form, FormGroup, Label,Input } from 'reactstrap';
import PropTypes from 'prop-types'

export default function DelliveryAddress({financeDetails,handleInputs,allCountries}) {
    DelliveryAddress.propTypes = {
        financeDetails: PropTypes.any,
        handleInputs: PropTypes.func,
        allCountries: PropTypes.any,
      }
  return (
    <Form >
        <FormGroup>
            <Row>
            <Col md="3">
              <FormGroup>
                <Label>company Name </Label>
                <br />
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={financeDetails && financeDetails.company_name}
                  name="company_name"
                />
              </FormGroup>
            </Col>
              {/* <Col md="4" sm="12">
                <FormGroup>
                  <Label>Company Name</Label><br />
                  {financeDetails && financeDetails.company_name}
                </FormGroup>
              </Col> */}
              <Col md="3">
              <FormGroup>
                <Label>Address 1</Label>
                <br />
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={financeDetails && financeDetails.company_address_flat}
                  name="company_address_flat"
                />
              </FormGroup>
            </Col>
              {/* <Col md="4" sm="12">
                <FormGroup>
                  <Label> Address 1 </Label>
                  <br />
                  <span>{financeDetails && financeDetails.company_address_flat}</span>
                </FormGroup>
              </Col> */}
                <Col md="3">
              <FormGroup>
                <Label>Address 2</Label>
                <br />
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={financeDetails && financeDetails.company_address_street}
                  name="company_address_street"
                />
              </FormGroup>
            </Col>
              {/* <Col md="4" sm="12">
                <FormGroup>
                  <Label> Address 2 </Label>
                  <br />
                  <span>{financeDetails && financeDetails.company_address_street}</span>
                </FormGroup>
              </Col> */}
              <Col md="3">
              <FormGroup>
                <Label>Email </Label>
                <br />
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={financeDetails && financeDetails.email}
                  name="email"
                />
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>Phone</Label>
                <br />
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={financeDetails && financeDetails.company_phone}
                  name="company_phone"
                />
              </FormGroup>
            </Col>
            <Col md="3">
            <FormGroup>
              {' '}
              <Label>
               Country
              </Label>
              <Input
                type="select"
                name="address_country"
                onChange={handleInputs}
                value={financeDetails && financeDetails.address_country}
              >
                <option defaultValue="selected" value="">
                  Please Select
                </option>
                {allCountries &&
                  allCountries.map((country) => (
                    <option key={country.country_code} value={country.country_code}>
                      {country.name}
                    </option>
                  ))}
              </Input>
            </FormGroup>
          </Col>
              {/* <Col md="3">
                <FormGroup>
                  <Label> Country </Label>
                  <br />
                  <span>{financeDetails && financeDetails.address_country}</span>
                </FormGroup>
              </Col> */}
              <Col md="3">
              <FormGroup>
                <Label>Postal Code</Label>
                <br />
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={financeDetails && financeDetails.address_po_code}
                  name="address_po_code"
                />
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>GST NO</Label>
                <br />
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={financeDetails && financeDetails.address_po_code}
                  name="address_po_code"
                />
              </FormGroup>
            </Col>
              {/* <Col md="4" sm="12">
                <FormGroup>
                  <Label> Postal Code</Label>
                  <br />
                  <span>{financeDetails && financeDetails.address_po_code}</span>
                </FormGroup>
              </Col> */}
            </Row>
     
        </FormGroup>
      </Form>
  )
}

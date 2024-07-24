import React from 'react';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

function ContactInformationTab({ contactInformationDetails, handleCiInputs,arb,arabic }) {
  ContactInformationTab.propTypes = {
    contactInformationDetails: PropTypes.object,
    handleCiInputs: PropTypes.func,
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
      <ComponentCard title="Contact Information (For Citizen)">
        <Row>
          <Col md="3">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Address 1')?.[genLabel]}</Label>
              <Input
              name= {arb ? 'address_area_arb' : 'address_area'}
              value={
                arb
                  ? (
                    contactInformationDetails && contactInformationDetails.address_area_arb ? contactInformationDetails.address_area_arb :
                      (contactInformationDetails && contactInformationDetails.address_area_arb !== null ? '' : contactInformationDetails && contactInformationDetails.address_area)
                    )
                  : (contactInformationDetails && contactInformationDetails.address_area)
              }
                
                onChange={handleCiInputs}
                type="text"
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Address 2')?.[genLabel]}</Label>
              <Input
              name= {arb ? 'address_street_arb' : 'address_street'}
              value={
                arb
                  ? (
                    contactInformationDetails && contactInformationDetails.address_street_arb ? contactInformationDetails.address_street_arb :
                      (contactInformationDetails && contactInformationDetails.address_street_arb !== null ? '' : contactInformationDetails && contactInformationDetails.address_street)
                    )
                  : (contactInformationDetails && contactInformationDetails.address_street)
              }
                
                onChange={handleCiInputs}
                type="text"
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Postal Code')?.[genLabel]}</Label>
              <Input
              name= {arb ? 'address_po_code_arb' : 'address_po_code'}
              value={
                arb
                  ? (
                    contactInformationDetails && contactInformationDetails.address_po_code_arb ? contactInformationDetails.address_po_code_arb :
                      (contactInformationDetails && contactInformationDetails.address_po_code_arb !== null ? '' : contactInformationDetails && contactInformationDetails.address_po_code)
                    )
                  : (contactInformationDetails && contactInformationDetails.address_po_code)
              }
                
                onChange={handleCiInputs}
                type="text"
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Country')?.[genLabel]}</Label>
              <Input
              name= {arb ? 'address_country1_arb' : 'address_country1'}
              value={
                arb
                  ? (
                    contactInformationDetails && contactInformationDetails.address_country1_arb ? contactInformationDetails.address_country1_arb :
                      (contactInformationDetails && contactInformationDetails.address_country1_arb !== null ? '' : contactInformationDetails && contactInformationDetails.address_country1)
                    )
                  : (contactInformationDetails && contactInformationDetails.address_country1)
              }
                
                onChange={handleCiInputs}
                type="text"
                
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="3">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.HP/Mobile No.')?.[genLabel]}</Label>
              <Input
              name= {arb ? 'mobile_arb' : 'mobile'}
              value={
                arb
                  ? (
                    contactInformationDetails && contactInformationDetails.mobile_arb ? contactInformationDetails.mobile_arb :
                      (contactInformationDetails && contactInformationDetails.mobile_arb !== null ? '' : contactInformationDetails && contactInformationDetails.mobile)
                    )
                  : (contactInformationDetails && contactInformationDetails.mobile)
              }
                
                onChange={handleCiInputs}
                type="text"
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Alternate Contact number')?.[genLabel]}</Label>
              <Input
              name= {arb ? 'phone_arb' : 'phone'}
              value={
                arb
                  ? (
                    contactInformationDetails && contactInformationDetails.phone_arb ? contactInformationDetails.phone_arb :
                      (contactInformationDetails && contactInformationDetails.phone_arb !== null ? '' : contactInformationDetails && contactInformationDetails.phone)
                    )
                  : (contactInformationDetails && contactInformationDetails.phone)
              }
                
                onChange={handleCiInputs}
                type="text"
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Email')?.[genLabel]}</Label>
              <Input
              name= {arb ? 'email_arb' : 'email'}
              value={
                arb
                  ? (
                    contactInformationDetails && contactInformationDetails.email_arb ? contactInformationDetails.email_arb :
                      (contactInformationDetails && contactInformationDetails.email_arb !== null ? '' : contactInformationDetails && contactInformationDetails.email)
                    )
                  : (contactInformationDetails && contactInformationDetails.email)
              }
                
                onChange={handleCiInputs}
                type="email"
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label></Label>
            </FormGroup>
          </Col>
        </Row>
      </ComponentCard>
      <ComponentCard title="Contact Information (Overseas, For Non-Citizen Or Permanent Resident)">
        <Row>
          <Col md="3">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Address 1')?.[genLabel]}</Label>
              <Input
              name= {arb ? 'foreign_addrs_area_arb' : 'foreign_addrs_area'}
              value={
                arb
                  ? (
                    contactInformationDetails && contactInformationDetails.foreign_addrs_area_arb ? contactInformationDetails.foreign_addrs_area_arb :
                      (contactInformationDetails && contactInformationDetails.foreign_addrs_area_arb !== null ? '' : contactInformationDetails && contactInformationDetails.foreign_addrs_area)
                    )
                  : (contactInformationDetails && contactInformationDetails.foreign_addrs_area)
              }
                
                onChange={handleCiInputs}
                type="text"
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Address 2')?.[genLabel]}</Label>
              <Input
              name= {arb ? 'foreign_addrs_street_arb' : 'foreign_addrs_street'}
              value={
                arb
                  ? (
                    contactInformationDetails && contactInformationDetails.foreign_addrs_street_arb ? contactInformationDetails.foreign_addrs_street_arb :
                      (contactInformationDetails && contactInformationDetails.foreign_addrs_street_arb !== null ? '' : contactInformationDetails && contactInformationDetails.foreign_addrs_street)
                    )
                  : (contactInformationDetails && contactInformationDetails.foreign_addrs_street)
              }
                
                onChange={handleCiInputs}
                type="text"
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Postal Code')?.[genLabel]}</Label>
              <Input
              name= {arb ? 'foreign_addrs_postal_code_arb' : 'foreign_addrs_postal_code'}
              value={
                arb
                  ? (
                    contactInformationDetails && contactInformationDetails.foreign_addrs_postal_code_arb ? contactInformationDetails.foreign_addrs_postal_code_arb :
                      (contactInformationDetails && contactInformationDetails.foreign_addrs_postal_code_arb !== null ? '' : contactInformationDetails && contactInformationDetails.foreign_addrs_postal_code)
                    )
                  : (contactInformationDetails && contactInformationDetails.foreign_addrs_postal_code)
              }
                
                onChange={handleCiInputs}
                type="text"
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Country')?.[genLabel]}</Label>
              <Input
              name= {arb ? 'foreign_addrs_country_arb' : 'foreign_addrs_country'}
              value={
                arb
                  ? (
                    contactInformationDetails && contactInformationDetails.foreign_addrs_country_arb ? contactInformationDetails.foreign_addrs_country_arb :
                      (contactInformationDetails && contactInformationDetails.foreign_addrs_country_arb !== null ? '' : contactInformationDetails && contactInformationDetails.foreign_addrs_country)
                    )
                  : (contactInformationDetails && contactInformationDetails.foreign_addrs_country)
              }
                
                onChange={handleCiInputs}
                type="text"
                
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="3">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.HP/Mobile No.')?.[genLabel]}</Label>
              <Input
              name= {arb ? 'foreign_mobile_arb' : 'foreign_mobile'}
              value={
                arb
                  ? (
                    contactInformationDetails && contactInformationDetails.foreign_mobile_arb ? contactInformationDetails.foreign_mobile_arb :
                      (contactInformationDetails && contactInformationDetails.foreign_mobile_arb !== null ? '' : contactInformationDetails && contactInformationDetails.foreign_mobile)
                    )
                  : (contactInformationDetails && contactInformationDetails.foreign_mobile)
              }
                
                onChange={handleCiInputs}
                type="text"
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Alternate Contact number')?.[genLabel]}</Label>
              <Input
              name= {arb ? 'phone_direct_arb' : 'phone_direct'}
              value={
                arb
                  ? (
                    contactInformationDetails && contactInformationDetails.phone_direct_arb ? contactInformationDetails.phone_direct_arb :
                      (contactInformationDetails && contactInformationDetails.phone_direct_arb !== null ? '' : contactInformationDetails && contactInformationDetails.phone_direct)
                    )
                  : (contactInformationDetails && contactInformationDetails.phone_direct)
              }
                
                onChange={handleCiInputs}
                type="text"
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Email')?.[genLabel]}</Label>
              <Input
              name= {arb ? 'foreign_email_arb' : 'foreign_email'}
              value={
                arb
                  ? (
                    contactInformationDetails && contactInformationDetails.foreign_email_arb ? contactInformationDetails.foreign_email_arb :
                      (contactInformationDetails && contactInformationDetails.foreign_email_arb !== null ? '' : contactInformationDetails && contactInformationDetails.foreign_email)
                    )
                  : (contactInformationDetails && contactInformationDetails.foreign_email)
              }
                
                onChange={handleCiInputs}
                type="email"
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label></Label>
            </FormGroup>
          </Col>
        </Row>
      </ComponentCard>
    </div>
  );
}

export default ContactInformationTab;

import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';

export default function ClientMainDetails({
  handleInputs,
  clientsDetails,
  allCountries,
  // formSubmitted,
  arb,
  arabic,
}) {
  ClientMainDetails.propTypes = {
    handleInputs: PropTypes.func,
    clientsDetails: PropTypes.any,
    allCountries: PropTypes.any,
    // formSubmitted: PropTypes.any,
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
    <Form>
      <FormGroup>
        <Row>
          <Col md="3">
            <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdClient.companyName')?.[genLabel]}
              </Label>
              <span className='required'>*</span>
              <Input
                type="text"
                onChange={handleInputs}
                value={
                  arb
                    ? clientsDetails && clientsDetails.company_name_arb
                      ? clientsDetails.company_name_arb
                      : clientsDetails && clientsDetails.company_name_arb !== null
                      ? ''
                      : clientsDetails && clientsDetails.company_name
                    : clientsDetails && clientsDetails.company_name
                }
                name={arb ? 'company_name_arb' : 'company_name'}
                // className={`form-control ${
                //   formSubmitted &&
                //   clientsDetails &&
                //   clientsDetails &&
                //   clientsDetails.company_name_arb.trim() &&
                //   clientsDetails.company_name.trim() === ''
                //     ? 'highlight'
                //     : ''
                // }`}
              />
              {/* {formSubmitted &&
                clientsDetails &&
                clientsDetails.company_name_arb.trim() &&
                clientsDetails.company_name.trim() === '' && (
                  <div className="error-message">Please Enter</div>
                )} */}
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdClient.phone')?.[genLabel]}
              </Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={
                  arb
                    ? clientsDetails && clientsDetails.phone_arb
                      ? clientsDetails.phone_arb
                      : clientsDetails && clientsDetails.phone_arb !== null
                      ? ''
                      : clientsDetails && clientsDetails.phone
                    : clientsDetails && clientsDetails.phone
                }
                name={arb ? 'phone_arb' : 'phone'}
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdClient.website')?.[genLabel]}
              </Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={
                  arb
                    ? clientsDetails && clientsDetails.website_arb
                      ? clientsDetails.website_arb
                      : clientsDetails && clientsDetails.website_arb !== null
                      ? ''
                      : clientsDetails && clientsDetails.website
                    : clientsDetails && clientsDetails.website
                }
               
                name={arb ? 'website_arb' : 'website'}
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdClient.email')?.[genLabel]}
              </Label>
              <span className='required'>*</span>
              <Input
                type="text"
                onChange={handleInputs}
                value={
                  arb
                    ? clientsDetails && clientsDetails.email_arb
                      ? clientsDetails.email_arb
                      : clientsDetails && clientsDetails.email_arb !== null
                      ? ''
                      : clientsDetails && clientsDetails.email
                    : clientsDetails && clientsDetails.email
                }
                name={arb ? 'email_arb' : 'email'}
                // className={`form-control ${
                //   formSubmitted &&
                //   clientsDetails &&
                //   clientsDetails.email_arb.trim() &&
                //   clientsDetails &&
                //   clientsDetails.email.trim() === ''
                //     ? 'highlight'
                //     : ''
                // }`}
              />
              {/* {formSubmitted &&
                clientsDetails &&
                clientsDetails.email_arb.trim() &&
                clientsDetails &&
                clientsDetails.email.trim() === '' && (
                  <div className="error-message">Please Enter</div>
                )} */}
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdClient.fax')?.[genLabel]}
              </Label>
              <Input
                type="text"
                onChange={handleInputs}
                
                value={
                  arb
                    ? clientsDetails && clientsDetails.fax_arb
                      ? clientsDetails.fax_arb
                      : clientsDetails && clientsDetails.fax_arb !== null
                      ? ''
                      : clientsDetails && clientsDetails.fax
                    : clientsDetails && clientsDetails.fax
                }
                name={arb ? 'fax_arb' : 'fax'}
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdClient.Address1')?.[genLabel]}
              </Label>
              <Input
                type="text"
                onChange={handleInputs}
                
                value={
                  arb
                    ? clientsDetails && clientsDetails.address_flat_arb
                      ? clientsDetails.address_flat_arb
                      : clientsDetails && clientsDetails.address_flat_arb !== null
                      ? ''
                      : clientsDetails && clientsDetails.address_flat
                    : clientsDetails && clientsDetails.address_flat
                }
                name={arb ? 'address_flat_arb' : 'address_flat'}
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdClient.Address2')?.[genLabel]}
              </Label>
              <Input
                type="text"
                onChange={handleInputs}
               
                value={
                  arb
                    ? clientsDetails && clientsDetails.address_street_arb
                      ? clientsDetails.address_street_arb
                      : clientsDetails && clientsDetails.address_street_arb !== null
                      ? ''
                      : clientsDetails && clientsDetails.address_street
                    : clientsDetails && clientsDetails.address_street
                }
                name={arb ? 'address_street_arb' : 'address_street'}
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              {' '}
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdClient.country')?.[genLabel]}
              </Label>
              <Input
                type="select"
                name="address_country"
                onChange={handleInputs}
                value={clientsDetails && clientsDetails.address_country}
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
          <Col md="3">
            <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdClient.postalCode')?.[genLabel]}
              </Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={
                  arb
                    ? clientsDetails && clientsDetails.address_po_code_arb
                      ? clientsDetails.address_po_code_arb
                      : clientsDetails && clientsDetails.address_po_code_arb !== null
                      ? ''
                      : clientsDetails && clientsDetails.address_po_code
                    : clientsDetails && clientsDetails.address_po_code
                }
                name={arb ? 'address_po_code_arb' : 'address_po_code'}
              />
            </FormGroup>
          </Col>
          {/* <Col md="3">
            <FormGroup>
              <Label>Retention </Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={clientsDetails && clientsDetails.retention}
                name="retention"
              />
            </FormGroup>
          </Col> */}
        </Row>
      </FormGroup>
    </Form>
  );
}

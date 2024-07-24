import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

export default function SupplierDetails({
  handleInputs,
  supplier,
  allCountries,
  supplierStatus,
  arb,
  arabic,
  
  // setEditPurchaseOrderLinked,
}) {
  SupplierDetails.propTypes = {
    handleInputs: PropTypes.func,
    supplier: PropTypes.object,
    allCountries: PropTypes.object,
    supplierStatus: PropTypes.object,
    status: PropTypes.object,
    arb: PropTypes.any,
    arabic: PropTypes.any,
    // setEditPurchaseOrderLinked: PropTypes.bool,
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
                <Label>
                  {/* Name <span className="required"> *</span> */}
                  {arabic.find((item) => item.key_text === 'mdSupplier.Name')?.[genLabel]}
                </Label>
                <span className='required'>*</span>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={
                    arb
                      ? supplier && supplier.company_name_arb
                      : supplier && supplier.company_name
                  }
                  name={arb ? 'company_name_arb' : 'company_name'}
                />
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>{arabic.find((item) => item.key_text === 'mdSupplier.Email')?.[genLabel]}</Label>
                <span className='required'>*</span>
                <Input
                  type="text"
                  onChange={handleInputs}
                  
                  value={
                    arb
                      ? supplier && supplier.email_arb
                      : supplier && supplier.email
                  }
                  name={arb ? 'email_arb' : 'email'}
                />
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>{arabic.find((item) => item.key_text === 'mdSupplier.Website')?.[genLabel]}</Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  
                  value={
                    arb
                      ? supplier && supplier.website_arb
                      : supplier && supplier.website
                  }
                  name={arb ? 'website_arb' : 'website'}
                />
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>{arabic.find((item) => item.key_text === 'mdSupplier.Fax')?.[genLabel]}</Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  
                  value={
                    arb
                      ? supplier && supplier.fax_arb
                      : supplier && supplier.fax
                  }
                  name={arb ? 'fax_arb' : 'fax'}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="3">
              <FormGroup>
                <Label>{arabic.find((item) => item.key_text === 'mdSupplier.Mobile')?.[genLabel]}</Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  
                  value={
                    arb
                      ? supplier && supplier.mobile_arb
                      : supplier && supplier.mobile
                  }
                  name={arb ? 'mobile_arb' : 'mobile'}
                />
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>{arabic.find((item) => item.key_text === 'mdSupplier.Status')?.[genLabel]}</Label>
                <Input
                  type="select"
                  onChange={handleInputs}
                  
                  value={
                    arb
                      ? supplier && supplier.status_arb
                      : supplier && supplier.status
                  }
                  name={arb ? 'status_arb' : 'status'}
                >
                  <option defaultValue="selected">Please Select</option>
                  <option value="current">Current</option>
                  <option value="old">Old</option>
                  {supplierStatus &&
                    supplierStatus.map((ele) => {
                      return <option value={ele.value}>{ele.value}</option>;
                    })}
                </Input>
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>{arabic.find((item) => item.key_text === 'mdSupplier.GST NO')?.[genLabel]}</Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={
                    arb
                      ? supplier && supplier.gst_no_arb
                      : supplier && supplier.gst_no
                  }
                  name={arb ? 'gst_no_arb' : 'gst_no'}
                />
              </FormGroup>
            </Col>
          
          
            <Col md="3">
              <FormGroup>
                <Label>{arabic.find((item) => item.key_text === 'mdSupplier.Payment Details')?.[genLabel]}</Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  
                  value={
                    arb
                      ? supplier && supplier.payment_details_arb
                      : supplier && supplier.payment_details
                  }
                  name={arb ? 'payment_details_arb' : 'payment_details'}
                />
              </FormGroup>
            </Col>
            </Row>
            <Row>
            <Col md="3">
              <FormGroup>
                <Label>{arabic.find((item) => item.key_text === 'mdSupplier.Terms')?.[genLabel]}</Label>
                <Input
                  type="textarea"
                  onChange={handleInputs}
                 
                  value={
                    arb
                      ? supplier && supplier.terms_arb
                      : supplier && supplier.terms
                  }
                  name={arb ? 'terms_arb' : 'terms'}
                />
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>{arabic.find((item) => item.key_text === 'mdSupplier.ContactPerson')?.[genLabel]}</Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  
                  value={
                    arb
                      ? supplier && supplier.contact_person_arb
                      : supplier && supplier.contact_person
                  }
                  name={arb ? 'contact_person_arb' : 'contact_person'}
                />
              </FormGroup>
            </Col>
          </Row>
        
      </FormGroup>
      <FormGroup>
        <ComponentCard title={arb?"عنوان":"Address"}>
          <Row>
            <Col md="3">
              <FormGroup>
                <Label>{arabic.find((item) => item.key_text === 'mdSupplier.Address 1')?.[genLabel]}</Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                 
                  value={
                    arb
                      ? supplier && supplier.address_flat_arb
                      : supplier && supplier.address_flat
                  }
                  name={arb ? 'address_flat_arb' : 'address_flat'}
                />
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>{arabic.find((item) => item.key_text === 'mdSupplier.Address 2')?.[genLabel]}</Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  
                  value={
                    arb
                      ? supplier && supplier.address_street_arb
                      : supplier && supplier.address_street
                  }
                  name={arb ? 'address_street_arb' : 'address_street'}
                />
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>{arabic.find((item) => item.key_text === 'mdSupplier.State/Zip')?.[genLabel]}</Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  
                  value={
                    arb
                      ? supplier && supplier.address_state_arb
                      : supplier && supplier.address_state
                  }
                  name={arb ? 'address_state_arb' : 'address_state'}
                />
              </FormGroup>
            </Col>
          
          
            <Col md="3">
              <FormGroup>
                <Label>{arabic.find((item) => item.key_text === 'mdSupplier.Country')?.[genLabel]}</Label>
                <Input
                  type="select"
                  
                  onChange={handleInputs}
                 
                  value={
                    arb
                      ? supplier && supplier.address_country_arb
                      : supplier && supplier.address_country
                  }
                  name={arb ? 'address_country_arb' : 'address_country'}
                >
                  <option defaultValue="selected">Please Select</option>
                  {allCountries &&
                    allCountries.map((country) => (
                      <option value={country.country_code}>{country.name}</option>
                    ))}
                </Input>
              </FormGroup>
            </Col>
            </Row>

            <Row>
            <Col md="3">
              <FormGroup>
                <Label>{arabic.find((item) => item.key_text === 'mdSupplier.Pin Code')?.[genLabel]}</Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  
                  value={
                    arb
                      ? supplier && supplier.address_po_code_arb
                      : supplier && supplier.address_po_code
                  }
                  name={arb ? 'address_po_code_arb' : 'address_po_code'}
                />
              </FormGroup>
            </Col>
          </Row>
        
              {/* <Row>
                <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                  <Button
                    className="shadow-none"
                    onClick={() => {
                      setEditPurchaseOrderLinked(true);
                    }}
                    color="primary"
                  >
                    Make Supplier Payment
                  </Button>
                </div>
              </Row> */}
          
        </ComponentCard>
      </FormGroup>
    </Form>
  );
}

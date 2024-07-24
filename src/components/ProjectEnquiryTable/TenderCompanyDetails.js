import React, { useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  ModalFooter,
  Label,
  Input,
  CardTitle,
  Button,
} from 'reactstrap';
import PropTypes from 'prop-types';

export default function TenderCompanyDetails({
  handleInputs,
  allCountries,
  insertCompany,
  modal,
  toggle,
  companyInsertData,
  addFormSubmitted
}) {
  TenderCompanyDetails.propTypes = {
    handleInputs: PropTypes.any,
    insertCompany: PropTypes.any,
    allCountries: PropTypes.any,
    modal: PropTypes.any,
    toggle: PropTypes.any,
    companyInsertData: PropTypes.any,
    addFormSubmitted: PropTypes.any,
  };

  const [modal1, setModal1] = useState(false);
  const toggle1 = () => {
    setModal1(!modal1);
  };

  return (
    <div>
      <Modal size="lg" isOpen={modal} toggle={toggle.bind(null)}>
        <ModalHeader toggle={toggle.bind(null)}>New Company</ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
              <Card>
                <CardBody>
                  <Form>
                    <Row>
                      <Col md="4">
                        <FormGroup>
                          <Label>
                            Company Name <span className="required"> *</span>
                          </Label>
                          <Input type="text" name="company_name" onChange={handleInputs}
                          className={`form-control ${addFormSubmitted && companyInsertData && companyInsertData.company_name.trim() === '' ? 'highlight' : ''
                        }`} 
                        />
{addFormSubmitted && companyInsertData && companyInsertData.company_name.trim() === '' && (
                      <div className="error-message">Please enter the company name</div>
                    )}
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label>Website</Label>
                          <Input type="text" name="website" onChange={handleInputs} />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label>
                            Main Phone <span className="required"> *</span>
                          </Label>
                          <Input type="text" name="phone" onChange={handleInputs} 
                          className={`form-control ${addFormSubmitted && companyInsertData && companyInsertData.phone.trim() === '' ? 'highlight' : ''
                        }`}
                          />
                          {addFormSubmitted && companyInsertData && companyInsertData.phone.trim() === '' && (
                      <div className="error-message">Please enter the phone</div>
                    )}
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label>Main Fax</Label>
                          <Input type="text" name="fax" onChange={handleInputs} />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardBody className="bg-light">
                  <CardTitle tag="h4" className="mb-0">
                    Address
                  </CardTitle>
                </CardBody>
                <CardBody>
                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <Label>Address 1<span className="required"> *</span></Label>
                        <Input
                          type="text"
                          name="address_street"
                          placeholder=" "
                          onChange={handleInputs}
                          className={`form-control ${addFormSubmitted && companyInsertData && companyInsertData.address_street.trim() === '' ? 'highlight' : ''
                        }`}
                        />
                         {addFormSubmitted && companyInsertData && companyInsertData.address_street.trim() === '' && (
                      <div className="error-message">Please enter the Address</div>
                    )}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Address 2</Label>
                        <Input
                          type="text"
                          name="address_town"
                          placeholder=""
                          onChange={handleInputs}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Post Code<span className="required"> *</span></Label>
                        <Input
                          type="text"
                          name="address_po_code"
                          placeholder=""
                          onChange={handleInputs}
                          className={`form-control ${addFormSubmitted && companyInsertData && companyInsertData.address_po_code.trim() === '' ? 'highlight' : ''
                        }`}
                        />
                         {addFormSubmitted && companyInsertData && companyInsertData.address_po_code.trim() === '' && (
                      <div className="error-message">Please enter the Post Code</div>
                    )}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        {' '}
                        <Label>Country<span className="required"> *</span></Label>
                        <Input type="select" name="address_country" onChange={handleInputs}
                        className={`form-control ${addFormSubmitted && companyInsertData && companyInsertData.address_country.trim() === '' ? 'highlight' : ''
                      }`}
                        >
                          <option defaultValue="selected" value="">
                            Please Select
                          </option>
                          {allCountries &&
                            allCountries.map((country) => (
                              <option key={country.country_code} value={country.name}>
                                {country.name}
                              </option>
                            ))}
                        </Input>
                        {addFormSubmitted && companyInsertData && companyInsertData.address_country.trim() === '' && (
                      <div className="error-message">Please Select Country</div>
                    )}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Supplier Type</Label>
                        <Input type="select" name="supplier_type" onChange={handleInputs}>
                          <option defaultValue="selected">Please Select</option>
                          <option value="2nd middle man">2nd middle man</option>
                          <option value="3rd middle man">3rd middle man</option>
                          <option value="Broker">Broker</option>
                          <option value="Retailer">Retailer</option>
                          <option value="Wholesaler">Wholesaler</option>
                        </Input>
                      </FormGroup>
                    </Col>
                     
                    <Col md="4">
                      <FormGroup>
                        <Label>Industry</Label>
                        <Input type="select" name="industry" onChange={handleInputs}>
                          <option defaultValue="selected">Please Select</option>
                          <option value="Creative">Creative</option>
                          <option value="Education">Education</option>
                          <option value="Financial">Financial</option>
                          <option value="Jewellery">Jewellery</option>
                          <option value="Legal">Legal</option>
                          <option value="Management">Management</option>
                          <option value="Media">Media</option>
                          <option value="Medical">Medical</option>
                          <option value="Money Exchange">Money Exchange</option>
                          <option value="Organisation">Organisation</option>
                          <option value="Others">Others</option>
                          <option value="Property">Property</option>
                          <option value="Real Estate">Real Estate</option>
                          <option value="Retail b2b">Retail b2b</option>
                          <option value="Retail b2c">Retail b2c</option>
                          <option value="Service">Service</option>
                          <option value="Software">Software</option>
                          <option value="Technology">Technology</option>
                          <option value="Telecom">Telecom</option>
                          <option value="Trading">Trading</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  
                  </Row>
                  <Row>
                  <Col md="4">
                      <FormGroup>
                        <Label>Company Size</Label>
                        <Input type="select" name="company_size" onChange={handleInputs}>
                          <option defaultValue="selected">Please Select</option>
                          <option value="Large">Large</option>
                          <option value="Medium">Medium</option>
                          <option value="Small">Small</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Company Source</Label>
                        <Input type="select" name="source" onChange={handleInputs}>
                          <option defaultValue="selected">Please Select</option>
                          <option value="Agency">Agency</option>
                          <option value="Direct">Direct</option>
                          <option value="Referral">Referral</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="btn mr-2 shadow-none"
            onClick={() => {
              insertCompany();
            }}
          >
            Save & Continue
          </Button>
          <Button color="secondary" className="shadow-none" onClick={toggle.bind(null)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modal1} toggle={toggle1.bind(null)}>
        <ModalHeader toggle={toggle1.bind(null)}>New Company</ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
              <Card>
                <CardTitle tag="h4" className="border-bottom bg-primary p-3 mb-0 text-white">
                  New Contact
                </CardTitle>
                <CardBody>
                  <Form>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <Label>Company Name</Label>
                          <Input type="text" />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" className="btn mr-2 shadow-none" onClick={toggle1.bind(null)}>
            Save & Continue
          </Button>
          <Button color="dark" className="shadow-none" onClick={toggle1.bind(null)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

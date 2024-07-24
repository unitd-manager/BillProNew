import React from 'react';
import {
  Col,
  FormGroup,
  Button,
  ModalFooter,
  Label,
  ModalBody,
  Modal,
  Input,
  Row,
  CardBody,
  Form,
  ModalHeader,
  Card,
  CardTitle,
} from 'reactstrap';
import PropTypes from 'prop-types';

export default function TenderCompanyEditDetails({
  allCountries,
  insertCompany,
  companyhandleInputs,
  addCompanyToggle,
  addCompanyModal,
}) {
  TenderCompanyEditDetails.propTypes = {
    allCountries: PropTypes.any,
    insertCompany: PropTypes.any,
    companyhandleInputs: PropTypes.any,
    addCompanyModal: PropTypes.any,
    addCompanyToggle: PropTypes.any,
  };
  return (
    <div>
      {' '}
      <Modal size="lg" isOpen={addCompanyModal} toggle={addCompanyToggle.bind(null)}>
        <ModalHeader toggle={addCompanyToggle.bind(null)}>New Company</ModalHeader>
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
                          <Input type="text" name="company_name" onChange={companyhandleInputs} />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label>Website</Label>
                          <Input type="text" name="website" onChange={companyhandleInputs} />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label>
                            Main Phone <span className="required"> *</span>
                          </Label>
                          <Input type="text" name="phone" onChange={companyhandleInputs} />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <FormGroup>
                          <Label>Main Fax</Label>
                          <Input type="text" name="fax" onChange={companyhandleInputs} />
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
                        <Label>
                          Address 1<span className="required"> *</span>
                        </Label>
                        <Input
                          type="text"
                          name="address_street"
                          placeholder=" "
                          onChange={companyhandleInputs}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Address 2</Label>
                        <Input
                          type="text"
                          name="address_town"
                          placeholder=""
                          onChange={companyhandleInputs}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>
                          Post Code<span className="required"> *</span>
                        </Label>
                        <Input
                          type="text"
                          name="address_po_code"
                          placeholder=""
                          onChange={companyhandleInputs}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <FormGroup>
                        {' '}
                        <Label>
                          Country<span className="required"> *</span>
                        </Label>
                        <Input type="select" name="address_country" onChange={companyhandleInputs}>
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
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Supplier Type</Label>
                        <Input type="select" name="supplier_type" onChange={companyhandleInputs}>
                          <option value="" selected="selected">
                            Please Select
                          </option>
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
                        <Input type="select" name="industry" onChange={companyhandleInputs}>
                          <option value="" selected="selected">
                            Please Select
                          </option>
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
                </CardBody>
                <CardBody>
                  <Form>
                    <Row>
                      <Col md="4">
                        <FormGroup>
                          <Label>Company Size</Label>
                          <Input type="select" name="company_size" onChange={companyhandleInputs}>
                            <option value="" selected="selected">
                              Please Select
                            </option>
                            <option value="Large">Large</option>
                            <option value="Medium">Medium</option>
                            <option value="Small">Small</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label>Company Source</Label>
                          <Input type="select" name="source" onChange={companyhandleInputs}>
                            <option value="" selected="selected">
                              Please Select
                            </option>
                            <option value="Agency">Agency</option>
                            <option value="Direct">Direct</option>
                            <option value="Referral">Referral</option>
                          </Input>
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
          <Button
            color="primary"
            className="shadow-none"
            onClick={() => {
              insertCompany();
            }}
          >
            Save & Continue
          </Button>
          <Button color="secondary" className="shadow-none" onClick={addCompanyToggle.bind(null)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

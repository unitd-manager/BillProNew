import React, { useState, useEffect } from 'react';
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
import api from '../../constants/api';

export default function TenderCompanyDetails({
  handleInputs,
  allCountries,
  insertCompany,
  modal,
  toggle,
  companyInsertData,
  addFormSubmitted,
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

  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  const selectedLanguage = getSelectedLanguageFromLocalStorage();

  // Use the selected language value as needed
  console.log('Selected language from localStorage:', selectedLanguage);

  const [arabic, setArabic] = useState([]);

  const arb = selectedLanguage === 'Arabic';

  // const eng = selectedLanguage === 'English';

  const getArabicCompanyName = () => {
    api
      .get('/translation/getTranslationForCompany')
      .then((res) => {
        setArabic(res.data.data);
      })
      .catch(() => {
        // Handle error if needed
      });
  };

  console.log('arabic', arabic);
  useEffect(() => {
    getArabicCompanyName();
  }, []);

  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }
  const [categoryLinked, setCategoryLinked] = useState();
  const [supplierLinked, setSupplierLinked] = useState();
  const [IndustryLinked, setIndustryLinked] = useState();
  const [companySizeLinked, setcompanySizeLinked] = useState();
  const getCategory = () => {
    api.get('/tender/getCompanySourceFromValueList', categoryLinked).then((res) => {
      setCategoryLinked(res.data.data);
    });
  };

  const getSupplierFromValueList = () => {
    api.get('/tender/getSupplierFromValueList', categoryLinked).then((res) => {
      setSupplierLinked(res.data.data);
    });
  };
  const getIndustryFromValueList = () => {
    api.get('/tender/getIndustryFromValueList', categoryLinked).then((res) => {
      setIndustryLinked(res.data.data);
    });
  };
  const getCompanySizeFromValueList = () => {
    api.get('/tender/getCompanySizeFromValueList', categoryLinked).then((res) => {
      setcompanySizeLinked(res.data.data);
    });
  };
  useEffect(() => {
    getCategory();
    getSupplierFromValueList();
    getIndustryFromValueList();
    getCompanySizeFromValueList();
  }, []);
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
                          <Label dir="rtl" style={{ textAlign: 'right' }}>
                            {
                              arabic.find((item) => item.key_text === 'mdClient.companyName')?.[
                                genLabel
                              ]
                            }
                          </Label>
                          <span className="required">*</span>
                          <Input
                            type="text"
                            onChange={handleInputs}
                            value={
                              arb
                                ? companyInsertData && companyInsertData.company_name_arb
                                  ? companyInsertData.company_name_arb
                                  : companyInsertData && companyInsertData.company_name_arb !== null
                                  ? ''
                                  : companyInsertData && companyInsertData.company_name
                                : companyInsertData && companyInsertData.company_name
                            }
                            name={arb ? 'company_name_arb' : 'company_name'}
                            className={`form-control ${
                              addFormSubmitted &&
                              ((arb && companyInsertData.company_name_arb.trim() === '') ||
                                (!arb && companyInsertData.company_name.trim() === ''))
                                ? 'highlight'
                                : ''
                            }`}
                          />

                          {addFormSubmitted &&
                            ((arb &&
                              companyInsertData &&
                              companyInsertData.company_name_arb.trim() === '') ||
                              (!arb && companyInsertData.company_name.trim() === '')) && (
                              <div className="error-message">Please Enter</div>
                            )}
                        </FormGroup>
                      </Col>
                      {/*  */}
                      {/* <Col md="4">
                        <FormGroup>
                          <Label>
                            Company Name <span className="required"> *</span>
                          </Label>
                          <Input
                            type="text"
                            name="company_name"
                            onChange={handleInputs}
                            className={`form-control ${
                              addFormSubmitted &&
                              companyInsertData &&
                              companyInsertData.company_name.trim() === ''
                                ? 'highlight'
                                : ''
                            }`}
                          />
                          {addFormSubmitted &&
                            companyInsertData &&
                            companyInsertData.company_name.trim() === '' && (
                              <div className="error-message">Please Enter</div>
                            )}
                        </FormGroup>
                      </Col> */}

                      <Col md="4">
                        <FormGroup>
                          <Label dir="rtl" style={{ textAlign: 'right' }}>
                            {
                              arabic.find((item) => item.key_text === 'mdClient.website')?.[
                                genLabel
                              ]
                            }{' '}
                            {/*Access the value property */}
                          </Label>
                          <Input
                            type="text"
                            onChange={handleInputs}
                            name={arb ? 'website_arb' : 'website'}
                            value={
                              arb
                                ? companyInsertData && companyInsertData.website_arb
                                  ? companyInsertData.website_arb
                                  : companyInsertData && companyInsertData.website_arb !== null
                                  ? ''
                                  : companyInsertData && companyInsertData.website
                                : companyInsertData && companyInsertData.website
                            }
                          ></Input>
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label dir="rtl" style={{ textAlign: 'right' }}>
                            {arabic.find((item) => item.key_text === 'mdClient.phone')?.[genLabel]}
                          </Label>

                          <Input
                            type="number"
                            onChange={handleInputs}
                            value={
                              arb
                                ? companyInsertData && companyInsertData.phone_arb
                                  ? companyInsertData.phone_arb
                                  : companyInsertData && companyInsertData.phone_arb !== null
                                  ? ''
                                  : companyInsertData && companyInsertData.phone
                                : companyInsertData && companyInsertData.phone
                            }
                            name={arb ? 'phone_arb' : 'phone'}
                          />
                        </FormGroup>
                      </Col>

                      <Col md="4">
                        <FormGroup>
                          <Label dir="rtl" style={{ textAlign: 'right' }}>
                            {arabic.find((item) => item.key_text === 'mdClient.fax')?.[genLabel]}{' '}
                            {/*Access the value property */}
                          </Label>
                          <Input
                            type="text"
                            onChange={handleInputs}
                            name={arb ? 'fax_arb' : 'fax'}
                            value={
                              arb
                                ? companyInsertData && companyInsertData.fax_arb
                                  ? companyInsertData.fax_arb
                                  : companyInsertData && companyInsertData.fax_arb !== null
                                  ? ''
                                  : companyInsertData && companyInsertData.fax
                                : companyInsertData && companyInsertData.fax
                            }
                          ></Input>
                        </FormGroup>
                      </Col>
                      {/* <Col md="4">
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
                          <Input
                            type="text"
                            name="phone"
                            onChange={handleInputs}
                            className={`form-control ${
                              addFormSubmitted &&
                              companyInsertData &&
                              companyInsertData.phone.trim() === ''
                                ? 'highlight'
                                : ''
                            }`}
                          />
                          {addFormSubmitted &&
                            companyInsertData &&
                            companyInsertData.phone.trim() === '' && (
                              <div className="error-message">Please Enter</div>
                            )}
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label>Main Fax</Label>
                          <Input type="text" name="fax" onChange={handleInputs} />
                        </FormGroup>
                      </Col> */}
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
                        <Label dir="rtl" style={{ textAlign: 'right' }}>
                          {arabic.find((item) => item.key_text === 'mdClient.Address1')?.[genLabel]}
                        </Label>
                        <span className="required"> *</span>
                        <Input
                          type="text"
                          onChange={handleInputs}
                          value={
                            arb
                              ? companyInsertData && companyInsertData.address_flat_arb
                                ? companyInsertData.address_flat_arb
                                : companyInsertData && companyInsertData.address_flat_arb !== null
                                ? ''
                                : companyInsertData && companyInsertData.address_flat
                              : companyInsertData && companyInsertData.address_flat
                          }
                          name={arb ? 'address_flat_arb' : 'address_flat'}
                          className={`form-control ${
                            addFormSubmitted &&
                            ((arb && companyInsertData.address_flat_arb.trim() === '') ||
                              (!arb && companyInsertData.address_flat.trim() === ''))
                              ? 'highlight'
                              : ''
                          }`}
                        />

                        {addFormSubmitted &&
                          ((arb &&
                            companyInsertData &&
                            companyInsertData.address_flat_arb.trim() === '') ||
                            (!arb && companyInsertData.address_flat.trim() === '')) && (
                            <div className="error-message">Please Enter</div>
                          )}
                      </FormGroup>
                    </Col>

                    <Col md="4">
                      <FormGroup>
                        <Label dir="rtl" style={{ textAlign: 'right' }}>
                          {arabic.find((item) => item.key_text === 'mdClient.Address2')?.[genLabel]}{' '}
                          {/*Access the value property */}
                        </Label>
                        <Input
                          type="text"
                          onChange={handleInputs}
                          name={arb ? 'address_street_arb' : 'address_street'}
                          value={
                            arb
                              ? companyInsertData && companyInsertData.address_street_arb
                                ? companyInsertData.address_street_arb
                                : companyInsertData && companyInsertData.address_street_arb !== null
                                ? ''
                                : companyInsertData && companyInsertData.address_street
                              : companyInsertData && companyInsertData.address_street
                          }
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label dir="rtl" style={{ textAlign: 'right' }}>
                          {
                            arabic.find((item) => item.key_text === 'mdClient.postalCode')?.[
                              genLabel
                            ]
                          }
                        </Label>
                        <span className="required"> *</span>
                        <Input
                          type="text"
                          onChange={handleInputs}
                          value={
                            arb
                              ? companyInsertData && companyInsertData.address_po_code_arb
                                ? companyInsertData.address_po_code_arb
                                : companyInsertData &&
                                  companyInsertData.address_po_code_arb !== null
                                ? ''
                                : companyInsertData && companyInsertData.address_po_code
                              : companyInsertData && companyInsertData.address_po_code
                          }
                          name={arb ? 'address_po_code_arb' : 'address_po_code'}
                          className={`form-control ${
                            addFormSubmitted &&
                            ((arb && companyInsertData.address_po_code_arb.trim() === '') ||
                              (!arb && companyInsertData.address_po_code.trim() === ''))
                              ? 'highlight'
                              : ''
                          }`}
                        />

                        {addFormSubmitted &&
                          ((arb &&
                            companyInsertData &&
                            companyInsertData.address_po_code_arb.trim() === '') ||
                            (!arb && companyInsertData.address_po_code.trim() === '')) && (
                            <div className="error-message">Please Enter</div>
                          )}
                      </FormGroup>
                    </Col>

                    <Col md="4">
                      <FormGroup>
                        <Label dir="rtl" style={{ textAlign: 'right' }}>
                          {
                            arabic.find((item) => item.key_text === 'mdClient.country')?.[genLabel]
                          }{' '}
                          {/*Access the value property */}
                        </Label>
                        <Input
                          type="select"
                          onChange={handleInputs}
                          name={arb ? 'address_country_arb' : 'address_country'}
                          value={
                            arb
                              ? companyInsertData && companyInsertData.address_country_arb
                                ? companyInsertData.address_country_arb
                                : companyInsertData &&
                                  companyInsertData.address_country_arb !== null
                                ? ''
                                : companyInsertData && companyInsertData.address_country
                              : companyInsertData && companyInsertData.address_country
                          }
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
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label dir="rtl" style={{ textAlign: 'right' }}>
                          {
                            arabic.find((item) => item.key_text === 'mdClient.CompanySource')?.[
                              genLabel
                            ]
                          }{' '}
                          {/*Access the value property */}
                        </Label>
                        <Input
                          type="select"
                          onChange={handleInputs}
                          name={arb ? 'source_arb' : 'source'}
                          value={
                            arb
                              ? companyInsertData && companyInsertData.source_arb
                                ? companyInsertData.source_arb
                                : companyInsertData && companyInsertData.source_arb !== null
                                ? ''
                                : companyInsertData && companyInsertData.source
                              : companyInsertData && companyInsertData.source
                          }
                        >
                          {' '}
                          <option value="selected">Please Select</option>
                          {categoryLinked &&
                            categoryLinked.map((e) => {
                              return (
                                <option key={e.value} value={e.value}>
                                  {' '}
                                  {arb ? e.value_arb : e.value}{' '}
                                </option>
                              );
                            })}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label dir="rtl" style={{ textAlign: 'right' }}>
                          {
                            arabic.find((item) => item.key_text === 'mdClient.SupplierType')?.[
                              genLabel
                            ]
                          }{' '}
                          {/*Access the value property */}
                        </Label>
                        <Input
                          type="select"
                          onChange={handleInputs}
                          name={arb ? 'supplier_type_arb' : 'supplier_type'}
                          value={
                            arb
                              ? companyInsertData && companyInsertData.supplier_type_arb
                                ? companyInsertData.supplier_type_arb
                                : companyInsertData && companyInsertData.supplier_type_arb !== null
                                ? ''
                                : companyInsertData && companyInsertData.supplier_type
                              : companyInsertData && companyInsertData.supplier_type
                          }
                        >
                          {' '}
                          <option value="selected">Please Select</option>
                          {supplierLinked &&
                            supplierLinked.map((e) => {
                              return (
                                <option key={e.value} value={e.value}>
                                  {' '}
                                  {arb ? e.value_arb : e.value}{' '}
                                </option>
                              );
                            })}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label dir="rtl" style={{ textAlign: 'right' }}>
                          {arabic.find((item) => item.key_text === 'mdClient.Industry')?.[genLabel]}{' '}
                          {/*Access the value property */}
                        </Label>
                        <Input
                          type="select"
                          onChange={handleInputs}
                          name={arb ? 'industry_arb' : 'industry'}
                          value={
                            arb
                              ? companyInsertData && companyInsertData.industry_arb
                                ? companyInsertData.industry_arb
                                : companyInsertData && companyInsertData.industry_arb !== null
                                ? ''
                                : companyInsertData && companyInsertData.industry
                              : companyInsertData && companyInsertData.industry
                          }
                        >
                          <option value="selected">Please Select</option>
                          {IndustryLinked &&
                            IndustryLinked.map((e) => {
                              return (
                                <option key={e.value} value={e.value}>
                                  {' '}
                                  {arb ? e.value_arb : e.value}{' '}
                                </option>
                              );
                            })}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label dir="rtl" style={{ textAlign: 'right' }}>
                          {
                            arabic.find((item) => item.key_text === 'mdClient.CompanySize')?.[
                              genLabel
                            ]
                          }{' '}
                          {/*Access the value property */}
                        </Label>
                        <Input
                          type="select"
                          onChange={handleInputs}
                          name={arb ? 'company_size_arb' : 'company_size'}
                          value={
                            arb
                              ? companyInsertData && companyInsertData.company_size_arb
                                ? companyInsertData.company_size_arb
                                : companyInsertData && companyInsertData.company_size_arb !== null
                                ? ''
                                : companyInsertData && companyInsertData.company_size
                              : companyInsertData && companyInsertData.company_size
                          }
                        >
                          <option value="selected">Please Select</option>
                          {companySizeLinked &&
                            companySizeLinked.map((e) => {
                              return (
                                <option key={e.value} value={e.value}>
                                  {' '}
                                  {arb ? e.value_arb : e.value}{' '}
                                </option>
                              );
                            })}
                        </Input>
                      </FormGroup>
                    </Col>
                    {/* <Col md="4">
                      <FormGroup>
                        <Label>
                          Address 1<span className="required"> *</span>
                        </Label>
                        <Input
                          type="text"

                          name="address_flat"
                          placeholder=" "
                          onChange={handleInputs}
                          className={`form-control ${
                            addFormSubmitted &&
                            companyInsertData &&
                            companyInsertData.address_flat.trim() === ''
                              ? 'highlight'
                              : ''
                          }`}
                        />
                        {addFormSubmitted &&
                          companyInsertData &&
                          companyInsertData.address_flat.trim() === '' && (
                            <div className="error-message">Please Enter</div>
                          )}
                      </FormGroup>
                    </Col> */}
                    {/* <Col md="4">
                      <FormGroup>
                        <Label>Address 2</Label>
                        <Input
                          type="text"
                          name="address_street"
                          placeholder=""
                          onChange={handleInputs}
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
                          onChange={handleInputs}
                          className={`form-control ${
                            addFormSubmitted &&
                            companyInsertData &&
                            companyInsertData.address_po_code.trim() === ''
                              ? 'highlight'
                              : ''
                          }`}
                        />
                        {addFormSubmitted &&
                          companyInsertData &&
                          companyInsertData.address_po_code.trim() === '' && (
                            <div className="error-message">Please Enter</div>
                          )}
                      </FormGroup>
                    </Col> */}
                    {/* <Col md="4">
                      <FormGroup>
                        {' '}
                        <Label>
                          Country<span className="required"> *</span>+
                        </Label>
                        <Input
                          type="select"
                          name="address_country"
                          onChange={handleInputs}
                          className={`form-control ${
                            addFormSubmitted &&
                            companyInsertData &&
                            companyInsertData.address_country.trim() === ''
                              ? 'highlight'
                              : ''
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
                        {addFormSubmitted &&
                          companyInsertData &&
                          companyInsertData.address_country.trim() === '' && (
                            <div className="error-message">Please Select</div>
                          )}
                      </FormGroup>
                    </Col> */}
                  </Row>
                  {/* <Row>
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
                    
                  </Row> */}
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
        <ModalHeader toggle={toggle1.bind(null)}>New Opportunity</ModalHeader>
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

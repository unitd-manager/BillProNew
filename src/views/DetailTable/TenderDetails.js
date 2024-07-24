import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';

const BasicForm = () => {
  const [company, setCompany] = useState();
  const [contact, setContact] = useState();
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const navigate = useNavigate();
  const toggle = () => {
    setModal(!modal);
  };
  const toggle1 = () => {
    setModal1(!modal1);
  };

  //Api call for getting company dropdown
  const getCompany = () => {
    api.get('/company/getCompany').then((res) => {
      setCompany(res.data.data);
    });
  };

  // Api call for getting Contact
  const getContact = (id) => {
    api
      .post('/company/getContactByCompanyId', { company_id: id })
      .then((res) => {
        setContact(res.data.data);
        console.log(contact);
      })
      .catch((err) => {
        setContact([]);
        console.log(err);
      });
  };

  //Logic for adding company in db
  const [companyInsertData, setCompanyInsertData] = useState({
    company_name: '',
    address_street: '',
    address_town: '',
    address_country: '',
    address_po_code: '',
    phone: '',
    fax: '',
    website: '',
    supplier_type: '',
    industry: '',
    company_size: '',
    source: '',
  });

  const handleInputs = (e) => {
    setCompanyInsertData({ ...companyInsertData, [e.target.name]: e.target.value });
  };

  const insertCompany = () => {
    if (
      companyInsertData.company_name !== '' &&
      companyInsertData.phone !== '' &&
      companyInsertData.address_country !== ''
    ) {
      api
        .post('/company/insertCompany', companyInsertData)
        .then(() => {
          message('Company inserted successfully.', 'success');
          toggle();
          getCompany();
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      message('Please fill all required fields.', 'error');
    }
  };

  //Logic for adding tender in db

  const [tenderForms, setTenderForms] = useState({
    title: '',
    company_id: '',
    contact_id: '',
    category_id: '',
  });

  const handleInputsTenderForms = (e) => {
    setTenderForms({ ...tenderForms, [e.target.name]: e.target.value });
  };

  const insertTender = () => {
    if (
      tenderForms.category_id !== '' &&
      tenderForms.company_id !== '' &&
      tenderForms.title !== ''
    ) {
      api
        .post('/tender/insertTender', tenderForms)
        .then((res) => {
          console.log(res);
          message('Tender inserted successfully.', 'success');
          // window.location.reload()
          // setTimeout(() => {
          //   navigate(`/TenderEdit/${insertedDataId}`);
          // }, 300);
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      message('Please fill all required fields.', 'warning');
    }
  };

  useEffect(() => {
    getCompany();
  }, []);

  return (
    <div>
      <BreadCrumbs />
      <Row>
        <ToastContainer></ToastContainer>
        <Col md="12">
          <ComponentCard title="New Opportunity">
            <Form>
              <FormGroup>
                <Row>
                  <Col md="10">
                    <Label>
                      {' '}
                      Title <span className="required"> *</span>{' '}
                    </Label>
                    <Input type="text" name="title" onChange={handleInputsTenderForms} />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md="10">
                    <Label>Company Name </Label>

                    <Input
                      type="select"
                      name="company_id"
                      onChange={(e) => {
                        getContact(e.target.value);
                        handleInputsTenderForms(e);
                      }}
                    >
                      <option defaultValue="selected">Please Select</option>

                      {company &&
                        company.map((ele) => {
                          return (
                            <option key={ele.company_id} value={ele.company_id}>
                              {ele.company_name}
                            </option>
                          );
                        })}
                    </Input>
                  </Col>
                  <Col md="2" className="addNew">
                    <Label>Add New Name</Label>
                    <Button color="primary" className="shadow-none" onClick={toggle.bind(null)}>
                      Add New
                    </Button>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md="10">
                    <Label>
                      Category <span className="required"> *</span>
                    </Label>
                    <Input type="select" name="category_id" onChange={handleInputsTenderForms}>
                      <option defaultValue="selected">Please Select</option>
                      <option value="Project">Project</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Tenancy Project">Tenancy Project</option>
                      <option value="Tenancy Work">Tenancy Work</option>
                    </Input>
                  </Col>
                </Row>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button
                      type="button"
                      color="primary"
                      className="btn mr-2 shadow-none"
                      onClick={() => {
                        insertTender();
                      }}
                    >
                      Save & Continue
                    </Button>
                    <Button
                      onClick={() => {
                        navigate(-1);
                      }}
                      type="button"
                      className="btn btn-dark shadow-none"
                    >
                      Go to List
                    </Button>
                  </div>
                </Row>
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
      <Modal size="xl" isOpen={modal} toggle={toggle.bind(null)}>
        <ModalHeader toggle={toggle.bind(null)}>New Company</ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
                <CardBody>
                  <Form>
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <Label>
                            Company Name <span className="required"> *</span>
                          </Label>
                          <Input type="text" name="company_name" onChange={handleInputs} />
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <Label>Website</Label>
                          <Input type="text" name="website" onChange={handleInputs} />
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <Label>
                            Main Phone <span className="required"> *</span>
                          </Label>
                          <Input type="text" name="phone" onChange={handleInputs} />
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <Label>Main Fax</Label>
                          <Input type="text" name="fax" onChange={handleInputs} />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardBody className="bg-light">
                  <CardTitle tag="h4" className="mb-0 p-3">
                    Address
                  </CardTitle>
                </CardBody>
                <CardBody>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <Label>Address 1</Label>
                        <Input
                          type="text"
                          name="address_street"
                          placeholder=" "
                          onChange={handleInputs}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="12">
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
                    <Col md="6">
                      <FormGroup>
                        <Label>Post Code</Label>
                        <Input
                          type="text"
                          name="address_po_code"
                          placeholder=""
                          onChange={handleInputs}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label>
                          Country <span className="required"> *</span>
                        </Label>
                        <Input type="select" name="address_country" onChange={handleInputs}>
                          <option defaultValue="selected">Please Select</option>
                          <option value="AF">Afghanistan</option>
                          <option value="AX">Aland Islands</option>
                          <option value="AL">Albania</option>
                          <option value="DZ">Algeria</option>
                          <option value="AS">American Samoa</option>
                          <option value="AD">Andorra</option>
                          <option value="AO">Angola</option>
                          <option value="AI">Anguilla</option>
                          <option value="A1">Anonymous Proxy</option>
                          <option value="AQ">Antarctica</option>
                          <option value="AG">Antigua and Barbuda</option>
                          <option value="AR">Argentina</option>
                          <option value="AM">Armenia</option>
                          <option value="AW">Aruba</option>
                          <option value="AP">Asia/Pacific Region</option>
                          <option value="AU">Australia</option>
                          <option value="AT">Austria</option>
                          <option value="AZ">Azerbaijan</option>
                          <option value="BS">Bahamas</option>
                          <option value="BH">Bahrain</option>
                          <option value="BD">Bangladesh</option>
                          <option value="BB">Barbados</option>
                          <option value="BY">Belarus</option>
                          <option value="BE">Belgium</option>
                          <option value="BZ">Belize</option>
                          <option value="BJ">Benin</option>
                          <option value="BM">Bermuda</option>
                          <option value="BT">Bhutan</option>
                          <option value="BO">Bolivia</option>
                          <option value="BA">Bosnia and Herzegovina</option>
                          <option value="BW">Botswana</option>
                          <option value="BV">Bouvet Island</option>
                          <option value="BR">Brazil</option>
                          <option value="IO">British Indian Ocean Territory</option>
                          <option value="BN">Brunei Darussalam</option>
                          <option value="BG">Bulgaria</option>
                          <option value="BF">Burkina Faso</option>
                          <option value="BI">Burundi</option>
                          <option value="KH">Cambodia</option>
                          <option value="CM">Cameroon</option>
                          <option value="CA">Canada</option>
                          <option value="CV">Cape Verde</option>
                          <option value="KY">Cayman Islands</option>
                          <option value="CF">Central African Republic</option>
                          <option value="TD">Chad</option>
                          <option value="CL">Chile</option>
                          <option value="CN">China</option>
                          <option value="CX">Christmas Island</option>
                          <option value="CC">Cocos (Keeling) Islands</option>
                          <option value="CO">Colombia</option>
                          <option value="KM">Comoros</option>
                          <option value="CG">Congo</option>
                          <option value="CD">Congo, The Democratic Republic of the</option>
                          <option value="CK">Cook Islands</option>
                          <option value="CR">Costa Rica</option>
                          <option value="CI">Cote dIvoire</option>
                          <option value="HR">Croatia</option>
                          <option value="CU">Cuba</option>
                          <option value="CY">Cyprus</option>
                          <option value="CZ">Czech Republic</option>
                          <option value="DK">Denmark</option>
                          <option value="DJ">Djibouti</option>
                          <option value="DM">Dominica</option>
                          <option value="DO">Dominican Republic</option>
                          <option value="EC">Ecuador</option>
                          <option value="EG">Egypt</option>
                          <option value="SV">El Salvador</option>
                          <option value="GQ">Equatorial Guinea</option>
                          <option value="ER">Eritrea</option>
                          <option value="EE">Estonia</option>
                          <option value="ET">Ethiopia</option>
                          <option value="EU">Europe</option>
                          <option value="FK">Falkland Islands (Malvinas)</option>
                          <option value="FO">Faroe Islands</option>
                          <option value="FJ">Fiji</option>
                          <option value="FI">Finland</option>
                          <option value="FR">France</option>
                          <option value="GF">French Guiana</option>
                          <option value="PF">French Polynesia</option>
                          <option value="TF">French Southern Territories</option>
                          <option value="GA">Gabon</option>
                          <option value="GM">Gambia</option>
                          <option value="GE">Georgia</option>
                          <option value="DE">Germany</option>
                          <option value="GH">Ghana</option>
                          <option value="GI">Gibraltar</option>
                          <option value="GR">Greece</option>
                          <option value="GL">Greenland</option>
                          <option value="GD">Grenada</option>
                          <option value="GP">Guadeloupe</option>
                          <option value="GU">Guam</option>
                          <option value="GT">Guatemala</option>
                          <option value="GG">Guernsey</option>
                          <option value="GN">Guinea</option>
                          <option value="GW">Guinea-Bissau</option>
                          <option value="GY">Guyana</option>
                          <option value="HT">Haiti</option>
                          <option value="HM">Heard Island and McDonald Islands</option>
                          <option value="VA">Holy See (Vatican City State)</option>
                          <option value="HN">Honduras</option>
                          <option value="HK">Hong Kong</option>
                          <option value="HU">Hungary</option>
                          <option value="IS">Iceland</option>
                          <option value="IN">India</option>
                          <option value="ID">Indonesia</option>
                          <option value="IR">Iran, Islamic Republic of</option>
                          <option value="IQ">Iraq</option>
                          <option value="IE">Ireland</option>
                          <option value="IM">Isle of Man</option>
                          <option value="IL">Israel</option>
                          <option value="IT">Italy</option>
                          <option value="JM">Jamaica</option>
                          <option value="JP">Japan</option>
                          <option value="JE">Jersey</option>
                          <option value="JO">Jordan</option>
                          <option value="KZ">Kazakhstan</option>
                          <option value="KE">Kenya</option>
                          <option value="KI">Kiribati</option>
                          <option value="KP">Korea, Democratic Peoples Republic of</option>
                          <option value="KR">Korea, Republic of</option>
                          <option value="KW">Kuwait</option>
                          <option value="KG">Kyrgyzstan</option>
                          <option value="LA">Lao Peoples Democratic Republic</option>
                          <option value="LV">Latvia</option>
                          <option value="LB">Lebanon</option>
                          <option value="LS">Lesotho</option>
                          <option value="LR">Liberia</option>
                          <option value="LY">Libyan Arab Jamahiriya</option>
                          <option value="LI">Liechtenstein</option>
                          <option value="LT">Lithuania</option>
                          <option value="LU">Luxembourg</option>
                          <option value="MO">Macao</option>
                          <option value="MK">Macedonia</option>
                          <option value="MG">Madagascar</option>
                          <option value="MW">Malawi</option>
                          <option value="MY">Malaysia</option>
                          <option value="MV">Maldives</option>
                          <option value="ML">Mali</option>
                          <option value="MT">Malta</option>
                          <option value="MH">Marshall Islands</option>
                          <option value="MQ">Martinique</option>
                          <option value="MR">Mauritania</option>
                          <option value="MU">Mauritius</option>
                          <option value="YT">Mayotte</option>
                          <option value="MX">Mexico</option>
                          <option value="FM">Micronesia, Federated States of</option>
                          <option value="MD">Moldova, Republic of</option>
                          <option value="MC">Monaco</option>
                          <option value="MN">Mongolia</option>
                          <option value="ME">Montenegro</option>
                          <option value="MS">Montserrat</option>
                          <option value="MA">Morocco</option>
                          <option value="MZ">Mozambique</option>
                          <option value="MM">Myanmar</option>
                          <option value="NA">Namibia</option>
                          <option value="NR">Nauru</option>
                          <option value="NP">Nepal</option>
                          <option value="NL">Netherlands</option>
                          <option value="AN">Netherlands Antilles</option>
                          <option value="NC">New Caledonia</option>
                          <option value="NZ">New Zealand</option>
                          <option value="NI">Nicaragua</option>
                          <option value="NE">Niger</option>
                          <option value="NG">Nigeria</option>
                          <option value="NU">Niue</option>
                          <option value="NF">Norfolk Island</option>
                          <option value="MP">Northern Mariana Islands</option>
                          <option value="NO">Norway</option>
                          <option value="OM">Oman</option>
                          <option value="PK">Pakistan</option>
                          <option value="PW">Palau</option>
                          <option value="PS">Palestinian Territory</option>
                          <option value="PA">Panama</option>
                          <option value="PG">Papua New Guinea</option>
                          <option value="PY">Paraguay</option>
                          <option value="PE">Peru</option>
                          <option value="PH">Philippines</option>
                          <option value="PN">Pitcairn</option>
                          <option value="PL">Poland</option>
                          <option value="PT">Portugal</option>
                          <option value="PR">Puerto Rico</option>
                          <option value="QA">Qatar</option>
                          <option value="RE">Reunion</option>
                          <option value="RO">Romania</option>
                          <option value="RU">Russian Federation</option>
                          <option value="RW">Rwanda</option>
                          <option value="SH">Saint Helena</option>
                          <option value="KN">Saint Kitts and Nevis</option>
                          <option value="LC">Saint Lucia</option>
                          <option value="PM">Saint Pierre and Miquelon</option>
                          <option value="VC">Saint Vincent and the Grenadines</option>
                          <option value="WS">Samoa</option>
                          <option value="SM">San Marino</option>
                          <option value="ST">Sao Tome and Principe</option>
                          <option value="A2">Satellite Provider</option>
                          <option value="SA">Saudi Arabia</option>
                          <option value="SN">Senegal</option>
                          <option value="RS">Serbia</option>
                          <option value="SC">Seychelles</option>
                          <option value="SL">Sierra Leone</option>
                          <option value="SG">Singapore</option>
                          <option value="SK">Slovakia</option>
                          <option value="SI">Slovenia</option>
                          <option value="SB">Solomon Islands</option>
                          <option value="SO">Somalia</option>
                          <option value="ZA">South Africa</option>
                          <option value="GS">South Georgia and the South Sandwich Islands</option>
                          <option value="ES">Spain</option>
                          <option value="LK">Sri Lanka</option>
                          <option value="SD">Sudan</option>
                          <option value="SR">Suriname</option>
                          <option value="SJ">Svalbard and Jan Mayen</option>
                          <option value="SZ">Swaziland</option>
                          <option value="SE">Sweden</option>
                          <option value="CH">Switzerland</option>
                          <option value="SY">Syrian Arab Republic</option>
                          <option value="TW">Taiwan</option>
                          <option value="TJ">Tajikistan</option>
                          <option value="TZ">Tanzania, United Republic of</option>
                          <option value="TH">Thailand</option>
                          <option value="TL">Timor-Leste</option>
                          <option value="TG">Togo</option>
                          <option value="TK">Tokelau</option>
                          <option value="TO">Tonga</option>
                          <option value="TT">Trinidad and Tobago</option>
                          <option value="TN">Tunisia</option>
                          <option value="TR">Turkey</option>
                          <option value="TM">Turkmenistan</option>
                          <option value="TC">Turks and Caicos Islands</option>
                          <option value="TV">Tuvalu</option>
                          <option value="UG">Uganda</option>
                          <option value="UA">Ukraine</option>
                          <option value="AE">United Arab Emirates</option>
                          <option value="GB">United Kingdom</option>
                          <option value="US">United States</option>
                          <option value="UM">United States Minor Outlying Islands</option>
                          <option value="UY">Uruguay</option>
                          <option value="UZ">Uzbekistan</option>
                          <option value="VU">Vanuatu</option>
                          <option value="VE">Venezuela</option>
                          <option value="VN">Vietnam</option>
                          <option value="VG">Virgin Islands, British</option>
                          <option value="VI">Virgin Islands, U.S.</option>
                          <option value="WF">Wallis and Futuna</option>
                          <option value="EH">Western Sahara</option>
                          <option value="YE">Yemen</option>
                          <option value="ZM">Zambia</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardBody>
                  <Form>
                    <Row>
                      <Col md="6">
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
                      <Col md="6">
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
                      <Col md="6">
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
                      <Col md="6">
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
                  </Form>
                </CardBody>
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
};

export default BasicForm;

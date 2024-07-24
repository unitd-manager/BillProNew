import React, { useEffect, useState } from 'react';
import {
  CardBody,
  CardTitle,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  TabContent,
  TabPane,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import * as Icon from 'react-feather';
import Swal from 'sweetalert2';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import EditCostingSummaryModal from '../../components/Tender/EditCostingSummaryModal';
import ViewQuoteLogModal from '../../components/Tender/ViewQuoteLogModal';
import AddLineItemModal from '../../components/Tender/AddLineItemModal';
import EditQuote from '../../components/Tender/EditQuoteModal';
import EditLineItemModal from '../../components/Tender/EditLineItemModal';
import AttachmentModal from '../../components/Tender/AttachmentModal';
import ViewFileComponent from '../../components/ProjectModal/ViewFileComponent';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';
//import TenderButtons from '../../components/TenderTable/TenderButtons';
import PdfQuote from '../../components/PDF/PdfQuote';
import AddCostingSummaryModal from '../../components/Tender/AddCostingSummaryModal';
import Tab from '../../components/project/Tab';
import ApiButton from '../../components/ApiButton';

const TenderEdit = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [costingsummary, setCostingSummary] = useState(null);
  const [quote, setQuote] = useState({});
  const [lineItem, setLineItem] = useState([]);
  const [tenderDetails, setTenderDetails] = useState();

  // Start for tab refresh navigation #Renuka 1-06-23
  const tabs = [
    { id: '1', name: 'Costing Summary' },
    { id: '2', name: 'Quotations' },
    { id: '3', name: 'Attachment' },
  ];
  const toggle = (tab) => {
    setActiveTab(tab);
  };
  // End for tab refresh navigation #Renuka 1-06-23

  const [editCostingSummaryModel, setEditCostingSummaryModel] = useState(false);
  const [addCostingSummaryModel, setAddCostingSummaryModel] = useState(false);
  const [costingcostingDetails, setCostingChargesDetails] = useState();
  const [quotationsModal, setquotationsModal] = useState(false);
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [viewLineModal, setViewLineModal] = useState(false);
  const [addContactModal, setAddContactModal] = useState(false);
  const [addCompanyModal, setAddCompanyModal] = useState(false);
  const [editQuoteModal, setEditQuoteModal] = useState(false);
  const [editLineModal, setEditLineModal] = useState(false);
  const [contact, setContact] = useState();
  const [company, setCompany] = useState();
  const [incharge, setIncharge] = useState();
  const [selectedCompany, setSelectedCompany] = useState();
  const [addLineItemModal, setAddLineItemModal] = useState(false);
  const [editLineModelItem, setEditLineModelItem] = useState(null);
  const [quoteForm, setQuoteForm] = useState({
    quote_date: '',
    quote_code: '',
  });
  const { id } = useParams();
  const navigate = useNavigate();
 // const applyChanges = () => {};
  const backToList = () => {
    navigate('/Tender');
  };

  const viewLineToggle = () => {
    setViewLineModal(!viewLineModal);
  };
  const addContactToggle = () => {
    setAddContactModal(!addContactModal);
  };
  const addCompanyToggle = () => {
    setAddCompanyModal(!addCompanyModal);
  };

  // Get Costing Summary Data
  const getCostingbySummary = () => {
    api
      .post('/tender/getCostingSummaryById', { opportunity_id: id })
      .then((res) => {
        setCostingSummary(res.data.data);
        //seteditCostingSummaryData(res.data.data)
        console.log('costing summary', res.data.data);
      })
  };

  // Get Company Data
  const getCompany = () => {
    api
      .get('/company/getCompany')
      .then((res) => {
        setCompany(res.data.data);
      })
  };

  // Get Quote By Id
  const getQuote = () => {
    api
      .post('/tender/getQuoteById', { opportunity_id: id })
      .then((res) => {
        setQuote(res.data.data[0]);
      })
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

  const companyhandleInputs = (e) => {
    setCompanyInsertData({ ...companyInsertData, [e.target.name]: e.target.value });
  };

  // Insert Company
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

  const getContact = (companyId) => {
    setSelectedCompany(companyId);
    api
      .post('/company/getContactByCompanyId', { company_id: companyId })
      .then((res) => {
        setContact(res.data.data);
      })
  };

  // Get Incharge
  const getIncharge = () => {
    api
      .get('/tender/projectIncharge')
      .then((res) => {
        setIncharge(res.data.data);
      })
  };

  // Get Tenders By Id

  const editTenderById = () => {
    api
      .post('/tender/getTendersById', { opportunity_id: id })
      .then((res) => {
        setTenderDetails(res.data.data);
        getContact(res.data.data.company_id);
      })
  };

  const handleInputs = (e) => {
    setTenderDetails({ ...tenderDetails, [e.target.name]: e.target.value });
  };

  //Logic for edit data in db

  const editTenderData = () => {
    api
      .post('/tender/edit-Tenders', tenderDetails)
      .then(() => {
        message('Record editted successfully', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 300);
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  const getCostingSummaryChargesById = () => {
    api
      .post('/tender/getTabOpportunityCostingSummary', {
        opportunity_id: id,
      })
      .then((res) => {
        setCostingChargesDetails(res.data.data);
      })
  };

  // Add new Contact

  const [newContactData, setNewContactData] = useState({
    salutation: '',
    first_name: '',
    email: '',
    position: '',
    department: '',
    phone_direct: '',
    fax: '',
    mobile: '',
  });

  const handleAddNewContact = (e) => {
    setNewContactData({ ...newContactData, [e.target.name]: e.target.value });
  };

  const AddNewContact = () => {
    const newDataWithCompanyId = newContactData;
    newDataWithCompanyId.company_id = selectedCompany;
    if (
      newDataWithCompanyId.salutation !== '' &&
      newDataWithCompanyId.first_name !== '' &&
      newDataWithCompanyId.email !== '' &&
      newDataWithCompanyId.position !== '' &&
      newDataWithCompanyId.department !== '' &&
      newDataWithCompanyId.phone_direct !== '' &&
      newDataWithCompanyId.fax !== '' &&
      newDataWithCompanyId.mobile !== ''
    ) {
      api
        .post('/tender/insertContact', newDataWithCompanyId)
        .then(() => {
          getContact(newDataWithCompanyId.company_id);
          message('Contact Inserted Successfully', 'success');
          window.location.reload();
        })
        .catch(() => {
          message('Unable to add Contact! try again later', 'error');
        });
    } else {
      message('All fields are required.', 'info');
    }
  };

  // Get Line Item
  const getLineItem = (quotationId) => {
    api
      .post('/tender/getQuoteLineItemsById', { quote_id: quotationId })
      .then((res) => {
        setLineItem(res.data.data);
        setViewLineModal(true);
      })
  };

  const deleteRecord = (quoteItemsId) => {
    Swal.fire({
      title: `Are you sure? `,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .post('tender/deleteQuoteItems', { quote_items_id: quoteItemsId })
          .then(() => {
            Swal.fire('Deleted!', 'Quote has been deleted.', 'success');
            setViewLineModal(false);
          })
          .catch(() => {
            message('Unable to Delete line Item', 'info');
          });
      }
    });
  };

  const handleQuoteForms = (ele) => {
    setQuoteForm({ ...quoteForm, [ele.target.name]: ele.target.value });
  };
  //Add Quote
  const insertQuote = () => {
    const newQuoteId = quoteForm;
    newQuoteId.opportunity_id = id;
    api
      .post('/tender/insertquote', newQuoteId)
      .then(() => {
        message('Quote inserted successfully.', 'success');
      })
      .catch(() => {
        message('Network connection error.', 'error');
      });
  };

  useEffect(() => {
    getCostingbySummary();
    editTenderById();
    getQuote();
    getIncharge();
    getCompany();
    getCostingSummaryChargesById();
  }, [id]);

  return (
    <>
      <BreadCrumbs heading={tenderDetails && tenderDetails.title} />
      {/* <TenderButtons
        editTenderData={editTenderData}
        navigate={navigate}
        applyChanges={applyChanges}
        backToList={backToList}
      ></TenderButtons> */}
      <ApiButton
              editData={editTenderData}
              navigate={navigate}
              applyChanges={editTenderData}
              //deleteData={deleteBookingData}
              backToList={backToList}
              module="Tender"
            ></ApiButton>
      <Form>
        <FormGroup>
          <ComponentCard
            title={`Key Details | Code: ${tenderDetails && tenderDetails.opportunity_code}`}
          >
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>
                    Project <span className="required"> *</span>
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.title}
                    name="title"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Ref No</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.office_ref_no}
                    name="office_ref_no"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>
                    Company Name (OR){' '}
                    <span
                      className="anchor"
                      onClick={() => {
                        setAddCompanyModal(true);
                      }}
                    >
                      <b>
                        <u>Add New Company</u>
                      </b>
                    </span>
                  </Label>
                  <Input
                    type="select"
                    onChange={(e) => {
                      handleInputs(e);
                      getContact(e.target.value);
                    }}
                    value={tenderDetails && tenderDetails.company_id}
                    name="company_id"
                  >
                    <option value="selected">Please Select</option>
                    {company &&
                      company.map((e) => {
                        return (
                          <option key={e.company_id} value={e.company_id}>
                            {' '}
                            {e.company_name}{' '}
                          </option>
                        );
                      })}

                    <Modal size="xl" isOpen={addCompanyModal} toggle={addCompanyToggle.bind(null)}>
                      <ModalHeader toggle={addCompanyToggle.bind(null)}>New Company</ModalHeader>
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
                                        <Input
                                          type="text"
                                          name="company_name"
                                          onChange={companyhandleInputs}
                                        />
                                      </FormGroup>
                                    </Col>
                                    <Col md="6">
                                      <FormGroup>
                                        <Label>Website</Label>
                                        <Input
                                          type="text"
                                          name="website"
                                          onChange={companyhandleInputs}
                                        />
                                      </FormGroup>
                                    </Col>
                                    <Col md="6">
                                      <FormGroup>
                                        <Label>
                                          Main Phone <span className="required"> *</span>
                                        </Label>
                                        <Input
                                          type="text"
                                          name="phone"
                                          onChange={companyhandleInputs}
                                        />
                                      </FormGroup>
                                    </Col>
                                    <Col md="6">
                                      <FormGroup>
                                        <Label>Main Fax</Label>
                                        <Input
                                          type="text"
                                          name="fax"
                                          onChange={companyhandleInputs}
                                        />
                                      </FormGroup>
                                    </Col>
                                  </Row>
                                </Form>
                              </CardBody>
                              <CardBody className="bg-light">
                                <CardTitle tag="h4" className="mb-2 p-3">
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
                                        onChange={companyhandleInputs}
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
                                        onChange={companyhandleInputs}
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
                                        onChange={companyhandleInputs}
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col md="6">
                                    <FormGroup>
                                      <Label>
                                        Country <span className="required"> *</span>
                                      </Label>
                                      <Input
                                        type="select"
                                        name="address_country"
                                        onChange={companyhandleInputs}
                                      >
                                        <option value="" selected="selected">
                                          Please Select
                                        </option>
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
                                        <option value="CD">
                                          Congo, The Democratic Republic of the
                                        </option>
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
                                        <option value="HM">
                                          Heard Island and McDonald Islands
                                        </option>
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
                                        <option value="KP">
                                          Korea, Democratic Peoples Republic of
                                        </option>
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
                                        <option value="GS">
                                          South Georgia and the South Sandwich Islands
                                        </option>
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
                                        <option value="UM">
                                          United States Minor Outlying Islands
                                        </option>
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
                                        <Input
                                          type="select"
                                          name="supplier_type"
                                          onChange={companyhandleInputs}
                                        >
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
                                    <Col md="6">
                                      <FormGroup>
                                        <Label>Industry</Label>
                                        <Input
                                          type="select"
                                          name="industry"
                                          onChange={companyhandleInputs}
                                        >
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
                                    <Col md="6">
                                      <FormGroup>
                                        <Label>Company Size</Label>
                                        <Input
                                          type="select"
                                          name="company_size"
                                          onChange={companyhandleInputs}
                                        >
                                          <option value="" selected="selected">
                                            Please Select
                                          </option>
                                          <option value="Large">Large</option>
                                          <option value="Medium">Medium</option>
                                          <option value="Small">Small</option>
                                        </Input>
                                      </FormGroup>
                                    </Col>
                                    <Col md="6">
                                      <FormGroup>
                                        <Label>Company Source</Label>
                                        <Input
                                          type="select"
                                          name="source"
                                          onChange={companyhandleInputs}
                                        >
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
                          Submit
                        </Button>
                        <Button
                          color="secondary"
                          className="shadow-none"
                          onClick={addCompanyToggle.bind(null)}
                        >
                          Cancel
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>
                    Contact (OR){' '}
                    <span className="anchor" onClick={addContactToggle.bind(null)}>
                      <b>
                        <u>Add New Contact</u>
                      </b>
                    </span>
                  </Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.contact_id}
                    name="contact_id"
                  >
                    <option value="" selected>
                      Please Select
                    </option>
                    {contact &&
                      contact.map((e) => {
                        return (
                          <option key={e.contact_id} value={e.contact_id}>
                            {e.first_name}
                          </option>
                        );
                      })}

                    <Modal size="lg" isOpen={addContactModal} toggle={addContactToggle.bind(null)}>
                      <ModalHeader toggle={addContactToggle.bind(null)}>New Contact</ModalHeader>
                      <ModalBody>
                        <Row>
                          <Col md="12">
                            <CardBody>
                                <Form>
                                  <Row>
                                    <Col md="12">
                                      <FormGroup>
                                        <Label>Title</Label>
                                        <Input
                                          type="select"
                                          name="salutation"
                                          onChange={handleAddNewContact}
                                        >
                                          <option value="" selected="selected">
                                            Please Select
                                          </option>
                                          <option value="Ms">Ms</option>
                                          <option value="Mr">Mr</option>
                                          <option value="Mrs">Mrs</option>
                                        </Input>
                                      </FormGroup>
                                    </Col>
                                    <Col md="12">
                                      <FormGroup>
                                        <Label>Name</Label>
                                        <Input
                                          type="text"
                                          name="first_name"
                                          onChange={handleAddNewContact}
                                        />
                                      </FormGroup>
                                    </Col>
                                    <Col md="12">
                                      <FormGroup>
                                        <Label>Email</Label>
                                        <Input
                                          type="text"
                                          name="email"
                                          onChange={handleAddNewContact}
                                        />
                                      </FormGroup>
                                    </Col>
                                    <Col md="12">
                                      <FormGroup>
                                        <Label>Position</Label>
                                        <Input
                                          type="text"
                                          name="position"
                                          onChange={handleAddNewContact}
                                        />
                                      </FormGroup>
                                    </Col>
                                    <Col md="12">
                                      <FormGroup>
                                        <Label>Department</Label>
                                        <Input
                                          type="text"
                                          name="department"
                                          onChange={handleAddNewContact}
                                        />
                                      </FormGroup>
                                    </Col>
                                    <Col md="12">
                                      <FormGroup>
                                        <Label>Phone (Direct)</Label>
                                        <Input
                                          type="number"
                                          name="phone_direct"
                                          onChange={handleAddNewContact}
                                        />
                                      </FormGroup>
                                    </Col>
                                    <Col md="12">
                                      <FormGroup>
                                        <Label>Fax (Direct)</Label>
                                        <Input
                                          type="number"
                                          name="fax"
                                          onChange={handleAddNewContact}
                                        />
                                      </FormGroup>
                                    </Col>
                                    <Col md="12">
                                      <FormGroup>
                                        <Label>Mobile</Label>
                                        <Input
                                          type="number"
                                          name="mobile"
                                          onChange={handleAddNewContact}
                                        />
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
                          className="shadow-none"
                          onClick={() => {
                            AddNewContact();
                          }}
                        >
                          Submit
                        </Button>
                        <Button
                          color="secondary"
                          className="shadow-none"
                          onClick={addContactToggle.bind(null)}
                        >
                          Cancel
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </Input>
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>Mode of submission</Label>
                  <Input
                    type="text"
                    value={tenderDetails && tenderDetails.mode_of_submission}
                    onChange={handleInputs}
                    name="mode_of_submission"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Services</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.services}
                    name="services"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Project Start Date</Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.site_show_date}
                    name="site_show_date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Project End Date</Label>
                  <Input
                    value={tenderDetails && tenderDetails.project_end_date}
                    type="date"
                    onChange={handleInputs}
                    name="project_end_date"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>Project Incharge</Label>
                  <Input
                    type="select"
                    value={tenderDetails && tenderDetails.site_show_attendee}
                    onChange={handleInputs}
                    name="site_show_attendee"
                  >
                    <option value="" selected="selected">
                      Please Select
                    </option>
                    {incharge &&
                      incharge.map((e) => {
                        return (
                          <option value={e.employee_id} key={e.first_name}>
                            {e.first_name}
                          </option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Actual Submission Date</Label>
                  <Input
                    type="date"
                    value={tenderDetails && tenderDetails.actual_submission_date}
                    onChange={handleInputs}
                    name="actual_submission_date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>
                    {' '}
                    Status <span className="required"> *</span>
                  </Label>
                  <Input
                    value={tenderDetails && tenderDetails.status}
                    type="select"
                    onChange={handleInputs}
                    name="status"
                  >
                    <option value="">Please Select</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Waiting for Approval">Waiting for Approval</option>
                    <option value="Submitted">Submitted</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Awarded">Awarded</option>
                    <option value="Not Awarded">Not Awarded</option>
                    <option value="Enquiry">Enquiry</option>
                    <option value="Cancelled">Cancelled</option>
                    <option selected="selected" value="Converted to Project">
                      Converted to Project
                    </option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Email</Label>
                  <Input
                    type="text"
                    value={tenderDetails && tenderDetails.email}
                    onChange={handleInputs}
                    name="email"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>Price</Label>
                  <Input
                    onChange={handleInputs}
                    type="text"
                    value={tenderDetails && tenderDetails.price}
                    name="price"
                  ></Input>
                </FormGroup>
              </Col>
            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>

      <ComponentCard title="More Details">
        <ToastContainer></ToastContainer>

        {/* Call Edit Costing Summary Modal */}

        <EditCostingSummaryModal
          editCostingSummaryModel={editCostingSummaryModel}
          setEditCostingSummaryModel={setEditCostingSummaryModel}
          costingsummary={costingsummary}
        />
        {addCostingSummaryModel && (
          <AddCostingSummaryModal
            addCostingSummaryModel={addCostingSummaryModel}
            setAddCostingSummaryModel={setAddCostingSummaryModel}
          ></AddCostingSummaryModal>
        )}
        {/* End Call Edit Costing Summary Modal */}

        {/* Call View Quote Log Modal */}

        {quotationsModal && (
          <ViewQuoteLogModal
            quotationsModal={quotationsModal}
            setquotationsModal={setquotationsModal}
            id={id}
          />
        )}

        {/* End Call View Quote Log Modal */}

        <Tab toggle={toggle} tabs={tabs} />
        <TabContent className="p-4" activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col md="3" className="mb-4 d-flex justify-content-between">
                <Button
                  color="primary"
                  className="shadow-none"
                  onClick={() => {
                    setEditCostingSummaryModel(true);
                  }}
                >
                  Edit Costing Summary
                </Button>
              </Col>
              <Col  md="3" className="mb-4 d-flex justify-content-between">
                <Button
                  color="primary"
                  className="shadow-none"
                  onClick={() => {
                    setAddCostingSummaryModel(true);
                  }}
                >
                  Add Costing Summary
                </Button>
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <FormGroup>
                  <h3>Costing Summary</h3>{' '}
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Total Cost : {costingsummary && costingsummary.total_cost}</Label>{' '}
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>PO Price (S$ W/o GST) : {costingsummary && costingsummary.po_price}</Label>{' '}
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>
                    Profit Margin : {costingsummary && costingsummary.profit_percentage} %
                  </Label>{' '}
                </FormGroup>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>Total Material</Label>
                  <br />
                  <span>{costingsummary && costingsummary.total_material_price}</span>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Transport Charges</Label>
                  <br />
                  <span>{costingsummary && costingsummary.transport_charges}</span>
                  <span>{costingcostingDetails && costingcostingDetails.transport_charges}</span>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Total Labour Charges</Label>
                  <br />
                  <span>{costingsummary && costingsummary.total_labour_charges}</span>
                </FormGroup>
              </Col>

              <Col md="3">
                <FormGroup>
                  <Label>Salesman Commission</Label>
                  <br />
                  <span>{costingsummary && costingsummary.salesman_commission}</span>
                  <span>{costingcostingDetails && costingcostingDetails.salesman_commission}</span>
                </FormGroup>
              </Col>
            </Row>
            <br />
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label> Finance Charges </Label>
                  <br />
                  <span>{costingsummary && costingsummary.finance_charges}</span>
                  <span>{costingcostingDetails && costingcostingDetails.finance_charges}</span>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Office Overheads</Label>
                  <br />
                  <span>{costingsummary && costingsummary.office_overheads}</span>
                  <span>{costingcostingDetails && costingcostingDetails.office_overheads}</span>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Other Charges</Label>
                  <br />
                  <span>{costingsummary && costingsummary.other_charges}</span>
                  <span>{costingcostingDetails && costingcostingDetails.other_charges}</span>
                </FormGroup>
              </Col>

              <Col md="3">
                <FormGroup>
                  <Label> TOTAL COST </Label>
                  <br />
                  <span>{costingsummary && costingsummary.total_cost}</span>
                  <span>
                    {(costingcostingDetails && costingcostingDetails.transport_charges) +
                      (costingcostingDetails && costingcostingDetails.other_charges) +
                      (costingcostingDetails && costingcostingDetails.salesman_commission) +
                      (costingcostingDetails && costingcostingDetails.finance_charges) +
                      (costingcostingDetails && costingcostingDetails.office_overheads) +
                      (costingcostingDetails && costingcostingDetails.total_labour_charges)}
                  </span>
                </FormGroup>
              </Col>
            </Row>
          </TabPane>

          <TabPane tabId="2">
            <Row>
              <Col md="2" className="mb-4 d-flex justify-content-between">
                <Button
                  color="primary"
                  className="shadow-none"
                  onClick={(ele) => {
                    insertQuote();
                    handleQuoteForms(ele);
                  }}
                >
                  Add Quote
                </Button>
              </Col>
              <Col md="2" className="mb-4 d-flex justify-content-between">
                <Button
                  color="primary"
                  className="shadow-none"
                  onClick={() => {
                    setquotationsModal(true);
                  }}
                >
                  View Quote Log
                </Button>
              </Col>
            </Row>

            <Form>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>Quote Code</Label>{' '}
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>Quote Date</Label>{' '}
                  </FormGroup>
                </Col>
                <Col md="1">
                  <FormGroup>
                    <Label>Amount</Label>{' '}
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label></Label>{' '}
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>Action</Label>{' '}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <span>{quote && quote.quote_code}</span>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>{quote && quote.quote_date}</Label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>{quote && quote.total_amount}</Label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <u
                        onClick={() => {
                          getLineItem(quote.quote_id);
                        }}
                      >
                        View Line Items
                      </u>
                    </Label>

                    <Modal size="xl" isOpen={viewLineModal} toggle={viewLineToggle.bind(null)}>
                      <ModalHeader toggle={viewLineToggle.bind(null)}>Line Items</ModalHeader>
                      <ModalBody>
                        <FormGroup>
                          <table className="lineitem border border-secondary rounded">
                            <thead>
                              <tr>
                                <th scope="col">Title </th>
                                <th scope="col">Description </th>
                                <th scope="col">Qty</th>
                                <th scope="col">Unit Price</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Updated By</th>
                                <th scope="col">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {lineItem &&
                                lineItem.map((e) => {
                                  return (
                                    <tr>
                                      <td data-label="Title">{e.title}</td>
                                      <td data-label="Description">{e.description}</td>
                                      <td data-label="Qty">{e.quantity}</td>
                                      <td data-label="Unit Price">{e.unit_price}</td>
                                      <td data-label="Amount">{e.amount}</td>
                                      <td data-label="Updated By">{e.created_by}</td>
                                      <td data-label="Action">
                                        <div className="anchor">
                                          <span
                                            onClick={() => {
                                              setEditLineModelItem(e);
                                              setEditLineModal(true);
                                            }}
                                          >
                                            <Icon.Edit2 />
                                          </span>
                                        </div>
                                        <div className="anchor">
                                          <span
                                            onClick={() => {
                                              deleteRecord(e.quote_items_id);
                                            }}
                                          >
                                            <Icon.Trash2 />
                                          </span>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                        </FormGroup>
                      </ModalBody>
                    </Modal>

                    <EditLineItemModal
                      editLineModal={editLineModal}
                      setEditLineModal={setEditLineModal}
                      FetchLineItemData={editLineModelItem}
                    >
                      {' '}
                    </EditLineItemModal>
                    {/* End View Line Item Modal */}
                  </FormGroup>
                </Col>

                <EditQuote
                  editQuoteModal={editQuoteModal}
                  setEditQuoteModal={setEditQuoteModal}
                  existingQuote={quote}
                ></EditQuote>
                <AddLineItemModal
                  projectInfo={quote}
                  addLineItemModal={addLineItemModal}
                  setAddLineItemModal={setAddLineItemModal}
                ></AddLineItemModal>

                <Col>
                  <FormGroup>
                    <Row>
                      <Col md="4">
                        <Label>
                          <div className="anchor">
                            <span
                              onClick={() => {
                                setEditQuoteModal(true);
                              }}
                            >
                              <Icon.Edit />
                            </span>
                          </div>
                        </Label>
                      </Col>
                      <Col md="4">
                        <Label>
                          <PdfQuote quote={quote} lineItem={quote.quote_id}></PdfQuote>
                        </Label>
                      </Col>
                      <Col md="4">
                        <Label>
                          <div className="anchor">
                            {' '}
                            <span
                              onClick={() => {
                                setAddLineItemModal(true);
                              }}
                            >
                              <Icon.PlusCircle />
                            </span>{' '}
                          </div>
                        </Label>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </TabPane>

          <TabPane tabId="3">
            <Row>
              <Col xs="12" md="3" className="mb-3">
                <Button
                  color="primary"
                  className="shadow-none"
                  onClick={() => {
                    setAttachmentModal(true);
                  }}
                >
                  Add
                </Button>
              </Col>
            </Row>

            <AttachmentModal
              opportunityId={id}
              attachmentModal={attachmentModal}
              setAttachmentModal={setAttachmentModal}
            />
            <ViewFileComponent opportunityId={id} />
          </TabPane>
        </TabContent>
      </ComponentCard>
    </>
  );
};

export default TenderEdit;

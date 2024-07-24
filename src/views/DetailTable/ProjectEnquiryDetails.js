import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';
import creationdatetime from '../../constants/creationdatetime';
import TenderCompanyDetails from '../../components/ProjectEnquiryTable/TenderCompanyDetails';
import AppContext from '../../context/AppContext';


const OpportunityDetails = () => {
  const [company, setCompany] = useState();
  const [allCountries, setallCountries] = useState();
  const [modal, setModal] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [addFormSubmitted, setAddFormSubmitted] = useState(false);
  const { id } = useParams();
  const { loggedInuser } = useContext(AppContext);
  const navigate = useNavigate();
  const toggle = () => {
    setModal(!modal);
  };
  //Api call for getting company dropdown
  const getCompany = () => {
    api.get('/company/getCompany').then((res) => {
      setCompany(res.data.data);
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
      companyInsertData.address_street !== '' &&
      companyInsertData.address_po_code !== '' &&
      companyInsertData.address_country !== ''
    ) {
      companyInsertData.modification_date = creationdatetime;
      companyInsertData.created_by = loggedInuser.first_name;
      api
        .post('/company/insertCompany', companyInsertData)
        .then(() => {
          message('Company inserted successfully.', 'success');
          getCompany();
          window.location.reload();
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      setAddFormSubmitted(true)
      message('Please fill all required fields.', 'warning');
    }
  };

  //Logic for adding tender in db
  const [tenderForms, setTenderForms] = useState({
    title: '',
    company_id: '',
    category: '',
    status:'',
    enquiry_date:'',
  });

  const handleInputsTenderForms = (e) => {
    setTenderForms({ ...tenderForms, [e.target.name]: e.target.value });
  };

  //Api for getting all countries
  const getAllCountries = () => {
    api
      .get('/clients/getCountry')
      .then((res) => {
        setallCountries(res.data.data);
      })
      .catch(() => {
        message('Country Data Not Found', 'info');
      });
  };
  //const[tenderDetails,setTenderDetails]=useState();
  const getTendersById = () => {
    api
      .post('/projectenquiry/getTendersById', { project_enquiry_id: id })
      .then((res) => {
        setTenderForms(res.data.data);
        // getContact(res.data.data.company_id);
      })
      .catch(() => {});
  };
  //console.log(tenderDetails);
  const insertTender = (code) => {
    if  ((tenderForms.company_id.trim() !== '' && tenderForms.title.trim() !== '' && tenderForms.category.trim() !== '')) {
      tenderForms.enquiry_code = code;
      tenderForms.creation_date = creationdatetime;
      tenderForms.created_by = loggedInuser.first_name;
      api
        .post('/projectenquiry/insertProjectEnquiry', tenderForms)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          getTendersById();
          message('Tender inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/ProjectEnquiryEdit/${insertedDataId}?tab=1`);
          }, 300);
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      setFormSubmitted(true);
      message('Please fill all required fields', 'warning');
    }
  };

  //QUTO GENERATED CODE
  const generateCode = () => {
    api
      .post('/projectenquiry/getCodeValue', { type: 'projectenquiry' })
      .then((res) => {
        insertTender(res.data.data);
      })
      .catch(() => {
        insertTender('');
      });
  };

  useEffect(() => {
    getCompany();
    getAllCountries();
  }, [id]);

  return (
    <div>
      <BreadCrumbs />
      <Row>
        <ToastContainer></ToastContainer>
        <Col md="6" xs="12">
          <ComponentCard title="New Enquiry">
            <Form>
              <FormGroup>
                <Row>
                  <Col md="9">
                    <Label>
                      {' '}
                      Title <span className="required"> *</span>{' '}
                    </Label>
                    <Input
                      type="text"
                      name="title"
                      value={tenderForms && tenderForms.title}
                      onChange={handleInputsTenderForms}
                      className={`form-control ${
                        formSubmitted && tenderForms.title.trim() === '' ? 'highlight' : ''
                      }`}
                    />
                    {formSubmitted && tenderForms.title.trim() === '' && (
                      <div className="error-message">Please Enter Title</div>
                    )}
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md="9">
                    <Label>
                      Company Name <span className="required"> *</span>{' '}
                    </Label>
                    <Input
                      type="select"
                      name="company_id"
                      //value={tenderForms && tenderForms.company_id}
                      onChange={handleInputsTenderForms}
                      className={`form-control ${formSubmitted && tenderForms && (tenderForms.company_id === undefined || tenderForms.company_id.trim() === '')
                          ? 'highlight'
                          : ''
                        }`}
                    >
                      <option>Please Select</option>
                      {company &&
                        company.map((ele) => {
                          return (
                            <option key={ele.company_id} value={ele.company_id}>
                              {ele.company_name}
                            </option>
                          );
                        })}
                    </Input>
                    {formSubmitted && tenderForms && (tenderForms.company_id === undefined || tenderForms.company_id.trim() === '') && (
                      <div className="error-message">Please select the Company</div>
                    )}
                  </Col>
                  <Col md="3" className="addNew">
                    <Label>Add New Name</Label>
                    <Button color="primary" className="shadow-none" onClick={toggle.bind(null)}>
                      Add New
                    </Button>
                  </Col>
                </Row>
                {/* <FormGroup>
                  <Label>
                    Company Name (OR){' '}
                                     </Label>
                  <Input
                    type="select"
                    onChange={
                      handleInputsTenderForms
                      
                    }
                    value={companyInsertData && companyInsertData.company_name}
                    name="company_id"
                  >
                    <option >Please Select</option>
                    {company &&
                      company.map((e) => {
                        return (
                          <option key={e.company_id} value={e.company_id}>
                            {' '}
                            {e.company_name}{' '}
                          </option>
                        );
                      })}

                   
                  </Input>
                </FormGroup> */}
              </FormGroup>
              <TenderCompanyDetails
                allCountries={allCountries}
                insertCompany={insertCompany}
                handleInputs={handleInputs}
                toggle={toggle}
                modal={modal}
                setModal={setModal}
                addFormSubmitted={addFormSubmitted}
                companyInsertData={companyInsertData}
                tenderForms={tenderForms}
              ></TenderCompanyDetails>
              <FormGroup>
                <Col md="9">
                  <Label>
                    Category <span className="required"> *</span>
                  </Label>
                  <Input
                    type="select"
                    onChange={handleInputsTenderForms}
                    value={tenderForms && tenderForms.category}
                    name="category"
                    className={`form-control ${
                      formSubmitted && tenderForms.category.trim() === '' ? 'highlight' : ''
                    }`}
                  >
                    <option defaultValue="selected">Please Select</option>
                    <option value="Project">Project</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Tenancy Project">Tenancy Project</option>
                    <option value="Tenancy Work">Tenancy Work</option>
                  </Input>
                  {formSubmitted && tenderForms.category.trim() === '' && (
                      <div className="error-message">Please Select Category</div>
                    )}
                </Col>
              </FormGroup>
              <Row>
                <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                  <Button
                    type="button"
                    color="primary"
                    className="btn mr-2 shadow-none"
                    onClick={() => {
                      generateCode();
                    }}
                  >
                    Save & Continue
                  </Button>
                  <Button
                    className="shadow-none"
                    color="dark"
                    onClick={() => {
                      if (
                        window.confirm(
                          'Are you sure you want to cancel  \n  \n You will lose any changes made',
                        )
                      ) {
                        navigate(-1);
                      }
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </Row>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
};

export default OpportunityDetails;

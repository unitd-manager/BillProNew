import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';
import creationdatetime from '../../constants/creationdatetime';
import TenderCompanyDetails from '../../components/TenderTable/TenderCompanyDetails';
import AppContext from '../../context/AppContext';

const TradingJobOrderDetails = () => {
  //const [company, setCompany] = useState();
  const [allCountries, setallCountries] = useState();
  const [modal, setModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const toggle = () => {
    setModal(!modal);
  };

  const [project, setProject] = useState();
   //Logic for adding tender in db
   const [tenderForms, setTenderForms] = useState({
    project_id: '',
    company_id: '',
  });


  console.log("proj",project);
  const editJobById = () => {
    api
      .get('/labourrequest/getProjecttitle')
      .then((res) => {
        const projectData = res.data.data;
        console.log('Project Data:', projectData); // Log projectData
        setProject(projectData); // Set project details in state
        const companyId = projectData && projectData.company_id; // Extract company ID
        // Set company ID in tenderForms state
        setTenderForms(prevState => ({ ...prevState, company_id: companyId }));
      })
      .catch(() => {});
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
      api
        .post('/company/insertCompany', companyInsertData)
        .then(() => {
          message('Company inserted successfully.', 'success');
          //getCompany();
          window.location.reload();
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      message('Please fill all required fields.', 'warning');
    }
  };

 

  const handleInputsTenderForms = (e) => {
    const { name, value } = e.target;
    console.log('Selected Project ID:', value);
    
    // Parse the value to ensure it's treated as a number
    const projectId = parseInt(value, 10);
  
    const selectedProject = project.find(proj => proj.project_id === projectId);
    console.log('Selected Project:', selectedProject);
    const companyId = selectedProject ? selectedProject.company_id : ''; // Extract company ID from selected project
    console.log('Company ID:', companyId); // Log company ID
    setTenderForms(prevState => ({
      ...prevState,
      [name]: value,
      company_id: companyId // Set company ID in tenderForms state
    }));
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
      .post('/joborder/getTradingjobById', { project_job_id: id })
      .then((res) => {
        setTenderForms(res.data.data);
        // getContact(res.data.data.company_id);
      })
      .catch(() => {});
  };
  //get staff details
  const { loggedInuser } = useContext(AppContext);

  //console.log(tenderDetails);
  const insertQuote = (code) => {
    if (
      tenderForms.project_id !== '' &&
      tenderForms.job_title !== '' &&
      tenderForms.job_date !== '' 
    ) {
      tenderForms.job_code = code;
      tenderForms.creation_date = creationdatetime;
      tenderForms.created_by = loggedInuser.first_name;
      api
        .post('/joborder/inserttradingjob', tenderForms)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          getTendersById();
          message('Job inserted successfully.', 'success');
          navigate(`/ProjectJobOrderEdit/${insertedDataId}?tab=1`);
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };
  //QUOTE GENERATED CODE
  const generateCode = () => {
    api
      .post('/tender/getCodeValue', { type: 'projectjob' })
      .then((res) => {
        insertQuote(res.data.data);
      })
      .catch(() => {
        insertQuote('');
      });
  };

  useEffect(() => {
    //getCompany();
    getAllCountries();
    editJobById();
  }, [id]);

  return (
    <div>
      <BreadCrumbs />
      <Row>
        <ToastContainer></ToastContainer>
        <Col md="6" xs="12">
          <ComponentCard title="New Project Job">
            <Form>
              <FormGroup>
                <Col md="9">
                  <Label>
                    {' '}
                    Job Title <span className="required"> *</span>{' '}
                  </Label>
                  <Input
                    type="text"
                    name="job_title"
                    value={tenderForms && tenderForms.job_title}
                    onChange={handleInputsTenderForms}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col md="9">
                  <Label>
                    {' '}
                    Job Date <span className="required"> *</span>{' '}
                  </Label>
                  <Input
                    type="date"
                    name="job_date"
                    value={tenderForms && tenderForms.job_date}
                    onChange={handleInputsTenderForms}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col md="9">
                  <Label>
                    Project Title <span style={{ color: 'red' }}>*</span>{' '}
                  </Label>
                  <Input
                    type="select"
                    name="project_id"
                    onChange={(e) => {
                      handleInputsTenderForms(e);
                    }}
                  >
                    <option value="" selected>
                      Please Select
                    </option>
                    {project &&
                      project.map((ele) => {
                        return (
                          <option key={ele.project_id} value={ele.project_id}>
                            {ele.project_title}
                          </option>
                        );
                      })}
                  </Input>
                </Col>
              </FormGroup>

              {/* <FormGroup>
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
                  </Col>
                  <Col md="3" className="addNew">
                    <Label>Add New Name</Label>
                    <Button color="primary" className="shadow-none" onClick={toggle.bind(null)}>
                      Add New
                    </Button>
                  </Col>
                </Row>
              </FormGroup> */}
              <TenderCompanyDetails
                allCountries={allCountries}
                insertCompany={insertCompany}
                handleInputs={handleInputs}
                toggle={toggle}
                modal={modal}
                setModal={setModal}
              ></TenderCompanyDetails>
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

export default TradingJobOrderDetails;

import React, { useState, useEffect,useContext } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../constants/api';
import message from '../../components/Message';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

const JobInformationDetails = () => {
  //All state variables
  const [employee, setEmployee] = useState();
  const [jobForms, setJobForms] = useState({
    employee_id: '',
    employee_name: '',
    fin_no: '',
    status: 'current',
  });
  const { loggedInuser } = useContext(AppContext);
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };

  const selectedLanguage = getSelectedLanguageFromLocalStorage();
  const [arabic, setArabic] = useState([]);


  const arb =selectedLanguage === 'Arabic'


  const getArabicLabels = () => {
    api
    .get('/translation/getTranslationForJobInformation')
    .then((res) => {
      setArabic(res.data.data);
    })
    .catch(() => {
      // Handle error if needed
    });   
};

  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }
  //Navigation and Parameters
  const { id } = useParams();
  const navigate = useNavigate();
  // Gettind data from Job By Id
  const editJobById = () => {
    api
      .get('/jobinformation/getEmployee')
      .then((res) => {
        console.log(res.data.data);
        setEmployee(res.data.data);
      })
      .catch(() => {});
  };
  //jobinformation data in jobinformationDetails
  const handleInputs = (e) => {
    setJobForms({ ...jobForms, [e.target.name]: e.target.value });
  };
  //inserting data of job information
  const insertJobInformation = () => {
    if (jobForms.employee_id !== '') {
      jobForms.creation_date = creationdatetime;
      jobForms.created_by= loggedInuser.first_name;
      api
        .post('/jobinformation/insertjob_information', jobForms)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          console.log(insertedDataId);
          message('Job Information inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/JobInformationEdit/${insertedDataId}?tab=1`);
          }, 300);
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields', 'error');
    }
  };
  useEffect(() => {
    editJobById();
    getArabicLabels();
  }, [id]);
  return (
    <div>
      <BreadCrumbs />
      <Row>
        <ToastContainer></ToastContainer>
        <Col md="6">
          <ComponentCard title="Key Details">
            <Form>
              <FormGroup>
                <Row>
                  <Col md="10">
                    <FormGroup>
                    <Label dir="rtl" style={{ textAlign: 'left' }}>
                {arabic.find((item) => item.key_text === 'mdJobInformation.Employee Name')?.[genLabel]}
                <span className='required'>*</span>
              </Label>
                    
                      <Input
                        type="select"
                        name="employee_id"
                        onChange={(e) => {
                          handleInputs(e);
                        }}
                      >
                        <option value="" selected>
                          Please Select
                        </option>
                        {employee &&
                          employee.map((ele) => {
                            return (
                              ele.e_count === 0 && (
                                <option key={ele.employee_id} value={ele.employee_id}>
                                  {arb?ele.employee_name_arb :ele.employee_name}{' '}
                                </option>
                              )
                            );
                          })}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>

                <FormGroup>
                  <Row>
                    <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                      <Button
                        color="primary"
                        type="button"
                        className="btn mr-2 shadow-none"
                        onClick={() => {
                          insertJobInformation();
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
                </FormGroup>
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
};
export default JobInformationDetails;

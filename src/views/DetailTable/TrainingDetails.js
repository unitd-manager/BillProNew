import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

const TrainingDetails = () => {
  // All State variable
  const [training, setTraining] = useState();
  const [trainingDetails, setTrainingDetails] = useState({
    title: '',
    training_id: '',
  });
  //Navigation and parameter
  const navigate = useNavigate();
  const { loggedInuser } = useContext(AppContext);
  ///getting data from Training
  const getTraining = () => {
    api
      .get('/training/getTraining')
      .then((res) => {
        setTraining(res.data.data);
      })
      .catch(() => {
        message('Training Data Not Found', 'info');
      });
  };
  //Setting data in trainingDetails
  const handleInputs = (e) => {
    setTrainingDetails({ ...trainingDetails, [e.target.name]: e.target.value });
  };
  //Insert Training
  const insertTrainingDetailData = () => {
    if (trainingDetails.title !== '') {
      trainingDetails.creation_date = creationdatetime;
      trainingDetails.created_by= loggedInuser.first_name;
      api
        .post('/training/insertTraining', trainingDetails)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          message('Training inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/TrainingEdit/${insertedDataId}`);
          }, 300);
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      message('Please fill all required fields.', 'error');
    }
  };
  useEffect(() => {
    getTraining();
    console.log(training)
  }, []);
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
      .get('/training/getTranslationforHRTraining')
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

  return (
    <>
      <BreadCrumbs />
      <ToastContainer></ToastContainer>
      <Row>
        <Col md="6" xs="12">
          <ComponentCard title="Key Details">
            <Form>
              <FormGroup>
                <Row>
                  <Col md="12">
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                  <span className="required"> *</span>
                    {arabic.find((item) => item.key_text === 'mdHRTraining.Title')?.[genLabel]}{' '}
                    {/*Access the value property */}
                   
                  </Label>
                    <Input
                      type="text"
                      onChange={handleInputs}
                      value={
                        arb
                        ? trainingDetails && trainingDetails.title_arb
                          ? trainingDetails.title_arb
                          : trainingDetails && trainingDetails.title_arb !== null
                          ? ''
                          : trainingDetails && trainingDetails.title
                        : trainingDetails && trainingDetails.title
                    }
                    name={arb ? 'title_arb' : 'title'}
        
                        
                      />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button
                      className="shadow-none"
                      color="primary"
                      onClick={() => {
                        insertTrainingDetailData();
                      }}
                    >
                      {arb?'حفظ ومتابعة':'Save & Continue'}
                    </Button>
                    <Button
                      onClick={() => {
                        navigate(-1);
                      }}
                      type="button"
                      className="btn btn-dark shadow-none"
                    >
                     {arb?'اذهب إلى القائمة': 'Go to List'}
                    </Button>
                  </div>
                </Row>
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
    </>
  );
};

export default TrainingDetails;

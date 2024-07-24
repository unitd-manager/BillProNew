import React, { useEffect,useState, useContext } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import message from '../../components/Message';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

const PriceListDetails = () => {
  //Navigation and Parameter Constants
  const navigate = useNavigate();

  //Logic for adding Planning in db
  const [planningForms, setPlanningForms] = useState({
    customer_name: '',
    customer_name_arb: '',
  });

  //setting data in PlanningForms
  const handlePlanningForms = (e) => {
    setPlanningForms({ ...planningForms, [e.target.name]: e.target.value });
  };

  const [formSubmitted, setFormSubmitted] = useState(false);
  const { loggedInuser } = useContext(AppContext);
  
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
const selectedLanguage = getSelectedLanguageFromLocalStorage();
const [arabic, setArabic] = useState([]);


  const arb =selectedLanguage === 'Arabic'

  // const eng =selectedLanguage === 'English'
   

  const getTranslationForPriceList = () => {
      api
      .get('/pricelistitem/getTranslationForPriceList')
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

  useEffect(() => {
    getTranslationForPriceList();
  }, []);


  //Api for insertPlanning
  const insertPlanning = () => {
    setFormSubmitted(true);
    if ((arb && planningForms.customer_name_arb.trim() !== '') || (!arb && planningForms.customer_name.trim() !== ''))
   {
      planningForms.creation_date = creationdatetime;
      planningForms.created_by = loggedInuser.first_name;
      api
        .post('/pricelistitem/insertPriceList', planningForms)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          message('Price inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/PriceListEdit/${insertedDataId}?tab=1`);
          }, 300);
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };

  return (
    <div>
      <BreadCrumbs />
      <ToastContainer></ToastContainer>
      <Row>
        <Col md="6">
          <ComponentCard title={arb ? 'التفاصيل الرئيسية': 'Key Details'}>
            <Form>
              <FormGroup>
                <Row>
                  <Col md="12">
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdPriceList.CustomerName')?.[genLabel]}
              </Label><span className='required'>*</span>
                  <Input
                    type="text"
                    onChange={handlePlanningForms}
                    value={
                      arb
                        ? (
                            planningForms && planningForms.customer_name_arb ? planningForms.customer_name_arb :
                            (planningForms && planningForms.customer_name_arb !== null ? '' : planningForms && planningForms.customer_name)
                          )
                        : (planningForms && planningForms.customer_name)
                    }
                    name={arb ? 'customer_name_arb' : 'customer_name'}
                    className={`form-control ${
                      formSubmitted && ((arb && planningForms.customer_name_arb.trim() === '') || (!arb && planningForms.customer_name.trim() === '')) ? 'highlight' : ''
                  }`}
              />
              
              {formSubmitted && ((arb && planningForms && planningForms.customer_name_arb.trim() === '') || (!arb && planningForms.customer_name.trim() === '' ))&& (
                  <div className="error-message">Please Enter</div>
              )}
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button
                      color="primary"
                      onClick={() => {
                        insertPlanning();
                      }}
                      type="button"
                      className="btn mr-2 shadow-none"
                    >
                      Save & Continue
                    </Button>
                    <Button
                      onClick={() => {
                      if (
                        window.confirm(
                          'Are you sure you want to cancel  \n  \n You will lose any changes made',
                        )
                      ) {
                        navigate(-1);
                      }
                    }}
                      type="button"
                      className="btn btn-dark shadow-none"
                    >
                      Cancel
                    </Button>
                  </div>
                </Row>
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
};
export default PriceListDetails;

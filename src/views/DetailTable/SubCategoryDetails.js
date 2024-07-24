import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

const SubCategoryDetails = () => {
  // All state variables
  const [subcategorydetails, setSubCategoryDetails] = useState({
    sub_category_title: '',
    sub_category_title_arb: '',
  });

  // Navigation and Parameter Constants
  const navigate = useNavigate();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const { loggedInuser } = useContext(AppContext);

  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };

  const selectedLanguage = getSelectedLanguageFromLocalStorage();
  //All Functions/Methods

  //Setting Data in ValueList Details
  const handleInputs = (e) => {
    setSubCategoryDetails({ ...subcategorydetails, [e.target.name]: e.target.value });
  };

 
  const [arabic, setArabic] = useState([]);


  const arb =selectedLanguage === 'Arabic'

  // const eng =selectedLanguage === 'English'
  const getTranslationForSubCategory = () => {
    api
    .get('/subcategory/getTranslationForSubCategory')
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
    getTranslationForSubCategory();
  }, []);
 //Api call for insert SubCategory Data
 const insertSubCategoryData = () => {
  setFormSubmitted(true);
  if ((arb && subcategorydetails.sub_category_title_arb.trim() !== '') || (!arb && subcategorydetails.sub_category_title.trim() !== '')) {
    subcategorydetails.created_by = loggedInuser.first_name;
    subcategorydetails.creation_date = creationdatetime;
    api
      .post('/subcategory/insertSubCategory', subcategorydetails)
      .then((res) => {
        const insertedDataId = res.data.data.insertId;
        message('SubCategoryDetails inserted successfully.', 'success');
        setTimeout(() => {
          navigate(`/SubCategoryEdit/${insertedDataId}`);
        }, 300);
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  } else {
    message('Please fill all required fields', 'warning');
  }
};


  return (
    <div>
      <BreadCrumbs />
      <ToastContainer />
      <Row>
        <Col md="6" xs="12">
          {/* Key Details */}
          <ComponentCard title={arb ? 'تفاصيل الفئة الفرعية': 'SubCategory Details'}>
            <Form>
              <FormGroup>
                <Row>
                  <Col md="12">
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdSubCategory.Title')?.[genLabel]}
              </Label><span className='required'>*</span>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            subcategorydetails && subcategorydetails.sub_category_title_arb ? subcategorydetails.sub_category_title_arb :
                            (subcategorydetails && subcategorydetails.sub_category_title_arb !== null ? '' : subcategorydetails && subcategorydetails.sub_category_title)
                          )
                        : (subcategorydetails && subcategorydetails.sub_category_title)
                    }
                    name={arb ? 'sub_category_title_arb' : 'sub_category_title'}
                    className={`form-control ${
                      formSubmitted && ((arb && subcategorydetails.sub_category_title_arb.trim() === '') || (!arb && subcategorydetails.sub_category_title.trim() === '')) ? 'highlight' : ''
                  }`}
              />
              
              {formSubmitted &&((arb && subcategorydetails && subcategorydetails.sub_category_title_arb.trim() === '') || (!arb && subcategorydetails.sub_category_title.trim() === '')) && (
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
                      type="button"
                      className="btn mr-2 shadow-none"
                      onClick={() => {
                        insertSubCategoryData();
                      }}
                    >
                      Save & Continue
                    </Button>
                    {/* <Button
                      type="submit"
                      className="btn btn-dark shadow-none"
                      onClick={(e) => {
                        if (window.confirm('Are you sure you want to cancel? ')) {
                          navigate('/SubCategory');
                        } else {
                          e.preventDefault();
                        }
                      }}
                    >
                      Go to List
                    </Button> */}
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
export default SubCategoryDetails;

import React, { useEffect, useState, useContext} from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import message from '../../components/Message';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

const CategoryDetails = () => {
  //Navigation and Parameter Constants
  const navigate = useNavigate();

  //Logic for adding category in db
  const [categoryForms, setCategoryForms] = useState({
    category_title: '',
    category_title_arb: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const { loggedInuser } = useContext(AppContext);

  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
const selectedLanguage = getSelectedLanguageFromLocalStorage();

  //setting data in categoryForms
  const handleCategoryForms = (e) => {
    setCategoryForms({ ...categoryForms, [e.target.name]: e.target.value });
  };

  const [arabic, setArabic] = useState([]);


  const arb =selectedLanguage === 'Arabic'

  // const eng =selectedLanguage === 'English'
   

  const getTranslationForCategory = () => {
      api
      .get('/category/getTranslationForCategory')
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
    getTranslationForCategory();
  }, []);


  //Api for insertCategory
  const insertCategory = () => {
    setFormSubmitted(true);
    if ((arb && categoryForms.category_title_arb.trim() !== '') || (!arb && categoryForms.category_title.trim() !== ''))
    {
      categoryForms.creation_date = creationdatetime;
      categoryForms.created_by = loggedInuser.first_name;
      api
        .post('/category/insertCategory', categoryForms)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          message('Category inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/CategoryEdit/${insertedDataId}`);
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
                {arabic.find((item) => item.key_text === 'mdCategory.CategoryTitle')?.[genLabel]}
              </Label><span className='required'>*</span>
                  <Input
                    type="text"
                    onChange={handleCategoryForms}
                    value={
                      arb
                        ? (
                            categoryForms && categoryForms.category_title_arb ? categoryForms.category_title_arb :
                            (categoryForms && categoryForms.category_title_arb !== null ? '' : categoryForms && categoryForms.category_title)
                          )
                        : (categoryForms && categoryForms.category_title)
                    }
                    name={arb ? 'category_title_arb' : 'category_title'}
                    className={`form-control ${
                      formSubmitted && ((arb && categoryForms.category_title_arb.trim() === '') || (!arb && categoryForms.category_title.trim() === '')) ? 'highlight' : ''
                  }`}
              />
              
              {formSubmitted && ((arb && categoryForms && categoryForms.category_title_arb.trim() === '') || (!arb && categoryForms.category_title.trim() === '' ))&& (
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
                        insertCategory();
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
export default CategoryDetails;

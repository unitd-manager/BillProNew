import React, {useContext, useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

const ProductDetails = () => {
  //All const variables
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState({
    title: '',
    title_arb: '',
  });
  //setting data in ProductDetails
  const handleInputs = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const [formSubmitted, setFormSubmitted] = useState(false);

  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
   const selectedLanguage = getSelectedLanguageFromLocalStorage();

  //get staff details
  const { loggedInuser } = useContext(AppContext);

  const [arabic, setArabic] = useState([]);


  const arb =selectedLanguage === 'Arabic'

  // const eng =selectedLanguage === 'English'
   

  const getTranslationForProduct = () => {
      api
      .get('/product/getTranslationForProduct')
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
    getTranslationForProduct();
  }, []);
console.log('Title',ProductDetails.title);
  //Insert Product Data
  const insertProductData = (ProductCode, ItemCode) => {
    setFormSubmitted(true);
    if ((arb && productDetails.title_arb.trim() !== '') || (!arb && productDetails.title.trim() !== '')) {
      productDetails.product_code = ProductCode;
      productDetails.item_code = ItemCode;
      productDetails.creation_date = creationdatetime;
      productDetails.created_by= loggedInuser.first_name;   
      api
        .post('/product/insertProduct', productDetails)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          message('Product inserted successfully.', 'success');
          api
          .post('/product/getCodeValue', { type: 'InventoryCode' })
            .then((res1) => {
              const InventoryCode = res1.data.data;
              message('inventory created successfully.', 'success');
              api
              .post('/inventory/insertinventory', { product_id: insertedDataId, inventory_code:InventoryCode, creation_date:creationdatetime, created_by:loggedInuser.first_name  })
            
            .then(() => {
              message('inventory created successfully.', 'success');
            })
            })
            .catch(() => {
              message('Unable to create inventory.', 'error');
            });
          setTimeout(() => {
            navigate(`/ProductEdit/${insertedDataId}?tab=1`);
          }, 300);
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields.', 'warning');
    }
  };


  //Auto generation code
  const generateCode = () => {
    api
      .post('/product/getCodeValue', { type: 'ProductCode' })
      .then((res) => {
        const ProductCode = res.data.data
      api
      .post('/product/getCodeValue', { type: 'ItemCode' })
      .then((response) => {
        const ItemCode = response.data.data
        insertProductData(ProductCode, ItemCode);
      })
      })
      .catch(() => {
        insertProductData('');
      });
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
                {arabic.find((item) => item.key_text === 'mdProduct.ProductName')?.[genLabel]}
              </Label><span className='required'>*</span>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                          productDetails && productDetails.title_arb ? productDetails.title_arb :
                            (productDetails && productDetails.title_arb !== null ? '' : productDetails && productDetails.title)
                          )
                        : (productDetails && productDetails.title)
                    }
                    name={arb ? 'title_arb' : 'title'}
                    className={`form-control ${
                      formSubmitted && ((arb && productDetails.title_arb.trim() === '') || (!arb && productDetails.title.trim() === '')) ? 'highlight' : ''
                  }`}
              />
              
              {formSubmitted && ((arb && productDetails && productDetails.title_arb.trim() === '') || (!arb && productDetails.title.trim() === '' ))&& (
                  <div className="error-message">Please Enter</div>
              )}
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
                        generateCode();
                      }}
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
export default ProductDetails;

import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';
import 'bootstrap/dist/css/bootstrap.min.css';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

const GoodsDeliveryDetails = () => {
  const [enquirycode, setEnquiryCode] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);

  
  //Api call for getting Enquiry dropdown
  const getOrderCode = () => {
    api.get('/goodsdelivery/getOrderCode').then((res) => {
      setEnquiryCode(res.data.data);
    });
  };

  //Logic for adding tender in db
  const [tenderForms, setTenderForms] = useState({
    order_id:'',
    goods_delivery_date:'',
    goods_delivery_code:''
  });

  const handleInputsTenderForms = (e) => {
    setTenderForms({ ...tenderForms, [e.target.name]: e.target.value });
  };

  //const[tenderDetails,setTenderDetails]=useState();
  const getTendersById = () => {
    api
      .post('/goodsdelivery/getgoodsdeliveryById', { goods_delivery_id: id })
      .then((res) => {
        setTenderForms(res.data.data[0]);
        // getContact(res.data.data.company_id);
      })
      .catch(() => {});
  };
  //get staff details
  const { loggedInuser } = useContext(AppContext);

  //console.log(tenderDetails);
  const insertgoodsDelivery = (code) => {
    if (tenderForms.order_id !== '' && tenderForms.goods_delivery_date !== '') {
      tenderForms.goods_delivery_code = code;
      tenderForms.creation_date = creationdatetime;
      tenderForms.created_by = loggedInuser.first_name;
      api
        .post('/goodsdelivery/insertgoodsdelivery', tenderForms)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          const OrderId = tenderForms.order_id;
          getTendersById();
          message('Goods inserted successfully.', 'success');
          //   setTimeout(() => {
          navigate(`/GoodsDeliveryEdit/${insertedDataId}/${OrderId}?tab=1`);
          //   }, 300);
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      setFormSubmitted(true);
      message('Please fill all required fields', 'warning');
    }
  };

 // QUOTE GENERATED CODE
  const generateCode = () => {
    api
      .post('/commonApi/getCodeValue', { type: 'goodsdelivery' })
      .then((res) => {
        insertgoodsDelivery(res.data.data);
      })
      .catch(() => {
        insertgoodsDelivery('');
      });
  };

  useEffect(() => {
    getOrderCode();
  }, [id]);
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
      .get('/goodsdelivery/getTranslationforTradingGoods')
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
    <div>
      <BreadCrumbs />
      <Row>
        <ToastContainer></ToastContainer>
        <Col md="6" xs="12">
          <ComponentCard title={arb ? 'تسليم بضائع جديد' : 'New Goods Delivery'}>
            <Form>
              <FormGroup>
                <Col md="9">
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdTradingGoods.Order Code')?.[genLabel]}{' '}                   
                  </Label>
                  <Input
                    type="select"
                    onChange={handleInputsTenderForms}
                    //value={tenderForms?.order_id || ''}
                    value={
                      arb
                        ? (
                            tenderForms && tenderForms.order_code_arb ? tenderForms.order_code_arb :
                            (tenderForms && tenderForms.order_code_arb !== null ? '' : tenderForms && tenderForms.order_id)
                          )
                        : (tenderForms && tenderForms.order_id)
                    }
                  //name={arb ? 'order_code_arb' : 'order_code'}

                    name="order_id"
                  >
                    <option>Please Select</option>
                    {enquirycode &&
                      enquirycode.map((e) => {
                        return (
                          <option key={e.order_id} value={e.order_id}>
                            {' '}
                            {arb?e.order_code_arb:e.order_code} - {arb?e.company_name_arb:e.company_name}
                          </option> 
                        );
                      })}
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md="9">
                   <Label dir="rtl" style={{ textAlign: 'right' }}>
                  <span className="required"> *</span>
                    {arabic.find((item) => item.key_text === 'mdTradingGoods.Date')?.[genLabel]}{' '}
                    {/*Access the value property */}
                   
                  </Label>

                    <Input
                      type="date"
                      name="goods_delivery_date"
                      value={tenderForms && tenderForms.goods_delivery_date}
                      onChange={handleInputsTenderForms}
                      className={`form-control ${formSubmitted && tenderForms && (tenderForms.goods_delivery_date === undefined || tenderForms.goods_delivery_date.trim() === '')
                          ? 'highlight'
                          : ''
                        }`}
                    />
                    {formSubmitted && tenderForms && (tenderForms.goods_delivery_date === undefined || tenderForms.goods_delivery_date.trim() === '') && (
                      <div className="error-message">Please Select</div>
                    )}
                  </Col>
                </Row>
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
                   {arb?'حفظ ومتابعة': 'Save & Continue'}
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
                   {arb?'يلغي ': 'Cancel'}
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

export default GoodsDeliveryDetails;

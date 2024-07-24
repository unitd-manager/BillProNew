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
  
  //Api call for getting Enquiry dropdown
  const getOrderCode = () => {
    api.get('/projectgoodsdelivery/getOrderCode').then((res) => {
      setEnquiryCode(res.data.data);
    });
  };

  //Logic for adding tender in db
  const [tenderForms, setTenderForms] = useState({
    project_order_id:'',
    project_goods_delivery_date:'',
    project_goods_delivery_code:''
  });

  const handleInputsTenderForms = (e) => {
    setTenderForms({ ...tenderForms, [e.target.name]: e.target.value });
  };

  //const[tenderDetails,setTenderDetails]=useState();

  //get staff details
  const { loggedInuser } = useContext(AppContext);

  //console.log(tenderDetails);
  const insertgoodsDelivery = (code) => {
    
      tenderForms.project_goods_delivery_code = code;
      tenderForms.creation_date = creationdatetime;
      tenderForms.created_by = loggedInuser.first_name;
      api
        .post('/projectgoodsdelivery/insertgoodsdelivery', tenderForms)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          const OrderId = tenderForms.project_order_id;
          console.log('orderId',OrderId);
          message('Goods inserted successfully.', 'success');
          //   setTimeout(() => {
          navigate(`/ProjectGoodsDeliveryEdit/${insertedDataId}/${OrderId}?tab=1`);
          //   }, 300);
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    
  };

 // QUOTE GENERATED CODE
  const generateCode = () => {
    api
      .post('/tender/getCodeValue', { type: 'projectgoodsdelivery' })
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
                    {/*Access the value property */}  
                  </Label>
                  <Input
                    type="select"
                    onChange={(e) => {
                      setTenderForms({ ...tenderForms, project_order_id: e.target.value });
                      handleInputsTenderForms(e);
                    }}
                    value={tenderForms?.project_order_id || ''}
                    name="project_order_id"
                  >
                    <option>Please Select</option>
                    {enquirycode &&
                      enquirycode.map((e) => {
                        return (
                          <option key={e.project_order_id} value={e.project_order_id}>
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
                    onChange={handleInputsTenderForms}
                    value={
                      arb
                        ? tenderForms && tenderForms.project_goods_delivery_date_arb
                          ? tenderForms.project_goods_delivery_datearb
                          : tenderForms && tenderForms.project_goods_delivery_date_arb !== null
                          ? ''
                          : tenderForms && tenderForms.project_goods_delivery_date
                        : tenderForms && tenderForms.project_goods_delivery_date
                    }
                    name={arb ? 'project_goods_delivery_date_arb' : 'project_goods_delivery_date'}
                  ></Input>
                   
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

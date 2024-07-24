import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import creationdatetime from '../../constants/creationdatetime';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import AppContext from '../../context/AppContext';
import message from '../../components/Message';

const GoodsReceiptDetails = () => {
  //all state variables
  const [goodsreceiptforms, setGoodsReceiptForms] = useState({
    goods_received_date: '',
    purchase_order_id: '',
  });
  const [purchaseorderdetails, setPurchaseOrderDetails] = useState();
  //navigation and params
  const navigate = useNavigate();
  //supplierData in supplier details
  const handleInputs = (e) => {
    setGoodsReceiptForms({ ...goodsreceiptforms, [e.target.name]: e.target.value });
  };
   //get staff details
   const { loggedInuser } = useContext(AppContext);

   const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
  const selectedLanguage = getSelectedLanguageFromLocalStorage();
  //inserting supplier data
  const insertGoodsReceipt = () => {
    if (goodsreceiptforms.purchase_order_id !== '' &&
    goodsreceiptforms.goods_received_date !== ''
    )
    {
    goodsreceiptforms.creation_date = creationdatetime;
    goodsreceiptforms.created_by= loggedInuser.first_name;

      api.post('/goodsreceipt/insertGoodsReceipt', goodsreceiptforms)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          message('Goods Receipt inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/GoodsReceiptEdit/${insertedDataId}`);
          }, 300);
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    }
    else {
      message('Please fill all required fields.', 'error');
    }
};
    const getPoCode = () => {
        api
          .get('/goodsreceipt/getPoCode')
          .then((res) => {
            setPurchaseOrderDetails(res.data.data);
            console.log(res.data.data[0]);
          })
          .catch(() => {
            message('Company not found', 'info');
          });
      };


      const [arabic, setArabic] = useState([]);


      const arb =selectedLanguage === 'Arabic'
    
      //const eng =selectedLanguage === 'English'
      
    
      const getArabicCompanyName = () => {
          api
          .get('/goodsreceipt/getTranslationForGoodsReceipt')
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
    getPoCode();
    getArabicCompanyName();
     }, []);
    return (
    <div>
       <BreadCrumbs />
      <ToastContainer />
      <Row>
        <Col md="6" xs="12">
          {/* Key Details */}
          <ComponentCard title={arb ?'التفاصيل الرئيسية':'Key Details'}>
          <Form>
              <FormGroup>
                <Row>
                  <Col md="12">
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdGoodsReceipt.PO Code')?.[genLabel]}
                      {' '}
                        <span className="required"> *</span>{' '}
                    </Label>
                    <Input
                          type="select"
                          onChange={handleInputs}
                          value={goodsreceiptforms && goodsreceiptforms.purchase_order_id}
                          name="purchase_order_id"
                        >
                          <option defaultValue="selected">{arb ?'الرجاء التحديد':'Please Select'}</option>
                          {purchaseorderdetails &&
                            purchaseorderdetails.map((e) => {
                              return (
                                <option key={e.purchase_order_id} value={e.purchase_order_id}>
                                  {arb?e.po_code_arb:e.po_code}{' '}
                                </option>
                              );
                            })}
                        </Input>
                    </Col>

                    <Col md="12">
                      <FormGroup>
                      <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdGoodsReceipt.Goods Received Date')?.[genLabel]}<span className="required"> *</span>{' '}</Label>
                        <Input
                          type="date"
                          onChange={handleInputs}
                          value={moment(goodsreceiptforms && goodsreceiptforms.goods_received_date).format('YYYY-MM-DD')}
                          name="goods_received_date"
                        />
                      </FormGroup>
                    </Col>

                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
          <div className="pt-3 mt-3 d-flex align-items-center gap-2">
            <Button color="primary"
              onClick={() => {
                insertGoodsReceipt();
              }}
              type="button"
              className="btn mr-2 shadow-none"  >
              Save & Continue
            </Button>
            <Button
              onClick={() => {
                navigate('/GoodsReceived')
              }}
              type="button"
              className="btn btn-dark shadow-none" >
              Go to List
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

export default GoodsReceiptDetails;

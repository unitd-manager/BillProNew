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

const PurchaseInvoiceDetails = () => {
  //all state variables
  const [purchaseinvoicedetails, setPurchaseInvoiceDetails] = useState({
    purchase_order_id: '',
    purchase_invoice_date: '',
  });
  const [purchaseorder, setPurchaseOrder] = useState();
  const [purchaseorderdetails, setPurchaseOrderDetails] = useState();
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };

  const selectedLanguage = getSelectedLanguageFromLocalStorage();
  const [arabic, setArabic] = useState([]);


  const arb =selectedLanguage === 'Arabic'

  const getArabicCompanyName = () => {
    api
    .get('/purchaseinvoice/getTranslationForPurchaseInvoiceList')
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
  //navigation and params
  const navigate = useNavigate();
  //supplierData in supplier details
  const handleInputs = (e) => {
    setPurchaseInvoiceDetails({ ...purchaseinvoicedetails, [e.target.name]: e.target.value });
  };
   //get staff details
   const { loggedInuser } = useContext(AppContext);
  //inserting supplier data
  const insertPurchaseInvoice = (PurchaseInvoiceCode) => {
    if (purchaseinvoicedetails.purchase_order_id !== '' &&
    purchaseinvoicedetails.purchase_invoice_date!=='') 
      {
        purchaseinvoicedetails.purchase_invoice_code = PurchaseInvoiceCode;
        purchaseinvoicedetails.creation_date = creationdatetime;
        purchaseinvoicedetails.created_by= loggedInuser.first_name;
        purchaseinvoicedetails.supplier_id= purchaseorderdetails.supplier_id; 
        purchaseinvoicedetails.project_id = purchaseorderdetails.project_id;   
      api
        .post('/purchaseinvoice/insertPurchaseInvoice', purchaseinvoicedetails)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          message('Product inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/PurchaseInvoiceEdit/${insertedDataId}`);
          }, 300);
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields.', 'warning');
    }
  };
    
const getPoCode = () => {
        api
          .get('/purchaseinvoice/getPoCode')
          .then((res) => {
            setPurchaseOrder(res.data.data);
            console.log(res.data.data[0]);
          })
          .catch(() => {
            message('Company not found', 'info');
          });
      };

  // Get Purchase Order data By Purchase Order Id
  const getPurchaseOrderById = () => {
    api
      .post('/purchaseinvoice/getPurchaseOrderById', { purchase_order_id: purchaseinvoicedetails.purchase_order_id })
      .then((res) => {
        setPurchaseOrderDetails(res.data.data[0]);
        console.log(res.data.data[0]);
      })
  };

   //Auto generation code
   const generateCode = () => {
    api
      .post('/purchaseinvoice/getCodeValue', { type: 'PurchaseInvoiceCode' })
      .then((res) => {
        const PurchaseInvoiceCode = res.data.data
        insertPurchaseInvoice(PurchaseInvoiceCode);
      })
      .catch(() => {
        insertPurchaseInvoice('');
      });
  };

  useEffect(() => {
    getPurchaseOrderById(purchaseinvoicedetails.purchase_order_id);
    getPoCode();
    getArabicCompanyName();
  }, [ purchaseinvoicedetails.purchase_order_id],[]);

    
   return (
    <div>
      <BreadCrumbs />
      <ToastContainer />
      <Row>
        <Col md="6" xs="12">
          {/* Key Details */}
          <ComponentCard title="Key Details">
          <Form>
              <FormGroup>
                <Row>
                  <Col md="12">
                    {/* <Label>
                      {' '}
                       PO Code <span className="required"> *</span>{' '}
                    </Label> */}
                    <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdPurchaseInvoice.PO Code')?.[genLabel]}
              </Label>
                    <Input
                          type="select"
                          onChange={handleInputs}
                          value={purchaseinvoicedetails && purchaseinvoicedetails.purchase_order_id}
                          name="purchase_order_id"
                        >
                          <option defaultValue="selected">Please Select</option>
                          {purchaseorder &&
                            purchaseorder.map((e) => {
                              return (
                                <option key={e.purchase_order_id} value={e.purchase_order_id}>
                                  {e.po_code}
                                </option>
                              );
                            })}
                        </Input>
                    </Col>

                    <Col md="12">
                      <FormGroup>
                      <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdPurchaseInvoice.Invoice Date')?.[genLabel]}
              </Label>
                       
                        <Input
                          type="date"
                          onChange={handleInputs}
                          value={moment(purchaseinvoicedetails && purchaseinvoicedetails.purchase_invoice_date).format('YYYY-MM-DD')}
                          name="purchase_invoice_date"
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
                generateCode();
              }}
              type="button"
              className="btn mr-2 shadow-none"  >
              Save & Continue
            </Button>
            <Button
              onClick={() => {
                navigate('/PurchaseInvoice')
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

export default PurchaseInvoiceDetails;

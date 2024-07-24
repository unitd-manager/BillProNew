import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';
import AppContext from '../../context/AppContext';
import creationdatetime from '../../constants/creationdatetime';

const PurchaseOrderDetails = () => {
  //All state variables
  const [supplier, setSupplier] = useState();
  const [purchaseForms, setPurchaseForms] = useState({
    supplier_id: '',
    company_name: '',
  });
  const { loggedInuser } = useContext(AppContext);
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };

  const selectedLanguage = getSelectedLanguageFromLocalStorage();
  const [arabic, setArabic] = useState([]);


  const arb =selectedLanguage === 'Arabic'

  const getArabicValue= () => {
    api
    .get('/purchaseorder/getTranslationForPurchaseOrder')
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
  const editPurchaseById = () => {
    api
      .get('/purchaseorder/getSupplier')
      .then((res) => {
        setSupplier(res.data.data);
      })
      .catch(() => {});
  };
  //PurchaseOrder data in PurchaseOrderDetails
  const handleInputs = (e) => {
    setPurchaseForms({ ...purchaseForms, [e.target.name]: e.target.value });
  };
  
   //inserting data of Purchase Order
   const insertPurchaseOrder = (code) => {
    purchaseForms.purchase_order_date = moment();
    purchaseForms.po_code=code;
    purchaseForms.creation_date = creationdatetime;
    purchaseForms.created_by = loggedInuser.first_name;
    if (purchaseForms.supplier_id !== '') {
      api
        .post('/purchaseorder/insertPurchaseOrder', purchaseForms)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          message('Purchase Order inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/PurchaseOrderEdit/${insertedDataId}?tab=1`);
          }, 500);
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields.', 'warning');
    }
  };

  const generateCode = () => {
    api
      .post('/commonApi/getCodeValue', { type: 'purchaseOrder' })
      .then((res) => {
        insertPurchaseOrder(res.data.data);
      })
      .catch(() => {
        insertPurchaseOrder('');
      });
  };

  useEffect(() => {
    editPurchaseById();
    getArabicValue();
  }, [id]);
  return (
    <div>
      <BreadCrumbs />
    
        <ToastContainer></ToastContainer>
        <Row>
        <Col md="6">
          <ComponentCard title="Purchase Order Details">
            <Form>
              <FormGroup>
                <Row>
                <Col md="12">
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdPurchaseOrder.Supplier Name')?.[genLabel]}
              </Label><span className='required'>*</span>
         
                  <Input
                    type="select"
                    name="supplier_id"
                    onChange={(e) => {
                      handleInputs(e);
                    }}
                  >
                    <option value="" selected>
                      Please Select
                    </option>
                    {supplier &&
                      supplier.map((ele) => {
                        return (
                          <option key={ele.supplier_id} value={ele.supplier_id}>
                           {arb?ele.company_name_arb :ele.company_name}{' '}
                          </option>
                        );
                      })}


                </Input>
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
                          generateCode();
                        }}
                      >
                        Save & Continue
                      </Button>
                      <Button
                        onClick={() => {
                          navigate('/PurchaseOrder');
                        }}
                        type="button"
                        className="btn btn-dark shadow-none"
                      >
                       Go to List
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
export default PurchaseOrderDetails;

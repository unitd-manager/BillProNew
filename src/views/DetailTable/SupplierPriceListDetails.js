import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate, useParams  } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import message from '../../components/Message';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

const SupplierPriceListDetails = () => {
  //Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();
  const { loggedInuser } = useContext(AppContext);

  //Logic for adding Planning in db
  const [planningForms, setPlanningForms] = useState({
    customer_name: '',
  });
  const [valuelistname, setValueListName] = useState();

//Api call for getting Valuelist dropdown
const getValueListName = () => {
  api
    .get('/supplier/getSupplier')
    .then((res) => {
      setValueListName(res.data.data);
    })
    .catch(() => {
      message('Unable to edit record.', 'error');
    });
};
const [arabic, setArabic] = useState([]);

  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  const selectedLanguage = getSelectedLanguageFromLocalStorage();
  const arb =selectedLanguage === 'Arabic'

  //const eng =selectedLanguage === 'English'
  

  const getArabicCompanyName = () => {
      api
      .get('/translation/getTranslationForSupplierPriceList')
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
  
    getArabicCompanyName();
  }, []);
  //setting data in PlanningForms
  const handlePlanningForms = (e) => {
    setPlanningForms({ ...planningForms, [e.target.name]: e.target.value });
  };

  //Api for insertPlanning
  const insertPlanning = () => {
    if (planningForms.supplier_id !== '' && planningForms.supplier_id  ) {
      planningForms.creation_date = creationdatetime;
      planningForms.created_by= loggedInuser.first_name;
      api
        .post('/supplierpricelistitem/insertPriceList', planningForms)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          message('Price inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/SupplierPriceListEdit/${insertedDataId}?tab=1`);
          }, 300);
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };

  
  useEffect(() => {
    getValueListName();
  }, [id]);

  return (
    <div>
      <BreadCrumbs />
      <ToastContainer></ToastContainer>
      <Row>
        <Col md="6">
          <ComponentCard title={arb?'التفاصيل الرئيسية':'Key Details'}>
            <Form>
            <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>
                     {arabic.find((item) => item.key_text === 'mdSupplierPriceList.SupplierListName')?.[genLabel]} <span className="required"> *</span>
                    </Label>
                    <Input
                      type="select"
                      name="supplier_id"
                      onChange={handlePlanningForms}
                      value={planningForms && planningForms.supplier_id}
                    >
                      <option defaultValue="selected">Please Select</option>
                      {valuelistname &&
                        valuelistname.map((ele) => {
                          return (
                            <option key={ele.supplier_id} value={ele.supplier_id}>
                              {ele.company_name}
                            </option>
                          );
                        })}
                    </Input>
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
                     {arb ?'حفظ ومتابعة':'Save & Continue'}
                    </Button>
                    <Button
                      onClick={() => {
                        navigate(-1);
                      }}
                      type="button"
                      className="btn btn-dark shadow-none"
                    >
                        {arb ?'اذهب إلى القائمة':' Go to List'}
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
export default SupplierPriceListDetails;

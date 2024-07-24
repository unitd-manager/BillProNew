import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import creationdatetime from '../../constants/creationdatetime';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import AppContext from '../../context/AppContext';
import message from '../../components/Message';

const SupplierDetails = () => {
  //all state variables
  const [supplierForms, setSupplierForms] = useState({
    company_name: '',
  });
  //navigation and params
  const navigate = useNavigate();
  //supplierData in supplier details
  const handleInputsSupplierForms = (e) => {
    setSupplierForms({ ...supplierForms, [e.target.name]: e.target.value });
  };
   //get staff details
   const { loggedInuser } = useContext(AppContext);
  //inserting supplier data
  const insertSupplier = () => {
    supplierForms.creation_date = creationdatetime;
    supplierForms.created_by= loggedInuser.first_name;
    if (supplierForms.company_name !== '')
      api.post('/supplier/insert-Supplier', supplierForms)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          message('Supplier inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/SupplierEdit/${insertedDataId}?tab=1`);
          }, 300);
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    else {
      message('Please fill all required fields.', 'warning');
    }
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
      .get('/translation/getTranslationForSupplier')
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
  useEffect(() => {}, []);
  return (
    <div>
       <BreadCrumbs />
      <ToastContainer />
      <Row>
        <Col md="6" xs="12">
          {/* Key Details */}
          <ComponentCard title="Supplier Name">
          <Form>
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>
                      {' '}
                      {arabic.find((item) => item.key_text === 'mdSupplier.SupplierName')?.[genLabel]} <span className="required"> *</span>{' '}
                    </Label>
                    <Input type="text" name="company_name" onChange={handleInputsSupplierForms} />
                    </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
          <div className="pt-3 mt-3 d-flex align-items-center gap-2">
            <Button color="primary"
              onClick={() => {
                insertSupplier();
              }}
              type="button"
              className="btn mr-2 shadow-none"  >
                {arb ?'حفظ ومتابعة':'Save & Continue'}
              
            </Button>
            <Button
              onClick={() => {
                navigate('/Supplier')
              }}
              type="button"
              className="btn btn-dark shadow-none" >
             
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

export default SupplierDetails;

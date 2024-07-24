import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';
import api from '../../constants/api'; 

export default function TrainingCompany({ trainingDetails, handleInputs }) {
  TrainingCompany.propTypes = {
    trainingDetails: PropTypes.object,
    handleInputs: PropTypes.func,
  };
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
      .get('/training/getTranslationforHRTraining')
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
    <Form>
      <FormGroup>
        <ComponentCard title={arb? 'تفاصيل شركة التدريب ':"Training Company details"}>
          <Row>
            <Col md="3">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdHRTraining.Training Company Name')?.[genLabel]}{' '}
                    </Label>               
                     <Input
                  type="text"
                  onChange={handleInputs}
                  value={
                  arb
                ? trainingDetails && trainingDetails.training_company_name_arb
                  ? trainingDetails.training_company_name_arb
                  : trainingDetails && trainingDetails.training_company_name_arb !== null
                  ? ''
                  : trainingDetails && trainingDetails.training_company_name
                : trainingDetails && trainingDetails.training_company_name
            }
            name={arb ? 'training_company_name_arb' : 'training_company_name'}

                
              />
                 
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdHRTraining.Training Company address')?.[genLabel]}{' '}
                    </Label>                            
                        <Input
                  type="text"
                  onChange={handleInputs}
                  value={
                  arb
                ? trainingDetails && trainingDetails.training_company_address_arb
                  ? trainingDetails.training_company_address_arb
                  : trainingDetails && trainingDetails.training_company_address_arb !== null
                  ? ''
                  : trainingDetails && trainingDetails.training_company_address
                : trainingDetails && trainingDetails.training_company_address
            }
            name={arb ? 'training_company_address_arb' : 'training_company_address'}

                
              />
           </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdHRTraining.Training Company email')?.[genLabel]}{' '}
                    </Label>                            
                             <Input
                  type="text"
                  onChange={handleInputs}
                  value={
                  arb
                  ? trainingDetails && trainingDetails.training_company_email_arb
                    ? trainingDetails.training_company_email_arb
                    : trainingDetails && trainingDetails.training_company_email_arb !== null
                    ? ''
                    : trainingDetails && trainingDetails.training_company_email
                  : trainingDetails && trainingDetails.training_company_email
              }
              name={arb ? 'training_company_email_arb' : 'training_company_email'}
  
                  
                />
                              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdHRTraining.Training Company phone')?.[genLabel]}{' '}
                    </Label>                
                    <Input
                  type="text"
                  pattern="\d{10}"
                  onChange={handleInputs}
                  value={
                    arb
                    ? trainingDetails && trainingDetails.training_company_phone_arb
                      ? trainingDetails.training_company_phone_arb
                      : trainingDetails && trainingDetails.training_company_phone_arb !== null
                      ? ''
                      : trainingDetails && trainingDetails.training_company_phone
                    : trainingDetails && trainingDetails.training_company_phone
                }
                name={arb ? 'training_company_phone_arb' : 'training_company_phone'}
    
                    
                  />
              </FormGroup>
            </Col>
          </Row>
        </ComponentCard>
      </FormGroup>
    </Form>
  );
}

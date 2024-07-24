import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import ComponentCard from '../ComponentCard';
import api from '../../constants/api'; 

export default function TrainingMainDetails({ trainingDetails, handleInputs }) {
  TrainingMainDetails.propTypes = {
    trainingDetails: PropTypes.object,
    handleInputs: PropTypes.func,
    // arb: PropTypes.any,
    // arabic: PropTypes.any,

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
    <ComponentCard title={arb? 'التفاصيل الرئيسية':"Main Details"} creationModificationDate={trainingDetails}>
      <Form>
        <Row>
          <Col md="4"> 
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdHRTraining.Title')?.[genLabel]}{' '}                   
             </Label><span className='required'>*</span>
              <Input
                type="text"
                onChange={handleInputs}
                value={
                arb
                ? trainingDetails && trainingDetails.title_arb
                  ? trainingDetails.title_arb
                  : trainingDetails && trainingDetails.title_arb !== null
                  ? ''
                  : trainingDetails && trainingDetails.title
                : trainingDetails && trainingDetails.title
            }
            name={arb ? 'title_arb' : 'title'}

                
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdHRTraining.From Date')?.[genLabel]}{' '}                   
              </Label>
              <span className='required'>*</span>
              <Input
                type="date"
                onChange={handleInputs}
                value={
                arb
                ? trainingDetails && trainingDetails.from_date_arb
                  ? trainingDetails.from_date_arb
                  : trainingDetails && trainingDetails.from_date_arb !== null
                  ? ''
                  : trainingDetails && trainingDetails.from_date
                : trainingDetails && trainingDetails.from_date
            }
            name={arb ? 'from_date_arb' : 'from_date'}
             />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdHRTraining.To Date')?.[genLabel]}{' '}                   
              </Label> 
              <span className='required'>*</span>             
              <Input
                type="date"
                onChange={handleInputs}
                min={moment(trainingDetails && trainingDetails.from_date).format('YYYY-MM-DD')}
                value={               
                   arb
                ? trainingDetails && trainingDetails.to_date_arb
                  ? trainingDetails.to_date_arb
                  : trainingDetails && trainingDetails.to_date_arb !== null
                  ? ''
                  : trainingDetails && trainingDetails.to_date
                : trainingDetails && trainingDetails.to_date
            }
            name={arb ? 'to_date_arb' : 'to_date'}
             />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdHRTraining.Trainer')?.[genLabel]}{' '}                   
              </Label>              
                          <Input
                type="text"
                onChange={handleInputs}
                value={
                arb
                ? trainingDetails && trainingDetails.trainer_arb
                  ? trainingDetails.trainer_arb
                  : trainingDetails && trainingDetails.trainer_arb !== null
                  ? ''
                  : trainingDetails && trainingDetails.trainer
                : trainingDetails && trainingDetails.trainer
            }
            name={arb ? 'trainer_arb' : 'trainer'}
             />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdHRTraining.Description')?.[genLabel]}{' '}                   
              </Label>              
                          <Input
                type="text"
                onChange={handleInputs}
                value={
                arb
                ? trainingDetails && trainingDetails.description_arb
                  ? trainingDetails.description_arb
                  : trainingDetails && trainingDetails.description_arb !== null
                  ? ''
                  : trainingDetails && trainingDetails.description
                : trainingDetails && trainingDetails.description
            }
            name={arb ? 'description_arb' : 'description'}
             />
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </ComponentCard>
  );
}

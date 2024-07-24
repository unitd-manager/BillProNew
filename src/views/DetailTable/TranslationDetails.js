import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';

const TranslationDetails = () => {
  //All state variables
  const [settingforms, setSettingForms] = useState({
    key_text: '',
  });
//Navigation and Parameters
  const navigate = useNavigate();
//Setting data in settingForms
  const handleInputsSettingForms = (e) => {
    setSettingForms({ ...settingforms, [e.target.name]: e.target.value });
  };
//Insert Setting
  const insertSetting = () => {
    if (settingforms.key_text !== '')
    api.post('/translation/insertTranslation', settingforms)
      .then((res) => {
        const insertedDataId = res.data.data.insertId;
        console.log(insertedDataId);
        message('Translation inserted successfully.', 'success');
        setTimeout(() => {
          navigate(`/TranslationEdit/${insertedDataId}`);
        }, 300);
      })
      .catch(() => {
        message('Network connection error.', 'error');
      });
      else {
        message('Please fill all required fields.', 'error');
      }
  };
  useEffect(() => {}, []);
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
                    <Label>
                      {' '}
                      Key Text <span className="required"> *</span>{' '}
                    </Label>
                    <Input type="text" name="key_text" onChange={handleInputsSettingForms} />
                    </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
          <div className="pt-3 mt-3 d-flex align-items-center gap-2">
            <Button color="primary"
              onClick={() => {
                insertSetting();
              }}
              type="button"
              className="btn mr-2 shadow-none"
            >Save & Continue
            </Button>
            <Button
              onClick={() => {
                navigate('/Translation');
              }}
              type="button"
              className="btn btn-dark shadow-none" 
            >Go to List
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

export default TranslationDetails;

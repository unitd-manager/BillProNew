import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import moment from 'moment';
import ComponentCard from '../ComponentCard';
import ComponentCardV2 from '../ComponentCardV2';
import PdfEmployeeContract from '../PDF/PdfEmployeeContract';
import PdfKET from '../PDF/PdfKET';
import api from '../../constants/api';

export default function Jobinformationedit({
  handleInputsJobInformation,
  job,
  insertJobInformation,
  id,
}) {
  Jobinformationedit.propTypes = {
    handleInputsJobInformation: PropTypes.any,
    insertJobInformation: PropTypes.any,
    id: PropTypes.any,
    job: PropTypes.any,
  };
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };

  const selectedLanguage = getSelectedLanguageFromLocalStorage();
  const [arabic, setArabic] = useState([]);

  const arb = selectedLanguage === 'Arabic';

  const getArabicLabels = () => {
    api
      .get('/translation/getTranslationForJobInformation')
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
    getArabicLabels();
  }, []);
  return (
    <>
      <ComponentCardV2>
        <Row>
          <Col>
            <PdfEmployeeContract job={job}></PdfEmployeeContract>
          </Col>
          <Col>
            {/* Include PdfKET component here */}
            <PdfKET lang="arabic" />
          </Col>
          <Col>
            <Button className="shadow-none" onClick={() => insertJobInformation(id)} color="dark">
              Duplicate
            </Button>
          </Col>
        </Row>
      </ComponentCardV2>
      <ComponentCard title="Details of Employment (KET)" creationModificationDate={job}>
        <ToastContainer></ToastContainer>
        <br />
        <FormGroup>
          <Row>
            <Col md="6">
              <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                <span className="required"> *</span>{' '}
                  {
                    arabic.find(
                      (item) =>
                        item.key_text === 'mdJobInformation.Employment Start/Commencement Date ',
                    )?.[genLabel]
                  }
                  
                </Label>

                <Input
                  type="date"
                  onChange={handleInputsJobInformation}
                  value={job && moment(job.act_join_date).format('YYYY-MM-DD')}
                  name="act_join_date"
                />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                  {
                    arabic.find(
                      (item) => item.key_text === 'mdJobInformation.Duties & Responsibility',
                    )?.[genLabel]
                  }
                </Label>

                <Input
                  type="text"
                  onChange={handleInputsJobInformation}
                  value={
                    arb
                      ? job && job.duty_responsibility_arb
                      : job && job.duty_responsibility
                  }
                  name={arb ? 'duty_responsibility_arb' : 'duty_responsibility'}
                />
                 
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                  {
                    arabic.find(
                      (item) =>
                        item.key_text ===
                        'mdJobInformation.Duration of Employment(only for employees on fixed term contract)',
                    )?.[genLabel]
                  }
                </Label>

                <Input
                  type="text"
                  onChange={handleInputsJobInformation}
                  value={job && job.duration_of_employment}
                  name="duration_of_employment"
                />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                  {
                    arabic.find(
                      (item) =>
                        item.key_text ===
                        'mdJobInformation.Place of Work(if different from companys registered address)',
                    )?.[genLabel]
                  }
                </Label>

                <Input
                  type="text"
                  onChange={handleInputsJobInformation}
                  value={
                    arb
                      ? job && job.place_of_work_arb
                      : job && job.place_of_work
                  }
                  name={arb ? 'place_of_work_arb' : 'place_of_work'}
                />
              </FormGroup>
            </Col>
          </Row>
        </FormGroup>
      </ComponentCard>
    </>
  );
}

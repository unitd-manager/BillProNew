import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import moment from 'moment';

export default function JobInformationKeyDetails({ handleInputs, jobModal, arabic, arb }) {
  JobInformationKeyDetails.propTypes = {
    handleInputs: PropTypes.object,
    jobModal: PropTypes.object,
    arabic: PropTypes.any,
    arb: PropTypes.any,

  };
  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }
  return (
 <>
       <ToastContainer></ToastContainer>
      <FormGroup>
        <Row>
          <Col md="3">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobInformation.Employment Start/Commencement Date ')?.[genLabel]}
              </Label>
             
              <Input
                type="date"
                onChange={handleInputs}
                value={jobModal && moment(jobModal.act_join_date).format('YYYY-MM-DD')}
                name="act_join_date"
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobInformation.Duties & Responsibility')?.[genLabel]}
              </Label>
             
              <Input
                type="text"
                onChange={handleInputs}
                value={jobModal && jobModal.duty_responsibility}
                name="duty_responsibility"
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobInformation.Duration of Employment(only for employees on fixed term contract)')?.[genLabel]}
              </Label>
             
              <Input
                type="text"
                onChange={handleInputs}
                value={jobModal && jobModal.duration_of_employment}
                name="duration_of_employment"
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobInformation.Place of Work(if different from companys registered address)')?.[genLabel]}
              </Label>
             
              <Input
                type="text"
                onChange={handleInputs}
                value={jobModal && jobModal.place_of_work}
                name="place_of_work"
              />
            </FormGroup>
          </Col>
        </Row>
      </FormGroup>
    </>
  );
}

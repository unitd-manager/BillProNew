import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import moment from 'moment';

export default function JobTermination({ handleInputsJobInformation, job, arabic, arb }) {
  JobTermination.propTypes = {
    handleInputsJobInformation: PropTypes.any,
    job: PropTypes.any,
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
      <FormGroup>
        <Row>
          <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobInformation.Notice Period for Termination')?.[genLabel]}
              </Label>
            
              <Input
                type="textarea"
                onChange={handleInputsJobInformation}
                 value={
                  arb
                    ? job && job.notice_period_for_termination_arb
                    : job && job.notice_period_for_termination
                }
                name={arb ? 'notice_period_for_termination_arb' : 'notice_period_for_termination'}
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobInformation.Date of Resignation Notice')?.[genLabel]}
              </Label>
           
              <Input
                type="date"
                onChange={handleInputsJobInformation}
                value={job && moment(job.resignation_notice_date).format('YYYY-MM-DD')}
                name="resignation_notice_date"
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobInformation.Termination/Cessation Date')?.[genLabel]}
              </Label>
            
              <Input
                type="date"
                onChange={handleInputsJobInformation}
                value={job && moment(job.termination_date).format('YYYY-MM-DD')}
                name="termination_date"
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobInformation.Reason for Termination')?.[genLabel]}
              </Label>
            
              <Input
                type="textarea"
                onChange={handleInputsJobInformation}
                value={
                  arb
                    ? job && job.termination_reason_arb
                    : job && job.termination_reason
                }
                name={arb ? 'termination_reason_arb' : 'termination_reason'}
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobInformation.Departure Date')?.[genLabel]}
              </Label>
          
              <Input
                type="date"
                onChange={handleInputsJobInformation}
                value={job && moment(job.departure_date).format('YYYY-MM-DD')}
                name="departure_date"
              />
            </FormGroup>
          </Col>
        </Row>
      </FormGroup>
  );
}

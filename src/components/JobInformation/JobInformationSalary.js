import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';

export default function JobProbation({
  handleInputsJobInformation,
  job,
  handleRadioGst,
  arb,
  arabic
  
  // overTimeRate,
}) {
  JobProbation.propTypes = {
    handleInputsJobInformation: PropTypes.any,
    job: PropTypes.any,
    handleRadioGst: PropTypes.any,
    arb: PropTypes.any,
    arabic: PropTypes.any,
    // overTimeRate: PropTypes.any,
  };

  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }
  return (
    <>
      <FormGroup>
        <Row>
          <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobInformation.Salary Period')?.[genLabel]}
              </Label>
             
              <Input
                type="select"
                value={job && job.payment_type}
                name="payment_type"
                onChange={handleInputsJobInformation}
              >
                <option defaultValue="selected">Please Select</option>
                <option value="monthly">Monthly</option>
                <option value="fortnightly">Fort Nightly</option>
                <option value="weekly">Weekly</option>
                <option value="daily">Daily</option>
                <option value="hourly">Hourly</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobInformation.Date(s) of Salary Payment')?.[genLabel]}
              </Label>
              
              <Input
                type="date"
                onChange={handleInputsJobInformation}
                value={job && job.salary_payment_dates}
                name="salary_payment_dates"
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobInformation.Date(s) of Overtime Payment (if different)')?.[genLabel]}
              </Label>
             
              <Input
                type="date"
                onChange={handleInputsJobInformation}
             

                value={
                  arb
                    ? job && job.overtime_payment_dates_arb
                    : job && job.overtime_payment_dates
                }
                name={arb ? 'overtime_payment_dates_arb' : 'overtime_payment_dates'}
            
              />
            </FormGroup>
          </Col>
{job&&job.payment_type ==="hourly"&& <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {' '}
                {arabic.find((item) => item.key_text === 'mdJobInformation.Hourly Pay')?.[genLabel]} <span className="required"> *</span>{' '}
              </Label>
              <Input
                type="numbers"
                onChange={(e) => {
                  handleInputsJobInformation(e);
                  handleRadioGst(job.over_time_rate, e.target.value, job.overtime);
                }}
                value={job && job.hourly_pay}
                name="hourly_pay"
              />
            </FormGroup>
          </Col> }
          <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {' '} <span className="required"> *</span>{' '}
                {arabic.find((item) => item.key_text === 'mdJobInformation.Working Calendar(No of Days/Week)(KET)')?.[genLabel]}
              </Label>
             
              <Input
                type="select"
                value={job && job.working_days}
                name="working_days"
                onChange={handleInputsJobInformation}
              >
                <option defaultValue="selected">Please Select</option>
                <option value="5">5</option>
                <option value="5.5">5.5</option>
                <option value="6">6</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {' '} <span className="required"> *</span>{' '}
                {arabic.find((item) => item.key_text === 'mdJobInformation.Basic Pay')?.[genLabel]}
              </Label>
             
              <Input
                type="numbers"
                onChange={(e) => {
                  handleInputsJobInformation(e);
                  handleRadioGst(job.over_time_rate, e.target.value, job.overtime);
                }}
                value={job && job.basic_pay}
                name="basic_pay"
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobInformation.Overtime Applicable')?.[genLabel]}
              </Label>
             
              <br></br>
              <Label> Yes </Label>
              &nbsp;
              <Input
                name="overtime"
                value="1"
                type="radio"
                defaultChecked={job && job.overtime === 1 && true}
                onChange={(e) => {
                  handleInputsJobInformation(e);
                  handleRadioGst(job.over_time_rate, e.target.value, job.basic_pay);
                }}
              />
              &nbsp;
              &nbsp;
              <Label> No </Label>
              &nbsp;
              <Input
                name="overtime"
                value="0"
                type="radio"
                defaultChecked={job && job.overtime === 0 && true}
                onChange={(e) => {
                  handleInputsJobInformation(e);
                  handleRadioGst(job.over_time_rate, e.target.value, job.basic_pay);
                }}
              />
            </FormGroup>
          </Col>
          {job && job.overtime === '1' && (
            <Col md="4">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {' '}<span className="required"> *</span>{' '}
                {arabic.find((item) => item.key_text === 'mdJobInformation.Over Time Rate')?.[genLabel]} 
              </Label>
                
                <Input
                  type="select"
                  value={job && job.over_time_rate}
                  name="over_time_rate"
                  onChange={(e) => {
                    handleInputsJobInformation(e);
                    handleRadioGst(job.overtime, e.target.value, job.basic_pay);
                  }}
                >
                  <option defaultValue="selected">Please Select</option>
                  <option value="1.5">1.5</option>
                  <option value="2.0">2.0</option>
                </Input>
              </FormGroup>
            </Col>
          )}
          <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobInformation.Overtime Pay Rate/ Hour')?.[genLabel]}
              </Label>
             
              {/* <br />
              <span>{job && job.overtime_pay_rate?job.overtime_pay_rate:''}</span> */}
              <Input
                type="numbers"
                onChange={handleInputsJobInformation}
                value={job && job.overtime_pay_rate}
                name="overtime_pay_rate"
              />
            </FormGroup>
          </Col>

          <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobInformation.Transport')?.[genLabel]}
              </Label>
            
              <Input
                type="numbers"
                onChange={handleInputsJobInformation}
                value={job && job.allowance1}
                name="allowance1"
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobInformation.Entertainment')?.[genLabel]}
              </Label>
             
              <Input
                type="numbers"
                onChange={handleInputsJobInformation}
                value={job && job.allowance2}
                name="allowance2"
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobInformation.Food')?.[genLabel]}
              </Label>
              
              <Input
                type="numbers"
                onChange={handleInputsJobInformation}
                value={job && job.allowance3}
                name="allowance3"
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobInformation.Shift Allowance')?.[genLabel]}
              </Label>
             
              <Input
                type="numbers"
                onChange={handleInputsJobInformation}
                value={job && job.allowance4}
                name="allowance4"
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobInformation.Others')?.[genLabel]}
              </Label>
             
              <Input
                type="numbers"
                onChange={handleInputsJobInformation}
                value={job && job.allowance5}
                name="allowance5"
              />
            </FormGroup>
          </Col>

          <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobInformation.Housing')?.[genLabel]}
              </Label>
            
              <Input
                type="numbers"
                onChange={handleInputsJobInformation}
                value={job && job.deduction1}
                name="deduction1"
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobInformation.Transportation')?.[genLabel]}
              </Label>           
              <Input
                type="numbers"
                onChange={handleInputsJobInformation}
                value={job && job.deduction2}
                name="deduction2"
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobInformation.Others')?.[genLabel]}
              </Label>   
              <Input
                type="numbers"
                onChange={handleInputsJobInformation}
                value={job && job.deduction3}
                name="deduction3"
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobInformation.Food')?.[genLabel]}
              </Label>   
             
              <Input
                type="numbers"
                onChange={handleInputsJobInformation}
                value={job && job.deduction4}
                name="deduction4"
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobInformation.Levy')?.[genLabel]}
              </Label>   
            
              <Input
                type="numbers"
                onChange={handleInputsJobInformation}
                value={job && job.levy_amount}
                name="levy_amount"
              />
            </FormGroup>
          </Col>
        </Row>
      </FormGroup>
    </>
  );
}

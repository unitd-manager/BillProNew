import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';


export default function JobSalary({ handleInputsJobInformation, job,arb, arabic }) {
  JobSalary.propTypes = {
    handleInputsJobInformation: PropTypes.any,
    job: PropTypes.any,
    arb: PropTypes.any,
    arabic: PropTypes.any,
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
                {arabic.find((item) => item.key_text === 'mdJobInformation.CPF Applicable')?.[genLabel]}
              </Label>
              <br></br>
              <Label>Yes</Label>
              <Input
                name="cpf_applicable"
                value="1"
                type="radio"
                defaultChecked={job && job.cpf_applicable === 1 && true}
                onChange={handleInputsJobInformation}
              />
              &nbsp;
              &nbsp;
              <Label> No </Label>
              <Input
                name="cpf_applicable"
                value="0"
                type="radio"
                defaultChecked={job && job.cpf_applicable === 0 && true}
                onChange={handleInputsJobInformation}
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
            <span className="required"> *</span>{' '}
                {arabic.find((item) => item.key_text === 'mdJobInformation.Govt donation')?.[genLabel]}  
              </Label>
            
              <Input
                type="select"
                value={job && job.govt_donation}
                name="govt_donation"
                onChange={handleInputsJobInformation}
              >
                <option defaultValue="selected">Please Select</option>
                <option value="pay_cdac">CDAC</option>
                <option value="pay_sinda">SINDA</option>
                <option value="pay_mbmf">MBMF</option>
                <option value="pay_eucf">EUCF</option>
              </Input>
            </FormGroup>
          </Col>
          {job && job.govt_donation === 'pay_cdac' && (
            <Col md="4">
              <FormGroup>  
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobInformation.Pay CDAC')?.[genLabel]}   
              </Label>
                
                <Input
                  type="numbers"
                  onChange={handleInputsJobInformation}
                  value={job && job.pay_cdac}
                  name="pay_cdac"
                />
              </FormGroup>
            </Col>
          )}
          {job && job.govt_donation === 'pay_sinda' && (
            <Col md="4">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobInformation.Pay SINDA')?.[genLabel]}   
              </Label>
               
                <Input
                  type="numbers"
                  onChange={handleInputsJobInformation}
                  value={job && job.pay_sinda}
                  name="pay_sinda"
                />
              </FormGroup>
            </Col>
          )}
          {job && job.govt_donation === 'pay_mbmf' && (
            <Col md="4">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobInformation.Pay MBMF')?.[genLabel]}   
              </Label>
                
                <Input
                  type="numbers"
                  onChange={handleInputsJobInformation}
                  value={job && job.pay_mbmf}
                  name="pay_mbmf"
                />
              </FormGroup>
            </Col>
          )}
          {job && job.govt_donation === 'pay_eucf' && (
            <Col md="3">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobInformation.Pay EUCF')?.[genLabel]}   
              </Label>
              
                <Input
                  type="numbers"
                  onChange={handleInputsJobInformation}
                  value={job && job.pay_eucf}
                  name="pay_eucf"
                />
              </FormGroup>
            </Col>
          )}
          <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobInformation.Income Tax No')?.[genLabel]}   
              </Label>
             
              <Input
                type="text"
                onChange={handleInputsJobInformation}
                value={job && job.income_tax_id}
                name="income_tax_id"
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobInformation.Income Tax Amount')?.[genLabel]}   
              </Label>
         
              <Input
                type="text"
                onChange={handleInputsJobInformation}
                value={job && job.income_tax_amount}
                name="income_tax_amount"
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobInformation.CPF No')?.[genLabel]}   
              </Label>
             
              <Input
                type="text"
                onChange={handleInputsJobInformation}
                value={job && job.cpf_account_no}
                name="cpf_account_no"
              />
            </FormGroup>
          </Col>
        </Row>
      {/* <ComponentCard title="Bank Information">
        <FormGroup>
          <Row>
            <Col md="4">
              <FormGroup>
                <Label>Mode of Payment</Label>

                <Input
                  type="select"
                  value={job && job.mode_of_payment}
                  name="mode_of_payment"
                  onChange={handleInputsJobInformation}
                >
                  <option defaultValue="selected">Please Select</option>
                  <option value="cheque">Cheque</option>
                  <option value="cash">Cash</option>
                  <option value="giro payment transfer">giro payment transfer</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label>Account No</Label>
                <Input
                  type="text"
                  onChange={handleInputsJobInformation}
                  value={job && job.account_no}
                  name="account_no"
                />
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label>Bank Name</Label>
                <Input
                  type="select"
                  name="bank_name"
                  onChange={handleInputsJobInformation}
                  value={job && job.bank_name}
                >
                  <option defaultValue="selected">Please Select</option>
                  {allBank &&
                    allBank.map((bank) => (
                      <option key={bank.bank_name} value={bank.bank_name}>
                        {bank.bank_name}
                      </option>
                    ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label>Bank Code</Label>
                <Input
                  type="text"
                  onChange={handleInputsJobInformation}
                  value={job && job.bank_code}
                  name="bank_code"
                />
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label>Branch Code</Label>
                <Input
                  type="text"
                  onChange={handleInputsJobInformation}
                  value={job && job.branch_code}
                  name="branch_code"
                />
              </FormGroup>
            </Col>
          </Row>
        </FormGroup>
      </ComponentCard> */}
    </FormGroup>
  );
}

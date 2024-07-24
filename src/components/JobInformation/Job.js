import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';

export default function JobBank({ handleInputsJobInformation, job, allBank, arabic,arb }) {
  JobBank.propTypes = {
    handleInputsJobInformation: PropTypes.any,
    job: PropTypes.any,
    allBank: PropTypes.any,
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
                {arabic.find((item) => item.key_text === 'mdJobInformation.Mode of Payment')?.[genLabel]}
              </Label>
             
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
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobInformation.Account No')?.[genLabel]}
              </Label>
              
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
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobInformation.Bank Name')?.[genLabel]}
              </Label>
              
             
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
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobInformation.Bank Code')?.[genLabel]}
              </Label>
             
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
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobInformation.Branch Code')?.[genLabel]}
              </Label>
            
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
  );
}

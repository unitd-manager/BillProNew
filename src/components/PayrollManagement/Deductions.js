import React, { useState, useEffect } from 'react';
import { Row, Col, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import api from '../../constants/api';

function Deductions({
  payroll,
  handleInputs,
  handleDeductions,
  setLoanPaymentHistoryModal,
  newTotalMonthPay
}) {
  // Initialize totalDeductions with the default value

  Deductions.propTypes = {
    payroll: PropTypes.object,
    handleDeductions: PropTypes.func,
    handleInputs: PropTypes.func,
    setLoanPaymentHistoryModal: PropTypes.func,
    newTotalMonthPay:PropTypes.func,
  };
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  const selectedLanguage = getSelectedLanguageFromLocalStorage();
  const [arabic, setArabic] = useState([]);


  const arb =selectedLanguage === 'Arabic'

  // const eng =selectedLanguage === 'English'
   

  const getArabicLabels = () => {
      api
      .get('/translation/getTranslationForPayrollManagement')
      .then((res) => {
        setArabic(res.data.data);
      })
      .catch(() => {
        // Handle error if needed
      });   
  };

  useEffect(() => {
  
    getArabicLabels();
  }, []);
  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }
  // Function to calculate the total deduction based on default values
  const [totalDeductionsAmount, setTotalDeductionsAmount] = useState(0);

  // Use useEffect to update totalDeductions whenever relevant fields change
  useEffect(() => {
    const cpfEmployee = parseFloat(payroll.cpf_employee || 0);
    const incomeTaxAmount = parseFloat(payroll.income_tax_amount || 0);
    const loanAmount = parseFloat(payroll.loan_amount || 0);
    const deduction1 = parseFloat(payroll.deduction1 || 0);
    const deduction2 = parseFloat(payroll.deduction2 || 0);
    const deduction3 = parseFloat(payroll.deduction3 || 0);
    const deduction4 = parseFloat(payroll.deduction4 || 0);
    const sdl = parseFloat(payroll.sdl || 0);
    const payEucf = parseFloat(payroll.pay_eucf || 0);
    const payCdac = parseFloat(payroll.pay_cdac || 0);
    const payMbmf = parseFloat(payroll.pay_mbmf || 0);
    const paySinda = parseFloat(payroll.pay_sinda || 0);

    const newGrossPay =
      cpfEmployee +
      incomeTaxAmount +
      loanAmount +
      deduction1 +
      deduction2 +
      deduction3 +
      deduction4 +
      sdl +
      payEucf +
      payCdac +
      payMbmf +
      paySinda;

    setTotalDeductionsAmount(newGrossPay);
  }, [
    payroll.cpf_employee,
    payroll.income_tax_amount,
    payroll.loan_amount,
    payroll.deduction1,
    payroll.deduction2,
    payroll.deduction3,
    payroll.deduction4,
    payroll.sdl,
    payroll.pay_eucf,
    payroll.pay_cdac,
    payroll.pay_mbmf,
    payroll.pay_sinda,
  ]);

  const [totalDedAmount, setTotalDedAmount] = useState(0);

  useEffect(() => {
    const totalMonthPayss = parseFloat(newTotalMonthPay  || 0);
    const totalDeductionsss = parseFloat(totalDeductionsAmount || 0);
    const reimbursement = parseFloat(payroll.reimbursement || 0);
    const directorFee = parseFloat(payroll.director_fee || 0);

    console.log('totalMonthPayss', totalMonthPayss)

    const newNetTotalPay = totalMonthPayss - totalDeductionsss + reimbursement + directorFee;

    setTotalDedAmount(newNetTotalPay);
  }, [
    newTotalMonthPay,
    totalDeductionsAmount,
    payroll.reimbursement,
    payroll.director_fee
  ]);

  return (
    <div>
      <Row>
      <Col md="9">
        {arabic.find(item => item.key_text === 'mdPayrollManagement.CPF(Employee)')?.[genLabel]}</Col>{' '}
      
        <Col md="3">
          <Input
            disabled
            name="cpf_employee"
            type="text"
            value={payroll && payroll.cpf_employee}
            onChange={(e) => {
              handleInputs(e);
              handleDeductions(
                e.target.value,
                payroll.income_tax_amount,
                payroll.loan_amount,
                payroll.deduction1,
                payroll.deduction2,
                payroll.deduction3,
                payroll.deduction4,
                payroll.sdl,
                payroll.pay_eucf,
                payroll.pay_cdac,
                payroll.pay_mbmf,
                payroll.pay_sinda,
              );
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col md="9"> SDL</Col>
        <Col md="3">
          <Input
            name="sdl"
            type="text"
            value={payroll && payroll.sdl}
            onChange={(e) => {
              handleInputs(e);
              handleDeductions(
                e.target.value,
                payroll.income_tax_amount,
                payroll.loan_amount,
                payroll.deduction1,
                payroll.deduction2,
                payroll.deduction3,
                payroll.deduction4,
                payroll.cpf_employee,
                payroll.pay_eucf,
                payroll.pay_cdac,
                payroll.pay_mbmf,
                payroll.pay_sinda,
              );
            }}
          />
        </Col>
      </Row>
      <Row>
      <Col md="9">
        {arabic.find(item => item.key_text === 'mdPayrollManagement.Advance / Loan')?.[genLabel]}</Col>{' '}
        <Col md="9">
          {' '}
          <Link
            to=""
            onClick={() => {
              setLoanPaymentHistoryModal(true);
            }}
          >
             {arabic.find(item => item.key_text === 'mdPayrollManagement.View loan breakup')?.[genLabel]}
            
          </Link>
        </Col>
        <Col md="3">
          {console.log("payroll.loan_amount:", payroll.loan_amount)}
          <Input
            name="loan_amount"
            type="text"
            value={payroll && payroll.loan_amount}
            onChange={(e) => {
              handleInputs(e);
              // handleDeductions(
              //   e.target.value,
              //   payroll.income_tax_amount,
              //   payroll.cpf_employee,
              //   payroll.deduction1,
              //   payroll.deduction2,
              //   payroll.deduction3,
              //   payroll.deduction4,
              //   payroll.sdl,
              //   payroll.pay_eucf,
              //   payroll.pay_cdac,
              //   payroll.pay_mbmf,
              //   payroll.pay_sinda,
              // );
            }}
          />
        </Col>
      </Row>
      <Row>
      <Col md="9">
        {arabic.find(item => item.key_text === 'mdPayrollManagement.Income Tax')?.[genLabel]}</Col>{' '}
        
        <Col md="3">
          <Input
            name="income_tax_amount"
            type="text"
            value={payroll && payroll.income_tax_amount}
            onChange={(e) => {
              handleInputs(e);
              handleDeductions(
                e.target.value,
                payroll.cpf_employee,
                payroll.loan_amount,
                payroll.deduction1,
                payroll.deduction2,
                payroll.deduction3,
                payroll.deduction4,
                payroll.sdl,
                payroll.pay_eucf,
                payroll.pay_cdac,
                payroll.pay_mbmf,
                payroll.pay_sinda,
              );
            }}
          />
        </Col>
      </Row>
      <Row>
      <Col md="9">
        {arabic.find(item => item.key_text === 'mdPayrollManagement.Housing')?.[genLabel]}</Col>{' '}
       
        <Col md="3">
          <Input
            name="deduction1"
            type="text"
            value={payroll && payroll.deduction1}
            onChange={(e) => {
              handleInputs(e);
              handleDeductions(
                e.target.value,
                payroll.income_tax_amount,
                payroll.loan_amount,
                payroll.cpf_employee,
                payroll.deduction2,
                payroll.deduction3,
                payroll.deduction4,
                payroll.sdl,
                payroll.pay_eucf,
                payroll.pay_cdac,
                payroll.pay_mbmf,
                payroll.pay_sinda,
              );
            }}
          />
        </Col>
      </Row>
      <Row>
      <Col md="9">
        {arabic.find(item => item.key_text === 'mdPayrollManagement.Transportation')?.[genLabel]}</Col>{' '}
       
        <Col md="3">
          <Input
            name="deduction2"
            type="text"
            value={payroll && payroll.deduction2}
            onChange={(e) => {
              handleInputs(e);
              handleDeductions(
                e.target.value,
                payroll.income_tax_amount,
                payroll.loan_amount,
                payroll.deduction1,
                payroll.cpf_employee,
                payroll.deduction3,
                payroll.deduction4,
                payroll.sdl,
                payroll.pay_eucf,
                payroll.pay_cdac,
                payroll.pay_mbmf,
                payroll.pay_sinda,
              );
            }}
          />
        </Col>
      </Row>
      <Row>
      <Col md="9">
        {arabic.find(item => item.key_text === 'mdPayrollManagement.Others')?.[genLabel]}</Col>{' '}
      
        <Col md="3">
          <Input
            name="deduction3"
            type="text"
            value={payroll && payroll.deduction3}
            onChange={(e) => {
              handleInputs(e);
              handleDeductions(
                e.target.value,
                payroll.income_tax_amount,
                payroll.loan_amount,
                payroll.deduction1,
                payroll.deduction2,
                payroll.cpf_employee,
                payroll.deduction4,
                payroll.sdl,
                payroll.pay_eucf,
                payroll.pay_cdac,
                payroll.pay_mbmf,
                payroll.pay_sinda,
              );
            }}
          />
        </Col>
      </Row>
      <Row>
      <Col md="9">
        {arabic.find(item => item.key_text === 'mdPayrollManagement.Food')?.[genLabel]}</Col>{' '}
       
        <Col md="3">
          <Input
            name="deduction4"
            type="text"
            value={payroll && payroll.deduction4}
            onChange={(e) => {
              handleInputs(e);
              handleDeductions(
                e.target.value,
                payroll.income_tax_amount,
                payroll.loan_amount,
                payroll.deduction1,
                payroll.deduction2,
                payroll.deduction3,
                payroll.cpf_employee,
                payroll.sdl,
                payroll.pay_eucf,
                payroll.pay_cdac,
                payroll.pay_mbmf,
                payroll.pay_sinda,
              );
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col md="9">
          <br></br>
        </Col>
        <Col md="3"></Col>
      </Row>
      {payroll && payroll.govt_donation === 'pay_eucf' && (
        <Row>
            <Col md="9">
        {arabic.find(item => item.key_text === 'mdPayrollManagement.Pay EUCF')?.[genLabel]}</Col>{' '}
         
          <Col md="3">
            <Input
              name="pay_eucf"
              type="text"
              value={payroll && payroll.pay_eucf}
              onChange={(e) => {
                handleInputs(e);
                handleDeductions(
                  e.target.value,
                  payroll.income_tax_amount,
                  payroll.loan_amount,
                  payroll.deduction1,
                  payroll.deduction2,
                  payroll.deduction3,
                  payroll.deduction4,
                  payroll.sdl,
                  payroll.cpf_employee,
                  payroll.pay_cdac,
                  payroll.pay_mbmf,
                  payroll.pay_sinda,
                );
              }}
            />
          </Col>
        </Row>
      )}
      {payroll && payroll.govt_donation === 'pay_sinda' && (
        <Row>
            <Col md="9">
        {arabic.find(item => item.key_text === 'mdPayrollManagement.Pay SINDA')?.[genLabel]}</Col>{' '}
        
          <Col md="3">
            <Input
              name="pay_sinda"
              type="text"
              value={payroll && payroll.pay_sinda}
              onChange={(e) => {
                handleInputs(e);
                handleDeductions(
                  e.target.value,
                  payroll.income_tax_amount,
                  payroll.loan_amount,
                  payroll.deduction1,
                  payroll.deduction2,
                  payroll.deduction3,
                  payroll.deduction4,
                  payroll.sdl,
                  payroll.cpf_employee,
                  payroll.pay_eucf,
                  payroll.pay_cdac,
                  payroll.pay_mbmf,
                );
              }}
            />
          </Col>
        </Row>
      )}
      {payroll && payroll.govt_donation === 'pay_cdac' && (
        <Row>
          <Col md="9">
        {arabic.find(item => item.key_text === 'mdPayrollManagement.Pay CDAC')?.[genLabel]}</Col>{' '}
          
          <Col md="3">
            <Input
              name="pay_cdac"
              type="text"
              value={payroll && payroll.pay_cdac}
              onChange={(e) => {
                handleInputs(e);
                handleDeductions(
                  e.target.value,
                  payroll.income_tax_amount,
                  payroll.loan_amount,
                  payroll.deduction1,
                  payroll.deduction2,
                  payroll.deduction3,
                  payroll.deduction4,
                  payroll.sdl,
                  payroll.cpf_employee,
                  payroll.pay_eucf,
                  payroll.pay_mbmf,
                  payroll.pay_sinda,
                );
              }}
            />
          </Col>
        </Row>
      )}
      {payroll && payroll.govt_donation === 'pay_mbmf' && (
        <Row>
          <Col md="9">
        {arabic.find(item => item.key_text === 'mdPayrollManagement.Pay MBMF')?.[genLabel]}</Col>{' '}
         
          <Col md="3">
            <Input
              name="pay_mbmf"
              type="text"
              value={payroll && payroll.pay_mbmf}
              onChange={(e) => {
                handleInputs(e);
                handleDeductions(
                  e.target.value,
                  payroll.income_tax_amount,
                  payroll.loan_amount,
                  payroll.deduction1,
                  payroll.deduction2,
                  payroll.deduction3,
                  payroll.deduction4,
                  payroll.sdl,
                  payroll.cpf_employee,
                  payroll.pay_eucf,
                  payroll.pay_cdac,
                  payroll.pay_sinda,
                );
              }}
            />
          </Col>
        </Row>
      )}
      <Row>
      <Col md="9">
        {arabic.find(item => item.key_text === 'mdPayrollManagement.Total Deductions')?.[genLabel]}</Col>{' '}
        <Col md="9">
          <b></b>
        </Col>
        <Col md="3">
          <Input
            disabled
            name="total_deductions"
            type="text"
            value={totalDeductionsAmount}
            onChange={handleInputs}
          />
        </Col>
      </Row>
      <Row>
        <Col md="9"></Col>
        <Col md="3"></Col>
      </Row>
      <Row>
        <Col md="9"></Col>
        <Col md="3">
          <Input name="" type="text" onChange={handleInputs}  disabled/>
         
        </Col>
      </Row>
      <Row>
        <Col md="9"></Col>
        <Col md="3">
          <Input name="" type="text" onChange={handleInputs}
          disabled />
        </Col>
      </Row>
      <Row>
        <Col md="4">
          <Input value={totalDedAmount} disabled />
        </Col>
        <Col md="3"></Col>
      </Row>
    </div>
  );
}

export default Deductions;

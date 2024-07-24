import React from 'react';
import { Row, Col, Form} from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';
import Deductions from './Deductions';
import Earnings from './Earnings';

function EarningDeductions({
  payroll,
  handleInputs,
  handleDeductions,
  handleEarnings,
  handleOtAmount,
  setLoanPaymentHistoryModal,
  newTotalMonthPay,
  totalDeductions,
  otAmount,
  finalGrossPay,
  calculateBasicPayPercentage
  
}) {
  EarningDeductions.propTypes = {
    payroll: PropTypes.object,
    handleDeductions: PropTypes.func,
    handleEarnings: PropTypes.func,
    handleInputs: PropTypes.func,
    handleOtAmount: PropTypes.func,
    setLoanPaymentHistoryModal: PropTypes.func,
    finalGrossPay: PropTypes.number,
    totalDeductions: PropTypes.any,
    otAmount: PropTypes.any,
    calculateBasicPayPercentage:PropTypes.any,
    newTotalMonthPay:PropTypes.any,
  };
  return (
    <div>
      <Form>
        <Row>
          <Col md="6">
            <ComponentCard title="Earnings">
              <Earnings
              payroll={payroll}
              handleInputs={handleInputs}
              handleDeductions={handleDeductions}
              handleEarnings={handleEarnings}
              handleOtAmount={handleOtAmount}
              setLoanPaymentHistoryModal={setLoanPaymentHistoryModal}
              newTotalMonthPay={newTotalMonthPay}
              totalDeductions={totalDeductions}
              otAmount={otAmount}
              finalGrossPay={finalGrossPay}
              calculateBasicPayPercentage={calculateBasicPayPercentage}
              />
            </ComponentCard>
          </Col>
          <Col md="6">
            <ComponentCard title="Deductions">
              <Deductions
               payroll={payroll}
               handleInputs={handleInputs}
               handleDeductions={handleDeductions}
               handleEarnings={handleEarnings}
               newTotalMonthPay={newTotalMonthPay}
               //handleOtAmount={handleOtAmount}
               setLoanPaymentHistoryModal={setLoanPaymentHistoryModal}
               //totalMonthPay={totalMonthPay}
               totalDeductions={totalDeductions}
               //otAmount={otAmount}
              />
            </ComponentCard>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default EarningDeductions;

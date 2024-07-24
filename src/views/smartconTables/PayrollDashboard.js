import React from 'react';
import { Col, Row } from 'reactstrap';
import Leave from '../../components/DashboardHR/Leave';
import Loan from '../../components/DashboardHR/Loan';
import Training from '../../components/DashboardHR/Training';
import Employee from '../../components/DashboardHR/Employee';
import JobInfo from '../../components/DashboardHR/JobInfo';
import Payroll from '../../components/DashboardHR/Payroll';


const Test = () => {

  return (
    <div >
      <Row>
        <Col lg='12'>
        <Leave/>
        <Loan/>
        <Training/>
        <Employee/>
        <JobInfo/>
        <Payroll/>

        
        </Col>
      </Row>
  
    </div>
  );
};

export default Test;

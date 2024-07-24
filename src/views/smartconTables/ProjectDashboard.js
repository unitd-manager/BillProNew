import React from 'react';
import { Col, Row } from 'reactstrap';
import TaskSummary from '../../components/dashboard/TaskSummary';
import ProjectSummaryChart from '../../components/dashboard/ProjectSummaryChart';
import LabourSummary from '../../components/dashboard/LabourSummary';
import MaterrialIssueChart from '../../components/dashboard/MaterialIssueChart';
import ProjectChart from '../../components/DashboardProj/ProjectChart';
import Subcon from '../../components/DashboardProj/SubCon';
import MaterialIssue from '../../components/DashboardProj/MaterialIssue';
import ProjectQuotationChart  from '../../components/dashboard/ProjectQuotationChart'
import ProjectEnquiryChart from '../../components/dashboard/ProjectEnquiryChart';

const Test = () => {

  return (
    <div >
      <Row>
        <Col lg='12'>
        <ProjectEnquiryChart/>
        <ProjectQuotationChart/>
        <ProjectChart/>
        <Subcon/>
        <MaterialIssue/>
        <ProjectSummaryChart/>
        <TaskSummary/>
        <LabourSummary/>
        <MaterrialIssueChart/>
        
        </Col>
      </Row>
  
    </div>
  );
};

export default Test;

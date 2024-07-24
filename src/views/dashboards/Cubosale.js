import { Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SalesOverview from '../../components/dashboard/classicDashboard/ProjectOverview';
import TenderSummaryCard from '../../components/dashboard/TenderSummaryCard';
import ProjectSummaryChart from '../../components/dashboard/ProjectSummaryChart';
import TenderSummary from '../../components/dashboard/TenderSummary';
import InvoiceSummary from '../../components/dashboard/InvoiceSummary';
import InvoiceSummaryChart from '../../components/dashboard/InvoiceSummaryChart';
import EmployeeSummary from '../../components/dashboard/ecommerceDashboard/EmployeeSummary';
import PasspotExpirySummary from '../../components/dashboard/PasspotExpirySummary';
import WorkpermitExpirySummary from '../../components/dashboard/WorkpermitExpirySummary';
import TaskSummary from '../../components/dashboard/TaskSummary';
import LabourSummary from '../../components/dashboard/LabourSummary';
import MaterialPurchaseSummary from '../../components/dashboard/MaterialPurchaseSummary';
import MaterialIssueChart from '../../components/dashboard/MaterialIssueChart';
import RequestForQuotePie from '../../components/dashboard/RequestForQuotePie';
 //import QuotationChart from '../../components/dashboard/QuotationChart';
 //import CustomerChart from '../../components/dashboard/CustomerChart';


/*HR*/


const Classic = () => {
  return (
    <>
      <Row>
        <Col lg="12"> 
          {/* <TestChart/> */}
           <TenderSummaryCard />
          <ProjectSummaryChart />
          <TaskSummary/>
          <LabourSummary/>
          <TenderSummary />
          <InvoiceSummary />
          <InvoiceSummaryChart />
          <EmployeeSummary />
          <PasspotExpirySummary />
          <WorkpermitExpirySummary/>
          <MaterialPurchaseSummary/>
          <MaterialIssueChart/>
          <RequestForQuotePie/>
         {/* < QuotationChart/> 
         <CustomerChart/> */}
           <SalesOverview /> 
        </Col>
      </Row>
    </>
  );
};

export default Classic;

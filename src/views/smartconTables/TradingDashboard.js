import React from 'react';
import { Col, Row } from 'reactstrap';
import QuotationDonut from '../../components/dashboard/QuotationDonut';
import EnquiryLineChart from '../../components/dashboard/EnquiryLineChart';
import SalesOrderStats from '../../components/dashboard/SalesOrderStats';
import EnquirySummary from '../../components/dashboard/EnquirySummary';
import ReturnStats from '../../components/dashboard/ReturnStats';
import DeliveryStats from '../../components/dashboard/DeliveryStats';
import InvoiceSummary from '../../components/dashboard/Invoice Summary';
import ClientChart from '../../components/dashboard/ClientChart'
import SalesInvoicePieChart from '../../components/dashboard/SalesInvoivePieChart';
import GoodsDeliveryChart from '../../components/dashboard/GoodsDeliveryChart';
import SalesReturnChart from '../../components/dashboard/SalesReturnChart';

const Test = () => {

  return (
    <div >
      <Row>
        <Col lg='12'>
       <ClientChart/>
      
       <EnquiryLineChart/>
       <QuotationDonut/>
       <SalesOrderStats/>
       <SalesInvoicePieChart/>
       <GoodsDeliveryChart/>
       <SalesReturnChart/>
        <EnquirySummary/>
        <ReturnStats/>
        <DeliveryStats/>
        <InvoiceSummary/>
        </Col>
      </Row>
  
    </div>
  );
};

export default Test;

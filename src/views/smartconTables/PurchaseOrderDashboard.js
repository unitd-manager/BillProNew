import React from 'react';
import { Col, Row } from 'reactstrap';
import PurchaseOrderSummary from '../../components/dashboard/PurchaseOrderSummary';
import PurchaseInvoiceSummary from '../../components/dashboard/PurchaseInvoiceSummary';
import PurchaseOrderPieChart from './PurchaseOrderPieChart';
import PurchaseOrderProduct from './PurchaseOrderdProduct';
import PurchaseRequestChart from './PurchaseRequestChart';
import RequestQuoteChart from './RequestQuoteChart';
import PurchaseOrderChart from './PurchaseOrderChart';
import PurchaseInvoiceChart from './PurchaseInvoiceChart';
import PurchaseReturnChart from './PurchaseReturnChart';
import PurchaseGoodsDeliveryChart from './PurchaseGoodsDeliveryChart';

const Test = () => {

  return (
    <div >
      <Row>
        <Col lg='12'>
        <PurchaseRequestChart/>
        <RequestQuoteChart/>
        <PurchaseOrderChart/>
        <PurchaseInvoiceChart/>
        <PurchaseReturnChart/>
        <PurchaseGoodsDeliveryChart/>
        <PurchaseOrderSummary/>
        <PurchaseInvoiceSummary/>
        <PurchaseOrderPieChart/>
        <PurchaseOrderProduct/>
        </Col>
      </Row>
  
    </div>
  );
};

export default Test;

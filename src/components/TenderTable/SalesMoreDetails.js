import React, { useState } from 'react';
import { Row, TabPane,TabContent, Form, FormGroup } from 'reactstrap';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import ComponentCard from '../ComponentCard';
import InvoiceTable from './InvoiceTable';
import ReceiptTable from './ReceiptTable';
import Tab from '../project/Tab';
import Tabs from '../project/Tabs';
import OrderItemsTable from './OrderItemsTable';


//VehicleDetails From VehicleEdit
export default function VehicleMoreDetails({ invoiceDetails, receiptDetails, ordersDetails,arb,eng, orderDetails, quoteId,  id }) {
  VehicleMoreDetails.propTypes = {
    invoiceDetails: PropTypes.array,
    receiptDetails: PropTypes.array,
    ordersDetails: PropTypes.array,
    eng:PropTypes.array,
    arb:PropTypes.array,
    quoteId: PropTypes.any,
    id: PropTypes.any,
    orderDetails: PropTypes.any
  };

  const [activeTab, setActiveTab] = useState('1');

  const toggle = (tab) => {
    setActiveTab(tab);
  };

  const tabs = [
    { id: '1', name: 'Order Items ' },
    { id: '2', name: 'Invoice' },
    { id: '3', name: 'Receipt' },
  ];

  const tabsArb = [
    { id: '1', name: 'طلب بضاعة '},
    { id: '2', name: 'فاتورة' },
    { id: '3', name: 'إيصال'},
  ];
  return (
    <Form>
      <FormGroup>
        <ComponentCard title="More Details">
          <ToastContainer></ToastContainer>
          {eng === true && <Tab toggle={toggle} tabs={tabs} />}
          {arb === true && <Tabs toggle={toggle} tabsArb={tabsArb} />}
       <TabContent className="p-4" activeTab={activeTab}>
            {/* ADD NODE */}
            <TabPane tabId="1">
              
              <OrderItemsTable
               ordersDetails={ordersDetails}
              orderDetails={orderDetails}
              quoteId={quoteId}
                id={id}
                ></OrderItemsTable>
            </TabPane>
            {/* Description form */}
            <TabPane tabId="2">
              <Row className="border-bottom mb-3">
                <InvoiceTable invoiceDetails={invoiceDetails}></InvoiceTable>
              </Row>
            </TabPane>

            {/* attachments */}
            <TabPane tabId="3">
              <ReceiptTable receiptDetails={receiptDetails}></ReceiptTable>
            </TabPane>
          </TabContent>
        </ComponentCard>
      </FormGroup>
    </Form>
  );
}

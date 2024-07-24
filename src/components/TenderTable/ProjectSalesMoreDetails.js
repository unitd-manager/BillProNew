import React, { useState } from 'react';
import { Row, TabPane,TabContent, Form, FormGroup } from 'reactstrap';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import ComponentCard from '../ComponentCard';
import ProjectInvoiceTable from './ProjectInvoiceTable';
import ProjectReceiptTable from './ProjectReceiptTable';
import Tab from '../project/Tab';
import Tabs from '../project/Tabs';
import ProjectOrderItemsTable from './ProjectOrderItemsTable';

//VehicleDetails From VehicleEdit
export default function MoreDetails({ invoiceDetails, receiptDetails, ordersDetails,arb,eng }) {
  MoreDetails.propTypes = {
    invoiceDetails: PropTypes.array,
    receiptDetails: PropTypes.array,
    ordersDetails: PropTypes.array,
    eng:PropTypes.array,
    arb:PropTypes.array
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
              
              <ProjectOrderItemsTable ordersDetails={ordersDetails}></ProjectOrderItemsTable>
            </TabPane>
            {/* Description form */}
            <TabPane tabId="2">
              <Row className="border-bottom mb-3">
                <ProjectInvoiceTable invoiceDetails={invoiceDetails}></ProjectInvoiceTable>
              </Row>
            </TabPane>

            {/* attachments */}
            <TabPane tabId="3">
              <ProjectReceiptTable receiptDetails={receiptDetails}></ProjectReceiptTable>
            </TabPane>
          </TabContent>
        </ComponentCard>
      </FormGroup>
    </Form>
  );
}

import React from 'react';
import { Col, Row } from 'reactstrap';
import JournalAccountsChart from './JournalAccountsChart';
import JournalAccountsChart1 from './JournalAccountsChart1';
import LedgerChart from './LedgerChart';
import CreditNoteChart from './CreditNoteChart';
import DebitNoteChart from './DebitNoteChart';


const Test = () => {

  return (
    <div >
      <Row>
        <Col lg='12'>
        <JournalAccountsChart/>
        <JournalAccountsChart1/>
        <LedgerChart/>
        <CreditNoteChart/>
        <DebitNoteChart/>
       
        </Col>
      </Row>
  
    </div>
  );
};

export default Test;

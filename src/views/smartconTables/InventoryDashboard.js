import React from 'react';
import { Col, Row } from 'reactstrap';
import ProductChart from './ProductChart';
import StockChart from './StockChart';
import LowStockChart from './LowStockChart';


const Test = () => {

  return (
    <div >
      <Row>
        <Col lg='12'>
        <ProductChart/>
        <StockChart/>
        <LowStockChart/>
     
       
        </Col>
      </Row>
  
    </div>
  );
};

export default Test;

import React from 'react';
import { Row, Col, Form, FormGroup, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCardV2 from '../ComponentCardV2';
import PdfGoodsDelivery from '../PDF/PdfGoodsDelivery';

export default function GoodsDeliveryButton({ editGoodsDelivery, backToList ,id}) {
    GoodsDeliveryButton.propTypes = {
    editGoodsDelivery: PropTypes.func,
    backToList: PropTypes.func,
    id: PropTypes.any,
  };
  return (
    <Form>
      <FormGroup>
        <ComponentCardV2>
          <Row>
          <Col >
             
             <PdfGoodsDelivery id={id} quoteId={id}></PdfGoodsDelivery>
          
         </Col>
            <Col>
              <Button
                className="shadow-none"
                color="primary"
                onClick={() => {
                    editGoodsDelivery();
                    setTimeout(()=>{
                      backToList();
                    },500)
                }}
              >
                Save
              </Button>
            </Col>
            <Col>
              <Button
                className="shadow-none"
                color="primary"
                onClick={() => {
                  editGoodsDelivery();
                
                }}
              >
                Apply
              </Button>
            </Col>
            <Col>
              <Button
                className="shadow-none"
                color="dark"
                onClick={() => {
                  backToList();
                }}
              >
                Back to List
              </Button>
            </Col>
          </Row>
        </ComponentCardV2>
      </FormGroup>
    </Form>
  );
}

import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

export default function GoodsDeliveryMoreDetails({ tenderDetails, handleInputs, arb,
  arabic }) {
  GoodsDeliveryMoreDetails.propTypes = {
    tenderDetails: PropTypes.object,
    handleInputs: PropTypes.object,
    arb: PropTypes.any,
    arabic: PropTypes.any,
    // company: PropTypes.object,
  };
  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }

  return (
    <div>
      {' '}
      <Form>
        <FormGroup>
          <ComponentCard title={arb ? 'تفاصيل تسليم البضائع' : 'Goods Delivery Details'} creationModificationDate={tenderDetails}>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>

                    {
                      arabic.find((item) => item.key_text === 'mdTradingGoods.Delivery Code')?.[
                      genLabel
                      ]
                    }{' '}
                    <span className="required"> *</span>
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? tenderDetails && tenderDetails.goods_delivery_code_arb
                          ? tenderDetails.goods_delivery_code_arb
                          : tenderDetails && tenderDetails.goods_delivery_code_arb !== null
                            ? ''
                            : tenderDetails && tenderDetails.goods_delivery_code
                        : tenderDetails && tenderDetails.goods_delivery_code                  }
                    name={arb ? 'goods_delivery_code_arb' : 'goods_delivery_code'} />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdTradingGoods.Date')?.[genLabel]}{' '}
                  </Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={
                      arb
                        ? tenderDetails && tenderDetails.goods_delivery_date_arb
                          ? tenderDetails.goods_delivery_date_arb
                          : tenderDetails && tenderDetails.goods_delivery_date_arb !== null
                            ? ''
                            : tenderDetails && tenderDetails.goods_delivery_date
                        : tenderDetails && tenderDetails.goods_delivery_date
                    } />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {
                      arabic.find((item) => item.key_text === 'mdTradingGoods.Order Code')?.[
                      genLabel
                      ]
                    }{' '}</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? tenderDetails && tenderDetails.order_code_arb
                          ? tenderDetails.order_code_arb
                          : tenderDetails && tenderDetails.order_code_arb !== null
                            ? ''
                            : tenderDetails && tenderDetails.order_code
                        : tenderDetails && tenderDetails.order_code
                    }
                    name={arb ? 'order_code_arb' : 'order_code'}
                     readOnly
                  ></Input> 
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {
                      arabic.find((item) => item.key_text === 'mdTradingGoods.Company Name')?.[
                      genLabel
                      ]
                    }{' '}</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={ 
                      arb
                        ? tenderDetails && tenderDetails.company_name_arb
                          ? tenderDetails.company_name_arb
                          : tenderDetails && tenderDetails.company_name_arb !== null
                            ? ''
                            : tenderDetails && tenderDetails.company_name
                        : tenderDetails && tenderDetails.company_name
                    }
                    name={arb ? 'company_name_arb' : 'company_name'}
                    readOnly
                  />

                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {
                      arabic.find((item) => item.key_text === 'mdTradingGoods.Department')?.[
                      genLabel
                      ]
                    }{' '}</Label>

                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? tenderDetails && tenderDetails.department_arb
                          ? tenderDetails.department_arb
                          : tenderDetails && tenderDetails.department_arb !== null
                            ? ''
                            : tenderDetails && tenderDetails.department
                        : tenderDetails && tenderDetails.department
                    }
                    name={arb ? 'department_arb' : 'department'}

                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {
                      arabic.find((item) => item.key_text === 'mdTradingGoods.Salesman')?.[
                      genLabel
                      ]
                    }{' '}

                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? tenderDetails && tenderDetails.sales_man_arb
                          ? tenderDetails.sales_man_arb
                          : tenderDetails && tenderDetails.sales_man_arb !== null
                            ? ''
                            : tenderDetails && tenderDetails.sales_man
                        : tenderDetails && tenderDetails.sales_man
                    }
                    name={arb ? 'sales_man_arb' : 'sales_man'}
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {
                      arabic.find((item) => item.key_text === 'mdTradingGoods.Reference')?.[
                      genLabel
                      ]
                    }{' '}

                  </Label>
                                   <Input
                    type="text"
                    onChange={handleInputs}
                    value={                    
                      arb
                        ? tenderDetails && tenderDetails.goods_ref_no_arb
                          ? tenderDetails.goods_ref_no_arb
                          : tenderDetails && tenderDetails.goods_ref_no_arb !== null
                            ? ''
                            : tenderDetails && tenderDetails.goods_ref_no
                        : tenderDetails && tenderDetails.goods_ref_no
                    }
                    name={arb ? 'goods_ref_no_arb' : 'goods_ref_no'}
                 
                  />
                </FormGroup>
              </Col>
              {/* <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {
                      arabic.find((item) => item.key_text === 'mdTradingGoods.PO Code')?.[
                        genLabel
                      ]
                    }{' '}</Label>
                                    <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                    arb
                        ? tenderDetails && tenderDetails.po_no_arb
                          ? tenderDetails.po_no_arb
                          : tenderDetails && tenderDetails.po_no_arb !== null
                            ? ''
                            : tenderDetails && tenderDetails.po_no
                        : tenderDetails && tenderDetails.po_no
                    }
                    name={arb ? 'po_no_arb' : 'po_no'}
                 
                  />
                </FormGroup>
              </Col> */}

              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {
                      arabic.find((item) => item.key_text === 'mdTradingGoods.Status')?.[
                        genLabel
                      ]
                    }{' '}
                 </Label>                 
                  <Input
                    type="select"
                    value={ 
                    arb
                    ? tenderDetails && tenderDetails.goods_delivery_status_arb
                      ? tenderDetails.goods_delivery_status_arb
                      : tenderDetails && tenderDetails.goods_delivery_status_arb !== null
                      ? ''
                      : tenderDetails && tenderDetails.goods_delivery_status
                    : tenderDetails && tenderDetails.goods_delivery_status
                }
                name={arb ? 'goods_delivery_status_arb' : 'goods_delivery_status'}
              
                  >
                    <option value="New">{arb ?'جديد':'New'}</option>
                    <option value="Invoiced">{arb ?'مفوترة':'Invoiced'}</option>
                    <option value="Delivered">{arb ?'تم التوصيل':'Delivered'}</option>
                    
                  </Input>
                </FormGroup> 
              </Col>
            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>
    </div>
  );
}

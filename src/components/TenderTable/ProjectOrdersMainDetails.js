import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

export default function TenderMoreDetails({ orderDetails, handleInputs, arb, arabic }) {
  TenderMoreDetails.propTypes = {
    orderDetails: PropTypes.object,
    handleInputs: PropTypes.object,
    arb: PropTypes.object,
    arabic: PropTypes.object,
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
          <ComponentCard title="Orders Details" creationModificationDate={orderDetails}>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {
                      arabic.find((item) => item.key_text === 'mdTradingOrder.Order Code')?.[
                        genLabel
                      ]
                    }{' '}
                    {/*Access the value property */}
                    <span className="required">*</span>
                  </Label>
                  <Input
                    type="text"
                    style={{ backgroundColor: '#f2f2f2', color: '#666' }}
                    readOnly
                    onChange={handleInputs}
                    value={
                      arb
                        ? orderDetails && orderDetails.order_code_arb
                          ? orderDetails.order_code_arb
                          : orderDetails && orderDetails.order_code_arb !== null
                          ? ''
                          : orderDetails && orderDetails.order_code
                        : orderDetails && orderDetails.order_code
                    }
                    name={arb ? 'order_code_arb' : 'order_code'}
                  ></Input>
                </FormGroup>
              </Col>

              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {
                      arabic.find((item) => item.key_text === 'mdTradingOrder.Order Code')?.[
                        genLabel
                      ]
                    }{' '}
                    {/*Access the value property */}
                    <span className="required">*</span>
                  </Label>
                  <Input
                    type="text"
                    style={{ backgroundColor: '#f2f2f2', color: '#666' }}
                    readOnly
                    onChange={handleInputs}
                    value={
                      arb
                        ? orderDetails && orderDetails.quote_code_arb
                          ? orderDetails.quote_code_arb
                          : orderDetails && orderDetails.quote_code_arb !== null
                          ? ''
                          : orderDetails && orderDetails.quote_code
                        : orderDetails && orderDetails.quote_code
                    }
                    name={arb ? 'quote_code_arb' : 'quote_code'}
                  ></Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {
                      arabic.find((item) => item.key_text === 'mdTradingOrder.Customer')?.[
                        genLabel
                      ]
                    }{' '}
                    {/*Access the value property */}
                    <span className="required">*</span>
                  </Label>
                  <Input
                    type="text"
                    style={{ backgroundColor: '#f2f2f2', color: '#666' }}
                    readOnly
                    onChange={handleInputs}
                    value={
                      arb
                        ? orderDetails && orderDetails.company_name_arb
                          ? orderDetails.company_name_arb
                          : orderDetails && orderDetails.company_name_arb !== null
                          ? ''
                          : orderDetails && orderDetails.company_name
                        : orderDetails && orderDetails.company_name
                    }
                    name={arb ? 'company_name_arb' : 'company_name'}
                  ></Input>
                </FormGroup>
              </Col>

              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {
                      arabic.find((item) => item.key_text === 'mdTradingOrder.Reference')?.[
                        genLabel
                      ]
                    }{' '}
                    {/*Access the value property */}
                    <span className="required">*</span>
                  </Label>
                  <Input
                    type="text"
                    style={{ backgroundColor: '#f2f2f2', color: '#666' }}
                    readOnly
                    onChange={handleInputs}
                    value={
                      arb
                        ? orderDetails && orderDetails.office_ref_no_arb
                          ? orderDetails.office_ref_no_arb
                          : orderDetails && orderDetails.office_ref_no_arb !== null
                          ? ''
                          : orderDetails && orderDetails.office_ref_no
                        : orderDetails && orderDetails.office_ref_no
                    }
                    name={arb ? 'office_ref_no_arb' : 'office_ref_no'}
                  ></Input>
                </FormGroup>
              </Col>
             <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {
                      arabic.find((item) => item.key_text === 'mdTradingOrder.Order Date')?.[
                        genLabel
                      ]
                    }{' '}
                    {/*Access the value property */}
                    <span className="required">*</span>
                  </Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={
                      arb
                        ? orderDetails && orderDetails.order_date_arb
                          ? orderDetails.order_date_arb
                          : orderDetails && orderDetails.order_date_arb !== null
                          ? ''
                          : orderDetails && orderDetails.order_date
                        : orderDetails && orderDetails.order_date
                    }
                    name={arb ? 'order_date_arb' : 'order_date'}
                  ></Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {
                      arabic.find((item) => item.key_text === 'mdTradingOrder.Status')?.[
                        genLabel
                      ]
                    }{' '}
                    {/*Access the value property */}
                    <span className="required">*</span>
                  </Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={
                      arb
                        ? orderDetails && orderDetails.order_status_arb
                          ? orderDetails.order_status_arb
                          : orderDetails && orderDetails.order_status_arb !== null
                          ? ''
                          : orderDetails && orderDetails.order_status
                        : orderDetails && orderDetails.order_status
                    }
                    name={arb ? 'order_status_arb' : 'order_status'}
                  >
                     <option defaultValue="selected">Please Select</option>
                    <option value="new">New</option>
                    <option value="Invoiced">Invoiced</option>
                    <option value="paid">Paid</option>
                    <option value="Cancelled">Cancelled</option>
                  </Input>
                </FormGroup>
              </Col>
              {/* <Col md="3">
                <FormGroup>
                  <Label>Status</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={orderDetails && orderDetails.order_status}
                    name="order_status"
                    disabled
                  >
                    <option defaultValue="selected">please Select</option>
                    <option value="new">New</option>
                    <option value="Invoiced">Invoiced</option>
                    <option value="paid">Paid</option>
                    <option value="Cancelled">Cancelled</option>
                  </Input>
                </FormGroup>
              </Col> */}
          
              <Col md="3">
                <FormGroup>
                  <Label>Net Amount</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={orderDetails && orderDetails.netAmount}
                    name="netAmount"
                    style={{ backgroundColor: '#f2f2f2', color: '#666' }}
                    readOnly
                  />
                </FormGroup>
              </Col>
            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>
    </div>
  );
}

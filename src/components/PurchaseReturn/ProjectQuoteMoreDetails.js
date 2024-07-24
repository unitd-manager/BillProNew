import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

export default function ProjectQuoteMoreDetails({
  tenderDetails,
  handleInputs,
  arb,
  arabic

}) {
  ProjectQuoteMoreDetails.propTypes = {
    tenderDetails: PropTypes.object,
    handleInputs: PropTypes.func,
    arb: PropTypes.any,
    arabic: PropTypes.any,
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
          <ComponentCard title={arb ?'تفاصيل العودة':'Return Details'} creationModificationDate={tenderDetails}>
            <Row>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                <span className="required"> *</span>{' '}
                {arabic.find((item) => item.key_text === 'mdPurchaseReturn.PurchaseReturnCode')?.[genLabel]}
                    
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            tenderDetails && tenderDetails.purchase_return_code_arb ? tenderDetails.purchase_return_code_arb :
                            (tenderDetails && tenderDetails.purchase_return_code_arb !== null ? '' : tenderDetails && tenderDetails.purchase_return_code)
                          )
                        : (tenderDetails && tenderDetails.purchase_return_code)
                    }
                    name={arb ? 'purchase_return_code_arb' : 'purchase_return_code'}
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                <span className="required"> *</span>{' '}
                {arabic.find((item) => item.key_text === 'mdPurchaseReturn.PoCode')?.[genLabel]}
                    
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            tenderDetails && tenderDetails.po_code_arb ? tenderDetails.po_code_arb :
                            (tenderDetails && tenderDetails.po_code_arb !== null ? '' : tenderDetails && tenderDetails.po_code)
                          )
                        : (tenderDetails && tenderDetails.po_code)
                    }
                    name={arb ? 'po_code_arb' : 'po_code'}
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdPurchaseReturn.Return Date')?.[genLabel]}</Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.purchase_return_date}
                    name="purchase_return_date"
                  />
                </FormGroup>
              </Col>

              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdPurchaseReturn.Status')?.[genLabel]}</Label>
                  <Input
                    type="select"
                    value={
                      arb
                        ? (
                            tenderDetails && tenderDetails.status_arb ? tenderDetails.status_arb :
                            (tenderDetails && tenderDetails.status_arb !== null ? '' : tenderDetails && tenderDetails.status)
                          )
                        : (tenderDetails && tenderDetails.status)
                    }
                    onChange={handleInputs}
                    name={arb ? 'status_arb' : 'status'}
                  >
                    <option selected="selected" value="New">
                    {arb ?'جديد':'New'} 
                    </option>
                    <option value="Returned">{arb ?'عاد':'Returned'}</option>
                    <option value="Not Returned">{arb ?'لا يسترجع':'Not Returned'}</option>
                    <option value="Cancelled">{arb ?'ألغيت':'Cancelled'}</option>
                  </Input>
                </FormGroup>
              </Col>
              {/* <Col md="3">
                <FormGroup>
                  <Label>Net Total</Label>
                  <Input
                    type="text"
                    value={tenderDetails && tenderDetails.total_amount}
                    onChange={handleInputs}
                    name="total_amount"
                  />
                </FormGroup>
              </Col> */}
            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>
    </div>
  );
}

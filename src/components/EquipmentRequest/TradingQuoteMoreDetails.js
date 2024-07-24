import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

export default function TradingQuoteMoreDetails({
  tenderDetails,
  handleInputs,
  handleStatusChange,
  status,
  arb,
  arabic,
  genLabel,
}) {
  TradingQuoteMoreDetails.propTypes = {
    tenderDetails: PropTypes.object,
    handleInputs: PropTypes.object,
    handleStatusChange: PropTypes.object,
    status: PropTypes.object,
    arb: PropTypes.any,
    arabic: PropTypes.any,
    genLabel: PropTypes.any,
  };
  const isApproved = tenderDetails && tenderDetails.equipment_status === 'Approved';
  return (
    <div>
      {' '}
      <Form>
        <FormGroup>
          <ComponentCard title="Equipment Request Details" creationModificationDate={tenderDetails}>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEquipmentRequest.Request Code')?.[genLabel]}
              </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.equipment_request_code}
                    name="equipment_request_code"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEquipmentRequest.Date')?.[genLabel]}
              </Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.request_date}
                    name="request_date"
                  />
                </FormGroup>
              </Col>

              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEquipmentRequest.Shipping Method')?.[genLabel]}
              </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            tenderDetails && tenderDetails.shipping_method_arb ? tenderDetails.shipping_method_arb :
                            (tenderDetails && tenderDetails.shipping_method_arb !== null ? '' : tenderDetails && tenderDetails.shipping_method)
                          )
                        : (tenderDetails && tenderDetails.shipping_method)
                    }
                    name={arb ? 'shipping_method_arb': 'shipping_method'}
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEquipmentRequest.Payment Terms')?.[genLabel]}
              </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            tenderDetails && tenderDetails.payment_terms_arb ? tenderDetails.payment_terms_arb :
                            (tenderDetails && tenderDetails.payment_terms_arb !== null ? '' : tenderDetails && tenderDetails.payment_terms)
                          )
                        : (tenderDetails && tenderDetails.payment_terms)
                    }
                    name={arb ? 'payment_terms_arb': 'payment_terms'}
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
    
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEquipmentRequest.Equipment Request Date')?.[genLabel]}
              </Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.equipment_request_date}
                    name="equipment_request_date"
                  />
                </FormGroup>
              </Col>

              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEquipmentRequest.Site Reference')?.[genLabel]}
              </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            tenderDetails && tenderDetails.site_reference_arb ? tenderDetails.site_reference_arb :
                            (tenderDetails && tenderDetails.site_reference_arb !== null ? '' : tenderDetails && tenderDetails.site_reference)
                          )
                        : (tenderDetails && tenderDetails.site_reference)
                    }
                    name={arb ? 'site_reference_arb': 'site_reference'}
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEquipmentRequest.Request By')?.[genLabel]}
              </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            tenderDetails && tenderDetails.request_by_arb ? tenderDetails.request_by_arb :
                            (tenderDetails && tenderDetails.request_by_arb !== null ? '' : tenderDetails && tenderDetails.request_by)
                          )
                        : (tenderDetails && tenderDetails.request_by)
                    }
                    name={arb ? 'request_by_arb': 'request_by'}
                  />
                </FormGroup>
              </Col>
              <Col md="3">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEquipmentRequest.Status')?.[genLabel]}
              </Label>
                <Input
                  type="select"
                  onChange={handleStatusChange}
                  value={status || (tenderDetails && tenderDetails.equipment_status)}
                  name="equipment_status"
                  disabled={isApproved} // Disable if status is "Approved"
                >
                  <option value="Please Select">Please Select</option>
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Cancelled">Cancelled</option>
                </Input>
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEquipmentRequest.Approved By')?.[genLabel]}
              </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            tenderDetails && tenderDetails.approved_by_arb ? tenderDetails.approved_by_arb :
                            (tenderDetails && tenderDetails.approved_by_arb !== null ? '' : tenderDetails && tenderDetails.approved_by)
                          )
                        : (tenderDetails && tenderDetails.approved_by)
                    }
                    name={arb ? 'approved_by_arb': 'approved_by'}
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEquipmentRequest.Approved Date')?.[genLabel]}
              </Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.approved_date}
                    name="approved_date"
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

import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

export default function PlanningMainDetails({ handleInputs, plannings, priceliststatus, formSubmitted, arb, arabic, genLabel}) {
  PlanningMainDetails.propTypes = {
    handleInputs: PropTypes.func,
    plannings: PropTypes.object,
    priceliststatus: PropTypes.any,
    formSubmitted: PropTypes.any,
    arb: PropTypes.any,
    arabic: PropTypes.any,   
    genLabel: PropTypes.any
  };

 

  return (
    <>
      <ComponentCard title={arb ? 'تحرير قائمة الأسعار': 'Price List Edit'} creationModificationDate={plannings} >
        <Form>
          <FormGroup>
            <Row>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdPriceList.CustomerName')?.[genLabel]}
              </Label><span className='required'>*</span>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            plannings && plannings.customer_name_arb ? plannings.customer_name_arb :
                            (plannings && plannings.customer_name_arb !== null ? '' : plannings && plannings.customer_name)
                          )
                        : (plannings && plannings.customer_name)
                    }
                    name={arb ? 'customer_name_arb' : 'customer_name'}
                    className={`form-control ${
                      formSubmitted && ((arb && plannings.customer_name_arb.trim() === '') ||(!arb && plannings.customer_name.trim() === '')) ? 'highlight' : ''
                  }`}
                />
                {formSubmitted && ((arb && plannings.customer_name_arb.trim() === '') || (!arb && plannings.customer_name.trim() === '')) && (
                  <div className="error-message">Please Enter</div>
              )}
                 
              </FormGroup>
              </Col>
            <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdPriceList.EffectiveDate')?.[genLabel]}
              </Label>
               
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={plannings && plannings.effective_date}
                    name="effective_date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdPriceList.ExpiryDate')?.[genLabel]}
              </Label>
                  <Input
                    type="Date"
                    onChange={handleInputs}
                    value={plannings && plannings.expiry_date}
                    name="expiry_date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                  {arabic.find((item) => item.key_text === 'mdPriceList.Status')?.[genLabel]}
                  </Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={plannings && plannings.status}
                    name="status"
                  >
                    <option value="selected">Please Select</option>
                    {priceliststatus &&
                      priceliststatus.map((e) => {
                        return (
                          <option key={e.value} value={e.value}>
                          {e.value}
                          </option>
                        );
                      })}
                </Input>
              </Col>
              </Row>
              <Row>
              <Col md="6">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                  {arabic.find((item) => item.key_text === 'mdPriceList.Notes ')?.[genLabel]}
                  </Label>
                <Input
                  type="textarea"
                  onChange={handleInputs}
                  value={
                    arb
                      ? (
                          plannings && plannings.notes_arb ? plannings.notes_arb :
                          (plannings && plannings.notes_arb !== null ? '' : plannings && plannings.notes)
                        )
                      : (plannings && plannings.notes)
                  }
                  name={arb ? 'notes_arb' : 'notes'}
              />
              </FormGroup>
            </Col>
            </Row>
          </FormGroup>
        </Form>
      </ComponentCard>
     
    </>
  );
}

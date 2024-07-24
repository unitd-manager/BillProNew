import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

export default function PlanningMainDetails({ handleInputs, plannings,arabic,genLabel,arb }) {
  PlanningMainDetails.propTypes = {
    handleInputs: PropTypes.func,
    plannings: PropTypes.object,
    arabic: PropTypes.any,
    genLabel: PropTypes.any, 
    arb: PropTypes.any,
  };
  return (
    <>
      <ComponentCard title="Material Issue Edit" creationModificationDate={plannings}>
        <Form>
          <FormGroup>
            <Row>
              <Col md="3">
                <FormGroup>
                 
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdMaterialIssue.Project Name')?.[genLabel]}
              </Label>
                  <br />
                  <Input
                  type="text"
                  onChange={handleInputs}
                  value={plannings && plannings.proj_title}
                  name="proj_title" disabled
                />                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdMaterialIssue.Code')?.[genLabel]}
              </Label>
                  <br />
                  <Input
                  type="text"
                  onChange={handleInputs}
                  value={plannings && plannings.material_request_code}
                  name="material_request_code"
                  disabled
                />  
               </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
          
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdMaterialIssue.Issue Date')?.[genLabel]}
              </Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={plannings && plannings.material_issue_date}
                    name="material_issue_date"
                  />
                </FormGroup>
              </Col>
              
            <Col md="3">
                <FormGroup>
                  
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdMaterialIssue.Reason For Issue')?.[genLabel]}
              </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            plannings && plannings.reason_for_issue_arb ? plannings.reason_for_issue_arb :
                            (plannings && plannings.reason_for_issue_arb !== null ? '' : plannings && plannings.reason_for_issue)
                          )
                        : (plannings && plannings.reason_for_issue)
                    }
                    name={arb ? 'reason_for_issue_arb': 'reason_for_issue'}
                  />
                </FormGroup>
              </Col>
              </Row>
              <Row>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdMaterialIssue.Authorized By')?.[genLabel]}
              </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            plannings && plannings.authorized_by_arb ? plannings.authorized_by_arb :
                            (plannings && plannings.authorized_by_arb !== null ? '' : plannings && plannings.authorized_by)
                          )
                        : (plannings && plannings.authorized_by)
                    }
                    name={arb ? 'authorized_by_arb': 'authorized_by'}
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdMaterialIssue.Notes')?.[genLabel]}
              </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            plannings && plannings.notes_arb ? plannings.notes_arb :
                            (plannings && plannings.notes_arb !== null ? '' : plannings && plannings.notes)
                          )
                        : (plannings && plannings.notes)
                    }
                    name={arb ? 'notes_arb': 'notes'}
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

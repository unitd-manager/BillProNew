import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

export default function PlanningMainDetails({ handleInputs, plannings,arabic,arb,genLabel }) {
  PlanningMainDetails.propTypes = {
    handleInputs: PropTypes.func,
    plannings: PropTypes.object,
    arb: PropTypes.any,
    arabic: PropTypes.any,
    genLabel: PropTypes.any,
  };
  return (
    <>
      <ComponentCard title="Labour Request Edit" creationModificationDate={plannings}>
        <Form>
          <FormGroup>
            <Row>
              <Col md="3">
                <FormGroup>
               
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdLabourRequest.Project Name')?.[genLabel]}
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
                {arabic.find((item) => item.key_text === 'mdLabourRequest.Code')?.[genLabel]}
              </Label>
                  <br />
                  <Input
                  type="text"
                  onChange={handleInputs}
                  value={plannings && plannings.project_code}
                  name="project_code"
                  disabled
                />  
               </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdLabourRequest.Request Date')?.[genLabel]}
              </Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={plannings && plannings.request_date}
                    name="request_date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
               
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdLabourRequest.Start Date')?.[genLabel]}
              </Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={plannings && plannings.request_start_date}
                    name="request_start_date"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
            <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdLabourRequest.No Of Employee')?.[genLabel]}
              </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            plannings && plannings.no_of_employees_arb ? plannings.no_of_employees_arb :
                            (plannings && plannings.no_of_employees_arb !== null ? '' : plannings && plannings.no_of_employees)
                          )
                        : (plannings && plannings.no_of_employees)
                    }
                    name={arb ? 'no_of_employees_arb': 'no_of_employees'}
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                 
                  <Label dir="rtl" style={{ textAlign: 'left' }}>
                {arabic.find((item) => item.key_text === 'mdLabourRequest.Job Description')?.[genLabel]}
              </Label>
                  <Input
                  type="textarea"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            plannings && plannings.job_description_arb ? plannings.job_description_arb :
                            (plannings && plannings.job_description_arb !== null ? '' : plannings && plannings.job_description)
                          )
                        : (plannings && plannings.job_description)
                    }
                    name={arb ? 'job_description_arb': 'job_description'}
                    rows="4" // You can adjust the number of rows as needed
                  />
                </FormGroup>
              </Col>
             

              <Col md="3">
                <FormGroup>
                 
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdLabourRequest.End Date')?.[genLabel]}
              </Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={plannings && plannings.request_end_date}
                    name="request_end_date"
                  />
                </FormGroup>
              </Col>

              <Col md="3">
                <FormGroup>
                 
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdLabourRequest.Request By')?.[genLabel]}
              </Label>
                  <Input
                    type="text"
                    onChange={handleInputs} 
                    value={
                      arb
                        ? (
                            plannings && plannings.request_by_arb ? plannings.request_by_arb :
                            (plannings && plannings.request_by_arb !== null ? '' : plannings && plannings.request_by)
                          )
                        : (plannings && plannings.request_by)
                    }
                    name={arb ? 'request_by_arb': 'request_by'}
                  />
                </FormGroup>
              </Col>
             
            </Row>
            <Row>
            <Col md="3">
                
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdLabourRequest.Request Urgency')?.[genLabel]}
              </Label>
                <Input
                  type="select"
                  onChange={handleInputs}
                  value={plannings && plannings.request_urgency}
                  name="request_urgency"
                >
                  <option defaultValue="selected">Please Select</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                 
                </Input>
              </Col>
              <Col md="3">
               
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdLabourRequest.Request Type')?.[genLabel]}
              </Label>
                <Input
                  type="select"
                  onChange={handleInputs}
                  value={plannings && plannings.request_type}
                  name="request_type"
                >
                  <option defaultValue="selected">Please Select</option>
                  <option value="Skilled">Skilled</option>
                  <option value="UnSkilled">UnSkilled</option>
                  <option value="Temporary">Temporary</option>
                 
                </Input>
              </Col>
              <Col md="3">
                  <FormGroup>
                   
                    <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdLabourRequest.Skills Required')?.[genLabel]}
              </Label>
                    <Input
                      type="textarea"
                      onChange={handleInputs} 
                      value={
                        arb
                          ? (
                              plannings && plannings.skills_required_arb ? plannings.skills_required_arb :
                              (plannings && plannings.skills_required_arb !== null ? '' : plannings && plannings.skills_required)
                            )
                          : (plannings && plannings.skills_required)
                      }
                      name={arb ? 'skills_required_arb': 'skills_required'}
                      rows="4" // You can adjust the number of rows as needed
                    />
                  </FormGroup>
                </Col>

              <Col md="3">
                <FormGroup>
                
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdLabourRequest.Department')?.[genLabel]}
              </Label>
                  <Input
                    type="text"
                    onChange={handleInputs} 
                    value={
                      arb
                        ? (
                            plannings && plannings.department_arb ? plannings.department_arb :
                            (plannings && plannings.department_arb !== null ? '' : plannings && plannings.department)
                          )
                        : (plannings && plannings.department)
                    }
                    name={arb ? 'department_arb': 'department'}
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

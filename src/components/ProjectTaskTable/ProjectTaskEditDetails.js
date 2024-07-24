import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import moment from 'moment';
import { Editor } from 'react-draft-wysiwyg';
import { ToastContainer } from 'react-toastify';
import ComponentCard from '../ComponentCard';

function PurchaseRequestEditDetails ({ projectTask, handleInputs, projectdetails, employeeProject, description, handleDataEditor, setDescription,arb,arabic,genLabel}) {
    PurchaseRequestEditDetails.propTypes = {
        projectTask: PropTypes.bool,
        handleInputs: PropTypes.func,
        projectdetails: PropTypes.bool,
        employeeProject: PropTypes.bool,
        description: PropTypes.bool,
        handleDataEditor: PropTypes.func,
        setDescription: PropTypes.bool,
        arb: PropTypes.any,
        arabic: PropTypes.any,
        genLabel: PropTypes.any,
  };
  return (
    <div>   
      <Form>
        <FormGroup>
        <ComponentCard title="Project Task Details" creationModificationDate={projectTask}>
            <ToastContainer></ToastContainer>
                <Form>
                  <Row>
                    <Col md="3">
                      <FormGroup>
                      
                        <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdProjectTask.Task Title')?.[genLabel]}
                <span className="required"> *</span>
              </Label>
                        <Input
                          type="text"
                          onChange={handleInputs}
                          value={
                            arb
                              ? (
                                  projectTask && projectTask.task_title_arb ? projectTask.task_title_arb :
                                  (projectTask && projectTask.task_title_arb !== null ? '' : projectTask && projectTask.task_title)
                                )
                              : (projectTask && projectTask.task_title)
                          }
                          name={arb ? 'task_title_arb': 'task_title'}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        
                        <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdProjectTask.Job Order Title')?.[genLabel]}
              </Label>
                        <Input
                          type="text"
                          onChange={handleInputs}
                          value={projectTask && projectTask.job_title}
                          name="job_title"
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                       
                        <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdProjectTask.Job Order Code')?.[genLabel]}
              </Label>
                        <Input
                          type="text"
                          onChange={handleInputs}
                          value={projectTask && projectTask.job_code}
                          name="job_code"
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        
                        <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdProjectTask.Project Name')?.[genLabel]}
              </Label>
          
                        <Input
                          type="select"
                          onChange={handleInputs}
                          value={projectTask && projectTask.project_id}
                          name="project_id"
                          disabled
                        >
                           <option value="" selected="selected">
                            Please Select
                          </option>
                          {projectdetails &&
                            projectdetails.map((e) => {
                              return (
                                <option key={e.project_id} value={e.project_id}>
                                  {arb?e.title_arb:e.title}
                                </option>
                              );
                            })}
                        </Input>
                      </FormGroup>
                    </Col>
                    {/* <Col md="3">
                      <FormGroup>
                        <Label>Company Name</Label>
                        <Input
                          type="select"
                          onChange={handleInputs}
                          value={projectTask && projectTask.company_id}
                          name="company_id"
                        >
                          <option defaultValue="selected">Please Select</option>
                          {companydetails &&
                            companydetails.map((e) => {
                              return (
                                <option key={e.company_id} value={e.company_id}>
                                  {e.company_name}
                                </option>
                              );
                            })}
                        </Input>
                      </FormGroup>
                    </Col> */}
                    
                    <Col md="3">
                      <FormGroup>
                       
                        <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdProjectTask.Staff Name')?.[genLabel]}
              </Label>
                        <Input
                          type="select"
                          name="employee_id"
                          onChange={handleInputs}
                          value={projectTask && projectTask.employee_id}
                        >
                          <option value="" selected="selected">Please Select</option>
                          {employeeProject &&
                            employeeProject.map((ele) => {
                              return (
                                <option key={ele.employee_id} value={ele.employee_id}>
                                  {arb?ele.first_name_arb:ele.first_name}
                                </option>
                              );
                            })}
                        </Input>
                      </FormGroup>
                    </Col>

                    <Col md="3">
                      <FormGroup>
                      
                        <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdProjectTask.Start Date')?.[genLabel]}
              </Label>
                        <Input
                          type="date"
                          onChange={handleInputs}
                          value={moment(projectTask && projectTask.start_date).format('YYYY-MM-DD')}
                          name="start_date"
                        />
                      </FormGroup>
                    </Col>
                    
                    <Col md="3">
                      <FormGroup>
                       
                        <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdProjectTask.End Date')?.[genLabel]}
              </Label>
                        <Input
                          type="date"
                          onChange={handleInputs}
                          value={moment(projectTask && projectTask.end_date).format('YYYY-MM-DD')}
                          name="end_date"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        
                        <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdProjectTask.Actual Comp Date')?.[genLabel]}
              </Label>
                        <Input
                          type="date"
                          onChange={handleInputs}
                          value={moment(projectTask && projectTask.actual_completed_date).format('YYYY-MM-DD')}
                          name="actual_completed_date"
                        />
                      </FormGroup>
                    </Col>
                    
                    <Col md="3">
                      <FormGroup>
                        
                        <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdProjectTask.Status')?.[genLabel]}
              </Label>
                        <Input
                          type="select"
                          onChange={handleInputs}
                          value={projectTask && projectTask.status}
                          name="status"
                        >
                          {' '}
                          <option value="" selected="selected">
                            Please Select
                          </option>
                          <option value="Pending">Pending</option>
                          <option value="InProgress">InProgress</option>
                          <option value="Completed">Completed</option>
                          <option value="OnHold">OnHold</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        
                        <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdProjectTask.Task Type')?.[genLabel]}
              </Label>
                        <Input
                          type="select"
                          onChange={handleInputs}
                          value={projectTask && projectTask.task_type}
                          name="task_type"
                        >
                          {' '}
                          <option value="" selected="selected">
                            Please Select
                          </option>
                          <option value="Development">Development</option>
                            <option value="ChangeRequest">ChangeRequest</option>
                            <option value="Issues">Issues</option>     
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                       
                        <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdProjectTask.Priority')?.[genLabel]}
              </Label>
                        <Input
                          type="select"
                          onChange={handleInputs}
                          value={projectTask && projectTask.priority}
                          name="priority"
                        >
                          {' '}
                          <option value="" selected="selected">
                            Please Select
                          </option>
                          <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option> 
                            <option value="4">4</option> 
                            <option value="5">5</option>     
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        
                        <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdProjectTask.Completion')?.[genLabel]}
              </Label>
                        <Input
                          type="text"
                          onChange={handleInputs}
                          value={
                            arb
                              ? (
                                  projectTask && projectTask.completion_arb ? projectTask.completion_arb :
                                  (projectTask && projectTask.completion_arb !== null ? '' : projectTask && projectTask.completion)
                                )
                              : (projectTask && projectTask.completion)
                          }
                          name={arb ? 'completion_arb': 'completion'}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                      
                        <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdProjectTask.Estimated Hours')?.[genLabel]}
              </Label>
                        <Input
                          type="number"
                          onChange={handleInputs}
                          value={
                            arb
                              ? (
                                  projectTask && projectTask.estimated_hours_arb ? projectTask.estimated_hours_arb :
                                  (projectTask && projectTask.estimated_hours_arb !== null ? '' : projectTask && projectTask.estimated_hours)
                                )
                              : (projectTask && projectTask.estimated_hours)
                          }
                          name={arb ? 'estimated_hours_arb': 'estimated_hours'}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="3">
                      <FormGroup>
                        
                        <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdProjectTask.Actual Hours')?.[genLabel]}
              </Label>
                        <Input
                          type="number"
                          onChange={handleInputs}
                          value={
                            arb
                              ? (
                                  projectTask && projectTask.actual_hours_arb ? projectTask.actual_hours_arb :
                                  (projectTask && projectTask.actual_hours_arb !== null ? '' : projectTask && projectTask.actual_hours)
                                )
                              : (projectTask && projectTask.actual_hours)
                          }
                          name={arb ? 'actual_hours_arb': 'actual_hours'}
                        />
                      </FormGroup>
                    </Col>

                  </Row>
                </Form>
             
              <ComponentCard title="Description">
                <Editor
                  editorState={description}
                  wrapperClassName="demo-wrapper mb-0"
                  editorClassName="demo-editor border mb-4 edi-height"
                  onEditorStateChange={(e) => {
                    handleDataEditor(e, 'description');
                    setDescription(e);
                  }}
                />
              </ComponentCard>
          </ComponentCard>
        </FormGroup>
      </Form>
    </div>
  );
}

export default PurchaseRequestEditDetails;

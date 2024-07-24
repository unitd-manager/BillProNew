import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  ModalBody,
  Modal,
  ModalHeader,
  ModalFooter,
  Form,
  Card,
  CardBody
} from 'reactstrap';
import PropTypes from 'prop-types';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import moment from 'moment';
import api from '../../constants/api';

const ProjectTimeSheetEdit = ({
  editModalss,
  setEditModalss,
   projectTimesheetId,
}) => {
  ProjectTimeSheetEdit.propTypes = {
    editModalss: PropTypes.bool,
    setEditModalss: PropTypes.func,
    projectTimesheetId: PropTypes.any
  };
console.log("projectTimesheetId",projectTimesheetId);
  //All state variable
  const [projecttime, setProjectTime] = useState();
 
  const [StaffDetail, setstaffDetail] = useState([]);
  const getEmployee = () => {
    api
      .get('/projecttask/getEmployeeName')
      .then((res) => {
        console.log(res.data.data);
        setstaffDetail(res.data.data);
      })
      .catch(() => {});
  };
 
  //milestone data in milestone
  const handleInputs = (e) => {
    setProjectTime({ ...projecttime, [e.target.name]: e.target.value });
  };
  const getTimeSheetById = () => {
    api
      .post('/projecttask/getTimeSheetByTimesheetId', { project_timesheet_id: projectTimesheetId })
      .then((res) => {
        setProjectTime(res.data.data[0]);
      })
      .catch(() => { });
  };
  const editTimeSheetProject = () => {
    api
      .post('/projecttask/editProjectTimesheet', projecttime)
      .then(() => {
        getTimeSheetById();
        setTimeout(() => {
          setEditModalss(false);
        }, 300);
      })
      .catch(() => {
      });
  };

 
  useEffect(() => {
       
    getTimeSheetById();
    getEmployee();
  }, [projectTimesheetId]);


 
  return (
    <Form>
      <Modal size="lg" isOpen={editModalss}>
        <ModalHeader>
          Employee Details
          <Button
            color="secondary"
            onClick={() => {
              setEditModalss(false);
            }}
          >
            X
          </Button>
        </ModalHeader>

        <ModalBody>
          {/* milestone Details */}
          <Row>
            <Col md="12">
              <Card>
                <CardBody>
                  <Form>
                    <Row>
                                         
                     
                      <Col md="4">
                        <FormGroup>
                          <Label> Staff Name</Label>
                          <Input
                            type="select"
                            onChange={handleInputs}
                            value={projecttime && projecttime.employee_id}
                            name="employee_id"
                          >
                            <option value="" selected>
                              Please Select
                            </option>
                            {StaffDetail &&
                              StaffDetail.map((e) => {
                                return (
                                  <option key={e.employee_id} value={e.employee_id}>
                                    {e.first_name}
                                  </option>
                                );
                              })}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label>Status</Label>
                          <Input
                            type="select"
                            name="status"
                            onChange={handleInputs}
                            value={projecttime && projecttime.status}
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
                      <Col md="4">
                        <FormGroup>
                          <Label>Date</Label>
                          <Input
                            type="date"
                            onChange={handleInputs}
                            value={
                              projecttime && moment(projecttime.date).format('YYYY-MM-DD')
                            }
                            name="date"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label>Hours</Label>
                          <Input
                            type="numbers"
                            onChange={handleInputs}
                            value={projecttime && projecttime.hours}
                            name="hours"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Label>Description</Label>
                          <Input
                            type="textarea"
                            onChange={handleInputs}
                            value={projecttime && projecttime.description}
                            name="description"
                          />
                        </FormGroup>
                      </Col>
                      
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Row>
            <div className="pt-3 mt-3 d-flex align-items-center gap-2">
              <Button
                color="primary"
                onClick={() => {
                  editTimeSheetProject();
                }}
              >
                Submit
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  setEditModalss(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </Row>
        </ModalFooter>
      </Modal>
    </Form>
  );
};

export default ProjectTimeSheetEdit;

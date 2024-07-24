import React, { useEffect, useState } from 'react';
import {
  Row,
  Form,
  Card,
  Table,
  Label,
  Input,
  Col,
  FormGroup,
  Button,
  CardBody,
  Modal,
  ModalFooter,
  ModalBody,
} from 'reactstrap';
import PropTypes from 'prop-types';
import * as Icon from 'react-feather';
import api from '../../constants/api';
import ProjectTimeSheetEdit from './ProjectTImeSheetEdit';


export default function ProjectTimeSheet({
  id,
  
}) {
  ProjectTimeSheet.propTypes = {
    id: PropTypes.any,

  };
  const [addContactModalss, setAddContactModalss] = useState(false);
  const [editModalss, setEditModalss] = useState(false);
  const [projecttime, setProjectTime] = useState();
  const getTimeSheetById = () => {
    api
      .post('/projecttask/getTimeSheetProjectTaskById', { project_task_id: id })
      .then((res) => {
        setProjectTime(res.data.data);
      })
      .catch(() => { });
  };
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
  const [editProjectTimesheetId, setEditProjectTimesheetId] = useState(null);

  // Function to set project_timesheet_id to edit
  const setProjectTimesheetIdToEdit = (timesheetId) => {
    setEditProjectTimesheetId(timesheetId);
  };
  // Gettind data from Job By Id
  const editJobById = () => {
    api
      .get('/jobinformation/getEmployee')
      .then((res) => {
        console.log(res.data.data);
        //setEmployee(res.data.data);
      })
      .catch(() => { });
  };
  const [insertTimeSheet, setInsertTimesheet] = useState({
   
  });

  const inserttimeSheets = () => {
    const newContactWithCompany = insertTimeSheet;
    newContactWithCompany.project_task_id = id;

    api
      .post('/projecttask/insertProjectTimesheet', newContactWithCompany)
      .then((res) => {
        const insertedDataId = res.data.data.insertId;
        console.log(insertedDataId);
        setTimeout(() => {
          setAddContactModalss(false);
        }, 300);
        window.location.reload();
      })
      .catch(() => {
      });
  };
  
  const handleInputsTime = (e) => {
    setInsertTimesheet({ ...insertTimeSheet, [e.target.name]: e.target.value });
  };
  // Api call for getting milestone dropdown based on project ID
 
  useEffect(() => {
    editJobById();
    getEmployee();
    getTimeSheetById();

  }, [id]);  

  //Structure of timeSheetById list view
  const Projecttimesheetcolumn = [
    {
      name: '#',
    },
    {
      name: 'Edit',
      selector: 'edit',
      cell: () => <Icon.Edit2 />,
    },
    {
      name: 'Delete',
      selector: 'edit',
      cell: () => <Icon.Trash2 />,
    },
    {
      name: 'Staff',
    },
    {
      name: 'Date',
    },
    {
      name: 'Hours',
    },
  
    {
      name: 'Status',
    },
    {
      name: 'Description',
    },

  ];
  const deleteTimesheet = (projectTimesheetId) => {
    api.delete('/projecttask/deleteProjectTimesheet', { data: { project_timesheet_id: projectTimesheetId } })
      .then(() => {
        // Handle success
       window.location.reload();
      })
      .catch((error) => {
        // Handle error
        console.error('Error deleting timesheet:', error);
      });
  };
  return (
    <>
    <div className="MainDiv">
    <div className=" pt-xs-25">
          <br />
           <Form>
        
           <Button color="primary" className="shadow-none" onClick={() => setAddContactModalss(true)}>
  Add New
</Button>
            <Modal size="lg" isOpen={addContactModalss} >
              <ModalBody>
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
                                  onChange={handleInputsTime}
                                  value={insertTimeSheet && insertTimeSheet.employee_id}
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
                            {/* <Col md="4">
                              <FormGroup>
                                <Label>Staff Name</Label>
                                <Input
                                  type="select"
                                  name="employee_id"
                                  onChange={handleInputsTime}
                                  value={insertTimeSheet && insertTimeSheet.employee_id} // Set the default employee name
                                > */}
                            {/* {insertTimeSheet && insertTimeSheet.employee_id ? ( // Render default employee name if it's set
                                    <option value={insertTimeSheet.employee_id}>
                                      {insertTimeSheet.employee_id}
                                    </option>
                                  ) : (
                                    <option  disabled>
                                      Select Staff Name
                                    </option>
                                  )} */}
                            {/* {StaffDetail &&
                                    StaffDetail.map((e) => (
                                      <option key={e.project_task_id} value={e.employee_id}>
                                        {e.first_name}
                                      </option>
                                    ))}
                                </Input>
                              </FormGroup>
                            </Col> */}
                            <Col md="4">
                              <FormGroup>
                                <Label>Date</Label>
                                <Input
                                  type="date"
                                  onChange={handleInputsTime}
                                  value={insertTimeSheet && insertTimeSheet.from_date}
                                  name="from_date"
                                />
                              </FormGroup>
                            </Col>
                            <Col md="4">
                              <FormGroup>
                                <Label>Hours</Label>
                                <Input
                                  type="number"
                                  onChange={handleInputsTime}
                                  value={insertTimeSheet && insertTimeSheet.hours}
                                  name="hours"
                                />
                              </FormGroup>
                            </Col>

                            <Col md="4">
                              <FormGroup>
                                <Label>Status</Label>
                                <Input
                                  type="select"
                                  name="status"
                                  onChange={handleInputsTime}
                                  value={insertTimeSheet && insertTimeSheet.status}
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
                                <Label>Description</Label>
                                <Input
                                  type="textarea"
                                  onChange={handleInputsTime}
                                  value={insertTimeSheet && insertTimeSheet.description}
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
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    inserttimeSheets();
                  }}
                >
                  Submit
                </Button>
                <Button
                  color="secondary"
                  className="shadow-none"
                  onClick={() => setAddContactModalss(false)}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
            <ProjectTimeSheetEdit
  setEditModalss={setEditModalss}
  editModalss={editModalss}
  id={id}
  projectTimesheetId={editProjectTimesheetId} // Pass the project_timesheet_id
></ProjectTimeSheetEdit>
            <Table id="example" className="display border border-secondary rounded">
        <thead>
          <tr>
            {Projecttimesheetcolumn.map((cell) => {
              return <td key={cell.name}>{cell.name}</td>;
            })}
          </tr>
        </thead>
        <tbody>
          {projecttime &&
            projecttime.map((element, index) => {
              return (
                <tr key={element.projecttimesheet_id}>
                  <td>{index + 1}</td>
                  
                  <td>
                    <span
                      onClick={() => {
                        setEditModalss(true);
                        setProjectTimesheetIdToEdit(element.project_timesheet_id);
                      }}
                    >
                      <Icon.Edit2 />
                    </span>
                  </td>
                  <td>
                    <span
                      onClick={() => deleteTimesheet(element.project_timesheet_id)}
                    >
                      <Icon.Trash2 />
                    </span>
                  </td>                           
                  {/* Modify the following block for the modification date */}
                  <td>{element.first_name}</td>
                  <td>{element.from_date}</td>
                  <td>{element.hours}</td>
                  <td>{element.status}</td>
                  <td>{element.description}</td>

                </tr>
              );
            })}
          
        </tbody>
      </Table>
      
      </Form>
      </div>
      </div>
      </>
  );
}

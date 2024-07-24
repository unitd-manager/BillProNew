import React, { useEffect, useState } from 'react';
import {
  Row,
  Form,
  ModalFooter,
  Modal,
  ModalHeader,
  ModalBody,
  Table,
  Label,
  Input,
  Col,
  FormGroup,
  Button,
} from 'reactstrap';
import PropTypes from 'prop-types';
import * as Icon from 'react-feather';
import moment from 'moment';
import api from '../constants/api';
import message from './Message';

export default function ProjectMilestones({
  addContactToggles,
  addContactModals,
  setEditTaskEditModals,
  id,
  milestoneById,
  setContactDatas,
  getMilestoneById,
}) {
  ProjectMilestones.propTypes = {
    addContactToggles: PropTypes.func,
    setEditTaskEditModals: PropTypes.func,
    addContactModals: PropTypes.bool,
    id: PropTypes.any,
    milestoneById: PropTypes.any,
    setContactDatas: PropTypes.func,
    getMilestoneById: PropTypes.func,
  };
  const [insertMilestones, setInsertMilestones] = useState({
    milestone_title: '',
    description: '',
    from_date: '',
    to_date: '',
    status: '',
  });

  //Milestone data in milestoneDetails
  const handleInputsmilestone = (e) => {
    setInsertMilestones({ ...insertMilestones, [e.target.name]: e.target.value });
  };
  //Insert Milestone
  const insertMilestone = () => {
    if (insertMilestones.milestone_title !== '') {
      const newContactWithCompanyId = insertMilestones;
      newContactWithCompanyId.project_id = id;
      api
        .post('/milestone/insertMilestone', newContactWithCompanyId)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          console.log(insertedDataId);
          message('Milestone inserted successfully.', 'success');
          getMilestoneById();
          setTimeout(() => {
            addContactToggles(false);
          }, 300);
          window.location.reload();
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      message('error');
    }
  };

  useEffect(() => {}, []);

  //  Table Contact
  const Milestonecolumn = [
    {
      name: 'ID',
    },
    {
      name: 'Edit',
      selector: 'edit',
      cell: () => <Icon.Edit2 />,
    },
    {
      name: 'Title',
    },
    {
      name: 'Description',
    },
    {
      name: 'From Date',
    },
    {
      name: 'To Date',
    },
    {
      name: 'Actual Comp Date',
    },
    {
      name: 'Status',
    },
  ];
  return (
    <Form>
      <Row>
        <Col md="3">
          <FormGroup>
            <Button color="primary" className="shadow-none" onClick={addContactToggles.bind(null)}>
              Add New{' '}
            </Button>
            <Modal size="lg" isOpen={addContactModals} toggle={addContactToggles.bind(null)}>
              <ModalHeader toggle={addContactToggles.bind(null)}>New Task</ModalHeader>
              <ModalBody>
                <Row>
                  <Col md="12">
                    <Form>
                      <Row>
                        <Col md="4">
                          <FormGroup>
                            <Label>Title</Label>
                            <Input
                              type="text"
                              name="milestone_title"
                              onChange={handleInputsmilestone}
                              value={insertMilestones && insertMilestones.milestone_title}
                            />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <Label>Description</Label>
                            <Input
                              type="text"
                              name="description"
                              onChange={handleInputsmilestone}
                              value={insertMilestones && insertMilestones.description}
                            />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <Label>from date</Label>
                            <Input
                              type="date"
                              onChange={handleInputsmilestone}
                              value={
                                insertMilestones &&
                                moment(insertMilestones.from_date).format('YYYY-MM-DD')
                              }
                              name="from_date"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <Label>to date</Label>
                            <Input
                              type="date"
                              onChange={handleInputsmilestone}
                              value={
                                insertMilestones &&
                                moment(insertMilestones.to_date).format('YYYY-MM-DD')
                              }
                              name="to_date"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <Label>Status</Label>
                            <Input
                              type="select"
                              name="status"
                              onChange={handleInputsmilestone}
                              value={insertMilestones && insertMilestones.status}
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
                      </Row>
                    </Form>
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    insertMilestone();
                  }}
                >
                  Submit
                </Button>
                <Button
                  color="secondary"
                  className="shadow-none"
                  onClick={addContactToggles.bind(null)}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Table id="example" className="display border border-secondary rounded">
          <thead>
            <tr>
              {Milestonecolumn.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {milestoneById &&
              milestoneById.map((element, index) => {
                return (
                  <tr key={element.project_milestone_id}>
                    <td>{index + 1}</td>
                    <td>
                      <span
                        onClick={() => {
                          setContactDatas(element);
                          setEditTaskEditModals(true);
                        }}
                      >
                        <Icon.Edit2 />
                      </span>
                    </td>
                    <td>{element.milestone_title}</td>
                    <td>{element.description}</td>
                    <td>
                      {element.from_date ? moment(element.from_date).format('DD-MM-YYYY') : ''}
                    </td>
                    <td>{element.to_date ? moment(element.to_date).format('DD-MM-YYYY') : ''}</td>
                    <td>
                      {element.actual_completed_date
                        ? moment(element.actual_completed_date).format('DD-MM-YYYY')
                        : ''}
                    </td>
                    <td>{element.status}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Row>
    </Form>
  );
}

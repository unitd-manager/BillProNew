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
} from 'reactstrap';
import PropTypes from 'prop-types';
import '../views/form-editor/editor.scss';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import moment from 'moment';
import message from './Message';
import api from '../constants/api';

const ProjectMilestoneEdit = ({
  editTaskEditModals,
  setEditTaskEditModals,
  contactData,
  getMilestone,
}) => {
  ProjectMilestoneEdit.propTypes = {
    editTaskEditModals: PropTypes.bool,
    setEditTaskEditModals: PropTypes.func,
    contactData: PropTypes.object,
    getMilestone: PropTypes.func,
  };

  //All state variable
  const [milestoneEdit, setMilestoneEdit] = useState();

  //milestone data in milestone
  const handleInputs = (e) => {
    setMilestoneEdit({ ...milestoneEdit, [e.target.name]: e.target.value });
  };

  const editMilestones = () => {
    api
      .post('/milestone/editMilestone', milestoneEdit)
      .then(() => {
        message('Record editted successfully', 'success');
        getMilestone();
        setTimeout(() => {
          setEditTaskEditModals(false);
        }, 300);
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  useEffect(() => {
    setMilestoneEdit(contactData);
  }, [contactData]);

  return (
    <>
      <Modal size="lg" isOpen={editTaskEditModals}>
        <ModalHeader>
          Milestone Details
          <Button
            color="secondary"
            onClick={() => {
              setEditTaskEditModals(false);
            }}
          >
            X
          </Button>
        </ModalHeader>

        <ModalBody>
          {/* milestone Details */}
          <Form>
            <FormGroup>
              {' '}
              <div>
                <Form>
                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <Label>Title</Label>
                        <Input
                          type="text"
                          onChange={handleInputs}
                          value={milestoneEdit && milestoneEdit.milestone_title}
                          name="milestone_title"
                        />
                      </FormGroup>
                    </Col>

                    <Col md="4">
                      <FormGroup>
                        <Label>From date</Label>
                        <Input
                          type="date"
                          onChange={handleInputs}
                          value={moment(milestoneEdit && milestoneEdit.from_date).format(
                            'YYYY-MM-DD',
                          )}
                          name="from_date"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>To date</Label>
                        <Input
                          type="date"
                          onChange={handleInputs}
                          value={moment(milestoneEdit && milestoneEdit.to_date).format(
                            'YYYY-MM-DD',
                          )}
                          name="to_date"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Actual Comp Date</Label>
                        <Input
                          type="date"
                          onChange={handleInputs}
                          value={moment(
                            milestoneEdit && milestoneEdit.actual_completed_date,
                          ).format('YYYY-MM-DD')}
                          name="actual_completed_date"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Status</Label>
                        <Input
                          type="select"
                          name="status"
                          onChange={handleInputs}
                          value={milestoneEdit && milestoneEdit.status}
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
                    <Col md="12">
                      <FormGroup>
                        <Label>Description</Label>
                        <Input
                          type="textarea"
                          onChange={handleInputs}
                          value={milestoneEdit && milestoneEdit.description}
                          name="description"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </div>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Row>
            <div className="pt-3 mt-3 d-flex align-items-center gap-2">
              <Button
                color="primary"
                onClick={() => {
                  editMilestones();
                }}
              >
                Submit
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  setEditTaskEditModals(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </Row>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ProjectMilestoneEdit;

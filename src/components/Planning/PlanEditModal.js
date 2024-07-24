import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import {
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  ModalBody,
  ModalFooter,
  Modal,
  ModalHeader,
} from 'reactstrap';
import PropTypes from 'prop-types';
import message from '../Message';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../../views/form-editor/editor.scss';

import api from '../../constants/api';

const PlanEditModal = ({ planData, editPlanEditModal, setPlanEditModal }) => {
  PlanEditModal.propTypes = {
    planData: PropTypes.object,
    editPlanEditModal: PropTypes.bool,
    setPlanEditModal: PropTypes.func,
  };

  const [PlaniEdit, setPlanEdit] = useState(null);

  const handleInputs = (e) => {
    setPlanEdit({ ...PlaniEdit, [e.target.name]: e.target.value });
  };

  //Logic for edit data in db

  const editCpanelsData = () => {
    api
      .post('/planning/editPlanningCpanel', PlaniEdit)
      .then(() => {
        message('Record editted successfully', 'success');
         window.location.reload();
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  useEffect(() => {
    setPlanEdit(planData);
  }, [planData]);

  return (
    <>
      <Modal size="lg" isOpen={editPlanEditModal}>
        <ModalHeader>
          CpanelDetails
          <Button
            color="secondary"
            onClick={() => {
              setPlanEditModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>

        <ModalBody>
          <Row>
            <Col md="3" className="mb-4 d-flex justify-content-between"></Col>
          </Row>
          <Row>
                           <Col md="4">
                              <FormGroup>
                                <Label>FG Code</Label>
                                <Input
                                  type="text"
                                  name="fg_code"
                                  onChange={handleInputs}
                                  value={PlaniEdit && PlaniEdit.fg_code}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="4">
                              <FormGroup>
                                <Label>Cpanel Name</Label>
                                <Input
                                  type="text"
                                  name="cpanel_name"
                                  onChange={handleInputs}
                                  value={PlaniEdit && PlaniEdit.cpanel_name}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="4">
                              <FormGroup>
                                <Label>Ordered Qty</Label>
                                <Input
                                  type="text"
                                  name="ordered_qty"
                                  onChange={handleInputs}
                                  value={PlaniEdit && PlaniEdit.ordered_qty}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="4">
                              <FormGroup>
                                <Label>Priority</Label>
                                <Input
                                  type="text"
                                  name="priority"
                                  onChange={handleInputs}
                                  value={PlaniEdit && PlaniEdit.priority}
                                />
                              </FormGroup>
                            </Col>
                            </Row>
                            <Row>
                            <Col md="4">
                              <FormGroup>
                                <Label>Start Date</Label>
                                <Input
                                  type="date"
                                  name="start_date"
                                  onChange={handleInputs}
                                  value={PlaniEdit && PlaniEdit.start_date}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="4">
                              <FormGroup>
                                <Label>End Date</Label>
                                <Input
                                  type="date"
                                  name="end_date"
                                  onChange={handleInputs}
                                  value={PlaniEdit && PlaniEdit.end_date}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="4">
                              <FormGroup>
                                <Label>Due Date</Label>
                                <Input
                                  type="date"
                                  name="due_date"
                                  onChange={handleInputs}
                                  value={PlaniEdit && PlaniEdit.due_date}
                                />
                              </FormGroup>
                            </Col>
                            </Row>
        </ModalBody>

        <ModalFooter>
        
              <Button
                color="primary"
                onClick={() => {
                  editCpanelsData();
                }}
              >
                Submit
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  setPlanEditModal(false);
                }}
              >
                Cancel
              </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default PlanEditModal;

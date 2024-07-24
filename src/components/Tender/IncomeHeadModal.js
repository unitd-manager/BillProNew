import React, { useEffect, useState } from 'react';
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

//  Modal insert
const IncomeHeadModal = ({ incomeData, IncomeSuphead, SetIncomeSuphead }) => {
  IncomeHeadModal.propTypes = {
    incomeData: PropTypes.object,
    IncomeSuphead: PropTypes.bool,
    SetIncomeSuphead: PropTypes.func,
  };
  //Const Variables
  const [Income, SetIncome] = useState(null);
  //Setting data in Income
  const handleInputs = (e) => {
    SetIncome({ ...Income, [e.target.name]: e.target.value });
  };
  //Logic for edit data in db
  const IncomeData = () => {
    api
      .post('/incomehead/editsubIncomeHead', Income)
      .then(() => {
        message('Record editted successfully', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 300);
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };
  useEffect(() => {
    SetIncome(incomeData);
  }, [incomeData]);

  return (
    <>
      <Modal size="lg" isOpen={IncomeSuphead}>
        <ModalHeader>
          New Sub Head
          <Button
            color="secondary"
            onClick={() => {
              SetIncomeSuphead(false);
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
            <Col md="6">
              <FormGroup>
                <Label>Title</Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={Income && Income.title}
                  name="title"
                />
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>

        <ModalFooter>
          <Row>
            <div className="pt-3 mt-3 d-flex align-items-center gap-2">
              <Button
                color="primary"
                onClick={() => {
                  IncomeData();
                }}
              >
                Submit
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  SetIncomeSuphead(false);
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

export default IncomeHeadModal;

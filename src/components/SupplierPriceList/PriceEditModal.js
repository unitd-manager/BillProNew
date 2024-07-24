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

const PlanEditModal = ({ planData, editPlanEditModal, setPlanEditModal,arb,arabic }) => {
  PlanEditModal.propTypes = {
    planData: PropTypes.object,
    editPlanEditModal: PropTypes.bool,
    setPlanEditModal: PropTypes.func,
    arb: PropTypes.any,
    arabic: PropTypes.any,
  };
  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }
  const [PlaniEdit, setPlanEdit] = useState(null);

  const handleInputs = (e) => {
    setPlanEdit({ ...PlaniEdit, [e.target.name]: e.target.value });
  };

  //Logic for edit data in db

  const editCpanelsData = () => {
    api
      .post('/supplierpricelistitem/editPriceListItem', PlaniEdit)
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
          PriceDetails
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
                                <Label>
                                {arabic.find((item) => item.key_text === 'mdSupplierPriceList.ProductName')?.[genLabel]}
                                </Label>
                                <Input
                                  type="text"
                                  name="title"
                                  onChange={handleInputs}
                                  value={PlaniEdit && PlaniEdit.title}
                                  disabled
                                />
                              </FormGroup>
                            </Col>
                            <Col md="4">
                              <FormGroup>
                                <Label>{arabic.find((item) => item.key_text === 'mdSupplierPriceList.Price')?.[genLabel]}</Label>
                                <Input
                                  type="text"
                                  name="price"
                                  onChange={handleInputs}
                                  value={PlaniEdit && PlaniEdit.price}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="4">
                              <FormGroup>
                                <Label>{arabic.find((item) => item.key_text === 'mdSupplierPriceList.Unit')?.[genLabel]}</Label>
                                <Input
                                  type="select"
                                  name="unit"
                                  onChange={handleInputs}
                                  value={PlaniEdit && PlaniEdit.unit}
                                  >
                                  <option defaultValue="selected">Please Select</option>
                                  <option value="KGS">KGS</option>
                                  <option value="PCS">PCS</option>
                                  <option value="EA">EA</option>
                                  <option value="NOS">NOS</option>
                                  <option value="BOX">BOX</option>
                                </Input>
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
                
                {arb?'يُقدِّم':'Submit'}
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  setPlanEditModal(false);
                }}
              >
                
                {arb?'يلغي':'Cancel'}
              </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default PlanEditModal;

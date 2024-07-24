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

const PlanEditModal = ({ planData, editPlanEditModal, setPlanEditModal, arb, arabic, genLabel, unitdetails }) => {
  PlanEditModal.propTypes = {
    planData: PropTypes.object,
    editPlanEditModal: PropTypes.bool,
    setPlanEditModal: PropTypes.func,
    arb: PropTypes.any,
    arabic: PropTypes.any,   
    genLabel: PropTypes.any,
    unitdetails: PropTypes.array,
  };

  const [PlaniEdit, setPlanEdit] = useState(null);

  const handleInputs = (e) => {
    setPlanEdit({ ...PlaniEdit, [e.target.name]: e.target.value });
  };

  //Logic for edit data in db

  const editCpanelsData = () => {
    api
      .post('/pricelistitem/editPriceListItem', PlaniEdit)
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
        {arb ? 'تحرير قائمة الأسعار': 'Price Details'}
          
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
                              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdPriceList.ProductName')?.[genLabel]}
              </Label>
              <Input
                    type="text"
                    onChange={handleInputs}
                    disabled
                    value={
                      arb
                        ? (
                          PlaniEdit && PlaniEdit.title_arb ? PlaniEdit.title_arb :
                            (PlaniEdit && PlaniEdit.title_arb !== null ? '' : PlaniEdit && PlaniEdit.title)
                          )
                        : (PlaniEdit && PlaniEdit.title)
                    }
                    name={arb ? 'title_arb' : 'title'}
                   />
                   </FormGroup>
                            </Col>
                            <Col md="4">
                              <FormGroup>
                              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdPriceList.Price')?.[genLabel]}
              </Label><span className='required'>*</span>
                                <Input
                                  type="text"
                                  name={arb ? 'price_arb' : 'price'}
                                  onChange={handleInputs}
                                  value={
                                    arb
                                      ? (
                                        PlaniEdit && PlaniEdit.price_arb ? PlaniEdit.price_arb :
                                          (PlaniEdit && PlaniEdit.price_arb !== null ? '' : PlaniEdit && PlaniEdit.price)
                                        )
                                      : (PlaniEdit && PlaniEdit.price)
                                  }
                                />
                              </FormGroup>
                            </Col>
                            <Col md="4">
                              <FormGroup>
                                <Label>Unit</Label>
                                <Input
                                  type="select"
                                  onChange={handleInputs}
                                  value={
                                    arb
                                      ? (
                                        PlaniEdit && PlaniEdit.unit_arb ? PlaniEdit.unit_arb :
                                          (PlaniEdit && PlaniEdit.unit_arb !== null ? '' : PlaniEdit && PlaniEdit.unit)
                                        )
                                      : (PlaniEdit && PlaniEdit.unit)
                                  }
                                  name={arb ? 'unit_arb' : 'unit'}
                                >
                                   <option defaultValue="selected">{arb ? 'الرجاء التحديد': 'Please Select'}</option>
                  {unitdetails &&
                    unitdetails.map((ele) => {
                      return (
                        <option key={arb && ele.value_arb ?ele.value_arb : ele.value} value={arb && ele.value_arb ?ele.value_arb : ele.value}>
                          {arb && ele.value_arb ?ele.value_arb : ele.value}
                        </option>
                        );
                      })}
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

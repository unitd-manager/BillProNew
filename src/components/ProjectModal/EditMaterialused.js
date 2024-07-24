import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  FormGroup,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Form,
} from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import api from '../../constants/api';

const EditMaterialused = ({ editMaterialsUsed, setEditMaterialsUsed, FetchMaterialsUsed,getTableData }) => {
  EditMaterialused.propTypes = {
    editMaterialsUsed: PropTypes.bool,
    setEditMaterialsUsed: PropTypes.func,
    FetchMaterialsUsed: PropTypes.object,
    getTableData: PropTypes.func
  };

  const [editMaterialsUsedData, setEditMaterialsUsedData] = useState(null);

  const handleEditMaterialsUsedInputs = (e) => {
    setEditMaterialsUsedData({ ...editMaterialsUsedData, [e.target.name]: e.target.value });
  };

  const EditMaterialusedData = () => {
    api
      .post('/projecttabmaterialusedportal/editTabMaterialUsedPortal', editMaterialsUsedData)
      .then(() => {
        setEditMaterialsUsed();
          setTimeout(() => { 
            getTableData()
          },1000)
    });
  };

  useEffect(() => {
    setEditMaterialsUsedData(FetchMaterialsUsed);
  }, [FetchMaterialsUsed]);

  return (
    <div>
      <Modal isOpen={editMaterialsUsed}>
        <ModalHeader>Edit Material Used
        <Button
            color="secondary"
            onClick={() => {
              setEditMaterialsUsed();
            }}
          >
            {' '}
            X{' '}
          </Button>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
                  <Form>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <Label>Date</Label>
                          <Input
                            type="date"
                            name="date"
                            defaultValue={moment( editMaterialsUsedData && editMaterialsUsedData.creation_date
                            ).format('YYYY-MM-DD')}
                            onChange={handleEditMaterialsUsedInputs}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="12">
                        <FormGroup>
                          <Label>Title</Label>
                          <Input
                            type="text"
                            name="title"
                            defaultValue={editMaterialsUsedData?.title}
                            onChange={handleEditMaterialsUsedInputs}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="12">
                        <FormGroup>
                          <Label>Type</Label>
                          <Input
                            type="text"
                            name="product_type"
                            readonly="readonly"
                            defaultValue={
                              editMaterialsUsedData?.product_type
                            }
                            onChange={handleEditMaterialsUsedInputs}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="12">
                        <FormGroup>
                          <Label>Stock</Label>
                          <Input
                            type="text"
                            name="stock"
                            readonly="readonly"
                            defaultValue={
                              editMaterialsUsedData?.qty_in_stock
                            }
                            onChange={handleEditMaterialsUsedInputs}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="12">
                        <FormGroup>
                          <Label>UoM</Label>
                          <Input
                            type="text"
                            name="unit"
                            defaultValue={editMaterialsUsedData?.unit}
                            onChange={handleEditMaterialsUsedInputs}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="12">
                        <FormGroup>
                          <Label>Quantity</Label>
                          <Input
                            type="number"
                            name="quantity"
                            defaultValue={editMaterialsUsedData?.quantity}
                            onChange={handleEditMaterialsUsedInputs}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="12">
                        <FormGroup>
                          <Label>Remarks</Label>
                          <Input
                            type="text"
                            name="description"
                            defaultValue={editMaterialsUsedData?.remark}
                            onChange={handleEditMaterialsUsedInputs}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="shadow-none"
            onClick={() => {
              EditMaterialusedData();
            }}
          >
            {' '}
            Submit{' '}
          </Button>
          <Button
            color="secondary"
            className="shadow-none"
            onClick={() => {
              setEditMaterialsUsed(false);
            }}
          >
            {' '}
            Cancel{' '}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default EditMaterialused;

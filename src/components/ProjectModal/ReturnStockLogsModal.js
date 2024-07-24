import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  FormGroup,
  Row,
  Col,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
} from 'reactstrap';
import api from '../../constants/api';
import message from '../Message';

function ReturnStockLogsModal({  returnItemLogsModal,setReturnItemLogsModal,returnItem }) {
  ReturnStockLogsModal.propTypes = {
    returnItemLogsModal:PropTypes.bool,
    setReturnItemLogsModal:PropTypes.func,
    returnItem:PropTypes.object
  };

const[returnLogs,setReturnLogs]=useState([]);

  //get line items
  const getProduct = () => {
    api
      .post('/projecttabmaterialusedportal/returnStockLogs', { project_materials_id: returnItem.project_materials_id })
      .then((res) => {
        setReturnLogs(res.data.data);
      })
      .catch(() => {
        message('unable to get products', 'error');
      });
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      <Modal isOpen={returnItemLogsModal}>
        <ModalHeader>Return To Stock</ModalHeader>
        <ModalBody>
          
          <Form className="mt-4">
        <Row className="border-bottom mb-3">
        
          <Col>
            <FormGroup>
              <Label>Quantity Returned</Label>{' '}
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Updated By</Label>{' '}
            </FormGroup>
          </Col>
         
        </Row>
      </Form>
      {returnLogs &&
        returnLogs.map((res) => {
          return (
            <Row key={res.project_materials_id}>
              <Col>
                <FormGroup>{res.quantity}</FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <span>{res.created_by}</span>
                </FormGroup>
              </Col>
              
              </Row>)})}
              
        </ModalBody>
        <ModalFooter>
         
          <Button
            color="secondary"
            className="shadow-none"
            onClick={() => {
                setReturnItemLogsModal(false);
            }}
          >
            {' '}
            Cancel{' '}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ReturnStockLogsModal;

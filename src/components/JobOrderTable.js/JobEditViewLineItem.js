import React, { useState } from 'react';
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Input,
  Button,
  ModalFooter,
} from 'reactstrap';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../constants/api';
import message from '../Message';

const JobEditViewLineItem = ({ editjobLineModal, setEditJobLineModal, FetchLineItemData }) => {
  JobEditViewLineItem.propTypes = {
    editjobLineModal: PropTypes.bool,
    setEditJobLineModal: PropTypes.func,
    FetchLineItemData: PropTypes.object,
  };

  const {id}=useParams();
  const [JoblineItemData, setJobLineItemData] = useState(null);
  const [totalAmount, setTotalAmount] = useState();
  
  const handleData = (e) => {
    setJobLineItemData({ ...JoblineItemData, [e.target.name]: e.target.value });
  };
  
  const handleCalc = (Qty, UnitPrice, TotalPrice) => {
    if (!Qty) Qty = 0;
    if (!UnitPrice) UnitPrice = 0;
    if (!TotalPrice) TotalPrice = 0;

    setTotalAmount(parseFloat(Qty) * parseFloat(UnitPrice));
  };
  

  const UpdateJobData = () => {
    JoblineItemData.quote_id=id;
    JoblineItemData.amount = parseFloat(JoblineItemData.quantity) * parseFloat(JoblineItemData.unit_price) 
    api
      .post('/tender/edit-TabQuoteLine', JoblineItemData)
      .then((res) => {
        console.log('edit Line Item', res.data.data);
        message('Edit Line Item Updated Successfully.', 'success');
        window.location.reload()
      })
      .catch(() => {
        message('Unable to edit Job. please fill all fields', 'error');
      });
  };

  React.useEffect(() => {
    setJobLineItemData(FetchLineItemData);
  }, [FetchLineItemData]);

  return (
    <>
      <Modal isOpen={editjobLineModal}>
        <ModalHeader>Line Items</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Row>
              <Label sm="2">Title</Label>
              <Col sm="10">
                <Input
                  type="text"
                  name="title"
                  defaultValue={JoblineItemData && JoblineItemData.title}
                  onChange={handleData}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label sm="2">Description</Label>
              <Col sm="10">
                <Input
                  type="textarea"
                  name="description"
                  defaultValue={JoblineItemData && JoblineItemData.description}
                  onChange={handleData}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label sm="2">Qty</Label>
              <Col sm="10">
                <Input
                  type="textarea"
                  name="quantity"
                  defaultValue={JoblineItemData && JoblineItemData.quantity}
                  onChange={(e)=>{handleData(e);
                    handleCalc(e.target.value, JoblineItemData.unit_price,JoblineItemData.amount
                      )}}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label sm="2">UOM</Label>
              <Col sm="10">
                <Input
                  type="textarea"
                  name="unit"
                  defaultValue={JoblineItemData && JoblineItemData.unit}
                  onChange={handleData}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label sm="2">Unit Price</Label>
              <Col sm="10">
                <Input
                  type="text"
                  name="unit_price"
                  defaultValue={JoblineItemData && JoblineItemData.unit_price}
                  onChange={(e)=>{handleData(e);
                    handleCalc(JoblineItemData.quantity,e.target.value,JoblineItemData.amount)
                  }}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label sm="2">Total Price</Label>
              <Col sm="10">
                <Input
                  type="text"
                  name="amount"
                  value={totalAmount || JoblineItemData && JoblineItemData.amount}
                  onChange={(e)=>{handleData(e);
                    handleCalc(JoblineItemData.quantity,JoblineItemData.unit_price,e.target.value)
                  }}
                  disabled
                />
              </Col>
            </Row>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="shadow-none"
            type="button"
            onClick={() => {
              UpdateJobData();
              setEditJobLineModal(false);
            }}
          >
            Save & Continue
          </Button>
          <Button
            color="secondary"
            className="shadow-none"
            onClick={() => {
              setEditJobLineModal(false);
            }}
          >
            {' '}
            Cancel{' '}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default JobEditViewLineItem;

import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  Button,
  ModalBody,
} from 'reactstrap';
import PropTypes from 'prop-types';
import api from '../../constants/api';
import message from '../Message';

// import { TimePicker } from '@mui/lab';

export default function ProjectInvoiceItem({ editModal, setEditModal,ItemsId }) {
  InvoiceItem.propTypes = {
    // editInvoiceModal: PropTypes.any,
    editModal: PropTypes.bool,
    setEditModal: PropTypes.func,
    ItemsId: PropTypes.any,
  };
  console.log('items',ItemsId);
  const [itemDetail, setEditItemDetail] = useState({
    project_invoice_item_id: '', // Initialize with the correct default value
    item_title: '',
    description: '',
    total_cost: '',
  });
  const handleInputs = (e) => {
    setEditItemDetail({
      ...itemDetail,
      [e.target.name]: e.target.value,
    });
  };
  const editItemByItemId = () => {
    api
      .post('/projectsalesinvoice/getInvoiceByInvoiceItemId', { project_invoice_item_id: ItemsId })
      .then((res) => {
        setEditItemDetail(res.data.data[0]);
      })
      .catch(() => {});
  };

  const editBookingData = () => {
    const updatedItemDetail = {
      ...itemDetail,
      invoice_item_id: ItemsId, // Include the ItemsId in the payload
    };
  
    api
      .post('/projectsalesinvoice/editInvoiceItems', updatedItemDetail)
      .then(() => {
        message('Record edited successfully', 'success');
        editItemByItemId(); // Refresh the data after editing
        window.location.reload();
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  useEffect(() => {
    editItemByItemId();
  }, []);

  return (
    <>
      <Modal size="xl" isOpen={editModal}>
        <ModalHeader>
          Create Invoice Item
          <Button
            className="shadow-none"
            color="secondary"
            onClick={() => {
              setEditModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Row className="border-bottom mb-3">
                <Col md="3">
                  <FormGroup>
                    <Label>
                      Description <span className="required"> *</span>
                    </Label>
                    <Input
                      type="text"
                      value={itemDetail && itemDetail.description}
                      onChange={handleInputs}
                      name="description"
                    ></Input>
                  </FormGroup>
                </Col>
               
              </Row>
              <Button
                className="shadow-none"
                color="primary"
                onClick={() => {
                  editBookingData();
                }}
              >
                {' '}
                Submit{' '}
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
}

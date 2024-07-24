import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Form,
} from 'reactstrap';
import { useParams } from 'react-router-dom';
import api from '../../constants/api';
import message from '../Message';


export default function BookingEditCustomerModal({ editcustomermodal, setEditCustomerModal}) {
    BookingEditCustomerModal.propTypes = {
        editcustomermodal: PropTypes.bool,
        setEditCustomerModal: PropTypes.func,
        
  };
  const { id } = useParams();
  const [editcustomerdetails, setEditCustomerDetails] = useState({ booking_id: id});

  //Setting Data in Vehicle Fuel
  const handleInputs = (e) => {
    setEditCustomerDetails({
      ...editcustomerdetails,
      [e.target.name]: e.target.value,
    });
  };

  //Api call for getting Vehicle Fuel Data By ID
  const getCustomerDetailsById = () => {
    api
      .post('/booking/getCompanyDataById', { booking_id: id })
      .then((res) => {
    setEditCustomerDetails(res.data.data[0]);
      })
      .catch(() => {
        message('Customer Data Not Found', 'info');
      });
  };

  const editCustomerData = () => {
    if (editcustomerdetails.company_name !== '' && editcustomerdetails.booking_date !== '') {
      api
        .post('/booking/edit-Company', editcustomerdetails)
        .then(() => {
          message('Record editted successfully', 'success');
          getCustomerDetailsById();
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };
//   useEffect for Vehicle Fuel
  useEffect(() => {
    getCustomerDetailsById();
  }, [id]);
  return (
    <Modal size="1" isOpen={editcustomermodal}>
        <ModalHeader>
          Edit Customer
          <Button
            color="secondary"
            onClick={() => {
        setEditCustomerModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>

      <ModalBody>
        <Row>
          <Col md="12">
            <Form>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <Label>
                      Customer Name 
                    </Label>
                    <Input type="text" name="company_name" 
                    value={editcustomerdetails && editcustomerdetails.company_name}
                    onChange={handleInputs} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <Label>
                      {' '}
                      Phone 
                    </Label>
                    <Input type="text" name="phone" 
                     value={editcustomerdetails && editcustomerdetails.phone}
                     onChange={handleInputs} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <Label>Website</Label>
                    <Input type="text" name="website" 
                    value={editcustomerdetails && editcustomerdetails.website}
                    onChange={handleInputs} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <Label>
                      Address 1
                    </Label>
                    <Input
                      type="text"
                      name="address_flat"
                      placeholder=" "
                      onChange={handleInputs}
                      value={editcustomerdetails && editcustomerdetails.address_flat}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <Label>Address 2</Label>
                    <Input
                      type="text"
                      name="address_street"
                      placeholder=" "
                      onChange={handleInputs}
                      value={editcustomerdetails && editcustomerdetails.address_street}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <Label>Area</Label>
                    <Input
                      type="text"
                      name="address_town"
                      
                      onChange={handleInputs}
                      value={editcustomerdetails && editcustomerdetails.address_town}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <Label>Zipcode</Label>
                    <Input
                      type="text"
                      name="address_state"
                      placeholder=" "
                      onChange={handleInputs}
                      value={editcustomerdetails && editcustomerdetails.address_state}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <Label>Latitude</Label>
                    <Input type="text" name="latitude" placeholder=" " 
                    value={editcustomerdetails && editcustomerdetails.latitude}
                    onChange={handleInputs} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <Label>Longitude</Label>
                    <Input type="text" name="longitude" 
                    value={editcustomerdetails && editcustomerdetails.longitude}
                    placeholder=" " onChange={handleInputs} />
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
            editCustomerData();
            setEditCustomerModal(false);
          }}
        >
          Save
        </Button>
        <Button
            color="secondary"
            onClick={() => {
                setEditCustomerModal(false);
            }}
          >
            Cancel
          </Button>
      </ModalFooter>
    </Modal>
  );
}

import React from 'react';
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

export default function BookingMoreDetails({ toggle, handleInputs, insertCompany, modal }) {
  BookingMoreDetails.propTypes = {
    toggle: PropTypes.func,
    handleInputs: PropTypes.func,
    insertCompany: PropTypes.func,
    modal: PropTypes.any,
  };
  return (
    <Modal size="l" isOpen={modal} toggle={toggle.bind(null)}>
      <ModalHeader toggle={toggle.bind(null)}>New Customer</ModalHeader>
      <ModalBody>
        <Row>
          <Col md="12">
            <Form>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <Label>
                      Customer Name <span className="required"> *</span>
                    </Label>
                    <Input type="text" name="company_name" onChange={handleInputs} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <Label>
                      {' '}
                      Phone <span className="required"> *</span>
                    </Label>
                    <Input type="text" name="phone" onChange={handleInputs} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <Label>Website</Label>
                    <Input type="text" name="website" onChange={handleInputs} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <Label>
                      Address 1<span className="required"> *</span>
                    </Label>
                    <Input
                      type="text"
                      name="address_flat"
                      placeholder=" "
                      onChange={handleInputs}
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
                      placeholder=" "
                      onChange={handleInputs}
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
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <Label>Latitude</Label>
                    <Input type="text" name="latitude" placeholder=" " onChange={handleInputs} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <Label>Longitude</Label>
                    <Input type="text" name="longitude" placeholder=" " onChange={handleInputs} />
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
            insertCompany();
          }}
        >
          Save
        </Button>
        <Button color="dark" className="shadow-none" onClick={toggle.bind(null)}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

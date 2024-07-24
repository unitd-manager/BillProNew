import React from 'react';
import { Row, Col, Button, FormGroup, Label, Input, Form } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../ComponentCard';
import ComponentCardV2 from '../ComponentCardV2';

function InventoryEditPart({ inventoryDetails, handleInputs, editinventoryData }) {
  InventoryEditPart.propTypes = {
    inventoryDetails: PropTypes.object,
    handleInputs: PropTypes.func,
    editinventoryData: PropTypes.func,
  };
  //navigation
  const navigate = useNavigate();
  // Route Change
  const applyChanges = () => {};
  const backToList = () => {
    navigate('/Inventory');
  };
  return (
    <div>
      <Row>
        <BreadCrumbs heading={inventoryDetails && inventoryDetails.title} disabled />
        <ToastContainer></ToastContainer>
        <Form>
          <FormGroup>
            <ComponentCardV2>
              <Row>
                <Col>
                  <Button
                    className="shadow-none"
                    color="primary"
                    onClick={() => {
                      editinventoryData();
                      navigate(`/Inventory`);
                    }}
                  >
                    Save
                  </Button>
                </Col>
                <Col>
                  <Button
                    className="shadow-none"
                    color="primary"
                    onClick={() => {
                      editinventoryData();
                      applyChanges();
                    }}
                  >
                    Apply
                  </Button>
                </Col>
                <Col>
                  <Button
                    className="shadow-none"
                    color="dark"
                    onClick={() => {
                      backToList();
                    }}
                  >
                    {' '}
                    Back to List{' '}
                  </Button>
                </Col>
              </Row>
            </ComponentCardV2>

            <ComponentCard
              title="Product Details" creationModificationDate={inventoryDetails}>
              {/* righttitle={
                <Row>
                  <Col className="fs-10 small">
                    <small>Creation :</small>
                    <small>
                      {inventoryDetails && inventoryDetails.created_by}
                      {inventoryDetails && inventoryDetails.creation_date}
                    </small>
                  </Col>

                  <Col className="fs-10 small">
                    <small>Modification :</small>

                    <small>
                      {inventoryDetails && inventoryDetails.modified_by}
                      {inventoryDetails && inventoryDetails.modification_date}
                    </small>
                  </Col>
                </Row>
              } */}
            
              <Row>
                <Col md="3">
                  <FormGroup>
                    <Label>Inventory Code</Label>
                    <Input
                      type="text"
                      value={inventoryDetails && inventoryDetails.inventory_code}
                      name="inventory_code"
                      disabled
                    />
                  </FormGroup>
                </Col>
                <Col md="3">
                  <FormGroup>
                    <Label>Product Name</Label>
                    <Input
                      type="text"
                      value={inventoryDetails && inventoryDetails.product_name}
                      onChange={handleInputs}
                      name="product_name"
                      disabled
                    />
                  </FormGroup>
                </Col>
                <Col md="3">
                  <FormGroup>
                    <Label>Product Type</Label>
                    <Input
                      type="text"
                      value={inventoryDetails && inventoryDetails.product_type}
                      name="product_type"
                      disabled
                    />
                  </FormGroup>
                </Col>
                <Col md="3">
                  <FormGroup>
                    <Label>Item Code</Label>
                    <Input
                      type="text"
                      value={inventoryDetails && inventoryDetails.item_code}
                      name="item_code"
                      disabled
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="3">
                  <FormGroup>
                    <Label>UOM</Label>
                    <Input
                      type="text"
                      value={inventoryDetails && inventoryDetails.unit}
                      name="unit"
                      disabled
                    />
                  </FormGroup>
                </Col>
                <Col md="3">
                  <FormGroup>
                    <Label>MOL</Label>
                    <Input
                      type="text"
                      defaultValue={inventoryDetails && inventoryDetails.minimum_order_level}
                      onChange={handleInputs}
                      name="minimum_order_level"
                    />
                  </FormGroup>
                </Col>
                <Col md="3">
                  <FormGroup>
                    <Label>Notes</Label>
                    <Input
                      onChange={handleInputs}
                      type="textarea"
                      defaultValue={inventoryDetails && inventoryDetails.notes}
                      name="notes"
                    ></Input>
                  </FormGroup>
                </Col>
              </Row>
            </ComponentCard>
          </FormGroup>
        </Form>
      </Row>
    </div>
  );
}

export default InventoryEditPart;

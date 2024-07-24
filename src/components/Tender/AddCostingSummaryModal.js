import React, { useState } from 'react';
import {
  CardBody,
  CardTitle,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../constants/api';

const AddCostingSummaryModal = ({ addCostingSummaryModel, setAddCostingSummaryModel }) => {
  AddCostingSummaryModal.propTypes = {
    addCostingSummaryModel: PropTypes.bool,
    setAddCostingSummaryModel: PropTypes.func,
  };
  const { id } = useParams();
  const [addCostingSummaryData, setAddCostingSummaryData] = useState({
    opportunity_id: id,
  });
  
  //edit Tab Costing Summary Form
  const handleCostingSummeryInputs = (e) => {
    setAddCostingSummaryData({ ...addCostingSummaryData, [e.target.name]: e.target.value });
  };

  const AddCostingSummary = () => {
    api.post('/tender/insertTabcostingsummary', addCostingSummaryData).then((res) => {
      setAddCostingSummaryData(res.data.data);
    });
  };

  React.useEffect(() => {
  }, [id]);

  return (
    <>
      <Modal size="lg" isOpen={addCostingSummaryModel}>
        <ModalHeader>
          Add Costing Summary
          <Button
            color="secondary"
            className="shadow-none"
            onClick={() => {
              setAddCostingSummaryModel(false);
            }}
          >
            X
          </Button>
        </ModalHeader>

        <ModalBody>
          <Row>
            <Col md="12">
                <CardBody>
                  <Form>
                    <Row>
                      <Col md="4">
                        <FormGroup>
                          <Label>No. of Worker Used</Label>
                          <Input
                            type="number"
                            onChange={handleCostingSummeryInputs}
                            value={addCostingSummaryData && addCostingSummaryData.no_of_worker_used}
                            name="no_of_worker_used"
                          />
                        </FormGroup>
                      </Col>

                      <Col md="4">
                        <FormGroup>
                          <Label>No. of Days Worked</Label>
                          <Input
                            type="number"
                            onChange={handleCostingSummeryInputs}
                            value={addCostingSummaryData && addCostingSummaryData.no_of_days_worked}
                            name="no_of_days_worked"
                          />
                        </FormGroup>
                      </Col>

                      <Col md="4">
                        <FormGroup>
                          <Label>Labout Rates Per Day</Label>
                          <Input
                            type="number"
                            onChange={handleCostingSummeryInputs}
                            value={
                              addCostingSummaryData && addCostingSummaryData.labour_rates_per_day
                            }
                            name="labour_rates_per_day"
                          />
                        </FormGroup>
                      </Col>

                      <Col md="4">
                        <FormGroup>
                          <Label>Total Price (S$ W/o GST)</Label>
                          <Input
                            type="number"
                            onChange={handleCostingSummeryInputs}
                            value={addCostingSummaryData && addCostingSummaryData.invoiced_price}
                            name="invoiced_price"
                          />
                        </FormGroup>
                      </Col>

                      <Col md="4">
                        <FormGroup>
                          <Label>Profit Margin %</Label>
                          <Input
                            type="number"
                            disabled
                            onChange={handleCostingSummeryInputs}
                            value={addCostingSummaryData && addCostingSummaryData.profit_percentage}
                            name="profit_percentage"
                          />
                        </FormGroup>
                      </Col>

                      <Col md="4">
                        <FormGroup>
                          <Label>Profit Margin</Label>
                          <Input
                            type="number"
                            disabled
                            name="profit"
                            onChange={handleCostingSummeryInputs}
                            value={addCostingSummaryData && addCostingSummaryData.profit}
                            tabindex="-1"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>

                <CardBody className="bg-light">
                  <CardTitle tag="h4" className="mb-0"></CardTitle>
                </CardBody>

                <CardBody>
                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <Label>Total Material</Label>
                        <Input
                          type="number"
                          disabled
                          onChange={handleCostingSummeryInputs}
                          value={
                            addCostingSummaryData && addCostingSummaryData.total_material_price
                          }
                          name="total_material_price"
                        />
                      </FormGroup>
                    </Col>

                    <Col md="4">
                      <FormGroup>
                        <Label>Transport Charges </Label>
                        <Input
                          type="number"
                          onChange={handleCostingSummeryInputs}
                          value={addCostingSummaryData && addCostingSummaryData.transport_charges}
                          name="transport_charges"
                        />
                      </FormGroup>
                    </Col>

                    <Col md="4">
                      <FormGroup>
                        <Label>Total Labour Charges</Label>
                        <Input
                          type="number"
                          disabled
                          onChange={handleCostingSummeryInputs}
                          value={
                            addCostingSummaryData && addCostingSummaryData.total_labour_charges
                          }
                          name="total_labour_charges"
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <Label>Salesman Commission </Label>
                        <Input
                          type="number"
                          onChange={handleCostingSummeryInputs}
                          defaultValue={
                            addCostingSummaryData && addCostingSummaryData.salesman_commission
                          }
                          name="salesman_commission"
                        />
                      </FormGroup>
                    </Col>

                    <Col md="4">
                      <FormGroup>
                        <Label>Finance Charges </Label>
                        <Input
                          type="number"
                          onChange={handleCostingSummeryInputs}
                          defaultValue={
                            addCostingSummaryData && addCostingSummaryData.finance_charges
                          }
                          name="finance_charges"
                        />
                      </FormGroup>
                    </Col>

                    <Col md="4">
                      <FormGroup>
                        <Label>Office Overheads </Label>
                        <Input
                          type="number"
                          onChange={handleCostingSummeryInputs}
                          defaultValue={
                            addCostingSummaryData && addCostingSummaryData.office_overheads
                          }
                          name="office_overheads"
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <Label>Other Charges </Label>
                        <Input
                          type="number"
                          onChange={handleCostingSummeryInputs}
                          defaultValue={
                            addCostingSummaryData && addCostingSummaryData.other_charges
                          }
                          name="other_charges"
                        />
                      </FormGroup>
                    </Col>

                    <Col md="4">
                      <FormGroup>
                        <Label>TOTAL COST</Label>
                        <Input
                          type="number"
                          disabled
                          onChange={handleCostingSummeryInputs}
                          value={addCostingSummaryData && addCostingSummaryData.other_charges}
                          name="total_cost"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardBody>
                  <CardTitle className="mb-0 bg-light"></CardTitle>
                </CardBody>
              
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="shadow-none"
            onClick={() => {
              AddCostingSummary();
              setAddCostingSummaryModel(false);
            }}
          >
            {' '}
            Submit{' '}
          </Button>
          <Button
            color="secondary"
            className="shadow-none"
            onClick={() => {
              setAddCostingSummaryModel(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddCostingSummaryModal;

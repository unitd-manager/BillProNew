import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, FormGroup, Label, CardTitle } from 'reactstrap';
import PropTypes from 'prop-types';
import api from '../../constants/api';
import CostingSummaryModal from '../ProjectModal/CostingSummaryModal';
/* eslint-disable */
const CostingSummary = ({ costingsummary }) => {
  CostingSummary.propTypes = {
    costingsummary: PropTypes.func,
  };
  const [type, setType] = React.useState('');
  const [addCostingSummaryModal, setAddCostingSummaryModal] = React.useState(false);
  const [chargesdetails, setChargesDetails] = React.useState({ total_cost: "0.00" });
  const [getCostingSummary, setGetCostingSummary] = React.useState({ total_cost: "0.00" });
  const { id } = useParams();
  //Api call for getting Vehicle Fuel Data By ID

  const getCostingbySummary = () => {
    api
      .post('/projecttabcostingsummary/getTabCostingSummaryById', { project_id: id })
      .then((res) => {
        setGetCostingSummary(res.data.data[0]);
      });
  };
  const getCostingSummaryChargesById = () => {
    api
      .post('/projecttabcostingsummary/getCostingSummaryproject', {
        project_id: id,
      })
      .then((res) => {
        setChargesDetails(res.data.data);
      });
  };
  useEffect(() => {
    getCostingSummaryChargesById();
    getCostingbySummary();
  }, [id]);

  return (
    <>
      <Row>
        <Row className="mb-4">
          <CardTitle tag="h4" className="border-bottom bg-secondary p-2 mb-0 text-white">
            <h3>Costing Summary</h3>
          </CardTitle>
        </Row>
        <Col md="3">
          <FormGroup>
            <Label>
              Total Cost :
              <b>
                <span>{costingsummary && costingsummary.total_cost}</span>
                <span className="required">
                  (
                  {(chargesdetails && chargesdetails.transport_charges) +
                    (chargesdetails && chargesdetails.labour_charges) +
                    (chargesdetails && chargesdetails.sales_commision) +
                    (chargesdetails && chargesdetails.finance_charges) +
                    (chargesdetails && chargesdetails.office_overheads) +
                    (chargesdetails && chargesdetails.other_charges)}
                  )
                </span>
              </b>
            </Label>
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>
              PO Price(S$ W/o VAT):<b>{costingsummary && costingsummary.po_price}</b>
            </Label>
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>
              Invoiced Price(S$ W/o VAT):<b>{costingsummary && costingsummary.po_price}</b>
            </Label>
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>
              Profit Margin:{' '}
              <b>
                {costingsummary && costingsummary.profit_percentage}%(
                {costingsummary && costingsummary.profit})
              </b>
            </Label>{' '}
          </FormGroup>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col md="3">
          <FormGroup>
            <Label> Total Material</Label>

            <span>
              <br />
              {costingsummary && costingsummary.total_material_price}
            </span>
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>
              Transport Charges{' '}
              <span
                color="primary"
                className="anchor"
                onClick={() => {
                  setType('Transport Charges');
                  setAddCostingSummaryModal(true);
                }}
              >
                <b>
                  <u>Add</u>
                </b>
              </span>
            </Label>
            <br />
            <span>{costingsummary && costingsummary.transport_charges}</span>
            <span className="required">({chargesdetails && chargesdetails.transport_charges})</span>
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>
              Total Labour Charges{' '}
              <span
                color="primary"
                className="anchor"
                onClick={() => {
                  setType('Total Labour Charges');
                  setAddCostingSummaryModal(true);
                }}
              >
                <b>
                  <u>Add</u>
                </b>
              </span>
            </Label>
            <br />
            <span>{costingsummary && costingsummary.total_labour_charges}</span>
            <span className="required">({chargesdetails && chargesdetails.labour_charges})</span>
          </FormGroup>
        </Col>

        <Col md="3">
          <FormGroup>
            <Label>
              Salesman Commission{' '}
              <span
                color="primary"
                className="anchor"
                onClick={() => {
                  setType('Salesman Commission');
                  setAddCostingSummaryModal(true);
                }}
              >
                <b>
                  <u>Add</u>
                </b>
              </span>
            </Label>
            <br />
            <span>{costingsummary && costingsummary.salesman_commission}</span>
            <span className="required">({chargesdetails && chargesdetails.sales_commision})</span>
          </FormGroup>
        </Col>
      </Row>
      <br />
      <Row>
        <Col md="3">
          <FormGroup>
            <Label>
              {' '}
              Finance Charges{' '}
              <span
                color="primary"
                className="anchor"
                onClick={() => {
                  setType('Finance Charges');
                  setAddCostingSummaryModal(true);
                }}
              >
                <b>
                  <u>Add</u>
                </b>
              </span>
            </Label>
            <br />
            <span>{costingsummary && costingsummary.finance_charges}</span>
            <span className="required">({chargesdetails && chargesdetails.finance_charges})</span>
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>
              Office Overheads{' '}
              <span
                color="primary"
                className="anchor"
                onClick={() => {
                  setType('Office Overheads');
                  setAddCostingSummaryModal(true);
                }}
              >
                <b>
                  <u>Add</u>
                </b>
              </span>
            </Label>
            <br />
            <span>{costingsummary && costingsummary.office_overheads}</span>
            <span className="required">({chargesdetails && chargesdetails.office_overheads})</span>
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>
              Other Charges{' '}
              <span
                color="primary"
                className="anchor"
                onClick={() => {
                  setType('Other Charges');
                  setAddCostingSummaryModal(true);
                }}
              >
                <b>
                  <u>Add</u>
                </b>
              </span>
            </Label>
            <br />
            <span>{costingsummary && costingsummary.other_charges}</span>
            <span className="required">({chargesdetails && chargesdetails.other_charges})</span>
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label> TOTAL COST </Label>
            <br />
            <span>{costingsummary && costingsummary.total_cost}</span>
            <span className="required">
              (
              {(chargesdetails && chargesdetails.transport_charges) +
                (chargesdetails && chargesdetails.labour_charges) +
                (chargesdetails && chargesdetails.sales_commision) +
                (chargesdetails && chargesdetails.finance_charges) +
                (chargesdetails && chargesdetails.office_overheads) +
                (chargesdetails && chargesdetails.other_charges)}
              )
            </span>
          </FormGroup>
        </Col>
      </Row>
      {addCostingSummaryModal && (
        <CostingSummaryModal
          type={type}
          addCostingSummaryModal={addCostingSummaryModal}
          setAddCostingSummaryModal={setAddCostingSummaryModal}
        />
      )}
    </>
  );
};

export default CostingSummary;

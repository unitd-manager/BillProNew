import React from 'react';
import { CardTitle, Row, Col, Form, FormGroup, Label } from 'reactstrap';
import * as Icon from 'react-feather';
import moment from 'moment';
import PropTypes from 'prop-types';
import PdfDeliveryOrder from '../../PDF/PdfDeliveryOrder';

const DeliveryOrder = ({
  deleteDeliveryOrder,
  tabdeliveryorder,
  setDeliveryData,
  setEditDeliveryOrder,
  deliveryData,
  editDeliveryOrder,
}) => {
  DeliveryOrder.propTypes = {
    deleteDeliveryOrder: PropTypes.any,
    tabdeliveryorder: PropTypes.any,
    setDeliveryData: PropTypes.any,
    setEditDeliveryOrder: PropTypes.any,
    deliveryData: PropTypes.any,
    editDeliveryOrder: PropTypes.any,
  };
  return (
    <>
      <Row className="mb-4">
        <CardTitle tag="h4" className="border-bottom bg-secondary p-2 mb-0 text-white">
          Delivery Order
        </CardTitle>
      </Row>
      <Form>
        <Row className="border-bottom mb-3">
          <Col>
            <FormGroup>
              <Label>Date</Label>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Action</Label>
            </FormGroup>
          </Col>
        </Row>

        {tabdeliveryorder &&
          tabdeliveryorder.map((res) => {
            return (
              <Row>
                <Col>{moment(res.date).format('DD-MM-YYYY')}</Col>
                <Col>
                  <FormGroup>
                    <Row>
                      <Col md="1">
                        <Label>
                            <span
                              onClick={() => {
                                setDeliveryData(res.delivery_order_id);
                                setEditDeliveryOrder(true);
                              }}
                            >
                              <Icon.Edit />
                            </span>
                        </Label>
                      </Col>
                      <Col md="1">
                        <Label>
                          <PdfDeliveryOrder
                            deliveryData={deliveryData}
                            editDeliveryOrder={editDeliveryOrder}
                            deliverOrderId={res.delivery_order_id}
                          ></PdfDeliveryOrder>
                        </Label>
                      </Col>
                      <Col md="1">
                        <Label>
                          <div className="anchor">
                            <span
                              onClick={() => {
                                deleteDeliveryOrder(res.delivery_order_id);
                              }}
                            >
                              <Icon.Trash2 />
                            </span>
                          </div>
                        </Label>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
              </Row>
            );
          })}
      </Form>
    </>
  );
};

export default DeliveryOrder;

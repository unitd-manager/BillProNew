import React, {  useState } from 'react';
import { Row, Form, Col, Label, FormGroup } from 'reactstrap';
import * as Icon from 'react-feather';
import PropTypes from 'prop-types';
import moment from 'moment';

import EditWorkOrder from './EditWorkOrder';
import WorkOrderViewLineItem from './WorkOrderViewLineItem';
import PdfProjectWorkOrder from '../PDF/PdfProjectWorkOrder';
import WorkLineItemData from './WorkLineItemData';
import SubconWorkPaymentHistory from './SubconWorkPaymentHistory';

function SubConWorkOrderPortal({ projectId ,subConWorkOrdeData}) {
  SubConWorkOrderPortal.propTypes = {
    projectId: PropTypes.string,
    subConWorkOrdeData:PropTypes.object,
  };

  // const [subConWorkOrdeData, setSubConWorkOrdeData] = useState();
  const [editWorkOrderModal, setEditWorkOrderModal] = useState();
  const [workOrderViewLineItem, setWorkOrderViewLineItem] = useState();
  const [workOrderPaymentHistory, setWorkOrderPaymentHistory] = useState();
  const [workData, setWorkData] = useState();
  const [workOrderLine, setWorkOrderLine] = useState(false);
  const [subCon, setSubCon] = useState();

  // const SubConWorkOrder = () => {
  //   api
  //     .post('/projecttabsubconworkorder/SubConWorkOrderPortal', { project_id: projectId })
  //     .then((res) => {
  //       setSubConWorkOrdeData(res.data.data);
  //     })
  // };
  // useEffect(() => {
  //   SubConWorkOrder();
  // }, [projectId]);

  return (
    <>
      <EditWorkOrder
        editWorkOrderModal={editWorkOrderModal}
        setEditWorkOrderModal={setEditWorkOrderModal}
        workData={workData}
      />
      {workOrderLine && (
        <WorkLineItemData
          workOrderLine={workOrderLine}
          setWorkOrderLine={setWorkOrderLine}
          projectId={projectId}
          subCon={subCon}
        ></WorkLineItemData>
      )}

      <Form className="mt-4">
        <Row className="border-bottom mb-3">
          <Col>
            <FormGroup>
              <Label>WO Code</Label>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Date</Label>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Sub Con</Label>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Status</Label>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Due Date</Label>{' '}
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Completed Date</Label>{' '}
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Amount</Label>{' '}
            </FormGroup>
          </Col>
          <Col></Col>
          <Col></Col>
          <Col>
            <FormGroup>
              <Label>Action</Label>{' '}
            </FormGroup>
          </Col>
        </Row>

        {subConWorkOrdeData &&
          subConWorkOrdeData.map((element) => {
            return (
              <Row>
                <Col>
                  <FormGroup>
                    <Label>{element.sub_con_worker_code}</Label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>{moment(element.work_order_date).format('DD-MM-YYYY')}</Label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>{element.company_name}</Label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>{element.status}</Label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      {element.work_order_due_date
                        ? moment(element.work_order_due_date).format('DD-MM-YYYY')
                        : ''}
                    </Label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      {element.completed_date
                        ? moment(element.completed_date).format('DD-MM-YYYY')
                        : ''}
                    </Label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>{element.po_amount}</Label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <div className="anchor">
                        <u
                          onClick={() => {
                            setSubCon(element.sub_con_work_order_id);
                            setWorkOrderViewLineItem(true);
                          }}
                        >
                          View Line Items
                        </u>
                      </div>
                    </Label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <div className="anchor">
                        <span
                          onClick={() => {
                            setSubCon(element.sub_con_work_order_id);
                            setWorkOrderPaymentHistory(true);
                          }}
                        >
                          Payment History
                        </span>
                      </div>
                    </Label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Row>
                      <Col md="2">
                        <Label>
                          <div className="anchor">
                            <span
                              onClick={() => {
                                setWorkData(element);
                                setEditWorkOrderModal(true);
                              }}
                            >
                              <Icon.Edit />
                            </span>
                          </div>
                        </Label>
                      </Col>
                      <Col md="2">
                        <Label>
                          <PdfProjectWorkOrder
                            workOrderViewLineItem={workOrderViewLineItem}
                            subConWorkOrdeData={subConWorkOrdeData}
                            subConWorkOrderId={element.sub_con_work_order_id}
                          ></PdfProjectWorkOrder>
                        </Label>
                      </Col>
                      <Col md="2">
                        <Label>
                          <div className="anchor">
                            {' '}
                            <span
                              onClick={() => {
                                setSubCon(element.sub_con_work_order_id);
                                setWorkOrderLine(true);
                              }}
                            >
                              <Icon.PlusCircle />
                            </span>{' '}
                          </div>
                        </Label>
                      </Col>
                    </Row>
                  </FormGroup>
                  {workOrderViewLineItem && (
                    <WorkOrderViewLineItem
                      workOrderViewLineItem={workOrderViewLineItem}
                      setWorkOrderViewLineItem={setWorkOrderViewLineItem}
                      projectId={projectId}
                      subCon={subCon}
                    />
                  )}
                  {workOrderPaymentHistory && (
                    <SubconWorkPaymentHistory
                      workOrderPaymentHistory={workOrderPaymentHistory}
                      setWorkOrderPaymentHistory={setWorkOrderPaymentHistory}
                      projectId={projectId}
                      subCon={subCon}
                    />
                  )}
                </Col>
              </Row>
            );
          })}
      </Form>
    </>
  );
}

export default SubConWorkOrderPortal;

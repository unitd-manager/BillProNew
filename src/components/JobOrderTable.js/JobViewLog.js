import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import api from '../../constants/api';
//import QuoteLogViewLineItem from './QuoteLogViewLineItem';
import PdfProjectJobLog from '../PDF/PdfProjectJobLog';

const JobViewLog = ({ JobModal, setJobModal, JobId ,id}) => {
  JobViewLog.propTypes = {
    JobModal: PropTypes.bool,
    setJobModal: PropTypes.func,
    JobId: PropTypes.any,
    id:PropTypes.any,
  };

  const [jobLogViewLineItem, setJobLogViewLineItem] = useState(false);
  const [job, setJob] = useState();
  const getJobOrders = () => {
    api
      .post('/project/getTabQuotelogsById', { quote_id: JobId })
      .then((res) => {
        setJob(res.data.data);
      })
      .catch(() => {});
  };

  const [jobOrder, setJoblogLineItems] = useState();
  const JobViewLineItem = (logId) => {
    api
      .post('/project/getTabQuoteLineItems', { quote_log_id: logId })
      .then((res) => {
        setJoblogLineItems(res.data.data);
        console.log('tender', res.data.data);
      })
      .catch(() => {});
  };
  useEffect(() => {
    JobViewLineItem();
  }, []);

  console.log('data', job);
  useEffect(() => {
    getJobOrders();
  }, []);
  return (
    <>
      <Modal size="xl" isOpen={JobModal}>
        <ModalHeader>
          <div>Job Order History</div>
          <Button
            color="secondary"
            onClick={() => {
              setJobModal();
            }}
          >
            {' '}
            X{' '}
          </Button>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
              <Form>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label>Revision</Label>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label>Job Code</Label>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label>Job Date</Label>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label>Job Status</Label>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label>Discount</Label>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label>Amount</Label>
                    </FormGroup>
                  </Col>
                  <Col></Col>
                  <Col>
                    <FormGroup>
                      <Label>Action</Label>{' '}
                    </FormGroup>
                  </Col>
                </Row>

                {job &&
                  job.map((element) => {
                    return (
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label>{element.revision}</Label>
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label>{element.quote_code}</Label>
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label>
                              {element.quote_date
                                ? moment(element.quote_date).format('YYYY-MM-DD')
                                : ''}
                            </Label>
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label>{element.quote_status}</Label>
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label>{element.discount}</Label>
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label>{element.total_amount}</Label>
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label>
                              <span
                                className="addline"
                                onClick={() => {
                                  setJobLogViewLineItem(true);
                                  JobViewLineItem(element.quote_log_id);
                                }}
                              >
                                <u>View Line Items</u>
                              </span>
                            </Label>

                            <Modal size="xl" isOpen={jobLogViewLineItem}>
                              <ModalHeader>View Job Log Line Items</ModalHeader>
                              <ModalBody>
                                <FormGroup>
                                  <table className="lineitem">
                                    <thead>
                                      <tr>
                                        <th scope="col">Title </th>
                                        <th scope="col">Description </th>
                                        <th scope="col">Qty </th>
                                        <th scope="col">Unit Price </th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Updated By</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {jobOrder &&
                                        jobOrder.map((e) => {
                                          return (
                                            <tr>
                                              <td>{e.title}</td>
                                              <td>{e.description}</td>
                                              <td>{e.quantity}</td>
                                              <td>{e.unit_price}</td>
                                              <td>{e.amount}</td>

                                              <td></td>
                                              <td></td>
                                            </tr>
                                          );
                                        })}
                                    </tbody>
                                  </table>
                                </FormGroup>
                              </ModalBody>
                              <ModalFooter>
                                <Button
                                  color="primary"
                                  className="shadow-none"
                                  onClick={() => {
                                    setJobLogViewLineItem(false);
                                  }}
                                >
                                  Cancel
                                </Button>
                              </ModalFooter>
                            </Modal>

                            {/* <QuoteLogViewLineItem
                                  quoteLogViewLineItem={quoteLogViewLineItem}
                                  setQuoteLogViewLineItem={setQuoteLogViewLineItem}
                                  ids={element.quote_log_id}
                                /> */}
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label>
                              <PdfProjectJobLog
                                logId={element.quote_log_id}
                                id={id}
                              ></PdfProjectJobLog>
                            </Label>
                          </FormGroup>
                        </Col>
                      </Row>
                    );
                  })}
              </Form>
            </Col>
          </Row>
        </ModalBody>

        {/* <ModalFooter>
                <Button color="secondary" onClick={()=>{setViewJobModal(false)}}>
                Cancel
                </Button>
            </ModalFooter> */}
      </Modal>
    </>
  );
};

export default JobViewLog;

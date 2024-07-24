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
import PdfProjectQuoteLog from '../PDF/PdfProjectQuoteLog';

const ViewQuoteLogModal = ({ quotationsModal, setquotationsModal, quoteId ,id}) => {
  ViewQuoteLogModal.propTypes = {
    quotationsModal: PropTypes.bool,
    setquotationsModal: PropTypes.func,
    quoteId: PropTypes.any,
    id:PropTypes.any,
  };

  const [quoteLogViewLineItem, setQuoteLogViewLineItem] = useState(false);
  const [quote, setQuote] = useState();
  const getquotations = () => {
    api
      .post('/project/getTabQuotelogsById', { quote_id: quoteId })
      .then((res) => {
        setQuote(res.data.data);
      })
      .catch(() => {});
  };

  const [quotation, setQuotelogLineItems] = useState();
  const QuotationViewLineItem = (logId) => {
    api
      .post('/project/getTabQuoteLineItems', { quote_log_id: logId })
      .then((res) => {
        setQuotelogLineItems(res.data.data);
        console.log('tender', res.data.data);
      })
      .catch(() => {});
  };
  useEffect(() => {
    QuotationViewLineItem();
  }, []);

  console.log('data', quote);
  useEffect(() => {
    getquotations();
  }, []);
  return (
    <>
      <Modal size="xl" isOpen={quotationsModal}>
        <ModalHeader>
          <div>Quote History</div>
          <Button
            color="secondary"
            onClick={() => {
              setquotationsModal();
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
                      <Label>Quote Code</Label>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label>Quote Date</Label>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label>Quote Status</Label>
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

                {quote &&
                  quote.map((element) => {
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
                                ? moment(element.quote_date).format('DD-MM-YYYY')
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
                                  setQuoteLogViewLineItem(true);
                                  QuotationViewLineItem(element.quote_log_id);
                                }}
                              >
                                <u>View Line Items</u>
                              </span>
                            </Label>

                            <Modal size="xl" isOpen={quoteLogViewLineItem}>
                              <ModalHeader>View Quote Log Line Items</ModalHeader>
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
                                      {quotation &&
                                        quotation.map((e) => {
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
                                    setQuoteLogViewLineItem(false);
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
                              <PdfProjectQuoteLog
                                logId={element.quote_log_id}
                                id={id}
                              ></PdfProjectQuoteLog>
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
                <Button color="secondary" onClick={()=>{setViewQuotationsModal(false)}}>
                Cancel
                </Button>
            </ModalFooter> */}
      </Modal>
    </>
  );
};

export default ViewQuoteLogModal;

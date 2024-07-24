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
  CardBody,
} from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import api from '../../constants/api';
import QuoteLogViewLineItems from './QuoteLogViewLineItems';
import PdfTenderQuoteLog from '../PDF/PdfTenderQuoteLog';

const ViewQuoteLogModal = ({ quotationsModal, setquotationsModal, id }) => {
  ViewQuoteLogModal.propTypes = {
    quotationsModal: PropTypes.bool,
    setquotationsModal: PropTypes.func,
    id: PropTypes.any,
  };

  const [quoteLogViewLineItem, setQuoteLogViewLineItem] = useState(false);
  const [quote, setQuote] = useState(false);
  const getquotations = () => {
    api
      .post('/tender/getTabQuotelogById', { opportunity_id: id })
      .then((res) => {
        setQuote(res.data.data);
      })
  };

  useEffect(() => {
    getquotations();
  }, [id]);
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
                <CardBody>
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
                      <Col md="1">
                        <FormGroup>
                          <Label>Discount</Label>
                        </FormGroup>
                      </Col>
                      <Col md="1">
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
                                <Label>{element.revision}</Label>{' '}
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
                                  <div className='anchor'>
                                    <span
                                      onClick={() => {
                                        setQuoteLogViewLineItem(true);
                                      }}
                                    >
                                      <u>View Line Items</u>
                                    </span>
                                  </div>
                                </Label>

                                <QuoteLogViewLineItems
                                  quoteLogViewLineItem={quoteLogViewLineItem}
                                  setQuoteLogViewLineItem={setQuoteLogViewLineItem}
                                  id={id}
                                />
                              </FormGroup>
                            </Col>
                            <Col>
                              <FormGroup>
                                <Row>
                                  <Col md="4">
                                    <Label>
                                      <PdfTenderQuoteLog></PdfTenderQuoteLog>
                                    </Label>
                                  </Col>
                                </Row>
                              </FormGroup>
                            </Col>
                          </Row>
                        );
                      })}
                  </Form>
                </CardBody>
             
             
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ViewQuoteLogModal;

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
import { FaUser } from 'react-icons/fa';
import moment from 'moment';
import api from '../../constants/api';
//import QuoteLogViewLineItem from './QuoteLogViewLineItem';
import PdfProjectQuoteLog from '../PDF/PdfProjectQuoteLog';

const ViewQuoteLogModal = ({ quotationsModal, toggleQuotationsModal, quoteId,}) => {
  ViewQuoteLogModal.propTypes = {
    quotationsModal: PropTypes.bool,
    toggleQuotationsModal: PropTypes.any,
    quoteId: PropTypes.any,

  };
  const [showTooltip, setShowTooltip] = useState(false);
  console.log('showTooltip:', showTooltip); // Log the showTooltip state
  const handleIconMouseOver = () => {
    console.log('Mouse over icon'); // Log when mouse over icon
    setShowTooltip(true);
  };

  const handleIconMouseOut = () => {
    console.log('Mouse out icon'); // Log when mouse out of icon
    setShowTooltip(false);
  };

  const handleIconFocus = () => {
    console.log('Icon focused'); // Log when icon is focused
    setShowTooltip(true);
  };

  const handleIconBlur = () => {
    console.log('Icon blurred'); // Log when icon is blurred
    setShowTooltip(false);
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
  
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };

  const selectedLanguage = getSelectedLanguageFromLocalStorage();

  // Use the selected language value as needed
  console.log('Selected language from localStorage:', selectedLanguage);

  const [arabic, setArabic] = useState([]);

  const arb = selectedLanguage === 'Arabic';

  // const eng = selectedLanguage === 'English';

  const getArabicCompanyName = () => {
    api
      .get('/tradingquote/getTranslationforTradingQuote')
      .then((res) => {
        setArabic(res.data.data);
      })
      .catch(() => {
        // Handle error if needed
      });
  };

  console.log('arabic', arabic);
  useEffect(() => {
    getArabicCompanyName();
  }, []);

  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }
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
          <div>{arb ? 'تاريخ الاقتباس' : 'Quote History:'}</div>
          <Button
            color="secondary"
            onClick={() => {
              toggleQuotationsModal();
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
                  {/* <Col>
                    <FormGroup>
                      <Label>Reference</Label>
                    </FormGroup>
                  </Col> */}
                  <Col>
                    <FormGroup>
                      <Label>{arabic.find(item => item.key_text === 'mdTradingQuote.Quotation Code')?.[genLabel]}</Label>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label>{arabic.find(item => item.key_text === 'mdTradingQuote.Quotation Date')?.[genLabel]}</Label>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label>{arabic.find(item => item.key_text === 'mdTradingQuote.Status')?.[genLabel]}</Label>
                    </FormGroup>
                  </Col>
                 
                  <Col>
                    <FormGroup>
                      <Label>{arabic.find(item => item.key_text === 'mdTradingQuote.Amount')?.[genLabel]}</Label>
                    </FormGroup>
                  </Col>
                  <Col></Col>
                  <Col>
                    <FormGroup>
                      <Label> {arb ? 'فعل' : 'Action'}</Label>{' '}
                    </FormGroup>
                  </Col>
                </Row>

                {quote &&
                  quote.map((element) => {
                    return (
                      <Row>
                        {/* <Col>
                          <FormGroup>
                            <Label>{element.office_ref_no}</Label>
                          </FormGroup>
                        </Col> */}
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
                                <u>{arb ? 'عرض عناصر السطر' : 'View Line Items'}</u>
                              </span>
                            </Label>

                            <Modal size="xl" isOpen={quoteLogViewLineItem}>
                              <ModalHeader>{arb ? 'عرض عناصر سطر سجل الأسعار' : 'View Quote Log Line Items'}</ModalHeader>
                              <ModalBody>
                                <FormGroup>
                                  <table className="lineitem">
                                    <thead>
                                      <tr>
                                        <th scope="col">{arabic.find(item => item.key_text === 'mdTradingQuote.Title')?.[genLabel]} </th>
                                        <th scope="col">{arabic.find(item => item.key_text === 'mdTradingQuote.Description')?.[genLabel]} </th>
                                        <th scope="col">{arabic.find(item => item.key_text === 'mdTradingQuote.Quantity')?.[genLabel]} </th>
                                        <th scope="col">{arabic.find(item => item.key_text === 'mdTradingQuote.Unit Price')?.[genLabel]}</th>
                                        <th scope="col">{arabic.find(item => item.key_text === 'mdTradingQuote.Amount')?.[genLabel]}</th>
                                        <th scope="col">{arabic.find(item => item.key_text === 'mdTradingQuote.updated By')?.[genLabel]}</th>
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
                                              <td data-label="Updated By" style={{ textAlign: 'center' }}>
                              <tooltip title={`${e.created_by} on ${e.creation_date}`}>
                                <span
                                  onMouseOver={handleIconMouseOver}
                                  onMouseOut={handleIconMouseOut}
                                  onFocus={handleIconFocus}
                                  onBlur={handleIconBlur}
                                  style={{
                                    position: 'relative',
                                    display: 'inline-block',
                                  }}
                                >
                                  {/* created by */}<FaUser />
                                </span>
                              </tooltip>
                            </td>
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
                           
                              <PdfProjectQuoteLog
                                logId={element.quote_log_id}
                                id={quoteId}
                              ></PdfProjectQuoteLog>
                            
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

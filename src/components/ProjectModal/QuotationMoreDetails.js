import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Button,
  //CardTitle
} from 'reactstrap';
import moment from 'moment';
import Swal from 'sweetalert2';
import * as Icon from 'react-feather';
import styled from 'styled-components';
import api from '../../constants/api';
import ViewLineItemModal from './ViewLineItemModal';
import EditQuotation from './EditQuotation';
import QuoteviewEditItem from './QuoteviewEditItem';
import PdfProjectQuote from '../PDF/PdfProjectQuote';
import ViewQuoteLogModal from './ViewQuoteLogModal';
//import QuotationViewLineItem from './QuotationViewLineItems';
const BlueLabel = styled.label`
  color: #2962ff;
`;

export default function QuotationMoreDetails({
  id,
  setAddLineItemModal,
  addLineItemModal,
  lineItem,
  viewLineModal,
  viewLineToggle,
  getLineItem,
  quotationsModal,
  setquotationsModal,
  quotation,
  setViewLineModal,
}) {
  QuotationMoreDetails.propTypes = {
    id: PropTypes.any,
    setAddLineItemModal: PropTypes.object,
    addLineItemModal: PropTypes.object,
    lineItem: PropTypes.object,
    viewLineModal: PropTypes.object,
    viewLineToggle: PropTypes.object,
    getLineItem: PropTypes.array,
    quotationsModal: PropTypes.object,
    setquotationsModal: PropTypes.object,
    quotation: PropTypes.object,
    setViewLineModal: PropTypes.object,
  };

  const [quoteDatas, setQuoteData] = useState();
  const [quoteLine, setQuoteLine] = useState();
  const [editQuoteModal, setEditQuoteModal] = useState();
  const [editLineModelItem, setEditLineModelItem] = useState(null);
  const [editLineModal, setEditLineModal] = useState(false);

  console.log('lineitem2', lineItem);

  const deleteRecord = (deleteID) => {
    Swal.fire({
      title: `Are you sure? ${id}`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        api.post('/project/deleteEditItem', { quote_items_id: deleteID }).then(() => {
          Swal.fire('Deleted!', 'Your Line Items has been deleted.', 'success');
          window.location.reload();
        });
      }
    });
  };

  return (
    <>
      {Object.keys(quotation).length !== 0 && (
        <Col md="2" className="mb-4 d-flex justify-content-between">
          <Button
            color="primary"
            className="shadow-none"
            onClick={() => {
              setquotationsModal(true);
            }}
          >
            View Quote
          </Button>
        </Col>
      )}

      {/* <CardTitle tag="h5" className="border-bottom bg-secondary p-2 mb-0 text-white">
          {' '}
          Quotations{' '}
         </CardTitle> */}

      {Object.keys(quotation).length !== 0 && (
        <Form>
          <Row>
            <Col>
              <FormGroup>
                <BlueLabel>Revision</BlueLabel>{' '}
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <BlueLabel>Quote Date</BlueLabel>{' '}
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <BlueLabel>Quote Code</BlueLabel>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <BlueLabel>Quote Status</BlueLabel>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <BlueLabel>Discount </BlueLabel>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <BlueLabel>Amount </BlueLabel>
              </FormGroup>
            </Col>
            <Col></Col>

            <Col>
              <FormGroup>
                <BlueLabel>Action</BlueLabel>
              </FormGroup>
            </Col>
          </Row>

          {quotation &&
            quotation.map((element) => {
              return (
                <Row>
                  <Col>
                    <FormGroup>
                      <Label>{element.revision}</Label>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label>
                        {element.quote_date ? moment(element.quote_date).format('DD-MM-YYYY') : ''}
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <span>{element.quote_code}</span>
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
                      <Label>{element.totalamount}</Label>
                    </FormGroup>
                  </Col>

                  <Col>
                    <FormGroup>
                      <BlueLabel>
                        <span
                          onClick={() => {
                            getLineItem(element.quote_id);
                            setViewLineModal(true);
                          }}
                        >
                          <u> View Line Items</u>
                        </span>
                      </BlueLabel>
                    </FormGroup>
                  </Col>
                  <Modal size="xl" isOpen={viewLineModal} toggle={viewLineToggle.bind(null)}>
                    <ModalHeader toggle={viewLineToggle.bind(null)}>Line Items</ModalHeader>
                    <ModalBody>
                      <FormGroup>
                        <table className="lineitem border border-secondary rounded">
                          <thead>
                            <tr>
                              <th scope="col">Title </th>
                              <th scope="col">Description </th>
                              <th scope="col">Qty </th>
                              <th scope="col">Unit Price </th>
                              <th scope="col">Amount</th>
                              <th scope="col">Updated By </th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {lineItem &&
                              lineItem.map((e) => {
                                return (
                                  <tr>
                                    <td data-label="Title">{e.title}</td>
                                    <td data-label="Description">{e.description}</td>
                                    <td data-label="Quantity">{e.quantity}</td>
                                    <td data-label="Unit Price">{e.unit_price}</td>
                                    <td data-label="Amount">{e.amount}</td>
                                    <td data-label="Updated By"></td>
                                    <td data-label="Action">
                                      <span
                                        className="addline"
                                        onClick={() => {
                                          setEditLineModelItem(e);
                                          setEditLineModal(true);
                                        }}
                                      >
                                        <Icon.Edit2 />
                                      </span>

                                      <span
                                        className="addline"
                                        onClick={() => {
                                          deleteRecord(e.quote_items_id);
                                        }}
                                      >
                                        <Icon.Trash2 />
                                      </span>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </FormGroup>
                    </ModalBody>
                  </Modal>

                  <Col>
                    <FormGroup>
                      <Row>
                        <Col md="2">
                          <Label>
                            <span
                              className="addline"
                              onClick={() => {
                                getLineItem(element.quote_id);
                                setQuoteData(lineItem.quote_id);
                                setQuoteData(element);
                                setEditQuoteModal(true);
                              }}
                            >
                              <Icon.Edit />
                            </span>
                          </Label>
                        </Col>
                        <Col md="2">
                          <Label>
                            <PdfProjectQuote id={id} quoteId={element.quote_id}></PdfProjectQuote>
                          </Label>
                        </Col>

                        <Col md="2">
                          <Label>
                            {' '}
                            <span
                              className="addline"
                              onClick={() => {
                                setQuoteLine(element.quote_id);
                                setAddLineItemModal(true);
                              }}
                            >
                              <Icon.PlusCircle />
                            </span>{' '}
                          </Label>
                        </Col>
                      </Row>
                    </FormGroup>

                    <QuoteviewEditItem
                      editLineModal={editLineModal}
                      setEditLineModal={setEditLineModal}
                      FetchLineItemData={editLineModelItem}
                    >
                      {' '}
                    </QuoteviewEditItem>
                    {quotationsModal && (
                      <ViewQuoteLogModal
                        quotationsModal={quotationsModal}
                        setquotationsModal={setquotationsModal}
                        quoteId={element.quote_id}
                        id={id}
                      />
                    )}
                    {addLineItemModal && (
                      <ViewLineItemModal
                        projectInfo={id}
                        addLineItemModal={addLineItemModal}
                        setAddLineItemModal={setAddLineItemModal}
                        quoteLine={quoteLine}
                      ></ViewLineItemModal>
                    )}

                    <EditQuotation
                      projectInfo={id}
                      editQuoteModal={editQuoteModal}
                      setEditQuoteModal={setEditQuoteModal}
                      quoteDatas={quoteDatas}
                      lineItem={lineItem}
                    />
                  </Col>
                </Row>
              );
            })}
        </Form>
      )}
    </>
  );
}

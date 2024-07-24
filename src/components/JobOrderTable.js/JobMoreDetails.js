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
import JobAddLineItemModal from './JobAddLineItemModal';
import JobEditModal from './JobEditModal';
import JobEditViewLineItem from './JobEditViewLineItem';
import JobViewLog from './JobViewLog';
import PdfProjectJob from '../PDF/PdfProjectJob';
//import QuotationViewLineItem from './QuotationViewLineItems';
const BlueLabel = styled.label`
  color: #2962ff;
`;

export default function JobMoreDetails({
  id,
  addJobLineItemModal,
  setAddJobLineItemModal,
  viewjobLineModal,
  viewLineToggle1,
  joblineItem,
  getJobLineItem,
  JobModal,
  setJobModal,
  jobOrder,
  setViewJobLineModal,
}) {
  JobMoreDetails.propTypes = {
    id: PropTypes.any,
    addJobLineItemModal: PropTypes.object,
    setAddJobLineItemModal: PropTypes.object,
    joblineItem: PropTypes.object,
    viewjobLineModal: PropTypes.object,
    viewLineToggle1: PropTypes.object,
    getJobLineItem: PropTypes.array,
    JobModal: PropTypes.object,
    setJobModal: PropTypes.object,
    jobOrder: PropTypes.object,
    setViewJobLineModal: PropTypes.object,
  };

  const [jobDatas, setJobData] = useState();
  const [jobLine, setJobLine] = useState();
  const [editJobModal, setEditJobModal] = useState();
  const [editJobLineModelItem, setEditJobLineModelItem] = useState(null);
  const [editjobLineModal, setEditJobLineModal] = useState(false);

  console.log('lineitem2', joblineItem);

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
      {Object.keys(jobOrder).length !== 0 && (
        <Col md="2" className="mb-4 d-flex justify-content-between">
          <Button
            color="primary"
            className="shadow-none"
            onClick={() => {
              setJobModal(true);
            }}
          >
            View JobOrder Log
          </Button>
        </Col>
      )}

      {/* <CardTitle tag="h5" className="border-bottom bg-secondary p-2 mb-0 text-white">
          {' '}
          Quotations{' '}
         </CardTitle> */}

      {Object.keys(jobOrder).length !== 0 && (
        <Form>
          <Row>
            <Col>
              <FormGroup>
                <BlueLabel>Revision</BlueLabel>{' '}
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <BlueLabel>Job Date</BlueLabel>{' '}
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <BlueLabel>Job Code</BlueLabel>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <BlueLabel>Job Status</BlueLabel>
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

          {jobOrder &&
            jobOrder.map((element) => {
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
                        {element.quote_date ? moment(element.quote_date).format('YYYY-MM-DD') : ''}
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
                            getJobLineItem(element.quote_id);
                            setViewJobLineModal(true);
                          }}
                        >
                          <u> View Line Items</u>
                        </span>
                      </BlueLabel>
                    </FormGroup>
                  </Col>
                  <Modal size="xl" isOpen={viewjobLineModal} toggle={viewLineToggle1.bind(null)}>
                    <ModalHeader toggle={viewLineToggle1.bind(null)}>Line Items</ModalHeader>
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
                            {joblineItem &&
                              joblineItem.map((e) => {
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
                                          setEditJobLineModelItem(e);
                                          setEditJobLineModal(true);
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
                                getJobLineItem(element.quote_id);
                                setJobData(joblineItem.quote_id);
                                setJobData(element);
                                setEditJobModal(true);
                              }}
                            >
                              <Icon.Edit />
                            </span>
                          </Label>
                        </Col>
                        <Col md="2">
                          <Label>
                            <PdfProjectJob id={id} JobId={element.quote_id}></PdfProjectJob>
                          </Label>
                        </Col>

                        <Col md="2">
                          <Label>
                            {' '}
                            <span
                              className="addline"
                              onClick={() => {
                                setJobLine(element.quote_id);
                                setAddJobLineItemModal(true);
                              }}
                            >
                              <Icon.PlusCircle />
                            </span>{' '}
                          </Label>
                        </Col>
                      </Row>
                    </FormGroup>

                    <JobEditViewLineItem
                      editjobLineModal={editjobLineModal}
                      setEditJobLineModal={setEditJobLineModal}
                      FetchLineItemData={editJobLineModelItem}
                    >
                      {' '}
                    </JobEditViewLineItem>
                    {jobOrder && (
                      <JobViewLog
                        JobModal={JobModal}
                        setJobModal={setJobModal}
                        JobId={element.quote_id}
                        id={id}
                      />
                    )}
                    {addJobLineItemModal && (
                      <JobAddLineItemModal
                        projectInfo={id}
                        addJobLineItemModal={addJobLineItemModal}
                        setAddJobLineItemModal={setAddJobLineItemModal}
                        jobLine={jobLine}
                      ></JobAddLineItemModal>
                    )}

                    <JobEditModal
                      projectInfo={id}
                      editJobModal={editJobModal}
                      setEditJobModal={setEditJobModal}
                      jobDatas={jobDatas}
                      joblineItem={joblineItem}
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

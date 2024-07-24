import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  FormGroup,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Form,
} from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import { id } from 'date-fns/locale';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import api from '../../constants/api';
import message from '../Message';

const JobEditModal = ({ editJobModal, setEditJobModal, jobDatas, joblineItem,projectInfo}) => {
  JobEditModal.propTypes = {
    editJobModal: PropTypes.bool,
    setEditJobModal: PropTypes.func,
    jobDatas: PropTypes.object,
    joblineItem: PropTypes.object,
    projectInfo:PropTypes.object,
  };
  const [jobData, setJobData] = useState(jobDatas);
  const [conditions, setConditions] = useState('');
  const [joblineItems, setJobLineItem] = useState('');
  //const [jobData, setQuotations] = useState();

  const handleData = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };
  const getJobOrder = () => {
    api.post('/project/getTabQuoteById', { project_id: id }).then((res) => {
      setJobData(res.data.data);
    });
  };

  const insertJobOrder = () => {
    jobData.project_id= projectInfo;
    api.post('/project/insertLog', jobData).then((res) => {
      message('Job inserted successfully.', 'success');
      joblineItem.forEach((element) => {
        element.quote_log_id = res.data.data.insertId;
        api.post('/project/insertLogLine', element).then(() => {
          window.location.reload();
        });
      });
    });
  };
  console.log(joblineItems);
  //Insert order for finance module
  const editJobOrder = () => {
    api
      .post('/project/editTabQuote', jobData)
      .then(() => {
        message('Job editted successfully.', 'success');
        //window.location.reload();
      })
      .catch(() => {
        message('Network connection error.');
      });
  };
  const handleDataEditor = (e, type) => {
    setJobData({ ...jobData, [type]: draftToHtml(convertToRaw(e.getCurrentContent())) });
  };
  const convertHtmlToDraftcondition = (existingJobformal) => {
    if (existingJobformal && existingJobformal.quote_condition) {
      const contentBlock = htmlToDraft(existingJobformal && existingJobformal.quote_condition);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        setConditions(editorState);
      }
    }
  };
  const convertHtmlToDraft = (existingJobformal) => {
    if (existingJobformal && existingJobformal.intro_drawing_quote) {
      const contentBlock = htmlToDraft(
        existingJobformal && existingJobformal.intro_drawing_quote,
      );
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        setJobLineItem(editorState);
      }
    }
  };

  useEffect(() => {
    getJobOrder();
    setJobData(jobDatas);
    convertHtmlToDraftcondition(jobDatas);
    convertHtmlToDraft(jobDatas);
  }, [jobDatas]);
  return (
    <>
      <Modal size="lg" isOpen={editJobModal}>
        <ModalHeader>Edit Job Display </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Form inline>
              <FormGroup>
                <Row>
                  <Col md="4">
                    <FormGroup>
                      <Label>Job Date</Label>
                      <Input
                        type="date"
                        onChange={handleData}
                        value={jobData && moment(jobData.quote_date).format('YYYY-MM-DD')}
                        name="quote_date"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Job Status</Label>
                      <Input
                        type="select"
                        name="quote_status"
                        defaultValue={jobData && jobData.quote_status}
                        onChange={handleData}
                      > 
                        <option value="">Please Select</option>
                        <option value="New">New</option>
                        <option value="Quoted">Quoted</option>
                        <option value="Awarded">Awarded</option>
                        <option value="Not Awarded">Not Awarded</option>
                        <option value="Cancelled">Cancelled</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Discount</Label>
                      <Input
                        type="text"
                        name="discount"
                        onChange={handleData}
                        value={jobData && jobData.discount}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col md="4">
                    <Label>Drawing Nos</Label>
                    <FormGroup>
                      <Input
                        type="radio"
                        name="drawing_nos"
                        value="1"
                        onChange={handleData}
                        defaultChecked={jobData && jobData.drawing_nos === 1 && true}
                      ></Input>
                      &nbsp;&nbsp;
                      <Label>Yes</Label>&nbsp;&nbsp;
                      <Input
                        type="radio"
                        name="drawing_nos"
                        value="0"
                        onChange={handleData}
                        defaultChecked={jobData && jobData.drawing_nos === 0 && true}
                      ></Input>
                      &nbsp;&nbsp;
                      <Label>No</Label>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Project Reference</Label>
                      <Input
                        type="text"
                        name="project_reference"
                        onChange={handleData}
                        value={jobData && jobData.project_reference}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Project Locaation</Label>
                      <Input
                        type="text"
                        name="project_location"
                        onChange={handleData}
                        value={jobData && jobData.project_location}
                      />
                    </FormGroup>
                  </Col>
                  </Row>
                  <Row>
                                  <Col md="4">
                    <FormGroup>
                      <Label>Mode of Payment</Label>
                      <Input
                        type="select"
                        name="payment_method"
                        defaultValue={jobData && jobData.payment_method}
                        onChange={handleData}
                      >
                        <option value="">Please Select</option>
                        <option value="15 days">15 days</option>
                        <option selected="selected" value="30 days">
                          30 days
                        </option>
                        <option value="60 days">60 days</option>
                        <option value="COD">COD</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Ref No</Label>
                      <Input
                        type="text"
                        name="ref_no_quote"
                        onChange={handleData}
                        value={jobData && jobData.ref_no_quote}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Job Revision</Label>
                      <Input
                        type="text"
                        name="revision"
                        onChange={handleData}
                        value={jobData && jobData.revision}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Label>Terms & Condition</Label>
                </Row>
                <Editor
                  editorState={conditions}
                  wrapperClassName="demo-wrapper mb-0"
                  editorClassName="demo-editor border mb-4 edi-height"
                  onEditorStateChange={(e) => {
                    handleDataEditor(e, 'quote_condition');
                    setConditions(e);
                  }}
                />

                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button
                      type="button"
                      color="primary"
                      className="btn shadow-none mr-2"
                      onClick={() => {
                        insertJobOrder();
                        editJobOrder();
                        
                      }}
                    >
                      Save & Continue
                    </Button>
                    <Button
                      className="shadow-none"
                      color="secondary"
                      onClick={() => {
                        setEditJobModal(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </Row>
              </FormGroup>
            </Form>
          </FormGroup>
        </ModalBody>
      </Modal>
    </>
  );
};

export default JobEditModal;

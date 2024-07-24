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

const EditQuotation = ({
  editQuoteModal,
  setEditQuoteModal,
  quoteDatas,
  lineItem,
  projectInfo,
}) => {
  EditQuotation.propTypes = {
    editQuoteModal: PropTypes.bool,
    setEditQuoteModal: PropTypes.func,
    quoteDatas: PropTypes.object,
    lineItem: PropTypes.object,
    projectInfo: PropTypes.object,
  };
  const [quoteData, setQuoteData] = useState(quoteDatas);
  const [conditions, setConditions] = useState('');
  const [lineItems, setLineItem] = useState('');
  //const [quoteData, setQuotations] = useState();

  const handleData = (e) => {
    setQuoteData({ ...quoteData, [e.target.name]: e.target.value });
  };
  const getQuote = () => {
    api.post('/project/getTabQuoteById', { project_id: id }).then((res) => {
      setQuoteData(res.data.data);
    });
  };

  const insertquote = () => {
    quoteData.project_id = projectInfo;
    api.post('/project/insertLog', quoteData).then((res) => {
      message('quote inserted successfully.', 'success');
      lineItem.forEach((element) => {
        element.quote_log_id = res.data.data.insertId;
        api.post('/project/insertLogLine', element).then(() => {
          window.location.reload();
        });
      });
    });
  };
  console.log(lineItems);
  //Insert order for finance module
  const editQuotations = () => {
    api
      .post('/project/editTabQuote', quoteData)
      .then(() => {
        message('quote editted successfully.', 'success');
        //window.location.reload();
      })
      .catch(() => {
        message('Network connection error.');
      });
  };
  const handleDataEditor = (e, type) => {
    setQuoteData({ ...quoteData, [type]: draftToHtml(convertToRaw(e.getCurrentContent())) });
  };
  const convertHtmlToDraftcondition = (existingQuoteformal) => {
    if (existingQuoteformal && existingQuoteformal.quote_condition) {
      const contentBlock = htmlToDraft(existingQuoteformal && existingQuoteformal.quote_condition);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        setConditions(editorState);
      }
    }
  };
  const convertHtmlToDraft = (existingQuoteformal) => {
    if (existingQuoteformal && existingQuoteformal.intro_drawing_quote) {
      const contentBlock = htmlToDraft(
        existingQuoteformal && existingQuoteformal.intro_drawing_quote,
      );
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        setLineItem(editorState);
      }
    }
  };

  useEffect(() => {
    getQuote();
    setQuoteData(quoteDatas);
    convertHtmlToDraftcondition(quoteDatas);
    convertHtmlToDraft(quoteDatas);
  }, [quoteDatas]);
  return (
    <>
      <Modal size="lg" isOpen={editQuoteModal}>
        <ModalHeader>Edit Quote Display </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Form inline>
              <FormGroup>
                <Row>
                  <Col md="4">
                    <FormGroup>
                      <Label>Quote Date</Label>
                      <Input
                        type="date"
                        onChange={handleData}
                        value={quoteData && moment(quoteData.quote_date).format('YYYY-MM-DD')}
                        name="quote_date"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Quote Status</Label>
                      <Input
                        type="select"
                        name="quote_status"
                        defaultValue={quoteData && quoteData.quote_status}
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
                        value={quoteData && quoteData.discount}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="4">
                    <FormGroup>
                      <Label>Project Reference</Label>
                      <Input
                        type="text"
                        name="project_reference"
                        onChange={handleData}
                        value={quoteData && quoteData.project_reference}
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
                        value={quoteData && quoteData.project_location}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Mode of Payment</Label>
                      <Input
                        type="select"
                        name="payment_method"
                        defaultValue={quoteData && quoteData.payment_method}
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
                        value={quoteData && quoteData.ref_no_quote}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Quote Revision</Label>
                      <Input
                        type="text"
                        name="revision"
                        onChange={handleData}
                        value={quoteData && quoteData.revision}
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
                        insertquote();
                        editQuotations();
                      }}
                    >
                      Save & Continue
                    </Button>
                    <Button
                      className="shadow-none"
                      color="secondary"
                      onClick={() => {
                        setEditQuoteModal(false);
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

export default EditQuotation;

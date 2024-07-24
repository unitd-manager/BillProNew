import React, { useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import {EditorState, convertToRaw, ContentState } from 'draft-js';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
//import ComponentCardV2 from '../../components/ComponentCardV2';
import message from '../../components/Message';
import api from '../../constants/api';
// import SettingCreationModification from '../../components/SettingTable/SettingCreationModification';
import creationdatetime from '../../constants/creationdatetime';
//import DeleteButton from '../../components/DeleteButton';
import ApiButton from '../../components/ApiButton';

const TranslationEdit = () => {
  //All state variable
  const [translationdetails, setTranslationdetails] = useState();
  const [lineItem, setLineItem] = useState('')
  const [valueType, setValueType] = useState();
  //navigation and parameters
  const { id } = useParams();
  const navigate = useNavigate();

  //const applyChanges = () => {};
  const backToList = () => {
    navigate('/translation');
  };
  //translation data in translationdetails
  const handleInputs = (e) => {
    setTranslationdetails({ ...translationdetails, [e.target.name]: e.target.value });
  };

  console.log("value",valueType)
  //getting data from translation by Id
  const getSettingById = () => {
    api
      .post('/translation/getTranslationById', { translation_id: id })
      .then((res) => {
        setTranslationdetails(res.data.data[0]);
        setValueType(res.data.data[0].is_html_text);
      })
      .catch(() => {
        message('translation Data Not Found', 'info');
      });
  };
  //Update Setting
  const editSettingData = () => {
    translationdetails.modification_date = creationdatetime;
    if (translationdetails.key_text !== '') {
      api
        .post('/translation/editTranslation', translationdetails)
        .then(() => {
          message('Record editted successfully', 'success');
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields.', 'error');
    }
  };
  const handleDataEditor = (e,type) =>{
        
    setTranslationdetails({...translationdetails, [type]:draftToHtml(convertToRaw(e.getCurrentContent()))});
  }

  const convertHtmlToDraft = (existingQuoteformal) =>{
    if(existingQuoteformal && existingQuoteformal.value){
        const contentBlock = htmlToDraft(existingQuoteformal && existingQuoteformal.value);
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
          const editorState = EditorState.createWithContent(contentState);
          setLineItem(editorState)
        }
    }
}
  //delete Setting
  // const deleteSettingData = () => {
  //   api.post('/setting/deleteSetting', { translation_id: id })
  //     .then(() => {
  //       message('Record delete successfully', 'success');
  //       navigate('/Setting');
  //     })
  //     .catch(() => {
  //       message('Unable to delete record.', 'error');
  //     });
  // };
  useEffect(() => {
    getSettingById();
    convertHtmlToDraft()
  }, [id]);

  return (
    <>
      <BreadCrumbs />
      {/* <Form>
        <FormGroup> */}
          <ToastContainer></ToastContainer>
          {/* <ComponentCardV2>
            <Row>
              <Col>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    editSettingData();
                    navigate('/translation');
                    
                  }}
                >
                  Save
                </Button>
              </Col>
              <Col>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    editSettingData();
                    applyChanges();
                  }}
                >
                  Apply
                </Button>
              </Col>
              <Col>
                <Button
                  type="submit"
                  className="btn btn-dark shadow-none"
                  onClick={(e) => {
                    if (window.confirm('Are you sure you want to cancel? ')) {
                      navigate('/Setting');
                    } else {
                      e.preventDefault();
                    }
                  }}
                >
                  Cancel
                </Button>
              </Col>
              <Col>
                <DeleteButton id={id} columnname="translation_id" tablename="translation"></DeleteButton>
              </Col>
              <Col>
                <Button
                  className="shadow-none"
                  color="dark"
                  onClick={() => {
                    backToList();
                  }}
                >
                  Back to List
                </Button>
              </Col>
            </Row>
          </ComponentCardV2>
        </FormGroup>
      </Form> */}
      <ApiButton
              editData={editSettingData}
              navigate={navigate}
              applyChanges={editSettingData}
              //deleteData={deleteBookingData}
              backToList={backToList}
              module="Translation"
            ></ApiButton>
      {/* Translation Details */}
      <Form>
        <FormGroup>
          <ComponentCard title="Translation Details" creationModificationDate={translationdetails}>
            {' '}
            <ToastContainer></ToastContainer>
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label>Key Text</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={translationdetails && translationdetails.key_text}
                    name="key_text"
                  ></Input>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Description</Label>
                  <Input
                    type="textarea"
                    onChange={handleInputs}
                    value={translationdetails && translationdetails.chi_value}
                    name="chi_value"
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Value text</Label>
                  <Input
                    type="select"
                    value={translationdetails && translationdetails.is_html_text}
                    name="is_html_text"
                    onChange={handleInputs}
                  >
                    <option defaultValue="selected">
                      Please Select
                    </option>
                    <option value="Text">Text</option>
                    <option value="Html Text">Html Text</option>
                    
                  </Input>
                </FormGroup>
              </Col>
                {valueType && valueType === 'Text' && (
              <Col md="4">
                <FormGroup>
                  <Label> English Value</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={translationdetails && translationdetails.value}
                    name="value"
                  />
                </FormGroup>
              </Col>
                )}

               {valueType && valueType === 'Html Text' && ( 
                <Row>
                <Col>
              <Row>
                        <Label> English Html Text</Label>
                        </Row>
                        <Editor
                            editorState={lineItem}
                            wrapperClassName="demo-wrapper mb-0"
                            editorClassName="demo-editor border mb-4 edi-height"
                            // value={translationdetails && translationdetails.value}
                            onEditorStateChange={(e)=>{
                                handleDataEditor(e,'value')
                                setLineItem(e)
                            }}
                        />
                        </Col>
                        </Row>
               )} 
               {valueType && valueType === 'Text' && (
              <Col md="4">
                <FormGroup>
                  <Label>Arabic Value</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={translationdetails && translationdetails.arb_value}
                    name="arb_value"
                  />
                </FormGroup>
              </Col>
                )}

               {valueType && valueType === 'Html Text' && ( 
                <Row>
                <Col>
              <Row>
                        <Label> Arabic Html Text</Label>
                        </Row>
                        <Editor
                            editorState={lineItem}
                            wrapperClassName="demo-wrapper mb-0"
                            editorClassName="demo-editor border mb-4 edi-height"
                            // value={translationdetails && translationdetails.value}
                            onEditorStateChange={(e)=>{
                                handleDataEditor(e,'value')
                                setLineItem(e)
                            }}
                        />
                        </Col>
                        </Row>
               )}  
               <Col md="4">
                  <Label>Show to user</Label>
                  <FormGroup>
                    <Input
                      type="radio"
                      name="show_to_user"
                      value="1"
                      onChange={handleInputs}
                      defaultChecked={translationdetails && translationdetails.show_to_user === 1 && true}
                    ></Input>&nbsp;&nbsp;
                    <Label>Yes</Label>&nbsp;&nbsp;
                    <Input
                      type="radio"
                      name="show_to_user"
                      value="0"
                      onChange={handleInputs}
                      defaultChecked={translationdetails && translationdetails.show_to_user === 0 && true}
                    ></Input>&nbsp;&nbsp;
                    <Label>No</Label>
                  </FormGroup>
                </Col>  
            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>

     
    </>
  );
};

export default TranslationEdit;
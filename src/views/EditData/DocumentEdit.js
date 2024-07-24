import React, {useContext, useEffect, useState } from 'react';
import {Row, Col, Form, FormGroup, TabContent, TabPane, Button} from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import * as Icon from 'react-feather';
import message from '../../components/Message';
//import DocumentButton from '../../components/DocumentTable/DocumentButton';
import DocumentEditDetails from '../../components/DocumentTable/DocumentEditDetails';
import ComponentCard from '../../components/ComponentCard';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';
import Tab from '../../components/project/Tab';
import ApiButton from '../../components/ApiButton';


const DocumentEdit = () => {
  // All state variables

  const [documenteditdetails, setDocumentEditDetails] = useState();
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [RoomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState('');
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const [update, setUpdate] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();

  //Get Staff Details
  const { loggedInuser } = useContext(AppContext);
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
  const selectedLanguage = getSelectedLanguageFromLocalStorage();

  // Function to toggle tabs
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const tabs = [
    { id: '1', name: 'Attachment' },
  ];

  const [arabic, setArabic] = useState([]);
  const arb =selectedLanguage === 'Arabic'
  const eng =selectedLanguage === 'English'

  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }
  const backToList = () => {
    navigate('/Document');
  };
  const getArabicLabels = () => {
    api
    .get('/document/getTranslationForDocument')
    .then((res) => {
      setArabic(res.data.data);
    })
    .catch(() => {
      // Handle error if needed
    });   
  };

   // Attachment
   const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
  };

  //Setting data in Change Request Edit Details
  const handleInputs = (e) => {
    setDocumentEditDetails({ ...documenteditdetails, [e.target.name]: e.target.value });
  };

  // Get Change Request data By Purchase Id
  const getDocumentById = () => {
    api
      .post('/document/getDocumentById', { document_id : id })
      .then((res) => {
        setDocumentEditDetails(res.data.data[0]);
      })
  };

  //Edit Change Request Data
  const editDocumentData = () => {
    if (documenteditdetails.document_title !== '')
    {
      documenteditdetails.modification_date = creationdatetime;
      documenteditdetails.modified_by= loggedInuser.first_name; 
      api
        .post('/document/editDocument', documenteditdetails)
        .then(() => {
          message('Record edited successfully', 'success');
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };

  //useEffect
  useEffect(() => {
    getDocumentById();
    getArabicLabels();
  }, [id]);

  return (
    <>
          <BreadCrumbs heading={documenteditdetails && documenteditdetails.title} />
          {/* Save Apply and Back to list Buttons */}
          {/* <DocumentButton id={id} editDocumentData={editDocumentData} navigate={navigate} />
           */}
          <ApiButton
              editData={editDocumentData}
              navigate={navigate}
              applyChanges={editDocumentData}
              //deleteData={deleteBookingData}
              backToList={backToList}
              module="Document"
            ></ApiButton>
          {/* Document Edit Details Details Form */}
          <DocumentEditDetails
           documenteditdetails={documenteditdetails}
           handleInputs={handleInputs}
           editDocumentData={editDocumentData}
           arabic={arabic}
           arb={arb}
           eng={eng}
           genLabel={genLabel}
          ></DocumentEditDetails>
          
          {/* Attachment Tab */}
          <ComponentCard title="More Details">
           <ToastContainer></ToastContainer>
           <Tab toggle={toggle} tabs={tabs} />
           <TabContent className="p-4" activeTab={activeTab}>
           <TabPane tabId="1">
           <Form>
              <FormGroup>
                  <Row>
                    <Col xs="12" md="3" className="mb-3">
                      <Button
                        className="shadow-none"
                        color="primary"
                        onClick={() => {
                          setRoomName('Document');
                          setFileTypes(['JPG','JPEG', 'PNG', 'GIF', 'PDF']);
                          dataForAttachment();
                          setAttachmentModal(true);
                        }}
                      >
                        <Icon.File className="rounded-circle" width="20" />
                      </Button>
                    </Col>
                  </Row>
                  <AttachmentModalV2
                    moduleId={id}
                    attachmentModal={attachmentModal}
                    setAttachmentModal={setAttachmentModal}
                    roomName={RoomName}
                    fileTypes={fileTypes}
                    altTagData="DocumentRelated Data"
                    desc="DocumentRelated Data"
                    recordType="RelatedPicture"
                    mediaType={attachmentData.modelType}
                    update={update}
                    setUpdate={setUpdate}
                  />
                  <ViewFileComponentV2 moduleId={id} roomName="Document" recordType="RelatedPicture" update={update}
                    setUpdate={setUpdate}/>
              </FormGroup>
            </Form>
          </TabPane>
        </TabContent>
        </ComponentCard>
   </>   
  );
};
export default DocumentEdit;

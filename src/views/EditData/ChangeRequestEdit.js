import React, {useContext, useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input,TabContent, TabPane, Button} from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import * as Icon from 'react-feather';
import moment from 'moment';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import Tab from '../../components/project/Tab';
import message from '../../components/Message';
//import ChangeRequestButton from '../../components/ChangeRequestTable/ChangeRequestButton';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';
import ApiButton from '../../components/ApiButton';

const ChangeRequestEdit = () => {
  // All state variables

  const [changerequesteditdetails, setChangeRequestDetails] = useState();
  const [project, setProject] = useState([]);
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
  const backToList = () => {
    navigate('/ChangeRequest');
  };
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

   // Attachment
   const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
  };

  //Setting data in Change Request Edit Details
  const handleInputs = (e) => {
    setChangeRequestDetails({ ...changerequesteditdetails, [e.target.name]: e.target.value });
  };

  const [arabic, setArabic] = useState([]);
  const arb =selectedLanguage === 'Arabic'

  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }

  const getArabicCompanyName = () => {
    api
    .get('/changerequest/getTranslationForChangeRequest')
    .then((res) => {
      setArabic(res.data.data);
    })
    .catch(() => {
      // Handle error if needed
    });   
  };

  // Get Change Request data By Purchase Id
  const getChangeRequestById = () => {
    api
      .post('/changerequest/getChangeRequestById', { change_request_id : id })
      .then((res) => {
        setChangeRequestDetails(res.data.data[0]);
      })
  };

  //Edit Change Request Data
  const editChangeRequestData = () => {
    if (changerequesteditdetails.change_request_title)
    {
      changerequesteditdetails.modification_date = creationdatetime;
      changerequesteditdetails.modified_by= loggedInuser.first_name; 
      api
        .post('/changerequest/editChangeRequest', changerequesteditdetails)
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

  const getProjectTitle = () => {
    api
      .get('/changerequest/getProjectTitle')
      .then((res) => {
        setProject(res.data.data);
      })
      .catch(() => {
        message('Supplier not found', 'info');
      });
  };

  //useEffect
  useEffect(() => {
    getChangeRequestById();
    getProjectTitle();
    getArabicCompanyName();
  }, [id]);

  return (
    <>
      <BreadCrumbs />
      <Form>
        <FormGroup>
          {/* <ChangeRequestButton id={id} editChangeRequestData={editChangeRequestData} navigate={navigate} /> */}
          <ApiButton
              editData={editChangeRequestData}
              navigate={navigate}
              applyChanges={editChangeRequestData}
              //deleteData={deleteBookingData}
              backToList={backToList}
              module="ChangeRequest"
            ></ApiButton>
          {/* Content Details Form */}
          <ComponentCard title="Change request Details" creationModificationDate={changerequesteditdetails}>
            <ToastContainer></ToastContainer>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdChangeRequest.Title')?.[genLabel]}
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            changerequesteditdetails && changerequesteditdetails.change_request_title_arb ? changerequesteditdetails.change_request_title_arb :
                            (changerequesteditdetails && changerequesteditdetails.change_request_title_arb !== null ? '' : changerequesteditdetails && changerequesteditdetails.change_request_title)
                          )
                        : (changerequesteditdetails && changerequesteditdetails.change_request_title)
                    }
                    name={arb ? 'change_request_title_arb': 'change_request_title'}
                                />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdChangeRequest.ProjectTitle')?.[genLabel]}
                  </Label>
                    <Input
                          type="select"
                          onChange={handleInputs}
                          value={changerequesteditdetails && changerequesteditdetails.project_id}
                          name="project_id"
                        >
                          <option defaultValue="selected">Please Select</option>
                          {project &&
                            project.map((e) => {
                              return (
                                <option key={e.project_id} value={e.project_id}>
                                  {e.title}
                                </option>
                              );
                            })}
                     </Input>
              </FormGroup>
              </Col>

              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdChangeRequest.SubmissionDate')?.[genLabel]}
                  </Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={changerequesteditdetails && moment(changerequesteditdetails.submission_date).format('YYYY-MM-DD')}
                    name="submission_date"
                  />
                </FormGroup>
              </Col>

              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdChangeRequest.ImplementationDate')?.[genLabel]}
                  </Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    min={changerequesteditdetails && moment(changerequesteditdetails.submission_date).format('YYYY-MM-DD')}
                    value={changerequesteditdetails && moment(changerequesteditdetails.proposed_implementation_date).format('YYYY-MM-DD')}
                    name="proposed_implementation_date"
                  />
                </FormGroup>
              </Col>
              </Row>
              <Row>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdChangeRequest.Status')?.[genLabel]}
                  </Label>
                  <Input
                    value={changerequesteditdetails && changerequesteditdetails.status}
                    type="select"
                    onChange={handleInputs}
                    name="status"
                  >
                    <option value="">Please Select</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </Input>
                  </FormGroup>
                  </Col>
                  <Col md="3">
                <FormGroup>
                  
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdChangeRequest.Description')?.[genLabel]}
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            changerequesteditdetails && changerequesteditdetails.description_arb ? changerequesteditdetails.description_arb :
                            (changerequesteditdetails && changerequesteditdetails.description_arb !== null ? '' : changerequesteditdetails && changerequesteditdetails.description)
                          )
                        : (changerequesteditdetails && changerequesteditdetails.description)
                    }
                    name={arb ? 'description_arb': 'description'}
                                />
                </FormGroup>
              </Col>
              </Row>
              </ComponentCard>
              </FormGroup>
            </Form>

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
                          setRoomName('ChangeRequest');
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
                    altTagData="ChangeRequestRelated Data"
                    desc="ChangeRequestRelated Data"
                    recordType="RelatedPicture"
                    mediaType={attachmentData.modelType}
                    update={update}
                    setUpdate={setUpdate}
                  />
                  <ViewFileComponentV2 moduleId={id} roomName="ChangeRequest" recordType="RelatedPicture" update={update}
                    setUpdate={setUpdate}/>
              </FormGroup>
            </Form>
          </TabPane>
        </TabContent>
        </ComponentCard>
   </>     
  );
};
export default ChangeRequestEdit;

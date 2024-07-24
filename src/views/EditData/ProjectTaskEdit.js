import React, { useContext, useEffect, useState } from 'react';
import {Row, Col, Form, FormGroup, TabContent, TabPane, Button} from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams} from 'react-router-dom';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import * as Icon from 'react-feather';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import Tab from '../../components/project/Tab';
import ComponentCard from '../../components/ComponentCard';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import message from '../../components/Message';
import creationdatetime from '../../constants/creationdatetime';
import api from '../../constants/api';
//import ProjectTaskEditButton from '../../components/ProjectTaskTable/ProjectTaskEditButton';
import ProjectTaskEditDetails from '../../components/ProjectTaskTable/ProjectTaskEditDetails';
import AppContext from '../../context/AppContext';
import ProjectTimeSheet from '../../components/JobOrderTable.js/ProjectTimesheet';
import ApiButton from '../../components/ApiButton';

const TaskEdit = () => {
  //All state variable
  const [projectTask, setProjectTask] = useState();
  const [employeeProject, setEmployeeProject] = useState();
  const [projectdetails, setProjectDetails] = useState();
  // const [companydetails, setCompanyDetails] = useState();
  const [description, setDescription] = useState('');
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [RoomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState('');
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const [update, setUpdate] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const { id } = useParams();

  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };

const selectedLanguage = getSelectedLanguageFromLocalStorage();
const [arabic, setArabic] = useState([]);


  const arb =selectedLanguage === 'Arabic'
  

  const getArabicCompanyName = () => {
      api
      .get('/projecttask/getTranslationForProjectTask')
      .then((res) => {
        setArabic(res.data.data);
      })
      .catch(() => {
        // Handle error if needed
      });   
  };
 
  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }


  //navigation and parameters
  const navigate = useNavigate();

   // Function to toggle tabs
   const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const tabs = [
    { id: '1', name: 'Timesheet' },
    { id: '2', name: 'Attachment' }
  ];

   // Attachment
   const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
  };

  //Get Staff Details
  const { loggedInuser } = useContext(AppContext);

  // data in Description Modal
  const handleDataEditor = (e, type) => {
    setProjectTask({
      ...projectTask,
      [type]: draftToHtml(convertToRaw(e.getCurrentContent())),
    });
  };

  //Description Modal
  const convertHtmlToDraft = (existingQuoteformal) => {
    const contentBlock = htmlToDraft(existingQuoteformal && existingQuoteformal);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      setDescription(editorState);
    }
  };
  //Api call for getting project name dropdown
  const getProjectname = () => {
    api
      .get('/projecttask/getProjectTitle')
      .then((res) => {
        setProjectDetails(res.data.data);
        console.log(res.data.data[0]);
      })
      .catch(() => {
        message('Company not found', 'info');
      });
  };

  //Api call for getting company name dropdown
  // const getCompanyName = () => {
  //   api
  //     .get('/projecttask/getCompanyName')
  //     .then((res) => {
  //       setCompanyDetails(res.data.data);
  //       console.log(res.data.data[0]);
  //     })
  //     .catch(() => {
  //       message('Company not found', 'info');
  //     });
  // };
  const backToList = () => {
    navigate('/ProjectTask');
  };
  //handleInputs data
  const handleInputs = (e) => {
    setProjectTask({ ...projectTask, [e.target.name]: e.target.value });
  };

  //getting data from task by Id
  const getTaskById = () => {
    api.post('/projecttask/getProjectTaskById', { project_task_id: id })
    .then((res) => {
      const taskData = res.data.data[0];
      setProjectTask(taskData);
      if (taskData.description) {
        convertHtmlToDraft(taskData.description);
      }
    });
  };  

  // //  Gettind data from Job By Id
  const getEmployee = () => {
    api
      .get('/projecttask/getEmployeeName')
      .then((res) => {
        console.log(res.data.data);
        setEmployeeProject(res.data.data);
      })
      .catch(() => {});
  };


  //Update task
  const editTask = () => {
    if (projectTask.task_title !== '')
    {
      projectTask.modification_date = creationdatetime;
      projectTask.modified_by= loggedInuser.first_name; 
    api
      .post('/projecttask/editProjectTask', projectTask)
      .then(() => {
        message('Record editted successfully', 'success');
        // getTaskById();
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
    }
    else {
      message('Please fill all required fields', 'warning');
    }
  };

  //UseEffect
  useEffect(() => {
    getTaskById();
    getProjectname();
    getEmployee();
    getArabicCompanyName();
  }, [id]);

  return (
    <>
      <BreadCrumbs />
      {/* <ProjectTaskEditButton id={id} editTask={editTask} navigate={navigate} arb={arb} /> */}
      <ApiButton
              editData={editTask}
              navigate={navigate}
              applyChanges={editTask}
              //deleteData={deleteBookingData}
              backToList={backToList}
              module="ProjectTask"
            ></ApiButton>
      {/* projectTask Details */}
      <ProjectTaskEditDetails
         projectTask={projectTask}
         handleInputs = {handleInputs}
         projectdetails = {projectdetails}
         employeeProject ={employeeProject}
         description = {description}
         handleDataEditor = {handleDataEditor}
         setDescription = {setDescription}
         arb={arb}
         arabic={arabic}
         genLabel={genLabel}
      ></ProjectTaskEditDetails>

      {/* Attachment Tab */}
      <ComponentCard title="More Details">
           <ToastContainer></ToastContainer>
           <Tab toggle={toggle} tabs={tabs} />
           <TabContent className="p-4" activeTab={activeTab}>
           <TabPane tabId="1">
           <Form>
              <FormGroup>
              <ProjectTimeSheet
              id={id}
            />
             
               </FormGroup>
            </Form>
          </TabPane>
          <TabPane tabId="2">
           <Form>
              <FormGroup>
                  <Row>
                    <Col xs="12" md="3" className="mb-3">
                      <Button
                        className="shadow-none"
                        color="primary"
                        onClick={() => {
                          setRoomName('ProjectTask');
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
                    altTagData="ProjectTaskRelated Data"
                    desc="ProjectTaskRelated Data"
                    recordType="RelatedPicture"
                    mediaType={attachmentData.modelType}
                    update={update}
                    setUpdate={setUpdate}
                  />
                  <ViewFileComponentV2 moduleId={id} roomName="ProjectTask" recordType="RelatedPicture" update={update}
                    setUpdate={setUpdate}/>
              </FormGroup>
            </Form>
          </TabPane>
        </TabContent>
        </ComponentCard>
    </>
  );
};

export default TaskEdit;

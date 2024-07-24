import React, { useEffect, useState, useContext } from 'react';
import {
  Row,
  Col,
 
  Button, 
  TabPane,
  TabContent,
} from 'reactstrap';
import * as Icon from 'react-feather';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import ComponentCard from '../../components/ComponentCard';
import creationdatetime from '../../constants/creationdatetime';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import message from '../../components/Message';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import api from '../../constants/api';
import ComponentCardV2 from '../../components/ComponentCardV2';
import PlanningMainDetails from '../../components/EquipmentIssue/PriceMainDetails';
//import PlanningButton from '../../components/EquipmentIssue/PriceButton';
import Tab from '../../components/project/Tab';
import AppContext from '../../context/AppContext';
import PdfEquipmentIssue from '../../components/PDF/PdfEquipmentIssue';
import ApiButton from '../../components/ApiButton';


const EquipmentIssueEdit = () => {
  //Const Variables
  const [activeTab, setActiveTab] = useState('1');
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [plannings, setPlannings] = useState({});
  const [RoomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState('');
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const [update, setUpdate] = useState(false);

  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();

  // Button Save Apply Back List
 // const applyChanges = () => {};
  const backToList = () => {
    navigate('/EquipmentIssue');
  };
  const { loggedInuser } = useContext(AppContext);
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
  const selectedLanguage = getSelectedLanguageFromLocalStorage();

    // Start for tab refresh navigation #Renuka 1-06-23
    const tabs =  [
      {id:'1',name:'Attachment'},
    ];
    const toggle = (tab) => {
      setActiveTab(tab);
    };

    const [arabic, setArabic] = useState([]);
    const arb =selectedLanguage === 'Arabic'
    const eng =selectedLanguage === 'English'

    let genLabel = '';

    if (arb === true) {
      genLabel = 'arb_value';
    } else {
      genLabel = 'value';
    }
  
    const getArabicCompanyName = () => {
      api
      .get('/EquipmentIssue/getTranslationForEquipmentIssue')
      .then((res) => {
        setArabic(res.data.data);
      })
      .catch(() => {
        // Handle error if needed
      });   
    };
  
  // Get Leaves By Id
  const PlanningById = () => {
    api
      .post('/equipmentissue/getEquipmentIssueById', { equipment_issue_id: id })
      .then((res) => {
        setPlannings(res.data.data[0]);
      })
      .catch(() => {
        
      });
  };
  //Leave Functions/Methods
  const handleInputs = (e) => {
    setPlannings({ ...plannings, [e.target.name]: e.target.value });
  
  };
  // Attachment
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
  };

  //Logic for edit data in db
  const editplanningData = () => {
    plannings.modification_date = creationdatetime;
    plannings.modified_by = loggedInuser.first_name;
    if (
      plannings.equipment_issue_date      ) {
      api
        .post('/equipmentissue/editEquipmentIssue', plannings)
        .then(() => {
          PlanningById();
          message('Record editted successfully', 'success');
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };
 
  


  useEffect(() => {
    PlanningById();
    getArabicCompanyName();
  }, [id]);

  return (
    <>
      {/* BreadCrumbs */}
      <BreadCrumbs />
      {/* Button */}
      {/* <PlanningButton
       editData={editplanningData}
        navigate={navigate}
        applyChanges={applyChanges}
        backToList={backToList}
       ></PlanningButton> */}
       <ApiButton
              editData={editplanningData}
              navigate={navigate}
              applyChanges={editplanningData}
              //deleteData={deleteBookingData}
              backToList={backToList}
              module="EquipmentIssue"
            ></ApiButton>
        <ComponentCardV2> <PdfEquipmentIssue ProjectID={id}></PdfEquipmentIssue></ComponentCardV2>
       {/* Main Details */}
      <PlanningMainDetails
        handleInputs={handleInputs}
        plannings={plannings}
        arabic={arabic}
        arb={arb}
        eng={eng}
        genLabel={genLabel}
        ></PlanningMainDetails>

      {/* Nav tab */}
      <ComponentCard title="More Details">
        <ToastContainer></ToastContainer>

      <Tab toggle={toggle} tabs={tabs} />

        <TabContent className="p-4" activeTab={activeTab}>
        
          {/* Start Tab Content 10 */}
          <TabPane tabId="1" eventkey="addEmployee">
            <Row>
             
              <Col xs="12" md="3" className="mb-3">
              <Button
        className="shadow-none"
        color="primary"
        onClick={() => {
          setRoomName('EquipmentIssue');
          setFileTypes(['JPG', 'JPEG', 'PNG', 'GIF', 'PDF']);
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
    altTagData="EquipmentIssue Data"
    desc="EquipmentIssue Data"
    recordType="RelatedPicture"
    mediaType={attachmentData.modelType}
    update={update}
    setUpdate={setUpdate}
  />
  <ViewFileComponentV2 moduleId={id} roomName="EquipmentIssue" recordType="RelatedPicture" update={update}
    setUpdate={setUpdate} />
          </TabPane>
         
        </TabContent>
      </ComponentCard>
    </>
  );
};
export default EquipmentIssueEdit;

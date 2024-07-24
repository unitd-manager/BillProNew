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
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import message from '../../components/Message';
import creationdatetime from '../../constants/creationdatetime';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss'; 
import api from '../../constants/api';
import ComponentCardV2 from '../../components/ComponentCardV2';
import PlanningMainDetails from '../../components/MaterialIssue/PriceMainDetails';
//import PlanningButton from '../../components/MaterialIssue/PriceButton';
import Tab from '../../components/project/Tab';
import Tabs from '../../components/project/Tabs';
import PdfMaterialIssue from '../../components/PDF/PdfMaterialIssue';
import ApiButton from '../../components/ApiButton';
import AppContext from '../../context/AppContext';

const MaterialIssueEdit = () => {
  //Const Variables
  const [activeTab, setActiveTab] = useState('1');
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [plannings, setPlannings] = useState({});
  const [RoomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState('');
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const { loggedInuser } = useContext(AppContext);
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  const [update, setUpdate] = useState(false);

const selectedLanguage = getSelectedLanguageFromLocalStorage();
const [arabic, setArabic] = useState([]);


  const arb =selectedLanguage === 'Arabic'

  const eng =selectedLanguage === 'English'
  

  const getArabicCompanyName = () => {
      api
      .get('/materialissue/getTranslationForMaterialIssue')
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

  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();

  // Button Save Apply Back List
  //const applyChanges = () => {};
  const backToList = () => {
    navigate('/MaterialIssue');
  };

    // Start for tab refresh navigation #Renuka 1-06-23
    const tabs =  [
      {id:'1',name:'Attachment'},
    ];
    const tabsArb = [
      { id: '1', name: 'مرفق' },
     
    ];
    const toggle = (tab) => {
      setActiveTab(tab);
    };
   
  // Get Leaves By Id
  const PlanningById = () => {
    api
      .post('/materialissue/getMaterialIssueById', { material_issue_id: id })
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

    if (
      plannings.material_issue_date      ) {
        plannings.modified_by = loggedInuser.first_name;
      api
        .post('/materialissue/editMaterialIssue', plannings)
        .then(() => {
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
        arb={arb}
       ></PlanningButton> */}
       <ApiButton
              editData={editplanningData}
              navigate={navigate}
              applyChanges={editplanningData}
              //deleteData={deleteBookingData}
              backToList={backToList}
              module="MaterialIssue"
            ></ApiButton>
                    <ComponentCardV2> <PdfMaterialIssue ProjectID={id}></PdfMaterialIssue></ComponentCardV2>

       {/* Main Details */}
      <PlanningMainDetails
        handleInputs={handleInputs}
        plannings={plannings}
        arb={arb}
        arabic={arabic}
        genLabel={genLabel}
        ></PlanningMainDetails>

      {/* Nav tab */}
      <ComponentCard title="More Details">
        <ToastContainer></ToastContainer>
        {eng === true &&
        <Tab toggle={toggle} tabs={tabs} />
        }
        { arb === true &&
        <Tabs toggle={toggle} tabsArb={tabsArb} />
        }
      

        <TabContent className="p-4" activeTab={activeTab}>
        
          {/* Start Tab Content 10 */}
          <TabPane tabId="1" eventkey="addEmployee">
            <Row>
             
              <Col xs="12" md="3" className="mb-3">
              <Button
        className="shadow-none"
        color="primary"
        onClick={() => {
          setRoomName('MaterialIssue');
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
    altTagData="MaterialIssue Data"
    desc="MaterialIssue Data"
    recordType="RelatedPicture"
    mediaType={attachmentData.modelType}
    update={update}
    setUpdate={setUpdate}
  />
  <ViewFileComponentV2 moduleId={id} roomName="MaterialIssue" recordType="RelatedPicture" update={update}
    setUpdate={setUpdate} />
          </TabPane>
         
        </TabContent>
      </ComponentCard>
    </>
  );
};
export default MaterialIssueEdit;

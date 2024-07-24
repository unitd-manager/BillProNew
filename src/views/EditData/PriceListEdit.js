import React, { useEffect, useState, useContext } from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Button,
  TabPane,
  TabContent,
} from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import * as Icon from 'react-feather';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import ComponentCard from '../../components/ComponentCard';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import message from '../../components/Message';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import api from '../../constants/api';
import PlanningMainDetails from '../../components/PriceList/PriceMainDetails';
//import PlanningButton from '../../components/PriceList/PriceButton';
import PlanningCpanel from '../../components/PriceList/PriceListItem';
import PlanEditModal from '../../components/PriceList/PriceEditModal';
import Tab from '../../components/project/Tab';
import Tabs from '../../components/project/Tabs';
import AppContext from '../../context/AppContext';
import creationdatetime from '../../constants/creationdatetime';
import ApiButton from '../../components/ApiButton';

const PriceListEdit = () => {
  //Const Variables
  const [activeTab, setActiveTab] = useState('1');
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [plannings, setPlannings] = useState({});
  const [RoomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState('');
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const [priceliststatus, setPricelistStatus] = useState();
  const [update, setUpdate] = useState(false);
  const [planningDetails, setPlanningDetails] = useState(null);
  const [newPlanningData, setNewPlanningData] = useState({
    product_id: '',
    price: '',
    unit: '',
    title:'',

  });
  const [addContactModal, setAddContactModal] = useState(false);
  const [planData, setPlanData] = useState();
  const [editPlanEditModal, setPlanEditModal] = useState(false);
  const [unitdetails, setUnitDetails] = useState();

  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();

  
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { loggedInuser } = useContext(AppContext);

  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
const selectedLanguage = getSelectedLanguageFromLocalStorage();

const [arabic, setArabic] = useState([]);


  const arb =selectedLanguage === 'Arabic'

  const eng =selectedLanguage === 'English'
   

  const getTranslationForPriceList = () => {
      api
      .get('/pricelistitem/getTranslationForPriceList')
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

  // Button Save Apply Back List
 // const applyChanges = () => {};
  // const saveChanges = () => {
  //   if ((arb && plannings.customer_name_arb.trim() !== '') || (!arb && plannings.customer_name.trim() !== '')) {
  //     navigate('/PriceList');
  //   }
  // };
  const backToList = () => {
    navigate('/PriceList');
  };


    // Start for tab refresh navigation #Renuka 1-06-23
    const tabs =  [
      {id:'1',name:'Price List Item'},
      {id:'2',name:'Attachment'},
    ];
    const tabsArb = [
      { id: '1', name: 'عنصر قائمة الأسعار' },
      { id: '2', name: 'مرفق' },
    ];
    const toggle = (tab) => {
      setActiveTab(tab);
    };
    // End for tab refresh navigation #Renuka 1-06-23
    const addContactToggle = () => {
      setAddContactModal(!addContactModal);
    };
  // Get Leaves By Id
  const PlanningById = () => {
    api
      .post('/pricelistitem/getPriceListById', { price_list_id: id })
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

   //Api call for getting Staff Type From Valuelist
   const getPricelistStatus = () => {
    api
      .get('/pricelistitem/getPricelistStatusFromValuelist')
      .then((res) => {
        setPricelistStatus(res.data.data);
      })
      .catch(() => {
        message('SubCategory Type Data Not Found', 'info');
      });
  };


  //Logic for edit data in db
  const editplanningData = () => {
    setFormSubmitted(true);
    if ((arb && plannings.customer_name_arb.trim() !== '') || (!arb && plannings.customer_name.trim() !== '')) {
      plannings.modification_date = creationdatetime;
      plannings.modified_by = loggedInuser.first_name;
      api
        .post('/pricelistitem/editPriceList', plannings)
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
  const getCpanelLinked = () => {
    api
      .post('/pricelistitem/getPriceListItemLinkedById', { price_list_id: id })
      .then((res) => {
        setPlanningDetails(res.data.data);
      })
      .catch(() => {
       
      });
  };
  
   //Api call for getting Staff Team From Valuelist
   const getUnitFromValuelist = () => {
    api
      .get('/pricelistitem/getUnitFromValuelist')
      .then((res) => {
        setUnitDetails(res.data.data);
      })
      .catch(() => {
        message('Unit Data Not Found', 'info');
      });
  };
  
  
  

//Contact Functions/Methods
const handleAddNewPlanning = (e) => {
  setNewPlanningData({ ...newPlanningData, [e.target.name]: e.target.value });
};


  useEffect(() => {
    PlanningById();
    getCpanelLinked();
    getTranslationForPriceList();
    getUnitFromValuelist();
    getPricelistStatus();
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
        saveChanges={saveChanges}
        backToList={backToList}
        id={id}
        formSubmitted={formSubmitted}
        setFormSubmitted={setFormSubmitted}
       ></PlanningButton> */}
       <ApiButton
              editData={editplanningData}
              navigate={navigate}
              applyChanges={editplanningData}
             // deleteData={deleteBookingData}
              backToList={backToList}
              module="PriceList"
            ></ApiButton>
       {/* Main Details */}
      <PlanningMainDetails
        handleInputs={handleInputs}
        plannings={plannings}
        arb={arb}
        formSubmitted={formSubmitted}
        arabic={arabic}
        genLabel={genLabel}
        priceliststatus={priceliststatus}
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
        <TabPane tabId="1">
           <PlanningCpanel
           planningDetails={planningDetails}
           handleAddNewPlanning={handleAddNewPlanning}
           newPlanningData={newPlanningData}
           setNewPlanningData={setNewPlanningData}
           quoteLine={id}
           addContactModal={addContactModal}
           addContactToggle={addContactToggle}
           setPlanData={setPlanData}
           setPlanEditModal={setPlanEditModal}
           arb={arb}
           arabic = {arabic}
           genLabel={genLabel}
           unitdetails={unitdetails}
           ></PlanningCpanel>
           {/* Cpanel Linked Edit modal */}
           <PlanEditModal
           planData={planData}
           editPlanEditModal={editPlanEditModal}
           setPlanEditModal={setPlanEditModal}
        arabic={arabic}
        genLabel={genLabel}
        unitdetails={unitdetails}
           ></PlanEditModal>
          </TabPane>
          {/* Attachment */}
          <TabPane tabId="2">
            <Form>
              <FormGroup>
                  <Row>
                    <Col xs="12" md="3" className="mb-3">
                      <Button
                        className="shadow-none"
                        color="primary"
                        onClick={() => {
                          setRoomName('Leave');
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
                    altTagData="LeaveRelated Data"
                    desc="LeaveRelated Data"
                    recordType="RelatedPicture"
                    mediaType={attachmentData.modelType}
                    update={update}
                    setUpdate={setUpdate}
                  />
                  <ViewFileComponentV2 moduleId={id} roomName="Leave" recordType="RelatedPicture" update={update}
                    setUpdate={setUpdate}/>
              </FormGroup>
            </Form>
          </TabPane>
        </TabContent>
      </ComponentCard>
    </>
  );
};
export default PriceListEdit;

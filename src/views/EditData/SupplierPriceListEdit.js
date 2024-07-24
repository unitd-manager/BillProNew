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
import PlanningMainDetails from '../../components/SupplierPriceList/PriceMainDetails';
//import PlanningButton from '../../components/SupplierPriceList/PriceButton';
import PlanningCpanel from '../../components/SupplierPriceList/PriceListItem';
import PlanEditModal from '../../components/SupplierPriceList/PriceEditModal';
import Tab from '../../components/project/Tab';
import Tabs from '../../components/project/Tabs';
import ApiButton from '../../components/ApiButton';
import AppContext from '../../context/AppContext';
import creationdatetime from '../../constants/creationdatetime';

const SupplierPriceListEdit = () => {
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

  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();
  const { loggedInuser } = useContext(AppContext);

  // Button Save Apply Back List
  //const applyChanges = () => {};
  const backToList = () => {
    navigate('/SupplierPriceList');
  };


  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
const selectedLanguage = getSelectedLanguageFromLocalStorage();

// Use the selected language value as needed
console.log('Selected language from localStorage:', selectedLanguage);
const [arabic, setArabic] = useState([]);


const arb =selectedLanguage === 'Arabic'

const eng =selectedLanguage === 'English'


const getArabicCompanyName = () => {
    api
    .get('/translation/getTranslationForSupplierPriceList')
    .then((res) => {
      setArabic(res.data.data);
    })
    .catch(() => {
      // Handle error if needed
    });   
};

console.log('arabic',arabic)
useEffect(() => {
  getArabicCompanyName();
}, []);

    // Start for tab refresh navigation #Renuka 1-06-23
    const tabs =  [
      {id:'1',name:'Supplier Price List Item'},
      {id:'2',name:'Attachment'},
    ];

    const tabsArb =  [
      {id:'1',name:'عنصر قائمة أسعار الموردين'},
      {id:'2',name:'مرفق'},
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
      .post('/supplierpricelistitem/getPriceListById', { supplier_price_list_id: id })
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
    
    if (
      plannings.effective_date &&
      plannings.customer_name 
      ) {
       plannings.modification_date = creationdatetime;
        plannings.modified_by= loggedInuser.first_name;
      api
        .post('/supplierpricelistitem/editPriceList', plannings)
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
      .post('/supplierpricelistitem/getPriceListItemLinkedById', { supplier_price_list_id: id })
      .then((res) => {
        setPlanningDetails(res.data.data);
      })
      .catch(() => {
       
      });
  };
  
  
  
  

//Contact Functions/Methods
const handleAddNewPlanning = (e) => {
  setNewPlanningData({ ...newPlanningData, [e.target.name]: e.target.value });
};


  useEffect(() => {
    PlanningById();
    getCpanelLinked();
  }, [id]);

  return (
    <>
      {/* BreadCrumbs */}
      {eng ===true && <BreadCrumbs heading={plannings && plannings.company_name} />}
      { arb === true && <BreadCrumbs heading={plannings && plannings.company_name_arb} />}
      {/* Button */}
      {/* <PlanningButton
       editData={editplanningData}
        navigate={navigate}
        applyChanges={applyChanges}
        backToList={backToList}
        arb={arb}
        arabic={arabic}
        eng={eng}
       ></PlanningButton> */}
       <ApiButton
              editData={editplanningData}
              navigate={navigate}
              applyChanges={editplanningData}
              //deleteData={deleteBookingData}
              backToList={backToList}
              module="SupplierPriceList"
              arb={arb}
        arabic={arabic}
        eng={eng}
            ></ApiButton>
       {/* Main Details */}
      <PlanningMainDetails
        handleInputs={handleInputs}
        plannings={plannings}
        arb={arb}
        arabic={arabic}
        eng={eng}
        ></PlanningMainDetails>

      {/* Nav tab */}
      <ComponentCard title={arb?"المزيد من التفاصيل":"More Details"}>
        <ToastContainer></ToastContainer>
        {/* {eng === true &&
        <Tab toggle={toggle} tabs={tabs} />
        } */}
        { arb === true ?
        <Tabs toggle={toggle} tabsArb={tabsArb} />:<Tab toggle={toggle} tabs={tabs} />
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
        arabic={arabic}
        eng={eng}
           ></PlanningCpanel>
           {/* Cpanel Linked Edit modal */}
           <PlanEditModal
           planData={planData}
           editPlanEditModal={editPlanEditModal}
           setPlanEditModal={setPlanEditModal}
           arb={arb}
           arabic={arabic}
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
                    altTagData="SupplierPriceListRelated Data"
                    desc="SupplierPriceListRelated Data"
                    recordType="RelatedPicture"
                    mediaType={attachmentData.modelType}
                    update={update}
                    setUpdate={setUpdate}
                  />
                  <ViewFileComponentV2 moduleId={id} roomName="SupplierPriceList" recordType="RelatedPicture" update={update}
                    setUpdate={setUpdate}/>
              </FormGroup>
            </Form>
          </TabPane>
        </TabContent>
      </ComponentCard>
    </>
  );
};
export default SupplierPriceListEdit;

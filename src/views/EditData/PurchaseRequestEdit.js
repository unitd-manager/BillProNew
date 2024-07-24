import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, TabContent, TabPane, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import * as Icon from 'react-feather';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
//import PurchaseEditButton from '../../components/PurchaseRquestTable/PurchaseEditButton';
import PurchaseRequestItemModal from '../../components/PurchaseRquestTable/PurchaseRequestItemModal';
import PurchaseRequestEditDetails from '../../components/PurchaseRquestTable/PurchaseRequestEditDetails';
import PurchaseRequestLineItems from '../../components/PurchaseRquestTable/PurchaseRequestLineItems';
import PurchaseRequestItemsEdit from '../../components/PurchaseRquestTable/PurchaseRequestItemsEdit';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';
import Tab from '../../components/project/Tab';
import Tabs from '../../components/project/Tabs';
import ApiButton from '../../components/ApiButton';

const PurchaseRequestEdit = () => {
  // All state variables

  const [purchaserequesteditdetails, setPurchaseRequestEditDetails] = useState();
  const [customername, setCustomerName] = useState([]);
  const [activeTab, setActiveTab] = useState('1');
  const [addPurchaseOrderModal, setAddPurchaseOrderModal] = useState();
  const [addPurchaseOrderEditModal, setAddPurchaseOrderEditModal] = useState();
  const [project, setProject] = useState([]);
  const [quote, setQuote] = useState({});
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [RoomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState('');
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const [update, setUpdate] = useState(false);

  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };

  const selectedLanguage = getSelectedLanguageFromLocalStorage();

  const [arabic, setArabic] = useState([]);

  const arb = selectedLanguage === 'Arabic';

 // const eng = selectedLanguage === 'English';

  const getArabicCompanyName = () => {
    api
      .get('/purchaserequest/getTranslationForPurchaseRequest')
      .then((res) => {
        setArabic(res.data.data);
      })
      .catch(() => {
        // Handle error if needed
      });
  };

  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();

  // Function to toggle tabs
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  const tabs = [
    { id: '1', name: 'Purchase Request Item' },
    { id: '2', name: 'Attachment' },
  ];

  const tabsArb = [
    { id: '1', name: 'عنصر طلب الشراء ' },
    { id: '2', name: 'مرفق' },
  ];

  // Attachment
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
  };
  const backToList = () => {
    navigate('/PurchaseRequest');
  };
  //get staff details
  const { loggedInuser } = useContext(AppContext);

  //Setting data in purchaserequesteditdetails
  const handleInputs = (e) => {
    setPurchaseRequestEditDetails({
      ...purchaserequesteditdetails,
      [e.target.name]: e.target.value,
    });
  };

  // Get Purchase data By Purchase Id
  const getPurchaseRequestDataById = () => {
    api.post('/purchaserequest/getPurchaseRequestById', { purchase_request_id: id }).then((res) => {
      setPurchaseRequestEditDetails(res.data.data[0]);
    });
  };
  //Edit PurchaseRequestData
  const editPurchaseRequestData = () => {
    if (
      purchaserequesteditdetails.purchase_request_date !== '' &&
      purchaserequesteditdetails.purchase_delivery_date !== '' &&
      purchaserequesteditdetails.department !== ''
    ) {
      purchaserequesteditdetails.modification_date = creationdatetime;
      purchaserequesteditdetails.modified_by = loggedInuser.first_name;
      api
        .post('/purchaserequest/editPurchaseRequest', purchaserequesteditdetails)
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

  // getting data from Category
  const getCustomerName = () => {
    api
      .get('/purchaserequest/getCustomerName')
      .then((res) => {
        setCustomerName(res.data.data);
      })
      .catch(() => {
        message('Company not found', 'info');
      });
  };

  const getProject = () => {
    api.get('project/getOppProject').then((res) => {
      setProject(res.data.data);
    });
  };

  const getQuote = () => {
    api.post('/tender/getQuoteById', { opportunity_id: id }).then((res) => {
      setQuote(res.data.data[0]);
    });
  };

  //useEffect
  useEffect(() => {
    getPurchaseRequestDataById();
    getCustomerName();
    getQuote();
    getProject();
    getArabicCompanyName();
  }, [id]);

  return (
    <>
      <BreadCrumbs />
      {/* <PurchaseEditButton
        id={id}
        purchaserequesteditdetails={purchaserequesteditdetails}
        editPurchaseRequestData={editPurchaseRequestData}
        navigate={navigate}
      /> */}
      <ApiButton
              editData={editPurchaseRequestData}
              navigate={navigate}
              id={id}
              applyChanges={editPurchaseRequestData}
              //deleteData={deleteBookingData}
              backToList={backToList}
              module="PurchaseRequest"
            ></ApiButton>
      {/* Content Details Form */}
      <PurchaseRequestEditDetails
        purchaserequesteditdetails={purchaserequesteditdetails}
        handleInputs={handleInputs}
        customername={customername}
        arabic={arabic}
        arb={arb}
      ></PurchaseRequestEditDetails>

      <ComponentCard title={arb ?'المزيد من التفاصيل':'More Details'}>
        <ToastContainer></ToastContainer>
        {/* {eng === true && <Tab toggle={toggle} tabs={tabs} />} */}
        {arb === true ?<Tabs toggle={toggle} tabsArb={tabsArb} />:<Tab toggle={toggle} tabs={tabs} />}
        <TabContent className="p-4" activeTab={activeTab}>
          <TabPane tabId="1">
            <PurchaseRequestItemModal
              PurchaseRequestId={id}
              addPurchaseOrderModal={addPurchaseOrderModal}
              setAddPurchaseOrderModal={setAddPurchaseOrderModal}
              arabic={arabic}
              arb={arb}
            />
            <Row className="mb-4">
              {/* <Col md="2">
            <Button
              color="primary"
              onClick={() => {
                setAddPurchaseOrderModal(true);
              }}
            >
              Add Product
            </Button>
          </Col> */}
              <Col md="2">
                <PurchaseRequestItemsEdit
                  addPurchaseOrderEditModal={addPurchaseOrderEditModal}
                  setAddPurchaseOrderEditModal={setAddPurchaseOrderEditModal}
                  PurchaseRequestID={id}
                  arabic={arabic}
                  arb={arb}
                ></PurchaseRequestItemsEdit>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    setAddPurchaseOrderEditModal(true);
                  }}
                >
                  {arb ?'يحرر':'Edit'}
                </Button>
              </Col>
            </Row>
            <PurchaseRequestLineItems
              PurchaseRequestID={id}
              project={project}
              quote={quote}
              arabic={arabic}
              arb={arb}
            />
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
                        setRoomName('PurchaseRequest');
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
                  altTagData="PurchaseRequestRelated Data"
                  desc="PurchaseRequestRelated Data"
                  recordType="RelatedPicture"
                  mediaType={attachmentData.modelType}
                  update={update}
                  setUpdate={setUpdate}
                  arabic={arabic}
                  arb={arb}
                />
                <ViewFileComponentV2
                  moduleId={id}
                  roomName="PurchaseRequest"
                  recordType="RelatedPicture"
                  update={update}
                  setUpdate={setUpdate}
                  arabic={arabic}
                  arb={arb}
                />
              </FormGroup>
            </Form>
          </TabPane>
        </TabContent>
      </ComponentCard>
    </>
  );
};
export default PurchaseRequestEdit;

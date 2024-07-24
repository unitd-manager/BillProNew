import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Form, FormGroup, Button, TabContent, TabPane} from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useNavigate, useParams } from 'react-router-dom';
import '../form-editor/editor.scss';
import * as Icon from 'react-feather';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
//import ComponentCardV2 from '../../components/ComponentCardV2';
import creationdatetime from '../../constants/creationdatetime';
import message from '../../components/Message';
import api from '../../constants/api';
import PurchaseOrderLinked from '../../components/SupplierModal/Purchaseorderlinked';
import SupplierTable from '../../components/SupplierModal/SupplierTable';
import SupplierDetails from '../../components/SupplierModal/SupplierDetails';
import AppContext from '../../context/AppContext';
import Tab from '../../components/project/Tab';
import Tabs from '../../components/project/Tabs';
import ApiButton from '../../components/ApiButton';


const SupplierEdit = () => {
  //all state variables
  const [supplier, setSupplier] = useState();
  const [purchaseOrder, setPurchaseOrder] = useState();
  const [allCountries, setAllCountries] = useState();
  const [editPurchaseOrderLinked, setEditPurchaseOrderLinked] = useState(false);
  const [supplierStatus, setSupplierStatus] = useState();
  const [status, setStatus] = useState();
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [RoomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState('');
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const [update, setUpdate] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  // Navigation and Parameter Constants

  //navigation and params
  const { id } = useParams();
  const navigate = useNavigate();
 // const applyChanges = () => {};

  // Function to toggle tabs
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
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
    .get('/translation/getTranslationForSupplier')
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
   // Attachment
   const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
  };
  const backToList = () => {
    navigate('/Supplier');
  };
  //Handle input function
  const handleInputs = (e) => {
    setSupplier({ ...supplier, [e.target.name]: e.target.value });
  };

  //get staff details
  const { loggedInuser } = useContext(AppContext);
  const tabs = [
    { id: '1', name: 'Purchase Order Linked' },
    { id: '2', name: ' Attachment' },
  ];
  const tabsArb =  [
    {id:'1',name:'أمر الشراء مرتبط'},
    {id:'2',name:'مرفق'},
  ];
  
  // Get Supplier By Id
  const editSupplierById = () => {

    api
      .post('/supplier/get-SupplierById', { supplier_id: id })
      .then((res) => {
        setSupplier(res.data.data[0]);
      })
      .catch(() => {
        message('Supplier Data Not Found', 'info');
      });
  };

 
  //Logic for edit data in db
  const editSupplierData = () => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(supplier.email)) {
      message('Invalid email address', 'warning');
    } else if (supplier.company_name !== '' && 
    supplier.email !== '')
       {
      supplier.modification_date = creationdatetime;
      supplier.modified_by= loggedInuser.first_name; 

      api
        .post('/supplier/edit-Supplier', supplier)
        .then((res) => {
          console.log('supplier', res.data.data);
          message('Record editted successfully', 'success');
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
        }  else {
      message('Please fill all required fields.', 'warning');
    }
  };
  
  //Logic for edit data in db
  const Status = () => {
    api
      .post('/supplier/getStatus', { supplier_id: id })
      .then((res) => {
        setStatus(res.data.data[0]);
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };
  
  useEffect(() => {
    editSupplierById();
  }, [id]);
  // Get purchaseOrder By Id

  const suppliereditdetails = () => {
    api
      .get('/supplier/getCountry')
      .then((res) => {
        setAllCountries(res.data.data);
      })
      .catch(() => {
        message('Supplier Data Not Found', 'info');
      });
  };
  //Api call for getting Staff Type From Valuelist
  const getSupplierStatus = () => {
    api
      .get('/supplier/getValueList')
      .then((res) => {
        setSupplierStatus(res.data.data);
      })
      .catch(() => {
        message('Status Data Not Found', 'info');
      });
  };
  useEffect(() => {
    const getpurchaseOrder = () => {
      api
        .post('/supplier/getPurchaseOrderLinkedss', { supplier_id: id })
        .then((res) => {
          setPurchaseOrder(res.data.data);
        })
        .catch(() => {
          message('Supplier not found', 'info');
        });
    };
    getpurchaseOrder();
    suppliereditdetails();
    getSupplierStatus();
    Status();
  }, []);

 

  return (
    <>
     {eng ===true && <BreadCrumbs heading={supplier && supplier.company_name} />}
      { arb === true && <BreadCrumbs heading={supplier && supplier.company_name_arb} />}
      
      {/* <Form>
        <FormGroup>
          <ComponentCardV2>
            <Row>
              <Col>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    editSupplierData();
                    navigate('/Supplier');
                  }}
                >
                   {arb ?'يحفظ':'Save'}  
                </Button>
              </Col>
              <Col>
                <Button
                  color="primary"
                  className="shadow-none"
                  onClick={() => {
                    editSupplierData();
                    setTimeout(() => {
                      applyChanges();
                    }, 800);
                  }}
                >
                  {arb ?'يتقدم':'Apply'}  
                </Button>
              </Col>
              <Col>
                <Button
                  color="dark"
                  className="shadow-none"
                  onClick={() => {
                    applyChanges();
                    navigate('/Supplier');

                  }}
                >
                  {arb ?'الرجوع للقائمة':'Back to List'}  
                </Button>
              </Col>
            </Row>
          </ComponentCardV2>
        </FormGroup>
      </Form> */}
      <ApiButton
              editData={editSupplierData}
              navigate={navigate}
              applyChanges={editSupplierData}
             // deleteData={deleteBookingData}
              backToList={backToList}
              arb={arb}
              module="Supplier"
            ></ApiButton>
      <ComponentCard title={arb?"تفاصيل المورد":"Supplier Details"} creationModificationDate={supplier}>

      <SupplierDetails
        handleInputs={handleInputs}
        supplier={supplier}
        allCountries={allCountries}
        supplierStatus={supplierStatus}
        status={status}
        setEditPurchaseOrderLinked={setEditPurchaseOrderLinked}
        arb={arb}
        arabic={arabic}
        eng={eng}
      ></SupplierDetails>
  </ComponentCard>
     
      <ToastContainer></ToastContainer>
      

       {/* Attachment Tab */}
       

        <ComponentCard title="More Details">
        <ToastContainer></ToastContainer>
        {/* Nav Tab */}
        {eng === true &&
        <Tab toggle={toggle} tabs={tabs} />
        }
        { arb === true &&
        <Tabs toggle={toggle} tabsArb={tabsArb} />
        }
        <TabContent className="p-4" activeTab={activeTab}>
          {/* Contact Linked */}
          <TabPane tabId="1">
          <SupplierTable purchaseOrder={purchaseOrder}
       arb={arb}
       arabic={arabic}
       eng={eng}></SupplierTable>

          <PurchaseOrderLinked
        editPurchaseOrderLinked={editPurchaseOrderLinked}
        setEditPurchaseOrderLinked={setEditPurchaseOrderLinked}
        arb={arb}
        arabic={arabic}
        eng={eng}
      ></PurchaseOrderLinked>
       </TabPane>
          { /* Invoice Linked Portal */}
           <TabPane tabId="2">
           <Form>
              <FormGroup>
                  <Row>
                    <Col xs="12" md="3" className="mb-3">
                      <Button
                        className="shadow-none"
                        color="primary"
                        onClick={() => {
                          setRoomName('Supplier');
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
                    altTagData="SupplierRelated Data"
                    desc="SupplierRelated Data"
                    recordType="RelatedPicture"
                    mediaType={attachmentData.modelType}
                    update={update}
                    setUpdate={setUpdate}
                  />
                  <ViewFileComponentV2 moduleId={id} roomName="Supplier" recordType="RelatedPicture" update={update}
                    setUpdate={setUpdate}/>
              </FormGroup>
            </Form>
          </TabPane>
          { /* Attachment Portal */ }
          
        </TabContent>
      </ComponentCard>
    </>

  );
};

export default SupplierEdit;

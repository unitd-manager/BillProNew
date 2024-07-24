import React, { useEffect, useState, useContext } from 'react';
import { TabContent, TabPane, Table, Row, Button, Col ,Label} from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import * as Icon from 'react-feather';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';
//import ProposalButtons from '../../components/ProposalTable/ProposalButtons';
import PdfQuote from '../../components/PDF/PdfQuotation';
import creationdatetime from '../../constants/creationdatetime';

// import TenderQuotation from '../../components/TenderTable/TenderQuotation';
import ProposalMoreDetails from '../../components/ProposalTable/ProposalMoreDetails';
import Tab from '../../components/project/Tab';
import Tabs from '../../components/project/Tabs';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import AppContext from '../../context/AppContext';
//import ProposalEmployee from '../../components/ProposalTabContent/AddProposalEmployee';
//import TaskEmployee from '../../components/ProposalTabContent/ProposalEmployee';
import AddEmployee from '../../components/ProposalTabContent/AddEmployee';
import ApiButton from '../../components/ApiButton';

const ProposalEdit = () => {
  
  const [activeTab, setActiveTab] = useState('1');
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [update, setUpdate] = useState(false);
  //const [projectTeam, setProjectTeam] = useState({});
  //   const [quote, setQuote] = useState({});
  const [lineItem, setLineItem] = useState([]);
  const [materialItem, setMaterialItem] = useState();
  // const [employee,setEmployee] = useState([]);
  const [proposalDetails, setProposalDetails] = useState();
const [projectManager, seProjectManager] = useState()
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const [RoomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Start for tab refresh navigation #Renuka 1-06-23
  const tabs = [
    { id: '1', name: 'Quotation' },
    { id: '2', name: 'Material Needed' },
    { id: '3', name: 'Project Team' },
    { id: '4', name: 'Attachment' },
  ];
  
  const tabsArb = [
    { id: '1', name: 'اقتباس ' },
    { id: '2', name: 'المواد المطلوبة ' },
    { id: '3', name: 'فريق المشروع' },
    { id: '4', name: 'مرفق' },
  ];
  const toggle = (tab) => {
    setActiveTab(tab);
  };
  // End for tab refresh navigation #Renuka 1-06-23

  //   const [quotationsModal, setquotationsModal] = useState(false);
  //   const [viewLineModal, setViewLineModal] = useState(false);
  const [addContactModal, setAddContactModal] = useState(false);
  const [addCompanyModal, setAddCompanyModal] = useState(false);
  //   const [editQuoteModal, setEditQuoteModal] = useState(false);
  //const [editLineModal, setEditLineModal] = useState(false);
  const [contact, setContact] = useState();
  const [company, setCompany] = useState();

  const [selectedCompany, setSelectedCompany] = useState();
  //const [addLineItemModal, setAddLineItemModal] = useState(false);

  const [allCountries, setallCountries] = useState();

  //   const [quoteForm, setQuoteForm] = useState({
  //     quote_date: '',
  //     quote_code: '',
  //   });
  const { loggedInuser } = useContext(AppContext);
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
const selectedLanguage = getSelectedLanguageFromLocalStorage();
const [arabic, setArabic] = useState([]);


  const arb =selectedLanguage === 'Arabic'

  const eng =selectedLanguage === 'English'
  

  const getArabicCompanyName = () => {
      api
      .get('/proposal/getTranslationForProposal')
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

  const { id } = useParams();
  const navigate = useNavigate();
  //const applyChanges = () => {};
 

  const backToList = () => {
    navigate('/Proposal');
  };

  //   const viewLineToggle = () => {
  //     setViewLineModal(!viewLineModal);
  //   };
  const addContactToggle = () => {
    setAddContactModal(!addContactModal);
  };
  const addCompanyToggle = () => {
    setAddCompanyModal(!addCompanyModal);
  };

  // Get Company Data
  const getCompany = () => {
    api.get('/company/getCompany').then((res) => {
      setCompany(res.data.data);
    });
  };

  const getLineItem = () => {
    api.post('/proposal/getQuoteLineItemsById', { proposal_id: id }).then((res) => {
      setLineItem(res.data.data);
      //setAddLineItemModal(true);
    });
  };

  const getMaterialItem = () => {
    api.post('/proposal/getMaterialLineItemsById', { proposal_id: id }).then((res) => {
      setMaterialItem(res.data.data);
      //setAddLineItemModal(true);
    });
  };

  //Logic for adding company in db

  const [companyInsertData, setCompanyInsertData] = useState({
    company_name: '',
    address_street: '',
    address_town: '',
    address_country: '',
    address_po_code: '',
    phone: '',
    fax: '',
    website: '',
    supplier_type: '',
    industry: '',
    company_size: '',
    source: '',
  });

  const companyhandleInputs = (e) => {
    setCompanyInsertData({ ...companyInsertData, [e.target.name]: e.target.value });
  };

  // Insert Company
  const insertCompany = () => {
    if (
      companyInsertData.company_name !== '' &&
      companyInsertData.phone !== '' &&
      companyInsertData.address_country !== ''
    ) {
      api
        .post('/company/insertCompany', companyInsertData)
        .then(() => {
          message('Company inserted successfully.', 'success');
          toggle();
          getCompany();
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      message('Please fill all required fields.', 'error');
    }
  };

  const getContact = (companyId) => {
    setSelectedCompany(companyId);
    api.post('/company/getContactByCompanyId', { company_id: companyId }).then((res) => {
      setContact(res.data.data);
    });
  };

  // Get Tenders By Id

  const editProposalById = () => {
    api.post('/proposal/getProposalById', { proposal_id: id }).then((res) => {
      setProposalDetails(res.data.data);
      getContact(res.data.data.company_id);
    });
  };

  const handleInputs = (e) => {
    setProposalDetails({ ...proposalDetails, [e.target.name]: e.target.value });
  };

  //Logic for edit data in db

  const editProposalData = () => {
    setFormSubmitted(true);
    if (
      proposalDetails.title &&
      proposalDetails.title !== '' &&
      proposalDetails.proposal_date !== '' &&
      proposalDetails.status !== ''
    ) {
      proposalDetails.modification_date = creationdatetime;
      proposalDetails.modified_by = loggedInuser.first_name;

      api
        .post('/proposal/editProposal', proposalDetails)
        .then(() => {
          message('Record editted successfully', 'success');
          setTimeout(() => {
            window.location.reload();
          }, 300);
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };

  // Add new Contact

  const [newContactData, setNewContactData] = useState({
    salutation: '',
    first_name: '',
    email: '',
    position: '',
    department: '',
    phone_direct: '',
    fax: '',
    mobile: '',
  });

  const handleAddNewContact = (e) => {
    setNewContactData({ ...newContactData, [e.target.name]: e.target.value });
  };

  const AddNewContact = () => {
    const newDataWithCompanyId = newContactData;
    newDataWithCompanyId.company_id = selectedCompany;
    if (newDataWithCompanyId.salutation !== '' && newDataWithCompanyId.first_name !== '') {
      api
        .post('/proposal/insertContact', newDataWithCompanyId)
        .then(() => {
          getContact(newDataWithCompanyId.company_id);
          message('Contact Inserted Successfully', 'success');
          window.location.reload();
        })
        .catch(() => {
          message('Unable to add Contact! try again later', 'error');
        });
    } else {
      message('All fields are required.', 'info');
    }
  };

  //Api for getting all countries
  const getAllCountries = () => {
    api.get('/clients/getCountry').then((res) => {
      setallCountries(res.data.data);
    });
  };

  const getProjectManager = () => {
    api.get('/proposal/getProjectManager').then((res) => {
      seProjectManager(res.data.data);
    });
  };


  const columns1 = [
    {
      name: '#',
    },
    {
      name: arabic.find(item => item.key_text === 'mdproposal.Title')?.[genLabel],
    },
    {
      name: arabic.find(item => item.key_text === 'mdproposal.Description')?.[genLabel],
    },
    {
      
      name: arabic.find(item => item.key_text === 'mdproposal.Qty')?.[genLabel],
    },
    {
      name: arabic.find(item => item.key_text === 'mdproposal.Unit Price')?.[genLabel],
    },
    {
      name: arabic.find(item => item.key_text === 'mdproposal.Amount')?.[genLabel],
    },
  ];

  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
  };

  //Add new Project

  useEffect(() => {
    editProposalById();
    getLineItem();
    getProjectManager();
    getCompany();
    getMaterialItem();
    getAllCountries();
    getArabicCompanyName();
  }, [id]);

  return (
    <>
      <BreadCrumbs heading={proposalDetails && proposalDetails.project_quote_code} />
      {/* <ProposalButtons
        editProposalData={editProposalData}
        navigate={navigate}
        applyChanges={applyChanges}
        backToList={backToList}
        arb={arb}
      ></ProposalButtons> */}
      <ApiButton
              editData={editProposalData}
              navigate={navigate}
              applyChanges={editProposalData}
              //deleteData={deleteBookingData}
              backToList={backToList}
              module="Proposal"
            ></ApiButton>
       <Col md="4">
        <Label>
        {proposalDetails && <PdfQuote id={proposalDetails.project_quote_id} quoteId={proposalDetails.project_quote_id}></PdfQuote>}
                </Label>
      </Col> 
      <ProposalMoreDetails
        companyInsertData={companyInsertData}
        newContactData={newContactData}
        handleInputs={handleInputs}
        handleAddNewContact={handleAddNewContact}
        setAddContactModal={setAddContactModal}
        addContactModal={addContactModal}
        proposalDetails={proposalDetails}
        allCountries={allCountries}
        company={company}
        contact={contact}
        addCompanyModal={addCompanyModal}
        addCompanyToggle={addCompanyToggle}
        companyhandleInputs={companyhandleInputs}
        insertCompany={insertCompany}
        AddNewContact={AddNewContact}
        addContactToggle={addContactToggle}
        setAddCompanyModal={setAddCompanyModal}
        getContact={getContact}
        projectManager={projectManager}
        formSubmitted={formSubmitted}
        arb={arb}
        eng={eng}
        arabic={arabic}
        genLabel={genLabel}
      ></ProposalMoreDetails>

      <ComponentCard title="More Details">
        <ToastContainer></ToastContainer>
        { arb === true ?
        <Tabs toggle={toggle} tabsArb={tabsArb} />: <Tab toggle={toggle} tabs={tabs} />
        }
        {/* <Tab toggle={toggle} tabs={tabs} /> */}
        <TabContent className="p-4" activeTab={activeTab}>
          <TabPane tabId="1">
            
            <br />
            <Row>
              <div className="container">
                <Table id="example" className="display border border-secondary rounded">
                  <thead>
                    <tr>
                      {columns1.map((cell) => {
                        return <td key={cell.name}>{cell.name}</td>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {lineItem &&
                      lineItem.map((e, index) => {
                        return (
                          <tr key={e.proposal_id}>
                            <td>{index + 1}</td>
                            <td data-label="Title">{e.title}</td>
                            <td data-label="Description">{e.description}</td>
                            <td data-label="Quantity">{e.quantity}</td>
                            <td data-label="Unit Price">{e.unit_price}</td>
                            <td data-label="Amount">{e.amount}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </div>
            </Row>
          </TabPane>
          <TabPane tabId="2" eventkey="">
          <br />
            <Row>
              <div className="container">
                <Table id="example" className="display border border-secondary rounded">
                  <thead>
                    <tr>
                      {columns1.map((cell) => {
                        return <td key={cell.name}>{cell.name}</td>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {materialItem &&
                      materialItem.map((e, index) => {
                        return (
                          <tr key={e.proposal_id}>
                            <td>{index + 1}</td>
                            <td data-label="Title">{e.title}</td>
                            <td data-label="Description">{e.description}</td>
                            <td data-label="Quantity">{e.quantity}</td>
                            <td data-label="Unit Price">{e.unit_price}</td>
                            <td data-label="Amount">{e.amount}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </div>
            </Row>
          </TabPane>
          <TabPane tabId="3" eventkey="addEmployee">
            <Row>
              <AddEmployee proposalDetails={proposalDetails}/>
              {/* <TaskEmployee proposalId={id}/> */}
              
            </Row>

            
          </TabPane>

          <TabPane tabId="4">
          <Col xs="12" md="3" className="mb-3">
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    setRoomName('Proposal');
                    setFileTypes(['JPG', 'JPEG', 'PNG', 'GIF', 'PDF']);
                    dataForAttachment();
                    setAttachmentModal(true);
                  }}
                >
                  <Icon.File className="rounded-circle" width="20" />
                </Button>
              </Col>
          <AttachmentModalV2
              moduleId={id}
              attachmentModal={attachmentModal}
              setAttachmentModal={setAttachmentModal}
              roomName={RoomName}
              fileTypes={fileTypes}
              altTagData="ProposalRelated Data"
              desc="ProposalRelated Data"
              recordType="RelatedPicture"
              mediaType={attachmentData.modelType}
              update={update}
              setUpdate={setUpdate}
            />
            <ViewFileComponentV2
              moduleId={id}
              roomName="Proposal"
              recordType="RelatedPicture"
              update={update}
              setUpdate={setUpdate}
            />
          </TabPane>
        </TabContent>
      </ComponentCard>
    </>
  );
};

export default ProposalEdit;

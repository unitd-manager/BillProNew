import React, { useContext, useEffect, useState } from 'react';
import { TabContent, TabPane, Table, Row } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';
//import TenderButtons from '../../components/TenderTable/TenderButtons';
import creationdatetime from '../../constants/creationdatetime';
import TenderMoreDetails from '../../components/TenderTable/TenderMoreDetails';
import TenderAttachment from '../../components/TenderTable/TenderAttachment';
import Tab from '../../components/project/Tab';
import Tabs from '../../components/project/Tabs';
import AppContext from '../../context/AppContext';
import ApiButton from '../../components/ApiButton';

const OpportunityEdit = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [tenderDetails, setTenderDetails] = useState();
  const [lineItem, setLineItem] = useState([]);
  const [addContactModal, setAddContactModal] = useState(false);
  const [addCompanyModal, setAddCompanyModal] = useState(false);
  const [contact, setContact] = useState();
  const [company, setCompany] = useState();
  const [incharge, setIncharge] = useState();
  const [selectedCompany, setSelectedCompany] = useState();
  const [allCountries, setallCountries] = useState();
  const { loggedInuser } = useContext(AppContext);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  //const applyChanges = () => {};
  const backToList = () => {
    navigate('/Enquiry');
  };

  const tabs = [
    { id: '1', name: 'Quotation' },
    { id: '2', name: 'Attachment' },
  ];
  const tabsArb = [
    { id: '1', name: 'جهات الاتصال المرتبطة' },
    { id: '2', name: 'مرفق' },
  ];

  const toggle = (tab) => {
    setActiveTab(tab);
  };

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
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };

  const selectedLanguage = getSelectedLanguageFromLocalStorage();

  // Use the selected language value as needed
  console.log('Selected language from localStorage:', selectedLanguage);
  const companyhandleInputs = (e) => {
    setCompanyInsertData({ ...companyInsertData, [e.target.name]: e.target.value });
  };

  const [arabic, setArabic] = useState([]);
  const [arabicquote, setArabicQuote] = useState([]);

  const arb = selectedLanguage === 'Arabic';

  const eng = selectedLanguage === 'English';

  const getArabicCompanyName = () => {
    api
      .get('/enquiry/getTranslationforTradingEnq')
      .then((res) => {
        setArabic(res.data.data);
      })
      .catch(() => {
        // Handle error if needed
      });
  };

  const getArabicQuotation = () => {
    api
      .get('/tradingquote/getTranslationforTradingQuote')
      .then((res) => {
        setArabicQuote(res.data.data);
      })
      .catch(() => {
        // Handle error if needed
      });
  };

  console.log('arabic', arabic);
  console.log('arabicquote', arabicquote);
  useEffect(() => {
    getArabicCompanyName();
    getArabicQuotation();
  }, []);

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

  // Get Incharge
  const getIncharge = () => {
    api.get('/tender/projectIncharge').then((res) => {
      setIncharge(res.data.data);
    });
  };

  // Get Tenders By Id

  const editTenderById = () => {
    api.post('/tender/getTendersById', { opportunity_id: id }).then((res) => {
      setTenderDetails(res.data.data);
      getContact(res.data.data.company_id);
    });
  };

  const handleInputs = (e) => {
    setTenderDetails({ ...tenderDetails, [e.target.name]: e.target.value });
  };

  //Logic for edit data in db

  const editTenderData = () => {
    setFormSubmitted(true);

    if (tenderDetails.title !== '' && tenderDetails.company_id !== '') {
      // setFormSubmitted(true);
      // if (tenderDetails.company_id.trim() !== '' && tenderDetails.title.trim() !== '')
      tenderDetails.modification_date = creationdatetime;
      tenderDetails.modified_by = loggedInuser.first_name;
      api
        .post('/tender/edit-Tenders', tenderDetails)
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

  const getLineItem = () => {
    api.post('/enquiry/getQuoteLineItemsById', { opportunity_id: id }).then((res) => {
      setLineItem(res.data.data);
      //setAddLineItemModal(true);
    });
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
        .post('/tender/insertContact', newDataWithCompanyId)
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
  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }
  const columns1 = [
    {
      name: '#',
    },
    {
      name:arabicquote.find(item => item.key_text === 'mdTradingQuote.Title')?.[genLabel],
    },

    {
      name:arabicquote.find(item => item.key_text === 'mdTradingQuote.Description')?.[genLabel],
    },
    {
      name:arabicquote.find(item => item.key_text === 'mdTradingQuote.Quantity')?.[genLabel],
    },
    {
      name:arabicquote.find(item => item.key_text === 'mdTradingQuote.Unit Price')?.[genLabel],
    },
    {
      name:arabicquote.find(item => item.key_text === 'mdTradingQuote.Amount')?.[genLabel],
    },
    
  ];

  useEffect(() => {
    editTenderById(); 
    getLineItem();
    getIncharge();
    getCompany();
    getAllCountries();
  }, [id]);

  return (
    <>
      {eng === true && <BreadCrumbs heading={tenderDetails && tenderDetails.title} />}
      {arb === true && <BreadCrumbs heading={tenderDetails && tenderDetails.title_arb} />}
      {/* <BreadCrumbs heading={tenderDetails && tenderDetails.title} /> */}
      {/* <TenderButtons
        editTenderData={editTenderData}
        navigate={navigate}
        applyChanges={applyChanges}
        backToList={backToList}
        tenderDetails={tenderDetails}
        setFormSubmitted={setFormSubmitted}
      ></TenderButtons> */}
      <ApiButton
              editData={editTenderData}
              navigate={navigate}
              applyChanges={editTenderData}
              //deleteData={deleteBookingData}
              backToList={backToList}
              module="Enquiry"
            ></ApiButton>
      <TenderMoreDetails
        arb={arb}
        arabic={arabic}
        companyInsertData={companyInsertData}
        newContactData={newContactData}
        handleInputs={handleInputs}
        handleAddNewContact={handleAddNewContact}
        setAddContactModal={setAddContactModal}
        addContactModal={addContactModal}
        tenderDetails={tenderDetails}
        allCountries={allCountries}
        company={company}
        contact={contact}
        incharge={incharge}
        addCompanyModal={addCompanyModal}
        addCompanyToggle={addCompanyToggle}
        companyhandleInputs={companyhandleInputs}
        insertCompany={insertCompany}
        AddNewContact={AddNewContact}
        addContactToggle={addContactToggle}
        setAddCompanyModal={setAddCompanyModal}
        getContact={getContact}
        formSubmitted={formSubmitted}
      ></TenderMoreDetails>

      <ComponentCard title="More Details">
        <ToastContainer></ToastContainer>
        {/* Nav Tab */}
        {eng === true &&
        <Tab toggle={toggle} tabs={tabs} />
        }
        { arb === true &&
        <Tabs toggle={toggle} tabsArb={tabsArb} />
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
                          <tr key={e.opportunity_id}>
                            <td>{index + 1}</td>
                            {/* <td data-label="Title">{e.title}</td> */}
                            <td>{arb && e.title_arb ? e.title_arb : e.title}</td>
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
          <TabPane tabId="2">
            <TenderAttachment></TenderAttachment>
          </TabPane>
        </TabContent>
      </ComponentCard>
    </>
  );
};

export default OpportunityEdit;

import React, { useEffect, useState, useContext } from 'react';
import { TabPane, TabContent} from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
// import axios from 'axios';
// import { saveAs } from 'file-saver';
import ClientButton from '../../components/ClientTable/ClientButton';
import ClientMainDetails from '../../components/ClientTable/ClientMainDetails';
import ContactEditModal from '../../components/Tender/ContactEditModal';
import ClientContactGetAndInsert from '../../components/ClientTable/ClientContactGetAndInsert';
import ClientAttachmentPortal from '../../components/ClientTable/ClientAttachmentPortal';
import InvoiceLinkedPortal from '../../components/ClientTable/InvoiceLinkedPortal';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import message from '../../components/Message';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import AddNote from '../../components/Tender/AddNote';
import ViewNote from '../../components/Tender/ViewNote';
import creationdatetime from '../../constants/creationdatetime';
import Tab from '../../components/project/Tab';
import Tabs from '../../components/project/Tabs';
import AppContext from '../../context/AppContext';

const ClientsEdit = () => {
  //Const Variables
  const [activeTab, setActiveTab] = useState('1');
  const [contactData, setContactData] = useState();
  const [addContactModal, setAddContactModal] = useState(false);
  const [addLogModal, setAddLogModal] = useState(false);
  const [clientsDetails, setClientsDetails] = useState();
  const [contactsDetails, setContactsDetails] = useState(null);
  const [invoicedetails, setInvoiceDetails] = useState(null);
  const [editContactEditModal, setEditContactEditModal] = useState(false);
  const [allCountries, setallCountries] = useState();
  const { loggedInuser } = useContext(AppContext);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [log, setLog] = useState();
   // Navigation and Parameter Constants
   const { id } = useParams();
   const navigate = useNavigate();

   const contactLog = loggedInuser.first_name;
   const generateLogEntry = (buttonName, index) => {
    const dateTime = new Date().toISOString();
    return `${dateTime}: ${contactLog}: Button '${buttonName}' at index ${index} was clicked.\n`;
  };
  
  const logButtonActivityToFile = (buttonName) => {
    const logEntry = generateLogEntry(buttonName);
    const existingLog = localStorage.getItem('buttonActivityLog') || '';
    console.log('existingLog',existingLog)
    const updatedLog = existingLog + logEntry;
    localStorage.setItem('buttonActivityLog', updatedLog);
    setLog(updatedLog)
    // Save log to file
    // const blob = new Blob([updatedLog], { type: 'text/plain;charset=utf-8' });
    // console.log('blob',blob)
    // saveAs(blob, 'overall_log.sql');
  };
 
  // const downloadLogFile = () => {
  //   const logContent = localStorage.getItem('buttonActivityLog') || '';
  //   const blob = new Blob([logContent], { type: 'text/plain' });
  //   const url = window.URL.createObjectURL(blob);
  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = 'overall_log.sql';
  //   document.body.appendChild(a);
  //   a.click();
  //   window.URL.revokeObjectURL(url);
  // };
  
  // // Example usage:
  // logButtonActivityToFile('Submit'); // Log button 'Submit' activity
  // downloadLogFile(); // Download the log file

  const tablevalue =  [
    {name:'company'},
    {name:'contact'},
  ];

  const whereCondition = 'company_id'
    // Fetch translation when selectedLanguage or plannings changes
    // const fetchTranslation = async () => {
    //   try {
    //     tablevalue.forEach(async (table) => {
    //       console.log('tableName',table.name)
    //       const tableNames = table.name
    //       const res1 = await api.post('/labourrequest/getTranslationColumnFromTables',{tableNames});
    //       res1.data.data.forEach(async (item) => {
    //       const columnNames = item.COLUMN_NAME_TRUNCATED;
          
    //       console.log('columnNames',columnNames)
    //       const whereId = id;
    //       const whereCondition ='company_id'
    //       console.log('whereId',whereId)
    //       console.log('WhereCondition',whereCondition)
    //       const res = await api.post('/labourrequest/getTableTranslation', { whereId, columnNames,tableNames,whereCondition});
         
    //       console.log('resss',res.data.data)
    //       res.data.data.forEach(async (cell) => {
  
    //         Object.keys(cell).forEach(async(property) => {
    //           console.log('colm', cell[property]);
    //           const condition = `${property}_arb` 
    //           console.log('condition',condition)
    //           const res5 = await api.post('/labourrequest/getTableTranslationArbValue', { whereId, condition,tableNames,whereCondition});
    //           console.log('res5',res5.data.data)
    //           res5.data.data.forEach(async(obj) => {
    //           console.log('obj',obj[condition])
    //             // Assuming you want to check the value of the 'company_name_arb' property
    //             if (obj[condition] === '' || obj[condition] === null) {
    //                try {
    //           const response = await axios.post(
    //             'https://translation.googleapis.com/language/translate/v2',
    //             {},
    //             {
    //               params: {
    //                 q:cell[property],
    //                 target: 'ar',
    //                 key: 'AIzaSyA_eJTEvBDRBHo8SYmq_2PyCh8s_Pl6It4', // Replace with your Google Translate API key
    //               },
    //             }
    //           );
    //            console.log('trabsss', response.data.data.translations[0].translatedText);
    //           await api.post('/labourrequest/editRequestArb', {
    //             tableNames,
    //             whereId,
    //             whereCondition,
    //             // labour_request_id:id,
    //             [`${property}_arb`]: response.data.data.translations[0].translatedText,
    //             value: response.data.data.translations[0].translatedText,
    //             columnName:`${property}_arb`
    //           });
    //         } catch (error) {
    //           console.error('Error occurred during translation:', error);
    //         }
    //             } else {
    //               console.log('resnull');
    //             }
    //           });
           
    //       });
    //     });
    //     });
    //   });
    //   } catch (error) {
    //     console.error('Error fetching translation column names:', error);
    //   }
    // };
  

  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
const selectedLanguage = getSelectedLanguageFromLocalStorage();

// Use the selected language value as needed
console.log('Selected language from localStorage:', selectedLanguage);

 
  //  button
  const applyChanges = () => {};
  const backToList = () => {
    navigate('/client');
  };

  // Start for tab refresh navigation  #Renuka 1-06-23
  const tabs = [
    { id: '1', name: 'Contacts Linked' },
    { id: '2', name: 'Invoice Linked' },
    { id: '3', name: ' Attachment' },
    { id: '4', name: 'Add notes' },
  ];
  const tabsArb =  [
    {id:'1',name:'جهات الاتصال المرتبطة'},
    {id:'2',name:'فاتورة لينكد إن'},
    {id:'3',name:'مرفق'},
    {id:'4',name:'أضف ملاحظات'},
  ];

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const addContactToggle = () => {
    setAddContactModal(!addContactModal);
  };

  const addLogToggle = () => {
    setAddLogModal(!addLogModal);
  };

  //Client Functions/Methods
  const handleInputs = (e) => {
    setClientsDetails({ ...clientsDetails, [e.target.name]: e.target.value });
    console.log('Current State:', clientsDetails);
  };

  //  Get Clients By Id
  const editClientsById = () => {
    api
      .post('/clients/getClientsById', { company_id: id })
      .then((res) => {
        setClientsDetails(res.data.data[0]);
      })
      .catch(() => {});
  };

  //Logic for edit data in db
  const editClientsData = () => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(clientsDetails.email)) {
      message('Invalid email address', 'warning');
    } else if (clientsDetails.company_name !== '' && 
    clientsDetails.email !== '') {
      clientsDetails.modification_date = creationdatetime;
      clientsDetails.modified_by = loggedInuser.first_name;
      api
        .post('/clients/editClients', clientsDetails)
        .then(() => {
          message('Record edited successfully', 'success');
          editClientsById();
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
};

  // get Contact Linked by id
  const getContactLinked = () => {
    api
      .post('/clients/getContactLinkedByCompanyId', { company_id: id })
      .then((res) => {
        setContactsDetails(res.data.data);
      })
      .catch(() => {
        message('Conatct Data Not Found', 'info');
      });
  };
  //get Invoice Linked by id
  const getInvoiceLinkedById = () => {
    api
      .post('/clients/getInvoiceLinkedById', { company_id: id })
      .then((res) => {
        setInvoiceDetails(res.data.data);
      })
      .catch(() => {
        message('Conatct Data Not Found', 'info');
      });
  };
  //Email
  const sendMail = () => {
    if (window.confirm(' Are you sure do you want to send Mail to this Client \n')) {
      const to = 'fatema@unitdtechnologies.com';
      const text = 'Hello';
      const subject = 'Test Mail';
      api
        .post('/email/sendemail', { to, text, subject })
        .then(() => {
          message('Email sent successfully.', 'success');
        })
        .catch(() => {
          message('Email Data Not Found', 'info');
        });
    } else {
      applyChanges();
    }
  };

  const [arabic, setArabic] = useState([]);


  const arb =selectedLanguage === 'Arabic'

  const eng =selectedLanguage === 'English'
  

  const getArabicCompanyName = () => {
      api
      .get('/translation/getTranslationForCompany')
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

  // insert Contact
  const [newContactData, setNewContactData] = useState({
    salutation: 'Mr',
    first_name: '',
    first_name_arb: '',
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
    setFormSubmitted(true);
    const newContactWithCompanyId = newContactData;
    newContactWithCompanyId.company_id = id;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(newContactWithCompanyId.email)) {
      message('Invalid email address', 'warning');
    }
    else
     if (newContactWithCompanyId.salutation !== '' && 
    newContactWithCompanyId.first_name !== '' ) {
      newContactWithCompanyId.creation_date = creationdatetime;
      newContactWithCompanyId.created_by = loggedInuser.first_name;
      api
        .post('/clients/insertContact', newContactWithCompanyId)
        .then(() => {
          message('Contact inserted successfully.', 'success');
          window.location.reload();
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };

  //  deleteRecord
  const DeleteClient = () => {
    api
      .post('/clients/deleteCompany', { company_id: id })
      .then(() => {
        message('Record editted successfully', 'success');
      })
      .catch(() => {
        message('Unable to delete record.', 'error');
      });
  };

  //Api for getting all countries
  const getAllCountries = () => {
    api
      .get('/clients/getCountry')
      .then((res) => {
        setallCountries(res.data.data);
      })
      .catch(() => {
        //message('Country Data Not Found', 'info');
      });
  };

  // Delete Contact
  const deleteRecord = (staffId) => {
    Swal.fire({
      title: `Are you sure? `,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .post('/clients/deleteContact', { contact_id: staffId })
          .then(() => {
            Swal.fire('Deleted!', 'Contact has been deleted.', 'success');
            message('Record deleted successfully', 'success'); 
            setTimeout(() => {
              window.location.reload();
            }, 300);
          })
          .catch(() => {
            message('Unable to delete record.', 'error');
          });
      }
    });
  };

  useEffect(() => {
    editClientsById();
    getContactLinked();
    getAllCountries();
    getInvoiceLinkedById();
    
  }, [id]);

  return (
     <>
      {/* BreadCrumbs */}
    
      { arb === true ? <BreadCrumbs heading={clientsDetails && clientsDetails.company_name_arb} />:<BreadCrumbs heading={clientsDetails && clientsDetails.company_name} />}
      {/* Button List */}
      <ClientButton
        editClientsData={editClientsData}
        tablevalue={tablevalue}
        navigate={navigate}
        applyChanges={applyChanges}
        logButtonActivityToFile={logButtonActivityToFile}
        DeleteClient={DeleteClient}
        backToList={backToList}
        sendMail={sendMail}
        formSubmitted={formSubmitted}
        setFormSubmitted={setFormSubmitted}
        clientsDetails={clientsDetails}
        arb={arb}
        eng={eng}
        id={id}
        whereCondition={whereCondition}
        addLogToggle={addLogToggle}
        addLogModal={addLogModal}
        log={log}
      ></ClientButton>

      {/* Client Main details */}
      <ComponentCard title="Client Details" creationModificationDate={clientsDetails}>
        <ClientMainDetails
          handleInputs={handleInputs}
          clientsDetails={clientsDetails}
          allCountries={allCountries}
          formSubmitted={formSubmitted}
          arb={arb}
          arabic={arabic}
          eng={eng}
        ></ClientMainDetails>
      </ComponentCard>
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
            <ClientContactGetAndInsert
              setContactData={setContactData}
              setEditContactEditModal={setEditContactEditModal}
              deleteRecord={deleteRecord}
              contactsDetails={contactsDetails}
              addContactToggle={addContactToggle}
              addContactModal={addContactModal}
              handleAddNewContact={handleAddNewContact}
              newContactData={newContactData}
              AddNewContact={AddNewContact}
              formSubmitted={formSubmitted}
              setFormSubmitted={setFormSubmitted}
              arb={arb}
              arabic={arabic}
            ></ClientContactGetAndInsert>
            {/* Contact Linked Edit modal */}
            <ContactEditModal
              editContactEditModal={editContactEditModal}
              setEditContactEditModal={setEditContactEditModal}
              contactData={contactData}
              formSubmitted={formSubmitted}
              setFormSubmitted={setFormSubmitted}
            />
          </TabPane>
          { /* Invoice Linked Portal */}
           <TabPane tabId="2">
          <InvoiceLinkedPortal
          invoicedetails={invoicedetails}></InvoiceLinkedPortal>
          </TabPane>
          { /* Attachment Portal */ }
          <TabPane tabId="3">
          <ClientAttachmentPortal
          ClientId={id}
          />
          </TabPane>
          {/* ADD NOTE */}
          <TabPane tabId="4">
            <AddNote recordId={id} roomName="ClientEdit" />
            <ViewNote recordId={id} roomName="ClientEdit" />
          </TabPane>
        </TabContent>
      </ComponentCard>
    </>
  );
};
export default ClientsEdit;

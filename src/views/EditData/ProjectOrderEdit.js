import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import { Label,Col } from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';
import ProjectOrdersButton from '../../components/TenderTable/ProjectOrdersButton';
import creationdatetime from '../../constants/creationdatetime';
import ProjectOrdersMainDetails from '../../components/TenderTable/ProjectOrdersMainDetails';
import ProjectSalesMoreDetails from '../../components/TenderTable/ProjectSalesMoreDetails';
import ProjectOrderAttachment from '../../components/TenderTable/ProjectOrderAttachment';
import AppContext from '../../context/AppContext';
import PdfSalesOrder from '../../components/PDF/PdfSalesOrder';


const ProjectOrderEdit = () => {
  const [orderDetails, setOrderDetails] = useState();
  const [invoiceDetails, setInvoiceDetails] = useState();
  const [receiptDetails, setReceiptDetails] = useState();
  const [ordersDetails, setOrdersDetails] = useState();
  const [addContactModal, setAddContactModal] = useState(false);
  const [addCompanyModal, setAddCompanyModal] = useState(false);
  const [contact, setContact] = useState();
  const [company, setCompany] = useState();
  const [incharge, setIncharge] = useState();
  const [selectedCompany, setSelectedCompany] = useState();
  const [allCountries, setallCountries] = useState();
  const navigate = useNavigate();
  const applyChanges = () => {};
  const backToList = () => {
    navigate('/ProjectOrder');
  };
  const { insertedDataId, quoteId } = useParams();
  const { loggedInuser } = useContext(AppContext);
  console.log('Quote ID:', quoteId);
  console.log('insertedDataId:', insertedDataId);
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
    api.post('/projectsalesorder/getProjectOrderById', { project_order_id: insertedDataId }).then((res) => {
      setOrderDetails(res.data.data);
      getContact(res.data.data.company_id);
    });
  };

  const getInvoiceByOrderId = () => {
    api.post('/projectsalesorder/getInvoiceById', { project_order_id: insertedDataId }).then((res) => {
      setInvoiceDetails(res.data.data);
    
    });
  };
  const getReceiptByOrderId = () => {
    api.post('/projectsalesorder/getReceiptByIds', { project_order_id: insertedDataId }).then((res) => {
      setReceiptDetails(res.data.data);
    
    });
  };

  const getOrdersByOrderId = () => {
    api.post('/projectsalesorder/getOrdersByIds', { project_order_id: insertedDataId }).then((res) => {
      setOrdersDetails(res.data.data);
    
    });
  };

  const handleInputs = (e) => {
    setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
  };


  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };

  const selectedLanguage = getSelectedLanguageFromLocalStorage();

  // Use the selected language value as needed
  console.log('Selected language from localStorage:', selectedLanguage);

  const [arabic, setArabic] = useState([]);

  const arb = selectedLanguage === 'Arabic';

  const eng = selectedLanguage === 'English';

  const getArabicCompanyName = () => {
    api
      .get('/finance/getTranslationforTradingOrder')
      .then((res) => {
        setArabic(res.data.data);
      })
      .catch(() => {
        // Handle error if needed
      });
  };

  console.log('arabic', arabic);
  useEffect(() => {
    getArabicCompanyName();
  }, []);


  //Logic for edit data in db

  const editTenderData = (shouldNavigate) => {
    orderDetails.modification_date = creationdatetime;
    orderDetails.modified_by = loggedInuser.first_name;
    api
      .post('/projectsalesorder/editFinances', orderDetails)
      .then(() => {
        message('Record edited successfully', 'success');
        if (shouldNavigate) {
          setTimeout(() => {
            navigate('/ProjectOrder'); // Navigate after showing the message if shouldNavigate is true
          }, 100);
        }
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
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

  useEffect(() => {
    editTenderById();
    getIncharge();
    getCompany();
    getAllCountries();
    getInvoiceByOrderId();
    getReceiptByOrderId();
    getOrdersByOrderId();
  }, [insertedDataId]);

  return (
    <>
      {/* <BreadCrumbs heading={orderDetails && orderDetails.title} /> */}
      {eng === true && <BreadCrumbs heading={orderDetails && orderDetails.title} />}
      {arb === true && <BreadCrumbs heading={orderDetails && orderDetails.title_arb} />}
      <ProjectOrdersButton
        editTenderData={editTenderData}
        quoteId={quoteId}
        id={insertedDataId}
        navigate={navigate}
        applyChanges={applyChanges}
        backToList={backToList}
        orderDetails={orderDetails}
      ></ProjectOrdersButton>
      <ProjectOrdersMainDetails
      arb={arb}
      arabic={arabic}
        companyInsertData={companyInsertData}
        newContactData={newContactData}
        handleInputs={handleInputs}
        handleAddNewContact={handleAddNewContact}
        setAddContactModal={setAddContactModal}
        addContactModal={addContactModal}
        orderDetails={orderDetails}
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
      ></ProjectOrdersMainDetails>
       <Col md="4">
        <Label>
          <PdfSalesOrder id={insertedDataId} orderId={insertedDataId}></PdfSalesOrder>
        </Label>
      </Col> 
     <ProjectSalesMoreDetails   
     arb={arb}
     eng={eng}
        invoiceDetails={invoiceDetails}
      receiptDetails={receiptDetails}
      ordersDetails={ordersDetails}
      />
    

    
      <ComponentCard title="More Details">
        <ToastContainer></ToastContainer>

        <ProjectOrderAttachment></ProjectOrderAttachment>
      </ComponentCard>
    </>
  );
};

export default ProjectOrderEdit;

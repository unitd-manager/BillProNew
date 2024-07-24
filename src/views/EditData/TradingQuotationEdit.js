import React, { useEffect, useState, useContext } from 'react';
import { TabPane, TabContent, Col, Button, Table, Row, Label } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../form-editor/editor.scss';
import * as Icon from 'react-feather';
import Swal from 'sweetalert2';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
//import TradingQuoteButton from '../../components/TradingQuotation/TradingQuoteButton';
import TradingQuoteMoreDetails from '../../components/TradingQuotation/TradingQuoteMoreDetails';
import QuotationAttachment from '../../components/TradingQuotation/QuotationAttachment';
import Tab from '../../components/project/Tab';
import Tabs from '../../components/project/Tabs';
import QuoteLineItem from '../../components/TradingQuotation/QuoteLineItem';
import QuoteDiscount from '../../components/TradingQuotation/QuoteDiscount';
import ViewQuoteLogModal from '../../components/TradingQuotation/ViewQuoteLogModal';

import EditLineItemModal from '../../components/TradingQuotation/EditLineItemModal';
import AppContext from '../../context/AppContext';
import ApiButton from '../../components/ApiButton';

const TradingQuotationEdit = () => {
  const [tenderDetails, setTenderDetails] = useState();
  const [company, setCompany] = useState();
  const [contact, setContact] = useState();
  const [addLineItemModal, setAddLineItemModal] = useState(false);
  const [addDiscountModal, setAddDiscountModal] = useState(false);
  const [lineItem, setLineItem] = useState();
  const [viewLineModal, setViewLineModal] = useState(false);
  const [addContactModal, setAddContactModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState();
  const [editLineModelItem, setEditLineModelItem] = useState(null);
  const [editLineModal, setEditLineModal] = useState(false);
  const { loggedInuser } = useContext(AppContext);
  const [quotationsModal, setQuotationsModal] = useState(false);
  const [previousTenderDetails, setPreviousTenderDetails] = useState(null);
  const toggleQuotationsModal = () => {
    setQuotationsModal(!quotationsModal);
  };

  const [activeTab, setActiveTab] = useState('1');
  const { id } = useParams();
  const navigate = useNavigate();
 // const applyChanges = () => {};
  const backToList = () => {
    navigate('/Quotation');
  };
  const addQuoteItemsToggle = () => {
    setAddLineItemModal(!addLineItemModal);
  };
  const addDiscountToggle = () => {
    setAddDiscountModal(!addDiscountModal);
  };
  const addContactToggle = () => {
    setAddContactModal(!addContactModal);
  };
  const viewLineToggle = () => {
    setViewLineModal(!viewLineModal);
  };
  console.log(viewLineToggle);
  const tabs = [
    { id: '1', name: 'Quotation ' },
    { id: '2', name: 'Attachment' },
  ];

  const tabsArb = [
    { id: '1', name: 'اقتباس' },
    { id: '2', name: 'مرفق' },
  ];
  const toggle = (tab) => {
    setActiveTab(tab);
  };
  const getContact = (companyId) => {
    setSelectedCompany(companyId);
    api.post('/company/getContactByCompanyId', { company_id: companyId }).then((res) => {
      setContact(res.data.data);
    });
  };

  const [subExpenseRec, setSubExpenseRec] = useState([]);

  // ... Other functions ...

  // Api Get Expense SubHead Cannot Edit
  const HideQuotation = () => {
    api
      .post('/invoice/checkPricelistIdInInvoiceItems', { quote_id: id })
      .then((res) => {
        console.log('API Response:', res.data);
        setSubExpenseRec(res.data);
      })
      .catch(() => {
        message('Unable to fetch data.', 'error');
      });
  };

  // Get Tenders By Id

  const editTenderById = () => {
    api.post('/tradingquote/getTradingquoteById', { quote_id: id }).then((res) => {
      setPreviousTenderDetails(res.data.data);
      setTenderDetails(res.data.data);
      getContact(res.data.data.company_id);
    });
  };

  // Function to handle changes in tenderDetails
  const handleInputs = (e) => {
    // Update only the current state (tenderDetails)
    setTenderDetails({ ...tenderDetails, [e.target.name]: e.target.value });
  };

  // Function to save the current details as previousTenderDetails
  const saveCurrentDetails = () => {
    setPreviousTenderDetails({ ...tenderDetails });
  };

  const [showTooltip, setShowTooltip] = useState(false);

  const handleIconMouseOver = () => {
    console.log('Mouse over icon'); // Log when mouse over icon
    setShowTooltip(true);
  };

  const handleIconMouseOut = () => {
    console.log('Mouse out icon'); // Log when mouse out of icon
    setShowTooltip(false);
  };

  const handleIconFocus = () => {
    console.log('Icon focused'); // Log when icon is focused
    setShowTooltip(true);
  };

  const handleIconBlur = () => {
    console.log('Icon blurred'); // Log when icon is blurred
    setShowTooltip(false);
  };

  console.log('showTooltip:', showTooltip); // Log the showTooltip state

  //Logic for edit data in db
  const insertquote = () => {
    const quoteData = {
      quote_date: previousTenderDetails.quote_date,
      quote_status: previousTenderDetails.quote_status,
      quote_code: previousTenderDetails.quote_code,
      quote_id: id,
      created_by: loggedInuser.first_name,
      creation_date: creationdatetime,
    };

    api.post('/project/insertLog', quoteData).then((res) => {
      message('quote inserted successfully.', 'success');
      lineItem.forEach((element) => {
        element.quote_log_id = res.data.data.insertId;

        api.post('/project/insertLogLine', element).then(() => {
          window.location.reload();
        });
      });
    });
  };

  const editTenderData = () => {
    tenderDetails.modification_date = creationdatetime;
    tenderDetails.modified_by = loggedInuser.first_name;

    const hasChanges = JSON.stringify(tenderDetails) !== JSON.stringify(previousTenderDetails);

    api
      .post('/tradingquote/edit-Tradingquote', tenderDetails)
      .then(() => {
        message('Record edited successfully', 'success');

        // If there are changes, insert into quote_log
        if (hasChanges) {
          insertquote();
        }

        // Save the current details as previousTenderDetails
        saveCurrentDetails();
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  // Get Company Data
  const getCompany = () => {
    api.get('/company/getCompany').then((res) => {
      setCompany(res.data.data);
    });
  };
  // Get Line Item
  const getLineItem = () => {
    api.post('/tradingquote/getQuoteLineItemsById', { quote_id: id }).then((res) => {
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

  useEffect(() => {
    editTenderById();
    getLineItem();
    getCompany();
    HideQuotation();
    // getAllCountries();
  }, [id]);


   const deleteRecord = (deleteID) => {
    Swal.fire({
      title: `Are you sure?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        api.post('/tender/deleteEditItem', { quote_items_id: deleteID }).then(() => {
          Swal.fire('Deleted!', 'Your Line Items has been deleted.', 'success');
          window.location.reload();
        });
      }
    });
  };
  const netTotal = Number.isNaN(tenderDetails && tenderDetails.totalamount)
    ? 0
    : tenderDetails &&
      tenderDetails.totalamount -
        (Number.isNaN(tenderDetails && tenderDetails.discount) ? 0 : tenderDetails.discount);

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
      .get('/tradingquote/getTranslationforTradingQuote')
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
      name:arabic.find(item => item.key_text === 'mdTradingQuote.Title')?.[genLabel],
    },

    {
      name:arabic.find(item => item.key_text === 'mdTradingQuote.Description')?.[genLabel],
    },
    {
      name:arabic.find(item => item.key_text === 'mdTradingQuote.Unit')?.[genLabel],
    },
    {
      name:arabic.find(item => item.key_text === 'mdTradingQuote.Quantity')?.[genLabel],
    },
    {
      name:arabic.find(item => item.key_text === 'mdTradingQuote.Unit Price')?.[genLabel],
    },
    {
      name:arabic.find(item => item.key_text === 'mdTradingQuote.Amount')?.[genLabel],
    },
    {
      name: arabic.find(item => item.key_text === 'mdTradingQuote.updated By')?.[genLabel],
    },
    {
      name:arabic.find(item => item.key_text === 'mdTradingQuote.Action')?.[genLabel],
    },
  ];

  return (
    <>
      {/* <BreadCrumbs heading={tenderDetails && tenderDetails.title} /> */}
      {eng === true && <BreadCrumbs heading={tenderDetails && tenderDetails.title} />}
      {arb === true && <BreadCrumbs heading={tenderDetails && tenderDetails.title_arb} />}

      {/* <TradingQuoteButton
        editTenderData={editTenderData}
        navigate={navigate}
        applyChanges={applyChanges}
        backToList={backToList}
        id={id}
        insertquote={insertquote}
      ></TradingQuoteButton> */}
<ApiButton
              editData={editTenderData}
              navigate={navigate}
              applyChanges={editTenderData}
             // deleteData={deleteBookingData}
              backToList={backToList}
              insertquote={insertquote}
              module="TradingQuotation"
            ></ApiButton>
      <TradingQuoteMoreDetails
        newContactData={newContactData}
        handleInputs={handleInputs}
        handleAddNewContact={handleAddNewContact}
        setAddContactModal={setAddContactModal}
        addContactModal={addContactModal}
        tenderDetails={tenderDetails}
        company={company}
        contact={contact}
        AddNewContact={AddNewContact}
        addContactToggle={addContactToggle}
        getContact={getContact}
        arb={arb}
        arabic={arabic}
      ></TradingQuoteMoreDetails>

      <ComponentCard title={arb ? 'المزيد من التفاصيل' : 'More Details'}>
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
            <Row>
              <Col md="2">
                <Button className="shadow-none" color="primary" onClick={toggleQuotationsModal}>
                  {arb ? 'عرض الاقتباس' : 'View Quote'}
                </Button>
              </Col>
              <Col md="2">
                <Button
                  className="shadow-none"
                  color="primary"
                  to=""
                  onClick={addQuoteItemsToggle.bind(null)}
                >
                  {arb ? 'إضافة عناصر' : 'Add Items'}
                </Button>
              </Col>
              <Col md="2">
                <Button
                  className="shadow-none"
                  color="primary"
                  to=""
                  onClick={addDiscountToggle.bind(null)}
                >
                  {arb ? 'تخفيض' : 'Discount'}
                </Button>
              </Col>
              <Col md="2">
                <div className="discount">
                  <span className="label">
                    {' '}
                    <Label>
                      <b> {arb ? 'تخفيض' : 'Discount :'}</b>
                    </Label>
                    {tenderDetails && tenderDetails.discount}
                  </span>
                </div>
              </Col>

              <Col md="2">
                <div className="net-total">
                  <span className="label">
                    {' '}
                    <Label>
                      <b> {arb ? 'صافي المجموع' : 'Net Total :'}</b>
                    </Label>
                    {netTotal}
                  </span>
                </div>
              </Col>
            </Row>
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
                          <tr key={e.quote_id}>
                            <td>{index + 1}</td>
                            <td data-label="Title">{e.title}</td>
                            <td data-label="Description">{e.description}</td>
                            <td data-label="unit">{e.unit}</td>
                            <td data-label="Quantity">{e.quantity}</td>
                            <td data-label="Unit Price">{e.unit_price}</td>
                            <td data-label="Amount">{e.amount}</td>
                            <td data-label="Updated By" style={{ textAlign: 'center' }}>
                              <tooltip title={`${e.created_by} on ${e.creation_date}`}>
                                <span
                                  onMouseOver={handleIconMouseOver}
                                  onMouseOut={handleIconMouseOut}
                                  onFocus={handleIconFocus}
                                  onBlur={handleIconBlur}
                                  style={{
                                    position: 'relative',
                                    display: 'inline-block',
                                  }}
                                >
                                  {/* created by */}<FaUser />
                                </span>
                              </tooltip>
                            </td>
                            <td data-label="Actions">
                              {subExpenseRec.data ? null : (
                                <>
                                  {console.log('Condition:', subExpenseRec.data)}
                                  <span
                                    className="addline"
                                    onClick={() => {
                                      setEditLineModelItem(e);
                                      setEditLineModal(true);
                                    }}
                                  >
                                    <Icon.Edit2 />
                                  </span>
                                </>
                              )}
                              {subExpenseRec.data ? null : (
                                <>
                                  {console.log('Condition:', subExpenseRec.data)}
                                  <span
                                    className="addline"
                                    onClick={() => {
                                      deleteRecord(e.quote_items_id);
                                    }}
                                  >
                                    <Icon.Trash2 />
                                  </span>
                                </>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </div>
            </Row>
            {quotationsModal && (
              <ViewQuoteLogModal
              arabic={arabic}
              arb={arb}
                quotationsModal={quotationsModal}
                setQuotationsModal={setQuotationsModal}
                toggleQuotationsModal={toggleQuotationsModal}
                quoteId={id}
              />
            )}

            {/* End View Line Item Modal */}
            <EditLineItemModal
              editLineModal={editLineModal}
              setEditLineModal={setEditLineModal}
              FetchLineItemData={editLineModelItem}
              getLineItem={getLineItem}
              setViewLineModal={setViewLineModal}
              insertquote={insertquote}
            ></EditLineItemModal>
            {addLineItemModal && (
              <QuoteLineItem
              arb={arb}
              arabic={arabic}
                //projectInfo={tenderId}
                previousTenderDetails={previousTenderDetails}
                addLineItemModal={addLineItemModal}
                setAddLineItemModal={setAddLineItemModal}
                quoteLine={id}
              ></QuoteLineItem>
            )}
            {addDiscountModal && (
              <QuoteDiscount
                //projectInfo={tenderId}
                addDiscountModal={addDiscountModal}
                setAddDiscountModal={setAddDiscountModal}
                quoteLine={id}
                tenderDetails={tenderDetails}
                handleInputs={handleInputs}
                editTenderData={editTenderData}
              ></QuoteDiscount>
            )}
          </TabPane>
          <TabPane tabId="2">
            <QuotationAttachment></QuotationAttachment>
          </TabPane>
        </TabContent>
      </ComponentCard>
    </>
  );
};

export default TradingQuotationEdit;

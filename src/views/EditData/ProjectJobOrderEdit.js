import React, { useEffect, useState, useContext } from 'react';
import { TabPane, TabContent, Col, Button, Table, Row,Label ,Tooltip} from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import * as Icon from 'react-feather';
import Swal from 'sweetalert2';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
//import ProjectQuoteButton from '../../components/ProjectJobOrder/ProjectQuoteButton';
import ProjectQuoteMoreDetails from '../../components/ProjectJobOrder/ProjectQuoteMoreDetails';
import JobOrderAttachment from '../../components/ProjectJobOrder/JobOrderAttachment';
import Tab from '../../components/project/Tab';
import Tabs from '../../components/project/Tabs';
import QuoteLineItem from '../../components/ProjectJobOrder/QuoteLineItem';
import EditLineItemModal from '../../components/ProjectJobOrder/EditLineItemModal';
import AppContext from '../../context/AppContext';
import PdfQuote from '../../components/PDF/PdfJobOrder';
import ApiButton from '../../components/ApiButton';

const ProjectJobOrderEdit = () => {
  const [tenderDetails, setTenderDetails] = useState();
  const [company, setCompany] = useState();
  const [subcon, setSubCon] = useState();
  const [addLineItemModal, setAddLineItemModal] = useState(false);
  const [lineItem, setLineItem] = useState();
  const [viewLineModal, setViewLineModal] = useState(false);
  const [addContactModal, setAddContactModal] = useState(false);
  const [editLineModelItem, setEditLineModelItem] = useState(null);
  const [editLineModal, setEditLineModal] = useState(false);
  //const [quoteLine, setQuoteLine] = useState();
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);

  // Function to handle tooltip toggle
  const toggleTooltip = (index) => {
    setHoveredRowIndex(index === hoveredRowIndex ? null : index);
  };

  //   const [addContactModal, setAddContactModal] = useState(false);
  //   const [addCompanyModal, setAddCompanyModal] = useState(false);

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
      .get('/joborder/getTranslationForJopOrder')
      .then((res) => {
        setArabic(res.data.data);
      })
      .catch(() => {
        // Handle error if needed
      });   
  };
  const getSubcon = () => {
    api.get('/subcon/getSubcon').then((res) => {
      setSubCon(res.data.data);
    });
  };
  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }

  const [activeTab, setActiveTab] = useState('1');
  const { id } = useParams();
  const navigate = useNavigate();
  //const applyChanges = () => {};
  const backToList = () => {
    navigate('/ProjectJobOrder');
  };
  const addQuoteItemsToggle = () => {
    setAddLineItemModal(!addLineItemModal);
  };
  const addContactToggle = () => {
    setAddContactModal(!addContactModal);
  };
  const viewLineToggle = () => {
    setViewLineModal(!viewLineModal);
  };
  console.log(viewLineToggle);
  const tabs = [
    { id: '1', name: 'JobOrder' },
    { id: '2', name: 'Attachment' },
  ];
  const tabsArb = [
    { id: '1', name: 'أمر الوظيفة' },
    { id: '2', name: 'مرفق' },
   
  ];
  const toggle = (tab) => {
    setActiveTab(tab);
  };

  // Get Tenders By Id

  const editTenderById = () => {
    api.post('/joborder/getJobOrderById', { project_job_id: id }).then((res) => {
      setTenderDetails(res.data.data[0]);
 
    });
  };

  const handleInputs = (e) => {
    setTenderDetails({ ...tenderDetails, [e.target.name]: e.target.value });
  };

  //Logic for edit data in db

  const editTenderData = () => {
    tenderDetails.modification_date = creationdatetime;
    tenderDetails.modified_by = loggedInuser.first_name;
    api
      .post('/joborder/edit-Tradingjob', tenderDetails)
      .then(() => {
        message('Record editted successfully', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 300);
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
    api.post('/joborder/getJobLineItemsById', { project_job_id: id }).then((res) => {
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
 
  useEffect(() => {
    editTenderById();
    getLineItem();
    getCompany();
    getArabicCompanyName();
    getSubcon();
    // getAllCountries();
  }, [id]);

  const columns1 = [
    {
      name: '#',
    },
    {
      name: arabic.find(item => item.key_text === 'mdJobOrder.Title')?.[genLabel],
    },
    {
      name: arabic.find(item => item.key_text === 'mdJobOrder.Description')?.[genLabel],
    },
    {
      name: arabic.find(item => item.key_text === 'mdJobOrder.Qty')?.[genLabel],
    },
    {
      name: arabic.find(item => item.key_text === 'mdJobOrder.Unit Price')?.[genLabel],
    },
    {
      name: arabic.find(item => item.key_text === 'mdJobOrder.Amount')?.[genLabel],
    },
    {
      name: arabic.find(item => item.key_text === 'mdJobOrder.Updated By')?.[genLabel],
    },
    {
      name: arabic.find(item => item.key_text === 'mdJobOrder.Action')?.[genLabel],
    },
  ];
  const deleteRecord = (deleteID) => {
    Swal.fire({
      title: `Are you sure? ${deleteID}`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        api.post('/joborder/deleteEditItem', { project_job_items_id: deleteID }).then(() => {
          Swal.fire('Deleted!', 'Your Line Items has been deleted.', 'success');
          window.location.reload();
        });
      }
    });
  };

  return (
    <>
      <BreadCrumbs heading={tenderDetails && tenderDetails.title} />
      {/* <ProjectQuoteButton
        editTenderData={editTenderData}
        navigate={navigate}
        applyChanges={applyChanges}
        backToList={backToList}
        arb={arb}
      ></ProjectQuoteButton> */}
      <ApiButton
              editData={editTenderData}
              navigate={navigate}
              applyChanges={editTenderData}
              //deleteData={deleteBookingData}
              backToList={backToList}
              module="ProjectJobOrder"
            ></ApiButton>
      <Col md="4">
        <Label>
          <PdfQuote id={id} quoteId={id}></PdfQuote>
        </Label>
      </Col> 
      <ProjectQuoteMoreDetails
        newContactData={newContactData}
        handleInputs={handleInputs}
        handleAddNewContact={handleAddNewContact}
        setAddContactModal={setAddContactModal}
        addContactModal={addContactModal}
        tenderDetails={tenderDetails}
        company={company}
        subcon={subcon}
        addContactToggle={addContactToggle}
        arb={arb}
        arabic={arabic}
        genLabel={genLabel}
      ></ProjectQuoteMoreDetails>

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
            <Row>
              <Col md="6">
                <Button
                  className="shadow-none"
                  color="primary"
                  to=""
                  onClick={addQuoteItemsToggle.bind(null)}
                >
                {arb?'إضافة عناصر الاقتباس':'Add Quote Items'}
                </Button>
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
                          <tr key={e.project_quote_id}>
                            <td>{index + 1}</td>
                            <td data-label="Title">{e.title}</td>
                            <td data-label="Description">{e.description}</td>
                            <td data-label="Quantity">{e.quantity}</td>
                            <td data-label="Unit Price">{e.unit_price}</td>
                            <td data-label="Amount">{e.amount}</td>
                            <td data-label="Updated By">
              <Icon.Eye
                id={`tooltip-${index}`}
                onMouseOver={() => toggleTooltip(index)} // Pass index to toggle function
              />
              <Tooltip
                placement="top"
                isOpen={hoveredRowIndex === index} // Check if current row index matches hoveredRowIndex
                target={`tooltip-${index}`}
                toggle={() => toggleTooltip(index)}
              >
                <span className="tooltiptext">
                  {e.modification_date
                    ? `Modified by ${e.modified_by} on ${e.modification_date}`
                    : `Created by ${e.created_by} on ${e.creation_date}`}
                </span>
              </Tooltip>
            </td>
                            <td data-label="Actions">
                              <span
                                className="addline"
                                onClick={() => {
                                  setEditLineModelItem(e);
                                  setEditLineModal(true);
                                }}
                              >
                                <Icon.Edit2 />
                              </span>
                              <span
                                className="addline"
                                onClick={() => {
                                  deleteRecord(e.project_job_items_id);
                                }}
                              >
                                <Icon.Trash2 />
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </div>
            </Row>
            {/* End View Line Item Modal */}
            <EditLineItemModal
              editLineModal={editLineModal}
              setEditLineModal={setEditLineModal}
              FetchLineItemData={editLineModelItem}
              getLineItem={getLineItem}
              setViewLineModal={setViewLineModal}
              arabic={arabic}
              genLabel={genLabel}
            ></EditLineItemModal>
            {addLineItemModal && (
              <QuoteLineItem
                //projectInfo={tenderId}
                addLineItemModal={addLineItemModal}
                setAddLineItemModal={setAddLineItemModal}
                quoteLine={id}
                arb={arb}
                arabic={arabic}
                genLabel={genLabel}
              ></QuoteLineItem>
            )}
          </TabPane>
          <TabPane tabId="2">
            <JobOrderAttachment></JobOrderAttachment>
          </TabPane>
        </TabContent>
      </ComponentCard>
    </>
  );
};

export default ProjectJobOrderEdit;

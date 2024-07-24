import React, { useEffect, useState,useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import { ToastContainer } from 'react-toastify';
import {
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Tooltip,
} from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import message from '../../components/Message';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import ComponentCard from '../../components/ComponentCard';
import ReturnDetailComp from '../../components/BookingTable/ReturnDetailComp';
//import ComponentCardV2 from '../../components/ComponentCardV2';
// import InvoiceItem from '../../components/BookingTable/InvoiceItem';
import ReturnItemTable from '../../components/BookingTable/ReturnItemTable';
import ReturnInvoiceItemTable from '../../components/BookingTable/ReturnInvoiceItemTable';
import AppContext from '../../context/AppContext';
import PdfReturn from '../../components/PDF/PdfReturn'; 
import ApiButton from '../../components/ApiButton';

const InvoiceEdit = () => {
  const [returnDetails, setReturnDetails] = useState({});
  const [returnItemDetails, setReturnItemDetails] = useState();
  const [returnInvoiceItemDetails, setReturnInvoiceItemDetails] = useState();
  const { insertedDataId, invoiceId } = useParams();
  const [removedItems, setRemovedItems] = useState([]);
  console.log('insertedDataId:', insertedDataId);
  console.log('invoiceId:', invoiceId);
  const { loggedInuser } = useContext(AppContext);
  const navigate = useNavigate();
  const handleInputs = (e) => {
    setReturnDetails({ ...returnDetails, [e.target.name]: e.target.value });
  };
  const backToList = () => {
    navigate('/SalesReturn');
  };
  const [activeTab, setActiveTab] = useState('1');
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const toggleTooltip = () => {
    setTooltipOpen(!tooltipOpen);
  };
  const getReturnById = () => {
    api
      .post('/invoice/getSalesReturnId', { sales_return_id: insertedDataId })
      .then((res) => {
        setReturnDetails(res.data.data[0]);
      })
      .catch(() => {
        
      });
  };

  const getReturnItemById = () => {
    api
      .post('/invoice/getInvoiceItemsById', { invoice_id: invoiceId })
      .then((res) => {
        setReturnItemDetails(res.data.data);
      })
      .catch(() => {
       
      });
  };

  const getReturnInvoiceItemById = () => {
    api
      .post('/invoice/getReturnInvoiceItemsById', { invoice_id: invoiceId })
      .then((res) => {
        setReturnInvoiceItemDetails(res.data.data);
      })
      .catch(() => {
       
      });
  };

  const editInvoiceData = (shouldNavigate) => {
    returnDetails.modification_date = creationdatetime;
    returnDetails.modified_by = loggedInuser.first_name;
    api
      .post('/finance/editSalesReturn', returnDetails)
      .then(() => {
        if (shouldNavigate) {
          setTimeout(() => {
            navigate('/SalesReturn'); // Navigate after showing the message if shouldNavigate is true
          }, 100);
        }
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };
  // const editInvoiceItemData = () => {
  //   api
  //     .get('/finance/checkInvoiceItem')
  //     .then((response) => {
  //       const existingQuoteItemsIds = response.data.data;
  //       console.log('existingQuoteItemsIds:', existingQuoteItemsIds);

  //       // Check if there are return item details
  //       if (returnItemDetails && returnItemDetails.length > 0) {
  //         // Create an array to store the API requests
  //         const apiRequests = [];

  //         // Filter non-removed items
  //         const nonRemovedItems = returnItemDetails.filter(
  //           (element) => !existingQuoteItemsIds.includes(element.invoice_item_id),
  //         );

  //         // Loop through each non-removed return item and create an API request
  //         nonRemovedItems.forEach((element) => {
  //           const salesReturnItem = {
  //             price: element.total_cost,
  //             qty_return: element.qty,
  //             invoice_item_id: element.invoice_item_id,
  //             order_id: element.order_id,
  //             invoice_id: element.invoice_id,
  //             return_date: new Date(),
  //           };

  //           // Create the API request for this item
  //           const apiRequest = api.post('/invoice/insertSalesReturnHistory', salesReturnItem);

  //           // Add the request to the array of requests
  //           apiRequests.push(apiRequest);
  //         });

  //         // Execute all API requests using Promise.all
  //         if (apiRequests.length > 0) {
  //           Promise.all(apiRequests)
  //             .then(() => {
  //               message('Records edited successfully', 'success');
  //             })
  //             .catch((error) => {
  //               console.error('Error inserting records:', error);
  //               message('Unable to edit records.', 'error');
  //             });
  //         } else {
  //           message('No new items to insert', 'info');
  //         }
  //       } else {
  //         message('No items to insert', 'info');
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching existing quote items:', error);
  //       message('Error fetching existing quote items.', 'error');
  //     });
  // };
 
  const handleRemoveItem = (invoiceIdToRemove) => {
    // Find the item with the given invoice_id and add it to the removedItems array
    const removedItem = returnItemDetails.find(
      (item) => item.invoice_item_id === invoiceIdToRemove,
    );
    if (removedItem) {
      setRemovedItems([...removedItems, removedItem]);
    }

    // Filter out the item from the returnItemDetails state
    const updatedItems = returnItemDetails.filter(
      (item) => item.invoice_item_id !== invoiceIdToRemove,
    );
    setReturnItemDetails(updatedItems);
  };

  useEffect(() => {
    getReturnById();
    getReturnItemById();
    getReturnInvoiceItemById();
  }, [insertedDataId]);
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
      .get('/finance/getTranslationforTradingSalesReturn')
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

  return (
    <>
     {eng === true && <BreadCrumbs heading={returnDetails && returnDetails.title} />}
    {arb === true && <BreadCrumbs heading={returnDetails && returnDetails.title_arb} />}
     
      {/* <BreadCrumbs /> */}
      {/* <FormGroup> */}
      
        {/* <ComponentCardV2>
          
            <Col>
              <Button
                color="primary"
                className="shadow-none"
                onClick={() => {
                  editInvoiceData(true);
                  editInvoiceItemData();
                
                }}
              >
              Save
              </Button>
            </Col>
            <Col>
              <Button
                color="primary"
                className="shadow-none"
                onClick={() => {
                  editInvoiceData(false);
                  editInvoiceItemData();
                }}
              >
              Apply

              </Button>
            </Col>
          
            <Col>
              <Button
                className="shadow-none"
                color="dark"
                onClick={() => {
                  backToList();
                }}
              >
             Back to List

              </Button>
            </Col>
          </Row>
        </ComponentCardV2>
      </FormGroup> */}
      <Row>
            <Col>
            <PdfReturn returnDetails={returnDetails} returnId={insertedDataId} invoiceId={invoiceId}></PdfReturn>
            </Col>
            </Row>
      <ApiButton
              editData={editInvoiceData}
              navigate={navigate}
              applyChanges={editInvoiceData}
             // deleteData={deleteBookingData}
              backToList={backToList}
              module="Return"
            ></ApiButton>
              <ToastContainer />
      {/*Main Details*/}
      <ComponentCard title= {arb ? 'تفاصيل الفاتورة' : 'Invoice Details' } creationModificationDate={returnDetails}>
        <ReturnDetailComp 
         arb={arb}
         arabic={arabic}
        returnDetails={returnDetails} 
        handleInputs={handleInputs} />
      </ComponentCard>

      <ComponentCard title={arb ? 'عناصر الفاتورة' : 'Invoice Items' }>
        <Nav tabs>
        <NavItem>
      <NavLink
        className={activeTab === '1' ? 'active' : ''}
        onClick={() => {
          toggle('1');
        }}
        id="invoiceItemLink"
      >
        {arb ? 'عنصر الفاتورة' : 'Invoice Item' }
      </NavLink>
      <Tooltip
        placement="right"
        isOpen={tooltipOpen}
        target="invoiceItemLink"
        toggle={toggleTooltip}
      >
         { arb ? 'قم بإزالة عنصر الفاتورة إذا كنت لا ترغب في إعادته.' : 'Remove the invoice item if you do not wish to return it.'}

      </Tooltip>
    </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '2' ? 'active' : ''}
              onClick={() => {
                toggle('2');
              }}
            > 
              {arb ? 'تاريخ العودة' : ' Return History' }

            </NavLink>
          </NavItem>
        </Nav>
        <TabContent className="p-4" activeTab={activeTab}>
          {/* Description form */}
          <TabPane tabId="1">
            <Row className="border-bottom mb-3">
              <ReturnItemTable
                returnItemDetails={returnItemDetails}
                invoiceInfo={insertedDataId}
                onRemoveItem={handleRemoveItem}
                invoiceStatus={returnDetails.invoice_status} // Pass the invoice status as a prop
                arb={arb}
                arabic={arabic}
              />
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <ReturnInvoiceItemTable returnInvoiceItemDetails={returnInvoiceItemDetails}
             arb={arb}
             arabic={arabic} />
          </TabPane>
          {/* ADD NODE */}
        </TabContent>
      </ComponentCard>
    </>
  );
};

export default InvoiceEdit;

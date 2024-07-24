import React, {useContext, useEffect, useState } from 'react';
import { Row, Col, FormGroup, TabContent, TabPane, Button, Form} from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import * as Icon from 'react-feather';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
// import PurchaseInvoiceItemsEdit from '../../components/PurchaseInvoiceTable/PurchaseInvoiceItemsEdit';
import PurchaseInvoiceLineItems from '../../components/PurchaseInvoiceTable/PurchaseInvoiceLineItems'
import PurchaseInvoiceEditDetails from '../../components/PurchaseInvoiceTable/PurchaseInvoiceEditDetails';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';
import Tab from '../../components/project/Tab';
import Tabs from '../../components/project/Tabs';

const PurchaseRequestEdit = () => {

  // All state variables
  const [purchaseinvoiceeditdetails, setPurchaseInvoiceEditDetails] = useState({});
  const [activeTab, setActiveTab] = useState('1');
  // const [invoiceitemseditmodal, setInvoiceItemsEditModal] = useState(false);
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


  const arb =selectedLanguage === 'Arabic'
  //const eng =selectedLanguage === 'English'
  // const eng =selectedLanguage === 'English'
  // Navigation and Parameter Constants
  const { id } = useParams();

  // get staff details
  const { loggedInuser } = useContext(AppContext);

  // Setting data in purchaseinvoiceeditdetails
  const handleInputs = (e) => {
    setPurchaseInvoiceEditDetails({ ...purchaseinvoiceeditdetails, [e.target.name]: e.target.value });
  };

  const getArabicCompanyName = () => {
    api
    .get('/purchaseinvoice/getTranslationForPurchaseInvoiceList')
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
  // Function to toggle tabs
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  const tabs = [
    { id: '1', name: 'Purchase Invoice Items' },
    { id: '2', name: 'Attachment' },
  ];
  const tabsArb = [
    { id: '1', name: 'عناصر فاتورة الشراء' },
    { id: '2', name: 'مرفق' },
  ];
   // Attachment
   const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
  };

  // Get Goods Invoice data By Goods Invoice Id
  const getPurchaseInvoiceById = () => {
    api
      .post('/purchaseinvoice/getPurchaseInvoiceById', { purchase_invoice_id: id })
      .then((res) => {
        setPurchaseInvoiceEditDetails(res.data.data[0]);
        console.log("setPurchaseInvoiceEditDetails",res.data.data[0])
      })
      .catch((error) => {
        console.error('Error fetching goods receipt:', error);
      });
  };

  // Edit Goods Invoice Data
  const editPurchaseInvoiceData = () => {
    if (purchaseinvoiceeditdetails.purchase_order_id && purchaseinvoiceeditdetails.purchase_invoice_date) {
      purchaseinvoiceeditdetails.modification_date = creationdatetime;
      purchaseinvoiceeditdetails.modified_by = loggedInuser.first_name;
      api
        .post('/purchaseinvoice/editPurchaseInvoice', purchaseinvoiceeditdetails)
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

  // Generate Data for Invoice Items
  const generateData = () => {
    api
      .post('/purchaseinvoice/getPoProductById', { purchase_order_id: purchaseinvoiceeditdetails.purchase_order_id })
      .then((res) => {
        const InvoiceItems = res.data.data;
        console.log('Invoice items:', InvoiceItems);
        if (InvoiceItems.length === 0) {
          console.warn('No Invoice items to insert');
          return;
        }
        // Retrieve all po_product_id  values from the purchase_invoice_items table
        api
          .get('/purchaseinvoice/checkInvoiceItems')
          .then((response) => {
            const ExistingInvoiceItemsId = response.data.data; 
            const insertInvoiceItems = (index) => {
              if (index < InvoiceItems.length) {
                const InvoiceItem = InvoiceItems[index];  
                // Check if the po_product_id  already exists in the ExistingInvoiceItemsId array
                if (ExistingInvoiceItemsId.includes(InvoiceItem.po_product_id )) {
                  console.warn(`Invoice item for po_product_id  ${InvoiceItem.po_product_id } already exists, skipping insertion`);
                  message('Invoice items are already Inserted', 'warning');
                  insertInvoiceItems(index + 1);
                } else {
                  // Insert the order item
                  const InvoiceItemsData = {
                    creation_date : creationdatetime,
                    created_by : loggedInuser.first_name, 
                    purchase_invoice_id: id,
                    po_product_id: InvoiceItem.po_product_id,
                    item_title: InvoiceItem.item_title,
                    item_title_arb: InvoiceItem.item_title_arb,
                    ordered_quantity: InvoiceItem.quantity,
                    cost_price: InvoiceItem.cost_price,
                    cost_price_arb: InvoiceItem.cost_price_arb,
                    total_cost: InvoiceItem.cost_price*InvoiceItem.quantity,
                    total_cost_arb: InvoiceItem.cost_price_arb*InvoiceItem.quantity,
                    unit: InvoiceItem.unit,
                    unit_arb: InvoiceItem.unit_arb,
                    purchase_order_id: purchaseinvoiceeditdetails.purchase_order_id,
                  };  
                  console.log(`Inserting order item ${index + 1}:`, InvoiceItemsData);  
                  // Send a POST request to your /goodsreceipt/insertGoodsReceiptItems API with the current InvoiceItemsData
                  api
                    .post('/purchaseinvoice/insertPurchaseInvoiceItems', InvoiceItemsData)
                    .then((result) => {
                      if (result.data.msg === 'Success') {
                        console.log(`Order item ${index + 1} inserted successfully`);
                        setTimeout(() => {
                          window.location.reload()
                        }, 100);
                      } else {
                        console.error(`Failed to insert order item ${index + 1}`);
                      }
                      // Continue to the next item
                      insertInvoiceItems(index + 1);
                    })
                    .catch((error) => {
                      console.error(`Error inserting order item ${index + 1}`, error);
                      // Continue to the next item
                      insertInvoiceItems(index + 1);
                    });
                }
              } else {
                console.log('All order items inserted successfully');
                // You might want to trigger a UI update here
              }
            }; 
            // Start inserting order items from index 0
            insertInvoiceItems(0);
          })
          .catch((error) => {
            console.error('Error checking order item existence', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching quote items', error);
      });
  };
  
  //UseEffect
  useEffect(() => {
    getPurchaseInvoiceById(); 
    getArabicCompanyName();
    }, [id]);
   
  return (
    <>
            <PurchaseInvoiceEditDetails
            handleInputs={handleInputs}
            purchaseinvoiceeditdetails={purchaseinvoiceeditdetails}
            editPurchaseInvoiceData={editPurchaseInvoiceData}
            id={id}
            arabic={arabic}
        arb={arb}
        genLabel={genLabel}
            ></PurchaseInvoiceEditDetails>
            <ComponentCard title="More Details">
        <ToastContainer></ToastContainer>
  
        {/* {eng === true &&
        <Tab toggle={toggle} tabs={tabs} />
        } */}
        { arb === true?
        <Tabs toggle={toggle} tabsArb={tabsArb} />:<Tab toggle={toggle} tabs={tabs} />
        }
        <TabContent className="p-4" activeTab={activeTab}>
          <TabPane tabId="1">
          <Row>
          <Col md="3">
                <FormGroup>
                  <Button className="shadow-none" color="primary" onClick={() => {generateData();}}>
                    Create Invoice Items
                 </Button>    
                </FormGroup>
              </Col>
              {/* <Col md="3">
                <FormGroup>
                  <PurchaseInvoiceItemsEdit
                     invoiceitemseditmodal={invoiceitemseditmodal}
                     setInvoiceItemsEditModal={setInvoiceItemsEditModal}
                     PurchaseOrderId={purchaseinvoiceeditdetails && purchaseinvoiceeditdetails.purchase_order_id}
                    ></PurchaseInvoiceItemsEdit>
                    <Button
            className="shadow-none"
            color="primary"
            onClick={() => {
              setInvoiceItemsEditModal(true);
            }
            }
          >
            Edit
          </Button>
        </FormGroup>
      </Col> */}
    </Row>
        <PurchaseInvoiceLineItems
          PurchaseOrderId={purchaseinvoiceeditdetails && purchaseinvoiceeditdetails.purchase_order_id}
        ></PurchaseInvoiceLineItems>
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
                          setRoomName('GoodsReceipt');
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
                    altTagData="PurchaseInvoiceRelated Data"
                    desc="PurchaseInvoiceRelated Data"
                    recordType="RelatedPicture"
                    mediaType={attachmentData.modelType}
                    update={update}
                    setUpdate={setUpdate}
                  />
                  <ViewFileComponentV2 moduleId={id} roomName="PurchaseInvoice" recordType="RelatedPicture" update={update}
                    setUpdate={setUpdate}/>
              </FormGroup>
            </Form>
          </TabPane>
        </TabContent>
        </ComponentCard> 
        </>   
  );
};
export default PurchaseRequestEdit;

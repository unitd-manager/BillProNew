import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, FormGroup, TabContent, TabPane, Button, Form } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import * as Icon from 'react-feather';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import GoodsReceiptLineItems from '../../components/GoodsReceipt/GoodsReceiptLineItems';
import GoodsReceiptItemsEdit from '../../components/GoodsReceipt/GoodsReceiptItemsEdit';
import GoodsReceiptEditDetails from '../../components/GoodsReceipt/GoodsReceiptEditDetails';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';
import Tab from '../../components/project/Tab';
import Tabs from '../../components/project/Tabs';


const PurchaseRequestEdit = () => {
  // All state variables
  const [goodsreceipteditdetails, setGoodsReceiptEditDetails] = useState({});
  const [employee, setEmployee] = useState([]);
  // const [project, setProject] = useState([]);
  // const [quote, setQuote] = useState({});
  const [activeTab, setActiveTab] = useState('1');
  const [receiptitemseditmodal, setReceiptItemsEditModal] = useState(false);
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [RoomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState('');
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const [update, setUpdate] = useState(false);

  // Navigation and Parameter Constants
  const { id } = useParams();

  // get staff details
  const { loggedInuser } = useContext(AppContext);

  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };

  const selectedLanguage = getSelectedLanguageFromLocalStorage();

  const [arabic, setArabic] = useState([]);

  const arb = selectedLanguage === 'Arabic';

  const eng = selectedLanguage === 'English';

  const getArabicCompanyName = () => {
    api
      .get('/goodsreceipt/getTranslationForGoodsReceipt')
      .then((res) => {
        setArabic(res.data.data);
      })
      .catch(() => {
        // Handle error if needed
      });
  };

  // Setting data in goodsreceipteditdetails
  const handleInputs = (e) => {
    setGoodsReceiptEditDetails({ ...goodsreceipteditdetails, [e.target.name]: e.target.value });
  };

  // Function to toggle tabs
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const tabs = [
    { id: '1', name: 'Goods received Items' },
    { id: '2', name: 'Attachment' },
  ];

  const tabsArb = [
    { id: '1', name: 'البضائع المستلمة العناصر' },
    { id: '2', name: 'مرفق' },
  ];

  // Attachment
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
  };

  // Get Goods Receipt data By Goods Receipt Id
  const getGoodsReceiptById = () => {
    api
      .post('/goodsreceipt/getGoodsReceiptById', { goods_receipt_id: id })
      .then((res) => {
        setGoodsReceiptEditDetails(res.data.data[0]);
        console.log('setGoodsReceiptEditDetails', res.data.data[0]);
      })
      .catch((error) => {
        console.error('Error fetching goods receipt:', error);
      });
  };

  // Edit Goods Receipt Data
  const editGoodsReceiptData = () => {
    if (goodsreceipteditdetails.purchase_order_id && goodsreceipteditdetails.goods_received_date) {
      goodsreceipteditdetails.modification_date = creationdatetime;
      goodsreceipteditdetails.modified_by = loggedInuser.first_name;
      api
        .post('/goodsreceipt/editGoodsReceipt', goodsreceipteditdetails)
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

  // Get employee names
  const getEmployeeName = () => {
    api
      .get('/goodsreceipt/getEmployeeName')
      .then((res) => {
        setEmployee(res.data.data);
      })
      .catch(() => {
        message('Employee not found', 'info');
      });
  };

  // // Get project data
  // const getProject = () => {
  //   api.get('project/getOppProject').then((res) => {
  //     setProject(res.data.data);
  //   });
  // };

  // // Get quote data
  // const getQuote = () => {
  //   api.post('/tender/getQuoteById', { opportunity_id: id }).then((res) => {
  //     setQuote(res.data.data[0]);
  //   });
  // };

  // Generate Data for Receipt Items
  const generateData = () => {
    api
      .post('/goodsreceipt/getPurchaseOrderedById', {
        purchase_order_id: goodsreceipteditdetails.purchase_order_id,
      })
      .then((res) => {
        const ReceiptItems = res.data.data;
        console.log('Received items:', ReceiptItems);
        if (ReceiptItems.length === 0) {
          console.warn('No Receipt items to insert');
          return;
        }
        // Retrieve all po_product_id  values from the goods_receipt_items table
        api
          .get('/goodsreceipt/checkReceiptItems')
          .then((response) => {
            const ExistingReceiptItemsId = response.data.data;
            const insertReceiptItems = (index) => {
              if (index < ReceiptItems.length) {
                const ReceiptItem = ReceiptItems[index];
                // Check if the po_product_id  already exists in the ExistingReceiptItemsId array
                if (ExistingReceiptItemsId.includes(ReceiptItem.po_product_id)) {
                  console.warn(
                    `Receipt item for po_product_id  ${ReceiptItem.po_product_id} already exists, skipping insertion`,
                  );
                  message('Receipt items are already Inserted', 'warning');
                  insertReceiptItems(index + 1);
                } else {
                  // Insert the order item
                  const ReceiptItemsData = {
                    creation_date: creationdatetime,
                    modified_by: loggedInuser.first_name,
                    goods_receipt_id: id,
                    product_id: ReceiptItem.product_id,
                    item_title: ReceiptItem.item_title,
                    po_code: ReceiptItem.po_code,
                    po_product_id: ReceiptItem.po_product_id,
                    ordered_quantity: ReceiptItem.quantity,
                    unit: ReceiptItem.unit,
                    purchase_order_id: goodsreceipteditdetails.purchase_order_id,
                  };
                  console.log(`Inserting order item ${index + 1}:`, ReceiptItemsData);
                  // Send a POST request to your /goodsreceipt/insertGoodsReceiptItems API with the current ReceiptItemsData
                  api
                    .post('/goodsreceipt/insertGoodsReceiptItems', ReceiptItemsData)
                    .then((result) => {
                      if (result.data.msg === 'Success') {
                        console.log(`Order item ${index + 1} inserted successfully`);
                        setTimeout(() => {
                          window.location.reload();
                        }, 100);
                      } else {
                        console.error(`Failed to insert order item ${index + 1}`);
                      }
                      // Continue to the next item
                      insertReceiptItems(index + 1);
                    })
                    .catch((error) => {
                      console.error(`Error inserting order item ${index + 1}`, error);
                      // Continue to the next item
                      insertReceiptItems(index + 1);
                    });
                }
              } else {
                console.log('All order items inserted successfully');
                // You might want to trigger a UI update here
              }
            };
            // Start inserting order items from index 0
            insertReceiptItems(0);
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
    getGoodsReceiptById();
    getEmployeeName();
    getArabicCompanyName();
    // getQuote();
    // getProject();
  }, [id]);

  return (
    <>
      <GoodsReceiptEditDetails
        handleInputs={handleInputs}
        goodsreceipteditdetails={goodsreceipteditdetails}
        employee={employee}
        editGoodsReceiptData={editGoodsReceiptData}
        id={id}
        arabic={arabic}
        arb={arb}
      ></GoodsReceiptEditDetails>
      <ComponentCard title={arb ?'المزيد من التفاصيل':'More Details'}>
        <ToastContainer></ToastContainer>
        {eng === true && <Tab toggle={toggle} tabs={tabs} />}
        {arb === true && <Tabs toggle={toggle} tabsArb={tabsArb} />}
        <TabContent className="p-4" activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col md="3">
                <FormGroup>
                  <Button
                    className="shadow-none"
                    color="primary"
                    onClick={() => {
                      generateData();
                    }}
                  >
                    {arb ?'إنشاء عناصر الاستلام':'Create Receipt Items'}
                  </Button>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <GoodsReceiptItemsEdit
                    receiptitemseditmodal={receiptitemseditmodal}
                    setReceiptItemsEditModal={setReceiptItemsEditModal}
                    PurchaseOrderId={
                      goodsreceipteditdetails && goodsreceipteditdetails.purchase_order_id
                    }
                    arabic={arabic}
                    arb={arb}
                  ></GoodsReceiptItemsEdit>
                  <Button
                    className="shadow-none"
                    color="primary"
                    onClick={() => {
                      setReceiptItemsEditModal(true);
                    }}
                  >
                    {arb ?'يحرر':'Edit'}
                  </Button>
                </FormGroup>
              </Col>
            </Row>
            <GoodsReceiptLineItems
              PurchaseOrderId={goodsreceipteditdetails && goodsreceipteditdetails.purchase_order_id}
              arabic={arabic}
              arb={arb}
            ></GoodsReceiptLineItems>
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
                  altTagData="GoodsReceiptRelated Data"
                  desc="GoodsReceiptRelated Data"
                  recordType="RelatedPicture"
                  mediaType={attachmentData.modelType}
                  update={update}
                  setUpdate={setUpdate}
                  arabic={arabic}
                  arb={arb}
                />
                <ViewFileComponentV2
                  moduleId={id}
                  roomName="GoodsReceipt"
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

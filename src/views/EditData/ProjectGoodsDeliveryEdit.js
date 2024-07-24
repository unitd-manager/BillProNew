import React, { useEffect, useState, useContext } from 'react';
import { TabPane, TabContent, Button, Table, Row, Col, FormGroup } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../form-editor/editor.scss';
//import * as Icon from 'react-feather';
//import Swal from 'sweetalert2';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import GoodsDeliveryButton from '../../components/GoodsDelivery/GoodsDeliveryButton';
import ProjectGoodsAttachment from '../../components/GoodsDelivery/ProjectGoodsAttachment';
import Tab from '../../components/project/Tab';
import Tabs from '../../components/project/Tabs';
import AppContext from '../../context/AppContext';
import GoodsDeliveryMoreDetails from '../../components/GoodsDelivery/GoodsDeliveryMoreDetails';
import ProjectEditLineItem from '../../components/GoodsDelivery/ProjectEditLineItem';
// import ApiButton from '../../components/ApiButton';
 
const GoodsDeliveryEdit = () => {
  const [tenderDetails, setTenderDetails] = useState();
  const [goodsitemdetails, setgoodslineDetails] = useState();
  const [company, setCompany] = useState();
  const [editModal, setEditModal] = useState(false);
  const { loggedInuser } = useContext(AppContext);
  const { insertedDataId, OrderId } = useParams();
  console.log('orderId', OrderId);
  const [activeTab, setActiveTab] = useState('1');
  const navigate = useNavigate();
  const applyChanges = () => {};
  const backToList = () => {
    navigate('/ProjectGoodsDelivery');
  };

  const tabs = [
    { id: '1', name: 'Goods Delivery ' },
    { id: '2', name: 'Attachment' },
  ];
  const tabsArb = [ 
    { id: '1', name: 'تسليم جيد' },
    { id: '2', name: 'مرفق' },
  ];
  const toggle = (tab) => {
    setActiveTab(tab);
  };

  // Get goods delivery By Id

  const handleInputs = (e) => {
    setTenderDetails({ ...tenderDetails, [e.target.name]: e.target.value });
  };

  // Get Company Data
  const getCompany = () => {
    api.get('/company/getCompany').then((res) => {
      setCompany(res.data.data);
    });
  };
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

  const arb = selectedLanguage === 'Arabic';

  const eng = selectedLanguage === 'English';

  const getArabicCompanyName = () => {
    api
      .get('/goodsdelivery/getTranslationforTradingGoods')
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

  const getgoodsdeliveryById = () => {
    api.post('/projectgoodsdelivery/getgoodsdeliveryById', { project_goods_delivery_id: insertedDataId }).then((res) => {
      setTenderDetails(res.data.data[0]);
    });
  };

  const getgoodsLineItemById = () => {
    api.post('/projectgoodsdelivery/getgoodsdeliveryitemById', { project_goods_delivery_id: insertedDataId }).then((res) => {
      setgoodslineDetails(res.data.data);
    });
  };

  //Logic for edit data in db

  const editGoodsDelivery = () => {
    tenderDetails.modification_date = creationdatetime;
    tenderDetails.modified_by = loggedInuser.first_name;
    api
      .post('/projectgoodsdelivery/edit-goodsdelivery', tenderDetails)
      .then(() => {
        message('Record editted successfully', 'success');
        getgoodsdeliveryById();
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };
  const generateData = () => {
  
    // Step 1: Fetch quote items by quote_id
    api.post('/projectgoodsdelivery/getOrdersById', { project_order_id: OrderId })
      .then((res) => {
        const quoteItems = res.data.data;
        console.log('Received quote items:', quoteItems);
  
        if (quoteItems.length === 0) {
          console.warn('No quote items to process');
          return;
        }
  
        // Step 2: Fetch existing project_quote_items_id from the project_order_item table
        api.post('/projectgoodsdelivery/getOrderItemsByOrderId', { project_goods_delivery_id: insertedDataId })
          .then((existingItemsRes) => {
            const existingItems = existingItemsRes.data.data;
            const existingQuoteItemIds = new Set(existingItems.map(item => item.project_order_item_id));
            console.log('Existing project_order_item_id:', existingQuoteItemIds);
  
            const processOrderItems = (index) => {
              if (index < quoteItems.length) {
                const quoteItem = quoteItems[index];
  
                const orderItemData = {
                  project_goods_delivery_id: insertedDataId,
                  quantity: quoteItem.qty,
                  amount: quoteItem.cost_price,
                  item_title: quoteItem.item_title,
                  project_order_id: quoteItem.project_order_id,
                  unit: quoteItem.unit,
                  unit_price: quoteItem.unit_price,
                  project_order_item_id: quoteItem.project_order_item_id,
                };
  
                if (existingQuoteItemIds.has(quoteItem.project_order_item_id)) {
                  // Update the existing order item
                  console.log(`Updating existing order item ${index + 1}:`, orderItemData);
  
                  api.post('/projectgoodsdelivery/update_project_order_item', orderItemData)
                    .then((result) => {
                      if (result.data.msg === 'Success') {
                        console.log(`Order item ${index + 1} updated successfully`);
                      } else {
                        console.error(`Failed to update order item ${index + 1}`);
                      }
                      processOrderItems(index + 1);
                    })
                    .catch((error) => {
                      console.error(`Error updating order item ${index + 1}`, error);
                      processOrderItems(index + 1);
                    });
                } else {
                  // Insert new order item
                  console.log(`Inserting order item ${index + 1}:`, orderItemData);
  
                  api.post('/projectgoodsdelivery/insertgoodsdeliveryitem', orderItemData)
                    .then((result) => {
                      if (result.data.msg === 'Success') {
                        console.log(`Order item ${index + 1} inserted successfully`);
                        // Add the inserted item to the set to avoid future duplicates
                        existingQuoteItemIds.add(quoteItem.project_quote_items_id);
                      } else {
                        console.error(`Failed to insert order item ${index + 1}`);
                      }
                      processOrderItems(index + 1);
                    })
                    .catch((error) => {
                      console.error(`Error inserting order item ${index + 1}`, error);
                      processOrderItems(index + 1);
                    });
                }
              } else {
                console.log('All order items processed successfully');
                // Optionally reload the page or trigger a state update
                 window.location.reload();
              }
            };
  
            // Start processing order items from index 0
            processOrderItems(0);
          })
          .catch((error) => {
            console.error('Error fetching existing project order items', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching quote items', error);
      });
  };
  useEffect(() => {
    getCompany();
    getgoodsdeliveryById();
    getgoodsLineItemById();
  }, [insertedDataId]);

  //Structure of Invoice table
  const columns1 = [
    { name:arb ? 'رقم لا' : 'SN.No' },
    { name:arb ? 'عنوان البند' : 'Item Title' },
    { name:arb ? 'وحدة' : 'Unit' },
    { name:arb ? 'الكمية المطلوبة' : 'Ordered Quantity' },
    { name:arb ? 'كمية تسليمها' : 'Delivered Quantity' },
    { name:arb ? 'سعر الوحدة' : 'Unit Price' },
    { name:arb ? 'المبلغ الإجمالي' : 'Total Amount ' },
  ];

  return (
    <>
    {eng === true && <BreadCrumbs heading={tenderDetails && tenderDetails.title} />}
      {arb === true && <BreadCrumbs heading={tenderDetails && tenderDetails.title_arb} />}
     {/* <BreadCrumbs heading={tenderDetails && tenderDetails.title} />*/}
      <GoodsDeliveryButton
        editGoodsDelivery={editGoodsDelivery}
        navigate={navigate}
        applyChanges={applyChanges}
        backToList={backToList}
        //OrderId={OrderId}
        id={insertedDataId}
      ></GoodsDeliveryButton>

{/* <ApiButton
              editData={editGoodsDelivery}
              navigate={navigate}
              applyChanges={editGoodsDelivery}
              //deleteData={deleteBookingData}
              backToList={backToList}
              module="GoodsDelivery"
            ></ApiButton> */}
      <GoodsDeliveryMoreDetails
      arb={arb}
      arabic={arabic}
        handleInputs={handleInputs}
        company={company}
        tenderDetails={tenderDetails}
        companyhandleInputs={companyhandleInputs}

      ></GoodsDeliveryMoreDetails>

      <ComponentCard title={arb ? 'المزيد من التفاصيل' : 'More Details'}>
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
              <Col md="3">
                <FormGroup>
                  <Button
                    className="shadow-none"
                    color="primary"
                    onClick={() => {
                      generateData();
                    }}
                  >
                    {arb?'إنشاء عنصر التسليم': 'Generate Delivery Item'} 
                  </Button>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Button
                    className="shadow-none"
                    color="primary"
                    onClick={() => {
                      setEditModal(true);
                    }}
                  >
            {arb?'يحرر': 'Edit'} 
 
                  </Button>
                </FormGroup>
              </Col>
            </Row>
            <ProjectEditLineItem
              editModal={editModal}
              id={insertedDataId}
              setEditModal={setEditModal}
              getgoodsLineItemById={getgoodsLineItemById}
            ></ProjectEditLineItem>

            <FormGroup>
              <div className="container">
                <Table id="example" className="lineitem border border-secondary rounded">
                  <thead>
                    <tr>
                      {columns1.map((cell) => {
                        return <td key={cell.name}>{cell.name}</td>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {goodsitemdetails &&
                      goodsitemdetails.map((element, index) => {
                        return (
                          <tr key={element.goods_delivery_id}>
                            <td>{index + 1}</td>
                            <td>{element.item_title}</td>
                            <td>{element.unit}</td>
                            <td>{element.quantity}</td>
                            <td>{element.delivery_qty}</td>
                            <td>{element.unit_price}</td>
                            <td>{element.amount}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </div>
            </FormGroup>
          </TabPane>
          <TabPane tabId="2">
            <ProjectGoodsAttachment></ProjectGoodsAttachment>
          </TabPane>
        </TabContent>
      </ComponentCard>
    </>
  );
};

export default GoodsDeliveryEdit;

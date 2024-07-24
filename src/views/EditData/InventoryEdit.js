import React, { useEffect, useState, useContext } from 'react';
import { Row, Col, Form,TabPane, TabContent } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import api from '../../constants/api';
import message from '../../components/Message';
import ComponentCard from '../../components/ComponentCard';
import PurchaseOrderLinkedTable from '../../components/Inventory/PurchaseOrderLinkedTable';
import ClientAttachmentPortal from '../../components/ClientTable/ClientAttachmentPortal';
import ProjectLinkedTable from '../../components/Inventory/ProjectLinkedTable';
import Tab from '../../components/project/Tab';
import Tabs from '../../components/project/Tabs';
import InventoryEditPart from '../../components/Inventory/InventoryEditPart';
// import InventoryEditTables from '../../components/Inventory/InventoryEditTables';
import creationdatetime from '../../constants/creationdatetime';

const Test = () => {
  //state variables
  const [tabPurchaseOrdersLinked, setTabPurchaseOrdersLinked] = useState([]);
  const [projectsLinked, setProjectsLinked] = useState([]);
  const [productQty, setProductQty] = useState({});
  const [inventoryDetails, setInventoryDetails] = useState({
    inventory_code: '',
    inventory_id: '',
    minimum_order_level: '',
    productId: '',
    product_type: '',
    company_name: '',
    product_name: '',
    item_code: '',
    unit: '',
    notes: '',
    product_code: '',
  });

  //params and routing
  const { id } = useParams();
  const { loggedInuser } = useContext(AppContext);

  const [adjustStocks, setAdjustStocks] = useState([]);
  const [changedStock, setChangedStock] = useState(0);

  const [activeTab, setActiveTab] = useState('1');

  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
 
  
const selectedLanguage = getSelectedLanguageFromLocalStorage();

// Use the selected language value as needed
console.log('Selected language from localStorage:', selectedLanguage);

 

  const tabs = [
    { id: '1', name: 'Purchase Orders Linked' },
    { id: '2', name: 'Invoice Linked' },
    { id: '3', name: ' Attachment' },
  ];
  const tabsArb =  [
    {id:'1',name:'أوامر الشراء مرتبطة'},
    {id:'2',name:'الفاتورة مرتبطة'},
    {id:'3',name:'مرفق'},
  ];

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  
  const [arabic, setArabic] = useState([]);


  const arb =selectedLanguage === 'Arabic'

  const eng =selectedLanguage === 'English'


  const getArabicInventory = () => {
    api
    .get('/inventory/getTranslationForInventory')
    .then((res) => {
      setArabic(res.data.data);
    })
    .catch(() => {
      // Handle error if needed
    });   
};

console.log('arabic',arabic)
useEffect(() => {
  getArabicInventory();
}, []);

  const getAdjustStocklogsById = () => {
    api
      .post('/inventory/getAdjustStock', { inventory_id: id })
      .then((res) => {
        setAdjustStocks(res.data.data);
      })
      .catch(() => {
        message('Adjuststock logs Data Not Found', 'info');
      });
  };

  //handle input change
  const handleInputs = (e) => {
    setInventoryDetails({ ...inventoryDetails, [e.target.name]: e.target.value, inventory_id: id });
  };

  //get inventory by product id
  const getInventoryData = () => {
    api
      .post('/inventory/getinventoryById', { inventory_id: id })
      .then((res) => {
        setInventoryDetails(res.data.data[0]);
      })
      .catch(() => {
        message('Unable to get inventory data.', 'error');
      });
  };

  //get data for purchase order table
  const getAllPurchaseOrdersLinked = () => {
    api
      .post('/inventory/gettabPurchaseOrderLinkedById', { product_id: inventoryDetails && inventoryDetails.productId })
      .then((res) => {
        setTabPurchaseOrdersLinked(res.data.data);
      })
      .catch(() => {
        message('Unable to get purchase order data.', 'error');
      });
  };

  //get data for projects table
  const getAllProjectsLinked = () => {
    api
      .post('/inventory/getTabOrderLinkedById', { product_id: inventoryDetails && inventoryDetails.productId })
      .then((res) => {
        setProjectsLinked(res.data.data);
      })
      .catch(() => {
        message('Unable to get projects data.', 'error');
      });
  };

  //get product purchased quantity and sold qty
  const getProductQuantity = () => {
    api
      .post('/inventory/getProductOrderQuantity', { product_id: inventoryDetails && inventoryDetails.productId })
      .then((res) => {
        setProductQty(res.data.data[0]);
      })
      .catch(() => {
        message('Unable to get product quantity data.', 'error');
      });
  };

  //update Inventory
  const editInventoryData = () => {
    inventoryDetails.modification_date = creationdatetime;
    inventoryDetails.modified_by = loggedInuser.first_name;
    api
      .post('/inventory/editinventoryMain', inventoryDetails)
      .then(() => {
        message('Record edited successfully', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 300);
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  useEffect(() => {
    getInventoryData();
    getAllPurchaseOrdersLinked();
    getAllProjectsLinked();
    getAdjustStocklogsById();
    getProductQuantity();
  }, [inventoryDetails.productId]);

  useEffect(() => {
    let changes = 0;
    adjustStocks.forEach((el) => {
      changes += parseFloat(el.adjust_stock) || 0;
    });
    setChangedStock(changes);
  }, [adjustStocks]);

  return (
    <>
      <ToastContainer></ToastContainer>
      <InventoryEditPart
        inventoryDetails={inventoryDetails}
        handleInputs={handleInputs}
        editinventoryData={editInventoryData}
      />
      <Row>
        <Form>
          <ComponentCard title="Stock Details">
            <Row>
              <Col xs="12" md="3">
                <Row>
                  <h5>Total Purchased Quantity</h5>
                </Row>
                <span>{productQty && productQty.materials_purchased}</span>
              </Col>
              <Col xs="12" md="3">
                <Row>
                  <h5>Sold Quantity</h5>
                </Row>
                <span>{productQty && productQty.materials_used}</span>
              </Col>
              <Col xs="12" md="3">
                <Row>
                  <h5>Adjusted Quantity</h5>
                </Row>
                <span>{changedStock}</span>
              </Col>
              <Col xs="12" md="3">
                <Row>
                  <h5>Remaining Quantity</h5>
                </Row>
                <span>{productQty && productQty.actual_stock}</span>
              </Col>
            </Row>
          </ComponentCard>
        </Form>
      </Row>

      <ComponentCard title= {arb ? 'المزيد من التفاصيل':'More Details'} >
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
          <PurchaseOrderLinkedTable
          tabPurchaseOrdersLinked={tabPurchaseOrdersLinked}
          projectsLinked={projectsLinked}
          eng={eng}
          arb={arb}
          arabic={arabic}
        />
          </TabPane>
          { /* Invoice Linked Portal */}
           <TabPane tabId="2">
           <ProjectLinkedTable
          projectsLinked={projectsLinked}
          eng={eng}
          arb={arb}
          arabic={arabic}
        />
          </TabPane>
          { /* Attachment Portal */ }
          <TabPane tabId="3">
          <ClientAttachmentPortal
          ClientId={id}
          />
          </TabPane>
        </TabContent>
      </ComponentCard>
      {/* <InventoryEditTables
        tabPurchaseOrdersLinked={tabPurchaseOrdersLinked}
        projectsLinked={projectsLinked}
      /> */}
    </>
  );
};

export default Test;

import React, { useEffect, useState , useContext} from 'react';
import { Row, Col, Button, TabContent, TabPane } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import AddNote from '../../components/Tender/AddNote';
import ViewNote from '../../components/Tender/ViewNote';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';
import AddPoModal from '../../components/PurchaseOrder/AddPoModal';
import AttachmentTab from '../../components/PurchaseOrder/AttachmentTab';
import PurchaseOrderlineItemEdit from '../../components/PurchaseOrder/PurchaseOrderLineItem';
import ViewHistoryModal from '../../components/PurchaseOrder/ViewHistoryModal';
import PurchaseOrderDetailsPart from '../../components/PurchaseOrder/PurchaseOrderDetailsPart';
import ProductLinkedTable from '../../components/PurchaseOrder/ProductLinkedTable';
// import PurchaseOrderEditModal from '../../components/PurchaseOrder/PurchaseOrderEditModal';
import Tab from '../../components/project/Tab';
import Tabs from '../../components/project/Tabs';
import ApiButton from '../../components/ApiButton';
import PdfPurchaseOrder from '../../components/PDF/PdfPurchaseOrder';
import ComponentCardV2 from '../../components/ComponentCardV2';
import AppContext from '../../context/AppContext';
import creationdatetime from '../../constants/creationdatetime';

const PurchaseOrderEdit = () => {
  //All state variable
  const [purchaseDetails, setPurchaseDetails] = useState();
    const [supplier, setSupplier] = useState([]);
  const [request, setRequest] = useState([]);
  const [product, setProduct] = useState();
  const [historyProduct, setHistoryProduct] = useState();
  const [addPurchaseOrderModal, setAddPurchaseOrderModal] = useState();
  const [products, setProducts] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const [pictureData, setDataForPicture] = useState({
    modelType: '',  
  });
  const [activeTab, setActiveTab] = useState('1');
  const [viewHistoryModal, setViewHistoryModal] = useState(false);
 const [selectedPoProducts, setSelectedPoProducts] = useState([]);
 const [supplierId, setSupplierId] = useState();
  const [gTotal, setGtotal] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const { loggedInuser } = useContext(AppContext);
  const [isFieldDisabled, setIsFieldDisabled] = useState(true);
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };

  
const selectedLanguage = getSelectedLanguageFromLocalStorage();
  const [arabic, setArabic] = useState([]);


  const arb =selectedLanguage === 'Arabic'
  //const eng =selectedLanguage === 'English'
  // const eng =selectedLanguage === 'English'
  const getArabicValue = () => {
    api
    .get('/purchaseorder/getTranslationForPurchaseOrder')
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
  

  //const applyChanges = () => {};
  const backToList = () => {
    navigate('/PurchaseOrder');
  };
  //puchaseOrder data in purchaseDetails
  const handleInputs = (e) => {
    setPurchaseDetails({ ...purchaseDetails, [e.target.name]: e.target.value });
  };
  //getting data from purchaseOrder by Id
  const getPurchaseOrderId = () => {
    api.post('/purchaseorder/getPurchaseOrderById', { purchase_order_id: id }).then((res) => {
      setPurchaseDetails(res.data.data[0]);
      setSupplierId(res.data.data[0]?.supplier_id);
    });
  };

  // Gettind data from Job By Id
  const getPoProduct = () => {
    api
      .post('/purchaseorder/TabPurchaseOrderLineItemById', { purchase_order_id: id })
      .then((res) => {
        setProducts(res.data.data);
        let grandTotal = 0;
        res.data.data.forEach((elem) => {
          grandTotal += elem.po_value;
        });
        setGtotal(grandTotal);
      })
      .catch(() => {
        message('Products Data Not Found', 'info');
      });
  };
  // Gettind data from Job By Id
  const getSupplier = () => {
    api
      .get('/purchaseorder/getSupplier')
      .then((res) => {
        setSupplier(res.data.data);
      })
      .catch(() => {
        message('Supplier Data Not Found', 'info');
      });
  };

  const getRequestForQuote = (supplierIds) => {
    api
      .post('/quote/SupplierQuote', {supplier_id : supplierIds})
      .then((res) => {
        console.log('API Response:', res.data); // Log the API response
        setRequest(res.data.data);
      })
      .catch((error) => {
        console.error('Error fetching purchase_quote_id:', error);
      });
  };
  

  
  const handlePOInputs = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  //Add to stocks
  const addQtytoStocks = () => {
    if (selectedPoProducts) {
      selectedPoProducts.forEach((elem) => {
        if (elem.status !== 'Closed') {
          elem.status = 'Closed';
          elem.qty_updated = elem.qty_delivered;
          elem.qty_in_stock += parseFloat(elem.qty_delivered);
          elem.stock = elem.qty_in_stock;
          // elem.qty_in_stock=elem.stock;
          api.post('/product/edit-ProductQty', elem);
          api
            .post('/purchaseorder/editTabPurchaseOrderLineItem', elem)
            .then(() => {
              api
                .post('/inventory/editInventoryStock', elem)
                .then(() => {
                  message('Quantity updated in inventory successfully.', 'success');
                })
                .catch(() => {
                  message('unable to update quantity in inventory.', 'danger');
                });
              message('Quantity added successfully.', 'success');
            })
            .catch(() => {
              message('unable to add quantity.', 'danger');
            });
        } else {
          message('This product is already added', 'danger');
        }
      });
    } else {
      alert('Please select atleast one product');
    }
  };


  //Update Setting
  const editPurchaseData = () => {
    purchaseDetails.modification_date = creationdatetime;
    purchaseDetails.modified_by = loggedInuser.first_name;
    api
      .post('/purchaseorder/editTabPurchaseOrder', purchaseDetails)
      .then(() => {
        message('Record editted successfully', 'success');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  //Edit poproductdata
  const editPoProductData = () => {
    api
      .post('/purchaseorder/editTabPurchaseOrderLineItem', product)
      .then(() => {
        message('product edited successfully.', 'success');
        //window.location.reload();
      })
      .catch(() => {
        message('unable to edit product.', 'danger');
      });
  };

  const deletePoProduct = (poProductId) => {
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
          .post('purchaseorder/deletePoProduct', { po_product_id: poProductId })
          .then(() => {
            Swal.fire('Deleted!', 'PoProduct has been deleted.', 'success');
            setTimeout(() => {
              window.location.reload();
            }, 300);
          })
          .catch(() => {
            message('Unable to Delete PO Product', 'info');
          });
      }
    });
  };

  //checked objects
  const getCheckedPoProducts = (checkboxVal, index, Obj) => {
    if (checkboxVal.target.checked === true) {
      setSelectedPoProducts([...selectedPoProducts, Obj]);
    }
    if (checkboxVal.target.checked !== true) {
      const copyselectedPoProducts = [...selectedPoProducts];
      copyselectedPoProducts.splice(index, 1);
      setSelectedPoProducts(copyselectedPoProducts);
    }
  };
  
  // };

  // Start for tab refresh navigation #Renuka 1-06-23
  const tabs = [
    { id: '1', name: 'Attachments' },
    { id: '2', name: 'Notes' },
  ];
  const tabsArb = [
    { id: '1', name: 'مرفق' },
    { id: '2', name: 'ملحوظات' },
  ];
  const toggle = (tab) => {
    setActiveTab(tab);
  };
  // End for tab refresh navigation #Renuka 1-06-23

  //   //Attachments
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
  };
  //Pictures
  const dataForPicture = () => {
    setDataForPicture({
      modelType: 'picture',
    });
  };
  console.log('setIsFieldDisabled before click', isFieldDisabled);

  const generateData = () => {

    setIsFieldDisabled(true); // Disable the field at the start of the operation
  console.log('setIsFieldDisabled before click', isFieldDisabled);
    
    const PurchaseQuoteId=purchaseDetails.purchase_quote_id
    // Step 1: Delete old order items by quote_id
    api.delete(`/purchaseorder/deleteorder_item/${PurchaseQuoteId}`).then(() => {
      api
        .post('/purchaseorder/getQuoteLineItemsById', { purchase_quote_id : purchaseDetails.purchase_quote_id })
        .then((res) => {
          const purchasequoteItems = res.data.data;

          console.log('Received quote items:', purchasequoteItems);

          if (purchasequoteItems.length === 0) {
            console.warn('No quote items to insert');
            return;
          }

          api
            .get('/purchaseorder/checkQuoteItems')
            .then((response) => {
              const ExistingPurchaseQuoteItemsId = response.data.data;
              console.log('ExistingPurchaseQuoteItemsId', response.data.data)
              console.log('quoteitems',purchasequoteItems)
              const insertOrderItems = (index) => {
                if (index < purchasequoteItems.length) {
                  const PurchaseQuoteItem = purchasequoteItems[index];
                  // Check if the po_product_id  already exists in the ExistingReceiptItemsId array
                  if (ExistingPurchaseQuoteItemsId.includes(PurchaseQuoteItem.purchase_quote_id)) {
                    console.warn(
                      `Quote item for purchase_quote_id  ${PurchaseQuoteItem.purchase_quote_id} already exists, skipping insertion`,
                    );
                    message('Quote items are already Inserted', 'warning');
                    insertOrderItems(index + 1);
                  } else {
                    // Insert the order item
                    const orderItemData = {
                      purchase_order_id: id,
                      item_title: PurchaseQuoteItem.order_code,
                      qty: PurchaseQuoteItem.quantity,
                      unit: PurchaseQuoteItem.unit,
                      description: PurchaseQuoteItem.description,
                      product_id: PurchaseQuoteItem.product_id,
                      supplier_id: purchaseDetails.supplier_id,
                      cost_price: PurchaseQuoteItem.amount,
                      purchase_quote_id: purchaseDetails.purchase_quote_id,
                      purchase_quote_items_id: PurchaseQuoteItem.purchase_quote_items_id,
                      amount:purchaseDetails.total_cost
                    };

                    console.log(`Inserting order item ${index + 1}:`, orderItemData);
                    // Send a POST request to your /finance/insertorder_item API with the current order item
                    api
                      .post('/purchaseorder/insertPurchaseQuote_item', orderItemData)
                      .then((result) => {
                        if (result.data.msg === 'Success') {
                          console.log(`Order item ${index + 1} inserted successfully`);
                          // setTimeout(() => {
                          //   window.location.reload()
                          // }, 100);
                        } else {
                          console.error(`Failed to insert order item ${index + 1}`);
                        }
                        // Continue to the next item
                        insertOrderItems(index + 1);
                      })
                      .catch((error) => {
                        console.error(`Error inserting order item ${index + 1}`, error);
                        // Continue to the next item
                        insertOrderItems(index + 1);
                      });
                  }
                } else {
                  console.log('All order items inserted successfully');
                  setIsFieldDisabled(false);
                  // You might want to trigger a UI update here
                }
              };

              // Start inserting order items from index 0
              insertOrderItems(0);
            })
            .catch((error) => {
              console.error('Error fetching quote items', error);
              setIsFieldDisabled(false);
            });
        })
        .catch((error) => {
          console.error('Error deleting old order items', error);
          setIsFieldDisabled(false);
        });
    });
  }

  useEffect(() => {
    getSupplier();
    getPoProduct();
    getPurchaseOrderId();
    getSupplier();
    getArabicValue();
  }, [id]);
  useEffect(() => {
    if (purchaseDetails && purchaseDetails.supplier_id) {
      // Use purchaseDetails.supplier_id directly to get the selected project ID
      const selectedProjectId = purchaseDetails && purchaseDetails.supplier_id;
      getRequestForQuote(selectedProjectId);
    }
  }, [purchaseDetails && purchaseDetails.supplier_id]);


  return (
    <>
      <BreadCrumbs />
      <ToastContainer></ToastContainer>
      <ApiButton
              editData={editPurchaseData}
              navigate={navigate}
              applyChanges={editPurchaseData}
              backToList={backToList}
              module="PurchaseOrder"
            ></ApiButton>
            <ComponentCardV2>
              <PdfPurchaseOrder></PdfPurchaseOrder>
            </ComponentCardV2>
      {/* PurchaseOrder Details */}
      <PurchaseOrderDetailsPart
       products={products}
        supplier={supplier}
        request={request}
        handleInputs={handleInputs}
        purchaseDetails={purchaseDetails}
        getSupplier={getSupplier}
        arabic={arabic}
        arb={arb}
        genLabel={genLabel}
        isFieldDisabled={isFieldDisabled}
      />
         
      <ComponentCard title="Product Linked">
        <AddPoModal
          PurchaseOrderId={id}
          supplierId={supplierId}
          addPurchaseOrderModal={addPurchaseOrderModal}
          setAddPurchaseOrderModal={setAddPurchaseOrderModal}
        />

        <Row className="mb-4">
          {/* <Col md="2">
            <Button
              color="primary"
              onClick={() => {
                setAddPurchaseOrderModal(true);
              }}
            >
              Add Product
            </Button>
          </Col> */}
          <Col md="2">
              <Button
                color="success"
                onClick={generateData}
              >
                Generate Data
              </Button>
            </Col>
          <Col md="2">
            <Button
              color="success"
              onClick={() => {
                addQtytoStocks();
              }}
            >
              Add all Qty to Stock
            </Button>
          </Col>

          
          {/* <PurchaseOrderEditModal
                  purchaseordereditmodal={purchaseordereditmodal}
                  setPurchaseOrderEditModal={setPurchaseOrderEditModal}
                  PurchaseOrderId={id}
                  arb={arb}
          arabic={arabic}
          products={products}
          product={product}
          handlePOInputs={handlePOInputs}
          getCheckedPoProducts={getCheckedPoProducts}
                    ></PurchaseOrderEditModal> */}
            {/* <Button
              color="success"
              onClick={() => {
                setPurchaseOrderEditModal(true);
              }}
            >
              Edit Purchase Order Items
            </Button>
             */}
          
       
          <Col md="3">
            <b color="primary">{arabic.find(item => item.key_text === 'mdPurchaseOrder.Grand Total')?.[genLabel]}:{gTotal}</b>
          </Col>

         
        </Row>


     
        <ProductLinkedTable
          products={products}
          setProduct={setProduct}
          getCheckedPoProducts={getCheckedPoProducts}
          setEditModal={setEditModal}
          setViewHistoryModal={setViewHistoryModal}
          deletePoProduct={deletePoProduct}
          setHistoryProduct={setHistoryProduct}
        />
      </ComponentCard>
      {editModal && (
        <PurchaseOrderlineItemEdit
          product={product}
          editModal={editModal}
          editPoProductData={editPoProductData}
          setEditModal={setEditModal}
          handlePOInputs={handlePOInputs}
        ></PurchaseOrderlineItemEdit>
      )}
      {viewHistoryModal && (
        <ViewHistoryModal
          viewHistoryModal={viewHistoryModal}
          setViewHistoryModal={setViewHistoryModal}
          productId={historyProduct}
          supplierId={supplierId}
        />
      )}

     
      <ComponentCard title="More Details">
      {/* {eng === true &&
        <Tab toggle={toggle} tabs={tabs} />
        } */}
        { arb === true ?
        <Tabs toggle={toggle} tabsArb={tabsArb} />:<Tab toggle={toggle} tabs={tabs} />
        }        <TabContent className="p-4" activeTab={activeTab}>
       
          <TabPane tabId="1">
            <Row>
              <AttachmentTab
                dataForPicture={dataForPicture}
                dataForAttachment={dataForAttachment}
                id={id}
                attachmentModal={attachmentModal}
                setAttachmentModal={setAttachmentModal}
                pictureData={pictureData}
                attachmentData={attachmentData}
              />
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <AddNote recordId={id} roomName="PurchaseOrderEdit" />
              <ViewNote recordId={id} roomName="PurchaseOrderEdit" />
            </Row>
          </TabPane>
        </TabContent>
      </ComponentCard>
    </>
  );
};

export default PurchaseOrderEdit;


/*eslint-disable*/
import React, { useEffect, useState, useContext } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button , TabContent, TabPane} from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import moment from 'moment';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import ComponentCardV2 from '../../components/ComponentCardV2';
import message from '../../components/Message';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import DeleteButton from '../../components/DeleteButton';
import AppContext from '../../context/AppContext';
import Tabs from '../../components/project/Tabs';
// import QuotationMoreDetails from '../../components/ProjectModal/QuotationMoreDetails';
import Tab from '../../components/project/Tab';
import RequestPurchase from '../../components/RequestForQuote/RequestPurchase';
import PdfRequestForQuote from '../../components/PDF/PdfRequestForQuote';
import ApiButton from '../../components/ApiButton';


const RequestForQuoteEdit = () => {
  //All state variable
  const [quoteDetails, setQuoteDetails] = useState();
  const [supplier, setSupplier] = useState([]);
  const [activeTab, setActiveTab] = useState('1');
  const [orderDetails, setOrderDetails] = useState();

  const { loggedInuser } = useContext(AppContext);
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
  const selectedLanguage = getSelectedLanguageFromLocalStorage();

  //navigation and parameters
  const { id } = useParams();
  const navigate = useNavigate();

  const applyChanges = () => {};
  const backToList = () => {
    navigate('/RequestForQuote');
  };
  
  const handleInputs = (e) => {
    setQuoteDetails({ ...quoteDetails, [e.target.name]: e.target.value });
  };
  

  //Update Setting
  const editQuoteData = () => {
    quoteDetails.modification_date = creationdatetime;
    quoteDetails.modified_by = loggedInuser.first_name;

    if (quoteDetails.status !== '') {
      api
      .post('/quote/editPurchseQuote', quoteDetails)
      .then(() => {
        message('Record editted successfully', 'success');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
    } else {
      message('Please fill all required fields.', 'error');
    }
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
  const tabs = [
    { id: '1', name: 'Request For Quotation' }
  ];

  const tabsArb = [
    { id: '1', name: 'طلب عرض أسعار' }
  ];
  const toggle = (tab) => {
    setActiveTab(tab);
  };


  const [arabic, setArabic] = useState([]);


  const arb =selectedLanguage === 'Arabic'

  const eng =selectedLanguage === 'English'
  

  const getArabicCompanyName = () => {
      api
      .get('/quote/getTranslationForReqForQuote')
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

  const getOrdersByOrderId = () => {
    api.post('/quote/RequestLineItemById', { purchase_quote_id : id }).then((res) => {
      setOrderDetails(res.data.data);
    
    });
  };
  
  const generateData = () => {
    // Fetch quote items by purchase_request_id
    api.post('/quote/getPurchaseQuoteRequestById', { purchase_request_id: quoteDetails.purchase_request_id }).then((res) => {
      const orderItem = res.data.data;
        console.log('Received items:', orderItem);
        if (orderItem.length === 0) {
          console.warn('No Delivery items to insert');
          return;
        }
  
         // Retrieve all order_item_id  values from the goods_delivery_items table
         api
         .get('/quote/checkQuoteItems')
         .then((response) => {
           const ExistingRequestQuote = response.data.data;
           let alreadyInserted = false;
           const insertRequest = (index) => {
             if (index < orderItem.length) {
               const orderItems = orderItem[index];
               // Check if the purchase_quote_items_id   already exists in the ExistingRequestQuote array
               if (ExistingRequestQuote.includes(orderItems.purchase_request_items_id )) {
                 if (!alreadyInserted) {
                   console.warn(
                     `Delivery items are already Inserted (Purchase_request_id: ${orderItems.purchase_request_items_id })`,
                   );
                   message('Delivery items are already Inserted', 'warning');
                   alreadyInserted = true; // Set the flag to true so the message is shown only once
                  //  setTimeout(() => {
                  //    alreadyInserted = false;
                  //  }, 3000);
                 }
                 insertRequest(index + 1);
                } else {
                 
                
       // Create a helper function to insert a single order item
        const orderItemData = {
      purchase_quote_id: id,
      quantity: orderItems.purchase_request_qty,
      product_id: orderItems.product_id,
      purchase_request_id: quoteDetails.purchase_request_id,
      unit: orderItems.unit,
      amount: orderItems.amount,
      description: orderItems.description,
      purchase_request_items_id: orderItems.purchase_request_items_id
    };
    console.log(`Inserting order item ${index + 1}:`, orderItemData);
    console.log('ExistingRequestQuote:', ExistingRequestQuote);
    api
      .post('/quote/insertQuoteItems', orderItemData)
      .then((result) => {
        if (result.data.msg === 'Success') {
          console.log(`Quote item ${index + 1} inserted successfully`);

          if (!alreadyInserted) {
            console.log(`Quote item ${index + 1} inserted successfully`);
            message('All Quote items Inserted successfully');
            alreadyInserted = true;
          }
          getOrdersByOrderId();
          // window.location.reload();
        } else {
          console.error(`Failed to insert order item ${index + 1}`);
        }
        // Continue to the next item
        insertRequest(index + 1);
      })
      .catch((error) => {
        console.error(`Error inserting order item ${index + 1}`, error);
        // Continue to the next item
        insertRequest(index + 1);
      });
  }
} else {
  console.log('All order items inserted successfully');
  // You might want to trigger a UI update here
}
};
// Start inserting order items from index 0
insertRequest(0);
})
.catch((error) => {
console.error('Error checking order item existence', error);
});
})

.catch((error) => {
console.error('Error fetching quote items', error);
});
};

   //getting data from setting by Id
   const getTabQuoteById = () => {
    api
      .post('/quote/getPurchaseQuoteById', { purchase_quote_id: id })
      .then((res) => {
        setQuoteDetails(res.data.data[0]);
        generateData(res.data.data[0].purchase_request_id);
      })
      .catch(() => {
        // message('Data Not Found', 'info');
      });
  };
  
  useEffect(() => {
    getTabQuoteById();
    getSupplier();
    getOrdersByOrderId();
    getArabicCompanyName();
  }, [id]);
  

  return (
    <>
      <BreadCrumbs />
      <Form>
        <FormGroup>
          <ToastContainer></ToastContainer>
          <ComponentCardV2>
            <Row>
            <Col>
              <Button
                className="shadow-none"
                color="primary"
                onClick={() => {
                  generateData();
                }}
              >
                Generate Data
              </Button>
            </Col>
              <Col>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    editQuoteData();
                    navigate('/RequestForQuote');
                  }}
                >
                  Save
                </Button>
              </Col>
              <Col>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    editQuoteData();
                    applyChanges();
                  }}
                > 
                  Apply
                </Button>
              </Col>
              <Col>
                <Button
                  type="submit"
                  className="btn btn-dark shadow-none"
                  onClick={(e) => {
                    if (window.confirm('Are you sure you want to cancel? ')) {
                      navigate('/RequestForQuote');
                    } else {
                      e.preventDefault();
                    }
                  }}
                >
                  Cancel
                </Button>
              </Col>
              <Col>
                <DeleteButton id={id} columnname="purchase_quote_id" tablename="quote"></DeleteButton>
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
          {/* <ApiButton
              editData={editQuoteData}
              navigate={navigate}
              applyChanges={editQuoteData}
              //deleteData={deleteBookingData}
              backToList={backToList}
              module="RequestForQuote"
            ></ApiButton> */}
          <ComponentCardV2>
          <Label>
          <PdfRequestForQuote id={id} quoteId={id}></PdfRequestForQuote>
        </Label>
                  </ComponentCardV2>
        </FormGroup>
      </Form>
      {/* Setting Details */}
      <Form>
        <FormGroup>
        <ComponentCard title= {arb ?'تفاصيل الاقتباس':'Quote Details'} creationModificationDate={quoteDetails}>
            {' '}
            <ToastContainer></ToastContainer>
            <Row>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdRequestForQuote.Purchase Request Code')?.[genLabel]}
                  </Label>
                  <br></br>
                  <span>{arb?quoteDetails && quoteDetails.purchase_request_code_arb:quoteDetails && quoteDetails.purchase_request_code}</span>
                  
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdRequestForQuote.Request For Quote Code')?.[genLabel]}
                </Label>
                  <br></br>
                  <span>{arb?quoteDetails && quoteDetails.rq_code_arb:quoteDetails && quoteDetails.rq_code}</span>
                  
                </FormGroup>
              </Col>
                <Col md="3">
                  <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdRequestForQuote.Status')?.[genLabel]}
                </Label>
                    <Input
                      type="select"
                      onChange={handleInputs}
                      value={quoteDetails && quoteDetails.status}
                      name="status">
                      <option value="">{arb ?'الرجاء التحديد':'Please Select'}</option>
                        <option value="New">{arb ?'جديد':'New'}</option>
                        <option value="Quoted">{arb ?'مقتبس':'Quoted'}</option>
                        <option value="Awarded">{arb ?'منحت':'Awarded'}</option>
                        <option value="NotAwarded">{arb ?'لم يتم منحها':'Not Awarded'}</option>
                        <option value="Cancelled">{arb ?'ألغيت':'Cancelled'}</option>
                      </Input>
                  </FormGroup>
                </Col>  
                <Col md="3">
                    <FormGroup>
                    <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdRequestForQuote.Date Issued')?.[genLabel]}
                </Label>
                      <Input
                        type="date"
                        onChange={handleInputs}
                        value={quoteDetails && moment(quoteDetails.date_issued).format('YYYY-MM-DD')}
                        name="date_issued"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                    <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdRequestForQuote.Due Date')?.[genLabel]}
                </Label>
                      <Input
                        type="date"
                        onChange={handleInputs}
                        value={quoteDetails && moment(quoteDetails.due_date).format('YYYY-MM-DD')}
                        name="due_date"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdRequestForQuote.Supplier Name')?.[genLabel]}
                </Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={quoteDetails && quoteDetails.supplier_id}
                    name="supplier_id"
                  >
                    <option defaultValue="selected">{arb ?'الرجاء التحديد':'Please Select'}</option>
                    {supplier &&
                      supplier.map((e) => {
                        return (
                          <option key={e.supplier_id} value={e.supplier_id}>
                            {arb?e.company_name_arb:e.company_name}
                          </option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>
      <ComponentCard title={arb ?'المزيد من التفاصيل':'More Details'}>
     
        { arb === true ?
        <Tabs toggle={toggle} tabsArb={tabsArb} />: <Tab toggle={toggle} tabs={tabs} />
        }
      <TabContent className="p-4" activeTab={activeTab}>
      <TabPane tabId="1" eventkey="MoreDetails">
                <RequestPurchase
  orderDetails={orderDetails}
          />
          
          </TabPane>
          </TabContent>
          </ComponentCard>
    </>
  );
};

export default RequestForQuoteEdit;

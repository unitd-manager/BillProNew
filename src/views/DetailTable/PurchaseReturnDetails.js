// import React, { useState, useEffect } from 'react';
// import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
// import { ToastContainer } from 'react-toastify';
// import { useNavigate, useParams } from 'react-router-dom';
// import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
// import ComponentCard from '../../components/ComponentCard';
// import api from '../../constants/api';
// import message from '../../components/Message';
// import creationdatetime from '../../constants/creationdatetime';

// const PurchaseReturnDetails = () => {
//   const [invoice, setInvoice] = useState();
//   const [returnInvoiceId, setReturnInvoiceId] = useState(null);
//   const [insertReturn, setInsertReturn] = useState();
//   const { id } = useParams();
//   const navigate = useNavigate();

//   //Api call for getting company dropdown
//   const getQuote = () => {
//     api.get('/purchasereturn/getPurchaseInvoice').then((res) => {
//       setInvoice(res.data.data);
//     });
//   };
//   const handleInputs = (e) => {
//     setInsertReturn({ ...insertReturn, [e.target.name]: e.target.value });
//     setReturnInvoiceId(e.target.value)
//   };


//   //console.log(tenderDetails);
//  const insertOrder = () => {
//   if (returnInvoiceId !== '' && returnInvoiceId !==null && returnInvoiceId) {
//     insertReturn.creation_date = creationdatetime;
//     api
//       .post('/purchasereturn/insertPurchaseReturn', insertReturn)
//       .then((res) => {
//         const insertedDataId = res.data.data.insertId;
//         if(res.status === 401){
//           message('No invoice items to return.', 'success');
//         }
//         message('Request inserted successfully.', 'success');
//         setTimeout(() => {
//           navigate(`/PurchaseReturnEdit/${insertedDataId}/${returnInvoiceId}`);
//         }, 300);      })
//       .catch((err) => {
//         console.log('err',err)
//         message(err.msg, 'error');
//       });
//   } else {
//     message('Please fill all required fields', 'warning');
//   }
// };

//   useEffect(() => {
//     getQuote();
    
//   }, [id]);

//   return (
//     <div>
//       <BreadCrumbs />
//       <Row>
//         <ToastContainer></ToastContainer>
//         <Col md="6" xs="12">
//           <ComponentCard title="New Enquiry">
//             <Form>
//               <FormGroup>
              
//               </FormGroup>
//               <FormGroup>
//                 <Row>
//                   <Col md="9">
//                     <Label>
//                 Purchase Invoices<span className="required"> *</span>{' '}
//                     </Label>
//                     <Input
//                       type="select"
//                       name="purchase_invoice_id"
//                       value={insertReturn && insertReturn.purchase_invoice_id}
//                       onChange={handleInputs}
//                     >
//                       <option>Please Select</option>
//                       {invoice &&
//                         invoice.map((ele) => {
//                           return (
//                             <option key={ele.purchase_invoice_id} value={ele.purchase_invoice_id}>
//                               {ele.purchase_invoice_code}
//                             </option>
//                           );
//                         })}
//                     </Input>
//                   </Col>
                 
//                 </Row>
               
//               </FormGroup>
            
//                   <Row>
//                 <div className="pt-3 mt-3 d-flex align-items-center gap-2">
//                   <Button
//                     type="button"
//                     color="primary"
//                     className="btn mr-2 shadow-none"
//                     onClick={() => {
//                       insertOrder();
//                     }}
//                   >
//                     Save & Continue
//                   </Button>
//                   <Button
//                     className="shadow-none"
//                     color="dark"
//                     onClick={() => {
//                       if (
//                         window.confirm(
//                           'Are you sure you want to cancel  \n  \n You will lose any changes made',
//                         )
//                       ) {
//                         navigate(-1);
//                       }
//                     }}
//                   >
//                     Cancel
//                   </Button>
//                 </div>
//               </Row>
//             </Form>
//           </ComponentCard>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default PurchaseReturnDetails;
import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

const PurchaseReturnDetails = () => {
  const [supplier, setSupplier] = useState([]);
  const [orders, setOrders] = useState([]);
  const [purchaseForms, setPurchaseForms] = useState({
    supplier_id: '',
    company_name: '',
    order_id: '',
  });
  const { loggedInuser } = useContext(AppContext);
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };

  const selectedLanguage = getSelectedLanguageFromLocalStorage();
  const [arabic, setArabic] = useState([]);

  const arb = selectedLanguage === 'Arabic';

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

  const { id } = useParams();
  const navigate = useNavigate();

  const getSupplierName = () => {
    api
      .get('/purchasereturn/getSupplier')
      .then((res) => {
        setSupplier(res.data.data);
      })
      .catch(() => {});
  };

  const getOrdersBySupplierId = (supplierId) => {
    api
      .post(`/purchasereturn/getOrdersBySupplierId`, {supplier_id : supplierId})
      .then((res) => {
        setOrders(res.data.data);
      })
      .catch(() => {});
  };

  const handleInputs = (e) => {
    const { name, value } = e.target;
    if (name === 'supplier_id') {
      getOrdersBySupplierId(value);
    }
    setPurchaseForms({ ...purchaseForms, [name]: value });
  };

  const insertPurchaseReturn = (code) => {
    purchaseForms.purchase_return_date = moment();
    purchaseForms.purchase_return_code = code;
   
    if (purchaseForms.supplier_id !== '' && purchaseForms.purchase_order_id !== '') {
      purchaseForms.created_by = loggedInuser.first_name;
      purchaseForms.creation_date = creationdatetime;
      api
        .post('/purchasereturn/insertPurchaseReturn', purchaseForms)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          const PurchaseOrderId = purchaseForms.purchase_order_id;
          message('Purchase Order inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/PurchaseReturnEdit/${insertedDataId}/${PurchaseOrderId}?tab=1`);
          }, 500);
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields.', 'warning');
    }
  };

  const generateCode = () => {
    api
      .post('/commonApi/getCodeValue', { type: 'PurchaseReturn' })
      .then((res) => {
        insertPurchaseReturn(res.data.data);
      })
      .catch(() => {
        insertPurchaseReturn('');
      });
  };

  useEffect(() => {
    getSupplierName();
    getArabicValue();
  }, [id]);

  return (
    <div>
      <BreadCrumbs />
        <ToastContainer></ToastContainer>
        <Row>
        <Col md="6">
          <ComponentCard title="Key Details">
            <Form>
              <FormGroup>
                <Row>
                <Col md="12">
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdPurchaseOrder.Supplier Name')?.[genLabel]}
                  </Label> <span className='required'>*</span>
                  <Input
                    type="select"
                    name="supplier_id"
                    onChange={(e) => {
                      handleInputs(e);
                    }}
                  >
                    <option value="" selected>
                      Please Select
                    </option>
                    {supplier &&
                      supplier.map((ele) => {
                        return (
                          <option key={ele.supplier_id} value={ele.supplier_id}>
                            {arb ? ele.company_name_arb : ele.company_name}{' '}
                          </option>
                        );
                      })}
                  </Input>
                  </Col>
                </Row>
                <Row>
                <Col md="12">
                  <Label dir="rtl" style={{ textAlign: 'left' }}>
                    Po Code
                  </Label>  <span className="required">*</span>
                  <Input
                    type="select"
                    name="purchase_order_id"
                    onChange={(e) => {
                      handleInputs(e);
                    }}
                  >
                    <option value="" selected>
                      Please Select
                    </option>
                    {orders &&
                      orders.map((order) => {
                        return (
                          <option key={order.purchase_order_id} value={order.purchase_order_id}>
                            {order.po_code}
                          </option>
                        );
                      })}
                  </Input>
                  </Col>
                </Row>
                <FormGroup>
                  <Row>
                    <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                      <Button
                        color="primary"
                        type="button"
                        className="btn mr-2 shadow-none"
                        onClick={() => {
                          generateCode();
                        }}
                      >
                        Save & Continue
                      </Button>
                      <Button
                        onClick={() => {
                          navigate('/PurchaseReturn');
                        }}
                        type="button"
                        className="btn btn-dark shadow-none"
                      >
                        Go to List
                      </Button>
                    </div>
                  </Row>
                </FormGroup>
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
};
export default PurchaseReturnDetails;


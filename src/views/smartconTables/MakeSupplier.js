import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import {  useParams } from 'react-router-dom';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from 'reactstrap';
import moment from 'moment';
import { ToastContainer } from 'react-toastify';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import PurchaseorderSupplier from '../../components/SupplierModal/PurchaseorderSupplier';


//geting data from invoice
const MakeSupplier = () => {
  //State variable
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState();
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const [selectedReceiptId, setSelectedReceiptId] = useState(null);
  const [selectReceiptId, setSelectReceiptId] = useState(null);
  const [hasAmountToPay, setHasAmountToPay] = useState(false);
  //Navigation and Parameter Constants

 // const navigate = useNavigate();
  const [company, setCompany] = useState();
  const [supplierId, setSupplierId] = useState(null);
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
const selectedLanguage = getSelectedLanguageFromLocalStorage();

// Use the selected language value as needed
console.log('Selected language from localStorage:', selectedLanguage);

const arb =selectedLanguage === 'Arabic'

  // const eng =selectedLanguage === 'English'

  const [arabic, setArabic] = useState([]);

  const getArabicCompanyName = () => {
    api
    .get('/translation/getTranslationForMakeSupplier')
    .then((res) => {
      setArabic(res.data.data);
    })
    .catch(() => {
      // Handle error if needed
    });   
};

console.log('arabic',arabic)
useEffect(() => {
  getArabicCompanyName();
}, []);

let genLabel = '';

if (arb === true) {
  genLabel = 'arb_value';
} else {
  genLabel = 'value';
}
  //getting data from invoice table
  const getInvoice = () => {
    api
      .get('/supplier/getSupplierReceipts')
      .then((res) => {
        setInvoice(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  
  //Structure of Invoice list view
  const columns = [
    {
      name: '#',
      grow: 0,
      wrap: true,
      width: '4%',
    },

  
    {
      name: arabic.find(item => item.key_text === 'mdMakeSupplier.ReceiptCode')?.[genLabel],
      selector: 'supplier_receipt_code',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdMakeSupplier.ModeOfPayment')?.[genLabel],
      selector: 'mode_of_payment',
      sortable: true,
      grow: 0,
    },
    {
      name: arabic.find(item => item.key_text === 'mdMakeSupplier.Status')?.[genLabel],
      selector: 'receipt_status',
      sortable: true,
      grow: 2,
      wrap: true,
    },

    {
      name: arabic.find(item => item.key_text === 'mdMakeSupplier.Amount')?.[genLabel],
      selector: 'amount',
      sortable: true,
      width: 'auto',
      grow: 3,
    },

    {
      name: arabic.find(item => item.key_text === 'mdMakeSupplier.Date')?.[genLabel],
      selector: 'receipt_date',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    // {
    //   name: 'Print',
    //   sortable: true,
    //   width: 'auto',
    //   grow: 3,
    // },
  ];

  const handleBookingInputs = (e) => {
    const { name, value } = e.target;
    setBookingDetails({ ...bookingDetails, [name]: value });
    setSupplierId(value)
    // Fetch bookings for the selected company
   
  };


  //Api call for getting company dropdown
  const getCompany = () => {
    api
      .get('/supplier/getSupplier')
      .then((res) => {
        setCompany(res.data.data);
      })
      .catch(() => {
        message('Company not found', 'info');
      });
  };


  //Logic for adding Booking in db
 
  const insertReceipt = (code) =>{
    const insertedOrderId = bookingDetails.supplier_id;
      bookingDetails.supplier_receipt_code=code;
      bookingDetails.receipt_code=code;
      api
        .post('/supplier/insert-SupplierReceipt', bookingDetails)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          setSelectedReceiptId(insertedDataId); // Store the receiptId 
          setSelectReceiptId(insertedOrderId)
          message('Record inserted successfully.', 'success');
     
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    
  };
  const generateCode = () => {
    
    if(supplierId !=='' && supplierId && supplierId !==null ){
     
    api
      .post('/commonApi/getCodeValue', { type: 'supplier' })
      .then((res) => {
      setModalOpen(false); // Close the first modal
      setSecondModalOpen(true); // Open the second modal
      insertReceipt(res.data.data); 
   
      })
      .catch(() => {
        insertReceipt('');
       
      });
      
    }else{
      message('Please Select the supplier', 'error');
    }
  };
  
  const getMakePayment = () => {
    if (supplierId) {
      console.log('Fetching payment data for receipt ID:', supplierId); // Debug log
      api.post('/supplier/getMakePayment', { supplier_id: supplierId }).then((res) => {
        const datafromapi = res.data.data;
        let amountExists = false;

        datafromapi.forEach((element) => {
          element.remainingAmount = element.prev_inv_amount - element.prev_amount;
          console.log('Remaining amount for element:', element.remainingAmount); // Debug log
          if (element.remainingAmount > 0) {
            amountExists = true;
          }
        });

        console.log('Amount exists:', amountExists); // Debug log
        setHasAmountToPay(amountExists);
        if (!amountExists) {
          alert('There is No Purchase Ordered Items Available to Pay ');
        }
      }).catch((error) => {
        console.error('Error fetching payment data:', error); // Debug log for errors
      });
    } else {
      console.log('No receipt ID selected'); // Debug log
    }
  };
  // const handleSaveAndContinue = () => {
  //   if (hasAmountToPay) {
  //     generateCode(); // Call the function to generate the code and open the second modal
  //   } else {
  //     message.error('No amount to pay.'); // Show an error alert message
  //   }
  // };
  const handleSaveAndContinue = () => {
    console.log('Button clicked, hasAmountToPay:', hasAmountToPay); // Debug log
    if (hasAmountToPay) {
      generateCode(); // Call the function to generate the code and open the second modal
    } else {
      message.error('No amount to pay.'); // Show an error alert message
      console.log('No amount to pay, showing message.'); // Debug log
    }
  };

  useEffect(() => {
    getMakePayment();
  }, [supplierId]); // Ensure this useEffect runs when selectReceiptId changes

  useEffect(() => {
    getCompany();
    getInvoice();
    
  }, [id]);

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />
<ToastContainer></ToastContainer>
        <CommonTable
          loading={loading}
          title="Supplier Receipt List"
          module='MakeSupplierPayment'
          Button={
            // Open the modal on button click
            <Button color="primary" className="shadow-none mr-2" onClick={toggleModal}>
              Add New
            </Button>
          }
        >
          <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {invoice &&
              invoice.map((element, index) => {
                return (
                  <tr key={element.supplier_id}>
                    <td>{index + 1}</td>

                    <td>{element.supplier_receipt_code}</td>
                    <td>{element.mode_of_payment}</td>
                    <td>{element.receipt_status}</td>
                    <td>{element.amount}</td>
                    <td>{element.date?moment(element.date).format('YYYY-MM-DD'):''}</td>                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
        <Modal isOpen={modalOpen} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>{arb?'إضافة إيصال جديد':'Add New Receipt'}</ModalHeader>
          <ModalBody>
            <Row>
              <Col md="12">
                <ComponentCard title="Receipt Details">
                  <Form>
                    <FormGroup>
                      <Row>
                        <Col md="10">
                          <Label>
                          {arabic.find((item) => item.key_text === 'mdMakeSupplier.PurchaseOrders')?.[genLabel]}
                          </Label>
                          <Input type="select" name="supplier_id" onChange={handleBookingInputs}>
                            <option>Select Supplier</option>
                            {company &&
                              company.map((e) => {
                                return (
                                  <option key={e.supplier_id} value={e.supplier_id}>
                                    {e.company_name}
                                  </option>
                                );
                              })}
                          </Input>
                        </Col>
                        <br />
                       
                      </Row>
                    </FormGroup>
                    <FormGroup>
                      <Row>
                        <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                          {/* <Button
                            color="primary"
                            onClick={() => {
                              generateCode();
                             
                            }}
                            type="button"
                            className="btn mr-2 shadow-none"
                          >
                            {arb?'حفظ ومتابعة':'Save & Continue'}
                          </Button> */}
                          <Button
      color="primary"
      onClick={handleSaveAndContinue}
      type="button"
      className="btn mr-2 shadow-none"
      disabled={!hasAmountToPay} // Disable the button if no amount to pay
    >
      {arb ? 'حفظ ومتابعة' : 'Save & Continue'}
    </Button>
                          <Button
                            onClick={() => {
                              //navigate(-1);
                              toggleModal()
                            }}
                            type="button"
                            className="btn btn-dark shadow-none"
                          >
                            
                            {arb?'اذهب إلى القائمة':'Go to List'}
                          </Button>
                        </div>
                      </Row>
                    </FormGroup>
                  </Form>
                </ComponentCard>
              </Col>
            </Row>
          </ModalBody>
        </Modal>

        <Modal isOpen={secondModalOpen} toggle={() => setSecondModalOpen(!secondModalOpen)}>
          <ModalHeader toggle={() => setSecondModalOpen(!secondModalOpen)}>
            MakeSupplierPayment
          </ModalHeader>
          <ModalBody>
       <PurchaseorderSupplier 
       receiptId={selectedReceiptId}
       orderId={ selectReceiptId}
       arb={arb}
              arabic={arabic}
       ></PurchaseorderSupplier>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
};
export default MakeSupplier;

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
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import ReceiptCreate from '../../components/DebitNote/ReceiptCreate';


// import PdfCreateListReceipt from '../../components/PDF/PdfCreateListReciept';
//geting data from invoice
const InvoiceData = () => {
  //State variable
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState();
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const [selectedReceiptId, setSelectedReceiptId] = useState(null);
  const [selectReceiptId, setSelectReceiptId] = useState(null);
  //Navigation and Parameter Constants

 // const navigate = useNavigate();
  const [invoiveId, setInvoiceId] = useState();
  const [order, setOrder] = useState();
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  //getting data from invoice table
  const getInvoice = () => {
    api
      .get('/debitnote/getReceipts')
      .then((res) => {
        setInvoice(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
  const selectedLanguage = getSelectedLanguageFromLocalStorage();

  const [arabic, setArabic] = useState([]);


  const arb =selectedLanguage === 'Arabic'

  //const eng =selectedLanguage === 'English'
  

  const getArabicCompanyName = () => {
      api
      .get('/debitnote/getTranslationForDebitNote')
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

  //Structure of Invoice list view
  const columns = [
    {
      name: '#',
      grow: 0,
      wrap: true,
      width: '4%',
    },

    {
      name: arabic.find((item) => item.key_text === 'mdDebitNote.Order No')?.[genLabel],
      selector: 'order_code',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: arabic.find((item) => item.key_text === 'mdDebitNote.Code')?.[genLabel],
      selector: 'debit_note_code',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: arabic.find((item) => item.key_text === 'mdDebitNote.Mode of Payment')?.[genLabel],
      selector: 'mode_of_payment',
      sortable: true,
      grow: 0,
    },
    {
      name: arabic.find((item) => item.key_text === 'mdDebitNote.Status')?.[genLabel],
      selector: 'debit_note_status',
      sortable: true,
      grow: 2,
      wrap: true,
    },

    {
      name: arabic.find((item) => item.key_text === 'mdDebitNote.Amount')?.[genLabel],
      selector: 'amount',
      sortable: true,
      width: 'auto',
      grow: 3,
    },

    {
      name: arabic.find((item) => item.key_text === 'mdDebitNote.Date')?.[genLabel],
      selector: 'debit_note_date',
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

    // Fetch bookings for the selected company
   
  };

  const [selectedInvoiceId, setSelectedInvoiceId] = useState('');



  const getCompany = () => {
    api
      .get('/creditnote/getInvoice')
      .then((res) => {
        setInvoiceId(res.data.data);
        const invoiceData = res.data.data;
        const firstInvoiceId = invoiceData[0]?.invoice_id || ''; // Check if data exists before accessing
        setSelectedInvoiceId(firstInvoiceId); // Set selectedInvoiceId to first invoice_id
        if (firstInvoiceId !== '') {
          api
            .post('/creditnote/getOrderCreditDebitNote', { invoice_id: firstInvoiceId })
            .then((res1) => {
              setOrder(res1.data.data);
            })
            .catch(() => {
              // Handle error if needed
            });
        }
      })
      .catch(() => {
        message('Company not found', 'info');
      });
  };

  useEffect(() => {
    if (selectedInvoiceId !== '') {
      api
        .post('/creditnote/getOrderCreditDebitNote', { invoice_id: selectedInvoiceId })
        .then((res1) => {
          setOrder(res1.data.data);
        })
        .catch(() => {
          // Handle error if needed
        });
    }
  }, [selectedInvoiceId]);
  //Logic for adding Booking in db

  const insertReceipt = (code) =>{
    const insertedOrderId = bookingDetails.order_id;
    if (bookingDetails.company_id !== '' && bookingDetails.debit_note_id !== '') {

      bookingDetails.debit_note_code=code;
      api
        .post('/debitnote/insertdebitnote', bookingDetails)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          setSelectedReceiptId(insertedDataId); // Store the receiptId 
          setSelectReceiptId(insertedOrderId)
          message('Debit note inserted successfully.', 'success');
     
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };
  const generateCode = () => {
    api
      .post('/debitnote/getCodeValue', { type: 'debitNote' })
      .then((res) => {
      setModalOpen(false); // Close the first modal
      setSecondModalOpen(true); // Open the second modal
      insertReceipt(res.data.data); 
   
      })
      .catch(() => {
        insertReceipt('');
       
      });
    // setModalOpen(false); // Close the first modal
    //    setSecondModalOpen(true); // Open the second modal
    // insertReceipt('');
       
  };
  useEffect(() => {
    getCompany();
    getInvoice();
    getArabicCompanyName();
  }, [id]);



  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />

        <CommonTable
          loading={loading}
          title= {arb ?'قائمة مذكرة الخصم':'Debit Note List'}
          module='DebitNote'
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
                  <tr key={element.invoice_id}>
                    <td>{index + 1}</td>

                    <td>{arb?element.order_code_arb:element.order_code}</td>
                    <td>{arb?element.debit_note_code_arb:element.debit_note_code}</td>
                    <td>{arb?element.mode_of_payment_arb:element.mode_of_payment}</td>
                    <td>{arb?element.debit_note_status_arb:element.debit_note_status}</td>
                    <td>{arb?element.amount_arb:element.amount}</td>
                    <td>{element.debit_note_date?moment(element.debit_note_date).format('DD-MM-YYYY'):''}</td>
                    {/* <td>  
                      <PdfCreateListReceipt receiptId={element.receipt_id} invoice={invoice} />
 </td> */}
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
        <Modal isOpen={modalOpen} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>{arb ?'إضافة إيصال جديد':'Add New Receipt'}</ModalHeader>
          <ModalBody>
            <Row>
              <Col md="12">
                <ComponentCard title={arb ?'تفاصيل الاستلام':'Receipt Details'}>
                  <Form>
                    <FormGroup>
                      <Row>
                      <Col md="10">
                      <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdDebitNote.Invoice')?.[genLabel]}</Label>
                          <Input type="select" name="order_id"  onChange={(e) => {
                              setSelectedInvoiceId(e.target.value);
                            }}>
                            <option>{arb ?'حدد الفاتورة':'Select Invoice'}</option>
                            {invoiveId &&
                              invoiveId.map((e) => {
                                return (
                                  <option key={e.invoice_id} value={e.invoice_id}>
                                    {arb?e.invoice_code_arb:e.invoice_code}
                                  </option>
                                );
                              })}
                          </Input>
                        </Col>
                        <Col md="10">
                        <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdDebitNote.Orders')?.[genLabel]}</Label>
                          <Input type="select" name="order_id" onChange={handleBookingInputs}>
                            <option>{arb ?'اختر طلبا':'Select Order'}</option>
                            {order &&
                              order.map((e) => {
                                return (
                                  <option key={e.order_id} value={e.order_id}>
                                    {e.order_code}
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
                          <Button
                            color="primary"
                            onClick={() => {
                              generateCode();
                             
                            }}
                            type="button"
                            className="btn mr-2 shadow-none"
                          >
                            Save & Continue
                          </Button>
                          <Button
                            onClick={() => {
                              window.location.reload();

                            }}
                            type="button"
                            className="btn btn-dark shadow-none"
                          >
                            Go to List
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

        <Modal isOpen={secondModalOpen}>
          <ModalHeader>
          {arb ?'إنشاء إيصال':'Create receipt'}
          </ModalHeader>
          <ModalBody>
       <ReceiptCreate 
       receiptId={selectedReceiptId}
       orderId={ selectReceiptId}
       ></ReceiptCreate>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
};
export default InvoiceData;

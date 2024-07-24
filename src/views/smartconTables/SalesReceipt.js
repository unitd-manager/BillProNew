import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import { useNavigate, useParams } from 'react-router-dom';
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
import SalesReceiptCreate from '../../components/BookingTable/SalesReceiptCreate';
import PdfCreateListReceipt from '../../components/PDF/PdfCreateListReciept';

//geting data from invoice
const InvoiceData = () => {
  //State variable
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectOrderId, setSelectOrderId] = useState(null);
  const [secondModalOpen, setSecondModalOpen] = useState(false);
//   const [selectedReceiptId, setSelectedReceiptId] = useState(null);
//   const [selectReceiptId, setSelectReceiptId] = useState(null);
  //Navigation and Parameter Constants
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  

  const navigate = useNavigate();
  const [company, setCompany] = useState();
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  const selectedLanguage = getSelectedLanguageFromLocalStorage();

  //getting data from invoice table
  const getInvoice = () => {
    api
      .get('/invoice/getReceipts')
      .then((res) => {
        setInvoice(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const [arabic, setArabic] = useState([]);


  const arb =selectedLanguage === 'Arabic'

  // const eng =selectedLanguage === 'English'
   

  const getArabicCompanyName = () => {
      api
      .get('/invoice/getTranslationforTradingSalesReceipt')
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
      name: arabic.find(item => item.key_text === 'mdTradingSalesReceipt.Order No')?.[genLabel],
      selector: 'order_code',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdTradingSalesReceipt.Receipt Code')?.[genLabel],
      selector: 'receipt_code',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdTradingSalesReceipt.Mode of Payment')?.[genLabel],
      selector: 'mode_of_payment',
      sortable: true,
      grow: 0,
    },
    {
      name: arabic.find(item => item.key_text === 'mdTradingSalesReceipt.Status')?.[genLabel],
      selector: 'receipt_status',
      sortable: true,
      grow: 2,
      wrap: true,
    },

    {
      name: arabic.find(item => item.key_text === 'mdTradingSalesReceipt.Amount')?.[genLabel],
      selector: 'amount',
      sortable: true,
      width: 'auto',
      grow: 3,
    },

    {
      name: arabic.find(item => item.key_text === 'mdTradingSalesReceipt.Date')?.[genLabel],
      selector: 'receipt_date',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: arabic.find(item => item.key_text === 'mdTradingSalesReceipt.Print')?.[genLabel],
      sortable: true,
      width: 'auto',
      grow: 3,
    },
  ];

  const handleBookingInputs = (e) => {
    setSelectOrderId(e.target.value);
  };


  //Api call for getting company dropdown
  const getCompany = () => {
    api
      .get('/finance/getOrders')
      .then((res) => {
        setCompany(res.data.data);
      })
      .catch(() => {
        message('Company not found', 'info');
      });
  };


  //Logic for adding Booking in db

  
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
          title= {arb?'قائمة الاستلام': 'Receipt List'}
          module='Sales Receipt'
          Button={
            // Open the modal on button click
            <Button color="primary" className="shadow-none mr-2" onClick={toggleModal}>
              {arb ?'اضف جديد':'Add New'}
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
                  <tr key={element.receipt_id}>
                    <td>{index + 1}</td>

                    <td>{element.order_code}</td>
                    <td>{element.receipt_code}</td>
                    <td>{element.mode_of_payment}</td>
                    <td>{arb && element.receipt_status_arb ? element.receipt_status_arb : element.receipt_status}</td>
                    <td>{element.amount}</td>
                    <td>{moment(element.receipt_date).format('DD-MM-YYYY')}</td>
                    <td>  
                      <PdfCreateListReceipt receiptId={element.receipt_id} invoice={invoice} />
 </td>
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
        <Modal isOpen={modalOpen} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>{arb ?'إضافة إيصال جديد':'Add New Receipt'} </ModalHeader>
          <ModalBody>
            <Row>
              <Col md="12">
                <ComponentCard title= {arb ?'تفاصيل الاستلام':'Receipt Details'}>
                  <Form>
                    <FormGroup>
                      <Row>
                        <Col md="10">
                          <Label>{arb ?'طلبات':'Orders'}</Label>
                          <Input 
                          type="select" 
                          name="order_id" 
                          onChange={handleBookingInputs} 
                          value={selectOrderId}>
                            <option>Select Customer</option>
                            {company &&
                              company.map((e) => {
                                return (
                                  <option key={e.order_id} value={e.order_id}>
                                    {' '}
                                   {arb?e.order_code_arb:e.order_code}{' '}
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
                              setSecondModalOpen(true);
                             
                            }}
                            type="button"
                            className="btn mr-2 shadow-none"
                          >
                          {arb?'حفظ ومتابعة': 'Save & Continue'}
                          </Button>
                          <Button
                            onClick={() => {
                              navigate(-1);
                            }}
                            type="button"
                            className="btn btn-dark shadow-none"
                          >
                      {arb?'اذهب إلى القائمة': 'Go to List'}
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
          {arb?'إنشاء إيصال': 'Create receipt'}
          </ModalHeader>
          <ModalBody>
       <SalesReceiptCreate 
       orderId={ selectOrderId}
       ></SalesReceiptCreate>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
};
export default InvoiceData;

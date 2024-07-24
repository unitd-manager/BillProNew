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
import ReceiptCreate from '../../components/BookingTable/ReceiptCreate';


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

  const navigate = useNavigate();
  const [company, setCompany] = useState();
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

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

  //Structure of Invoice list view
  const columns = [
    {
      name: '#',
      grow: 0,
      wrap: true,
      width: '4%',
    },

    {
      name: 'Order No',
      selector: 'order_code',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Receipt Code',
      selector: 'receipt_code',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Mode of Payment',
      selector: 'mode_of_payment',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Status',
      selector: 'receipt_status',
      sortable: true,
      grow: 2,
      wrap: true,
    },

    {
      name: 'Amount',
      selector: 'amount',
      sortable: true,
      width: 'auto',
      grow: 3,
    },

    {
      name: 'Date',
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

    // Fetch bookings for the selected company
   
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

  const insertReceipt = (code) =>{
    const insertedOrderId = bookingDetails.order_id;
    if (bookingDetails.company_id !== '' && bookingDetails.booking_id !== '') {

      bookingDetails.receipt_code=code;
      api
        .post('/finance/insertreceipt', bookingDetails)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          setSelectedReceiptId(insertedDataId); // Store the receiptId 
          setSelectReceiptId(insertedOrderId)
          message('Booking inserted successfully.', 'success');
     
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
      .post('/commonApi/getCodeValue', { type: 'receipt' })
      .then((res) => {
      setModalOpen(false); // Close the first modal
      setSecondModalOpen(true); // Open the second modal
      insertReceipt(res.data.data); 
   
      })
      .catch(() => {
        insertReceipt('');
       
      });
  };
  useEffect(() => {
    getCompany();
    getInvoice();
  }, [id]);



  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />

        <CommonTable
          loading={loading}
          title="Receipt List"
          module='Sales Receipt'
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

                    <td>{element.order_code}</td>
                    <td>{element.receipt_code}</td>
                    <td>{element.mode_of_payment}</td>
                    <td>{element.receipt_status}</td>
                    <td>{element.amount}</td>
                    <td>{moment(element.receipt_date).format('DD-MM-YYYY')}</td>
                    {/* <td>  
                      <PdfCreateListReceipt receiptId={element.receipt_id} invoice={invoice} />
 </td> */}
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
        <Modal isOpen={modalOpen} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Add New Receipt</ModalHeader>
          <ModalBody>
            <Row>
              <Col md="12">
                <ComponentCard title="Receipt Details">
                  <Form>
                    <FormGroup>
                      <Row>
                        <Col md="10">
                          <Label>Orders</Label>
                          <Input type="select" name="order_id" onChange={handleBookingInputs}>
                            <option>Select Customer</option>
                            {company &&
                              company.map((e) => {
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
                              navigate(-1);
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

        <Modal isOpen={secondModalOpen} toggle={() => setSecondModalOpen(!secondModalOpen)}>
          <ModalHeader toggle={() => setSecondModalOpen(!secondModalOpen)}>
            Create receipt
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

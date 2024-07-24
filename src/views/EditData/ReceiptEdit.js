import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom'; // Changed: useNavigate to useHistory
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import { ToastContainer } from 'react-toastify';
import { Button, Col, Row } from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import message from '../../components/Message';
import api from '../../constants/api';
import ComponentCard from '../../components/ComponentCard';
import InvoiceItem from '../../components/BookingTable/InvoiceItem';
import ItemTable from '../../components/BookingTable/ItemTable';
//import InvoiceButton from '../../components/BookingTable/InvoiceButton';
import ReceiptDetailComp from '../../components/BookingTable/ReceiptDetailComp';
import InvoiceItemTable from '../../components/BookingTable/InvoiceItemTable';
import ApiButton from '../../components/ApiButton';

const ReceiptEdit = () => {
  const [bookingDetails, setBookingDetails] = useState({});
  const [company, setCompany] = useState([]);
  const [editInvoiceItemData, setEditInvoiceItemData] = useState(false);
  const [itemDetails, setItemDetails] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [editInvoiceModal, setEditInvoiceModal] = useState(false);
  const { id } = useParams();
  const navigate=useNavigate();
   const getCompany = () => {
    api
      .get('/booking/getCompanyName')
      .then((res) => {
        setCompany(res.data.data);
      })
      .catch(() => {
        message('Company not found', 'info');
      });
  };
  const backToList = () => {
    navigate('/Receipt');
  };
  const handleInputs = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
  };

  const editBookingById = () => {
    api
      .post('/invoice/getInvoiceById', { invoice_id: id })
      .then((res) => {
        setBookingDetails(res.data.data[0]);
      })
      .catch(() => {
        //message('Booking Data Not Found', 'info');
      });
  };
  const editItemById = () => {
    api
      .post('/invoice/getInvoiceByItemId', { invoice_id: id })
      .then((res) => {
        setItemDetails(res.data.data);
      })
      .catch(() => {
        //message('Booking Data Not Found', 'info');
      });
  };

 

  const editInvoiceData = () => {
    api
      .post('/invoice/editInvoice', bookingDetails)
      .then(() => {
        message('Record edited successfully', 'success');
        editBookingById();
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  useEffect(() => {
    editBookingById();
    editItemById();
    getCompany();
  }, [id]);

  return (
    <>
      <BreadCrumbs />
      <ToastContainer />
    {/* Button */}
      {/* <InvoiceButton
        editInvoiceData={editInvoiceData}
        id={id}
      ></InvoiceButton> */}
  <ApiButton
              editData={editInvoiceData}
              navigate={navigate}
              applyChanges={editInvoiceData}
              //deleteData={deleteBookingData}
              backToList={backToList}
              module="Receipt"
            ></ApiButton>
      {/*Main Details*/}
      <ComponentCard title="Receipt Details" creationModificationDate={bookingDetails}>
        <ReceiptDetailComp
          bookingDetails={bookingDetails}
          handleInputs={handleInputs}
          company={company}
        />
      </ComponentCard>
      <InvoiceItem
        editInvoiceItemData={editInvoiceItemData}
        setEditInvoiceItemData={setEditInvoiceItemData}
        invoiceInfo={id}
          // addLineItem={addLineItem}
          // AddNewLineItem={AddNewLineItem}
          // ClearValue={ClearValue}
        ></InvoiceItem>
          <InvoiceItemTable
        editModal={editModal}
        setEditModal={setEditModal}
        editInvoiceModal={editInvoiceModal}
      />
      <ComponentCard title="Invoice Items">
      <Col>
          <Button
            className="shadow-none"
            color="primary"
            onClick={() => {
              setEditInvoiceItemData(true);
            }}
          >
            Add
          </Button>
        </Col>
        <Row className="border-bottom mb-3">
         <ItemTable
        itemDetails={itemDetails}
        invoiceInfo={id}
        setEditModal={setEditModal}
        setEditInvoiceModal={setEditInvoiceModal}
       />
      </Row>
      </ComponentCard>
    </>
  );
};

export default ReceiptEdit;
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
import ProjectInvoiceItem from '../../components/BookingTable/ProjectInvoiceItem';
import ItemTable from '../../components/BookingTable/ItemTable';
//import InvoiceButton from '../../components/BookingTable/InvoiceButton';
import ReceiptDetailComp from '../../components/BookingTable/ReceiptDetailComp';
import ProjectInvoiceItemTable from '../../components/BookingTable/ProjectInvoiceItemTable';
import ApiButton from '../../components/ApiButton';

const ProjecReceiptEdit = () => {
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
    navigate('/ProjectSalesReceipt');
  };
  const handleInputs = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
  };

  const editBookingById = () => {
    api
      .post('/projectsalesinvoice/getInvoiceById', { project_invoice_id: id })
      .then((res) => {
        setBookingDetails(res.data.data[0]);
      })
      .catch(() => {
        //message('Booking Data Not Found', 'info');
      });
  };
  const editItemById = () => {
    api
      .post('/projectsalesinvoice/getInvoiceByItemId', { project_invoice_id: id })
      .then((res) => {
        setItemDetails(res.data.data);
      })
      .catch(() => {
        //message('Booking Data Not Found', 'info');
      });
  };

 

  const editInvoiceData = () => {
    api
      .post('/projectsalesinvoice/editInvoice', bookingDetails)
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
              module="Project Receipt"
            ></ApiButton>
      {/*Main Details*/}
      <ComponentCard title="Project Receipt Details" creationModificationDate={bookingDetails}>
        <ReceiptDetailComp
          bookingDetails={bookingDetails}
          handleInputs={handleInputs}
          company={company}
        />
      </ComponentCard>
      <ProjectInvoiceItem
        editInvoiceItemData={editInvoiceItemData}
        setEditInvoiceItemData={setEditInvoiceItemData}
        invoiceInfo={id}
          // addLineItem={addLineItem}
          // AddNewLineItem={AddNewLineItem}
          // ClearValue={ClearValue}
        ></ProjectInvoiceItem>
          <ProjectInvoiceItemTable
        editModal={editModal}
        setEditModal={setEditModal}
        editInvoiceModal={editInvoiceModal}
      />
      <ComponentCard title="Project Invoice Items">
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

export default ProjecReceiptEdit;
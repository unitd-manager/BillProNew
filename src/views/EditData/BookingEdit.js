import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import { ToastContainer } from 'react-toastify';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import message from '../../components/Message';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import BookingMoreDetails from '../../components/BookingTable/BookingMoreDetails';
//import BookingButton from '../../components/BookingTable/BookingButton';
import BookingDetailComp from '../../components/BookingTable/BookingDetailComp';
import ComponentCard from '../../components/ComponentCard';
import BookingEditCustomerModal from '../../components/BookingTable/BookingEditCustomerModal';
import ApiButton from '../../components/ApiButton';

const BookingEdit = () => {
  //state variables
  const [activeTab, setActiveTab] = useState('1');
  const [bookingDetails, setBookingDetails] = useState();
  const [employee, setEmployee] = useState();
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [servicelinkeddetails, setServiceLinkedDetails] = useState(null);
  const [editcustomermodal, setEditCustomerModal] = useState(false);  
  const [company, setCompany] = useState();

  // TOGGLE Tab
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  //  AttachmentModal UseState
  const [pictureData, setDataForPicture] = useState({
    modelType: '',
  });

  //Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();

  // Button Save Apply Back List
  //const applyChanges = () => {};
  const backToList = () => {
    navigate('/Booking');
  };


      

  //Api call for getting company dropdown
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

  //Api call for getting Employee dropdown
  const getEmployee = () => {
    api
      .get('/booking/getEmployeeName')
      .then((res) => {
        setEmployee(res.data.data);
      })
      .catch(() => {
        message('Employee not found', 'info');
      });
  };

  //setting data in bookingDetails
  const handleInputs = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
  };

  // For getting Booking data By Id
  const editBookingById = () => {
    api
      .post('/booking/getBookingById', { booking_id: id })
      .then((res) => {
        setBookingDetails(res.data.data[0]);
      })
      .catch(() => {
        message('Booking Data Not Found', 'info');
      });
  };

  //Logic for edit data in db
  const editBookingData = () => {
    if (bookingDetails.company_name !== '' && bookingDetails.booking_date !== '') {
      bookingDetails.modification_date = creationdatetime;
      api
        .post('/booking/edit-Booking', bookingDetails)
        .then(() => {
          message('Record editted successfully', 'success');
          editBookingById();
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };

  //delete data in db
  const deleteBookingData = () => {
    api
      .post('/booking/deleteBooking', { booking_id: id })
      .then(() => {
        message('Record deteled successfully', 'success');
      })
      .catch(() => {
        message('Unable to delete record.', 'error');
      });
  };

  const handleserviceInputs = (e) => {
    setServiceLinkedDetails({ ...servicelinkeddetails, [e.target.name]: e.target.value });
  };

  //get booking service data in db
  const getServiceLinked = () => {
    api
      .post('/booking/getTabServiceLinkById', { booking_service_id: id })
      .then((res) => {
        setServiceLinkedDetails(res.data.data[0]);
      })
      .catch(() => {
        message('service linked not found', 'info');
      });
  };

  // Attachment
  const dataForPicture = () => {
    setDataForPicture({
      modelType: 'picture',
    });
  };

  useEffect(() => {
    editBookingById();
    getCompany();
    getEmployee();
    getServiceLinked();
  }, [id]);

  return (
    <>
      <BreadCrumbs />
      <ToastContainer />

      {/* Button */}
      {/* <BookingButton
        editBookingData={editBookingData}
        navigate={navigate}
        applyChanges={applyChanges}
        deleteBookingData={deleteBookingData}
        backToList={backToList}
        id={id}
      ></BookingButton> */}
<ApiButton
              editData={editBookingData}
              navigate={navigate}
              applyChanges={editBookingData}
              deleteData={deleteBookingData}
              backToList={backToList}
              module="Booking"
            ></ApiButton>
      {/*Main Details*/}
      <ComponentCard title="Booking Details" creationModificationDate={bookingDetails}>
        <BookingDetailComp
          bookingDetails={bookingDetails}
          handleInputs={handleInputs}
          company={company}
          employee={employee}
          toggle={toggle}
          setEditCustomerModal={setEditCustomerModal}
        ></BookingDetailComp>
      </ComponentCard>

      <BookingEditCustomerModal
     editcustomermodal={editcustomermodal}
     setEditCustomerModal={setEditCustomerModal}
      ></BookingEditCustomerModal>

      <BookingMoreDetails
        servicelinkeddetails={servicelinkeddetails}
        activeTab={activeTab}
        toggle={toggle}
        handleserviceInputs={handleserviceInputs}
        dataForPicture={dataForPicture}
        pictureData={pictureData}
        attachmentModal={attachmentModal}
        id={id}
        setAttachmentModal={setAttachmentModal}
      ></BookingMoreDetails>


    </>
  );
};

export default BookingEdit;

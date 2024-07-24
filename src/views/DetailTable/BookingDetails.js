import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Button, Input } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import moment from 'moment';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import BookingModal from '../../components/BookingTable/BookingModal';
import api from '../../constants/api';
import message from '../../components/Message';
import creationdatetime from '../../constants/creationdatetime';

const BookingDetails = () => {
  //All state Variables
  const [modal, setModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState();

  //Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState();

  const toggle = () => {
    setModal(!modal);
  };

  //Logic for adding category in db
  const [companyInsertData, setCompanyInsertData] = useState({
    company_id: '',
    phone: '',
    website: '',
    address_flat: '',
    address_street: '',
    address_town: '',
    address_state: '',
    longitude: '',
    latitude: '',
  });

  //setting data in companyInsertData
  const handleInputs = (e) => {
    setCompanyInsertData({ ...companyInsertData, [e.target.name]: e.target.value });
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

  //Api for insertCompany
  const insertCompany = () => {
    if (companyInsertData.company_name !== '' && companyInsertData.address_flat !== '') {
      api
        .post('/company/insertCompany', companyInsertData)
        .then(() => {
          message('Company inserted successfully.', 'success');
          getCompany();
          toggle();
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };

  //setting data in companyInsertData
  const handleBookingInputs = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
  };

  //Logic for adding Booking in db
  const insertBooking = () => {
    if (bookingDetails.company_id !== '') {
      bookingDetails.booking_date = moment();
      bookingDetails.creation_date = creationdatetime;
      api
        .post('/booking/insertBooking', bookingDetails)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          message('Booking inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/BookingEdit/${insertedDataId}`);
          }, 300);
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };

  useEffect(() => {
    getCompany();
  }, [id]);

  return (
    <div>
      <BreadCrumbs />
      <ToastContainer></ToastContainer>
      <Row>
        <Col md="12">
          <ComponentCard title="Booking Details">
            <Form>
              <FormGroup>
                <Row>
                  <Col md="10">
                    <Label>CustomerName </Label>
                    <Input type="select" name="company_id" onChange={handleBookingInputs}>
                      <option>Select Customer</option>
                      {company &&
                        company.map((e) => {
                          return (
                            <option key={e.company_id} value={e.company_id}>
                              {e.company_name}
                            </option>
                          );
                        })}
                    </Input>
                  </Col>
                  <Col md="2" className="addNew">
                    <Label>Add New Customer</Label>
                    <Button color="primary" className="shadow-none" onClick={toggle.bind(null)}>
                      Add New
                    </Button>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button
                      color="primary"
                      onClick={() => {
                        insertBooking();
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

      <BookingModal
        toggle={toggle}
        handleInputs={handleInputs}
        insertCompany={insertCompany}
        modal={modal}
      ></BookingModal>
    </div>
  );
};
export default BookingDetails;

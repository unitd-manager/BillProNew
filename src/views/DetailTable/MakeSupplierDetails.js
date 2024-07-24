import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Button, Input } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';
// import creationdatetime from '../../constants/creationdatetime';

const MakeSupplierDetails = () => {

  const [bookingDetails, setBookingDetails] = useState();

  //Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState();
  // const [bookings, setBookings] = useState([]);


  const handleBookingDataInputs = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
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

}
  //Api for insertCompany



  //Logic for adding Booking in db
  const insertReceipt = (code) =>{ 
     
      bookingDetails.supplier_receipt_code=code;
      api
        .post('/supplier/insert-SupplierReceipt', bookingDetails)
        .then(() => {
         
          message('Booking inserted successfully.', 'success');
         
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    
  };
  const generateCode = () => {
    api
      .post('/commonApi/getCodeValue', { type: 'supplier' })
      .then((res) => {
        insertReceipt(res.data.data);
      })
      .catch(() => {
        insertReceipt('');
      });
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
          <ComponentCard title="Receipt Details">
            <Form>
              <FormGroup>
                <Row>
                <Col md="10">
            <Label>Orders</Label>
            <Input type="select" name="order_id" onChange={handleBookingDataInputs}>
              <option>Select Orders</option>
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

    </div>
  );
};
export default MakeSupplierDetails;

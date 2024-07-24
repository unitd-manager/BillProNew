import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import creationdatetime from '../../constants/creationdatetime';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import AppContext from '../../context/AppContext';
import message from '../../components/Message';

const GoodsReceiptDetails = () => {
  //All state variables
  const [changerequestdetails, setChangeRequestDetails] = useState({
    change_request_title: '',
  });

  //Navigation
  const navigate = useNavigate();

  //Change Request details
  const handleInputs = (e) => {
    setChangeRequestDetails({ ...changerequestdetails, [e.target.name]: e.target.value });
  };
  
  //Get Staff Details
   const { loggedInuser } = useContext(AppContext);

  //Inserting Change Request data
  const insertChangeRequest = () => {
    if (changerequestdetails.change_request_title !== '')
    {
    changerequestdetails.creation_date = creationdatetime;
    changerequestdetails.created_by= loggedInuser.first_name;
      api.post('/changerequest/insertChangeRequest', changerequestdetails)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          message('Change Request data inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/ChangeRequestEdit/${insertedDataId}`);
          }, 300);
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    }
    else {
      message('Please fill title of the change request', 'warning');
    }
};

useEffect(() => {
    
  }, []);


  return (
  <div>
    <BreadCrumbs />
        <ToastContainer />
            <Row>
                <Col md="6" xs="12">
                    {/* Key Details */}
                        <ComponentCard title="Key Details">
                            <Form>
                                <FormGroup>
                                    <Row>
                                        <Col md="12">
                                            <Label> {' '} Title <span className="required"> *</span>{' '}</Label>
                                                <Input
                                                    type="text"
                                                    onChange={handleInputs}
                                                    value={changerequestdetails && changerequestdetails.change_request_title}
                                                    name="change_request_title"
                                                />
                                        </Col>
                                    </Row>
                                </FormGroup>
                                    <FormGroup>
                                        <Row>
                                            <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                                                <Button color="primary"
                                                    onClick={() => {insertChangeRequest();}}
                                                    type="button"
                                                    className="btn mr-2 shadow-none"  >
                                                    Save & Continue   
                                                </Button>
                                                   <Button
                                                        onClick={() => { navigate('/ChangeRequest') }}
                                                        type="button"
                                                        className="btn btn-dark shadow-none" >
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

export default GoodsReceiptDetails;

import React, { useState, useEffect,useContext } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import message from '../../components/Message';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import AppContext from '../../context/AppContext';
import creationdatetime from '../../constants/creationdatetime';

const ClientDetails = () => {
  // Navigation and Parameter Constants
  const navigate = useNavigate();

  //  insertClient
  const [clientForms, setClientForms] = useState({
    company_name: '',
    company_name_arb: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
    //get staff details
    const { loggedInuser } = useContext(AppContext);

  //Client Functions/Methods
  const handleClientForms = (e) => {
    setClientForms({ ...clientForms, [e.target.name]: e.target.value });
  };

  // Client Insert
  const insertClient = () => {
    setFormSubmitted(true);
    if (clientForms.company_name.trim() !== '') {
      clientForms.creation_date = creationdatetime;
      clientForms.created_by = loggedInuser.first_name;
      api
        .post('/clients/insertCompany', clientForms)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          message('Client inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/ClientEdit/${insertedDataId}?tab=1`);
          }, 300);
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };

  useEffect(() => {}, []);

  return (
    <div>
      <BreadCrumbs />
      <ToastContainer></ToastContainer>
      <Row>
        <Col md="6" xs="12">
          <ComponentCard title="New Customer">
            <Form>
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>
                      Company Name <span className="required"> *</span>{' '}
                    </Label>
                    
                    <Input
                      type="text"
                      name="company_name"
                      onChange={handleClientForms}
                      className={`form-control ${
                        formSubmitted && clientForms.company_name.trim() === '' ? 'highlight' : ''
                      }`}
                      
                    ></Input>

                    {formSubmitted && clientForms.company_name.trim() === '' && (
                      <div className="error-message">Please Enter</div>
                    )}
                    
                  </Col>
                  {/* <Col md="12">
                    <Label>
                      Company Name Arabic <span className="required"> *</span>{' '}
                    </Label>
                    
                    <Input
                      type="text"
                      name="company_name_arb"
                      onChange={handleClientForms}
                      className={`form-control ${
                        formSubmitted && clientForms.company_name_arb.trim() === '' ? 'highlight' : ''
                      }`}
                      
                    ></Input>

                    {formSubmitted && clientForms.company_name_arb.trim() === '' && (
                      <div className="error-message">Please Enter</div>
                    )}
                    
                  </Col> */}
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button
                      color="primary"
                      onClick={() => {
                        insertClient();
                      }}
                      type="button"
                      className="btn mr-2 shadow-none"
                    >
                      Save & Continue
                    </Button>
                    <Button
                      onClick={() => {
                      if (
                        window.confirm(
                          'Are you sure you want to cancel  \n  \n You will lose any changes made',
                        )
                      ) {
                        navigate(-1);
                      }
                    }}
                      type="button"
                      className="btn btn-dark shadow-none"
                    >
                      Cancel
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

export default ClientDetails;

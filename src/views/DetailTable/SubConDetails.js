import React, { useState, useEffect, useContext} from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import creationdatetime from '../../constants/creationdatetime';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';
import AppContext from '../../context/AppContext';

const SubConDetails = () => {
  //All state variables
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [subConForms, setSubConForms] = useState({
    company_name: '',
  });
  //Navigation and parameters
  const navigate = useNavigate();
  const { loggedInuser } = useContext(AppContext);
  //subcon data in subconDetails
  const handleInputsSubConForms = (e) => {
    setSubConForms({ ...subConForms, [e.target.name]: e.target.value });
  };
  //Insert subcon
  const insertSubCon = () => {
    subConForms.creation_date = creationdatetime;
    subConForms.created_by = loggedInuser.first_name;
    if (subConForms.company_name !== '')
      api
        .post('/subcon/insertsub_con', subConForms)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          message('Subcon inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/SubConEdit/${insertedDataId}?tab=1`);
          }, 300);
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    else {
      setFormSubmitted(true);
      message('Please fill all required fields.', 'warning');
    }
  };

  useEffect(() => {}, []);
  return (
    <div>
      <BreadCrumbs />
      <ToastContainer />
      <Row>
        <Col md="6" xs="12">
          <ComponentCard title="SubCon Name">
            <Form>
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>
                      {' '}
                      Subcon Name <span className="required"> *</span>{' '}
                    </Label>
                    <Input type="text" name="company_name" 
                    onChange={handleInputsSubConForms}
                    className={`form-control ${formSubmitted && subConForms && (subConForms.company_name === undefined || subConForms.company_name.trim() === '')
                          ? 'highlight'
                          : ''
                        }`}
                    />
                    {formSubmitted && subConForms && (subConForms.company_name === undefined || subConForms.company_name.trim() === '') && (
                      <div className="error-message">Please Enter</div>
                    )}
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button
                      color="primary"
                      onClick={() => {
                        insertSubCon();
                      }}
                      type="button"
                      className="btn mr-2 shadow-none"
                    >
                      Save & Continue
                    </Button>
                    <Button
                      onClick={() => {
                        navigate('/Subcon');
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

export default SubConDetails;

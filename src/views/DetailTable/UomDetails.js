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

const UomDetails = () => {
  //all state variables
  const [uomForms, setUomForms] = useState({
    uom_name: '',
  });

  //navigation and params
  const navigate = useNavigate();

  //UoM Details
  const handleInputsUomForms = (e) => {
    setUomForms({ ...uomForms, [e.target.name]: e.target.value });
  };
   //get staff details
   const { loggedInuser } = useContext(AppContext);
  //inserting supplier data
  const insertUoM = () => {
    uomForms.creation_date = creationdatetime;
    uomForms.created_by= loggedInuser.first_name;
    if (uomForms.uom_name !== '')
      api.post('/uom/insert-UoM', uomForms)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          message('UoM inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/UomEdit/${insertedDataId}`);
          }, 300);
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    else {
      message('Please fill all required fields.', 'error');
    }
  };
  useEffect(() => {}, []);
  return (
    <div>
       <BreadCrumbs />
      <ToastContainer />
      <Row>
        <Col md="6" xs="12">
          {/* Key Details */}
          <ComponentCard title="UoM Name">
          <Form>
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>
                      {' '}
                      UoM Name <span className="required"> *</span>{' '}
                    </Label>
                    <Input type="text" name="uom_name" onChange={handleInputsUomForms} />
                    </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
          <div className="pt-3 mt-3 d-flex align-items-center gap-2">
            <Button color="primary"
              onClick={() => {
                insertUoM();
              }}
              type="button"
              className="btn mr-2 shadow-none"  >
              Save & Continue
            </Button>
            <Button
              onClick={() => {
                navigate('/UoM')
              }}
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

export default UomDetails;

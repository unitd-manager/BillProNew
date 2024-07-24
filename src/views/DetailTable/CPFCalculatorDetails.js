import React, { useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import message from '../../components/Message';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';

const CpfCalculatorDetails = () => {
  const navigate = useNavigate();

  //  insertClient
  const [cpfRecord, setCpfRecord] = useState({
    from_age: '',
    to_age:'',
    year:null
  });

  const currentDate = new Date();

  // Get the current year
  const currentYear = currentDate.getFullYear();
  
  //Client Functions/Methods
  const handleCpfForms = (e) => {
    setCpfRecord({ ...cpfRecord, [e.target.name]: e.target.value });
  };

  // Client Insert
  const insertCpfCalculator = () => {
    cpfRecord.year=currentYear;
      api
        .post('/cpfCalculator/insertCpfCalculator', cpfRecord)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          message('CpfCalculator Record inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/cpfCalculatorEdit/${insertedDataId}`);
          }, 300);
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    
  };

  return (
    <div>
      <BreadCrumbs />
      <ToastContainer></ToastContainer>
      <Row>
        <Col md="12">
          <ComponentCard title="Key Details">
            <Form>
              <FormGroup>
                <Row>
                
                <Col md="6">
                    <Label>
                      From age<span className="required"> *</span>
                    </Label>
                    <Input name="from_age"
                    value={cpfRecord && cpfRecord.from_age}
                    onChange={handleCpfForms}
                    type="text"/>

                  </Col>
                
                  <Col md="6">
                    <Label>
                      To age <span className="required"> *</span>
                    </Label>
                    <Input
                      name="to_age"
                      value={cpfRecord && cpfRecord.to_age}
                      onChange={handleCpfForms}
                      type="text"
                    />
                  </Col>

                
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button
                      color="primary"
                      onClick={() => {
                        insertCpfCalculator();
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

export default CpfCalculatorDetails;



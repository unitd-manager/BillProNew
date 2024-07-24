import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import message from '../../components/Message';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';

const ContentDetails = () => {
  // Navigation and Parameter Constants
  const navigate = useNavigate();

  //Const Variables
  const [expenseForms, setExpenseForms] = useState({
    title: '',
  });

  //All Functions/Methods
  const handleExpenseForms = (e) => {
    setExpenseForms({ ...expenseForms, [e.target.name]: e.target.value });
  };

  //  Api insertExpense
  const insertExpense = () => {
    if (expenseForms.title !== '') {
    expenseForms.creation_date = creationdatetime;
    api
      .post('/expensehead/insertExpGroup', expenseForms)
      .then((res) => {
        const insertedDataId = res.data.data.insertId;
        message('Expense inserted successfully.', 'success');
        setTimeout(() => {
          navigate(`/ExpenseHeadEdit/${insertedDataId}`);
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
      {/* Key details */}
      <Row>
        <Col md="6" xs="12">
          <ComponentCard title="Key Details">
            <Form>
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>Title</Label>

                    <Input
                      type="text"
                      name="title"
                      onChange={(e) => {
                        handleExpenseForms(e);
                      }}
                    ></Input>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                  <Button
                      color="primary"
                      onClick={() => {
                        insertExpense();
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

export default ContentDetails;

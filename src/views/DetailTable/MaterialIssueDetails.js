import React, { useState,useEffect, useContext } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import message from '../../components/Message';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

const MaterialIssueDetails = () => {
  //Navigation and Parameter Constants
  const navigate = useNavigate();
  const { loggedInuser } = useContext(AppContext);

  //Logic for adding Planning in db
  const [planningForms, setPlanningForms] = useState({
    material_issue_date: '',
    project_id:'',
    material_request_id:'',
  });
  const [project, setProject] = useState();
  const [material, setMaterial] = useState();


  const editJobById = () => {
    api
      .get('/labourrequest/getProjectTitle')
      .then((res) => {
        setProject(res.data.data);
      })
      .catch(() => {});
  };



  const editMaterialById = (id) => {
    api
      .post('/materialissue/getTaskByID', { project_id: id })
      .then((res) => {
        setMaterial(res.data.data);
      })
      .catch(() => {});
  };
  //setting data in PlanningForms
  const handlePlanningForms = (e) => {
    setPlanningForms({ ...planningForms, [e.target.name]: e.target.value });
  };

  //Api for insertPlanning
  const insertPlanning = () => {
    if (planningForms.material_issue_date !== '') {
      planningForms.creation_date = creationdatetime;
      planningForms.created_by = loggedInuser.first_name;
      api
        .post('/materialissue/insertMaterialIssue', planningForms)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          message('Request inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/MaterialIssueEdit/${insertedDataId}`);
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
    editJobById();
    editMaterialById();
  }, []);
  return (
    <div>
      <BreadCrumbs />
      <ToastContainer></ToastContainer>
      <Row>
        <Col md="6">
          <ComponentCard title="Key Details">
            <Form>
              <FormGroup>
              <Row>
                  <Label>Title <span style={{color:'red'}}>*</span> </Label>
                  <Input
                    type="select"
                    name="project_id"
                    onChange={(e) => {
                      editMaterialById(e.target.value);

                      handlePlanningForms(e);
                    }}
                  >
                    <option value="" selected>
                      Please Select
                    </option>
                    {project &&
                      project.map((ele) => {
                        return (
                            <option key={ele.project_id} value={ele.project_id}>
                              {ele.project_title}
                            </option>
                          
                        );
                      })}
                  </Input>
                </Row>
              </FormGroup>
              <FormGroup>
              <Row>
                  <Label>Code <span style={{color:'red'}}>*</span> </Label>
                  <Input
                    type="select"
                    name="material_request_id"
                    onChange={(e) => {
                      handlePlanningForms(e);
                    }}
                  >
                    <option value="" selected>
                      Please Select
                    </option>
                    {material &&
                      material.map((mat) => {
                        return (
                            <option key={mat.material_request_id} value={mat.material_request_id}>
                              {mat.material_request_code}
                            </option>
                          
                        );
                      })}
                  </Input>
                  
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>
                      Issue Date
                    </Label>
                    <Input
                      type="date"
                      name="material_issue_date"
                      onChange={handlePlanningForms}
                      value={planningForms && planningForms.material_issue_date}
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
                        insertPlanning();
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
export default MaterialIssueDetails;

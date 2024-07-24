import React, { useContext, useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

const ProjectTaskDetails = () => {
  const navigate = useNavigate();
  const { loggedInuser } = useContext(AppContext);
  const [projecttaskdetails, setProjectTaskDetails] = useState({
    project_job_id: '',
    task_title: '',
    project_id: '', // This will hold the project_id
  });
  const [joborder, setJobOrder] = useState([]);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    
    if (name === "project_job_id") {
      const selectedJobOrder = joborder.find(order => order.project_job_id === parseInt(value, 10));
      if (selectedJobOrder) {
        setProjectTaskDetails(prevDetails => ({
          ...prevDetails,
          project_job_id: value,
          project_id: selectedJobOrder.project_id
        }));
      }
    } else {
      setProjectTaskDetails(prevDetails => ({
        ...prevDetails,
        [name]: value
      }));
    }
  };
  const getJobOrderTitle = () => {
    api
      .get('/projecttask/getJobOrderTitle')
      .then((res) => {
        const jobOrderData = res.data.data;
        console.log('Job Orders:', jobOrderData); // Log joborder array
        setJobOrder(jobOrderData);
      })
      .catch(() => {
        message('Company not found', 'info');
      });
  };

  const insertPurchaseRequestData = () => {
    if (projecttaskdetails.task_title !== '' && projecttaskdetails.project_job_id !== '') {
      projecttaskdetails.creation_date = creationdatetime;
      projecttaskdetails.created_by = loggedInuser.first_name;

      // Inserting project_id from projecttaskdetails
      const requestData = {
        ...projecttaskdetails,
        project_id: projecttaskdetails.project_id, // Already set from getJobOrderTitle
      };

      api
        .post('/projecttask/insertProjectTask', requestData)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          message('PurchaseRequest inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/ProjectTaskEdit/${insertedDataId}`);
          }, 300);
        })
        .catch(() => {
          message('Unable to insert record.', 'error');
        });
    } else {
      message('Please fill all required fields.', 'warning');
    }
  };

  useEffect(() => {
    getJobOrderTitle();
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
                  <Col md="12">
                    <FormGroup>
                      <Label>
                        Job Order Title <span className="required"> *</span>
                      </Label>
                      <Input
  type="select"
  onChange={handleInputs}
  value={projecttaskdetails.project_job_id}
  name="project_job_id"
>
  <option value="">Please Select</option>
  {joborder.map((e) => (
    <option key={e.project_job_id} value={e.project_job_id}>
      {e.job_title}
    </option>
  ))}
</Input>
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <Label>
                      Task Title <span className="required"> *</span>{' '}
                    </Label>
                    <Input
                      type="text"
                      onChange={handleInputs}
                      value={projecttaskdetails.task_title}
                      name="task_title"
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button
                      className="shadow-none"
                      color="primary"
                      onClick={insertPurchaseRequestData}
                    >
                      Save & Continue
                    </Button>
                    <Button
                      onClick={() => {
                        navigate('/ProjectTask');
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

export default ProjectTaskDetails;

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

const ProjectDetails = () => {
  //all state variables
  const [projectdetails, setProjectDetails] = useState({
    contact_id: '',
    proposal_id: '',
  });
  const [proposalcode, setPoposalCode] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  //navigation and params
  const navigate = useNavigate();
  //supplierData in supplier details
  const handleInputs = (e) => {
    setProjectDetails({ ...projectdetails, [e.target.name]: e.target.value });
  };
  //get staff details
  const { loggedInuser } = useContext(AppContext);
  const insertEmployeesAndMaterials = (proposalId, projectId) => {
    api
      .post('/project/getProposalEmployee', { proposal_id: proposalId })
      .then((res2) => {
        const proposalEmployees = res2.data.data;
        console.log('Proposal Employees:', proposalEmployees);

        proposalEmployees.forEach((employee) => {
          employee.project_id = projectId;
          api
            .post('/project/insertProjectEmployee', employee)
            .then(() => {
              console.log('Inserted Project Employee:', employee);
            })
            .catch((error) => {
              console.error('Error inserting project employee:', error);
            });
        });
      })
      .catch((error) => {
        console.error('Error fetching proposal employees:', error);
      });

    api
      .post('/proposal/getMaterialLineItemsById', { proposal_id: proposalId })
      .then((res3) => {
        const proposalMaterial = res3.data.data;
        console.log('Proposal Materials:', proposalMaterial);

        proposalMaterial.forEach((material) => {
          material.project_id = projectId;
          api
            .post('/project/insertProjectMaterialItems', material)
            .then(() => {
              console.log('Inserted Project Material:', material);
            })
            .catch((error) => {
              console.error('Error inserting project material:', error);
            });
        });
      })
      .catch((error) => {
        console.error('Error fetching proposal materials:', error);
      });

    message('Project data inserted successfully.', 'success');
    setTimeout(() => {
      navigate(`/ProjectEdit/${projectId}/${proposalId}`);
    }, 300);
  };

  //inserting supplier data
  const insertProjectData = (ProjectCode) => {
    setFormSubmitted(true);
    if (projectdetails.proposal_id.trim() !== '') {
      api
        .post('/project/getProposalDataById', { proposal_code: projectdetails.proposal_id })
        .then((res1) => {
          const proposalData = res1.data.data;
          console.log('Proposal Data:', proposalData);
          
          // Set project details
          projectdetails.project_code = ProjectCode;
          projectdetails.creation_date = creationdatetime;
          projectdetails.created_by = loggedInuser.first_name;
          projectdetails.company_id = proposalData.company_id;
          projectdetails.proposal_id = proposalData.proposal_id;
          projectdetails.category = proposalData.category;
          projectdetails.contact_id = proposalData.contact_id;
          projectdetails.title = proposalData.title;
          projectdetails.description = proposalData.description;
          projectdetails.start_date = proposalData.start_date;
          projectdetails.estimated_finish_date = proposalData.estimated_finish_date;
          projectdetails.project_quote_id = proposalData.project_quote_id;

          // Insert project
          api
            .post('/project/insertProject', projectdetails)
            .then((res) => {
              const projectId = res.data.data.insertId;
              const proposalId = projectdetails.proposal_id;
              console.log('Inserted Project ID:', projectId);

              // Insert employees and materials
              insertEmployeesAndMaterials(proposalData.proposal_id, projectId, proposalId);
            })
            .catch((error) => {
              console.error('Error inserting project:', error);
              message('Unable to insert project record.', 'error');
            });
        })
        .catch((error) => {
          console.error('Error fetching proposal data:', error);
          message('Unable to fetch proposal data.', 'error');
        });
    } else {
      message('Please fill all required fields.', 'warning');
    }
  };

 
  const getProposalCode = () => {
    api
      .get('/project/getProposalCode')
      .then((res) => {
        setPoposalCode(res.data.data);
      })
      .catch(() => {
        message('Proposal Code not found', 'info');
      });
  };

  //  Auto generation code
  const generateCode = () => {
    api
      .post('/commonApi/getCodeValue', { type: 'project' })
      .then((res) => {
        const ProjectCode = res.data.data;
        insertProjectData(ProjectCode);
      })
      .catch(() => {
        insertProjectData('');
      });
  };

  useEffect(() => {
    getProposalCode();
  }, []);

  const inputClass = `form-control ${
    formSubmitted && (!projectdetails.proposal_id || projectdetails.proposal_id === 'Please Select') ? 'highlight' : ''
  }`;

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
                    <Label>
                      {' '}
                      Proposal Code <span className="required"> *</span>{' '}
                    </Label>
                    <Input
                      type="select"
                      onChange={handleInputs}
                      value={projectdetails && projectdetails.proposal_id}
                      name="proposal_id"
                      className={inputClass}
                    >
                      <option defaultValue="selected">Please Select</option>
                      {proposalcode &&
                        proposalcode.map((e) => {
                          return (
                            <option key={e.proposal_id} value={e.proposal_code}>
                              {e.proposal_code} - {e.company_name}
                            </option>
                          );
                        })}
                    </Input>
                    {formSubmitted && !projectdetails.proposal_id && (
                      <div className="error-message">Please Select the Proposal Code</div>
                    )}
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button
                      color="primary"
                      onClick={generateCode}
                      type="button"
                      className="btn mr-2 shadow-none"
                    >
                      Save & Continue
                    </Button>
                    <Button
                      onClick={() => {
                        navigate('/Project');
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

export default ProjectDetails;
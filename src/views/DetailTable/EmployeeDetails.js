import React, { useContext, useState } from 'react';
import { Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../constants/api';
import message from '../../components/Message';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

const EmployeeDetails = () => {
  //state variables
  // const [empcode, setEmpcode] = useState();
  const [employeeData, setEmployeeData] = useState({
    employee_name: '',
    citizen: '',
    nric_no: '',
    fin_no: '',
    work_permit: '',
    status: 'Current',
    emp_code: '',
    date_of_birth: moment(),
    date_of_expiry: moment(),
    fin_no_expiry_date: moment(),
    work_permit_expiry_date: moment(),
    year_of_completion1: moment(),
    year_of_completion2: moment(),
    year_of_completion3: moment(),
  });
  const [passtype, setPasstype] = useState('');
  //routing
  const navigate = useNavigate();

  const handleInputs = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };
  const handlePasstype = (e) => {
    setPasstype(e.target.value);
  };
  const { loggedInuser } = useContext(AppContext);


  //Insert Employee Data
  // Import necessary modules and components

  // ... Other code ...

  // Insert Employee Data
  const insertEmployee = (code) => {
    employeeData.emp_code = code;
    employeeData.date_of_birth = moment();
    employeeData.date_of_expiry = moment();
    employeeData.fin_no_expiry_date = moment();
    employeeData.work_permit_expiry_date = moment();
    employeeData.year_of_completion1 = moment();
    employeeData.year_of_completion2 = moment();
    employeeData.year_of_completion3 = moment();
    employeeData.creation_date = creationdatetime;
    employeeData.created_by= loggedInuser.first_name;
    api
      .post('/employeemodule/insertEmployee', employeeData)
      .then((res) => {
        const insertedDataId = res.data.data.insertId;
        message('Employee inserted successfully.', 'success');
        setTimeout(() => {
          navigate(`/EmployeeEdit/${insertedDataId}?tab=1`);
        }, 300);
      })
      .catch(() => {
        message('Unable to create employee.', 'error');
      });
  };
  const [isNricAlreadyInserted, setIsNricAlreadyInserted] = useState(false); //
  const generateCode = () => {
    if (
      employeeData.employee_name !== '' &&
      employeeData.status !== '' &&
      employeeData.passtype !== ''
    ) {
      // Check if the employeeData contains either NRIC, FIN, or both
      if (
        employeeData.nric_no !== '' ||
        employeeData.fin_no !== '' ||
        employeeData.work_permit !== ''
      ) {
        api
          .post('/employeemodule/getEmployeeById', {
            nric_no: employeeData.nric_no,
            employee_id:employeeData.employee_id
          })
          .then((response) => {
            if (response.data.error) {
              // Number already exists, show an alert message
              setIsNricAlreadyInserted(true); // Set the state to indicate that NRIC is already inserted
              message('NRIC is already inserted. Please provide a different number.', 'error');
            } else {
              // No duplicates found, proceed with inserting the employee
              setIsNricAlreadyInserted(false); // Reset the state

              api
                .post('/commonApi/getCodeValue', { type: 'employee' })
                .then((res) => {
                  insertEmployee(res.data.data);
                })
                .catch(() => {
                  insertEmployee('');
                });
            }
          })

          .catch(() => {
            message('Unable to check for duplicate numbers.', 'error');
          });
      } else {
        message('Please fill at least one required field (NRIC, FIN, or Work Permit).', 'error');
      }
    } else {
      message('Please fill all required fields.', 'error');
    }
  };
  // const insertEmployee = (code) => {
  //   // Check if the employee name already exists
  //   checkEmployeeNameExists()
  //     .then((res) => {
  //       if (res.data.data === 'exists') {
  //         // Display an alert message indicating that the name already exists
  //         message('Employee name already exists.', 'error');
  //       } else {
  //         // Proceed with the insertion
  //         employeeData.emp_code = code;
  //         employeeData.date_of_birth = moment();
  //         // ... (other code for insertion)
  //       }
  //     })
  //     .catch(() => {
  //       // Handle any errors that occur during the check
  //       message('Error checking employee name.', 'error');
  //     });
  // };

  return (
    <div>
      <ToastContainer></ToastContainer>
      <BreadCrumbs />
      <Row>
        <Col md="6">
          <ComponentCard title="Key Details">
            <FormGroup>
              <Row>
                <Col md="12">
                  <Label>
                    Full Name <span style={{ color: 'red' }}>*</span>
                  </Label>
                  <Input
                    name="employee_name"
                    value={employeeData && employeeData.employee_name}
                    onChange={handleInputs}
                    type="text"
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col md="12">
                  <Label>
                    Pass Type <span style={{ color: 'red' }}>*</span>
                  </Label>
                  <Input
                    name="citizen"
                    value={employeeData && employeeData.citizen}
                    onChange={(e) => {
                      handleInputs(e);
                      handlePasstype(e);
                    }}
                    type="select"
                  >
                    <option value="" selected="selected">
                      Please Select
                    </option>
                    <option value="Citizen">Citizen</option>
                    <option value="PR">PR</option>
                    <option value="EP">EP</option>
                    <option value="SP">SP</option>
                    <option value="WP">WP</option>
                    <option value="DP">DP</option>
                  </Input>
                </Col>
              </Row>
            </FormGroup>
            {(passtype === 'Citizen' || passtype === 'PR') && (
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>
                      NRIC No <span style={{ color: 'red' }}>*</span>
                    </Label>
                    <Input
                      name="nric_no"
                      value={employeeData && employeeData.nric_no}
                      onChange={handleInputs}
                      type="text"
                    />
                    {(isNricAlreadyInserted && (
                      <alert color="error">
                        NRIC is already inserted. Please provide a different number.
                      </alert>
                    )) ||
                      null}
                  </Col>
                </Row>
              </FormGroup>
            )}

            {(passtype === 'EP' || passtype === 'SP' || passtype === 'DP' || passtype === 'WP') && (
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>
                      Fin No <span style={{ color: 'red' }}>*</span>
                    </Label>
                    <Input
                      name="fin_no"
                      value={employeeData && employeeData.fin_no}
                      onChange={handleInputs}
                      type="text"
                    />
                  </Col>
                </Row>
              </FormGroup>
            )}

            {passtype === 'WP' && (
              <>
                <FormGroup>
                  <Row>
                    <Col md="12">
                      <Label>
                        Work Permit No<span style={{ color: 'red' }}>*</span>
                      </Label>
                      <Input
                        name="work_permit"
                        value={employeeData && employeeData.work_permit}
                        onChange={handleInputs}
                        type="text"
                      />
                    </Col>
                  </Row>
                </FormGroup>
              </>
            )}
            <FormGroup>
              <Row>
                <Col md="12">
                  <Label>
                    Status <span style={{ color: 'red' }}>*</span>
                  </Label>
                  <Input
                    name="status"
                    value={employeeData && employeeData.status}
                    onChange={handleInputs}
                    type="select"
                  >
                    <option selected="selected" value="Current">
                      Current
                    </option>
                    <option value="Archive">Archive</option>
                    <option value="Cancel">Cancel</option>
                  </Input>
                </Col>
              </Row>
              <Row>
                <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                  <Button
                    type="submit"
                    color="primary"
                    className="btn mr-2 shadow-none"
                    onClick={generateCode}
                  >
                    Save & Continue
                  </Button>
                  <Button
                    type="submit"
                    className="btn btn-dark shadow-none"
                    onClick={() => {
                      navigate('/Employee');
                    }}
                  >
                    Go to List
                  </Button>
                </div>
              </Row>
            </FormGroup>
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
};

export default EmployeeDetails;

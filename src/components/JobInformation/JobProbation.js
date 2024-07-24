import React from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
//import { useParams } from 'react-router-dom';
import moment from 'moment';
//import api from '../../constants/api';


export default function JobProbation({ handleInputsJobInformation, job, arb,arabic }) {
  JobProbation.propTypes = {
    handleInputsJobInformation: PropTypes.any,
    job: PropTypes.any,
    arb: PropTypes.any,
    arabic: PropTypes.any,

  };
  let genLabel = '';

if (arb === true) {
  genLabel = 'arb_value';
} else {
  genLabel = 'value';
}
  //const {id}=useParams();

//   const[position,setPosition]=useState();
//   //get receipt
//   const getPosition = () => {
//    api
//      .get('/jobinformation/getPosition')
//      .then((res) => {
//        setPosition(res.data.data);
//      })
//      .catch(() => {
       
//      });
//  };
//  useEffect(()=>{
//   getPosition();
//  });
 
  // Function to handle status change
  const handleStatusChange = (e) => {
    const selectedStatus = e.target.value;
    handleInputsJobInformation(e); // Update the status in the job object

    if (selectedStatus === 'archive') {
      // If the status is "archive," show an alert
      Swal.fire({
        title: 'Enter Termination Record',
        text: 'Please enter termination records before saving.',
        icon: 'info',
        confirmButtonText: 'OK',
      });
    }
  };
  return (
      <FormGroup>
        <Row>
          <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobInformation.Under Probation')?.[genLabel]}
              </Label>
              
              <br></br>
              <Label> Yes </Label>
              <Input
                name="probationary"
                value="1"
                type="radio"
                defaultChecked={job && job.probationary === 1 && true}
                onChange={handleInputsJobInformation}
              />
              &nbsp;
              &nbsp;
              <Label> No </Label>
              <Input
                name="probationary"
                value="0"
                type="radio"
                defaultChecked={job && job.probationary === 0 && true}
                onChange={handleInputsJobInformation}
              />
            </FormGroup>
          </Col>
          {job && job.probationary === '1' && (
            <Col md="4">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobInformation.Length of Probation')?.[genLabel]}
              </Label>
               
                <Input
                  type="text"
                  onChange={handleInputsJobInformation}
                  value={job && job.length_of_probation}
                  name="length_of_probation"
                />
              </FormGroup>
            </Col>
          )}
          {job && job.probationary === '1' && (
            <Col md="4">
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobInformation.Probation Start Date')?.[genLabel]}
              </Label>
             
              <Input
                type="date"
                onChange={handleInputsJobInformation}
                value={job && moment(job.probation_start_date).format('YYYY-MM-DD')}
                name="probation_start_date"
              />
            </Col>
          )}
          {job && job.probationary === '1' && (
            <Col md="4">
             
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobInformation.Probation End Date')?.[genLabel]}
              </Label>
              <Input
                type="date"
                onChange={handleInputsJobInformation}
                value={job && moment(job.probation_end_date).format('YYYY-MM-DD')}
                name="probation_end_date"
              />
            </Col>
          )}

          <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobInformation.Employment Type')?.[genLabel]}
              </Label>
              
              <Input
                type="select"
                value={job && job.emp_type}
                name="emp_type"
                onChange={handleInputsJobInformation}
              >
                <option defaultValue="selected">Please Select</option>
                <option value="full time">Full Time</option>
                <option value="part time">Part Time</option>
                <option value="contract">Contract</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobInformation.Designation')?.[genLabel]}
              </Label>
             
              <Input
                type="select"
                value={job && job.designation}
                name="designation"
                onChange={handleInputsJobInformation}
              >
                <option defaultValue="selected">Please Select</option>
                <option value="Accounts Executive">Accounts Executive</option>
                <option value="Finance Manager">Finance Manager </option>
                <option value="Director">Director </option>
                <option value="SCAFFOLDER">SCAFFOLDER </option>
                <option value="Driver">Driver </option>
                <option value="Manager">Manager </option>
                <option value="Admin Executive">Admin Executive </option>
                <option value="SUPERVISOR">SUPERVISOR </option>
                <option value=" PROJECT CO ORDINATOR"> PROJECT CO ORDINATOR </option>
                <option value="FORK LIFT OPERATOR">FORK LIFT OPERATOR </option>

              </Input>
            </FormGroup>
          </Col>
  
              {/* <Col md="3">
                <FormGroup>
                  <Label>Designation</Label>
                  <Input
                    type="select"
                    value={job && job.designation}
                    onChange={handleInputsJobInformation}
                    name="designation"
                  >
                    <option value="" selected="selected">
                      Please Select
                    </option>
                    {position &&
                      position.map((e) => {
                        return (
                          <option value={e.employee_id} key={e.position}>
                            {e.position}
                          </option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Col> */}
          <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobInformation.Department')?.[genLabel]}
              </Label>
             
              <Input
                type="select"
                value={job && job.department}
                name="department"
                onChange={handleInputsJobInformation}
              >
                <option defaultValue="selected">Please Select</option>
                <option value="civil">Civil</option>
                <option value="mehanic">Mehanic</option>
                <option value="engineer">Engineer</option>
              </Input>
            </FormGroup>
          </Col>

          <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}><span className="required"> *</span>{' '}
                {arabic.find((item) => item.key_text === 'mdJobInformation.Joined/Arrival Date ')?.[genLabel]} 
              </Label>
            
              <Input
                type="date"
                onChange={handleInputsJobInformation}
                value={job && moment(job.join_date).format('YYYY-MM-DD')}
                name="join_date"
              />
            </FormGroup>
          </Col>
          <Col md="4">
          <FormGroup>
          <Label dir="rtl" style={{ textAlign: 'right' }}>
          <span className="required"> *</span>{' '}
                {arabic.find((item) => item.key_text === 'mdJobInformation.Status')?.[genLabel]}
              </Label>
          
            <Input
              type="select"
              defaultValue={job && job.status}
              name="status"
              onChange={handleStatusChange}
            >
              <option>Please Select</option>
              <option value="current" selected={job && job.status === 'current'}>
                Current
              </option>
              <option value="archive" selected={job && job.status === 'archive'}>
                Archive
              </option>
              <option value="cancel" selected={job && job.status === 'cancel'}>
                Cancel
              </option>
            </Input>
           
          </FormGroup>
        </Col>
        </Row>
      </FormGroup>
  );
}

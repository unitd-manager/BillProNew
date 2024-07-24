import React from 'react';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import ComponentCard from '../ComponentCard';

function EmployeePart({ employeeDetails, handleInputChange, allCountries, companies,arb,arabic }) {
  EmployeePart.propTypes = {
    employeeDetails: PropTypes.object,
    handleInputChange: PropTypes.func,
    allCountries: PropTypes.array,
    companies: PropTypes.array,
    //team: PropTypes.array,
    arb: PropTypes.any,
    arabic: PropTypes.any,
  };

  // Use localStorage to get the initial value or set it to 0 by default
  const initialProjectManagerValue = localStorage.getItem('project_manager') || '0';
  const initialTeamLeaderValue = localStorage.getItem('team_leader') || '0';

  // Set the initial state based on localStorage
  const [projectManager, setProjectManager] = React.useState(initialProjectManagerValue);
  const [teamLeader, setTeamLeader] = React.useState(initialTeamLeaderValue);
  React.useEffect(() => {
    // Save the current value to localStorage whenever it changes
    localStorage.setItem('project_manager', projectManager);
    localStorage.setItem('team_leader', teamLeader);
  }, [projectManager, teamLeader]);

  const calculateTotalExperience = (dateJoined) => {
    if (!dateJoined) {
      return '';
    }

    const joinDateTime = new Date(dateJoined);

    const currentDate = new Date();

    const difference = currentDate - joinDateTime;

    const totalYears = difference / (1000 * 60 * 60 * 24 * 365.25);

    const totalMonths = totalYears * 12;

    const years = Math.floor(totalYears);
    const months = Math.floor(totalMonths % 12);

    let experienceString = '';
    if (years > 0) {
      experienceString += `${years} year${years > 1 ? 's' : ''}`;
    }
    if (months > 0) {
      if (experienceString) {
        experienceString += ' ';
      }
      experienceString += `${months} month${months > 1 ? 's' : ''}`;
    }
    return experienceString;
  };

  const totalExperience = calculateTotalExperience(employeeDetails.act_join_date);

  console.log('all countries', allCountries);

  
  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }

  

  return (
    <div>
      <ComponentCard title="Personal Information" creationModificationDate={employeeDetails}>
      <FormGroup>
          <Row>
            <Col md="3">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Code')?.[genLabel]}</Label>
                <Input
                  value={
                    arb
                      ? (
                        employeeDetails && employeeDetails.emp_code_arb ? employeeDetails.emp_code_arb :
                          (employeeDetails && employeeDetails.emp_code_arb !== null ? '' : employeeDetails && employeeDetails.emp_code)
                        )
                      : (employeeDetails && employeeDetails.emp_code)
                  }
                  name={arb ? 'emp_code_arb' : 'emp_code'}
                  onChange={handleInputChange}
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}><span style={{ color: 'red' }}>*</span> 
                {arabic.find((item) => item.key_text === 'mdEmployee.Full Name')?.[genLabel]}
                   
                </Label>
                <Input
                  value={
                    arb
                      ? (
                        employeeDetails && employeeDetails.employee_name_arb ? employeeDetails.employee_name_arb :
                          (employeeDetails && employeeDetails.employee_name_arb !== null ? '' : employeeDetails && employeeDetails.employee_name)
                        )
                      : (employeeDetails && employeeDetails.employee_name)
                  }
                  name={arb ? 'first_name_arb' : 'first_name'}
                  onChange={handleInputChange}
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Salutation')?.[genLabel]}</Label>
                <Input
                name={arb ? 'salutation_arb' : 'salutation'}
                  
                  value={
                    arb
                      ? (
                        employeeDetails && employeeDetails.salutation_arb ? employeeDetails.salutation_arb :
                          (employeeDetails && employeeDetails.salutation_arb !== null ? '' : employeeDetails && employeeDetails.salutation)
                        )
                      : (employeeDetails && employeeDetails.salutation)
                  }
                  
                  onChange={handleInputChange}
                  type="select"
                >
                  <option defaultValue="selected">{arb ?'الرجاء التحديد':'Please Select'}</option>
                  <option value="Mr">{arb ?'السيد':'Mr'}</option>
                  <option value="Mrs">{arb ?'السّيدة':'Mrs'}</option>
                  <option value="Ms">{arb ?'آنسة':'Ms'}</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}><span style={{ color: 'red' }}>*</span>
                {arabic.find((item) => item.key_text === 'mdEmployee.Gender')?.[genLabel]}
                   
                </Label>
                <Input
                  
                  name={arb ? 'gender_arb' : 'gender'}
                  value={
                    arb
                      ? (
                        employeeDetails && employeeDetails.gender_arb ? employeeDetails.gender_arb :
                          (employeeDetails && employeeDetails.gender_arb !== null ? '' : employeeDetails && employeeDetails.gender)
                        )
                      : (employeeDetails && employeeDetails.gender)
                  }
                  
                  onChange={handleInputChange}
                  type="select"
                >
                  <option defaultValue="selected">{arb ?'الرجاء التحديد':'Please Select'}</option>
                  <option value="Female">{arb ?'أنثى':'Female'}</option>
                  <option value="Male">{arb ?'ذكر':'Male'}</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="3">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Status')?.[genLabel]}</Label>
                <Input
                  name={arb ? 'status_arb' : 'status'}
                  value={
                    arb
                      ? (
                        employeeDetails && employeeDetails.status_arb ? employeeDetails.status_arb :
                          (employeeDetails && employeeDetails.status_arb !== null ? '' : employeeDetails && employeeDetails.status)
                        )
                      : (employeeDetails && employeeDetails.status)
                  }
                  
                  onChange={handleInputChange}
                  type="select"
                >
                  <option defaultValue="selected" value="Current">
                  {arb ?'حاضِر':'Current'} 
                  </option>
                  <option value="Archive">{arb ?'أرشيف':'Archive'} </option>
                  <option value="Cancel">{arb ?'يلغي':'Cancel'}</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Date of Birth')?.[genLabel]} <span style={{ color: 'red' }}>*</span>
                </Label>
                <Input
                  type="date"
                  onChange={handleInputChange}
                  name="date_of_birth"
                  value={
                    employeeDetails && moment(employeeDetails.date_of_birth).format('YYYY-MM-DD')
                  }
                  max={moment().format('YYYY-MM-DD')}
                />
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Passport No')?.[genLabel]}</Label>
                <Input
                  name="passport"
                  value={employeeDetails && employeeDetails.passport}
                  onChange={handleInputChange}
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Passport Expiry')?.[genLabel]}</Label>
                <Input
                  type="date"
                  onChange={handleInputChange}
                  name="date_of_expiry"
                  value={
                    employeeDetails && moment(employeeDetails.date_of_expiry).format('YYYY-MM-DD')
                  }
                  min={moment().format('YYYY-MM-DD')}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="3">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Marital Status')?.[genLabel]}</Label>
                <Input
                  name={arb ? 'marital_status_arb' : 'marital_status'}
                  value={
                    arb
                      ? (
                        employeeDetails && employeeDetails.marital_status_arb ? employeeDetails.marital_status_arb :
                          (employeeDetails && employeeDetails.marital_status_arb !== null ? '' : employeeDetails && employeeDetails.marital_status)
                        )
                      : (employeeDetails && employeeDetails.marital_status)
                  }
                  
                  onChange={handleInputChange}
                  type="select"
                >
                  <option>{arb ?'الرجاء التحديد':'Please Select'}</option>
                  <option defaultValue="selected" value="Married">
                  {arb ?'متزوج':'Married'}
                  </option>
                  <option value="Single">{arb ?'أعزب':'Single'}</option>
                </Input>
              </FormGroup>
            </Col>

            <Col md="3">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
              <span style={{ color: 'red' }}>*</span>
                {arabic.find((item) => item.key_text === 'mdEmployee.Nationality')?.[genLabel]}
                  {/* Nationality */}
                   
                </Label>
                {/* <Input
                  name="nationality"
                  value={employeeDetails && employeeDetails.nationality}
                  onChange={handleInputChange}
                  type="select"
                >
                  <option value="">Please Select</option>
                  {allCountries &&
                    allCountries.map((ele) => {
                      return (
                        <option key={ele.country_code} value={parseFloat(ele.country_code)}>
                          {ele.name}
                        </option>
                      );
                    })}
                </Input> */}
                <Input
                name={arb ? 'nationality_arb' : 'nationality'}
                  
                  value={
                    arb
                      ? (
                        employeeDetails && employeeDetails.nationality_arb ? employeeDetails.nationality_arb :
                          (employeeDetails && employeeDetails.nationality_arb !== null ? '' : employeeDetails && employeeDetails.nationality)
                        )
                      : (employeeDetails && employeeDetails.nationality)
                  }
                  
                  onChange={handleInputChange}
                  type="select"
                >
                  <option value="">{arb ?'الرجاء التحديد':'Please Select'}</option>
                  {allCountries &&
                    allCountries.map((ele) => {
                      return (
                        <option key={ele.country_code} value={ele.name}>
                          {arb?ele.name_arb:ele.name}
                        </option>
                      );
                    })}
                </Input>
              </FormGroup>
            </Col>

            <Col md="3">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Race')?.[genLabel]}</Label>
                <Input
                name={arb ? 'race_arb' : 'race'}
                  value={
                    arb
                      ? (
                        employeeDetails && employeeDetails.race_arb ? employeeDetails.race_arb :
                          (employeeDetails && employeeDetails.race_arb !== null ? '' : employeeDetails && employeeDetails.race)
                        )
                      : (employeeDetails && employeeDetails.race)
                  }
                  
                  onChange={handleInputChange}
                  type="select"
                >
                  <option defaultValue="selected">{arb ?'الرجاء التحديد':'Please Select'}</option>
                  <option value="Singaporean">{arb ?'سنغافوري':'Singaporean'}</option>
                  <option value="Malaysian">{arb ?'الماليزية':'Malaysian'}</option>
                  <option value="Bengali">{arb ?'البنغالية':'Bengali'}</option>
                  <option value="Indian">{arb ?'هندي':'Indian'}</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Religion')?.[genLabel]}</Label>
                <Input
                 name={arb ? 'religion_arb' : 'religion'}
                  value={
                    arb
                      ? (
                        employeeDetails && employeeDetails.religion_arb ? employeeDetails.religion_arb :
                          (employeeDetails && employeeDetails.religion_arb !== null ? '' : employeeDetails && employeeDetails.religion)
                        )
                      : (employeeDetails && employeeDetails.religion)
                  }
                  
                  onChange={handleInputChange}
                  type="select"
                >
                  <option defaultValue="selected">{arb ?'الرجاء التحديد':'Please Select'}</option>
                  <option value="BUDDHIST">{arb ?'بوذي':'BUDDHIST'}</option>
                  <option value="CHRISTIAN">{arb ?'مسيحي':'CHRISTIAN'}</option>
                  <option value="HINDU">{arb ?'هندوسية':'HINDU'}</option>
                  <option value="MUSLIM">{arb ?'مسلم':'MUSLIM'}</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="3">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Project Designation')?.[genLabel]}</Label>
                <Input
                  name={arb ? 'project_designation_arb' : 'project_designation'}

                  value={
                    arb
                      ? (
                        employeeDetails && employeeDetails.project_designation_arb ? employeeDetails.project_designation_arb :
                          (employeeDetails && employeeDetails.project_designation_arb !== null ? '' : employeeDetails && employeeDetails.project_designation)
                        )
                      : (employeeDetails && employeeDetails.project_designation)
                  }
                  onChange={handleInputChange}
                  type="select"
                >
                  <option>{arb ?'الرجاء التحديد':'Please Select'}</option>
                  <option defaultValue="selected" value="Employee">
                  {arb ?'موظف':'Employee'}
                  </option>
                  <option value="Manager">{arb ?'مدير':'Manager'}</option>
                  <option value="Supervisor">{arb ?'مشرف':'Supervisor'}</option>
                </Input>
              </FormGroup>
            </Col>
            {/* <Col md="3">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Team')?.[genLabel]}</Label>
                <Input
                  name={arb ? 'team_arb' : 'team'}

                  value={
                    arb
                      ? (
                        employeeDetails && employeeDetails.team_arb ? employeeDetails.team_arb :
                          (employeeDetails && employeeDetails.team_arb !== null ? '' : employeeDetails && employeeDetails.team)
                        )
                      : (employeeDetails && employeeDetails.team)
                  }
                  onChange={handleInputChange}
                  type="select"
                >
                  <option defaultValue="selected">{arb ?'الرجاء التحديد':'Please Select'}</option>
                  {team &&
                    team.map((ele) => (
                      <option key={ele.project_team_id} value={ele.project_team_id}>
                        {arb?ele.team_title_arb:ele.team_title}
                      </option>
                    ))}
                </Input>
              </FormGroup>
            </Col> */}
            <Col md="3">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Pay')?.[genLabel]}</Label>
                <Input
                  name={arb ? 'pay_arb' : 'pay'}

                  value={
                    arb
                      ? (
                        employeeDetails && employeeDetails.pay_arb ? employeeDetails.pay_arb :
                          (employeeDetails && employeeDetails.pay_arb !== null ? '' : employeeDetails && employeeDetails.pay)
                        )
                      : (employeeDetails && employeeDetails.pay)
                  }
                  onChange={handleInputChange}
                  type="select"
                >
                  <option>{arb ?'الرجاء التحديد':'Please Select'}</option>
                  <option defaultValue="selected" value="GroupPay">
                  {arb ?'الدفع الجماعي':'Group Pay'}
                  </option>
                  <option value="HourlyPay">{arb ?'الأجر بالساعة':'Hourly Pay'}</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Company')?.[genLabel]}</Label>
                <Input
                  name="company_id"
                  value={employeeDetails && employeeDetails.company_id}
                  onChange={handleInputChange}
                  type="select"
                >
                  <option value="">{arb ?'الرجاء التحديد':'Please Select'}</option>
                  {companies &&
                    companies.map((ele) => {
                      return (
                        <option key={ele.company_id} value={ele.company_id}>
                          {arb?ele.company_name_arb:ele.company_name}
                        </option>
                      );
                    })}
                </Input>
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Experience')?.[genLabel]}</Label>
                <Input
                  name="totalexperience"
                  value={totalExperience}
                  onChange={handleInputChange}
                  type="text"
                  disabled
                />
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Project manager')?.[genLabel]}</Label>
                <br />
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Yes')?.[genLabel]}</Label>
                &nbsp;
                <Input
                  name="project_manager"
                  value="1"
                  type="radio"
                  checked={projectManager === '1'}
                  onChange={(e) => setProjectManager(e.target.value)}
                />
                &nbsp; &nbsp;
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.No')?.[genLabel]}</Label>
                &nbsp;
                <Input
                  name="project_manager"
                  value="0"
                  type="radio"
                  checked={projectManager === '0'}
                  onChange={(e) => setProjectManager(e.target.value)}
                />
              </FormGroup>
            </Col>

            <Col md="3">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Team Leader')?.[genLabel]}</Label>
                <br />
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Yes')?.[genLabel]}</Label>
                &nbsp;
                <Input
                  name="team_leader"
                  value="1"
                  type="radio"
                  checked={teamLeader === '1'}
                  onChange={(e) => setTeamLeader(e.target.value)}
                />
                &nbsp; &nbsp;
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.No')?.[genLabel]}</Label>
                &nbsp;
                <Input
                  name="team_leader"
                  value="0"
                  type="radio"
                  checked={teamLeader === '0'}
                  onChange={(e) => setTeamLeader(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
      </FormGroup>
      </ComponentCard>
    </div>
  );
}

export default EmployeePart;

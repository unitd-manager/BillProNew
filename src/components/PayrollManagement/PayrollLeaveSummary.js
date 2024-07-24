import React, { useState, useEffect } from 'react';
import { Form, Row, Col, FormGroup, Table } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';
import ViewAnnualLeaveModal from './AnnualLeaveModal';
import ViewMonthlyLeaveModal from './MonthlyLeaveModal';
import api from '../../constants/api';

function PayrollLeaveSummary({leave}) {
  PayrollLeaveSummary.propTypes = {
    leave: PropTypes.array,
  };
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  const selectedLanguage = getSelectedLanguageFromLocalStorage();
  const [arabic, setArabic] = useState([]);


  const arb =selectedLanguage === 'Arabic'

  // const eng =selectedLanguage === 'English'
   

  const getArabicLabels = () => {
      api
      .get('/translation/getTranslationForPayrollManagement')
      .then((res) => {
        setArabic(res.data.data);
      })
      .catch(() => {
        // Handle error if needed
      });   
  };

  useEffect(() => {
  
    getArabicLabels();
  }, []);
  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }
  const [absentLeaves, setAbsentLeaves] = useState();
  const [hospitalLeaves, setHospitalLeaves] = useState();
  const [sickLeaves, setSickLeaves] = useState();
  const [annualLeaves, setAnnualLeaves] = useState();
  const [monthlyAbsentLeaves, setMonthlyAbsentLeaves] = useState();
  const [monthlyHospitalLeaves, setMonthlyHospitalLeaves] = useState();
  const [monthlySickLeaves, setMonthlySickLeaves] = useState();
  const [monthlyAnnualLeaves, setMonthlyAnnualLeaves] = useState();

  const [annualLeaveModal, setAnnualLeaveModal] = useState(false);
  const [monthlyLeaveModal, setMonthlyLeaveModal] = useState(false);
  const [filteredMonthData, setFilteredMonthData] = useState([]);
  const [filteredYearData, setFilteredYearData] = useState([]);

  const calculateYearlyLeaveTypes = (arr) => {
    let leaveannual = 0;
    let leaveabsent = 0;
    let leavesick = 0;
    let leavehospital = 0;

    arr.forEach((element) => {
      if (element.leave_type === 'Annual Leave') {
        leaveannual += element.no_of_days;
      }
      if (element.leave_type === 'Hospitalization Leave') {
        leavehospital += element.no_of_days;
      }
      if (element.leave_type === 'Sick Leave') {
        leavesick += element.no_of_days;
      }
      if (element.leave_type === 'Absent') {
        leaveabsent += element.no_of_days;
      }
    });
    setAbsentLeaves(leaveabsent);
    setAnnualLeaves(leaveannual);
    setHospitalLeaves(leavehospital);
    setSickLeaves(leavesick);
  };
  const calculateMonthlyLeaveTypes = (arr) => {
    let leaveannual = 0;
    let leaveabsent = 0;
    let leavesick = 0;
    let leavehospital = 0;

    arr.forEach((element) => {
      if (element.leave_type === 'Annual Leave') {
        leaveannual += element.no_of_days;
      }
      if (element.leave_type === 'Hospitalization Leave') {
        leavehospital += element.no_of_days;
      }
      if (element.leave_type === 'Sick Leave') {
        leavesick += element.no_of_days;
      }
      if (element.leave_type === 'Absent') {
        leaveabsent += element.no_of_days;
      }
    });
    setMonthlyAbsentLeaves(leaveabsent);
    setMonthlyAnnualLeaves(leaveannual);
    setMonthlyHospitalLeaves(leavehospital);
    setMonthlySickLeaves(leavesick);
  };
  //Leaves

  
  useEffect(() => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const filteredMonth = leave.filter((item) => {
      const itemDate = new Date(item.from_date);
      const itemYear = itemDate.getFullYear();
      const itemMonth = itemDate.getMonth() + 1;
      return itemYear === currentYear && itemMonth === currentMonth;
    });
    const filteredYear = leave.filter((item) => {
      const itemDate = new Date(item.from_date);
      const itemYear = itemDate.getFullYear();
      // const itemMonth = itemDate.getMonth() + 1;
      return itemYear === currentYear;
    });
    setFilteredMonthData(filteredMonth);
    setFilteredYearData(filteredYear);
    calculateYearlyLeaveTypes(filteredYear);
    calculateMonthlyLeaveTypes(filteredMonth);
  }, [leave]);
  return (
    <div>
      <Form>
        <FormGroup>
          <ComponentCard title="Leave Summary">
            <Row>
              <Col md="8">
                <Table>
                  <thead>
                    <tr>
                      <td>{arabic.find(item => item.key_text === 'mdPayrollManagement.ANNUAL LEAVE AS PER MOM')?.[genLabel]}</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      
                      <td>{arabic.find(item => item.key_text === 'mdPayrollManagement.1st year: 7 days')?.[genLabel]}</td>
                   
                    
                    
                      <td>{arabic.find(item => item.key_text === 'mdPayrollManagement.2nd year: 8 days')?.[genLabel]}</td>

                      <td>{arabic.find(item => item.key_text === 'mdPayrollManagement.3rd year: 9 days')?.[genLabel]}</td>

                    
                     
                    </tr>
                    <tr>
                    <td>{arabic.find(item => item.key_text === 'mdPayrollManagement.4th year: 10 days')?.[genLabel]}</td>

                    <td>{arabic.find(item => item.key_text === 'mdPayrollManagement.5th year: 11 days')?.[genLabel]}</td>

                    <td>{arabic.find(item => item.key_text === 'mdPayrollManagement.6th year: 12 days')?.[genLabel]}</td>

                      
                    </tr>
                    <tr>
                    <td>{arabic.find(item => item.key_text === 'mdPayrollManagement.7th year: 13 days')?.[genLabel]}</td>

                    <td>{arabic.find(item => item.key_text === 'mdPayrollManagement.8th year thereafter: 14 days')?.[genLabel]}</td>

                     
                      <td></td>
                    </tr>
                  </tbody>
                </Table>
                <Table>
                  <thead>
                    <tr>
                    <td>{arabic.find(item => item.key_text === 'mdPayrollManagement.SICK LEAVE AS PER MOM')?.[genLabel]}</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                    <td>{arabic.find(item => item.key_text === 'mdPayrollManagement.After 3 months: 5 days')?.[genLabel]}</td>

                    <td>{arabic.find(item => item.key_text === 'mdPayrollManagement.After 4 months: 8 days')?.[genLabel]}</td>

                     
                      
                    </tr>
                    <tr>
                    <td>{arabic.find(item => item.key_text === 'mdPayrollManagement.After 5 months: 11 days')?.[genLabel]}</td>

                    <td>{arabic.find(item => item.key_text === 'mdPayrollManagement.6 months and thereafter: 14 days')?.[genLabel]}</td>

                     
                     
                    </tr>
                  </tbody>
                </Table>
              </Col>
              <Col md="2">
                <Table>
                  <thead>
                    <tr>
                    <td>{arabic.find(item => item.key_text === 'mdPayrollManagement.Total No of leave taken this year')?.[genLabel]}</td>

                      
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                    <td>{arabic.find(item => item.key_text === 'mdPayrollManagement.Annual leave')?.[genLabel]}
                        <span>
                           :{' '}
                          <span
                            onClick={() => {
                              setAnnualLeaveModal(true);
                            }}
                          >
                            {annualLeaves}
                          </span>
                        </span>
                      </td>
                    </tr>
                    <tr>
                    <td>{arabic.find(item => item.key_text === 'mdPayrollManagement.Sick leave')?.[genLabel]}

                        {' '}
                        <span>
                           :{' '}
                          <span
                            onClick={() => {
                              setAnnualLeaveModal(true);
                            }}
                          >
                            {sickLeaves}
                          </span>
                        </span>
                      </td>
                    </tr>
                    <tr>
                    <td>{arabic.find(item => item.key_text === 'mdPayrollManagement.Hospitalization leave')?.[genLabel]}
                        {' '}
                        <span>
                           :{' '}
                          <span
                            onClick={() => {
                              setAnnualLeaveModal(true);
                            }}
                          >
                            {hospitalLeaves}
                          </span>
                        </span>
                      </td>
                    </tr>
                    <tr>
                    <td>{arabic.find(item => item.key_text === 'mdPayrollManagement.Absent leave')?.[genLabel]}
                        <span>
                           :{' '}
                          <span
                            onClick={() => {
                              setAnnualLeaveModal(true);
                            }}
                          >
                            {absentLeaves}
                          </span>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
              <Col md="2">
                <Table>
                <thead>
                  <tr>
                  <td>{arabic.find(item => item.key_text === 'mdPayrollManagement.Total No of leave taken this Month')?.[genLabel]}

                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                  <td>{arabic.find(item => item.key_text === 'mdPayrollManagement.Annual leave')?.[genLabel]}
                      {' '}
                      <span>
                         :{' '}
                        <span
                          onClick={() => {
                            setMonthlyLeaveModal(true);
                          }}
                        >
                          {monthlyAnnualLeaves}
                        </span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                  <td>{arabic.find(item => item.key_text === 'mdPayrollManagement.Sick leave')?.[genLabel]}
                      {' '}
                      <span>
                         :{' '}
                        <span
                          onClick={() => {
                            setMonthlyLeaveModal(true);
                          }}
                        >
                          {monthlySickLeaves}
                        </span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                  <td>{arabic.find(item => item.key_text === 'mdPayrollManagement.Hospitalization leave')?.[genLabel]}

                      {' '}
                      <span>
                         :{' '}
                        <span
                          onClick={() => {
                            setMonthlyLeaveModal(true);
                          }}
                        >
                          {monthlyHospitalLeaves}
                        </span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                  <td>{arabic.find(item => item.key_text === 'mdPayrollManagement.Absent leave')?.[genLabel]}

                      <span>
                         :{' '}
                        <span
                          onClick={() => {
                            setMonthlyLeaveModal(true);
                          }}
                        >
                          {monthlyAbsentLeaves}
                        </span>
                      </span>
                    </td>
                  </tr>
                </tbody>
                </Table>
              </Col>
            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>
      {annualLeaveModal && (
        <ViewAnnualLeaveModal
          annualLeaveModal={annualLeaveModal}
          setAnnualLeaveModal={setAnnualLeaveModal}
          annualLeave={filteredYearData}
        />
      )}
      {monthlyLeaveModal && (
        <ViewMonthlyLeaveModal
          monthlyLeaveModal={monthlyLeaveModal}
          setMonthlyLeaveModal={setMonthlyLeaveModal}
          monthlyLeave={filteredMonthData}
        />
      )}
    </div>
  );
}

export default PayrollLeaveSummary;

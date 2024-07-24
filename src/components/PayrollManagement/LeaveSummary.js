import React from 'react'
import { Row,Col,Table,Form,FormGroup } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

function LeaveSummary({setAnnualLeaveModal,setMonthlyLeaveModal,annualLeaves,sickLeaves,hospitalLeaves,absentLeaves,monthlyAbsentLeaves,monthlyAnnualLeaves,monthlyHospitalLeaves,monthlySickLeaves}) {
    LeaveSummary.propTypes={
        setAnnualLeaveModal:PropTypes.func,
        setMonthlyLeaveModal:PropTypes.func,
        annualLeaves:PropTypes.number,
        sickLeaves:PropTypes.number,
        hospitalLeaves:PropTypes.number,
        absentLeaves:PropTypes.number,
        monthlyAbsentLeaves:PropTypes.number,
        monthlyAnnualLeaves:PropTypes.number,
        monthlyHospitalLeaves:PropTypes.number,
        monthlySickLeaves:PropTypes.number
    }
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
                        <h6>ANNUAL LEAVE AS PER MOM</h6>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <span>1st year: 7 days</span>
                        </td>
                        <td>
                          <span>2nd year: 8 days</span>
                        </td>
                        <td>
                          <span>3rd year: 9 days</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>4th year: 10 days</span>
                        </td>
                        <td>
                          <span>5th year: 11 days</span>
                        </td>
                        <td>
                          <span>6th year: 12 days</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>7th year: 13 days</span>
                        </td>
                        <td>
                          <span>8th year thereafter: 14 days</span>
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </Table>
                  <Table>
                    <thead>
                      <tr>
                        <h6>SICK LEAVE AS PER MOM</h6>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <span>After 3 months: 5 days</span>
                        </td>
                        <td>
                          <span>After 4 months: 8 days</span>
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>
                          <span>After 5 months: 11 days</span>
                        </td>
                        <td>
                          <span>6 months and thereafter: 14 days</span>
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
                <Col md="2">
                  <Table>
                    <thead>
                      <tr>
                        <h6>Total No of leave taken this year</h6>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <span>
                          Annual leave :{' '}
                          <span
                            onClick={() => {
                              setAnnualLeaveModal(true);
                            }}
                          >
                            {annualLeaves}
                          </span>
                        </span>
                      </tr>
                      <tr>
                        <span>
                          Sick leave :{' '}
                          <span
                            onClick={() => {
                              setAnnualLeaveModal(true);
                            }}
                          >
                            {sickLeaves}
                          </span>
                        </span>
                      </tr>
                      <tr>
                        <span>
                          Hospitalization leave :{' '}
                          <span
                            onClick={() => {
                              setAnnualLeaveModal(true);
                            }}
                          >
                            {hospitalLeaves}
                          </span>
                        </span>
                      </tr>
                      <tr>
                        <span>
                          Absent leave :{' '}
                          <span
                            onClick={() => {
                              setAnnualLeaveModal(true);
                            }}
                          >
                            {absentLeaves}
                          </span>
                        </span>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
                <Col md="2">
                  <thead>
                    <tr>
                      <h6>Total No of leave taken this Month</h6>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <span>
                        Annual leave :{' '}
                        <span
                          onClick={() => {
                            setMonthlyLeaveModal(true);
                          }}
                        >
                          {monthlyAnnualLeaves}
                        </span>
                      </span>
                    </tr>
                    <tr>
                      <span>
                        Sick leave :{' '}
                        <span
                          onClick={() => {
                            setMonthlyLeaveModal(true);
                          }}
                        >
                          {monthlySickLeaves}
                        </span>
                      </span>
                    </tr>
                    <tr>
                      <span>
                        Hospitalization leave :{' '}
                        <span
                          onClick={() => {
                            setMonthlyLeaveModal(true);
                          }}
                        >
                          {monthlyHospitalLeaves}
                        </span>
                      </span>
                    </tr>
                    <tr>
                      <span>
                        Absent leave :{' '}
                        <span
                          onClick={() => {
                            setMonthlyLeaveModal(true);
                          }}
                        >
                          {monthlyAbsentLeaves}
                        </span>
                      </span>
                    </tr>
                  </tbody>
                </Col>
              </Row>
            </ComponentCard>
          </FormGroup>
        </Form>
    </div>
  )
}

export default LeaveSummary
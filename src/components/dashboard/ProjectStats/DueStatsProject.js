import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';
import api from '../../../constants/api';
import ComponentCard from '../../ComponentCard';

export default function DueStatsProject({ id }) {
    DueStatsProject.propTypes = {
      id: PropTypes.any,
    };
  const [employees, setEmployees] = useState([]);
  const [employeeStats, setEmployeeStats] = useState([]);
  //const [data, setData] = useState([]);

  // Get the list of employees from the API
//   const getEmployeeStats = (employeeId) => {
//     api.post('/stats/getStatsEmployeeId', { employee_id: employeeId })
//       .then((res) => {
//         setData(res.data.data);
//       })
//       .catch(() => {});
//   };

  // Get the employee statistics based on the selected employee
  const getStats = (employeeId) => {
    api.post('/stats/getDuechartStats', { employee_id: employeeId ,project_id:id})
      .then((res) => {
        setEmployeeStats(res.data.data);
      })
      .catch(() => {});
  };
  


  const getJobs = () => {
    api
      .post('projecttask/getEmployeeByID', { project_id: id })
      .then((res) => {
        setEmployees(res.data.data);
      })
      .catch(() => {});
  };

  // Get the list of employees from the API
  useEffect(() => {
    getJobs();
  }, [id]);

  const optionsdoughnut = {
    chart: {
      id: 'donut-chart',
      fontFamily: "'Rubik', sans-serif",
    },
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70px',
        },
      },
    },
    legend: {
      show: true,
      position: 'bottom',
      width: '50px',
      fontFamily: "'Montserrat', sans-serif",
      labels: {
        colors: '#8898aa',
      },
    },
    colors: [
      'rgb(30, 136, 229)',
      'rgb(38, 198, 218)',
      'rgb(116, 90, 242)',
      '#ef5350',
    ],
    tooltip: {
      fillSeriesColor: false,
      theme: 'dark',
    },
    labels: [
      'With Due',
      'Due',
      'OverDue',
    ],
  };

  const seriesDonut = employeeStats
  ? [
      employeeStats[0]?.with_due || 0,
      employeeStats[0]?.due || 0,
      employeeStats[0]?.over_due || 0,
    ]
  : [];
    
  return (
    <Row >
      <Col md="12">
        <ComponentCard title="Employee Due Statistics">
          <Form>
            <FormGroup>
              <Label for="employeeSelect">Select Employee</Label>
              <Input
                type="select"
                name="employee_id"
                onChange={(e) => {
                  const selectedEmployeeId = e.target.value;
                  //getEmployeeStats(selectedEmployeeId);
                  getStats(selectedEmployeeId);
                }}
              >
                <option value="">Select Employee</option>
                {employees &&
                  employees.map((element) => (
                    <option key={element.employee_id} value={element.employee_id}>
                      {element.first_name}
                    </option>
                  ))}
              </Input>
            </FormGroup>
            {/* <CardBody>
              {data &&
                data.map((ele) => (
                  <Row key={ele.employee_id}>
                    <Col md="6">
                      <Row>
                        <Label>
                          <b>Title:</b> {ele.task_titles}
                        </Label>
                      </Row>
                      <Row>
                        <Label>
                          <b>Completion:</b> {ele.total_completion}
                        </Label>
                      </Row>
                      <Row>
                        <Label>
                          <b>Project:</b> {ele.title}
                        </Label>
                      </Row>
                    </Col>
                  </Row>
                ))}
            </CardBody> */}
          </Form>
          {employeeStats && (
          <Chart options={optionsdoughnut} series={seriesDonut} type="donut" height="330" />
        )}
        </ComponentCard>
      </Col>
   
    </Row>
  );
};


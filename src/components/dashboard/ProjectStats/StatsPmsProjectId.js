import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Row, Col, CardBody } from 'reactstrap';
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';
import api from '../../../constants/api';
import ComponentCard from '../../ComponentCard';

export default function StatsPmsProjectId({ id }) {
  StatsPmsProjectId.propTypes = {
    id: PropTypes.any,
  };

  const [employees, setEmployees] = useState([]);
  const [employeeStats, setEmployeeStats] = useState([]);
  const [data, setData] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

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

  // Get the employee and project-specific statistics based on the selected employee and project
  useEffect(() => {
    if (id) {
      api
        .post('/stats/getStatsEmployeeId', { employee_id: selectedEmployeeId, project_id: id })
        .then((res) => {
          setData(res.data.data);
        })
        .catch(() => {});

      api
        .post('/stats/getStatsId', { employee_id: selectedEmployeeId, project_id: id })
        .then((res) => {
          setEmployeeStats(res.data.data);
        })
        .catch(() => {});
    }
  }, [id, selectedEmployeeId]);

  const optionsPie = {
    chart: {
      id: 'pie-chart',
      fontFamily: "'Rubik', sans-serif",
    },
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      pie: {
        pie: {
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
      'rgb(17, 249, 232)',
      'rgb(116, 90, 242)',
      '#ef5350',
    ],
    tooltip: {
      fillSeriesColor: false,
      theme: 'dark',
    },
    labels: ['Completed Tasks', 'Pending Tasks', 'In Progress Tasks', 'On Hold Tasks'],
  };

  const seriesPie = employeeStats
    ? [
        employeeStats[0]?.completed_tasks || 0,
        employeeStats[0]?.pending_tasks || 0,
        employeeStats[0]?.in_progress_tasks || 0,
        employeeStats[0]?.on_hold_tasks || 0,
      ]
    : [];

  return (
    <Row>
      <Col md="12">
        <ComponentCard title="Employee Statistics">
          <Form>
            <FormGroup>
              <Label for="employeeSelect">Select Employee</Label>
              <Input
                type="select"
                name="employee_id"
                onChange={(e) => {
                  const selectedId = e.target.value;
                  setSelectedEmployeeId(selectedId);
                }}
              >
                <option value="">Select Employee</option>
                {employees &&
                  employees.map((element) => (
                    <option key={element.project_id} value={element.employee_id}>
                      {element.first_name}
                    </option>
                  ))}
              </Input>
            </FormGroup>

            <CardBody>
              {data &&
                data.map((ele) => (
                  <Row key={ele.project_task_id}>
                    <Col md="6">
                      <Row>
                        <Label>
                          <b>Project:</b> {ele.title}
                        </Label>
                      </Row>
                    </Col>
                  </Row>
                ))}
            </CardBody>
          </Form>
          {employeeStats && (
            <Chart options={optionsPie} series={seriesPie} type="pie" height="300" />
          )}
        </ComponentCard>
      </Col>
    </Row>
  );
}

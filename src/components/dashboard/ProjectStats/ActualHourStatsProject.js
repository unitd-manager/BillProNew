import React, { useEffect, useState } from 'react';
import { Col, FormGroup, Label, Input, Row,Form } from 'reactstrap';
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';
import api from '../../../constants/api';
import ComponentCard from '../../ComponentCard';

export default function ActualHourStatsProject({ id }) {
    ActualHourStatsProject.propTypes = {
      id: PropTypes.any,
    };
  const [taskTitles, setTaskTitles] = useState([]);
  const [actualHourData, setActualHourData] = useState([]);
  const [estimatedHourData, setEstimatedHourData] = useState([]);
  const [employees, setEmployees] = useState([]);

  const HourData = (selectedEmployeeId) => {
    // Make API call to retrieve the data
    api.post('/stats/getProjectActualHourStats', { employee_id: selectedEmployeeId ,project_id:id}).then((response) => {
      // Check if the response data is not empty
      if (response.data && response.data.data && response.data.data.length > 0) {
        // Assuming the response data is an array of objects with keys: task_title, total_actual_hours, and estimated_hours
        const hourData = response.data.data;
        const titles = hourData.map((item) => item.task_title);
        const actualHours = hourData.map((item) => item.total_actual_hours);
        const estimatedHours = hourData.map((item) => item.estimated_hours);

        setTaskTitles(titles);
        setActualHourData(actualHours);
        setEstimatedHourData(estimatedHours);
      } else {
        // If the response data is empty, reset the state to show an empty chart or display a message
        setTaskTitles([]);
        setActualHourData([]);
        setEstimatedHourData([]);
      }
    });
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

//   useEffect(() => {
//     api
//       .get('/jobinformation/getEmployee')
//       .then((res) => {
//         setEmployees(res.data.data);
//       })
//       .catch((error) => {
//         console.log('Error fetching employees:', error);
//       });
//   }, []);

  const optionscolumn = {
    colors: ['#745af2', '#263238'],
    chart: {
      fontFamily: "'Rubik', sans-serif",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: 'rounded',
        columnWidth: '55%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: taskTitles,
      labels: {
        style: {
          cssClass: 'grey--text lighten-2--text fill-color',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Hours',
        color: '#8898aa',
      },
      labels: {
        style: {
          cssClass: 'grey--text lighten-2--text fill-color',
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter(val) {
          return `${val} hours`;
        },
      },
    },
    grid: {
      borderColor: 'rgba(0,0,0,0.1)',
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
  };

  const seriescolumn = [
    {
      name: 'Actual Hour',
      data: actualHourData,
    },
    {
      name: 'Estimated Hour',
      data: estimatedHourData,
    },
  ];

  return (
    <Row>
      <Col md="12">
        <ComponentCard title="Employee Actual Hours">
          <Form>
            <FormGroup>
              <Label for="employeeSelect">Select Employee</Label>
              <Input
                type="select"
                name="employee_id"
                onChange={(e) => {
                  const selectedEmployeeId = e.target.value;
                  HourData(selectedEmployeeId);
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
          </Form>
          <Chart options={optionscolumn} series={seriescolumn} type="bar" height="280" />
        </ComponentCard>
      </Col>
    </Row>
  );
};


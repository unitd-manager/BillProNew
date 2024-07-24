import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import Chart from 'react-apexcharts';
import ComponentCard from '../ComponentCard';

const Employee = () => {
  // Mock data for employee performance metrics
  const [employeeData] = useState({
    categories: ['Employee A', 'Employee B', 'Employee C', 'Employee D', 'Employee E'],
    series: [
      {
        name: 'Sales Targets',
        data: [95, 85, 75, 90, 80], // Sales targets achieved (percentage) for each employee
      },
      {
        name: 'Customer Satisfaction',
        data: [90, 88, 92, 85, 95], // Customer satisfaction scores (percentage) for each employee
      },
      {
        name: 'Training Completion',
        data: [100, 95, 80, 90, 85], // Training completion rates (percentage) for each employee
      },
    ],
  });

  useEffect(() => {
    // Fetch employee data from API if needed
    // Example API call: api.get('/employee/performance').then((response) => setEmployeeData(response.data));
  }, []); // Empty dependency array means this effect runs once on component mount

  const optionsBarChart = {
    chart: {
      id: 'employee-bar-chart',
      fontFamily: "'Rubik', sans-serif",
      type: 'bar',
      height: '350',
    },
    xaxis: {
      categories: employeeData.categories,
      labels: {
        style: {
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Performance Metrics',
        style: {
          fontSize: '14px',
          fontWeight: 600,
        },
      },
      min: 0,
      max: 100,
    },
    colors: ['#36a2eb', '#ff6384', '#ffce56'], // Colors for different performance metrics
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '45%', // Adjust bar width as needed
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
    tooltip: {
      theme: 'dark',
    },
  };

  const seriesBarChart = employeeData.series.map((metric) => ({
    name: metric.name,
    data: metric.data,
  }));

  return (
    <Row>
      <Col md="12">
        <ComponentCard title="Employee Performance Metrics (Bar Chart)">
          {employeeData.categories.length > 0 ? (
            <Chart options={optionsBarChart} series={seriesBarChart} type="bar" height="350" />
          ) : (
            <p>No data available for the chart.</p>
          )}
        </ComponentCard>
      </Col>
    </Row>
  );
};

export default Employee;

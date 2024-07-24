import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import Chart from 'react-apexcharts';
import ComponentCard from '../ComponentCard';

const Training = () => {
  // Mock data for training statistics
  const [trainingData] = useState({
    categories: ['Module A', 'Module B', 'Module C', 'Module D'],
    series: [
      {
        name: 'Completed',
        data: [80, 70, 90, 85], // Completion percentage for each module
      },
      {
        name: 'In Progress',
        data: [20, 30, 10, 15], // In-progress percentage for each module
      },
    ],
  });

  useEffect(() => {
    // Fetch training statistics from API if needed
    // Example API call: api.get('/training/stats').then((response) => setTrainingData(response.data));
  }, []); // Empty dependency array means this effect runs once on component mount

  const optionsBarChart = {
    chart: {
      id: 'training-bar-chart',
      fontFamily: "'Rubik', sans-serif",
      type: 'bar',
      height: '350',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: '80%', // Adjust bar height as needed
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: trainingData.categories,
      labels: {
        style: {
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Training Progress',
        style: {
          fontSize: '14px',
          fontWeight: 600,
        },
      },
    },
    colors: ['#36a2eb', '#ff6384'], // Colors for completed and in-progress bars
    tooltip: {
      theme: 'dark',
    },
  };

  const seriesBarChart = trainingData.series.map((module) => ({
    name: module.name,
    data: module.data,
  }));

  return (
    <Row>
      <Col md="12">
        <ComponentCard title="Training Statistics (Bar Chart)">
          {trainingData.categories.length > 0 ? (
            <Chart options={optionsBarChart} series={seriesBarChart} type="bar" height="350" />
          ) : (
            <p>No data available for the chart.</p>
          )}
        </ComponentCard>
      </Col>
    </Row>
  );
};

export default Training;

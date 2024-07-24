import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import Chart from 'react-apexcharts';
import ComponentCard from '../ComponentCard';

const Leave = () => {
  // Mock data for leave statistics
  const [leaveData] = useState({
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    series: [
      {
        name: 'Approved Leaves',
        data: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65],
      },
      {
        name: 'Pending Leaves',
        data: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
      },
    ],
  });

  useEffect(() => {
    // Fetch leave statistics from API if needed
    // Example API call: api.get('/leave/stats').then((response) => setLeaveData(response.data));
  }, []); // Empty dependency array means this effect runs once on component mount

  const optionsAreaChart = {
    chart: {
      id: 'leave-area-chart',
      fontFamily: "'Rubik', sans-serif",
      type: 'area',
      height: '350',
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: leaveData.categories,
    },
    yaxis: {
      title: {
        text: 'Number of Leaves',
        style: {
          fontSize: '14px',
          fontWeight: 600,
        },
      },
    },
    colors: ['#36a2eb', '#ff6384'], // Colors for approved and pending leaves
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

  const seriesAreaChart = leaveData.series;

  return (
    <Row>
      <Col md="12">
        <ComponentCard title="Leave Statistics (Area Chart)">
          {leaveData.categories.length > 0 ? (
            <Chart options={optionsAreaChart} series={seriesAreaChart} type="area" height="350" />
          ) : (
            <p>No data available for the chart.</p>
          )}
        </ComponentCard>
      </Col>
    </Row>
  );
};

export default Leave;

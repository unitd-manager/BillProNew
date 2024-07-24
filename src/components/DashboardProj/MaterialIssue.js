import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'reactstrap';
import Chart from 'react-apexcharts';
// import api from '../../constants/api'; // Uncomment and import your API module here
import ComponentCard from '../ComponentCard';

const MaterialIssue = () => {
  const [materialData, setMaterialData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  // Function to fetch material issue data
  const fetchMaterialData = () => {
    // Mock data for demonstration (replace with actual API call)
    const mockData = [
      { date: '2022-01-01', quantity: 100, cost: 500 }, // Material issue date, quantity, and cost
      { date: '2022-01-02', quantity: 150, cost: 750 },
      { date: '2022-01-03', quantity: 80, cost: 400 },
      // Add more data as needed
    ];
    setMaterialData(mockData);
    setLoading(false); // Set loading to false after data is fetched (remove in actual implementation)
  };

  useEffect(() => {
    fetchMaterialData(); // Fetch material issue data on component mount (remove in actual implementation)
  }, []);

  const optionsLineChart = {
    chart: {
      id: 'material-issue-line-chart',
      fontFamily: "'Rubik', sans-serif",
      type: 'line',
      height: '350',
    },
    xaxis: {
      type: 'category',
      categories: materialData?.map((item) => item.date) || [], // x-axis categories (dates)
      labels: {
        style: {
          colors: '#263238',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Quantity',
        style: {
          fontSize: '14px',
          fontWeight: 600,
        },
      },
    },
    colors: ['#36a2eb'], // Customize line color as needed
    legend: {
      show: false,
    },
    tooltip: {
      theme: 'dark',
    },
  };

  const seriesLineChart = [
    {
      name: 'Quantity',
      data: materialData?.map((item) => item.quantity) || [], // y-axis values (quantities)
    },
  ];

  return (
    <Row>
      <Col md="12">
        <ComponentCard title="Material Issue (Line Chart)">
          <Form>
            {/* Add any form elements or filters if needed */}
          </Form>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Chart options={optionsLineChart} series={seriesLineChart} type="line" height="350" />
          )}
        </ComponentCard>
      </Col>
    </Row>
  );
};

export default MaterialIssue;

import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'reactstrap';
import Chart from 'react-apexcharts';
// import api from '../../constants/api'; // Uncomment and import your API module here
import ComponentCard from '../ComponentCard';

const CustoChart = () => {
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  // Function to fetch customer data
  const fetchCustomerData = () => {
    // Mock data for demonstration (replace with actual API call)
    const mockData = [
      { type: 'Regular', count: 100 }, // Customer type and count
      { type: 'VIP', count: 50 },
      { type: 'New', count: 80 },
      // Add more data as needed
    ];
    setCustomerData(mockData);
    setLoading(false); // Set loading to false after data is fetched (remove in actual implementation)
  };

  useEffect(() => {
    fetchCustomerData(); // Fetch customer data on component mount (remove in actual implementation)
  }, []);

  const optionsPieChart = {
    chart: {
      id: 'customer-pie-chart',
      fontFamily: "'Rubik', sans-serif",
      type: 'pie',
      height: '350',
    },
    labels: customerData?.map((item) => item.type) || [],
    colors: ['#36a2eb', '#ff6384', '#ffce56'], // Customize colors as needed
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

  const seriesPieChart = customerData?.map((item) => item.count) || [];

  return (
    <Row>
      <Col md="12">
        <ComponentCard title="Customer Types (Pie Chart)">
          <Form>
            {/* Add any form elements or filters if needed */}
          </Form>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Chart options={optionsPieChart} series={seriesPieChart} type="pie" height="350" />
          )}
        </ComponentCard>
      </Col>
    </Row>
  );
};

export default CustoChart;

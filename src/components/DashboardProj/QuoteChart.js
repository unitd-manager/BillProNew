import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'reactstrap';
import Chart from 'react-apexcharts';
// import api from '../../constants/api'; // Uncomment and import your API module here
import ComponentCard from '../ComponentCard';

const QuoteChart = () => {
  const [quotationData, setQuotationData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  // Function to fetch quotation data
  const fetchQuotationData = () => {
    // Mock data for demonstration (replace with actual API call)
    const mockData = [
      { month: 'Jan', value: 100 }, // Quotation data (month: Month name, value: Number of quotations)
      { month: 'Feb', value: 150 },
      { month: 'Mar', value: 200 },
      { month: 'Apr', value: 180 },
      // Add more data as needed
    ];
    setQuotationData(mockData);
    setLoading(false); // Set loading to false after data is fetched (remove in actual implementation)
  };

  useEffect(() => {
    fetchQuotationData(); // Fetch quotation data on component mount (remove in actual implementation)
  }, []);

  const optionsAreaChart = {
    chart: {
      id: 'quotation-area-chart',
      fontFamily: "'Rubik', sans-serif",
      type: 'area',
      height: '350',
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: 'category',
      categories: quotationData?.map((item) => item.month) || [],
      labels: {
        style: {
          colors: '#263238',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Number of Quotations',
        style: {
          fontSize: '14px',
          fontWeight: 600,
        },
      },
    },
    colors: ['#36a2eb'],
    legend: {
      show: false, // No legend for a single series
    },
    tooltip: {
      theme: 'dark',
    },
  };

  const seriesAreaChart = [
    {
      name: 'Quotations',
      data: quotationData?.map((item) => item.value) || [],
    },
  ];

  return (
    <Row>
      <Col md="12">
        <ComponentCard title="Quotation Data (Area Chart)">
          <Form>
            {/* Add any form elements or filters if needed */}
          </Form>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Chart options={optionsAreaChart} series={seriesAreaChart} type="area" height="350" />
          )}
        </ComponentCard>
      </Col>
    </Row>
  );
};

export default QuoteChart;

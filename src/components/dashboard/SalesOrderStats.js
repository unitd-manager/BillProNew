 import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'reactstrap';
import Chart from 'react-apexcharts';
//import api from '../../constants/api';
import ComponentCard from '../ComponentCard';

const SalesOrderStats = () => {
  const [salesOrderStats, setSalesOrderStats] = useState(null);

  // Function to fetch Sales Order statistics
  const fetchSalesOrderStats = () => {
    // Mock data for demonstration (replace with actual API call)
    const mockData = {
      pending: 10,
      shipped: 20,
      delivered: 15,
    };
    setSalesOrderStats(mockData);
  };

  useEffect(() => {
    fetchSalesOrderStats(); // Fetch Sales Order statistics on component mount
  }, []);

  const optionsBarChart = {
    chart: {
      id: 'bar-chart',
      fontFamily: "'Rubik', sans-serif",
      type: 'bar',
    },
    xaxis: {
      categories: ['Pending', 'Shipped', 'Delivered'],
      labels: {
        style: {
          colors: ['#36a2eb', '#ff6384', '#ffce56'],
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Sales Orders',
        style: {
          fontSize: '14px',
          fontWeight: 600,
        },
      },
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
    colors: ['#36a2eb', '#ff6384', '#ffce56'],
    tooltip: {
      theme: 'dark',
    },
    fill: {
      opacity: 1,
    },
  };

  const seriesBarChart = [
    {
      name: 'Sales Orders',
      data: [
        salesOrderStats?.pending || 0,
        salesOrderStats?.shipped || 0,
        salesOrderStats?.delivered || 0,
      ],
    },
  ];

  return (
    <Row>
      <Col md="12">
        <ComponentCard title="Sales Order Statistics">
          <Form>
            {/* Add any form elements or filters if needed */}
          </Form>
          {salesOrderStats && (
            <Chart options={optionsBarChart} series={seriesBarChart} type="bar" height="350" />
          )}
        </ComponentCard>
      </Col>
    </Row>
  );
};

export default SalesOrderStats;

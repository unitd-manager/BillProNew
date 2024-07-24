import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'reactstrap';
import Chart from 'react-apexcharts';
import ComponentCard from '../ComponentCard';
import api from '../../constants/api';

const ClientChart = () => {
  const [clientData, setClientData] = useState(null);

  // Function to fetch client data
  const fetchClientData = async () => {
    try {
      const { data: { data } } = await api.get('/company/getCompanyDashboard');

      // Ensure all months are present in the data, even if the count is 0
      const allMonths = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];

      // Initialize the month counts with 0
      const monthCounts = allMonths.map(month => ({ month, companyCount: 0 }));

      // Update the monthCounts with data from the API
      data.forEach(({ month, companyCount }) => {
        const monthIndex = allMonths.indexOf(month);
        if (monthIndex !== -1) {
          monthCounts[monthIndex].companyCount = companyCount;
        }
      });

      // Extracting categories (months) and series data (counts)
      const categories = monthCounts.map(({ month }) => month);
      const seriesData = monthCounts.map(({ companyCount }) => companyCount);

      const chartData = {
        categories,
        series: [
          {
            name: 'Total Companies',
            data: seriesData,
          },
        ],
      };

      setClientData(chartData);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchClientData();
  }, []);

  const optionsAreaChart = {
    chart: {
      id: 'area-chart',
      fontFamily: "'Rubik', sans-serif",
      type: 'area',
      stacked: false,
      height: '350',
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: clientData?.categories || [],
      labels: {
        style: {
          colors: '#263238',
        },
      },
      title: {
        text: 'Months',
        style: {
          fontSize: '14px',
          fontWeight: 600,
        },
      },
    },
    yaxis: {
      title: {
        text: 'Number of Companies',
        style: {
          fontSize: '14px',
          fontWeight: 600,
        },
      },
      labels: {
        formatter(val) {
          return Math.round(val);
        },
      },
      tickAmount: 10, // Adjust the tick amount to show intervals of 10
    },
    colors: ['#36a2eb'],
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

  const seriesAreaChart = clientData?.series || [];

  return (
    <Row>
      <Col md="12">
        <ComponentCard title="Company Statistics">
          <Form>
            {/* Add any form elements or filters if needed */}
          </Form>
          {clientData && (
            <Chart options={optionsAreaChart} series={seriesAreaChart} type="area" height="350" />
          )}
        </ComponentCard>
      </Col>
    </Row>
  );
};

export default ClientChart;
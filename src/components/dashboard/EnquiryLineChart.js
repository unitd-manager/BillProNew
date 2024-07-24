import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'reactstrap';
import Chart from 'react-apexcharts';
import ComponentCard from '../ComponentCard';
import api from '../../constants/api';

const EnquiryChart = () => {
  const [enquiryData, setEnquiryData] = useState({
    categories: [],
    series: [{ name: 'Total Enquiries', data: [] }],
  });

  // Function to fetch enquiry data
  const fetchEnquiryData = async () => {
    try {
      const { data: { data } } = await api.get('/enquiry/getEnquiryDashboard');

      console.log('API Response:', data); // Debugging log

      // Ensure all months are present in the data, even if the count is 0
      const allMonths = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];

      // Initialize the month counts with 0
      const monthCounts = allMonths.map(month => ({ month, enquiryCount: 0 }));

      // Update the monthCounts with data from the API
      data.forEach(({ month, enquiryCount }) => {
        const monthIndex = allMonths.indexOf(month);
        if (monthIndex !== -1) {
          monthCounts[monthIndex].enquiryCount = enquiryCount;
        }
      });

      console.log('Processed Month Counts:', monthCounts); // Debugging log

      // Extracting categories (months) and series data (counts)
      const categories = monthCounts.map(({ month }) => month);
      const seriesData = monthCounts.map(({ enquiryCount }) => enquiryCount);

      const chartData = {
        categories,
        series: [
          {
            name: 'Total Enquiries',
            data: seriesData,
          },
        ],
      };

      setEnquiryData(chartData);
    } catch (error) {
      console.log("Error fetching data: ", error);
      // Setting default data in case of error
      setEnquiryData({
        categories: [],
        series: [{ name: 'Total Enquiries', data: [] }],
      });
    }
  };

  useEffect(() => {
    fetchEnquiryData();
  }, []);

  const optionsLineChart = {
    chart: {
      id: 'line-chart',
      fontFamily: "'Rubik', sans-serif",
      type: 'line',
      height: '350',
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: enquiryData.categories,
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
        text: 'Number of Enquiries',
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
      tickAmount: 10,
    },
    colors: ['#745af2'],
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

  const seriesLineChart = enquiryData.series;

  return (
    <Row>
      <Col md="12">
        <ComponentCard title="Enquiry Statistics">
          <Form>
            {/* Add any form elements or filters if needed */}
          </Form>
          {enquiryData.categories.length > 0 && (
            <Chart options={optionsLineChart} series={seriesLineChart} type="line" height="350" />
          )}
        </ComponentCard>
      </Col>
    </Row>
  );
};

export default EnquiryChart;
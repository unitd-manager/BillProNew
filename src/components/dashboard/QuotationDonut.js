import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'reactstrap';
import Chart from 'react-apexcharts';
import ComponentCard from '../ComponentCard';
import api from '../../constants/api';


const QuotationDonut = () => {
  const [quotationStats, setQuotationStats] = useState(null);

  // Function to fetch Quotation statistics
  const fetchQuotationStats = async () => {
    try {
      const { data } = await api.get('/quote/getQuoteStats'); // Replace with your API endpoint

      const statusCounts = data.data.reduce((acc, quote) => {
        acc[quote.quote_status] = (acc[quote.quote_status] || 0) + 1;
        return acc;
      }, {});

      setQuotationStats(statusCounts);
    } catch (error) {
      console.error('Error fetching quotation stats:', error);
    }
  };

  useEffect(() => {
    fetchQuotationStats(); // Fetch Quotation statistics on component mount
  }, []);

  const optionsDonut = {
    chart: {
      id: 'donut-chart',
      fontFamily: "'Rubik', sans-serif",
    },
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70px',
        },
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
    colors: [
      'rgb(30, 136, 229)',
      'rgb(38, 198, 218)',
      'rgb(116, 90, 242)',
      '#ef5350',
      '#66bb6a',
    ],
    tooltip: {
      fillSeriesColor: false,
      theme: 'dark',
    },
    labels: [
      'New',
      'Awarded',
      'Quoted',
      'Not Awarded',
      'Cancelled',
    ],
  };

  const seriesDonut = quotationStats
    ? [
        quotationStats.New || 0,
        quotationStats.Awarded || 0,
        quotationStats.Quoted || 0,
        quotationStats['Not Awarded'] || 0,
        quotationStats.Cancelled || 0,
      ]
    : [];

  return (
    <Row>
      <Col md="12">
        <ComponentCard title="Quotation Statistics">
          <Form>
            {/* Add any form elements or filters if needed */}
          </Form>
          {quotationStats && (
            <Chart options={optionsDonut} series={seriesDonut} type="donut" height="350" />
          )}
        </ComponentCard>
      </Col>
    </Row>
  );
};

export default QuotationDonut;
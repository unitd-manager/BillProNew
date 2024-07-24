import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'reactstrap';
import Chart from 'react-apexcharts';
//import api from '../../constants/api';
import ComponentCard from '../ComponentCard';

const SalesInvoicePieChart = () => {
  const [salesInvoiceStats, setSalesInvoiceStats] = useState(null);

  // Function to fetch Sales Invoice statistics
  const fetchSalesInvoiceStats = () => {
    // Mock data for demonstration (replace with actual API call)
    const mockData = {
      paid: 50,
      overdue: 20,
      unpaid: 30,
    };
    setSalesInvoiceStats(mockData);
  };

  useEffect(() => {
    fetchSalesInvoiceStats(); // Fetch Sales Invoice statistics on component mount
  }, []);

  const optionsPieChart = {
    chart: {
      id: 'pie-chart',
      fontFamily: "'Rubik', sans-serif",
      type: 'pie',
    },
    labels: ['Paid', 'Overdue', 'Unpaid'],
    legend: {
      show: true,
      position: 'bottom',
      width: '50px',
      fontFamily: "'Montserrat', sans-serif",
      labels: {
        colors: '#8898aa',
      },
    },
    colors: ['#36a2eb', '#ff6384', '#ffce56'],
    tooltip: {
      fillSeriesColor: false,
      theme: 'dark',
    },
  };

  const seriesPieChart = salesInvoiceStats
    ? [salesInvoiceStats.paid || 0, salesInvoiceStats.overdue || 0, salesInvoiceStats.unpaid || 0]
    : [];

  return (
    <Row>
      <Col md="12">
        <ComponentCard title="Sales Invoice Statistics">
          <Form>
            {/* Add any form elements or filters if needed */}
          </Form>
          {salesInvoiceStats && (
            <Chart options={optionsPieChart} series={seriesPieChart} type="pie" height="350" />
          )}
        </ComponentCard>
      </Col>
    </Row>
  );
};

export default SalesInvoicePieChart;

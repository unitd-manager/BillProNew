import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import Chart from 'react-apexcharts';
import ComponentCard from '../ComponentCard';

const Payroll = () => {
  // Mock data for payroll distribution
  const [payrollData] = useState({
    categories: ['Salaries', 'Bonuses', 'Benefits', 'Taxes', 'Others'],
    amounts: [50000, 12000, 8000, 15000, 3000], // Amounts in USD for each expense category
  });

  useEffect(() => {
    // Fetch payroll distribution data from API if needed
    // Example API call: api.get('/payroll/distribution').then((response) => setPayrollData(response.data));
  }, []); // Empty dependency array means this effect runs once on component mount

  const optionsDonutChart = {
    chart: {
      id: 'payroll-donut-chart',
      fontFamily: "'Rubik', sans-serif",
      type: 'donut',
      height: '350',
    },
    labels: payrollData.categories,
    colors: ['#36a2eb', '#ff6384', '#ffce56', '#4bc0c0', '#e7e9ed'], // Colors for different expense categories
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

  const seriesDonutChart = payrollData.amounts;

  return (
    <Row>
      <Col md="12">
        <ComponentCard title="Payroll Distribution (Donut Chart)">
          {payrollData.categories.length > 0 ? (
            <Chart options={optionsDonutChart} series={seriesDonutChart} type="donut" height="350" />
          ) : (
            <p>No data available for the chart.</p>
          )}
        </ComponentCard>
      </Col>
    </Row>
  );
};

export default Payroll;

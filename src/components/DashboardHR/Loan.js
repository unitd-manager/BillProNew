import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import Chart from 'react-apexcharts';
import ComponentCard from '../ComponentCard';

const Loan = () => {
  // Mock data for loan statistics
  const [loanData] = useState({
    categories: ['Loan A', 'Loan B', 'Loan C'],
    series: [
      {
        name: 'Interest Rate',
        data: [3.5, 4.2, 5.0],
      },
      {
        name: 'Loan Amount',
        data: [50000, 75000, 100000],
      },
      {
        name: 'Repayment Period',
        data: [36, 48, 60],
      },
    ],
  });

  useEffect(() => {
    // Fetch loan statistics from API if needed
    // Example API call: api.get('/loan/stats').then((response) => setLoanData(response.data));
  }, []); // Empty dependency array means this effect runs once on component mount

  const optionsBarChart = {
    chart: {
      id: 'loan-bar-chart',
      fontFamily: "'Rubik', sans-serif",
      type: 'bar',
      height: '350',
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: loanData.categories,
      labels: {
        style: {
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Loan Details',
        style: {
          fontSize: '14px',
          fontWeight: 600,
        },
      },
    },
    colors: ['#36a2eb', '#ff6384', '#ffce56'], // Colors for different loan parameters
    tooltip: {
      theme: 'dark',
    },
  };

  const seriesBarChart = loanData.series.map((loan) => ({
    name: loan.name,
    data: loan.data,
  }));

  return (
    <Row>
      <Col md="12">
        <ComponentCard title="Loan Statistics (Bar Chart)">
          {loanData.categories.length > 0 ? (
            <Chart options={optionsBarChart} series={seriesBarChart} type="bar" height="350" />
          ) : (
            <p>No data available for the chart.</p>
          )}
        </ComponentCard>
      </Col>
    </Row>
  );
};

export default Loan;

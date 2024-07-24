import React from 'react';
import Chart from 'react-apexcharts';
import ComponentCard from '../../components/ComponentCard';

const ChartOfAccounts = () => {
  // Sample data representing chart of accounts by category
  const chartData = {
    categories: ['Assets', 'Liabilities', 'Equity', 'Revenue', 'Expenses'],
    values: [50000, 30000, 20000, 15000, 10000], // Example values for each category
  };

  const chartOptions = {
    chart: {
      type: 'bar',
      height: 350,
    },
    xaxis: {
      categories: chartData.categories,
    },
    title: {
      text: '',
      align: 'center',
    },
    colors: ['#088F8F'],
  };

  const chartSeries = [
    {
      name: 'Amount',
      data: chartData.values,
    },
  ];

  return (
    <div>
      <ComponentCard title="Chart of Accounts by Category">
      <Chart options={chartOptions} series={chartSeries} type="bar" height={350} />
      </ComponentCard>
    </div>
    
  );
};

export default ChartOfAccounts;
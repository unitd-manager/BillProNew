import React from 'react';
import Chart from 'react-apexcharts';
import ComponentCard from '../../components/ComponentCard';

const LowStockAlerts = () => {

  // Example data for product stock levels
  const productStockData = [
    { name: 'CRO Machine', stockLevel: 'Low', quantity: 5 },
    { name: 'CPR Machine', stockLevel: 'Need to Purchase', quantity: 10 },
    { name: 'Fibre', stockLevel: 'Medium', quantity: 15 },
  ];

  // Prepare data for the bar chart
  const barChartData = {
    labels: productStockData.map(product => product.name),
    series: [
      {
        name: 'Low',
        data: productStockData.map(product => ({
          x: product.name,
          y: product.stockLevel === 'Low' ? product.quantity : 0,
          fillColor: '#FF5733' // Red color for Low
        }))
      },
      {
        name: 'Need to Purchase',
        data: productStockData.map(product => ({
          x: product.name,
          y: product.stockLevel === 'Need to Purchase' ? product.quantity : 0,
          fillColor: '#FFD700' // Yellow color for Need to Purchase
        }))
      },
      {
        name: 'Medium',
        data: productStockData.map(product => ({
          x: product.name,
          y: product.stockLevel === 'Medium' ? product.quantity : 0,
          fillColor: '#FFA500' // Orange color for Medium
        }))
      }
    ],
    options: {
      chart: {
        toolbar: {
          show: false
        }
      }
    }
  };

  return (
    <div>
      <ComponentCard title="Low Stock Alerts">
      
        <Chart options={barChartData.options} series={barChartData.series} type="bar" height={350} />
      </ComponentCard>
    </div>
  );
};

export default LowStockAlerts;
import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import ComponentCard from '../../components/ComponentCard';

const PurchaseRequestChart = () => {
  const [chartData] = useState({
    options: {
      chart: {
        type: 'bar',
      },
      xaxis: {
        categories: ['Safa Construction', 'Mujahith Enfieldith', 'VVV construction'], // Company names
      },
      title: {
        text: 'Purchase Request Status by Company',
        align: 'center',
      },
    },
    series: [
      {
        name: 'Approved',
        data: [20, 15, 25], // Number of approved requests for each company
      },
      {
        name: 'Pending',
        data: [5, 7, 3], // Number of pending requests for each company
      },
    ],
  });

  return (
    <div>
       <ComponentCard title="Purchase Request Status">
      <Chart options={chartData.options} series={chartData.series} type="bar" height={350} />
      </ComponentCard>
    </div>
  );
};

export default PurchaseRequestChart;
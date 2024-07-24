import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import ComponentCard from '../../components/ComponentCard';

const ProductStats = () => {
  const [selectedCompany, setSelectedCompany] = useState('Company A');

  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  const [productChartData] = useState({
    options: {
      chart: {
        type: 'line',
        height: 350,
      },
      xaxis: {
        categories: ['CRP Machine', 'Meter Window', 'CPO machine', 'TERMINAL COVER FOR BATTERY', 'LOAD BREAK SWITCH '],
      },
      title: {
        text: '',
        align: 'center',
      },
      legend: {
        position: 'top',
      },
    },
    series: [
      {
        name: 'Quantity',
        data: [100, 150, 120, 200, 180], // Example data for product quantities
      },
    ],
  });

  return (
    <div>
      <ComponentCard title="Product Statistics by Product Type">
        <select value={selectedCompany} onChange={handleCompanyChange}>
          <option value="Company A">Materials</option>
          <option value="Company B">Equipment</option>
          <option value="Company C">Tools</option>
        </select>
        <Chart options={productChartData.options} series={productChartData.series} type="line" height={350} />
      </ComponentCard>
    </div>
  );
};

export default ProductStats;
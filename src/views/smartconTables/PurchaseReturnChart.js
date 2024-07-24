import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import ComponentCard from '../../components/ComponentCard';

const PurchaseReturnChart = () => {
  const [selectedCompany, setSelectedCompany] = useState('Company A');

  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  const [purchaseReturnChartData] = useState({
    options: {
      chart: {
        type: 'bar',
        stacked: true,
        height: 350,
      },
      xaxis: {
        categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      },
      title: {
        text: 'Total Purchase Return Data by Status',
        align: 'center',
      },
      legend: {
        position: 'top',
      },
    },
    series: [
      {
        name: 'New',
        data: [30, 40, 35, 50, 49, 60, 70], // Example data for 'New' status
      },
      {
        name: 'Returned',
        data: [20, 30, 25, 30, 40, 35, 45], // Example data for 'Returned' status
      },
      {
        name: 'Not Returned',
        data: [10, 15, 10, 20, 25, 15, 20], // Example data for 'Not Returned' status
      },
      {
        name: 'Cancelled',
        data: [5, 5, 5, 5, 5, 5, 5], // Example data for 'Cancelled' status
      },
    ],
  });

  return (
    <div>
      <ComponentCard title="Purchase Return History">
        <select value={selectedCompany} onChange={handleCompanyChange}>
          <option value="Company A">Al Wafaa Company</option>
          <option value="Company B">Kuwait Chemicals</option>
          <option value="Company C">C1 Water System</option>
        </select>
        <Chart options={purchaseReturnChartData.options} series={purchaseReturnChartData.series} type="bar" height={350} />
      </ComponentCard>
    </div>
  );
};

export default PurchaseReturnChart;


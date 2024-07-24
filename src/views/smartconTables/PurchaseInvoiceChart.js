import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import ComponentCard from '../../components/ComponentCard';

const PurchaseRequestChart = () => {
  const [selectedCompany, setSelectedCompany] = useState('Company A');

  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  const [invoiceStatusChartData] = useState({
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ['Paid', 'Unpaid', 'Partially Paid'],
        title: {
          text: 'Invoice Count',
        },
      },
      title: {
        text: '',
        align: 'center',
      },
    },
    series: [
      {
        name: 'Count',
        data: [50, 20, 30], // Example data for invoice counts by status
      },
    ],
  });

  return (
    <div>
      <ComponentCard title="Invoice Summary for Company">
        <select value={selectedCompany} onChange={handleCompanyChange}>
          <option value="Company A">MNM Company</option>
          <option value="Company B">Safa Construction</option>
          <option value="Company C">AAN Manufacturing</option>
        </select>
        <Chart options={invoiceStatusChartData.options} series={invoiceStatusChartData.series} type="bar" height={350} />
      </ComponentCard>
    </div>
  );
};

export default PurchaseRequestChart;
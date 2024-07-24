import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import ComponentCard from '../../components/ComponentCard';

const DebitNoteStats = () => {
  const [selectedCompany, setSelectedCompany] = useState('Company A');

  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  const [debitNoteChartData] = useState({
    options: {
      chart: {
        type: 'line',
        height: 350,
      },
      xaxis: {
        categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      },
      title: {
        text: 'Total Debit Note Amount Over Time',
        align: 'center',
      },
      legend: {
        position: 'top',
      },
    },
    series: [
      {
        name: 'Debit Amount',
        data: [3000, 3500, 4000, 3800, 4200, 3900, 4100], // Example data for debit note amounts over time
      },
    ],
  });

  return (
    <div>
      <ComponentCard title="Debit Note Statistics">
        <select value={selectedCompany} onChange={handleCompanyChange}>
          <option value="Company A">Al Wafaa Company</option>
          <option value="Company B">Kuwait Chemicals</option>
          <option value="Company C">C1 Water System</option>
        </select>
        <Chart options={debitNoteChartData.options} series={debitNoteChartData.series} type="line" height={350} />
      </ComponentCard>
    </div>
  );
};

export default DebitNoteStats;
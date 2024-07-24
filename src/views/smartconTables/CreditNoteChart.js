import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import ComponentCard from '../../components/ComponentCard';

const CreditNoteStats = () => {
  const [selectedCompany, setSelectedCompany] = useState('Company A');

  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  const [creditNoteChartData] = useState({
    options: {
      chart: {
        type: 'pie',
        height: 350,
      },
      labels: ['Pending', 'Approved', 'Rejected'],
      title: {
        text: 'Total Credit Note Data by Status',
        align: 'center',
      },
      legend: {
        position: 'bottom',
      },
    },
    series: [30, 70, 25], // Example data for 'Pending', 'Approved', 'Rejected' status
  });

  return (
    <div>
      <ComponentCard title="Credit Note History">
        <select value={selectedCompany} onChange={handleCompanyChange}>
          <option value="Company A">Al Wafaa Company</option>
          <option value="Company B">Kuwait Chemicals</option>
          <option value="Company C">C1 Water System</option>
        </select>
        <Chart options={creditNoteChartData.options} series={creditNoteChartData.series} type="pie" height={350} />
      </ComponentCard>
    </div>
  );
};

export default CreditNoteStats;
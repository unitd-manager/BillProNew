import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import ComponentCard from '../../components/ComponentCard';

const PurchaseRequestChart = () => {
  const [selectedCompany, setSelectedCompany] = useState('Company A');

  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  const [quoteRequestChartData] = useState({
    options: {
      chart: {
        type: 'pie',
      },
      labels: ['Awarded', 'Quoted', 'New', 'Not Awarded', 'Cancelled'],
      title: {
        text: '',
        align: 'center',
      },
    },
    series: [25, 15, 10, 20, 5], // Example data for each status
  });

  return (
    <div>
       <ComponentCard title="Quote Request Summary">
      <div>
     
    
        <select value={selectedCompany} onChange={handleCompanyChange}>
          <option value="Company A">Safa Construction</option>
          <option value="Company B">VVV Construction</option>
          <option value="Company C">Mujahith Company</option>
        </select>
      </div>
     
      <div>
        <Chart options={quoteRequestChartData.options} series={quoteRequestChartData.series} type="pie" height={350} />
      </div>
      </ComponentCard>
    </div>
  );
};

export default PurchaseRequestChart;
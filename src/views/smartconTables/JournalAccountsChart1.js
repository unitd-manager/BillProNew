import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import ComponentCard from '../../components/ComponentCard';

const JournalDataByAccount = () => {
  // Sample data representing journal data by account title
  const [selectedCompany, setSelectedCompany] = useState('Company A');
  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  const journalData = [
    { accountTitle: 'Account A', narration1: 'Narration 1', debit1: 1000, credit1: 0, narration2: 'Narration 2', debit2: 0, credit2: 500 },
    // More data...
  ];

  // Extract account titles from the data
  const accountTitles = journalData.map(entry => entry.accountTitle);

  // Extract debit and credit amounts for each narration
  const debitAmounts = journalData.map(entry => [entry.debit1, entry.debit2]);
  const creditAmounts = journalData.map(entry => [entry.credit1, entry.credit2]);

  const chartOptions = {
    chart: {
      type: 'bar',
      height: 350,
    },
    xaxis: {
      categories: accountTitles,
    },
    yaxis: {
      title: {
        text: 'Amount',
      },
    },
    title: {
      text: '',
      align: 'center',
    },
    legend: {
      position: 'top',
    },
  };

  const chartSeries = [
    {
      name: 'Debit',
      data: debitAmounts.map(amounts => amounts[0]),
    },
    {
      name: 'Credit',
      data: creditAmounts.map(amounts => amounts[1]),
    },

  ];

  return (
    <div>
      <ComponentCard title="Journal Data by Accounts">
      <div>
     
    
     <select value={selectedCompany} onChange={handleCompanyChange}>
       <option value="Company A">Account A</option>
       <option value="Company B">Account B</option>
       <option value="Company C">Account c</option>
     </select>
   </div>
  
        <Chart options={chartOptions} series={chartSeries} type="bar" height={350} />
      </ComponentCard>
    </div>
  );
};

export default JournalDataByAccount;
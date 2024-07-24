import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import ComponentCard from '../../components/ComponentCard';

const LedgerData = () => {
  // Sample ledger data
  const ledgerData = [
    { date: '2024-01-01', narration: 'Narration 1', debit: 1000, credit: 800 },
    { date: '2024-01-02', narration: 'Narration 2', debit: 250, credit: 500 },
    // More ledger entries...
  ];

  // Extract dates and amounts from the ledger data
  const dates = ledgerData.map(entry => entry.date);
  const debitAmounts = ledgerData.map(entry => entry.debit);
  const creditAmounts = ledgerData.map(entry => entry.credit);

  const [selectedAccount, setSelectedAccount] = useState('Account A');

  const handleAccountChange = (event) => {
    setSelectedAccount(event.target.value);
  };

  const chartOptions = {
    chart: {
      type: 'line',
      height: 350,
    },
    xaxis: {
      categories: dates,
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
      data: debitAmounts,
    },
    {
      name: 'Credit',
      data: creditAmounts,
    },
  ];

  return (
    <div>
      <ComponentCard title="Ledger Data By Accounts">
        <div>
          <select value={selectedAccount} onChange={handleAccountChange}>
            <option value="Account A">ICICI</option>
            <option value="Account B">Staff Salary</option>
            <option value="Account C">Account C</option>
          </select>
        </div>
        <Chart options={chartOptions} series={chartSeries} type="line" height={350} />
      </ComponentCard>
    </div>
  );
};

export default LedgerData;
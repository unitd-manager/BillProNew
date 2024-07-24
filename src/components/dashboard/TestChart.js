import React, { useState } from 'react';
import Chart from 'react-apexcharts';

function TestChart() {
  const [selectedValue, setSelectedValue] = useState('option1');
  const [chartData, setChartData] = useState({
    categories: ['January', 'February', 'March'],
    series: [
      {
        name: 'Series 1',
        data: [30, 40, 35],
      },
      {
        name: 'Series 2',
        data: [20, 10, 15],
      },
    ],
  });

  const handleDropdownChange = (event) => {
    setSelectedValue(event.target.value);
    const newData = {
      categories: ['January', 'February', 'March'],
      series: [
        {
          name: 'Series 1',
          data: [30],
        },
      ],
    };
    setChartData(newData);
  };

  return (
    <div>
      <select value={selectedValue} onChange={handleDropdownChange}>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </select>
      <Chart
        options={{ xaxis: { categories: chartData.categories } }}
        series={chartData.series}
        type="bar"
        height={350}
      />
    </div>
  );
}
export default TestChart;

import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import ComponentCard from '../../components/ComponentCard';

const PurchaseOrderDeliveryChart = () => {
  const [selectedCompany, setSelectedCompany] = useState('Company A');

  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  const [data] = useState({
    categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    purchaseOrders: [50, 60, 70, 80, 90, 100, 110], // Example data for purchase orders generated
    goodsDelivered: [40, 50, 60, 70, 80, 90, 100], // Example data for goods delivered
  });

  const [chartOptions] = useState({
    chart: {
      height: 350,
      type: 'line',
    },
    stroke: {
      width: [0, 2],
    },
    title: {
      text: '',
      align: 'center',
    },
    xaxis: {
      categories: data.categories,
    },
    yaxis: [
      {
        title: {
          text: 'Purchase Orders',
        },
      },
      {
        opposite: true,
        title: {
          text: 'Goods Delivered',
        },
      },
    ],
  });

  const [series] = useState([
    {
      name: 'Purchase Orders',
      type: 'bar',
      data: data.purchaseOrders,
    },
    {
      name: 'Goods Delivered',
      type: 'line',
      data: data.goodsDelivered,
      yAxisIndex: 1,
    },
  ]);

  return (
    <div>
      <ComponentCard title="Purchase Orders Generated and Goods Delivered">
        <select value={selectedCompany} onChange={handleCompanyChange}>
          <option value="Company A">Company A</option>
          <option value="Company B">Company B</option>
          <option value="Company C">Company C</option>
        </select>
        <Chart options={chartOptions} series={series} type="line" height={350} />
      </ComponentCard>
    </div>
  );
};

export default PurchaseOrderDeliveryChart;
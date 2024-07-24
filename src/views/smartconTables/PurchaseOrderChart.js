import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import ComponentCard from '../../components/ComponentCard';

const PurchaseRequestChart = () => {
  const [selectedSupplier, setSelectedSupplier] = useState('Supplier X');

  const handleSupplierChange = (event) => {
    setSelectedSupplier(event.target.value);
  };


  const [purchaseOrderChartData] = useState({
    options: {
      chart: {
        type: 'donut',
      },
      labels: [
        'In Progress',
        'Sent to Supplier',
        'Order Acknowledged',
        'Partially Received',
        'Closed',
        'On Hold',
        'Cancelled',
      ],
      colors: ['#C2B280', '#C70039', '#008080', '#770737', '#808000', '#F88379', '#71797E'],
      title: {
        text: '',
        align: 'center',
      },
    },
    series: [25, 20, 15, 10, 8, 12, 5], // Example data for each status
  });

  return (
      <div>
            <ComponentCard title="Purchase Order Stats by Supplier">
        <select value={selectedSupplier} onChange={handleSupplierChange}>
          <option value="Supplier X">ASD Pvt Ltd</option>
          <option value="Supplier Y">TMS Pvt Ltd</option>
          <option value="Supplier Z">SDO Pvt Ltd</option>
        </select>
        <Chart options={purchaseOrderChartData.options} series={purchaseOrderChartData.series} type="donut" height={350} />
        </ComponentCard>
      </div>
    
  );
};

export default PurchaseRequestChart;
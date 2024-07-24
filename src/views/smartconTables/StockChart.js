import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import ComponentCard from '../../components/ComponentCard';

const ProductComparisonStats = () => {

  const [productComparisonChartData] = useState({
    options: {
      chart: {
        type: 'scatter',
        height: 350,
      },
      xaxis: {
        categories: ['CRP Machine', 'Meter Window', 'CPO machine', 'TERMINAL COVER FOR BATTERY',  'LOAD BREAK SWITCH '],
      },
      yaxis: {
        title: {
          text: 'Quantity',
        },
      },
      title: {
        text: 'Product Stock vs Purchase Order Products',
        align: 'center',
      },
      legend: {
        position: 'top',
      },
    },
    series: [
      {
        name: 'Product Stock',
        data: [
          [0, 100], // Product A
          [1, 150], // Product B
          [2, 120], // Product C
          [3, 200], // Product D
          [4, 180], // Product E
        ],
      },
      {
        name: 'Purchase Order Products',
        data: [
          [0, 80], // Product A
          [1, 120], // Product B
          [2, 100], // Product C
          [3, 180], // Product D
          [4, 150], // Product E
        ],
      },
    ],
  });

  return (
    <div>
      <ComponentCard title="Product Comparison Statistics">
      
        <Chart options={productComparisonChartData.options} series={productComparisonChartData.series} type="scatter" height={350} />
      </ComponentCard>
    </div>
  );
};

export default ProductComparisonStats;


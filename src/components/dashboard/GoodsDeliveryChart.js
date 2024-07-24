import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'reactstrap';
import Chart from 'react-apexcharts';
// import api from '../../constants/api'; // Uncomment and import your API module here
import ComponentCard from '../ComponentCard';

const GoodsDeliveryChart = () => {
  const [deliveryData, setDeliveryData] = useState(null);

  // Function to fetch goods delivery data
  const fetchDeliveryData = () => {
    // Mock data for demonstration (replace with actual API call)
    const mockData = [
      { x: 'Product A', y: 30, z: 20 }, // Product A delivery data (x: Product name, y: Quantity, z: Distance)
      { x: 'Product B', y: 45, z: 25 }, // Product B delivery data
      { x: 'Product C', y: 40, z: 20 }, // Product C delivery data
      { x: 'Product D', y: 25, z: 18 }, // Product D delivery data
      { x: 'Product E', y: 35, z: 18 }, // Product D delivery data

    ];
    setDeliveryData(mockData);
  };

  useEffect(() => {
    fetchDeliveryData(); // Fetch goods delivery data on component mount
  }, []);

  const optionsBubbleChart = {
    chart: {
      id: 'bubble-chart',
      fontFamily: "'Rubik', sans-serif",
      type: 'bubble',
      height: '400',
    },
    xaxis: {
      title: {
        text: 'Product Name',
        style: {
          fontSize: '14px',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Quantity',
        style: {
          fontSize: '14px',
        },
      },
    },
    fill: {
      opacity: 0.8,
    },
    legend: {
      show: true,
      position: 'bottom',
      width: '100px',
      fontFamily: "'Montserrat', sans-serif",
      labels: {
        colors: '#8898aa',
      },
    },
    tooltip: {
      theme: 'dark',
      x: {
        formatter(val) {
          return `Product: ${val}`;
        },
      },
      y: {
        formatter(val) {
          return `Quantity: ${val}`;
        },
      },
      z: {
        formatter(val) {
          return `Distance: ${val}`;
        },
      },
    },
  };

  const seriesBubbleChart = [
    {
      name: 'Goods Delivery',
      data: deliveryData || [],
    },
  ];

  return (
    <Row>
      <Col md="12">
        <ComponentCard title="Goods Delivery Statistics">
          <Form>
            {/* Add any form elements or filters if needed */}
          </Form>
          {deliveryData && (
            <Chart options={optionsBubbleChart} series={seriesBubbleChart} type="bubble" height="350" />
          )}
        </ComponentCard>
      </Col>
    </Row>
  );
};

export default GoodsDeliveryChart;

import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'reactstrap';
import Chart from 'react-apexcharts';
//import api from '../../constants/api'; // Uncomment and import your API module here
import ComponentCard from '../ComponentCard';

const SalesReturnChart = () => {
  const [salesReturnData, setSalesReturnData] = useState(null);

  // Function to fetch sales return data
  const fetchSalesReturnData = () => {
    // Mock data for demonstration (replace with actual API call)
    const mockData = {
      value: 65, // Value to display on the gauge (e.g., sales return percentage)
      min: 0, // Minimum value (e.g., 0%)
      max: 100, // Maximum value (e.g., 100%)
    };
    setSalesReturnData(mockData);
  };

  useEffect(() => {
    fetchSalesReturnData(); // Fetch sales return data on component mount
  }, []);

  const optionsGaugeChart = {
    chart: {
      id: 'gauge-chart',
      fontFamily: "'Rubik', sans-serif",
      type: 'radialBar',
      offsetY: 0,
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%',
        },
        dataLabels: {
          showOn: 'always',
          name: {
            offsetY: -10,
            fontSize: '14px',
            color: '#888',
          },
          value: {
            offsetY: 5,
            fontSize: '22px',
            color: '#111',
            formatter(val) {
              return `${val}%`;
            },
          },
        },
      },
    },
    fill: {
      colors: ['#745af2'],
    },
    stroke: {
      lineCap: 'round',
    },
    labels: ['Sales Return'],
    title: {
      text: 'Sales Return Percentage',
      align: 'center',
      style: {
        fontSize: '20px',
        color: '#333',
      },
    },
    min: salesReturnData?.min || 0,
    max: salesReturnData?.max || 100,
  };

  const seriesGaugeChart = [salesReturnData?.value || 0];

  return (
    <Row>
      <Col md="12">
        <ComponentCard title="Sales Return Percentage">
          <Form>
            {/* Add any form elements or filters if needed */}
          </Form>
          {salesReturnData && (
            <Chart
              options={optionsGaugeChart}
              series={seriesGaugeChart}
              type="radialBar"
              height="350"
            />
          )}
        </ComponentCard>
      </Col>
    </Row>
  );
};

export default SalesReturnChart;

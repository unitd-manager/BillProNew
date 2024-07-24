import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import Chart from 'react-apexcharts';
import ComponentCard from '../ComponentCard';

const JobInfo = () => {
  const [jobInfoData, setJobInfoData] = useState(null);

  // Function to fetch job information data
  const fetchJobInfoData = () => {
    // Mock data for demonstration (replace with actual API call)
    const mockData = [
      { x: 'Job A', y: 70, z: 80 }, // Job A data (x: Job name, y: Efficiency, z: Quality)
      { x: 'Job B', y: 60, z: 75 }, // Job B data
      { x: 'Job C', y: 85, z: 90 }, // Job C data
      { x: 'Job D', y: 65, z: 70 }, // Job D data
      { x: 'Job E', y: 80, z: 85 }, // Job E data
    ];
    setJobInfoData(mockData);
  };

  useEffect(() => {
    fetchJobInfoData(); // Fetch job information data on component mount
  }, []);

  const optionsBubbleChart = {
    chart: {
      id: 'job-info-bubble-chart',
      fontFamily: "'Rubik', sans-serif",
      type: 'bubble',
      height: '400',
    },
    xaxis: {
      title: {
        text: 'Job Name',
        style: {
          fontSize: '14px',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Efficiency',
        style: {
          fontSize: '14px',
        },
      },
    },
    zaxis: {
      title: {
        text: 'Quality',
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
          return `Job: ${val}`;
        },
      },
      y: {
        formatter(val) {
          return `Efficiency: ${val}`;
        },
      },
      z: {
        formatter(val) {
          return `Quality: ${val}`;
        },
      },
    },
  };

  const seriesBubbleChart = [
    {
      name: 'Job Information',
      data: jobInfoData || [],
    },
  ];

  return (
    <Row>
      <Col md="12">
        <ComponentCard title="Job Information Statistics">
          {jobInfoData && (
            <Chart options={optionsBubbleChart} series={seriesBubbleChart} type="bubble" height="350" />
          )}
        </ComponentCard>
      </Col>
    </Row>
  );
};

export default JobInfo;

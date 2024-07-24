import React, { useState, useEffect } from 'react';
import { Form, Row, Col, FormGroup, Label, Input } from 'reactstrap';
import Chart from 'react-apexcharts';
import ComponentCard from '../ComponentCard';
import api from '../../constants/api';

const Subcon = () => {
  const [subconData, setSubconData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subcons, setSubcons] = useState([]);
  const [selectedSubcon, setSelectedSubcon] = useState('');

  // Function to fetch job order data
  const fetchSubconData = async (subconId) => {
    setLoading(true);
    try {
      const { data: { data } } = await api.get('/subcon/getJobOrderChart', {
        params: { sub_con_id: subconId }
      });

      // Process data to get counts of job statuses
      const jobStatuses = [
        'New', 'Awarded', 'Quoted', 'Not Awarded', 'Completed', 'Cancelled'
      ];

      const jobStatusCounts = jobStatuses.map(status => ({
        status,
        count: 0
      }));

      data.forEach(({ job_status: jobStatus }) => {
        const statusIndex = jobStatuses.indexOf(jobStatus);
        if (statusIndex !== -1) {
          jobStatusCounts[statusIndex].count++;
        }
      });

      const categories = jobStatusCounts.map(({ status }) => status);
      const seriesData = jobStatusCounts.map(({ count }) => count);

      const chartData = {
        categories,
        series: [
          {
            name: 'Job Orders',
            data: seriesData,
          },
        ],
      };

      setSubconData(chartData);
    } catch (error) {
      console.log("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch subcontractors
  const fetchSubcons = async () => {
    try {
      const { data: { data } } = await api.get('/subcon/getSubconChart'); // Replace with actual API endpoint
      setSubcons(data);
    } catch (error) {
      console.log("Error fetching subcontractors: ", error);
    }
  };

  useEffect(() => {
    fetchSubcons();
    if (selectedSubcon) {
      fetchSubconData(selectedSubcon);
    } else {
      setLoading(false);
    }
  }, [selectedSubcon]);

  const optionsBarChart = {
    chart: {
      id: 'subcon-bar-chart',
      fontFamily: "'Rubik', sans-serif",
      type: 'bar',
      height: '350',
    },
    xaxis: {
      categories: subconData?.categories || [],
      labels: {
        style: {
          colors: '#263238',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Number of Job Orders',
        style: {
          fontSize: '14px',
          fontWeight: 600,
        },
      },
    },
    colors: ['#36a2eb', '#4bc0c0', '#f36c60', '#ff9f40', '#ff6384', '#a36ac7'], // Custom colors for each status
    legend: {
      show: false,
    },
    tooltip: {
      theme: 'dark',
    },
  };

  const seriesBarChart = [
    {
      name: 'Job Orders',
      data: subconData?.series[0]?.data || [],
    },
  ];

  return (
    <Row>
      <Col md="12">
        <ComponentCard title="Subcontractor Job Orders">
          <Form>
            <FormGroup>
              <Label for="subconSelect">Select Subcontractor</Label>
              <Input
                type="select"
                name="subcon"
                id="subconSelect"
                value={selectedSubcon}
                onChange={(e) => setSelectedSubcon(e.target.value)}
              >
                <option value="">All Subcontractors</option>
                {subcons.map((subcon) => (
                  <option key={subcon.sub_con_id} value={subcon.sub_con_id}>
                    {subcon.company_name}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Form>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Chart options={optionsBarChart} series={seriesBarChart} type="bar" height="350" />
          )}
        </ComponentCard>
      </Col>
    </Row>
  );
};

export default Subcon;
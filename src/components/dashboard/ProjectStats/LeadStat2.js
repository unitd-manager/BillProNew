import React, { useState, useEffect } from 'react';
import { Col, FormGroup, Label, Input, Row, Form } from 'reactstrap';
import Chart from 'react-apexcharts';
import { Link } from 'react-router-dom';
import api from '../../../constants/api';
import ComponentCard from '../../ComponentCard';

export default function LeadStat2() {
  const [leadData, setLeadData] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");

  const fetchData = () => {
  
    api.get('/stats/getLeadYear', { params: { year: selectedYear } })
      .then((response) => {
        console.log('API Response:', response.data);
  
        if (response.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
          const newLeadData = response.data.data; // Access data from the 'data' property
          console.log('New Lead Data:', newLeadData);
          setLeadData(newLeadData);
        } else {
          setLeadData([]);
          console.log('No data available.');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLeadData([]);
        console.log('No data available.');
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };
  
  
  const getYears = () => {
    const currentYear = new Date().getFullYear();
    const nextYears = Array.from({ length: currentYear + 5 - 2023 }, (_, index) => 2023 + index);
    setYears(nextYears);
    // setSelectedYear(nextYears[0]);
  };

  console.log('X-Axis Categories:', leadData.map((item) => item.month_year));
  console.log('Y-Axis Data:', leadData.map((item) => item.total_lead_titles));

  useEffect(() => {
    getYears();
  }, []);

  useEffect(() => {
    if (selectedYear) {
      fetchData(selectedYear);
    }
  }, [selectedYear]);

  const options = {
    colors: ['#745af2'],
    chart: {
      fontFamily: "'Rubik', sans-serif",
    },
    xaxis: {
      categories: leadData.map((item) => item.month_year),
      title: {
        text: 'Month-Year',
        offsetX: 0,
        offsetY: 0,
        style: {
          fontSize: '12px',
        },
      },
      labels: {
        style: {
          cssClass: 'grey--text lighten-2--text fill-color',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Number of Leads',
        offsetX: 0,
        offsetY: 0,
        style: {
          fontSize: '12px',
        },
      },
      labels: {
        style: {
          cssClass: 'grey--text lighten-2--text fill-color',
        },
        formatter(val) {
          return val;
        },
      },
    },
    grid: {
      borderColor: 'rgba(0,0,0,0.1)',
    },
    legend: {
      show: true,
      position: 'bottom',
      width: '50px',
      fontFamily: "'Montserrat', sans-serif",
      labels: {
        colors: '#8898aa',
      },
    },
  };

  const series = [
    {
      name: 'Number of Leads',
      data: leadData.map((item) => item.total_lead_titles),
    },
  ];

  return (
    <Row>
      <Col md="12">
        <ComponentCard title="Lead Stats 2">
          <Form>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label>Select Year</Label>
                  <Input
                    type="select"
                    value={selectedYear}
                    onChange={(e) => {
                      const year = e.target.value;
                      setSelectedYear(year);
                    }}
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </Form>
          {/* {isLoading ? (
            <p>Loading...</p>
          ) : ( */}
            {/* leadData.length > 0 && ( */}
            <Link to="/Lead">
              <Chart options={options} series={series} type="bar" height="280" />
              </Link>
            {/* ) */}
          {/* )} */}
        </ComponentCard>
      </Col>
    </Row>
  );
}

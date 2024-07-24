import React, { useState, useEffect } from 'react';
import { Col, FormGroup, Label, Input, Row, Form, Button } from 'reactstrap';
import Chart from 'react-apexcharts';
import { Link } from 'react-router-dom';
import api from '../../constants/api';
import ComponentCard from '../ComponentCard';

export default function LeadStats() {
  const [taskTitles, setTaskTitles] = useState([]);
  const [actualHourData, setActualHourData] = useState([]);
  const [months] = useState([
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [leadID, setLeadId] = useState(false);


  const HourData = () => {
    setIsLoading(true);
    setShowChart(false);
  
    api.get('/stats/getInvoice', { params: { month: selectedMonth } })
      .then((response) => {
        setIsLoading(false);
  
        if (response.data && response.data.data && response.data.data.length > 0) {
          const hourData = response.data.data;
          console.log('hourData',hourData)
          // Filter data based on the selected year and month
          const filteredData = hourData.filter(item => {
            const dateObject = new Date(item.invoice_date);
            return  dateObject.getMonth() === months.indexOf(selectedMonth);
          });
          
          const titles = filteredData.map((item) => item.invoice_code);
          const actualHours = filteredData.map((item) => item.source_type);

          const ids = filteredData.map((item) => item.invoice_id); // Extract lead IDs

          setLeadId(ids); // Update lead IDs state


  
          setTaskTitles(titles);
          setActualHourData(actualHours);
          setShowChart(true);
        } else {
          setTaskTitles([]);
          setActualHourData([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
        setShowChart(true);
      });
  };
  

  useEffect(() => {
    HourData();
  }, [selectedMonth]);

  const optionscolumn = {
    colors: ['#745af2', '#263238'],
    chart: {
      fontFamily: "'Rubik', sans-serif",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: 'rounded',
        columnWidth: '55%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: taskTitles,
      labels: {
        style: {
          cssClass: 'grey--text lighten-2--text fill-color',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Date',
        color: '#8898aa',
      },
      labels: {
        style: {
          cssClass: 'grey--text lighten-2--text fill-color',
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter(val) {
          return `${val} `;
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

  const seriescolumn = [
    {
      name: 'Sales Count',
      data: actualHourData,
    },
  ];

  return (
    <Row>
      <Col md="12">
        <ComponentCard title="Sales Performance">
          <Form>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label>Select Month</Label>
                  <Input
                    type="select"
                    value={selectedMonth}
                    onChange={(e) => {
                      const month = e.target.value;
                      setSelectedMonth(month);
                    }}
                  >
                    {months.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={12} className="mt-3">
                <Button color="primary" onClick={HourData}>
                  {isLoading ? "Loading..." : "Go"}
                </Button>
              </Col>
            </Row>
          </Form>
          {showChart && (
  <Link to={`/LeadEdit/${leadID[0]}`}>
  <Chart options={optionscolumn} series={seriescolumn} type="bar" height="280" />
</Link>

)}
        </ComponentCard>
      </Col>
    </Row>
  );
};
import React, { useEffect, useState } from 'react';
import { Col, FormGroup, Label, Input, Row } from 'reactstrap';
import Chart from 'react-apexcharts';
import { Link } from 'react-router-dom';
import ComponentCard from '../../ComponentCard';
import api from '../../../constants/api';

const LeadCallStats = () => {
  const [coldCallCountsData, setColdCallCountsData] = useState([]);
  const [leadTitles, setLeadTitles] = useState([]);
  const [projects, setProjects] = useState([]);
  const [LeadID, setLeadId] = useState(false);
  const [months] = useState([
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]);
  const [selectedMonth, setSelectedMonth] = useState('');

  const fetchLeadData = (selectedEmployeeId) => {
    api
      .post('/lead/getLeadsById', { employee_id: selectedEmployeeId })
      .then((response) => {
        if (response.data && response.data.data && response.data.data.length > 0) {
          const leadData = response.data.data;

          // Filter lead data where cold_call is equal to 1 and count cold calls for each lead
          const coldCallCounts = leadData.map((item) => ({
            leadId: item.lead_id,
            leadTitle: item.lead_title,
            coldCallCount: item.cold_call === 1 ? 1 : 0,
          }));
          console.log('leadlength', leadData.length);
          // Set the lead ID using the first lead's ID
          const firstLeadId = leadData.length > 0 ? leadData[0].lead_id : null;
          setLeadId(firstLeadId);
          // Calculate total cold call count for each lead
          const groupedColdCallCounts = coldCallCounts.reduce((accumulator, currentValue) => {
            accumulator[currentValue.leadTitle] =
              (accumulator[currentValue.leadTitle] || 0) + currentValue.coldCallCount;
            return accumulator;
          }, {});

          // Update state with the cold call counts for each lead
          setColdCallCountsData(Object.values(groupedColdCallCounts));
          setLeadTitles(Object.keys(groupedColdCallCounts));
        } else {
          // If there are no leads, reset the cold call counts
          setColdCallCountsData([]);
          setLeadTitles([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    api
      .get('lead/getEmployeeName')
      .then((res) => {
        setProjects(res.data.data);
      })
      .catch((error) => {
        console.log('Error fetching projects:', error);
      });
  }, []);

  const options = {
    colors: ['#745af2'],
    chart: {
      fontFamily: "'Rubik', sans-serif",
      type: 'bar',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: 'rounded',
        columnWidth: '55%',
      },
      events: {
        dataPointSelection: (event, chartContext, config) => {
          const selectedLeadTitle = leadTitles[config.dataPointIndex];
          const selectedLead = LeadID.find((lead) => lead.leadTitle === selectedLeadTitle);
          const selectedLeadId = LeadID.find((lead) => lead.leadId === selectedLeadTitle);
          console.log('1', selectedLead);
          console.log('select', selectedLeadId);
          if (selectedLead) {
            window.location.href = `/LeadEdit/${selectedLeadId}`;
          } else {
            console.error('Lead not found for selected lead title:', selectedLeadTitle);
          }
        },
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
      categories: leadTitles,
      labels: {
        style: {
          cssClass: 'grey--text lighten-2--text fill-color',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Cold Call Count',
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
          return val;
        },
      },
    },
    grid: {
      borderColor: 'rgba(0,0,0,0.1)',
    },
    legend: {
      show: false,
    },
  };

  const series = [
    {
      name: 'Cold Call Count',
      data: coldCallCountsData,
    },
  ];

  return (
    <Row>
      <Col md="12">
        <ComponentCard title="Lead Call Statistics">
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
            <Col md={6}>
              <FormGroup>
                <Label for="projectSelect">Select Employee</Label>
                <Input
                  type="select"
                  name="employee_id"
                  onChange={(e) => {
                    const selectedEmployeeId = e.target.value;
                    fetchLeadData(selectedEmployeeId);
                  }}
                >
                  <option value="">Select Employee</option>
                  {projects &&
                    projects.map((element) => (
                      <option key={element.employee_id} value={element.employee_id}>
                        {element.first_name}
                      </option>
                    ))}
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Link to={`/LeadEdit/${LeadID}`}>
            <Chart options={options} series={series} type="bar" height="300" />
          </Link>
        </ComponentCard>
      </Col>
    </Row>
  );
};

export default LeadCallStats;

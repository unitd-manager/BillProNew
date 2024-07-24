import React, { useEffect, useState } from 'react';
import { Col, FormGroup, Label, Input,Row } from 'reactstrap';
import Chart from 'react-apexcharts';
import ComponentCard from '../ComponentCard';
import api from '../../constants/api';

const MaterrialIssueChart = () => {
  const [taskTitles, setTaskTitles] = useState([]);
  const [actualHourData, setActualHourData] = useState([]);
  //const [estimatedHourData, setEstimatedHourData] = useState([]);
  const [projects, setProjects] = useState([]);

  const HourData = (selectedProjectId) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based
        const yyyy = date.getFullYear(); // Get the last two digits of the year
    
        // Pad day and month with leading zeros if needed
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;
        //const formattedYear = year.toString().slice(-2); // Get the last two digits of the year
  
        return `${formattedDay}.${yyyy}.${formattedMonth}`;
      };
    // Make API call to retrieve the data
    api.post('/MaterialIssue/getMaterialIssuesById', { project_id: selectedProjectId })
      .then((response) => {
        // Check if the response data is not empty
        if (response.data && response.data.data && response.data.data.length > 0) {
          // Assuming the response data is an array of objects with keys: milestone_title, actual_completed_date, and to_date
          const hourData = response.data.data;
          const milestoneData = hourData.map((item) => ({
            title: item.title,
            actualDate: formatDate(item.material_issue_date), // Convert to local date string
            //estimatedDate: item.reason_for_issue, // Convert to local date string
          }));

          setTaskTitles(milestoneData.map((item) => item.title));
          setActualHourData(milestoneData.map((item) => item.actualDate));
          //setEstimatedHourData(milestoneData.map((item) => item.estimatedDate));
        } else {
          // If the response data is empty, reset the state to show an empty chart or display a message
          setTaskTitles([]);
          setActualHourData([]);
          //setEstimatedHourData([]);
        }
      })
      .catch((error) => {
        console.log('Error fetching data:', error);
      });
  };

  useEffect(() => {
    api.get('project/getProjects')
      .then((res) => {
        setProjects(res.data.data);
      })
      .catch((error) => {
        console.log('Error fetching projects:', error);
      });
  }, []);

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
          return val; // Since the date is already in the format you want, simply return it as is
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
      name: 'Material Issue Date',
      data: actualHourData,
    },
    
  ];

  return (
    <Row>
      <Col md="12">
      <ComponentCard title="Material Issue Chart">
        <FormGroup>
          <Label for="projectSelect">Select Project</Label>
          <Input
            type="select"
            name="project_id"
            onChange={(e) => {
              const selectedProjectId = e.target.value;
              HourData(selectedProjectId);
            }}
          >
            <option value="">Select Project</option>
            {projects &&
              projects.map((element) => (
                <option key={element.project_id} value={element.project_id}>
                  {element.title}
                </option>
              ))}
          </Input>
        </FormGroup>

        
          <Chart options={optionscolumn} series={seriescolumn} type="bar" height="300" />
 
      </ComponentCard>
    </Col>
    </Row>

  );
};

export default MaterrialIssueChart;

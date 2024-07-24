import React, { useEffect, useState } from 'react';
import { Col, FormGroup, Label, Input,Row } from 'reactstrap';
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';
import ComponentCard from '../../ComponentCard';
import api from '../../../constants/api';

export default function MilestoneStatsProject({ id }) {
    MilestoneStatsProject.propTypes = {
      id: PropTypes.any,
    };
  const [taskTitles, setTaskTitles] = useState([]);
  const [actualHourData, setActualHourData] = useState([]);
  const [estimatedHourData, setEstimatedHourData] = useState([]);
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
    api.post('/stats/getMilestoneCompletedStats', { project_id: selectedProjectId })
      .then((response) => {
        // Check if the response data is not empty
        if (response.data && response.data.data && response.data.data.length > 0) {
          // Assuming the response data is an array of objects with keys: milestone_title, actual_completed_date, and to_date
          const hourData = response.data.data;
          const milestoneData = hourData.map((item) => ({
            title: item.milestone_title,
            actualDate: formatDate(item.actual_completed_date),  // Convert to local date string
            estimatedDate: formatDate(item.to_date)// Convert to local date string
          }));

          setTaskTitles(milestoneData.map((item) => item.title));
          setActualHourData(milestoneData.map((item) => item.actualDate));
          setEstimatedHourData(milestoneData.map((item) => item.estimatedDate));
        } else {
          // If the response data is empty, reset the state to show an empty chart or display a message
          setTaskTitles([]);
          setActualHourData([]);
          setEstimatedHourData([]);
        }
      })
      .catch((error) => {
        console.log('Error fetching data:', error);
      });
  };
  const getJobs = () => {
    api
      .post('projecttask/getProjectTitleById', { project_id: id })
      .then((res) => {
        setProjects(res.data.data);
      })
      .catch(() => {});
  };

  // Get the list of employees from the API
  useEffect(() => {
    getJobs();
  }, [id]);

//   useEffect(() => {
//     api.get('projecttask/getProjectTitle')
//       .then((res) => {
//         setProjects(res.data.data);
//       })
//       .catch((error) => {
//         console.log('Error fetching projects:', error);
//       });
//   }, []);

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
      width: 1,
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
      name: 'Actual Completed Date',
      data: actualHourData,
    },
    {
      name: 'Estimated Date',
      data: estimatedHourData,
    },
  ];

  return (
    <Row>
      <Col md="12">
      <ComponentCard title="Milestone Statistics">
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

        
          <Chart options={optionscolumn} series={seriescolumn} type="bar" height="280" />
     
      </ComponentCard>
    </Col>
    </Row>

  );
};


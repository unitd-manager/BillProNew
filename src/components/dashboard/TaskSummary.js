import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Row, Col, CardBody } from 'reactstrap';
import Chart from 'react-apexcharts';
import api from '../../constants/api';
import ComponentCard from '../ComponentCard';
import message from '../Message';

const TaskSummary = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeStats, setEmployeeStats] = useState([]);
  const [data, setData] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const getEmployees = () => {
    api.get('jobinformation/getEmployee')
    .then((res) => {
      setEmployees(res.data.data);
      })
      .catch(() => {});
  };

  const getProjectId = (projectId) => {
    api
      .post('/projecttask/getProjectTitleId', { employee_id: projectId })
      .then((res) => {
        setProjects(res.data.data);
      })
      .catch(() => {
        message('Task not found', 'info');
      });
  };
  // Get the list of employees from the API
  useEffect(() => {
    getEmployees();     
  }, []);

  // Get the employee and project-specific statistics based on the selected employee and project
  useEffect(() => {
    if (selectedProject) {
      api.post('/projecttask/getStatsEmployeeId', { employee_id: selectedEmployeeId, project_id: selectedProject })
        .then((res) => {
          setData(res.data.data);
        })
        .catch(() => {});
      
      api.post('/projecttask/getStatsId', { employee_id: selectedEmployeeId, project_id: selectedProject })
        .then((res) => {
          setEmployeeStats(res.data.data);
        })
        .catch(() => {});
    }
  }, [selectedProject, selectedEmployeeId]);

  useEffect(() => { 
    if (data && data.employee_id) {
      const selectedEmpProject = data.employee_id;
      getProjectId(selectedEmpProject);
    }
  }, [data && data.employee_id]);


  const optionsPie = {
    chart: {
      id: 'pie-chart',
      fontFamily: "'Rubik', sans-serif",
    },
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      pie: {
        pie: {
          size: '70px',
        },
      },
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
    colors: [
      'rgb(30, 136, 229)',
      'rgb(38, 198, 218)',
      'rgb(17, 249, 232)',
      'rgb(116, 90, 242)',
      '#ef5350',
    ],
    tooltip: {
      fillSeriesColor: false,
      theme: 'dark',
    },
    labels: [
      'Completed Tasks',
      'Pending Tasks',
      'In Progress Tasks',
      'On Hold Tasks',
    ],
  };

  const seriesPie = employeeStats
  ? [
      employeeStats[0]?.completed_tasks || 0,
      employeeStats[0]?.pending_tasks || 0,
      employeeStats[0]?.in_progress_tasks || 0,
      employeeStats[0]?.on_hold_tasks || 0,
    ]
  : [];
    
  return (
    <Row>
      <Col md="12">
      <ComponentCard title="Task Summary">
          <Form>
            <FormGroup>
              <Label for="employeeSelect">Select Employee</Label>
              <Input
                type="select"
                name="employee_id"
                onChange={(e) => {
                  const selectedId = e.target.value;
                  setSelectedEmployeeId(selectedId);
                  getProjectId(selectedId);
                }}
              >
                <option value="">Select Employee</option>
                {employees &&
                  employees.map((element) => (
                    <option key={element.employee_id} value={element.employee_id}>
                      {element.first_name}
                    </option>
                  ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="projectSelect">Select Project</Label>
              <Input
                type="select"
                name="project_id"
                onChange={(e) => {
                  const selectedProjectId = e.target.value;
                  setSelectedProject(selectedProjectId);
                }}
              >
                <option value="">Select Project</option>
                {projects &&
                  projects.map((project) => (
                    <option key={project.employee_id} value={project.project_id}>
                      {project.title}
                    </option>
                  ))}
              </Input>
            </FormGroup>
            <CardBody>
              {data &&
                data.map((ele) => (
                  <Row key={ele.project_task_id}>
                    <Col md="6">
        <Row>
                        <Label>
                          <b>Project:</b> {ele.title}
                        </Label>
                      </Row>
                    </Col>
                  </Row>
                ))}
            </CardBody>
          </Form>
          {employeeStats && (
          <Chart options={optionsPie} series={seriesPie} type="pie" height="270" />
        )}
        </ComponentCard>
      </Col>
   
    </Row>
  );
};

export default TaskSummary;

import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import Chart from 'react-apexcharts';
import api from '../../constants/api';
import ComponentCard from '../ComponentCard';

const RequestForQuotePie = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeStats, setEmployeeStats] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const getJobs = () => {
    api.get('supplier/getSupplier')
    .then((res) => {
      setEmployees(res.data.data);
      })
      .catch(() => {});
  };

 
  // Get the list of employees from the API
  useEffect(() => {
   getJobs();     
  }, []);

  // Get the employee and project-specific statistics based on the selected employee and project
  useEffect(() => {
  
      api.post('/supplier/getStatsEmployeeId', { supplier_id: selectedEmployeeId })
        .then(() => {
        })
        .catch(() => {});
      
      api.post('/supplier/getStatsId', { supplier_id: selectedEmployeeId })
        .then((res) => {
          setEmployeeStats(res.data.data);
        })
        .catch(() => {});
    
  }, [ selectedEmployeeId]);

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
      'New',
      'Quoted',
      'Awarded',
      'NotAwarded',
      'Cancelled',
    ],
  };

  const seriesPie = employeeStats
  ? [
      employeeStats[0]?.new || 0,
      employeeStats[0]?.quoted || 0,
      employeeStats[0]?.awarded || 0,
      employeeStats[0]?.not_awarded || 0,
      employeeStats[0]?.cancel || 0,
    ]
  : [];
    
  return (
    <Row>
      <Col md="12">
      <ComponentCard title="Employee Statistics">
          <Form>
            <FormGroup>
              <Label for="employeeSelect">Select Employee</Label>
              <Input
                type="select"
                name="employee_id"
                onChange={(e) => {
                  const selectedId = e.target.value;
                  setSelectedEmployeeId(selectedId);
                }}
              >
                <option value="">Select Employee</option>
                {employees &&
                  employees.map((element) => (
                    <option key={element.supplier_id} value={element.supplier_id}>
                      {element.company_name}
                    </option>
                  ))}
              </Input>
            </FormGroup>
          </Form>
          {employeeStats && (
          <Chart options={optionsPie} series={seriesPie} type="pie" height="270" />
        )}
        </ComponentCard>
      </Col>
   
    </Row>
  );
};

export default RequestForQuotePie;

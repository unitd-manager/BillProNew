import React, { useState, useEffect } from 'react';
import { Form, Row, Col, FormGroup, Label, Input } from 'reactstrap';
import Chart from 'react-apexcharts';
import ComponentCard from '../ComponentCard';
import api from '../../constants/api';

const SalesInvoicePieChart = () => {
  const [salesInvoiceStats, setSalesInvoiceStats] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');

  // Function to fetch Sales Invoice statistics
  const fetchSalesInvoiceStats = async (company) => {
    try {
      const { data: { data } } = await api.get('/project/getProjectChart', {
        params: { company }
      });

      // Process the data to calculate the stats based on project status
      const stats = {
        WIP: 0,
        Billable: 0,
        Billed: 0,
        Complete: 0,
        Cancelled: 0,
        OnHold: 0,
        Latest: 0
      };

      data.forEach(project => {
        if (project.status === 'WIP') {
          stats.WIP++;
        } else if (project.status === 'Billable') {
          stats.Billable++;
        } else if (project.status === 'Billed') {
          stats.Billed++;
        } else if (project.status === 'Complete') {
          stats.Complete++;
        } else if (project.status === 'Cancelled') {
          stats.Cancelled++;
        } else if (project.status === 'On Hold') {
          stats.OnHold++;
        } else if (project.status === 'Latest') {
          stats.Latest++;
        }
      });

      setSalesInvoiceStats(stats);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  // Function to fetch companies
  const fetchCompanies = async () => {
    try {
      const { data: { data } } = await api.get('/company/getCompany');
      setCompanies(data);
    } catch (error) {
      console.log("Error fetching companies: ", error);
    }
  };

  useEffect(() => {
    fetchCompanies();
    fetchSalesInvoiceStats(selectedCompany);
  }, [selectedCompany]);

  const optionsPieChart = {
    chart: {
      id: 'pie-chart',
      fontFamily: "'Rubik', sans-serif",
      type: 'pie',
    },
    labels: ['WIP', 'Billable', 'Billed', 'Complete', 'Cancelled', 'On Hold', 'Latest'],
    legend: {
      show: true,
      position: 'bottom',
      width: '50px',
      fontFamily: "'Montserrat', sans-serif",
      labels: {
        colors: '#8898aa',
      },
    },
    colors: ['#36a2eb', '#ff6384', '#ffce56', '#4caf50', '#f44336', '#ff9800', '#9c27b0'],
    tooltip: {
      fillSeriesColor: false,
      theme: 'dark',
    },
  };

  const seriesPieChart = salesInvoiceStats
    ? [
        salesInvoiceStats.WIP || 0,
        salesInvoiceStats.Billable || 0,
        salesInvoiceStats.Billed || 0,
        salesInvoiceStats.Complete || 0,
        salesInvoiceStats.Cancelled || 0,
        salesInvoiceStats.OnHold || 0,
        salesInvoiceStats.Latest || 0
      ]
    : [];

  return (
    <Row>
      <Col md="12">
        <ComponentCard title="Project Statistics">
          <Form>
            <FormGroup>
              <Label for="companySelect">Select Company</Label>
              <Input
                type="select"
                name="company"
                id="companySelect"
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
              >
                <option value="">All Companies</option>
                {companies.map((company) => (
                  <option key={company.company_id} value={company.company_id}>
                    {company.company_name}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Form>
          {salesInvoiceStats && (
            <Chart options={optionsPieChart} series={seriesPieChart} type="pie" height="350" />
          )}
        </ComponentCard>
      </Col>
    </Row>
  );
};

export default SalesInvoicePieChart;
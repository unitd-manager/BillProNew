import React, { useState, useEffect } from 'react';
import { Form, Row, Col, FormGroup, Label, Input, Alert } from 'reactstrap';
import Chart from 'react-apexcharts';
import ComponentCard from '../ComponentCard';
import api from '../../constants/api';

const ClientChart = () => {
  const [clientData, setClientData] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Function to fetch client data
  const fetchClientData = async (company) => {
    try {
      const { data: { data, msg } } = await api.get('/quote/getQuotationDashboard', {
        params: { company }
      });

      // Check if no data is returned
      if (data.length === 0) {
        setClientData(null);
        setErrorMessage(msg || 'No results found');
        return;
      }

      // Ensure all months are present in the data, even if the count is 0
      const allMonths = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];

      // Initialize the month counts with 0
      const monthCounts = allMonths.map(month => ({ month, quotationCount: 0 }));

      // Update the monthCounts with data from the API
      data.forEach(({ month, quotationCount }) => {
        const monthIndex = allMonths.indexOf(month);
        if (monthIndex !== -1) {
          monthCounts[monthIndex].quotationCount = quotationCount;
        }
      });

      // Extracting categories (months) and series data (counts)
      const categories = monthCounts.map(({ month }) => month);
      const seriesData = monthCounts.map(({ quotationCount }) => quotationCount);

      const chartData = {
        categories,
        series: [
          {
            name: 'Total Quotations',
            data: seriesData,
          },
        ],
      };

      setClientData(chartData);
      setErrorMessage(''); // Clear any previous error messages
    } catch (error) {
      console.log("Error fetching data: ", error);
      setErrorMessage('No Quotation created');
    }
  };

  // Function to fetch companies
  const fetchCompanies = async () => {
    try {
      const { data: { data } } = await api.get('/company/getCompany');
      setCompanies(data);
    } catch (error) {
      console.log("Error fetching companies: ", error);
      setErrorMessage('Error fetching companies');
    }
  };

  useEffect(() => {
    fetchCompanies();
    fetchClientData(selectedCompany);
  }, [selectedCompany]);

  const optionsAreaChart = {
    chart: {
      id: 'area-chart',
      fontFamily: "'Rubik', sans-serif",
      type: 'area',
      stacked: false,
      height: '350',
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: clientData?.categories || [],
      labels: {
        style: {
          colors: '#263238',
        },
      },
      title: {
        text: 'Months',
        style: {
          fontSize: '14px',
          fontWeight: 600,
        },
      },
    },
    yaxis: {
      title: {
        text: 'Number of Quotation',
        style: {
          fontSize: '14px',
          fontWeight: 600,
        },
      },
      labels: {
        formatter(val) {
          return Math.round(val);
        },
      },
      tickAmount: 10, // Adjust the tick amount to show intervals of 10
    },
    colors: ['#36a2eb'],
    legend: {
      show: true,
      position: 'bottom',
      width: '50px',
      fontFamily: "'Montserrat', sans-serif",
      labels: {
        colors: '#8898aa',
      },
    },
    tooltip: {
      theme: 'dark',
    },
  };

  const seriesAreaChart = clientData?.series || [];

  return (
    <Row>
      <Col md="12">
        <ComponentCard title="Quotation Statistics">
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
          {errorMessage && (
            <Alert color="danger">
              {errorMessage}
            </Alert>
          )}
          {clientData && (
            <Chart options={optionsAreaChart} series={seriesAreaChart} type="area" height="350" />
          )}
        </ComponentCard>
      </Col>
    </Row>
  );
};

export default ClientChart;
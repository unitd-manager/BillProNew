import React, { useState, useEffect } from 'react';
import { Form, Row, Col, FormGroup, Label, Input, Alert } from 'reactstrap';
import Chart from 'react-apexcharts';
import ComponentCard from '../ComponentCard';
import api from '../../constants/api';

const QuotationDonut = () => {
  const [quotationStats, setQuotationStats] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Function to fetch Quotation statistics
  const fetchQuotationStats = async (companyId) => {
    try {
      const { data } = await api.get('/projectenquiry/getProjectEnquiryStats', {
        params: { companyId }
      });

      if (data.data.length === 0) {
        setQuotationStats(null);
        setErrorMessage('No enquiries found for the selected company');
        return;
      }

      const statusCounts = {
        'In Progress': 0,
        'Quotation Sent': 0,
        'Cancelled': 0,
        'OnHold': 0,
      };

      data.data.forEach(enquiry => {
        if (statusCounts[enquiry.status] !== undefined) {
          statusCounts[enquiry.status]++;
        }
      });

      setQuotationStats(statusCounts);
      setErrorMessage('');
    } catch (error) {
      console.error('Error fetching enquiry stats:', error);
      setErrorMessage('No Enquiries');
    }
  };

  // Function to fetch company list
  const fetchCompanies = async () => {
    try {
      const { data } = await api.get('/company/getCompany');
      setCompanies(data.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
      setErrorMessage('Error fetching companies');
    }
  };

  useEffect(() => {
    fetchCompanies(); // Fetch companies on component mount
  }, []);

  useEffect(() => {
    if (selectedCompany) {
      fetchQuotationStats(selectedCompany); // Fetch Quotation statistics on company selection
    }
  }, [selectedCompany]);

  const optionsDonut = {
    chart: {
      id: 'donut-chart',
      fontFamily: "'Rubik', sans-serif",
    },
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      pie: {
        donut: {
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
      'rgb(116, 90, 242)',
      '#ef5350',
    ],
    tooltip: {
      fillSeriesColor: false,
      theme: 'dark',
    },
    labels: [
      'In Progress',
      'Quotation Sent',
      'Cancelled',
      'OnHold',
    ],
  };

  const seriesDonut = quotationStats
    ? [
        quotationStats['In Progress'] || 0,
        quotationStats['Quotation Sent'] || 0,
        quotationStats.Cancelled || 0,
        quotationStats.OnHold || 0,
      ]
    : [];

  return (
    <Row>
      <Col md="12">
        <ComponentCard title="Enquiry Statistics">
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
          {quotationStats && (
            <Chart options={optionsDonut} series={seriesDonut} type="donut" height="350" />
          )}
        </ComponentCard>
      </Col>
    </Row>
  );
};

export default QuotationDonut;
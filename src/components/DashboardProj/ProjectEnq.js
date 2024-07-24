import React, { useState, useEffect } from 'react';
import { Row, Col, FormGroup, Label } from 'reactstrap';
import Chart from 'react-apexcharts';
import ComponentCard from '../ComponentCard';
import api from '../../constants/api';

const ProjectEnq = () => {
  const [enquiryData, setEnquiryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');

  useEffect(() => {
    // Fetch data from the project enquiry API
    api.get('/projectenquiry/getProjectEnquiry')
      .then(response => {
        const { data } = response.data;
        setEnquiryData(data);
        setFilteredData(data);
      })
      .catch(error => {
        console.log('Error fetching project enquiry data:', error);
      });

    // Fetch data from the companies API
    api.get('/company/getCompany')
      .then(response => {
        const { data } = response.data;
        setCompanies(data);
      })
      .catch(error => {
        console.log('Error fetching company data:', error);
      });
  }, []);

  useEffect(() => {
    // Filter data based on selected company
    if (selectedCompany) {
      const filtered = enquiryData.filter(enquiry => enquiry.company_id === selectedCompany);
      setFilteredData(filtered);
    } else {
      setFilteredData(enquiryData);
    }
  }, [selectedCompany, enquiryData]);

  const handleCompanyChange = (e) => {
    setSelectedCompany(e.target.value);
  };

  const optionsDonutChart = {
    chart: {
      id: 'project-enquiry-donut-chart',
      fontFamily: "'Rubik', sans-serif",
      type: 'donut',
      height: '350',
    },
    labels: filteredData.map(enquiry => enquiry.enquiryName),
    colors: ['#36a2eb', '#ff6384', '#ffce56'], // Customize colors as needed
    tooltip: {
      theme: 'dark',
    },
  };

  const seriesDonutChart = filteredData.map(enquiry => enquiry.actual);

  return (
    <Row>
      <Col md="12">
        <ComponentCard title="Project Enquiry (Donut Chart)">
          <Row>
            <Col md="4">
              <FormGroup>
                <Label>Company</Label>
                <select
                  name="company_id"
                  onChange={handleCompanyChange}
                  value={selectedCompany}
                >
                  <option value="">Please Select</option>
                  {companies.map(company => (
                    <option key={company.company_id} value={company.company_id}>
                      {company.company_name}
                    </option>
                  ))}
                </select>
              </FormGroup>
            </Col>
          </Row>
          {filteredData.length > 0 ? (
            <Chart options={optionsDonutChart} series={seriesDonutChart} type="donut" height="350" />
          ) : (
            <p>No data available for the chart.</p>
          )}zz
        </ComponentCard>
      </Col>
    </Row>
  );
};

export default ProjectEnq;
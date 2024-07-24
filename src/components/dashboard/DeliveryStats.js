import React, { useEffect, useState } from 'react';
import { Col, FormGroup, Label, Input } from 'reactstrap';
import Chart from 'react-apexcharts';
import ComponentCard from '../ComponentCard';
import api from '../../constants/api';

const AverageIssues = () => {
  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    // Fetch the list of companies
    api
      .get('/finance/getDeliveryOrders')
      .then((res) => {
        setOrders(res.data.data);
      })
      .catch((err) => {
        console.log('Error fetching companies:', err);
        setError(err);
      });
  }, []);
  useEffect(() => {
    if (selectedCompanyId) {
      setLoading(true);
      // Fetch order and delivery details based on the selected company
      api
      .post('/finance/getDeliveryStats', { company_id: selectedCompanyId })
      .then((response) => {
       const { ordersWithoutDelivery, ordersWithDelivery } = response.data.data;
        setPieData([
          { category: 'Orders', value: ordersWithoutDelivery },
          { category: 'Deliveries', value: ordersWithDelivery },
        ]);
        setLoading(false);
      })
      .catch((err) => {
        console.log('Error fetching order data:', err);
        setError(err);
        setLoading(false);
      });
    }
  }, [selectedCompanyId]);

  return (
    <ComponentCard title="Order Delivery Details">
      <Col md="12">
        <FormGroup>
          <Label for="companySelect">Select Company</Label>
          <Input
            type="select"
            name="company_id"
            onChange={(e) => {
              const selectedCompany = e.target.value;
              setSelectedCompanyId(selectedCompany);
            }}
          >
            <option value="">Select Company</option>
            {orders &&
              orders.map((element) => (
                <option key={element.company_id} value={element.company_id}>
                  {element.company_name}
                </option>
              ))}
          </Input>
        </FormGroup>
        <ComponentCard title="Pie Chart">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error.message}</div>
          ) : (
            <Chart
              options={{
                labels: pieData.map((data) => data.category),
              }}
              series={pieData.map((data) => data.value)}
              type="pie"
              height="280"
            />
          )}
        </ComponentCard>
      </Col>
    </ComponentCard>
  );
};

export default AverageIssues;
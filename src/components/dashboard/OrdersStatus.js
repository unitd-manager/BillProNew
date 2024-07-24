import React, { useEffect, useState } from 'react';
import { Col, FormGroup, Label, Input } from 'reactstrap';
import Chart from 'react-apexcharts';
import ComponentCard from '../ComponentCard';
import api from '../../constants/api';

const AverageIssues = () => {
  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const [orders, setOrders] = useState([]);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    // Fetch the list of companies
    api.get('/finance/getDashboardOrders')
      .then((res) => {
        setOrders(res.data.data);
      })
      .catch((error) => {
        console.log('Error fetching companies:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch order details based on the selected company
    if (selectedCompanyId) {
      api.post('/finance/getOrdersStats', { company_id: selectedCompanyId })
        .then((response) => {
          setOrderData(response.data.data);
        })
        .catch((error) => {
          console.log('Error fetching order data:', error);
        });
    } else {
      // Reset order data when no company is selected
      setOrderData([]);
    }
  }, [selectedCompanyId]);

  const getOrderStatusCounts = (orderId, status) => {
    return orderData
      .filter((order) => order.order_id === orderId && order.order_status === status)
      .length;
  };

  const orderStatuses = ['new', 'paid', 'cancelled'];

  const optionsColumn = {
    xaxis: {
      categories: orders.map((order) => `${order.order_code}`), // X-axis categories (order_code)
    },
    yaxis: {
      categories: ['new', 'paid', 'cancelled'], // Y-axis categories (new, paid, cancelled)
    },
  };

  const seriesColumn = orderStatuses.map((status) => {
    const data = orders.map((order) => getOrderStatusCounts(order.order_id, status));
    return {
      name: status, // Y-axis labels (new, paid, cancelled)
      data,
    };
  });

  return (
    <ComponentCard title="Company Orders">
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

      <ComponentCard title="Column Chart">
        <Chart options={optionsColumn} series={seriesColumn} type="bar" height="280" />
      </ComponentCard>
    </Col>
    </ComponentCard>
  );
};

export default AverageIssues;
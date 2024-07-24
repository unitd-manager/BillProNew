import React, { useEffect, useState } from 'react';
import { Col, FormGroup, Label, Input } from 'reactstrap';
import Chart from 'react-apexcharts';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';

const PurchaseOrderProduct = () => {
  const [productdropdown, setProductDropdown] = useState([])
  const [selectedproductid, setSelectedProductId] = useState('');
  const [clientname, setClientName] = useState([]);
  const [productdata, setProductData] = useState([]);

  const getProductDropdown = () => {
    api.get('invoice/getProductDropdown')
    .then((res) => {
      setProductDropdown(res.data.data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    getProductDropdown();     
   }, []);

  useEffect(() => {
    // Fetch the list of companies
    api.get('/invoice/getClientName')
      .then((res) => {
        setClientName(res.data.data);
      })
      .catch((error) => {
        console.log('Error fetching companies:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch order details based on the selected company
    if (selectedproductid) {
      api.post('/invoice/getProductDatas', { product_id: selectedproductid })
        .then((response) => {
          setProductData(response.data.data);
          console.log('data:', response.data.data)
        })
        .catch((error) => {
          console.log('Error fetching order data:', error);
        });
    } else {
      // Reset order data when no company is selected
      setProductData([]);
    }
  }, [selectedproductid]);

  const getOrderedQuantityForClient = (clientId) => {
    const totalQuantity = productdata
      .filter((order) => order.company_id === clientId)
      .reduce((acc, order) => acc + order.qty, 0);
    return totalQuantity;
  };

  const optionsColumn = {
    xaxis: {
      categories: clientname.map((client) => `${client.company_name}`),
    },
    yaxis: {
      categories: ['Quantity Ordered'],
    },
  };

  const seriesColumn = [
    {
      name: 'Quantity Ordered',
      data: clientname.map((client) => getOrderedQuantityForClient(client.company_id)),
    },
  ];

  return (
    <ComponentCard title="Ordered Product">
    <Col md="12">
      <FormGroup>
        <Label for="Select Product">Product</Label>
        <Input
          type="select"
          name="product_id"
          onChange={(e) => {
            const selectedproduct = e.target.value;
            setSelectedProductId(selectedproduct);
          }}
        >
          <option value="">Select Product</option>
          {productdropdown &&
            productdropdown.map((element) => (
              <option key={element.product_id} value={element.product_id}>
                {element.title}
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

export default PurchaseOrderProduct;
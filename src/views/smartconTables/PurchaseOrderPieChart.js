import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Row, Col, CardBody } from 'reactstrap';
import Chart from 'react-apexcharts';
import api from '../../constants/api';
import ComponentCard from '../../components/ComponentCard';

const PurchaseOrderPieChart = () => {
  const [pocode, setPoCode] = useState([]);
  const [piechart, setPieChart] = useState([]);
  const [data, setData] = useState([]);
  const [selectedpoid, setSelectedPoId] = useState(null);

  const getPoCode = () => {
    api.get('dashboardforpurchaseorder/getPoCode')
    .then((res) => {
      setPoCode(res.data.data);
      })
      .catch(() => {});
  };
 
  // Get the list of pocode from the API
  useEffect(() => {
   getPoCode();     
  }, []);

  // Get the employee and project-specific statistics based on the selected employee and project
  useEffect(() => {
    if (selectedpoid) {
      api.post('/dashboardforpurchaseorder/getPieChart', {purchase_order_id: selectedpoid })
        .then((res) => {
          setData(res.data.data);
        })
        .catch(() => {});
      api.post('/dashboardforpurchaseorder/getPieChart', { purchase_order_id: selectedpoid })
        .then((res) => {
          setPieChart(res.data.data);
        })
        .catch(() => {});
    }
  }, [selectedpoid]);

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
      // 'Total Invoice Amount',
      'Paid Amount',
      'Balance Amount',
    ],
  };

  const seriesPie = piechart
  ? [
      // piechart[0]?.total_invoice_amount || 0,
      piechart[0]?.paid_amount || 0,
      piechart[0]?.remaining_balance || 0
    ]
  : [];
    
  return (
    <Row>
      <Col md="12">
      <ComponentCard title="Purchaseorder Statistics">
          <Form>
            <FormGroup>
              <Label for="PurchaseOrderSelect">Select PoCode</Label>
              <Input
                type="select"
                name="purchase_order_id"
                onChange={(e) => {
                  const selectedPoId = e.target.value;
                  setSelectedPoId(selectedPoId);
                }}
              >
                <option value="">Select Employee</option>
                {pocode &&
                  pocode.map((element) => (
                    <option key={element.purchase_order_id} value={element.purchase_order_id}>
                      {element.po_code}
                    </option>
                  ))}
              </Input>
            </FormGroup>
            <CardBody>
              {data &&
                data.map((ele) => (
                  <Row>
                    <Col md="6">
                      <Row>
                        <Label>
                          <b>Supplier Name:</b> {ele.company_name}
                        </Label>
                      </Row>
                    </Col>
                    <Col md="6">
                      <Row>
                        <Label>
                          <b>Total Invoice Amount:</b> {ele.total_invoice_amount}
                        </Label>
                      </Row>
                    </Col>
                    <Col md="6">
                      <Row>
                        <Label>
                          <b>Paid Amount:</b> {ele.paid_amount}
                        </Label>
                      </Row>
                    </Col>
                    <Col md="6">
                      <Row>
                        <Label>
                          <b>Balance Amount:</b> {ele.remaining_balance}
                        </Label>
                      </Row>
                    </Col>
                  </Row>
                ))}
            </CardBody>
          </Form>
          {piechart && (
          <Chart options={optionsPie} series={seriesPie} type="pie" height="270" />
        )}
        </ComponentCard>
      </Col>
    </Row>
  );
};

export default PurchaseOrderPieChart;

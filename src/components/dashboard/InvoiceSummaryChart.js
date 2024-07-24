import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import Chart from 'react-apexcharts';
import api from '../../constants/api';
import ComponentCard from '../ComponentCard';

const InvoiceSummaryChart = () => {
  const [optionssalesummary, setoptionssalesummary] = useState({});
  const [seriessalessummry, setseriessalessummry] = useState([]);
  const getTableData = () => {
    api
      .get('/reports/getInvoiveByMonth')
      .then((res) => {
        const statData = res.data.data;
        const project = [];
        const stats = [];
        statData.forEach((element) => {
          project.push(element.invoice_month);
          stats.push(element.invoice_amount_monthly);
        });
        setoptionssalesummary({
          chart: {
            id: 'apexchart-example',
          },
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },
          xaxis: {
            categories: project,
          },
        });
        setseriessalessummry([
          {
            name: 'Data',
            data: stats,
          },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTableData();
  }, []);
  return (
    <>
      <Row>
        <Col>
          <ComponentCard title="Invoice Summary Chart">
            <Chart
              options={optionssalesummary}
              series={seriessalessummry}
              type="bar"
              height="280"
            />
          </ComponentCard>
        </Col>
      </Row>
    </>
  );
};

export default InvoiceSummaryChart;
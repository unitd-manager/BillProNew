import React from 'react';
import Chart from 'react-apexcharts';
import { Row, Col } from 'reactstrap';
import ComponentCard from '../ComponentCard';
//import api from '../../constants/api';

const TenderSummaryBarChart = () => {
 

  const optionscolumn = {
    colors: ['#745af2'],
    chart: {
      fontFamily: "'Rubik', sans-serif",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: 'rounded',
        columnWidth: '55%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      //categories: tender,
      tickPlacement: 'on',
      min: 1,
      max: 5,
      labels: {
        style: {
          cssClass: 'grey--text lighten-2--text fill-color',
        },
      },
    },
    yaxis: {
      title: {
        text: '$ (thousands)',
        color: '#8898aa',
      },
      labels: {
        style: {
          cssClass: 'grey--text lighten-2--text fill-color',
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter(val) {
          return `$ ${val} thousands`;
        },
      },
    },
    grid: {
      borderColor: 'rgba(0,0,0,0.1)',
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
  };

  const seriescolumn = [
    {
      name: 'Desktop',
      //data: amount,
    },
  ];
  return (
    <Row>
      <Col>
        <ComponentCard title="Tender Summary Chart">
          <Chart options={optionscolumn} series={seriescolumn} type="bar" height="280" />
        </ComponentCard>
      </Col>
    </Row>
  );
};

export default TenderSummaryBarChart;

import React, { useState, useEffect } from 'react';
import { Col, FormGroup, Label, Input, Row, Form, Button, Spinner } from 'reactstrap';
import Chart from 'react-apexcharts';
import api from '../../constants/api';
import ComponentCard from '../ComponentCard';

export default function QuotationChart() {
  const [quotationCounts, setQuotationCounts] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [months] = useState([
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showChart, setShowChart] = useState(false);

  const fetchQuotationData = () => {
    setIsLoading(true);
    setShowChart(false);

    api.get('/quote/getQuotationCounts', { params: { year: selectedYear, month: selectedMonth } })
      .then((response) => {
        setIsLoading(false);

        if (response.data && response.data.data) {
          const quotationData = response.data.data;
          const counts = quotationData.map(item => item.quote_id);

          setQuotationCounts(counts);
          setShowChart(true); // Make sure to set showChart to true when data is available
        } else {
          setQuotationCounts([]);
          setShowChart(false); // Ensure showChart is set to false if no data
        }
      })
      .catch((error) => {
        console.error('Error fetching quotation data:', error);
        setIsLoading(false);
        setShowChart(false);
      });
  };

  const getYears = () => {
    const currentYear = new Date().getFullYear();
    const nextYears = Array.from({ length: currentYear + 5 - 2023 }, (_, index) => 2023 + index);
    setYears(nextYears);
    setSelectedYear(nextYears[0]);
  };

  useEffect(() => {
    getYears();
  }, []);

  useEffect(() => {
    fetchQuotationData();
  }, [selectedYear, selectedMonth]);

  const optionsLineChart = {
    chart: {
      fontFamily: "'Rubik', sans-serif",
    },
    xaxis: {
      categories: months.map((month, index) => index + 1), // Adjust month indexes for zero-based indexing
      labels: {
        style: {
          cssClass: 'grey--text lighten-2--text fill-color',
        },
      },
      tickPlacement: 'on',
    },
    yaxis: {
      title: {
        text: 'Quotation Count',
        color: '#8898aa',
      },
      labels: {
        style: {
          cssClass: 'grey--text lighten-2--text fill-color',
        },
      },
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter(val) {
          return `${val} quotations`;
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
  
  const seriesLineChart = [
    {
      name: 'Quotation Count',
      data: quotationCounts,
    },
  ];

   return (
    <Row>
      <Col md="12">
        <ComponentCard title="Quotation Stats">
          <Form>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label>Select Year</Label>
                  <Input
                    type="select"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>Select Month</Label>
                  <Input
                    type="select"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    <option value="">Select Month</option> {/* Add default option */}
                    {months.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={12} className="mt-3">
                <Button color="primary" onClick={fetchQuotationData} disabled={!selectedMonth}>
                  {isLoading ? <Spinner size="sm" color="light" /> : "Go"}
                </Button>
              </Col>
            </Row>
          </Form>
          {showChart && selectedMonth && ( // Check if a month is selected before rendering chart
            <Chart options={optionsLineChart} series={seriesLineChart} type="bar" height="280" />
          )}
          {isLoading && <Spinner color="primary" />}
        </ComponentCard>
      </Col>
    </Row>
  );
};















// import React, { useState, useEffect } from 'react';
// import { Col, FormGroup, Label, Input, Row, Form } from 'reactstrap';
// import Chart from 'react-apexcharts';
// import api from '../../constants/api';
// import ComponentCard from '../ComponentCard';

// const QuotationChart = () => {
//   const [quotationData, setQuotationData] = useState([]);
//   const [months, setMonths] = useState([]);
//   const [selectedMonth, setSelectedMonth] = useState('');

//   const fetchQuotationData = async (month) => {
//     try {
//       const response = await api.get('/quote/getQuotationCounts', { params: { month } });
//       setQuotationData(response.data.data || []);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setQuotationData([]);
//     }
//   };

//   const getMonths = () => {
//     const monthsArray = [
//       'January', 'February', 'March', 'April', 'May', 'June',
//       'July', 'August', 'September', 'October', 'November', 'December'
//     ];
//     setMonths(monthsArray);
//   };

//   useEffect(() => {
//     getMonths();
//   }, []);

//   useEffect(() => {
//     if (selectedMonth) {
//       fetchQuotationData(selectedMonth);
//     }
//   }, [selectedMonth]);

//   const options = {
//     colors: ['#00bcd4'],
//     chart: {
//       fontFamily: 'Rubik, sans-serif',
//     },
//     xaxis: {
//       categories: quotationData.map(item => item.day),
//       title: {
//         text: 'Day of Month',
//         offsetX: 0,
//         offsetY: 0,
//         style: {
//           fontSize: '12px',
//         },
//       },
//       labels: {
//         style: {
//           cssClass: 'grey--text lighten-2--text fill-color',
//         },
//       },
//     },
//     yaxis: {
//       title: {
//         text: 'Number of Quotations',
//         offsetX: 0,
//         offsetY: 0,
//         style: {
//           fontSize: '12px',
//         },
//       },
//       labels: {
//         style: {
//           cssClass: 'grey--text lighten-2--text fill-color',
//         },
//         formatter(val) {
//           return val;
//         },
//       },
//     },
//     grid: {
//       borderColor: 'rgba(0,0,0,0.1)',
//     },
//     legend: {
//       show: true,
//       position: 'bottom',
//       width: '50px',
//       fontFamily: 'Montserrat, sans-serif',
//       labels: {
//         colors: '#8898aa',
//       },
//     },
//   };

//   const series = [
//     {
//       name: 'Number of Quotations',
//       data: quotationData.map(item => item.count),
//     },
//   ];

//   return (
//     <Row>
//       <Col md="12">
//         <ComponentCard title="Quotation Statistics">
//           <Form>
//             <Row>
//               <Col md={6}>
//                 <FormGroup>
//                   <Label for="monthSelect">Select Month</Label>
//                   <Input
//                     type="select"
//                     id="monthSelect"
//                     value={selectedMonth}
//                     onChange={(e) => setSelectedMonth(e.target.value)}
//                   >
//                     <option value="">Select</option>
//                     {months.map((month) => (
//                       <option key={month} value={month}>
//                         {month}
//                       </option>
//                     ))}
//                   </Input>
//                 </FormGroup>
//               </Col>
//             </Row>
//           </Form>
//           {quotationData.length > 0 && (
//             <Chart options={options} series={series} type="line" height="280" />
//           )}
//         </ComponentCard>
//       </Col>
//     </Row>
//   );
// };

// export default QuotationChart;

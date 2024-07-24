import React, { useState, useEffect } from 'react';
import { Col, FormGroup, Label, Input, Row, Form, Button, Spinner } from 'reactstrap';
import Chart from 'react-apexcharts';
import { Link } from 'react-router-dom';
import api from '../../constants/api';
import ComponentCard from '../ComponentCard';

export default function CustomerChart() {
  const [companyNames, setCompanyNames] = useState([]);
  const [companyCounts, setCompanyCounts] = useState([]); // Changed state variable
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [months] = useState([
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [companyIDs, setCompanyIDs] = useState([]);

  const fetchCompanyData = () => {
    setIsLoading(true);
    setShowChart(false);

    api.get('/company/getNewCompanies', { params: { year: selectedYear, month: selectedMonth } })
      .then((response) => {
        setIsLoading(false);

        if (response.data && response.data.data && response.data.data.length > 0) {
          const companyData = response.data.data;

          const filteredData = companyData.filter(item => {
            const dateObject = new Date(item.creation_date);
            return dateObject.getFullYear() === parseInt(selectedYear, 10) && dateObject.getMonth() === months.indexOf(selectedMonth);
          });

          const names = filteredData.map(item => item.company_name);
          const counts = filteredData.map(item => item.newCompanies); // Changed to newCompanies count
          const ids = filteredData.map(item => item.company_id);
          
          setCompanyIDs(ids);
          setCompanyNames(names);
          setCompanyCounts(counts); // Update companyCounts state
          setShowChart(true);
        } else {
          setCompanyNames([]);
          setCompanyCounts([]);
          setShowChart(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
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
    fetchCompanyData();
  }, [selectedYear, selectedMonth]);

  const optionscolumn = {
    colors: ['#745af2', '#263238'],
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
      categories: companyNames,
      labels: {
        style: {
          cssClass: 'grey--text lighten-2--text fill-color',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Company Count',
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
          return `${val} companies`;
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
      name: 'New Companies Count',
      data: companyCounts, // Changed to use companyCounts
    },
  ];

  return (
    <Row>
      <Col md="12">
        <ComponentCard title="Company Stats">
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
                    {years.map(year => (
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
                    {months.map(month => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={12} className="mt-3">
                <Button color="primary" onClick={fetchCompanyData}>
                  {isLoading ? <Spinner size="sm" color="light" /> : "Go"}
                </Button>
              </Col>
            </Row>
          </Form>
          {showChart && (
            <Link to={`/CompanyEdit/${companyIDs}`}>
              <Chart options={optionscolumn} series={seriescolumn} type="bar" height="280" />
            </Link>
          )}
          {!isLoading && !showChart}
          {isLoading && <Spinner color="primary" />}
        </ComponentCard>
      </Col>
    </Row>
  );
}












// import React, { useState, useEffect } from 'react';
// import { Col, FormGroup, Label, Input, Row, Form, Button, Spinner } from 'reactstrap';
// import Chart from 'react-apexcharts';
// import { Link } from 'react-router-dom';
// import api from '../../constants/api';
// import ComponentCard from '../ComponentCard';

// export default function CustomerChart() {
//   const [companyNames, setCompanyNames] = useState([]);
//   const [companyCreationDates, setCompanyCreationDates] = useState([]);
//   const [years, setYears] = useState([]);
//   const [selectedYear, setSelectedYear] = useState("");
//   const [months] = useState([
//     "January", "February", "March", "April", "May", "June", "July",
//     "August", "September", "October", "November", "December"
//   ]);
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [showChart, setShowChart] = useState(false);
//   const [companyIDs, setCompanyIDs] = useState([]);

//   const fetchCompanyData = () => {
//     setIsLoading(true);
//     setShowChart(false);
//     console.log("Selected Year:", selectedYear);
//   console.log("Selected Month:", selectedMonth);


//     api.get('/company/getNewCompanies', { params: { year: selectedYear, month: selectedMonth } })
//       .then((response) => {
//         setIsLoading(false);

//         if (response.data && response.data.data && response.data.data.length > 0) {
//           const companyData = response.data.data;

//           // Filter data based on the selected year and month
//           const filteredData = companyData.filter(item => {
//             const dateObject = new Date(item.creation_date);
//             const itemMonth = dateObject.getMonth();
//             const selectedMonthIndex = months.indexOf(selectedMonth);
          
//             return dateObject.getFullYear() === parseInt(selectedYear, 10) && itemMonth === selectedMonthIndex;
         
//           });
//           const names = filteredData.map((item) => item.company_name);
//           const creationDates = filteredData.map((item) => new Date(item.creation_date).toLocaleDateString());
//           const ids = filteredData.map((item) => item.company_id); // Extract company IDs
//           console.log("Filtered Data:", filteredData);
//           setCompanyIDs(ids); // Update company IDs state

//           setCompanyNames(names);
//           setCompanyCreationDates(creationDates);
//           setShowChart(true);
//         } else {
//           setCompanyNames([]);
//           setCompanyCreationDates([]);
//           setShowChart(false); // Show chart only if data is available
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//         setIsLoading(false);
//         setShowChart(false);
//       });
//   };

//   const getYears = () => {
//     const currentYear = new Date().getFullYear();
//     const nextYears = Array.from({ length: currentYear + 5 - 2023 }, (_, index) => 2023 + index);
//     setYears(nextYears);
//     setSelectedYear(nextYears[0]);
//   };

//   useEffect(() => {
//     getYears();
//   }, []);

//   useEffect(() => {
//     fetchCompanyData();
//   }, [selectedYear, selectedMonth]);

//   const optionscolumn = {
//     colors: ['#745af2', '#263238'],
//     chart: {
//       fontFamily: "'Rubik', sans-serif",
//     },
//     plotOptions: {
//       bar: {
//         horizontal: false,
//         endingShape: 'rounded',
//         columnWidth: '55%',
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     stroke: {
//       show: true,
//       width: 2,
//       colors: ['transparent'],
//     },
//     xaxis: {
//       categories: companyNames,
//       labels: {
//         style: {
//           cssClass: 'grey--text lighten-2--text fill-color',
//         },
//       },
//     },
//     yaxis: {
//       title: {
//         text: 'Creation Date',
//         color: '#8898aa',
//       },
//       labels: {
//         style: {
//           cssClass: 'grey--text lighten-2--text fill-color',
//         },
//       },
//     },
//     fill: {
//       opacity: 1,
//     },
//     tooltip: {
//       theme: 'dark',
//       y: {
//         formatter(val) {
//           return `${val} companies`;
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
//       fontFamily: "'Montserrat', sans-serif",
//       labels: {
//         colors: '#8898aa',
//       },
//     },
//   };

//   const seriescolumn = [
//     {
//       name: 'New Companies Count',
//       data: companyCreationDates,
//     },
//   ];

//   return (
//     <Row>
//       <Col md="12">
//         <ComponentCard title="Company Stats">
//           <Form>
//             <Row>
//               <Col md={6}>
//                 <FormGroup>
//                   <Label>Select Year</Label>
//                   <Input
//                     type="select"
//                     value={selectedYear}
//                     onChange={(e) => setSelectedYear(e.target.value)}
//                   >
//                     {years.map((year) => (
//                       <option key={year} value={year}>
//                         {year}
//                       </option>
//                     ))}
//                   </Input>
//                 </FormGroup>
//               </Col>
//               <Col md={6}>
//                 <FormGroup>
//                   <Label>Select Month</Label>
//                   <Input
//                     type="select"
//                     value={selectedMonth}
//                     onChange={(e) => setSelectedMonth(e.target.value)}
//                   >
//                     {months.map((month) => (
//                       <option key={month} value={month}>
//                         {month}
//                       </option>
//                     ))}
//                   </Input>
//                 </FormGroup>
//               </Col>
//               <Col md={12} className="mt-3">
//                 <Button color="primary" onClick={fetchCompanyData}>
//                   {isLoading ? <Spinner size="sm" color="light" /> : "Go"}
//                 </Button>
//               </Col>
//             </Row>
//           </Form>
//           {showChart && (
//             <Link to={`/CompanyEdit/${companyIDs}`}>
//               <Chart options={optionscolumn} series={seriescolumn} type="bar" height="280" />
//             </Link>
//           )}
//           {!isLoading && !showChart}
//           {isLoading && <Spinner color="primary" />}
//         </ComponentCard>
//       </Col>
//     </Row>
//   );
// };

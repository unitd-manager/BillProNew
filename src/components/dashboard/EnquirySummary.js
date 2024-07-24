import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Button, Input, FormGroup } from 'reactstrap';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import { v4 as uuidv4 } from 'uuid';
import CommonTable from '../CommonTable';
import message from '../Message';
import api from '../../constants/api';

const TradingSummary = () => {
  const [report, setReport] = useState();
  const [company, setCompany] = useState();
  const [userSearchData, setUserSearchData] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [companyName, setCompanyName] = useState('');
  //get lineitems
  const getInvoices = () => {
    api
      .get('/tender/getEnquirySummary')
      .then((res) => {
        setUserSearchData(res.data.data);
        setReport(res.data.data);
      })
      .catch(() => {
        message('Invoices not found', 'error');
      });
  };

  const handlePeriod = (e) => {
    if (e.target.value === 'Current Month') {
      const firstdate = moment(new Date())
        .subtract(0, 'months')
        .startOf('month')
        .format('YYYY-MM-DD');

      const lastdate = moment(new Date()).subtract(0, 'months').endOf('month').format('YYYY-MM-DD');

      setStartDate(firstdate);
      setEndDate(lastdate);
    } else if (e.target.value === 'Previous Month') {
      const firstdate = moment(new Date())
        .subtract(1, 'months')
        .startOf('month')
        .format('YYYY-MM-DD');

      const lastdate = moment(new Date()).subtract(1, 'months').endOf('month').format('YYYY-MM-DD');

      setStartDate(firstdate);
      setEndDate(lastdate);
    } else if (e.target.value === 'Last 3 Months') {
      const firstdate = moment(new Date())
        .subtract(3, 'months')
        .startOf('month')
        .format('YYYY-MM-DD');

      const lastdate = moment(new Date()).subtract(1, 'months').endOf('month').format('YYYY-MM-DD');
      setStartDate(firstdate);
      setEndDate(lastdate);
    } else if (e.target.value === 'Last 6 Months') {
      const firstdate = moment(new Date())
        .subtract(6, 'months')
        .startOf('month')
        .format('YYYY-MM-DD');

      const lastdate = moment(new Date()).subtract(1, 'months').endOf('month').format('YYYY-MM-DD');
      setStartDate(firstdate);
      setEndDate(lastdate);
    } else if (e.target.value === 'Last 9 Months') {
      const firstdate = moment(new Date())
        .subtract(9, 'months')
        .startOf('month')
        .format('YYYY-MM-DD');

      const lastdate = moment(new Date()).subtract(1, 'months').endOf('month').format('YYYY-MM-DD');
      setStartDate(firstdate);
      setEndDate(lastdate);
    } else if (e.target.value === 'Last 12 Months') {
      const firstdate = moment(new Date())
        .subtract(12, 'months')
        .startOf('month')
        .format('YYYY-MM-DD');

      const lastdate = moment(new Date()).subtract(1, 'months').endOf('month').format('YYYY-MM-DD');

      setStartDate(firstdate);
      setEndDate(lastdate);
    }
  };

  //Api call for getting company dropdown
  const getCompany = () => {
    api.get('/company/getCompany').then((res) => {
      setCompany(res.data.data);
    });
  };
  const handleSearch = () => {
    const newData = report.filter((el) => {
      const quoteDate = new Date(el.quote_date);
      const companyMatches = companyName === '' || el.company_name === companyName;
  
      const startDateObj = startDate ? new Date(startDate) : null;
      const endDateObj = endDate ? new Date(endDate) : null;
  
      let dateMatches = true;
  
      if (startDateObj) {
        dateMatches = dateMatches && quoteDate >= startDateObj;
      }
  
      if (endDateObj) {
        // To filter by the end of the selected day, add 1 day and subtract 1 millisecond
        endDateObj.setDate(endDateObj.getDate() + 1);
        endDateObj.setMilliseconds(endDateObj.getMilliseconds() - 1);
        dateMatches = dateMatches && quoteDate <= endDateObj;
      }
  
      return companyMatches && dateMatches;
    });
  
    setUserSearchData(newData);
  };
  const [page, setPage] = useState(0);

  const employeesPerPage = 20;
  const numberOfEmployeesVistited = page * employeesPerPage;
  const displayEmployees = userSearchData.slice(
    numberOfEmployeesVistited,
    numberOfEmployeesVistited + employeesPerPage,
  );
  const totalPages = Math.ceil(userSearchData.length / employeesPerPage);
  const changePage = ({ selected }) => {
    setPage(selected);
  };

  useEffect(() => {
    getInvoices();
    getCompany();
  }, []);

  const columns = [
    {
      name: 'S.No',
      selector: '',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: 'Company Name',
      selector: 'company_name',
      grow: 0,
      wrap: true,
    },
    {
      name: 'Enquiry No',
      selector: 'opportunity_code',
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
    {
      name: 'Quote No',
      selector: 'quote_code',
      grow: 0,
      width: 'auto',
      wrap: true,
    },
    {
      name: 'Quote Date',
      selector: 'quote_date',
      grow: 0,
      width: 'auto',
      wrap: true,
    },
    {
      name: 'Quote Amount',
      selector: 'quoteAmount',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Delivered Date',
      selector: 'goods_delivery_date',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Delivered Amount',
      selector: 'deliveryAmount',
      sortable: true,
      grow: 0,
      wrap: true,
    },
   
   
   
   
  ];

  return (
    <>
      <Card>
        <CardBody>
          <Row>
            <Col></Col>
            <Col className="xs-fullWidth">
              <FormGroup>
                <Input
                  type="select"
                  name="period"
                  defaultValue="Current Month"
                  onChange={(e) => handlePeriod(e)}
                >
                  <option value="Current Month">Current Month</option>
                  <option value="Previous Month">Previous Month</option>
                  <option value="Last 3 Months">Last 3 Months</option>
                  <option value="Last 6 Months">Last 6 Months</option>
                  <option value="Last 9 Months">Last 9 Months</option>
                  <option value="Last 12 Months">Last 12 Months</option>
                </Input>
              </FormGroup>
            </Col>
            <Col className="xs-fullWidth">
              <FormGroup>
                <Input
                  type="select"
                  name="company_id"
                  onChange={(e) => setCompanyName(e.target.value)}
                >
                  <option value="">Select Company</option>

                  {company &&
                    company.map((ele) => {
                      return (
                        <option key={ele.company_id} value={ele.company_name}>
                          {ele.company_name}
                        </option>
                      );
                    })}
                </Input>
              </FormGroup>
            </Col>
            <Col md="1">
              <FormGroup>
                <Button color="primary" className="shadow-none" onClick={() => handleSearch()}>
                  Go
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </CardBody>

        <CommonTable title="Enquiry Summary">
          <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {displayEmployees &&
              displayEmployees.map((el, i) => {
                return (
                  <tr key={uuidv4()}>
                    <td>{i + 1}</td>
                    {/*
                      {el.invoice_due_date ? moment(el.invoice_due_date).format('DD-MM-YYYY') : ''}
                    </td> */}
                    <td>{el.company_name}</td>
                    <td>{el.opportunity_code}</td>
                    <td>{el.quote_code}</td>
                    <td>{el.quoteAmount}</td>
                    <td>{el.quote_date}</td>
                    <td>{el.deliveryAmount}</td>
                    <td>{el.goods_delivery_date}</td>
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          pageCount={totalPages}
          onPageChange={changePage}
          containerClassName="navigationButtons"
          previousLinkClassName="previousButton"
          nextLinkClassName="nextButton"
          disabledClassName="navigationDisabled"
          activeClassName="navigationActive"
        />
      </Card>
    </>
  );
};

export default TradingSummary;

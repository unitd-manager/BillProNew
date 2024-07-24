import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Button, Input, FormGroup } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import { v4 as uuidv4 } from 'uuid';
import CommonTable from '../CommonTable';
import message from '../Message';
import api from '../../constants/api';

const TradingSummary = () => {
  const [report, setReport] = useState();
  const [company, setCompany] = useState();
  const [userSearchData, setUserSearchData] = useState('');
  const [companyName, setCompanyName] = useState('');
  //get lineitems
  const getInvoices = () => {
    api
      .get('/invoice/getReturnsStats')
      .then((res) => {
        setUserSearchData(res.data.data);
        setReport(res.data.data);
      })
      .catch(() => {
        message('Invoices not found', 'error');
      });
  };

  

  //Api call for getting company dropdown
  const getCompany = () => {
    api.get('/company/getCompany').then((res) => {
      setCompany(res.data.data);
    });
  };
  const handleSearch = () => {
    const newData = report.filter((el) => {
   
      const companyMatches = companyName === '' || el.company_name === companyName;
  
     
  
      return companyMatches;
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
      name: 'Order No',
      selector: 'order_code',
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
    {
      name: 'Invoice No',
      selector: 'invoice_code',
      grow: 0,
      width: 'auto',
      wrap: true,
    },
    {
      name: 'Return Status',
      selector: 'status',
      grow: 0,
      width: 'auto',
      wrap: true,
    },
     
   
  ];

  return (
    <>
      <Card>
        <CardBody>
          <Row>
           
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

        <CommonTable title="Return Summary">
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
                    <td>{el.order_code}</td>
                    <td>{el.invoice_code}</td>
                    <td>{el.status}</td>
                  
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

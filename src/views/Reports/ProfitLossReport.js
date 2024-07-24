import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, CardHeader, Input, FormGroup,Label, Table} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
// import 'datatables.net-buttons/js/buttons.html5';
// import 'datatables.net-buttons/js/buttons.print';
import './style.css';
import { ToastContainer } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import api from '../../constants/api';
import message from '../../components/Message';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ExportReport from '../../components/Report/ExportReport';

const ProfitLossReports = () => {
  //All state variable
 // const [report, setReport] = useState(null);
  const [gTotal, setGtotal] = useState(0);
  const [debitTotal, setDebittotal] = useState(0);
  const [userSearchData, setUserSearchData] = useState('');
  const [groups, setGroup] = useState();
  const [netPayroll, setNetPayroll] = useState();
  const [invoiceAmount, setInvoiceAmount] = useState();
  const [counttotal, setCounttotal] = useState();
  const [wagesTotal, setWagesTotal] = useState();

 // const [companyName, setCompanyName] = useState('');
  //Get data from Reports table\
  const[filterPeriod, setFilterPeriod]=useState({
    month:null,
    year:null,
    startDate:null,
    endDate:null
  })
  
  const handleFilterInputs=(e)=>{
  setFilterPeriod({...filterPeriod,[e.target.name]:e.target.value})
  }
  


  useEffect(() => {
    
    const getProfitLoss = () => {
      api
      .get('/accounts/getGroupTitlzzze', {
        params: {
          month: filterPeriod.month,
          year: filterPeriod.year,
          startDate:filterPeriod.startDate,
    endDate:filterPeriod.endDate,
        },
      })
        .then((res) => {
         
          setUserSearchData(res.data.data);
          //grand total
          let grandTotal = 0;
          res.data.data.forEach((elem) => {
            grandTotal += elem.credit_amount;
          });
          setGtotal(grandTotal);
        })
        .catch(() => {
          message('Reports Data Not Found', 'info');
        });
    };
  
    const getIncomeGroup = () => {
      api  
      .get('/accounts/getIncomeGroupAmount', {
        params: {
          month: filterPeriod.month,
          year: filterPeriod.year,
          startDate:filterPeriod.startDate,
          endDate:filterPeriod.endDate,
        },
      })
      .then((res) => {
        setGroup(res.data.data);
        let debitingTotal = 0;
        res.data.data.forEach((elem) => {
          debitingTotal += elem.debit_amount;
        });
        setDebittotal(debitingTotal);
      });
    };

    const getNetPayroll = () => {
      api
      .get('/accounts/getNetPayroll', {
        params: {
          month: filterPeriod.month,
          year: filterPeriod.year,
          startDate:filterPeriod.startDate,
          endDate:filterPeriod.endDate,
        },
      }).then((res) => {
        setNetPayroll(res.data.data);
        let totalDebit = 0;
        res.data.data.forEach((payroll) => {
          totalDebit = parseFloat(payroll.net_total)+parseFloat(gTotal);
        });
        setWagesTotal(totalDebit);
      });
    };

    const getInvoiceAmount = () => {
      api
      .get('/accounts/getInvoiceAmount', {
        params: {
          month: filterPeriod.month,
          year: filterPeriod.year,
          startDate:filterPeriod.startDate,
          endDate:filterPeriod.endDate,
        },
      }).then((res) => {
        setInvoiceAmount(res.data.data);
        let totalDebit = 0;
        res.data.data.forEach((payroll) => {
          totalDebit = parseFloat(payroll.invoice_amount)+parseFloat(debitTotal);
        });
        setCounttotal(totalDebit);
      });
    };
    getProfitLoss();
    getIncomeGroup();
    getNetPayroll();
    getInvoiceAmount();
  }, [filterPeriod,counttotal,wagesTotal]);

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
  //structure of Training list view
  const columns = [
    {
      name: 'Debit',
      selector: '',
    },
    {
      name: '',
      selector: '',
    },
    {
      name: 'Credit',
      selector: '',
    },

   
  ];

  const currentYear = new Date().getFullYear();
  const netProfit = parseFloat(counttotal) - parseFloat(wagesTotal);
  const formattedNetProfit = netProfit.toFixed(2);
  return (
    <>
      <BreadCrumbs />
      <ToastContainer></ToastContainer>
      <Card>
          <CardBody>
            <Row>
         
            <Col>
                <Row>
              
                  <Col >
                    {' '}
                    <FormGroup>
                      <Label>Year</Label>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Input name="year" type="select"
                      onChange={handleFilterInputs}>
                        <option value="">Please Select</option>
                        <option value={currentYear.toString()}>{currentYear}</option>

                      </Input>
                    </FormGroup>
                  </Col>
                
                  <Col >
                    <FormGroup>
                      <Label>Month</Label>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Input name="month" type="select" 
                      onChange={handleFilterInputs}>
                        <option value="">Please Select</option>
                        <option value="01">January</option>
                        <option value="02">February</option>
                        <option value="03">March</option>
                        <option value="04">April</option>
                        <option value="05">May</option>
                        <option value="06">June</option>
                        <option value="07">July</option>
                        <option value="08">August</option>
                        <option value="09">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
              <FormGroup>
                <Label>Start Date</Label>
                <Input
                  type="date"
                  name="startDate"
                  onChange={handleFilterInputs}

                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>End Date</Label>
                <Input type="date" name="endDate" onChange={handleFilterInputs}
 />
              </FormGroup>
            </Col>
                </Row>
              </Col>
              <Col md="2">
            {/* <Button
              color="primary"
              className="shadow-none"
              onClick={() => {
                getProfitLoss();
                getIncomeGroup();
              }}
            >
              Go
            </Button> */}
          </Col>
            </Row>
          </CardBody>
        </Card>
        <Card >
        <CardHeader className="card p-2 text-center">
        <b>Profit & Loss Report</b>
      </CardHeader>
      <CardBody>
        <Row>
          <Col md="6">
            <b>Month:</b> &nbsp; <span>{filterPeriod.month}</span>
          </Col>
          <Col md="6">
            <b>year:</b> &nbsp; <span>{filterPeriod.year}</span>
          </Col>
        </Row>
      </CardBody>
      </Card>
        <Card>
  <CardBody>
    <Row>
      <Col>
        <ExportReport columns={columns} data={userSearchData} />
      </Col>
    </Row>
  </CardBody>

  <CardBody>
  <Row> 
  <Col md="12">
    <Row className="table-row">
      <Col md="6" className="table-col">
        <Table>
          <thead>
            <tr>
              <td>
                <b>Expense</b>
              </td>
            </tr>
          </thead>
          <tbody>
            {/* Display expense records */}
            {netPayroll &&
              netPayroll.map((payroll) => (
                <tr >
                  <td>Wages and Benifits</td>
                  <td>{Number.isNaN(parseFloat(payroll.net_total)) ? 0 : payroll.net_total}</td>                </tr>
              ))}
            {displayEmployees &&
              displayEmployees.map((expenseRecord) => (
                <tr key={expenseRecord.expense_group_id}>
                  <td>{expenseRecord.title}</td>
                  <td>{Number.isNaN(parseFloat(expenseRecord.credit_amount)) ? 0 : expenseRecord.credit_amount}</td>                </tr>
              ))}
          </tbody>
        </Table>
      </Col>
      <Col md="6" className="table-col">
        <Table>
          <thead>
            <tr>
              <td>
                <b>Income</b>
              </td>
            </tr>
          </thead>
          <tbody>
            {/* Display income records */}
            {invoiceAmount &&
              invoiceAmount.map((invoice) => (
                <tr >
                  <td>Sales Revenue</td>
                  <td>{Number.isNaN(parseFloat(invoice.invoice_amount)) ? 0 : invoice.invoice_amount}</td>                </tr>
              ))}
            {groups &&
              groups.map((incomeRecord) => (
                <tr key={incomeRecord.income_group_id}>
                  <td>{incomeRecord.title}</td>
                  <td>{Number.isNaN(parseFloat(incomeRecord.debit_amount)) ? 0 : incomeRecord.debit_amount}</td>                </tr>
              ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  </Col>
</Row>

    <Table>
      <tbody>
        <tr>
          <td>
            <b>Total Debit</b>
          </td>
          <td>
          <b>{Number.isNaN(parseFloat(wagesTotal)) ? 0 : wagesTotal}</b>                

          </td>
          <td>
            <b>Total Credit</b>
          </td>
          <td>
          <b>{Number.isNaN(parseFloat(counttotal)) ? 0 : counttotal}</b>                

          </td>
        </tr>
        <tr>
          <td colSpan="2">
            <b>Net Profit   {Number.isNaN(parseFloat(formattedNetProfit)) ? 0 : formattedNetProfit}</b>
          </td>
        </tr>
      </tbody>
    </Table>

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
  </CardBody>
</Card>

    </>
  );
};
export default ProfitLossReports;

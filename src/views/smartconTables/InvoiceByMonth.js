import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Button,CardHeader, Input, FormGroup, Label, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { ToastContainer } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import api from '../../constants/api';
import message from '../../components/Message';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ExportReport from '../../components/Report/ExportReport';

const InvoiceMonthReports = () => {
  //All state variable
  //const [report, setReport] = useState(null);
  const [gTotal, setGtotal] = useState(0);
  const [userSearchData, setUserSearchData] = useState('');
  const [companyName, setCompanyName] = useState('project');

  const currentDate = new Date();
  const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 12, currentDate.getDate())

  const exportValue="InvoiceByMonthReport"

  const handleSearch = () => {
    const queryParams = companyName ? `?recordType=${companyName}` : '';
  
    api
      .get(`/reports/getInvoiveByMonth${queryParams}`)
      .then((res) => {
        //setReport(res.data.data);
        setUserSearchData(res.data.data);
          //grand total
          let grandTotal = 0;
          res.data.data.forEach((elem) => {
            grandTotal += elem.invoice_amount_monthly;
          });
          setGtotal(grandTotal);
      })
      .catch(() => {
        message('Reports Data Not Found', 'info');
      });
  };
  
  useEffect(() => {
    handleSearch(); // Call the handleSearch function to fetch initial data
  }, []);

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
      name: 'S.No',
      selector: 's_no',
    },
    {
      name: 'Invoice Month',
      selector: 'invoice_month',
    },

    {
      name: 'Invoice Amount Monthly',
      selector: 'invoice_amount_monthly',
    },
  
  ];

  return (
    <>
      <BreadCrumbs />
      <ToastContainer></ToastContainer>
      <Card>
        <CardBody>
          <Row>
            <Col></Col>
            <Col>
              <FormGroup>
                <Label>Select Category</Label>
                <Input
                  type="select"
                  name="record_type"
                  onChange={(e) => setCompanyName(e.target.value)}
                >
                  
                  <option defaultValue="selected" value="project">Project</option>
                  <option value="tenancy project">Tenancy Project</option>
                  <option value="tenancy work">Tenancy Work</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="crm">Crm</option>

                </Input>
              </FormGroup>
            </Col>
            <Col md="1" className="mt-3">
              <Button color="primary" className="shadow-none" onClick={() => handleSearch()}>
                Go
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card ><CardHeader className="card p-2 text-center">
        <b>Summary</b>
      </CardHeader>
      <CardBody className="card p-2">
        <Row>
        <Col md="3">
            <b>Category:</b> &nbsp; {companyName}
          </Col>
        <Col md="3">
            <b>Invoice For Last 12 Month</b> &nbsp; 
          </Col>
          <Col md="3">
            <b>Invoice Start Date:</b> &nbsp; {monthDate.toLocaleDateString()}
          </Col>
          <Col md="3">
            <b>Invoice End Date:</b> &nbsp; {currentDate.toLocaleDateString()}
          </Col>
        </Row>
      </CardBody>
      </Card>
      <Card>
        <CardBody>
          <Row>
            <Col>
              <ExportReport columns={columns} data={userSearchData} exportValue={exportValue} />
            </Col>
          </Row>
        </CardBody>

        <CardBody>
          <Table>
            <thead>
              <tr>
                {columns.map((cell) => {
                  return <td key={cell.name}>{cell.name}</td>;
                })}
              </tr>
            </thead>
            <tbody>
              {displayEmployees &&
                displayEmployees.map((element, index) => {
                  return (
                    <tr key={element.invoice_id}>
                      <td>{index + 1}</td>
                      <td>{element.invoice_month}</td>
                      <td>{element.invoice_amount_monthly}</td>
                      
                    </tr>
                  );
                })}
              <tr>
                <td>
                  <b></b>
                </td>
                <td>
                  <b>Total Invoice Amount</b>
                </td>
                <td>
                  <b>{gTotal.toLocaleString('en-IN', { minimumFractionDigits: 1 })}</b>
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
export default InvoiceMonthReports;

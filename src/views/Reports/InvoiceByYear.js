import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { ToastContainer } from 'react-toastify';
import { Card, CardBody, Col,Table, Row } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import api from '../../constants/api';
import message from '../../components/Message';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ExportReport from '../../components/Report/ExportReport';

const InvoiceBYYear = () => {
  //All state variable
 // const [invoiceReport, setInvoiceReport] = useState(null);
  const [userSearchData, setUserSearchData] = useState('');
  const exportValue="InvoiceByYearReport"


 //Get data from Training table
 
  const handleSearch = () => {
       api
    .get(`/reports/getInvoiceByYearReport`)
    .then((res) => {

      //setInvoiceReport(res.data.data);
      setUserSearchData(res.data.data);
    })
    .catch(() => {
      message('Project Data Not Found', 'info');
    });
  };
  
  useEffect(() => {
       handleSearch();
  }, []);
  const [page, setPage] = useState(0);

  const employeesPerPage = 20;
  const numberOfEmployeesVistited = page * employeesPerPage;
  const displayEmployees = userSearchData.slice(
    numberOfEmployeesVistited,
    numberOfEmployeesVistited + employeesPerPage,
  );
  console.log("displayEmployees",displayEmployees)
  const totalPages = Math.ceil(userSearchData.length / employeesPerPage);
  const changePage = ({ selected }) => {
    setPage(selected);
  };
  //structure of Training list view
  const columns = [
    {
      name: 'SN',
      selector:'s_no'
    },
    {
      name: 'Year',
      selector:'invoice_year'
    },
    {
      name: 'Amount',
      selector:'invoice_amount_yearly'
    },
    // {
    //   name: 'Category',
    //   selector: 'record_type',
    // },   
     ];
  return (
    <>
        <BreadCrumbs />
        <ToastContainer></ToastContainer>
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
              displayEmployees.map((element,index) => {
                return (
                  <tr key={element.invoice_id}>
                    <td>{index+1}</td>
                    <td>{element.invoice_year}</td>
                    <td>{element.invoice_amount_yearly}</td>
                    {/* <td>{element.record_type}</td> */}
                  </tr>
                );
              })} 
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
export default InvoiceBYYear;

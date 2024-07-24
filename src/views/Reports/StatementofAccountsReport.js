import React, { useEffect, useState } from 'react';
//import axios from 'axios'
import { Row, Col, Label, Card, CardBody, Button, Input, FormGroup, Table } from 'reactstrap';
//import { useParams } from 'react-router-dom';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { ToastContainer } from 'react-toastify';
// import ReactPaginate from 'react-paginate';
import api from '../../constants/api';
import message from '../../components/Message';
import ExportReport from '../../components/Report/ExportReport';

function StatementofAccountsReport() {

  const [company, setCompany] = useState();
  const [searchData, setSearchData] = useState({
    startDate: null,
    endDate: null,
    companyName:null,
    company_id:''
  });
  const [userSearchData, setUserSearchData] = useState();
  const [totalOutstandAmount, setTotalOutstandAmount] = useState();
  const [totalPreviousInvoiceAmount1, setTotalPreviousInvoiceAmount1] = useState(null);  
  //const { id } = useParams();

  const columns = [
    {
      name: 'S.No',
      selector:'s_no'
    },

    {
      name: 'Date',
      selector: 'date',
      grow: 0,
      wrap: true,
      width: '4%',
    },

    {
      name: 'Project Ttitle',
      selector: 'project_title',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Code',
      selector: 'code',
      sortable: true,
      grow: 10,
      wrap: true,
    },
    {
      name: 'Charges (Invoice Amount)',
      selector: 'debit_amount',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Credits (Receipt Amount)',
      selector: 'credit_amount',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Payment Mode',
      selector: 'mode_of_payment',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Amount',
      selector: 'outstanding_amount',
      sortable: true,
      grow: 0,
      wrap: true,
    },
  ];

  //Api call for getting company dropdown
  const getCompany = () => {
    api.get('/company/getCompany').then((res) => {
      setCompany(res.data.data);
    });
  };

  // //Api call for getting company dropdown
  // const getTotalInvoiceAmount = () => {
  //   api.get('/project/total_invoice_amount').then((res) => {
  //     setTotalInvoiceAmount1(res.data.data);
  //   });
  // };

  

  const handleInputs = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  //Get data from Reports table
  const getAccountReports = () => {
    api
      .post('/reports/getAccountStatementReport', searchData)
      .then((res) => {
        setUserSearchData(res.data.data);
        let totalInvoiceAmount = 0;
        let totalReceiptAmount = 0;
        res.data.data.forEach((el) => {
          totalInvoiceAmount += el.debit_amount;
          totalReceiptAmount += el.credit_amount;
        });
        const total = totalInvoiceAmount.toFixed(2) - totalReceiptAmount.toFixed(2);
        setTotalOutstandAmount(total.toFixed(2));
      })
        // Call the function to fetch previous invoice amount
     
      .catch(() => {
        message('Reports Data Not Found', 'info');
      });
  };

  
  useEffect(() => {
    getCompany(); 
    // Function to fetch totalPreviousInvoiceAmount from the server
    const getTotalPreviousInvoiceAmount = () => {
      // Make an API call to get the totalPreviousInvoiceAmount
      api
        .post('/project/getPreviousInvoiceAmount', searchData)
        .then((response) => {
          // Update the state with the received data
          setTotalPreviousInvoiceAmount1(response.data.totalPreviousInvoiceAmount);
        })
        .catch((error) => {
          // Handle errors if necessary
          console.error('Error fetching totalPreviousInvoiceAmount:', error);
        });
    };

    // Fetch the totalPreviousInvoiceAmount when the component mounts
    getTotalPreviousInvoiceAmount();
  }, [searchData]);

  return (
    <div className="">
      <ToastContainer></ToastContainer>
      <Card>
        <CardBody>
          <Row>
            <Col>
              <FormGroup>
                <Label>Start Date</Label>
                <Input
                  type="date"
                  name="startDate"
                  onChange={handleInputs}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>End Date</Label>
                <Input type="date" name="endDate" 
                onChange={handleInputs}
                 />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Select Company Name</Label>
                <Input
                  type="select"
              
                  name="companyName"
                  onChange={handleInputs}
                >
                  <option value="">Please Select</option>
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
            <Button
                  onClick={() => {
                    getAccountReports();
                  }}
                  color="primary" className="shadow-none mt-3" 
                >
                 GO
                </Button>
             
            </Col>
          </Row>
        </CardBody>
      </Card>

  
      <Card>
        <CardBody>
          <Row>
            <Col md="3">
              <Label>
                <b>Company: </b>
                {searchData.companyName}
              </Label>
            </Col>
            <Col md="3">
              <Label>
                <b>Start Date: </b>
                {searchData.startDate ? searchData.startDate : moment().format('1-MM-YYYY')}
              </Label>
            </Col>
            <Col md="3">
              <Label>
                <b> End Date: </b>
                {searchData.endDate ? searchData.endDate : moment().format('DD-MM-YYYY')}
              </Label>
            </Col>
            <Col md="3">
              <Label>
                <b>Total Outstanding Amount: {totalOutstandAmount}</b>

              </Label>
            </Col>
            <Col md="3">
      <Label>
        <b>Total Previous Invoice Amount: {totalPreviousInvoiceAmount1}</b>
      </Label>
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
          <Table>
            <thead>
           
              <tr>
                {columns.map((cell) => {
                  return <td key={cell.name}>{cell.name}</td>;
                })}
              </tr>
            </thead>
            <tbody>
            {userSearchData &&
                userSearchData.map((element, index) => {
                  /* eslint-disable */
                  const keyData = parseInt(element.invoice_id + index);


                  return (
                    <tr key={keyData}>
                      <td>{index + 1}</td>
                      <td>{(element.date)? moment(element.date).format('DD-MM-YYYY'):''}</td>
                      <td>{element.project_title}</td>
                      <td>{element.code}</td>
                      <td>{element.debit_amount}</td>
                      <td>{element.credit_amount}</td>
                      <td>{element.payment_mode}</td>
                      <td>{element.outstanding_amount}</td>
                      <td></td>
                    </tr>
                  );
                  /* eslint-disable */
                })}
                 <tr>
                <td>
                  <b></b>
                </td>
                <td>
                  <b></b>
                </td>
                <td>
                  <b></b>
                </td>
                <td>
                  <b></b>
                </td>
                <td>
                  <b></b>
                </td>
                <td>
                  <b>Total</b>
                </td>
                <td>
                  <b></b>
                </td>
                <td>
                  <b>{totalOutstandAmount}</b>
                </td>
              </tr>
            </tbody>
          </Table>
         
        </CardBody>
      </Card>
    </div>
  );
}

export default StatementofAccountsReport;
import React, { useEffect, useState } from 'react';
import { Row, Button, Col, Input, Table, Card, CardBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
// import 'datatables.net-buttons/js/buttons.html5';
// import 'datatables.net-buttons/js/buttons.print';
import { ToastContainer } from 'react-toastify';
import moment from 'moment';
import CommonTable from '../CommonTable';
import api from '../../constants/api';
import message from '../Message';


function PurchaseInvoiceSummary() {
  const [invoicedata, setInvoiceData] = useState([]);
  const [totalinvoice, setTotalInvoice] = useState(0);
  const [filter, setFilter] = useState({
   supplier_id: ''
  });
  const [supplier, setSupplier] = useState();
  const handleInputs = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };
  const getSupplier = () => {
    api
      .get('/dashboardforpurchaseorder/getSupplierName')
      .then((res) => {
        setSupplier(res.data.data);
        console.log(res.data.data[0]);
      })
      .catch(() => {
        message('Company not found', 'info');
      });
  };
  //get lineitems
  const getInvoiceData = () => {
    api
      .post('/dashboardforpurchaseorder/getInvoiceData', filter)
      .then((res) => {
        setInvoiceData(res.data.data);
        console.log('Summaries', res.data.data);
        let invoice = 0;
        res.data.data.forEach((el) => {
          invoice += el.invoice_amount;
        });
        setTotalInvoice(invoice);
      })
      .catch(() => {
        message('invoicedata not found', 'error');
      });
  };

  const columns = [
    {
      name: 'S.No',
      selector: 's_no',
    },
    {
      name: 'Po Code',
      selector: 'po_codeS',
    },
    {
      name: 'Invoice Code',
      selector: 'purchase Invoice Code',
    },
    {
      name: 'Supplier Name',
      selector: 'company_name',
    },
    {
      name: 'Invoice Date',
      selector: 'purchse_invoice_date',
    },
    {
      name: 'Due Date',
      selector: 'due_date',
    },
    {
        name: 'Status',
        selector: 'status',
      },
    {
        name: 'Invoice Amount',
        selector: 'invoice_amount',
      },
      
];

  useEffect(() => {
    setTimeout(() => {
      $('#example').DataTable({
        pagingType: 'full_numbers',
        pageLength: 20,
        processing: true,
        dom: 'Bfrtip',
        // buttons: [
        //   {
        //     extend: 'csv',
        //     text: 'CSV',
        //     className: 'shadow-none btn btn-primary',
        //   },
        //   {
        //     extend: 'print',
        //     text: 'Print',
        //     className: 'shadow-none btn btn-primary',
        //   },
        // ],
      });
    }, 1000);
    getSupplier();
  }, []);

  return (
    <div className="">
      <ToastContainer></ToastContainer>
      <Card>
      <CommonTable title="Purchase Invoice Summary">
      <CardBody>
        <Row>
            <Col></Col>
            <Col></Col>
          <Col md='3'>
          <Input
                          type="select"
                          onChange={handleInputs}
                          value={filter && filter.supplier_id}
                          name="supplier_id"
                        >
                          <option defaultValue="selected">Please Select</option>
                          {supplier &&
                            supplier.map((e) => {
                              return (
                                <option key={e.supplier_id} value={e.supplier_id}>
                                  {e.company_name}
                                </option>
                              );
                            })}
                        </Input>
          </Col>
          <Col md="2">
            <Button
              color="primary"
              className="shadow-none"
              onClick={() => {
                getInvoiceData();
              }}
            >
              Go
            </Button>
          </Col>
        </Row>
          <Table>
            <thead>
              <tr>
                {columns.map((cell) => {
                  return <td key={cell.name}>{cell.name}</td>;
                })}
              </tr>
            </thead>
            <tbody>
              {invoicedata &&
                invoicedata.map((res, index) => {
                  return (
                    <tr key={res.purchase_invoice_id}>
                      <td>{index + 1}</td>
                      <td>{res.po_code}</td>
                      <td>{res.purchase_invoice_code}</td>
                      <td>{res.company_name}</td>
                      <td>{res.purchase_invoice_date ? moment(res.purchase_invoice_date).format('DD-MM-YYYY') : ''} </td>
                      <td>{res.due_date ? moment(res.due_date).format('DD-MM-YYYY') : ''} </td>
                      <td>{res.status}</td>
                      <td>{res.invoice_amount}</td>
                    </tr>
                  );
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
                  <b></b>
                </td>
                <td>
                  <b>Total</b>
                </td>
                <td>
                  <b>{totalinvoice}</b>
                </td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
        </CommonTable>
      </Card>
    </div>
  );
}

export default PurchaseInvoiceSummary;

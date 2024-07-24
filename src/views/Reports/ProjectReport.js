import React, { useEffect,useState } from 'react';
import { Row, Col, Card, CardBody, CardHeader, Button, Input, FormGroup, Label, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
// import 'datatables.net-buttons/js/buttons.html5';
// import 'datatables.net-buttons/js/buttons.print';
import $ from 'jquery';
import { ToastContainer } from 'react-toastify';
import moment from 'moment';
import api from '../../constants/api';
import message from '../../components/Message';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ExportReport from '../../components/Report/ExportReport';

const OverAllReport = () => {
  //All state variable
  const [projectreport, setProjectReport] = useState(null);
  const [searchData, setSearchData] = useState({
    startDate: null,
    actual_finish_date: null,
    category:null,
    status:''
  });
  const exportValue="Project Report"
  
  //Handle input function for searchdata
  const handleInputs = (e) => {
  setSearchData({ ...searchData, [e.target.name]: e.target.value });
};
  //Get data from Reports table
  const getProject = () => {
    api
      .post('/reports/getProjectReport', searchData)
      .then((res) => {
        console.log("API Response:", res.data); // Log the entire response
        const newData = res.data.data; // Extract the data array
        setProjectReport(newData); // Set the entire data array
      })
      .catch((error) => {
        console.error("API Error:", error);
        message('Over all sales Data Not Found', 'info');
      });
  };

  

  //structure of Training list view
  const columns = [
    {
      name: 'SN',
      selector:'s_no',
    },
   
    {
      name: 'Project Code',
      selector: 'project_code',
      grow: 0,
      wrap: true,
      width: '4%',
    },

    {
      name: 'Project Title',
      selector: 'Project_name',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Category',
      selector: 'category',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Start Date',
      selector: 'start_date',
      sortable: true,
      grow: 0,
    },
    {
      name: 'End Date',
      selector: 'actual_finish_date',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Client Company',
      selector: 'company_name',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Contact',
      selector: 'contact_name',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
      grow: 0,
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      $('#example').DataTable({
        pagingType: 'full_numbers',
        pageLength: 20,
        processing: true,
        dom: 'Bfrtip',
        buttons: [
          {
            extend: 'csv',
            text: 'CSV',
            className: 'shadow-none btn btn-primary',
          },
          {
            extend: 'print',
            text: 'Print',
            className: 'shadow-none btn btn-primary',
          },
        ],
      });
    }, 1000);
  }, []);

  return (
    <>
      <BreadCrumbs />
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
                <Input type="date" name="actual_finish_date"  onChange={handleInputs} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Select Category</Label>
                <Input
                  type="select"
                  name="category"
                  onChange={handleInputs} 
                >
                  <option defaultValue="selected">Select  Category</option>
                  <option value="Project">Project</option>
                  <option value="Tenancy Project">Tenancy Project</option>
                  <option value="Tenancy Work">Tenancy Work</option>
                  <option value="Maintenance">Maintenance</option>
                </Input>
              </FormGroup>
            </Col>
              <Col>
              <FormGroup>
              <Label>Status</Label>
                <Input type="select"  name="status"
                  onChange={handleInputs} >
                    <option defaultValue="selected">Select  Status</option>
                    <option value="WIP">WIP</option>
                    <option value="Billable">Billable</option>
                    <option value="Billed">Billed</option>
                    <option value="Complete">Complete</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Latest">Latest</option>
                </Input>
                </FormGroup>
              </Col>
            <Col md="1" className="mt-3">
              <Button color="primary" className="shadow-none" onClick={() => getProject()}>Go</Button>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card>
      <CardHeader className="card p-2 text-center">
        <b>Project Report</b>
      </CardHeader>
        <CardBody>
          <Row>
            <Col md="3">
              <Label>
                <b>Start Date:</b> {searchData.startDate}
              </Label>
            </Col>
            <Col md="3">
              <Label>
                <b> End Date:</b> {searchData.actual_finish_date}
              </Label>
            </Col>
            <Col md="3">
              <Label>
                <b>Category:</b> {searchData.category}
              </Label>
            </Col>
            <Col md="3">
              <Label>
                <b>Status:</b> {searchData.status}
              </Label>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <Row>
            <Col>
              <ExportReport columns={columns} data={projectreport} exportValue={exportValue} />
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
              {projectreport &&
                projectreport.map((element, index) => {
                  return (
                    <tr key={element.project_id}>
                    <td>{index + 1}</td>
                    <td>{element.project_code}</td>
                    <td>{element.Project_name}</td>
                    <td>{element.category}</td>
                    <td>{moment(element.start_date).format('YYYY-MM-DD')}</td>
                    <td>{moment(element.actual_finish_date).format('YYYY-MM-DD')}</td>
                    <td>{element.company_name}</td>
                    <td>{element.contact_name}</td>
                    <td>{element.status}</td>
                  </tr>
                  );
                })}
            </tbody>
            
          </Table>
        </CardBody>
      </Card>
    </>
  );
};
export default OverAllReport;

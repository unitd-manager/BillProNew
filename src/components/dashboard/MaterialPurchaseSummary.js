import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Button, Input, FormGroup } from 'reactstrap';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import { v4 as uuidv4 } from 'uuid';
import CommonTable from '../CommonTable';
import message from '../Message';
import api from '../../constants/api';

const MaterialPurchaseSummary = () => {
  const [report, setReport] = useState();
  const [userSearchData, setUserSearchData] = useState('');
  // const [startDate, setStartDate] = useState('');
  // const [endDate, setEndDate] = useState('');
  const [projectName, setProjectName] = useState('');
  const [project, setProject] = useState(null);
  //const [data, setData] = useState();
  //get lineitems
  // get Project Summary
  const getProjectSummary = () => {
    api
    .get('/materialrequest/getMaterialRequest')
      .then((res) => {
        setUserSearchData(res.data.data);
        setReport(res.data.data);
      })
      .catch(() => {
        message('Supplier Data Not Found', 'info');
      });
  };

  useEffect(() => {
    api.get('project/getProjects').then((res) => {
      setProject(res.data.data);
    });
  }, []);

  const handleSearch = () => {
    const newData = report.filter(
      (y) => y.title === (projectName === '' ? y.title : projectName),
    );

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
    getProjectSummary();
  }, []);

   const columns = [
    {
      name: 'id',
      selector: 'material_request_id',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: 'Project Name',
      selector: 'project_name',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Material Code',
      selector: 'material_request_code',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Requested Date',
      selector: 'material_request_date',
      sortable: true,
      grow: 2,
      width: 'auto',
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
                  name="project_id"
                  onChange={(e) => setProjectName(e.target.value)}
                >
                  <option value="">Select Company</option>

                  {project &&
                    project.map((element) => {
                      return (
                        <option key={element.project_id} value={element.project_id}>
                          {element.title}
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

        <CommonTable title="MaterialPurchase Summary">
          <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {displayEmployees &&
              displayEmployees.map((element, i) => {
                return (
                  <tr key={uuidv4()}>
                    <td>{i + 1}</td>
                    <td>{element.proj_title}</td>
                    <td>{element.material_request_code}</td>
                    <td>{(element.material_request_date)?moment(element.material_request_date).format('DD-MM-YYYY'):''}</td>
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

export default MaterialPurchaseSummary;

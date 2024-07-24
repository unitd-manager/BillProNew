import React, { useState, useEffect } from 'react';
import { Row, Col, Table } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';
import api from '../../constants/api';
import message from '../Message';
import { jicolumns, tlcolumns } from '../../data/PayrollHR/Employee';
import AddNote from '../Tender/AddNote';
import ViewNote from '../Tender/ViewNote';

function LinkedPortalsTab({ id,arb }) {
  LinkedPortalsTab.propTypes = {
    id: PropTypes.any,
    arb: PropTypes.any,
  };
  //state variables
  const [jobInformationHistoryDetails, setJobInformationHistoryDetails] = useState([]);
  const [trainingLinkedDetails, setTrainingLinkedDetails] = useState([]);
  //get job information by employee id

  const getjobInformationHistoryData = () => {
    api
      .post('/employeeModule/TabJobInformationHistoryById', { employee_id: id })
      .then((res) => {
        setJobInformationHistoryDetails(res.data.data);
      })
      .catch(() => {
        message('Jobinfohistory Data Not Found', 'info');
      });
  };

  //get training linked by employee id
  const gettrainingLinkedData = () => {
    api
      .post('/employeeModule/getTabTrainingLinkedByEmpId', { employee_id: id })
      .then((res) => {
        setTrainingLinkedDetails(res.data.data);
      })
      .catch(() => {
        message('TrainingsLinked Data Not Found', 'info');
      });
  };

  useEffect(() => {
    getjobInformationHistoryData();
    gettrainingLinkedData();
  }, []);
  return (
    <div>
      <ToastContainer></ToastContainer>
      <Row style={{alignItems:'flex-start'}}>
        <Col md="6">
          <ComponentCard title= {arb ?'تاريخ المعلومات الوظيفية':'Job Information History'}>
            <Table id="examplepl" className="display">
              <thead>
                <tr>
                  {jicolumns.map((cell) => {
                    return <td key={cell.name}>{cell.name}</td>;
                  })}
                </tr>
              </thead>
              <tbody>
                {jobInformationHistoryDetails &&
                  jobInformationHistoryDetails.map((element) => {
                    return (
                      <tr key={element.job_information_id}>
                        <td>{element.job_information_id}</td>
                        <td>{element.basic_pay}</td>
                        <td>{element.start_date}</td>
                        <td>{element.end_date}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </ComponentCard>
        </Col>
        <Col md="6">
          <ComponentCard title= {arb ?'التدريب مرتبط':'Training Linked'}>
            <Table id="examplepl" className="display">
              <thead>
                <tr>
                  {tlcolumns.map((cell) => {
                    return <td key={cell.name}>{cell.name}</td>;
                  })}
                </tr>
              </thead>
              <tbody>
                {trainingLinkedDetails &&
                  trainingLinkedDetails.map((element) => {
                    return (
                      <tr key={element.training_staff_id}>
                        <td>{element.training_staff_id}</td>
                        <td>{element.title}</td>
                        <td>{element.training_from_date}</td>
                        <td>{element.training_to_date}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </ComponentCard>
        </Col>
      </Row>
      <Row>
        <ComponentCard title= {arb ?'أضف ملاحظة':'Add a note'}>
          <AddNote recordId={id} roomName="EmployeeEdit" />
          <ViewNote recordId={id} roomName="EmployeeEdit" />
        </ComponentCard>
      </Row>
    </div>
  );
}

export default LinkedPortalsTab;

import React, {useState,useEffect} from 'react';
import { Row, Col, Button } from 'reactstrap';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import CommonTable from '../CommonTable';
import TimesheetModal from '../ProjectModal/TimesheetModal';
import ProjectChooseEmployee from '../ProjectModal/ProjectChooseEmployee';
import api from '../../constants/api';
import PdfEmpTimesheet from '../PDF/PdfEmpTimesheet';

const AddEmployee = ({ProposalId,projectId,arb,arabic,genLabel}) => {
  AddEmployee.propTypes = {
    ProposalId: PropTypes.any,
    projectId: PropTypes.any,
    arb: PropTypes.any,
    arabic: PropTypes.any,
    genLabel: PropTypes.any,
  };

  const { id } = useParams();
console.log('prokjectId',projectId);
  const [timesheet, setTimesheet] = useState(false);
  const [chooseEmp, setChooseEmp] = useState(false);
  const [getemployeeLinked, setGetEmployeeLinked] = useState();
  const [getSingleEmployeeData, setSingleEmployeeData] = useState();
  const [totalEmpTimesheetRecord, setTotalEmpTimesheetRecord] = useState();

    const Employeecolumns = [
        {
          name: '#',
          grow: 0,
          wrap: true,
          width: '4%',
        },
        {
          name: 'Name',
          selector: 'name',
        },
      ];
console.log('projectId',projectId)
  //getting Employee data by Employee id
  const getLinkedEmployee = () => {
      api
      .post('/project/getTimesheetStaffById', { project_id: projectId })
      .then((res) => {
        setGetEmployeeLinked(res.data.data);
      })
      .catch(() => {});
  }

  const showEmpDataInTimsheet = () => {
    api.get('/timesheet/getAllEmpTimesheet').then((res) => {
      setTotalEmpTimesheetRecord(res.data.data);
    });
  };

console.log('getemployeeLinked',getemployeeLinked)
  useEffect(() => {
    getLinkedEmployee();
    showEmpDataInTimsheet();
    }, [id])

    const uniqueEmployeeData = getemployeeLinked?.reduce((acc, curr) => {
      const existingEmployee = acc.find((employee) => employee.employee_id === curr.employee_id);
        if (!existingEmployee) {
        acc.push(curr);
      }
    
      return acc;
    }, []) || [];
    console.log('uniqueEmployeeData',uniqueEmployeeData)
  return (
    <>
    <Row>
      <Col md='10'>
        <CommonTable title="Add Employee"
          Button={
                <Button color="primary" className="shadow-none" onClick={() => { setChooseEmp(true)
             }}> Choose </Button>
             
            }>
          <thead>
            <tr>
              {Employeecolumns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {uniqueEmployeeData.map((e,i)=>{
             return (
             <tr>
              <td>{i+1}</td>
              <td>{arb?e.first_name_arb:e.first_name}</td>
              <td>
                  <Button color="primary" className="shadow-none" 
                  onClick={() => { 
                    setTimesheet(true)
                    setSingleEmployeeData(e)
                  }}> New Timesheet </Button>
              </td>
              <td> < PdfEmpTimesheet getSingleEmployeeData={e} totalEmpTimesheetRecord={totalEmpTimesheetRecord} /> </td>
           </tr>) 
            })}
          </tbody>
        </CommonTable>
      </Col>
    </Row>
     <ProjectChooseEmployee chooseEmp={chooseEmp}arb={arb}genlabel={genLabel}arabic={arabic} setChooseEmp={setChooseEmp}ProposalId={ProposalId} projectId={projectId} />
    <TimesheetModal timesheet={timesheet} setTimesheet={setTimesheet} 
    getSingleEmployeeData={getSingleEmployeeData} 
    setSingleEmployeeData={setSingleEmployeeData} />
    </>
  );
};

export default AddEmployee;
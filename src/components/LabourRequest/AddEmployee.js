import React, {useState,useEffect} from 'react';
import { Row, Col, Button } from 'reactstrap';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as Icon from 'react-feather';
import Swal from 'sweetalert2';
import CommonTable from '../CommonTable';
import TimesheetModal from '../ProjectModal/TimesheetModal';
import ChooseEmployee from '../ProjectModal/ChooseEmployee';
import api from '../../constants/api';
import MonthYear from '../ProjectModal/MonthYear';


  export default function AddEmployee({ arb, projectId }) {
    AddEmployee.propTypes = {
      arb: PropTypes.any,
      projectId: PropTypes.any,
    };

  const { id } = useParams();

  const [timesheet, setTimesheet] = useState(false);
  const [chooseEmp, setChooseEmp] = useState(false);
  const [chooseMonthYear, setChooseMonthYear] = useState(false);
  const [getemployeeLinked, setGetEmployeeLinked] = useState();
  const [getSingleEmployeeData, setSingleEmployeeData] = useState();
  const deleteRecord = (deleteID) => {
    Swal.fire({
      title: `Are you sure? ${deleteID}`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        api.post('/employeeModule/deleteEmployeeTime', { employee_timesheet_id: deleteID }).then(() => {
          Swal.fire('Deleted!', 'Your Employee has been deleted.', 'success');
          window.location.reload();
        });
      }
    });
  };

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
        }
      ];

  //getting Employee data by Employee id
  const getLinkedEmployee = () => {
  // eslint-disable-next-line
     api.post('/timesheet/getTimesheetLabourById', { labour_request_id: parseInt(id) })
      .then((res) => {
        console.log("res.data.data",res.data.data)
        setGetEmployeeLinked(res.data.data)
      })
  }

  useEffect(() => {
    getLinkedEmployee();
    }, [id])

    const uniqueEmployeeData = getemployeeLinked?.reduce((acc, curr) => {
      const existingEmployee = acc.find((employee) => employee.employee_id === curr.employee_id);
        if (!existingEmployee) {
        acc.push(curr);
      }
    
      return acc;
    }, []) || [];

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
              <td>{e.employee_name}</td>
              <td style={{display:'flex',justifyContent:'center'}}>
              <span
                                className="addline"
                                onClick={() => {
                                  deleteRecord(e.employee_timesheet_id);
                                }}
                              >
                                <Icon.Trash2 />
                              </span>
              </td>
           </tr>) 
            })}
          </tbody>
        </CommonTable>
      </Col>
    </Row>
     <ChooseEmployee chooseEmp={chooseEmp} setChooseEmp={setChooseEmp} arb={arb} projectId={projectId}/>
     <MonthYear chooseMonthYear={chooseMonthYear} setChooseMonthYear={setChooseMonthYear} getSingleEmployeeData={getSingleEmployeeData} 
    setSingleEmployeeData={setSingleEmployeeData} />
    <TimesheetModal timesheet={timesheet} setTimesheet={setTimesheet} 
    getSingleEmployeeData={getSingleEmployeeData} 
    setSingleEmployeeData={setSingleEmployeeData} />
    </>
  );
};


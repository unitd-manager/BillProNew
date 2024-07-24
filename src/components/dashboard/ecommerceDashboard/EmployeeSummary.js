import React, { useState,useEffect } from 'react'
import { Row,Col } from 'reactstrap';
import CommonTable from '../../CommonTable'
import api from '../../../constants/api';
import message from '../../Message';

function EmployeeSummary() {
  // const[employees,setEmployees]=useState([]);
const[totalCitizenEmployees,setTotalCitizenEmployees]=useState(0);
const[totalPrEmployees,setTotalPrEmployees]=useState(0);
const[totalDpEmployees,setTotalDpEmployees]=useState(0);
const[totalSpEmployees,setTotalSpEmployees]=useState(0);
const[totalEpEmployees,setTotalEpEmployees]=useState(0);
const[totalWpEmployees,setTotalWpEmployees]=useState(0);

  const getAllEmployees=()=>{
    
    api.get('/employeeModule/getCurrentEmployee')
    .then((res) => {
      console.log(res.data.data);
      const prEmployees= res.data.data.filter((el)=>{
        return el.citizen === 'PR'
          })
          const citizenEmployees= res.data.data.filter((el)=>{
            return el.citizen === 'Citizen'
              })
              const spEmployees= res.data.data.filter((el)=>{
                return el.citizen === 'SP'
                  })
                  const dpEmployees= res.data.data.filter((el)=>{
                    return el.citizen === 'DP'
                      })
                      const epEmployees= res.data.data.filter((el)=>{
                        return el.citizen === 'EP'
                          })
                          const wpEmployees= res.data.data.filter((el)=>{
                            return el.citizen === 'WP'
                              })


                    const totalPr=prEmployees.length;
                    const totalCitizen=citizenEmployees.length;
                    const totalSp=spEmployees.length;
                    const totalDp=dpEmployees.length;          
                    const totalEp=epEmployees.length;
                    const totalWp=wpEmployees.length;

                   

                    setTotalCitizenEmployees(totalCitizen);
                    setTotalPrEmployees(totalPr);
                    setTotalSpEmployees(totalSp);
                    setTotalDpEmployees(totalDp);
                    setTotalEpEmployees(totalEp);
                    setTotalWpEmployees(totalWp);
    })
    .catch(() => {
      message('Employee Data Not Found', 'info');
     
    });
  }

  

    // const columns = [
    //     {
    //       name: "Total Local employees (PR only) :",
    //       selector: "opportunity_id",
    //     },
    //     {
    //       name: "Total Local employees (Citizen only) :",
    //       selector: "opportunity_id",
    //     },
    //     {
    //       name: "Total EP :",
    //       selector: "company_name",
    //     },
    //     {
    //         name: "Total DP :",
    //         selector: "company_name",
    //     },
    //     {
    //         name: "Total WP :",
    //         selector: "company_name",
    //     },
    //     {
    //         name: "Total SP :",
    //         selector: "company_name",
    //     },
    //     {
    //         name: "TOTAL SUMMARY",
    //         selector: "company_name",
    //     },
        
    //     {
    //         name: "Total no of Local Workers:",
    //         selector: "company_name",
    //     },
    //     {
    //         name: "Total no of Foreign Workers:",
    //         selector: "company_name",
    //     },
    //   ];

useEffect(()=>{
  getAllEmployees();
},[])

  return (
    <>
    <CommonTable title="Employee Summary">
        {/* <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name} </td>;
              })}
           </tr>
        </thead>
        <tbody>
            <tr>
                <td>{totalPrEmployees}</td>
                <td>{totalCitizenEmployees}</td>
                <td>{totalEpEmployees}</td>
                <td>{totalDpEmployees}</td>
                <td>{totalWpEmployees}</td>
                <td>{totalSpEmployees}</td>
                <td></td>
                <td>{parseFloat(totalCitizenEmployees) + parseFloat(totalPrEmployees)}</td>
                <td>{parseFloat(totalSpEmployees) +parseFloat(totalDpEmployees) +parseFloat(totalEpEmployees)+ parseFloat(totalWpEmployees) }</td>
                
                <td></td>
            </tr>
        </tbody> */}
        <Row className='py-2'><Col md="10">Total Local employees (PR only) </Col><Col md="2">{totalPrEmployees}</Col></Row>
        <Row className='py-2'><Col md="10">Total Local employees (Citizen only) </Col><Col md="2">{totalCitizenEmployees}</Col></Row>
        <Row className='py-2'><Col md="10">Total EP </Col><Col md="2">{totalEpEmployees}</Col></Row>
        <Row className='py-2'><Col md="10">Total DP </Col><Col md="2">{totalDpEmployees}</Col></Row>
        <Row className='py-2'><Col md="10">Total WP </Col><Col md="2">{totalWpEmployees}</Col></Row>
        <Row className='py-2'><Col md="10">Total SP </Col><Col md="2">{totalSpEmployees}</Col></Row>
        <Row className='py-2'><Col md="4"></Col><Col md="4">Total Summary</Col><Col md="4"></Col></Row>
        <Row className='py-2'><Col md="10">Total no of Local Workers</Col><Col md="2">{parseFloat(totalCitizenEmployees) + parseFloat(totalPrEmployees)}</Col></Row>
        <Row className='py-2'><Col md="10">Total no of Foreign Workers </Col><Col md="2">{parseFloat(totalSpEmployees) +parseFloat(totalDpEmployees) +parseFloat(totalEpEmployees)+ parseFloat(totalWpEmployees) }</Col></Row>
    </CommonTable>
    </>
  )
}

export default EmployeeSummary
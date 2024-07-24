import React, { useEffect, useState } from 'react';
import { Row, Form, Table } from 'reactstrap';
import PropTypes from 'prop-types';

import moment from 'moment';
import api from '../../constants/api';


export default function LeavePastHistory({ PastleavesDetails,leavesDetails }) {
  LeavePastHistory.propTypes = {
    PastleavesDetails: PropTypes.any,
    leavesDetails:PropTypes.object
  };
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  const selectedLanguage = getSelectedLanguageFromLocalStorage();

  const [arabic, setArabic] = useState([]);


  const arb =selectedLanguage === 'Arabic'

  // const eng =selectedLanguage === 'English'
   

  const getArabicCompanyName = () => {
      api
      .get('/leave/getTranslationforHRLeave')
      .then((res) => {
        setArabic(res.data.data);
      })
      .catch(() => {
        // Handle error if needed
      });   
  };
  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }
  useEffect(() => {
    
    getArabicCompanyName();

  }, []);

 
  let pastLeaves=[];
  if(PastleavesDetails){
    pastLeaves=PastleavesDetails.filter((el)=>{
    return (el.leave_id !== leavesDetails.leave_id && (new Date(leavesDetails.date)>= new Date(el.date) ) )
  })
  }

  // Past leave History table
  const columns = [
    {
      name: arabic.find(item => item.key_text === 'mdHRLeave.From Date')?.[genLabel],
    },
    {
      name: arabic.find(item => item.key_text === 'mdHRLeave.To Date')?.[genLabel],
    },
    {
      name: arabic.find(item => item.key_text === 'mdHRLeave.Leave Type')?.[genLabel],
    },
    {
      name: arabic.find(item => item.key_text === 'mdHRLeave.No of Days(Current Month)')?.[genLabel],
    },
  ];

  return (
    <Form>
      <Row>
        <Table id="example1" className="display border border-secondary rounded">
          <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {pastLeaves &&
              pastLeaves.map((element) => {
                return (
                  <tr key={element.employee_id}>
                     
                         
                    <td>{moment(element.from_date).format('YYYY-MM-DD')}</td>
                    <td>{moment(element.to_date).format('YYYY-MM-DD')}</td>
                    <td>
                    {' '}
                            {arb?element.leave_type_arb:element.leave_type}{' '}
</td>
                    <td>{element.no_of_days?(element.no_of_days_next_month?parseFloat(element.no_of_days) +parseFloat (element.no_of_days_next_month):element.no_of_days):''}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Row>
    </Form>
  );
}

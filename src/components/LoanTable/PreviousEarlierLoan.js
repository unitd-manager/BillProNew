import React from 'react';
import { Form, FormGroup, Table } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';

export default function PreviousEarlierLoan({ loan ,loanDetails}) {
  PreviousEarlierLoan.propTypes = {
    loan: PropTypes.any,
    loanDetails:PropTypes.any
  };
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };

  const selectedLanguage = getSelectedLanguageFromLocalStorage();

  const arb = selectedLanguage === 'Arabic';

  let prevloan=[];
  if(loan){
   prevloan=loan.filter((el)=>{
    return (el.loan_id !== loanDetails.loan_id && (new Date(loanDetails.date)>= new Date(el.date) ) )
  })
  console.log('prev loan',prevloan)}
  
  const columns = [
    {
      name: '#',
    },
    {
      name: arb? 'نوع القرض': 'Type of Loan',
    },
    {
      name: arb? 'حالة':'Status',
    },
    {
      name: arb? 'تاريخ':'Date',
    },
    {
      name:arb? 'تاريخ بدء القرض': 'Loan Start Date',
    },
    {
      name: arb? 'إجمالي مبلغ القرض':'Total Loan Amount',
    },
    {
      name:arb? 'المبلغ المستحق (شهريا)': 'AmountPayable(permonth)',
    },
    {
      name:arb? 'تاريخ إغلاق القرض': 'Loan Closing Date',
    },
  ];
  return (
    <Form>
      <FormGroup>
        <Table id="example" className="display border border-secondary rounded">
          <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {prevloan &&
              prevloan.map((element, index) => {
                return (
                  <tr key={element.loan_id}>
                    <td>{index + 1}</td>
                    <td>{element.type}</td>
                    <td>{element.status}</td>
                    <td>{element.date ? moment(element.date).format('DD-MM-YYYY') : ''}</td>
                    <td>
                      {element.loan_start_date
                        ? moment(element.loan_start_date).format('DD-MM-YYYY')
                        : ''}
                    </td>
                    <td>{element.amount}</td>
                    <td>{element.month_amount}</td>
                    <td>
                      {element.loan_closing_date
                        ? moment(element.loan_closing_date).format('DD-MM-YYYY')
                        : ''}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </FormGroup>
    </Form>
  );
}

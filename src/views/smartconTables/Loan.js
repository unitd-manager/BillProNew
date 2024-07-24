 import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import moment from 'moment';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net-buttons/js/buttons.colVis';
// import 'datatables.net-buttons/js/buttons.flash';
// import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { Link } from 'react-router-dom';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';

const Loan = () => {
  //state variale
  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(false);
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  const selectedLanguage = getSelectedLanguageFromLocalStorage();

  //getting loan data in db
  const getLoan = () => {
    setLoading(true);
    api
      .get('/loan/getLoan')
      .then((res) => {
        setLoan(res.data.data);
        $('#example').DataTable({
          pagingType: 'full_numbers',
          pageLength: 20,
          processing: true,
          dom: 'Bfrtip',
          buttons: [
            {
              extend: 'print',
              text: 'Print',
              className: 'shadow-none btn btn-primary',
            },
          ],
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getLoan();
  }, []);
  const [arabic, setArabic] = useState([]);


  const arb =selectedLanguage === 'Arabic'

  // const eng =selectedLanguage === 'English'
   

  const getArabicCompanyName = () => {
      api
      .get('/loan/getTranslationforHRLoan')
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

 
  //  stucture of loan list view
  const columns = [
    {
      name: '#',
      selector: '',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name:arb ? 'يحرر' : 'Edit' ,
      selector: 'edit',
      cell: () => <Icon.Edit2 />,
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
    {
      name: arabic.find(item => item.key_text === 'mdHRLoan.Employee Name')?.[genLabel],
      selector: 'employee_name',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdHRLoan.Loan Application Date')?.[genLabel],
      selector: 'date',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdHRLoan.Total Loan Amount')?.[genLabel],
      selector: 'amount',
      sortable: true,
      grow: 0,
    },
    {
      name:arabic.find(item => item.key_text ===  'mdHRLoan.Amount Payable(per month)')?.[genLabel],
      selector: 'month_amount',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: arabic.find(item => item.key_text ===  'mdHRLoan.Total Amount Paid')?.[genLabel],
      selector: 'total_repaid_amount',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: arabic.find(item => item.key_text ===  'mdHRLoan.Amount Payable')?.[genLabel],
      selector: 'amount_payable',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: arabic.find(item => item.key_text === 'mdHRLoan.Status')?.[genLabel],
      selector: 'status',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
  ];

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />

        <CommonTable
          loading={loading}
          title= {arb ?'لائحة القروض':'Loan List'}
          module='Loan'
          Button={
            <Link to="/LoanDetails">
              <Button color="primary" className="shadow-none mr-2">
              {arb ?'اضف جديد':'Add New'}              </Button>
            </Link>
          }
        >
          <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {loan &&
              loan.map((element, index) => {
                return (
                  <tr key={element.loan_id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/LoanEdit/${element.loan_id}/${element.employee_id}`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.employee_name}</td>
                    <td>{element.date ? moment(element.date).format('DD-MM-YYYY') : ''}</td>
                    <td>{element.amount}</td>
                    <td>{element.month_amount}</td>
                    <td>{element.total_repaid_amount}</td>
                    <td>{element.amount_payable}</td>
                    <td>{element.status}</td>
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
};

export default Loan;

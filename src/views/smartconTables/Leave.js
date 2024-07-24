import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import moment from 'moment';
// import 'datatables.net-buttons/js/buttons.colVis';
// import 'datatables.net-buttons/js/buttons.flash';
// import 'datatables.net-buttons/js/buttons.html5';
// import 'datatables.net-buttons/js/buttons.print';
import { Link } from 'react-router-dom';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';

const Leaves = () => {
  //Const Variables
  const [leaves, setLeaves] = useState(null);
  const [loading, setLoading] = useState(false);
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  const selectedLanguage = getSelectedLanguageFromLocalStorage();

  // get Leave
  const getLeave = () => {
    api
      .get('/leave/getLeave')
      .then((res) => {
        setLeaves(res.data.data);
        $('#example').DataTable({
          pagingType: 'full_numbers',
          pageLength: 20,
          processing: true,
          dom: 'Bfrtip',
          // buttons: [
          //   {
          //     extend: 'print',
          //     text: 'Print',
          //     className: 'shadow-none btn btn-primary',
          //   },
          // ],
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getLeave();
  }, []);
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

 
  //  stucture of leave list view
  const columns = [
    {
      name: 'id',
      selector: 'leave_id',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name:arb ? 'يحرر' : 'Edit',
      selector: 'edit',
      cell: () => <Icon.Edit2 />,
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },

    {
      name: arabic.find(item => item.key_text === 'mdHRLeave.Employee Name')?.[genLabel],
      selector: 'employee_name',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdHRLeave.Designation')?.[genLabel],
      selector: 'designation',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdHRLeave.Status')?.[genLabel],
      selector: 'status',
      sortable: true,
      grow: 0,
    },
    {
      name: arabic.find(item => item.key_text === 'mdHRLeave.From Date')?.[genLabel],
      selector: 'from_date',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: arabic.find(item => item.key_text === 'mdHRLeave.To Date')?.[genLabel],
      selector: '	to_date',
      sortable: true,
      grow: 2,
      width: 'auto',
    },
    {
      name: arabic.find(item => item.key_text === 'mdHRLeave.No of Days(Current Month)')?.[genLabel],
      selector: 'no_of_days',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdHRLeave.No of Days(Next Month)')?.[genLabel],
      selector: 'no_of_days_next_month',
      sortable: true,
      width: 'auto',
    },
    {
      name: arabic.find(item => item.key_text === 'mdHRLeave.Leave Type')?.[genLabel],
      selector: 'leave_type',
      sortable: true,
      width: 'auto',
    },
  ];

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />
        <CommonTable
          loading={loading}
          title="Leave List"
          module='Leave'
          Button={
            <Link to="/LeaveDetails">
              <Button color="primary" className="shadow-none mr-2">
              {arb ?'اضف جديد':'Add New'}             
               </Button>
              
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
            {leaves &&
              leaves.map((element, i) => {
                return (
                  <tr key={element.leave_id}>
                    <td>{i + 1}</td>
                    <td>
                      <Link className='editlink' to={`/LeavesEdit/${element.leave_id}?tab=1`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.employee_name}</td>
                    <td>{element.position}</td>
                    <td>{element.status}</td>
                    <td>{element.from_date ? moment(element.from_date).format('DD-MM-YYYY') : ''}</td>
                    <td>{element.to_date ? moment(element.to_date).format('DD-MM-YYYY') : ''}</td>
                    <td>{element.no_of_days}</td>
                    <td>{element.no_of_days_next_month}</td>
                    <td>{element.leave_type}</td>
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
};

export default Leaves;

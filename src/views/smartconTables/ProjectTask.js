import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';

const ProjectTask = () => {
  //All state variable
  const [projectTask, setProjectTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
const selectedLanguage = getSelectedLanguageFromLocalStorage();
const [arabic, setArabic] = useState([]);

  const arb =selectedLanguage === 'Arabic'
  
  const getArabicCompanyName = () => {
      api
      .get('/projecttask/getTranslationForProjectTask')
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


  //Get data from Training table
  const getProjectTask= () => {
    api
      .get('/projecttask/getProjectTask')
      .then((res) => {
        setProjectTask(res.data.data);
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
    getProjectTask();
    getArabicCompanyName();
  }, []);
  //structure of Training list view
  const columns = [
    {
      name: 'id',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: 'Edit',
      selector: 'edit',
      cell: () => (
        <Link to="/">
          <Icon.Edit3 />
        </Link>
      ),
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
    {
   
      name: arabic.find(item => item.key_text === 'mdProjectTask.Task Title')?.[genLabel],
      selector: 'task_title',
      sortable: true,
      grow: 0,

    },
    {
    
      name: arabic.find(item => item.key_text === 'mdProjectTask.Job Order Title')?.[genLabel],
      selector: 'job_title',
      sortable: true,
      grow: 0,
      
    },
    {
    
      name: arabic.find(item => item.key_text === 'mdProjectTask.Project Name')?.[genLabel],
      selector: 'title',
      sortable: true,
      grow: 0,
      
    },
    // {
    //   name: 'Customer Name',
    //   selector: 'company_name',
    //   sortable: true,
    //   grow: 0,
      
    // },
    // {
    //   name: 'Job Order Code',
    //   selector: 'job_order_code',
    //   sortable: true,
    //   grow: 0,
      
    // },
    {
     
      name: arabic.find(item => item.key_text === 'mdProjectTask.Staff Name')?.[genLabel],
      selector: 'first_name',
      sortable: true,
      grow: 0,
      
    },
    {
     
      name: arabic.find(item => item.key_text === 'mdProjectTask.Start Date')?.[genLabel], 
      selector: 'start_date',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
     
      name: arabic.find(item => item.key_text === 'mdProjectTask.End Date')?.[genLabel],
      selector: 'end_date',
      sortable: true,
      grow: 0,
      
    },
    {
    
      name: arabic.find(item => item.key_text === 'mdProjectTask.Completion')?.[genLabel],
      selector: 'completion',
      sortable: true,
      grow: 0,
      
    },
    {
      
      name: arabic.find(item => item.key_text === 'mdProjectTask.Status')?.[genLabel],
      selector: 'status',
      sortable: true,
      grow: 0,
     
    }, 
  ];
  return (
    <div className="container pt-xs-25">
      <BreadCrumbs />
      <ToastContainer></ToastContainer>
      <CommonTable
        loading={loading}
        title="Task List"
        module='Project Task'
        Button={
          <Link to="/ProjectTaskDetails">
            <Button color="primary" className="shadow-none mr-2">
              Add New
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
            {projectTask &&
              projectTask.map((element, index) => {
                return (
                  <tr key={element.project_task_id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/ProjectTaskEdit/${element.project_task_id}`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{arb && element.task_title_arb ?element.task_title_arb : element.task_title}</td>
                    <td>{arb && element.job_title_arb ?element.job_title_arb : element.job_title}</td>
                    <td>{arb && element.title_arb ?element.title_arb : element.title}</td>
                    {/* <td>{element.company_name}</td>
                    <td>{element.job_order_code}</td> */}
                    <td>{arb && element.first_name_arb ?element.first_name_arb : element.first_name}</td>
                    <td>{element.start_date ? moment(element.start_date).format('DD-MM-YYYY') : ''}</td>
                    <td>{element.end_date ? moment(element.end_date).format('DD-MM-YYYY') : ''}</td>
                    <td>{arb && element.completion_arb ?element.completion_arb : element.completion}</td> 
                    <td>{arb && element.status_arb ?element.status_arb : element.status}</td>
                  </tr>
                );
              })}
          </tbody>
      </CommonTable>
    </div>
  );
};
export default ProjectTask;


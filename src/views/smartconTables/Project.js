import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';

const Project = () => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(null);
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
const selectedLanguage = getSelectedLanguageFromLocalStorage();

  const getProject = () => {
    api
      .get('project/getProjectInErp')
      .then((res) => {
        setProject(res.data.data);
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

  const [arabic, setArabic] = useState([]);


  const arb =selectedLanguage === 'Arabic'

  // const eng =selectedLanguage === 'English'
  

  const getArabicCompanyName = () => {
      api
      .get('/project/getTranslationForProject')
      .then((res) => {
        setArabic(res.data.data);
      })
      .catch(() => {
        // Handle error if needed
      });   
  };

  useEffect(() => {
    getProject();
    getArabicCompanyName();
  }, []);
  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }

  const columns = [
    {
      name: 'id',
      selector: 'project_id',
      grow: 0,
      wrap: true,
    },
    {
      name: 'Edit',
      selector: 'edit',
      cell: () => <Icon.Edit2 />,
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
    // {
    //   name: 'Del',
    //   selector: 'delete',
    //   cell: () => <Icon.Trash />,
    //   grow: 0,
    //   width: 'auto',
    //   wrap: true,
    // },
    {
      name: arabic.find(item => item.key_text === 'mdProject.Project Code')?.[genLabel],
      selector: 'project_code',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdProject.Proposal Code')?.[genLabel],
      selector: 'proposal_code',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdProject.Title')?.[genLabel],
      selector: 'title',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdProject.Company')?.[genLabel],
      selector: 'company_name',
      sortable: true,
      grow: 0,
    },
    {
      name: arabic.find(item => item.key_text === 'mdProject.Contact')?.[genLabel],
      selector: 'contact_name',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: arabic.find(item => item.key_text === 'mdProject.Category')?.[genLabel],
      selector: 'category',
      sortable: true,
      grow: 2,
      width: 'auto',
    },
    {
      name: arabic.find(item => item.key_text === 'mdProject.Status')?.[genLabel],
      selector: 'status',
      sortable: true,
      grow: 2,
      wrap: true,
    },
  ];
  return (
    <div className="container pt-xs-25">
      <BreadCrumbs />
      <ToastContainer></ToastContainer>
      <CommonTable
        loading={loading}
        title="Project List"
        module='Project'
        Button={
          <Link to="/ProjectListDetails">
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
            {project &&
              project.map((element, i) => {
                return (
                  <tr key={element.title}>
                    <td>{i + 1}</td>
                    <td>
                      <Link to={`/projectEdit/${element.project_id}/${element.proposal_id}`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    {/* <td>
                      <Link to="">
                        <span>
                          <Icon.Trash2 />
                        </span>
                      </Link>
                    </td> */}
                    <td>{element.project_code}</td>
                    <td>{element.proposal_code}</td>
                    <td>{arb && element.title_arb ?element.title_arb : element.title}</td>
                    <td>{arb && element.company_name_arb ?element.company_name_arb : element.company_name}</td>
                    <td>{arb && element.contact_name_arb ?element.contact_name_arb : element.contact_name}</td>
                    <td>{element.category}</td>
                    <td>{element.status}</td>
                  </tr>
                );
              })}
          </tbody>
      </CommonTable>
    </div>
  );
};
export default Project;


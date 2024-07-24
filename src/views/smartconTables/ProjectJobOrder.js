import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
// import 'datatables.net-buttons/js/buttons.html5';
// import 'datatables.net-buttons/js/buttons.print';
import { Link } from 'react-router-dom';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';

const ProjectJobOrder = () => {
  const [tenders, setTenders] = useState(null);
  const [loading, setLoading] = useState(false);

  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
const selectedLanguage = getSelectedLanguageFromLocalStorage();
  const getTenders = () => {
    api
      .get('/joborder/getJobOrder')
      .then((res) => {
        setTenders(res.data.data);
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
      .get('/joborder/getTranslationForJopOrder')
      .then((res) => {
        setArabic(res.data.data);
      })
      .catch(() => {
        // Handle error if needed
      });   
  };

  useEffect(() => {
    getTenders();
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
      name: '#',
      selector: 'project_job_id',
      grow: 0,
      wrap: true,
      width: '4%',
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
    {
    
      name: arabic.find(item => item.key_text === 'mdJobOrder.Job Number')?.[genLabel],
      selector: 'job_code',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      
      name: arabic.find(item => item.key_text === 'mdJobOrder.Job Title')?.[genLabel],
      selector: 'job_title',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
     
      name: arabic.find(item => item.key_text === 'mdJobOrder.Date')?.[genLabel],
      selector: 'job_date',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      
      name: arabic.find(item => item.key_text === 'mdJobOrder.Customer')?.[genLabel],
      selector: 'company_name',
      sortable: true,
      grow: 0,
    },
    {
     
      name: arabic.find(item => item.key_text === 'mdJobOrder.Supplier')?.[genLabel],
      selector: 'ref_no_job',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
  
    {
     
      name: arabic.find(item => item.key_text === 'mdJobOrder.Status')?.[genLabel],
      selector: 'job_status',
      sortable: true,
      width: 'auto',
    },
    {
       
        name: arabic.find(item => item.key_text === 'mdJobOrder.Net Amount')?.[genLabel],
        selector: 'total_amount',
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
          title="JobOrderList"
          module='Job Order'
          Button={
            <Link to="/ProjectJobOrderDetails">
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
            {tenders &&
              tenders.map((element, index) => {
                return (
                  <tr key={element.project_job_id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/ProjectJobOrderEdit/${element.project_job_id}?tab=1`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.job_code}</td>
                    <td>{arb && element.job_title_arb ?element.job_title_arb : element.job_title}</td>
                    <td>{element.job_date}</td>
                    <td>{arb && element.company_name_arb ?element.company_name_arb : element.company_name}</td>
                    <td>{element.sub_con_title}</td>
                    <td>{element.job_status}</td>
                    <td>{element.total_amount}</td>
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
};

export default ProjectJobOrder;

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

const ChangeRequest = () => {
  //All state variable
  const [changerequest, setChangeRequest] = useState(null);
  const [loading, setLoading] = useState(false);
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
  const selectedLanguage = getSelectedLanguageFromLocalStorage();
  const [arabic, setArabic] = useState([]);
  const arb =selectedLanguage === 'Arabic'

  //Get data from Training table
  const getChangeRequest= () => {
    api
      .get('/changerequest/getChangeRequest')
      .then((res) => {
        setChangeRequest(res.data.data);
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

  const getArabicLabels = () => {
    api
    .get('/changerequest/getTranslationForChangeRequest')
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
    getChangeRequest();
    getArabicLabels();
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
      name: arabic.find(item => item.key_text === 'mdChangeRequest.Title')?.[genLabel],
      selector: 'change_request_title',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: arabic.find(item => item.key_text === 'mdChangeRequest.ProjectTitle')?.[genLabel],
        selector: 'title',
        grow: 0,
        wrap: true,
        width: '4%',
      },
    {
      name: arabic.find(item => item.key_text === 'mdChangeRequest.SubmissionDate')?.[genLabel],
      selector: 'submission_date',
      grow: 0,
      wrap: true,
      width: '4%',
    },

    {
      name: arabic.find(item => item.key_text === 'mdChangeRequest.ImplementationDate')?.[genLabel],
      selector: 'proposed_implementation_date 	',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    
  ];
  return (
    <div className="container pt-xs-25">
      <BreadCrumbs />
      <ToastContainer></ToastContainer>
      <CommonTable
        loading={loading}
        title="Changed Request"
        module='ChangeRequest'
        Button={
          
          <Link to="/ChangeRequestDetails">
            <Button color="primary" className="shadow-none mr-2">
              New
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
          {changerequest &&
            changerequest.map((element, index) => {
              return (
                <tr key={element.change_request_id}>
                  <td>{index + 1}</td>
                  <td>
                    <Link to={`/ChangeRequestEdit/${element.change_request_id}`}>
                      <Icon.Edit2 />
                    </Link>
                  </td>
                  <td>{arb && element.change_request_title_arb ?element.change_request_title_arb : element.change_request_title}</td>
                  <td>{element.title}</td>
                  <td>{element.submission_date}</td>
                  <td>{element.proposed_implementation_date?moment(element.proposed_implementation_date).format('YYYY-MM-DD'):''}</td>
                </tr>
              );
            })}
        </tbody>
      </CommonTable>
    </div>
  );
};
export default ChangeRequest;

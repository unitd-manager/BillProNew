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
import { ToastContainer } from 'react-toastify';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';

const Training = () => {
  //All state variable
  const [training, setTraining] = useState(null);
  const [loading, setLoading] = useState(false);
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  const selectedLanguage = getSelectedLanguageFromLocalStorage();

  //Get data from Training table
  const getTraining = () => {
    api
      .get('/training/getTraining')
      .then((res) => {
        setTraining(res.data.data);
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
      .get('/training/getTranslationforHRTraining')
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
    getTraining();
    getArabicCompanyName();

  }, []);
  //structure of Training list view
  const columns = [
    {
      name: arb ? 'بطاقة تعريف' : 'id',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: arb ? 'يحرر' : 'Edit',
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
      name: arabic.find(item => item.key_text === 'mdHRTraining.Title')?.[genLabel],
      selector: 'title',
      grow: 0,
      wrap: true,
      width: '4%',
    },

    {
      name: arabic.find(item => item.key_text === 'mdHRTraining.Trainer')?.[genLabel],
      selector: 'trainer',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdHRTraining.Date')?.[genLabel],
      selector: 'from_date',
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
        title={arb ?'قائمة التدريب':"Training List"}
        module='Training'
        Button={
          <Link to="/TrainingDetails">
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
          {training &&
            training.map((element, index) => {
              return (
                <tr key={element.training_id}>
                  <td>{index + 1}</td>
                  <td>
                    <Link to={`/TrainingEdit/${element.training_id}`}>
                      <Icon.Edit2 />
                    </Link>
                  </td>
                  <td>{element.title}</td>
                  <td>{element.trainer}</td>
                  <td>{element.from_date?moment(element.from_date).format('YYYY-MM-DD'):''}</td>
                </tr>
              );
            })}
        </tbody>
      </CommonTable>
    </div>
  );
};
export default Training;

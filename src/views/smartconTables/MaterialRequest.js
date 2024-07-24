import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import moment from 'moment';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
// import 'datatables.net-buttons/js/buttons.html5';
// import 'datatables.net-buttons/js/buttons.print';
import { Link } from 'react-router-dom';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';

const MaterialRequest = () => {
  //Const Variables
  const [planning, setPlanning] = useState(null);
  const [loading, setLoading] = useState(false);

  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
const selectedLanguage = getSelectedLanguageFromLocalStorage();
const [arabic, setArabic] = useState([]);

  const arb =selectedLanguage === 'Arabic'
  
  const getArabicCompanyName = () => {
      api
      .get('/materialrequest/getTranslationForMaterialRequest')
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

  // get Leave
  const getPlanning = () => {
    api
      .get('/materialrequest/getMaterialRequest')
      .then((res) => {
        setPlanning(res.data.data);
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
    getPlanning();
    getArabicCompanyName();
  }, []);
  //  stucture of leave list view
  const columns = [
    {
      name: 'id',
      selector: 'material_request_id',
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
     
      name: arabic.find(item => item.key_text === 'mdMaterialRequest.Project Name')?.[genLabel],
      selector: 'project_name',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
     
      name: arabic.find(item => item.key_text === 'mdMaterialRequest.Request Code')?.[genLabel],
      selector: 'material_request_code',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      
      name: arabic.find(item => item.key_text === 'mdMaterialRequest.Material Request Date')?.[genLabel],
      selector: 'material_request_date',
      sortable: true,
      grow: 2,
      width: 'auto',
    },
   
    
  ];

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />
        <CommonTable
          loading={loading}
          title="Material Request"
          module='Material Request'
          Button={
            <Link to="/MaterialRequestDetails">
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
            {planning &&
              planning.map((element, i) => {
                return (
                  <tr key={element.material_request_id}>
                    <td>{i + 1}</td>
                    <td>
                      <Link to={`/MaterialRequestEdit/${element.material_request_id}?tab=1`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.proj_title}</td>
                    <td>{element.material_request_code}</td>
                    <td>{(element.material_request_date)?moment(element.material_request_date).format('DD-MM-YYYY'):''}</td>

                    </tr>
                );
              })}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
};

export default MaterialRequest;

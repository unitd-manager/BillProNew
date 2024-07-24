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

const Test = () => {
  //All state variable
  const [subCon, setSubCon] = useState(null);
  const [loading, setLoading] = useState(false);

  //getting data from supplier
  const getSubCon = () => {
    api
      .get('/subcon/getSubCon')
      .then((res) => {
        setSubCon(res.data.data);
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

  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
const selectedLanguage = getSelectedLanguageFromLocalStorage();
const [arabic, setArabic] = useState([]);


  const arb =selectedLanguage === 'Arabic'
  

  const getArabicCompanyName = () => {
      api
      .get('/subcon/getTranslationForSubcon')
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
    getSubCon();
    getArabicCompanyName();
  }, []);
  //structure of subcon list view
  const columns = [
    {
      name: '#',
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
      name: arabic.find((item) => item.key_text === 'mdSubcon.Name')?.[genLabel],
      selector: 'company_name',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: arabic.find((item) => item.key_text === 'mdSubcon.Email')?.[genLabel],
      selector: 'email',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: arabic.find((item) => item.key_text === 'mdSubcon.Mobile')?.[genLabel],
      selector: 'mobile',
      sortable: true,
      grow: 0,
    },
  ];

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />

        <CommonTable
          loading={loading}
          title="SubCon List"
          module='Sub Con'
          Button={
            <Link to="/SubConDetails">
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
            {subCon &&
              subCon.map((element, index) => {
                return (
                  <tr key={element.sub_con_id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/SubConEdit/${element.sub_con_id}?tab=1`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{arb && element.company_name_arb ?element.company_name_arb : element.company_name}</td>
                    <td>{arb && element.email_arb ?element.email_arb : element.email}</td>
                    <td>{arb && element.mobile_arb ?element.mobile_arb : element.mobile}</td>
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
};

export default Test;

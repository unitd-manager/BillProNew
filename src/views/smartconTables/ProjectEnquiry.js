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
import moment from 'moment';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';

const Opportunity = () => {
  const [tenders, setTenders] = useState(null);
  const [loading, setLoading] = useState(false);
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
const selectedLanguage = getSelectedLanguageFromLocalStorage();
  const getTenders = () => {
    api
    .get('/projectenquiry/getProjectEnquiry')
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
  
  const getArabicCompanyName = () => {
      api
      .get('/translation/getTranslationEnq')
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
    getTenders();
    getArabicCompanyName();
  }, []);

  const columns = [
    {
      name: '#',
      selector: 'project_enquiry_id',
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
      name: arabic.find(item => item.key_text === 'mdProjectEnq.Enquiry No')?.[genLabel],
      selector: 'enquiry_code',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdProjectEnq.service')?.[genLabel],
      selector: 'services',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdProjectEnq.customer')?.[genLabel],
      selector: 'company_name',
      sortable: true,
      grow: 0,
    },
    {
      name: arabic.find(item => item.key_text === 'mdProjectEnq.Reference')?.[genLabel],
      selector: 'office_ref_no',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: arabic.find(item => item.key_text === 'mdProjectEnq.BID Expiry')?.[genLabel],
      selector: 'project_end_date',
      sortable: true,
      grow: 2,
      width: 'auto',
    },
    {
      name: arabic.find(item => item.key_text === 'mdProjectEnq.status')?.[genLabel],
      selector: 'status',
      sortable: true,
      grow: 2,
      wrap: true,
    },
   
  ];

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />
        <CommonTable
          loading={loading}
          title="Project Enquiry List"
          module='Project Enquiry'
          Button={
            <Link to="/ProjectEnquiryDetails">
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
                  <tr key={element.project_enquiry_id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/ProjectEnquiryEdit/${element.project_enquiry_id}?tab=1`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.enquiry_code}</td>
                    <td>{arb && element.services_arb ?element.services_arb : element.services}</td>
                    <td>{arb && element.company_name_arb ?element.company_name_arb : element.company_name}</td>
                    <td>{arb && element.office_ref_no_arb ?element.office_ref_no_arb : element.office_ref_no}</td>
                    <td>{element.project_end_date ? moment(element.project_end_date).format('DD-MM-YYYY') : ''}</td>
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

export default Opportunity;

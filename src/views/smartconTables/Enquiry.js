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
// import moment from 'moment';
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

// Use the selected language value as needed
console.log('Selected language from localStorage:', selectedLanguage);

const arb =selectedLanguage === 'Arabic'

  // const eng =selectedLanguage === 'English'

  const [arabic, setArabic] = useState([]);

  const getArabicCompanyName = () => {
    api
    .get('/enquiry/getTranslationforTradingEnq')
    .then((res) => {
      setArabic(res.data.data);
    })
    .catch(() => {
      // Handle error if needed
    });   
};

console.log('arabic',arabic)
useEffect(() => {
  getArabicCompanyName();
}, []);

let genLabel = '';

if (arb === true) {
  genLabel = 'arb_value';
} else {
  genLabel = 'value';
}

  const getTenders = () => {
    api
      .get('/tender/getTenders')
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
  useEffect(() => {
    getTenders();
  }, []);

  const columns = [
    {
      name: '#',
      selector: '',
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
      name: arabic.find(item => item.key_text === 'mdTradingEnq.Enquiry Code')?.[genLabel],
      selector: 'opportunity_code',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdTradingEnq.Enquiry Date')?.[genLabel],
      selector: 'enquiry_date',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdTradingEnq.CompanyName')?.[genLabel],
      selector: 'company_name',
      sortable: true,
      grow: 0,
    },
    {
      name: arabic.find(item => item.key_text === 'mdTradingEnq.Reference')?.[genLabel],
      selector: 'office_ref_no',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: arabic.find(item => item.key_text === 'mdTradingEnq.Expiry Date')?.[genLabel],
      selector: 'project_end_date',
      sortable: true,
      grow: 2,
      width: 'auto',
    },
    
    {
      name: arabic.find(item => item.key_text === 'mdTradingEnq.Enquiry Status')?.[genLabel],
      // name: 'Enquiry Status',
      selector: 'status',
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
          module='Enquiry'
          title={arb ?'إضافة عناصر الاقتباس':"Enquiry List"}
          Button={
            <Link to="/EnquiryDetails">
              <Button color="primary" className="shadow-none mr-2">
              {arb ?'إضافة عناصر الاقتباس':'Add New'}
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
                  <tr key={element.opportunity_id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/EnquiryEdit/${element.opportunity_id}?tab=1`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.opportunity_code}</td>
                    <td>{element.enquiry_date}</td>
                    <td>{element.company_name}</td>
                    <td>{element.office_ref_no}</td>
                    <td>{element.project_end_date }</td>
                    {/* <td>{element.status}</td> */}
                    <td>{arb ? element.status_arb : element.status}</td>
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

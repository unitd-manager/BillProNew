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

const ProjectQuotation = () => {
  const [tenders, setTenders] = useState(null);
  const [loading, setLoading] = useState(false);
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
const selectedLanguage = getSelectedLanguageFromLocalStorage();
  const getTenders = () => {
    api
      .get('/projectquote/getProjectquote')
      .then((res) => {
        setTenders(res.data.data);
        $('#example').DataTable({
          pagingType: 'full_numbers',
          pageLength: 20,
          processing: true,
          dom: 'Bfrtip',
        
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
      .get('/projectquote/getTranslationForProjectQuote')
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
      selector: 'project_quote_id',
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
      name: arabic.find(item => item.key_text === 'mdProjectQuote.Enquiry Code')?.[genLabel],
      selector: 'quote_code',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdProjectQuote.Date')?.[genLabel],
      selector: 'quote_date',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdProjectQuote.Customer')?.[genLabel],
      selector: 'company_name',
      sortable: true,
      grow: 0,
    },
    {
      name: arabic.find(item => item.key_text === 'mdProjectQuote.Reference')?.[genLabel],
      selector: 'ref_no_quote',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: arabic.find(item => item.key_text === 'mdProjectQuote.Enquiry Code')?.[genLabel],
      selector: 'enquiry_code',
      sortable: true,
      grow: 2,
      width: 'auto',
    },
    {
      name: arabic.find(item => item.key_text === 'mdProjectQuote.Status')?.[genLabel],
      selector: 'quote_status',
      sortable: true,
      width: 'auto',
    },
    {
        name: arabic.find(item => item.key_text === 'mdProjectQuote.Net Total')?.[genLabel],
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
          title="QuotationList"
          module='Project Quotation'
          Button={
            <Link to="/ProjectQuotationDetails">
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
                  <tr key={element.project_quote_id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/ProjectQuotationEdit/${element.project_quote_id}?tab=1`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.quote_code}</td>
                    <td>{element.quote_date}</td>
                    <td>{arb && element.company_name_arb ?element.company_name_arb : element.company_name}</td>
                    <td>{arb && element.ref_no_quote_arb ?element.ref_no_quote_arb : element.ref_no_quote}</td>
                    <td>{element.enquiry_code}</td>
                    <td>{element.quote_status}</td>
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

export default ProjectQuotation;

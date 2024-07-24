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


const RequestForQuote = () => {
  //All state variable
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);

  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
  const selectedLanguage = getSelectedLanguageFromLocalStorage();

  const [arabic, setArabic] = useState([]);


  const arb =selectedLanguage === 'Arabic'

  //const eng =selectedLanguage === 'English'
  

  const getArabicCompanyName = () => {
      api
      .get('/quote/getTranslationForReqForQuote')
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

  //Getting data from quote
  const getQuote = () => {
    api
      .get('/quote/getTabPurcahseQuote') 
      .then((res) => {
        setQuote(res.data.data);
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
    getQuote();
    getArabicCompanyName();
  }, []);
  //Structure of quote list view
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
      name: arabic.find((item) => item.key_text === 'mdRequestForQuote.Purchase Request Code')?.[genLabel],
      selector: 'purchase_request_code',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: arabic.find((item) => item.key_text === 'mdRequestForQuote.Status')?.[genLabel],
      selector: 'status',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: arabic.find((item) => item.key_text === 'mdRequestForQuote.Date Issued')?.[genLabel],
      selector: 'date_issued',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: arabic.find((item) => item.key_text === 'mdRequestForQuote.Due Date')?.[genLabel],
      selector: 'due_date',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
  
  ];
  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />
        <CommonTable
          loading={loading}
          title= {arb ?'قائمة الاقتباسات':'Quote List'}
          module='RequestForQuote'
          Button={
            <Link to="/RequestForQuoteDetails">
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
            {quote &&
              quote.map((element, index) => {
                return (
                  <tr key={element.purchase_quote_id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/RequestForQuoteEdit/${element.purchase_quote_id}`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{arb?element.purchase_request_code_arb:element.purchase_request_code}</td>
                    <td>{arb?element.status_arb:element.status}</td>
                    <td>{element.date_issued}</td>
                    <td>{element.due_date}</td>
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
};

export default RequestForQuote;

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
// import 'datatables.net-buttons/js/buttons.html5';
// import 'datatables.net-buttons/js/buttons.print';
import { Link } from 'react-router-dom';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';

const TradingQuotation = () => {
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
    .get('/tradingquote/getTranslationforTradingQuote')
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
      .get('/tradingquote/getTradingquote')
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
      selector: 'quote_id',
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
      name: arabic.find(item => item.key_text === 'mdTradingQuote.Quotation Code')?.[genLabel],
      
      selector: 'quote_code',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdTradingQuote.Quotation Date')?.[genLabel],
      selector: 'quote_date',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdTradingQuote.Customer')?.[genLabel],
      selector: 'company_name',
      sortable: true,
      grow: 0,
    },
    {
      name: arabic.find(item => item.key_text === 'mdTradingQuote.Reference')?.[genLabel],
      selector: 'ref_no_quote',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: arabic.find(item => item.key_text === 'mdTradingQuote.Enquiry Code')?.[genLabel],
      selector: 'opportunity_code',
      sortable: true,
      grow: 2,
      width: 'auto',
    },
    {
      name: arabic.find(item => item.key_text === 'mdTradingQuote.Status')?.[genLabel],
      selector: 'quote_status',
      sortable: true,
      width: 'auto',
    },
    {
      name: arabic.find(item => item.key_text === 'mdTradingQuote.Net Amount')?.[genLabel],
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
          title={arb ?'قائمة الاقتباس':"Quotation List"}
          module='Quotation'
          Button={
            <Link to="/TradingQuotationDetails">
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
            {tenders &&
              tenders.map((element, index) => {
                return (
                  <tr key={element.quote_id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/TradingQuotationEdit/${element.quote_id}?tab=1`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.quote_code}</td>
                    <td>
                      {element.quote_date ? moment(element.quote_date).format('DD-MM-YYYY') : ''}
                    </td>
                    <td>{element.company_name}</td>
                    <td>{element.office_ref_no}</td>
                    <td>{element.opportunity_code}</td>
                    <td>{element.quote_status}</td>
                    <td>{element.totalamount}</td>
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
};

export default TradingQuotation;

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
import PdfPurchaseRequestList from '../../components/PDF/PdfPurchaseRequestList';


const PurchaseRequest = () => {
  //All state variable
  const [purchaserequest, setPurchaseRequest] = useState(null);
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
      .get('/purchaserequest/getTranslationForPurchaseRequest')
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

  //Getting data from purchaserequest
  const getPurchaseRequest = () => {
    api
      .get('/purchaserequest/getPurchaseRequest') 
      .then((res) => {
        setPurchaseRequest(res.data.data);
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
    getPurchaseRequest();
    getArabicCompanyName();
  }, []);
  //Structure of purchaserequest list view
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
      name: arabic.find((item) => item.key_text === 'mdPurchaseRequest.Purchase Request code')?.[genLabel],
      selector: 'purchase_request_code',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: arabic.find((item) => item.key_text === 'mdPurchaseRequest.Purchase Request Date')?.[genLabel],
      selector: 'purchase_request_date',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: arabic.find((item) => item.key_text === 'mdPurchaseRequest.Purchase Delivery Date')?.[genLabel],
      selector: 'purchase_delivery_date',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: arabic.find((item) => item.key_text === 'mdPurchaseRequest.Customer Name')?.[genLabel],
      selector: 'company_name',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: arabic.find((item) => item.key_text === 'mdPurchaseRequest.Department')?.[genLabel],
      selector: 'department',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: arabic.find((item) => item.key_text === 'mdPurchaseRequest.Status')?.[genLabel],
      selector: 'department',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'Print',
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
          title= {arb ?'قائمة الاقتباسات':'Purchase Request List'}
          module='Purchase Request'
          Button={
            <Link to="/PurchaseRequestDetails">
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
            {purchaserequest &&
              purchaserequest.map((element, index) => {
                return (
                  <tr key={element.purchase_request_id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/PurchaseRequestEdit/${element.purchase_request_id}?tab=1`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{arb?element.purchase_request_code_arb:element.purchase_request_code}</td>
                    <td>{element.purchase_request_date ? moment(element.purchase_request_date).format('DD-MM-YYYY') : ''}</td>
                    <td>{element.purchase_delivery_date ? moment(element.purchase_delivery_date).format('DD-MM-YYYY') : ''}</td>
                    <td>{arb?element.company_name_arb:element.company_name}</td>
                    <td>{arb?element.department_arb:element.department}</td>
                    <td>{arb?element.status_arb:element.status}</td>
                    <td>  
                      <PdfPurchaseRequestList requestId={element.purchase_request_id} purchaserequest={purchaserequest} />
 </td>
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
};

export default PurchaseRequest;


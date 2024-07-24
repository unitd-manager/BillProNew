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

const Leaves = () => {
  //Const Variables
  const [planning, setPlanning] = useState(null);
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
    .get('/translation/getTranslationForSupplierPriceList')
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
  // get Leave
  const getPlanning = () => {
    api
      .get('/supplierpricelistitem/getPriceList')
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
  }, []);
  //  stucture of leave list view
  const columns = [
    {
      name: 'id',
      selector: 'supplier_price_list_id',
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
      name: arabic.find(item => item.key_text === 'mdSupplierPriceList.SupplierListName')?.[genLabel],
      selector: 'customer_name',
      sortable: true,
      grow: 0,
      wrap: true, 
    },
    {
      name: arabic.find(item => item.key_text === 'mdSupplierPriceList.EffectiveDate')?.[genLabel],
      selector: 'effective_date',
      sortable: true,
      grow: 2,
      width: 'auto',
    },
    {
      name: arabic.find(item => item.key_text === 'mdSupplierPriceList.Status')?.[genLabel],
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
          title="Supplier Price List"
          module='Supplier Price List'
          Button={
            <Link to="/SupplierPriceListDetails">
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
                  <tr key={element.supplier_price_list_id}>
                    <td>{i + 1}</td>
                    <td>
                      <Link to={`/SupplierPriceListEdit/${element.supplier_price_list_id}?tab=1`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{arb?element.customer_name_arb:element.customer_name}</td>
                    <td>{(element.effective_date)?moment(element.effective_date).format('DD-MM-YYYY'):''}</td>
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

export default Leaves;

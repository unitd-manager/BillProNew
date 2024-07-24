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
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';

const GoodsReceipt = () => {
  //All state variable
  const [goodsreceipt, setGoodsReceipt] = useState(null);
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
      .get('/goodsreceipt/getTranslationForGoodsReceipt')
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

  //Get data from Training table
  const getGoodsReceipt= () => {
    api
      .get('/goodsreceipt/getGoodsReceipt')
      .then((res) => {
        setGoodsReceipt(res.data.data);
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
    getGoodsReceipt();
    getArabicCompanyName();
  }, []);
  //structure of Training list view
  const columns = [
    {
      name: 'id',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: 'Edit',
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
      name: arabic.find((item) => item.key_text === 'mdGoodsReceipt.PO Code')?.[genLabel],
      selector: 'po_code',
      grow: 0,
      wrap: true,
      width: '4%',
    },

    {
      name: arabic.find((item) => item.key_text === 'mdGoodsReceipt.Supplier Name')?.[genLabel],
      selector: 'company_name',
      grow: 0,
      wrap: true,
      width: '4%',
    },

    {
      name: arabic.find((item) => item.key_text === 'mdGoodsReceipt.Goods Received Date')?.[genLabel],
      selector: 'goods_received_date',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: arabic.find((item) => item.key_text === 'mdGoodsReceipt.Total Amount')?.[genLabel],
      selector: 'total_amount',
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
        title="Goods receipt List"
        module='Goods Receipt'
        Button={
          <Link to="/GoodsReceiptDetails">
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
          {goodsreceipt &&
            goodsreceipt.map((element, index) => {
              return (
                <tr key={element.goods_receipt_id}>
                  <td>{index + 1}</td>
                  <td>
                    <Link to={`/GoodsReceiptEdit/${element.goods_receipt_id}`}>
                      <Icon.Edit2 />
                    </Link>
                  </td>
                  <td>{arb?element.po_code_arb:element.po_code}</td>
                  <td>{arb?element.company_name_arb:element.company_name}</td>
                  <td>{moment(element.goods_received_date).format('YYYY-MM-DD')}</td>
                  <td>{arb?element.total_amount_arb:element.total_amount}</td>
                </tr>
              );
            })}
        </tbody>
      </CommonTable>
    </div>
  );
};
export default GoodsReceipt;

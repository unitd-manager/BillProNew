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

const GoodsDelivery = () => {
  const [gdelivery, setGDelivery] = useState(null);
  const [loading, setLoading] = useState(false);
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
const selectedLanguage = getSelectedLanguageFromLocalStorage();
  const getTenders = () => {
    api
      .get('/goodsdelivery/getgoodsdelivery')
      .then((res) => {
        setGDelivery(res.data.data);
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

  // const eng =selectedLanguage === 'English'
   

  const getArabicCompanyName = () => {
      api
      .get('/goodsdelivery/getTranslationforTradingGoods')
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
      selector: '',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: arb ? 'يحرر' : 'Edit' ,
      selector: 'edit',
      cell: () => <Icon.Edit2 />,
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
    {
      name: arabic.find(item => item.key_text === 'mdTradingGoods.Delivery Code')?.[genLabel],
      selector: 'goods_delivery_id ',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdTradingGoods.Date')?.[genLabel],
      selector: 'goods_delivery_date',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdTradingGoods.Order Code')?.[genLabel],
      selector: 'order_id',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdTradingGoods.Company Name')?.[genLabel],
      selector: 'company_name ',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdTradingGoods.Department')?.[genLabel],
      selector: 'department',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdTradingGoods.Salesman')?.[genLabel],
      selector: 'sales_man',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdTradingGoods.Reference')?.[genLabel],
      selector: 'goods_ref_no',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdTradingGoods.PO Code\r\n')?.[genLabel],
      selector: 'po_no',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdTradingGoods.Status\r\n')?.[genLabel],
      selector: 'goods_delivery_status',
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
          title={arb?'قائمة تسليم البضائع':'Goods Delivery List'}
          module='Goods Delivery'
          Button={
            <Link to="/GoodsDeliveryDetails">
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
            {gdelivery &&
              gdelivery.map((element, index) => {
                return (
                  <tr key={element.goods_delivery_id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/GoodsDeliveryEdit/${element.goods_delivery_id}/${element.order_id }`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.goods_delivery_code}</td>
                    <td>
                      {element.goods_delivery_date
                        ? moment(element.goods_delivery_date).format('DD-MM-YYYY')
                        : ''}
                    </td>
                    <td>{element.order_code}</td>
                    <td>{element.company_name}</td>
                    <td>{element.department}</td>
                    <td>{element.sales_man}</td>
                    <td>{element.goods_ref_no}</td>
                    <td>{element.po_no}</td>
                    <td>{element.goods_delivery_status}</td>
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
};

export default GoodsDelivery;
 
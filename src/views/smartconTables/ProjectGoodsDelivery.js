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
//   const getSelectedLanguageFromLocalStorage = () => {
//     return localStorage.getItem('selectedLanguage') || '';
//   };
  
// const selectedLanguage = getSelectedLanguageFromLocalStorage();
  const getTenders = () => {
    api
      .get('/projectgoodsdelivery/getgoodsdelivery')
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
  // const [arabic, setArabic] = useState([]);


  // const arb =selectedLanguage === 'Arabic'

  // // const eng =selectedLanguage === 'English'
   

  // const getArabicCompanyName = () => {
  //     api
  //     .get('/goodsdelivery/getTranslationforTradingGoods')
  //     .then((res) => {
  //       setArabic(res.data.data);
  //     })
  //     .catch(() => {
  //       // Handle error if needed
  //     });   
  // };

  useEffect(() => {
    getTenders();
    // getArabicCompanyName();

  }, []);

  // let genLabel = '';

  // if (arb === true) {
  //   genLabel = 'arb_value';
  // } else {
  //   genLabel = 'value';
  // }
  const columns = [
    {
      name: '#',
      selector: '',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      // name: arb ? 'يحرر' : 'Edit' ,
      name:'Edit',
      selector: 'edit',
      cell: () => <Icon.Edit2 />,
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
    {
      // name: arabic.find(item => item.key_text === 'mdTradingGoods.Delivery Code')?.[genLabel],
      name: 'Delivery Code',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      // name: arabic.find(item => item.key_text === 'mdTradingGoods.Date')?.[genLabel],
      name:'Date',
      selector: 'goods_delivery_date',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      // name: arabic.find(item => item.key_text === 'mdTradingGoods.Order Code')?.[genLabel],
      name:'Order Code',
      selector: 'order_id',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      // name: arabic.find(item => item.key_text === 'mdTradingGoods.Company Name')?.[genLabel],
      name:'Company Name',
      selector: 'company_name ',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      // name: arabic.find(item => item.key_text === 'mdTradingGoods.Department')?.[genLabel],
      name:'Department',
      selector: 'department',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      // name: arabic.find(item => item.key_text === 'mdTradingGoods.Salesman')?.[genLabel],
      name:'Salesman',
      selector: 'sales_man',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      // name: arabic.find(item => item.key_text === 'mdTradingGoods.Reference')?.[genLabel],
      name:'Reference',
      selector: 'goods_ref_no',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      // name: arabic.find(item => item.key_text === 'mdTradingGoods.PO Code\r\n')?.[genLabel],
      name:'PO Code',
      selector: 'po_no',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      // name: arabic.find(item => item.key_text === 'mdTradingGoods.Status\r\n')?.[genLabel],
      name:'Status',
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
          title='Goods Delivery List'
          Button={
            <Link to="/ProjectGoodsDeliveryDetails">
              <Button color="primary" className="shadow-none"> 
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
            {gdelivery &&
              gdelivery.map((element, index) => {
                return (
                  <tr key={element.goods_delivery_id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/ProjectGoodsDeliveryEdit/${element.project_goods_delivery_id}/${element.project_order_id }`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.project_goods_delivery_code}</td>
                    <td>
                      {element.project_goods_delivery_date
                        ? moment(element.project_goods_delivery_date).format('DD-MM-YYYY')
                        : ''}
                    </td>
                    <td>{element.order_code}</td>
                    <td>{element.company_name}</td>
                    <td>{element.department}</td>
                    <td>{element.sales_man}</td>
                    <td>{element.project_goods_ref_no}</td>
                    <td>{element.po_no}</td>
                    <td>{element.project_goods_delivery_status}</td>
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
 
import React, { useState, useEffect } from 'react';
import {
 Table,
  FormGroup
} from 'reactstrap';
import PropTypes from 'prop-types';
import message from '../Message';
import api from '../../constants/api';

//Goods Receipt Items Get Function
export default function PurchaseInvoiceGetFunction({PurchaseOrderId}) {
  PurchaseInvoiceGetFunction.propTypes =   {  
    PurchaseOrderId: PropTypes.object,

  };
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };

  const selectedLanguage = getSelectedLanguageFromLocalStorage();
  const [arabic, setArabic] = useState([]);
  const arb =selectedLanguage === 'Arabic'
  const getArabicCompanyName = () => {
    api
    .get('/purchaseinvoice/getTranslationForPurchaseInvoiceList')
    .then((res) => {
      setArabic(res.data.data);
    })
    .catch(() => {
      // Handle error if needed
    });   
};

  useEffect(() => {
    getArabicCompanyName();
  }, []);
  //structure of Training list view
  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }

  const columns1 = [
    {
      name: '#',
    },
    {
      name: arabic.find(item => item.key_text === 'mdPurchaseInvoice.Title')?.[genLabel],
    },
    {
      name: arabic.find(item => item.key_text === 'mdPurchaseInvoice.Unit')?.[genLabel],
    },
    {
      name: arabic.find(item => item.key_text === 'mdPurchaseInvoice.Ordered Quantity')?.[genLabel],
    },
    {
      name: arabic.find(item => item.key_text === 'mdPurchaseInvoice.Unit Price')?.[genLabel],
    },
    {
      name: arabic.find(item => item.key_text === 'mdPurchaseInvoice.Total Cost')?.[genLabel],
    },
   
  ];
  const [orderdetails, setOrderDetails] = useState();
  
  //Api call for getting Goods Receipt Items 
  
  const getPurchaseInvoiceItemsById = () => {
    api
      .post('/purchaseinvoice/getPurchaseInvoiceItemsById',{purchase_order_id: PurchaseOrderId})
      .then((res) => {
        setOrderDetails(res.data.data);
      })
      .catch(() => {
        message('Invoice Data Not Found', 'info');
      });
  };

  useEffect(() => {
    getPurchaseInvoiceItemsById();
  }, [PurchaseOrderId]);
  
  return (
  <FormGroup>
    <Table bordered className="lineitem">
      <thead>
      <tr>
                      {columns1.map((cell) => {
                        return <td key={cell.name}>{cell.name}</td>;
                      })}
                    </tr>
        </thead>
        <tbody>
        {orderdetails &&
        orderdetails.map((e, index) => {
          return (
            <tr>
              <td>{index+1}</td>
              <td>{arb ? e.item_title_arb : e.item_title}</td>
              <td>{arb ? e.unit_arb : e.unit}</td>
              <td>{arb ? e.ordered_quantity_arb : e.ordered_quantity}</td>
              <td>{arb ? e.cost_price_arb : e.cost_price}</td>
              <td>{arb ? e.total_cost_arb : e.total_cost}</td>
            </tr>
          );
          })}
          </tbody>
           </Table>
            </FormGroup>                 
);
}
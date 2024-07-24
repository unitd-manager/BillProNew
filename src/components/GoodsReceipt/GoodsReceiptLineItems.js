import React, { useState, useEffect } from 'react';
import {
 Table,
  FormGroup
} from 'reactstrap';
import PropTypes from 'prop-types';
import message from '../Message';
import api from '../../constants/api';

//Goods Receipt Items Get Function
export default function GoodsReceiptItemsGetFunction({PurchaseOrderId,arb}) {
  GoodsReceiptItemsGetFunction.propTypes =   {  
    PurchaseOrderId: PropTypes.object,
    arb: PropTypes.object,
  };
  
  const [orderdetails, setOrderDetails] = useState();
  
  //Api call for getting Goods Receipt Items 
  
  const getGoodsReceiptItemsById = () => {
    api
      .post('/goodsreceipt/getGoodsReceiptItemsById',{purchase_order_id: PurchaseOrderId})
      .then((res) => {
        setOrderDetails(res.data.data);
      })
      .catch(() => {
        message('Receipt Data Not Found', 'info');
      });
  };

  useEffect(() => {
    getGoodsReceiptItemsById();
  }, [PurchaseOrderId]);
  
  return (
  <FormGroup>
    <Table bordered className="lineitem">
      <thead>
        <tr>
        <th scope="col">#</th>
        <th scope="col"> {arb ?'رمز الشراء':'PO Code'} </th>
        <th scope="col">{arb ?'عنوان':'Title'} </th>
        <th scope="col">{arb ?'وحدة':'Unit'} </th>
        <th scope="col">{arb ?'الكمية المطلوبة':'Ordered Quantity'}</th>
        <th scope="col">{arb ?'تاريخ الحصول عليه':'Received Date'}</th>
        <th scope="col">{arb ?'الكمية المستلمة':'Received Quantity'}</th>
        <th scope="col">{arb ?'سعر الوحدة':'Unit Price'}</th>
        <th scope="col">{arb ?'التكلفة الإجمالية':'Total Cost'}</th>
        </tr>
        </thead>
        <tbody>
        {orderdetails &&
        orderdetails.map((e, index) => {
          return (
            <tr>
              <td>{index+1}</td>
              <td >{arb?e.po_code_arb:e.po_code}</td>
              <td >{arb?e.item_title_arb:e.item_title}</td>
              <td >{arb?e.unit_arb:e.unit}</td>
              <td >{arb?e.ordered_quantity_arb:e.ordered_quantity}</td>
              <td >{arb?e.goods_received_date_arb:e.goods_received_date}</td>
              <td >{arb?e.goods_received_qty_arb:e.goods_received_qty}</td>
              <td >{arb?e.unit_price_arb:e.unit_price}</td>
              <td >{arb?e.total_cost_arb:e.total_cost}</td>
            </tr>
          );
          })}
          </tbody>
           </Table>
            </FormGroup>                 
);
}
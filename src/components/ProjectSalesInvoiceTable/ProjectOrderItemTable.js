import React from 'react';
import PropTypes from 'prop-types';
import { Form, Table } from 'reactstrap';

export default function ItemTable({
  orderitemDetails,arb}) {
  ItemTable.propTypes = {
    orderitemDetails: PropTypes.array,
    arb:PropTypes.any,
     };

  //Structure of Invoice table
  const invoiceTableColumns = [
    { name:arb ? 'عنوان': 'Title' },
    { name:arb ? 'وحدة': 'Unit' },
    { name:arb ? 'سعر الوحدة': 'Unit Price' },
    { name:arb ? 'الكمية المطلوبة': 'Ordered Quantity' },
    { name:arb ? 'كمية الفاتورة': 'Invoice Quantity' },
    { name:arb ? 'المبلغ الإجمالي': 'Total Amount' },
    { name:arb ? 'تم التحديث بواسطة': 'Updated By' },
  ];
 

  return (
    // Invoice Tab

    <Form>
      <div className="MainDiv">
        <div className="container">
          <Table bordered className="lineitem">
            <thead>
              <tr>
                {invoiceTableColumns.map((cell) => {
                  return <td key={cell.name}>{cell.name}</td>;
                })}
              </tr>
            </thead>
            <tbody>
        {Array.isArray(orderitemDetails) && orderitemDetails.length > 0 ? (
          orderitemDetails.map((element) => { // Map only if orderitemDetails is an array
            return (
              <tr key={element.project_invoice_id}>
               <td>{element.item_title}</td>
               <td>{element.unit}</td>
               <td>{element.unit_price}</td>
               <td>{element.qty}</td>
               <td>{element.project_invoice_qty}</td>
                <td>{element.total_cost}</td>
                <td>{element.modification_date  ? `${element.modified_by} (Modified on ${element.modification_date})` : `${element.created_by} (Created on ${element.creation_date})`}</td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={invoiceTableColumns.length}>
              {arb?'لا توجد عناصر متاحة':'No items available'}</td>
          </tr>
        )}
      </tbody>
           
          </Table>
        
        </div>
      </div>
     
    </Form>
  );
}
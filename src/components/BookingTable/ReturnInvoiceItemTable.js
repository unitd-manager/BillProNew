import React from 'react';
import PropTypes from 'prop-types';
import { Form, Table } from 'reactstrap';

export default function ItemTable({
  returnInvoiceItemDetails,arb
 
}) {
  ItemTable.propTypes = {
    returnInvoiceItemDetails: PropTypes.array,
    arb: PropTypes.any

     };
  
     
  //Structure of Invoice table
  const invoiceTableColumns = [
    { name:arb ? 'غرض' : 'Item' },
    { name:arb ? 'كمية' : 'Quantity' },
    // { name: 'Price' },
  ];


  return (
    // Invoice Tab

    <Form>
      <div className="MainDiv">
        <div className="container">
          <Table id="example">
            <thead>
              <tr>
                {invoiceTableColumns.map((cell) => {
                  return <td key={cell.name}>{cell.name}</td>;
                })}
              </tr>
            </thead>
            <tbody>
        {Array.isArray(returnInvoiceItemDetails) && returnInvoiceItemDetails.length > 0 ? (
          returnInvoiceItemDetails.map((element) => { // Map only if returnInvoiceItemDetails is an array
            return (
              <tr key={element.invoice_id}>
               <td>{element.item_title}</td>
               <td>{element.qty_return}</td>
               {/* <td>{element.price}</td> */}
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={invoiceTableColumns.length}>{arb ? 'لا توجد عناصر متاحة' :'No items available'}</td>
          </tr>
        )}
      </tbody>
           
          </Table>
        
        </div>
      </div>
     
    </Form>
  );
}
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Table } from 'reactstrap';

export default function ItemTable({
  invoicedetails,
 
}) {
  ItemTable.propTypes = {
    invoicedetails: PropTypes.array,
   
     };

     
  //Structure of Invoice table
  const invoiceTableColumns = [
    { name: 'Title' },
    { name: 'Unit' },
    { name: 'Unit Price' },
    { name: 'Ordered Quantity' },
    { name: 'Invoice Quantity' },
    { name: 'Total Cost' },
    { name: 'Updated By' },
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
        {Array.isArray(invoicedetails) && invoicedetails.length > 0 ? (
          invoicedetails.map((element) => { // Map only if invoicedetails is an array
            return (
              <tr key={element.invoice_id}>
               <td>{element.item_title}</td>
               <td>{element.unit}</td>
               <td>{element.unit_price}</td>
               <td>{element.qty}</td>
               <td>{element.invoice_qty}</td>
                <td>{element.total_cost}</td>
                <td>{element.modification_date  ? `${element.modified_by} (Modified on ${element.modification_date})` : `${element.created_by} (Created on ${element.creation_date})`}</td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={invoiceTableColumns.length}>No items available</td>
          </tr>
        )}
      </tbody>
           
          </Table>
        
        </div>
      </div>
     
    </Form>
  );
}
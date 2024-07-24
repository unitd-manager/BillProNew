import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Table } from 'reactstrap';
// import InvoiceItemTable from './InvoiceItemTable';
import api from '../../constants/api';
import EditInvoiceItem from './EditInvoiceItem';

export default function ItemTable({
  itemDetails,
 
}) {
  ItemTable.propTypes = {
    itemDetails: PropTypes.array,
   
     };
     const [selectedInvoiceItemId, setSelectedInvoiceItemId] = useState(null);
     const [editModal, setEditModal] = useState(false);
     
  //Structure of Invoice table
  const invoiceTableColumns = [
    { name: 'Item' },
    { name: 'Quantity' },
    { name: 'Unit Price' },
    { name: 'Total' },
    { name: 'Edit' },
    { name: 'Delete' },
  ];
  const handleDelete = (invoiceItemId) => {
    api
      .delete('/invoice/deleteInvoiceItem', { data: { invoice_item_id: invoiceItemId } }) // Use 'data' property for sending data in the body
      .then(() => {
       window.location.reload();
      })
      .catch(() => {
        // Handle error, show a message, etc.
      });
  };

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
        {Array.isArray(itemDetails) && itemDetails.length > 0 ? (
          itemDetails.map((element) => { // Map only if itemDetails is an array
            return (
              <tr key={element.invoice_id}>
               <td>{element.item_title}</td>
               <td>{element.qty}</td>
               <td>{element.unit_price}</td>
                <td>{element.total_cost}</td>
                           
                 <td>
                  <div className="anchor">
                    <span
                      onClick={() => {
                        setSelectedInvoiceItemId(element.invoice_item_id);
                          setEditModal(true);
                       
                      }}
                    >
                      Edit
                    </span>
                  </div>
                </td>
                <td>
                  <div className="anchor">
                    <span
                        onClick={() => {
                          handleDelete(element.invoice_item_id); // Use 'handleDelete' function
                        }}
                    >
                    
                      Delete
                    </span>
                  </div>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={invoiceTableColumns.length}>No items available</td>
          </tr>
        )}
      </tbody>
            {/* <tbody>
              {itemDetails &&
                itemDetails.map((element) => {
                 
                })}
            </tbody> */}
          </Table>
        
        </div>
      </div>
      <EditInvoiceItem
        editModal={editModal}
        setEditModal={setEditModal}
        selectedInvoiceItemId={selectedInvoiceItemId}
     
      />
    </Form>
  );
}
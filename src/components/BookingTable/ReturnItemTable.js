import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Table, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import api from '../../constants/api';


export default function ItemTable({
  returnItemDetails,
  invoiceStatus,
  arb
  // onRemoveItem,
}) {
  ItemTable.propTypes = {
    returnItemDetails: PropTypes.array,
    invoiceStatus: PropTypes.array,
    arb: PropTypes.any,

    // onRemoveItem: PropTypes.func.isRequired,
  };
  const hasNonZeroQuantity = returnItemDetails?.some((item) => item.qty > 0) || false;
  
  const [returnModal, setReturnModal] = useState(false);
  // const [selectedItem, setSelectedItem] = useState(null);
  // const [returnQuantity, setReturnQuantity] = useState(0);


  const toggleReturnModal = () => setReturnModal(!returnModal);

  // Structure of Invoice table
  const invoiceTableColumns = [
    { name: arb ? 'غرض' : 'Item' },
    { name: arb ? 'كمية' :'Quantity' },
    { name: arb ? 'سعر الوحدة' :'Unit Price' },
    { name: arb ? 'المجموع' :'Total' },
    { name: arb ? 'الكمية التي تم إرجاعها' :'Qty Returned' }
   
  ];

  const [returnItems, setReturnItems] = useState([]);

  const openReturnModal = () => {
    // Filter out items with qty === 0
    const nonZeroQuantityItems = returnItemDetails.filter((item) => item.qty > 0);
    setReturnItems([...nonZeroQuantityItems]); // Create a copy of the items for editing

    // Check the invoice status before opening the modal
    if (invoiceStatus !== 'Cancelled') {
      toggleReturnModal();
    }
  };


  const handleReturnQuantityChange = (invoiceItemId, event) => {
    const quantity = parseInt(event.target.value, 10);
    setReturnItems((prevReturnItems) => {
      return prevReturnItems.map((item) => {
        if (item.invoice_item_id === invoiceItemId) {
          return { ...item, qty_return: quantity };
        }
        return item;
      });
    });
  };
  
  
  const handleReturn = () => {
    // Filter out items with qty_return === undefined (i.e., not modified)
    const modifiedItems = returnItems.filter((item) => item.qty_return !== undefined);
  
    // Make an API request to insert the sales return history records for modified items
    const promises = modifiedItems.map((item) => {
      const salesReturnItem = {
        qty_return: item.qty_return,
        invoice_item_id: item.invoice_item_id,
        order_id: item.order_id,
        invoice_id: item.invoice_id,
        return_date: new Date(),
        price: item.unit_price,
      };
  
      return api.post('/invoice/insertSalesReturnHistory', salesReturnItem);
    });
  
    Promise.all(promises)
      .then(() => {
        // Handle success (you might want to update the UI or show a message)
        console.log('Sales return history records inserted successfully');
        toggleReturnModal(); // Close the modal
        setTimeout(() => {
          window.location.reload();
        }, 300);
      })
      .catch((error) => {
        // Handle error (you might want to show an error message)
        console.error('Error inserting sales return history records:', error);
      });
  };
  
  return (
    // Invoice Tab
    <Form>
      {hasNonZeroQuantity && invoiceStatus !== 'Cancelled' && ( // Check invoice status here
              <Button color="primary" onClick={openReturnModal}>
                { arb ? 'عائد المبيعات' : 'Sales Return'}
              </Button>
            )}
      <div className="MainDiv">
        <div className="container">
          <Table id="example">
          

            <thead>
              <tr>
                {invoiceTableColumns.map((cell) => (
                  <td key={cell.name}>{cell.name}</td>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.isArray(returnItemDetails) && returnItemDetails.length > 0 ? (
                returnItemDetails.map((element) => (
                  <tr key={element.invoice_item_id}>
                    <td>{arb && element.item_title_arb ? element.item_title_arb : element.item_title}</td>
                    <td>{element.qty}</td>
                    <td>{element.unit_price}</td>
                    <td>{element.total_cost}</td>
                    <td>{element.qty_returned}</td>
                  </tr>
                  
                ))
              ) : ( 
                <tr>
                  <td colSpan={invoiceTableColumns.length}>{arb? 'لا توجد عناصر متاحة' : 'No items available'}</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>

      {/* Return Modal */}
      <Modal isOpen={returnModal} toggle={toggleReturnModal}>
  <ModalHeader toggle={toggleReturnModal}>
   { arb?'كمية العودة' : 'Return Quantity'}</ModalHeader>
  <ModalBody>
    <Table>
      <thead>
        <tr>
          <th>{ arb?' غرض' : 'Item'}</th>
          <th>{ arb?'الكمية الحالية' : 'Current Quantity'} </th>
          <th>{ arb?'كمية العودة' : 'Return Quantity'}</th>
          <th>{ arb?' الكمية التي تم إرجاعها' : 'Qty Returned '} </th> {/* New column for displaying qty_returned */}
        </tr>
      </thead>
      <tbody>
        {returnItems.map((item) => (
          <tr key={item.invoice_item_id}>
            <td>{item.item_title}</td>
            <td>{item.qty}</td>
            <td>
              <input
                type="text"
                id={`returnQuantity-${item.invoice_item_id}`}
                value={item.qty_return || ''}
                onChange={(event) => handleReturnQuantityChange(item.invoice_item_id, event)}
              />
            </td>
            <td>{item.qty_returned || 0}</td> {/* Display qty_returned or 0 if undefined */}
          </tr>
        ))}
      </tbody>
    </Table>
    <Button color="primary" onClick={handleReturn}>
      Return
    </Button>{' '}
    <Button color="secondary" onClick={toggleReturnModal}>
      Cancel
    </Button>
  </ModalBody>
</Modal>
    </Form>
  );
}

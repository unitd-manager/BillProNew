/* eslint-disable */
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Form, Table, Input, Button } from 'reactstrap';
import { useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import api from '../../constants/api';
import message from '../Message';
import ViewReturnHistoryModal from './ViewReturnHistoryModal';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

export default function ItemTable({
  returnInvoiceItemDetails,
  arabic,
  arb,
  getCheckedPoProducts,
}) {
  ItemTable.propTypes = {
    returnInvoiceItemDetails: PropTypes.array,
    arabic: PropTypes.array,
    arb: PropTypes.array,
    getCheckedPoProducts: PropTypes.func,
  };
  const { insertedDataId } = useParams();
  const [stockChangeId, setStockChangeId] = useState();
  const [stockinputOpen, setStockinputOpen] = useState(false);
  const [returnQty, setReturnQty] = useState({
    po_product_id: null,
    return_qty: null,
  });
  console.log('returnQty', returnQty)
  const [returnHistoryModal, SetReturnHistoryModal] = useState(false);
  const [modalId, setModalId] = useState(null);
  const { loggedInuser } = useContext(AppContext);

  const [purchasereturnhistorydetails, setPurchaseReturnHistoryDetails] = useState({
    purchase_return_id: null,
    product_id: null,
    purchase_order_id:'',
    modified_by: '',
    created_by: '',
  });

  console.log('purchasereturnhistorydetails', purchasereturnhistorydetails)

  const genLabel = arb ? 'arb_value' : 'value';

  const handleReturnQty = (e, element) => {
    const { value } = e.target;
    console.log('handleReturnQty element:', element); // Debugging: Check the structure of element
    setReturnQty({
      po_product_id: element.po_product_id,
      return_qty: value,
    });
    setPurchaseReturnHistoryDetails({
      purchase_return_id: element.purchase_return_id,
      po_product_id: element.po_product_id,
      purchase_order_id: element.purchase_order_id,
      purchase_return_qty: value, // Adjust this if needed
    });
    console.log('purchasereturnhistorydetails:', {
      purchase_return_id: element.purchase_return_id,
      po_product_id: element.po_product_id,
      purchase_order_id: element.purchase_order_id,
      purchase_return_qty: value
    });
    console.log('returnQty:', {
      po_product_id: element.po_product_id,
      return_qty: value,
    });
  };
  console.log('ModalId', modalId);

  const insertPurchasereturnHistory = () => {
    purchasereturnhistorydetails.creation_date = creationdatetime;
    purchasereturnhistorydetails.created_by = loggedInuser.first_name;
    api.post('/purchasereturn/insertPurchasereturnHistory', purchasereturnhistorydetails)
      .then((res) => {
        message('Return Qty updated successfully', 'success');
console.log('purchasereturnhistorydetails', res.data.data);
api.post('/purchasereturn/editpurchasereturn', {
  purchase_return_id: insertedDataId, 
  status: 'Returned',
  modified_by: loggedInuser.first_name, 
  modification_date:creationdatetime})
      .then(() => {
       
      })
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  const updatePoProduct = () => {
    console.log('return qty',returnQty)
    api.post('/purchasereturn/updatePoProduct', returnQty)
      .then((res1) => {
        message('Return Qty updated successfully', 'success');
        console.log('returnQty', res1.data.data);
        api
        .post('/inventory/editInventoryStock', returnQty)
        .then(() => {
          message('Quantity updated in inventory successfully.', 'success');
        })
        .catch(() => {
          message('unable to update quantity in inventory.', 'danger');
        });
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  const invoiceTableColumns = [
    { name: '' },
    { name: arabic.find((item) => item.key_text === 'mdPurchaseReturn.Item')?.[genLabel] },
    { name: arabic.find((item) => item.key_text === 'mdPurchaseReturn.Quantity')?.[genLabel] },
    { name: 'Returned Qty' },
    { name: 'Return Qty' },
    { name: 'History' },
  ];

  return (
    <Form>
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
              {Array.isArray(returnInvoiceItemDetails) && returnInvoiceItemDetails.length > 0 ? (
                returnInvoiceItemDetails.map((element) => (
                  <tr key={element.po_product_id}>
                    {/* <td>
                      <input
                        type="checkbox"
                        id="sno"
                        name="sno"
                        value={element.po_product_id}
                        onChange={(e) => getCheckedPoProducts(e, element)}
                      />
                    </td> */}
                    <td></td>
                    <td>{element.title}</td>
                    <td>{element.quantity}</td>
                    <td>{element.return_qty}</td>
                    {stockinputOpen && stockChangeId === element.po_product_id ? (
                      <td>
                        <Input
                          type="text"
                          defaultValue={element.return_qty}
                          onChange={(e) => handleReturnQty(e, element)}
                        />
                        <Button
                          color="primary"
                          className="shadow-none"
                          onClick={() => {
                            insertPurchasereturnHistory(element);
                            //updatePoProduct();
                            setStockinputOpen(false);
                          }}
                        >
                          Save
                        </Button>
                      </td>
                    ) : (
                      <td>
                        <button
                          type="button"
                          className="btn btn-link"
                          onClick={() => {
                            setStockChangeId(element.po_product_id);
                            setStockinputOpen(true);
                          }}
                        >
                          Return Qty
                        </button>
                      </td>
                      // <td>
                      //   <span
                          // onClick={() => {
                          //   setStockChangeId(element.po_product_id);
                          //   setStockinputOpen(true);
                          // }}
                      //   >
                      //     <Link to="">Return Qty</Link>
                      //   </span>
                      // </td>
                    )}

<td>
<button
                          type="button"
                          className="btn btn-link"
                          onClick={() => {
                            SetReturnHistoryModal(true);
                            setModalId(element.po_product_id);
                          }}
                        >
                           view
                        </button>
                      {/* <span
                        onClick={() => {
                          SetReturnHistoryModal(true);
                          setModalId(element.po_product_id);
                        }}
                      >
                       <Link to="">view</Link> 
                      </span> */}
                    </td>
                    
                   
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={invoiceTableColumns.length}>{arb ? 'لا توجد عناصر متاحة' : 'No items available'}</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
     {returnHistoryModal && <ViewReturnHistoryModal
                      returnHistoryModal={returnHistoryModal}
                      SetReturnHistoryModal={SetReturnHistoryModal}
                      PoProductId={modalId}
                    />}
    </Form>
  );
}

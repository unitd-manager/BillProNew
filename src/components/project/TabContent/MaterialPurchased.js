import React from 'react';
import { CardTitle, Row, Col, FormGroup, Input, Button, Table } from 'reactstrap';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import PdfMaterialPurchaseOrder from '../../PDF/PdfMaterialPurchaseOrder';
import api from '../../../constants/api';
import message from '../../Message'; 
/* eslint-disable */
export default function MaterialPurchased({
  addPurchaseOrderModal,
  setAddPurchaseOrderModal,
  insertDelivery,
  addQtytoStocks,
  testJsonData,
  setEditPo,
  setPOId,
  setEditPOLineItemsModal,
  getTotalOfPurchase,
  handleCheck,
  setTransferModal,
  setTransferItem,
  setViewLineModal,
}) {
  MaterialPurchased.propTypes = {
    addPurchaseOrderModal: PropTypes.any,
    setAddPurchaseOrderModal: PropTypes.any,
    insertDelivery: PropTypes.any,
    addQtytoStocks: PropTypes.any,
    tabPurchaseOrderLineItemTable: PropTypes.any,
    testJsonData: PropTypes.any,
    setEditPo: PropTypes.any,
    setPOId: PropTypes.any,
    setEditPOLineItemsModal: PropTypes.any,
    getTotalOfPurchase: PropTypes.any,
    handleCheck: PropTypes.any,
    setTransferModal: PropTypes.any,
    setTransferItem: PropTypes.any,
    setViewLineModal: PropTypes.any,
  };

  // Delete Purchase Order
  const deletePurchaseOrder = (deletePurchaseOrderId) => {
    Swal.fire({
      title: `Are you sure? `,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .post('/purchaseorder/deletePurchaseOrder', { purchase_order_id: deletePurchaseOrderId })
          .then(() => {
            Swal.fire('Deleted!', 'Purchase Order has been deleted.', 'success');
            setViewLineModal(false);
            window.location.reload();
          })
          .catch(() => {
            message('Unable to Delete Purchase Order', 'info');
          });
      }
    });
  };

  // render table in group based on same id's
  function groupBy(arr, key) {
    return arr.reduce((acc, item) => {
      const group = item[key];
      acc[group] = acc[group] || [];
      acc[group].push(item);
      return acc;
    }, {});
  }

  // const renderTable = (group) => {
  //   return (
  //     <>
  //       <Row key={Math.random().toString()}>
  //         <CardTitle tag="h4" className="border-bottom bg-secondary p-2 mb-0 text-white">
  //           <Row>
  //             <Col>{group[0].company_name}</Col>
  //             <Col>
  //               <div className="anchor">
  //                 <span
  //                   onClick={() => {
  //                     setEditPo(true);
  //                     setPOId(group);
  //                   }}
  //                 >
  //                   <u style={{ color: '#fff' }}> Edit Po </u>
  //                 </span>
  //               </div>
  //             </Col>
  //             <Col>
  //               <div className="anchor">
  //                 <span
  //                   onClick={() => {
  //                     setEditPOLineItemsModal(true);
  //                     setPOId(group);
  //                   }}
  //                 >
  //                   <u style={{ color: '#fff' }}> Edit Line Items </u>
  //                 </span>
  //               </div>
  //             </Col>
  //             <Col>
  //               <div className="anchor">
  //                 <span>
  //                   <u style={{ color: '#fff' }}> print pdf </u>
  //                 </span>
  //               </div>
  //             </Col>
  //             <Col> Total : {getTotalOfPurchase(group)}</Col>
  //             <Col className="d-flex justify-content-end">
  //               <Button
  //                 color="primary"
  //                 className="shadow-none"
  //                 onClick={() => {
  //                   deletePurchaseOrder(group[0].purchase_order_id);
  //                 }}
  //               >
  //                 X
  //               </Button>
  //             </Col>
  //           </Row>
  //         </CardTitle>
  //       </Row>
  //       <Table
  //         key={group[0].purchase_order_id}
  //         id="example"
  //         className="display border border-secondary rounded"
  //       >
  //         <thead>
  //           <tr>
  //             <th>D.O</th>
  //             <th>Title</th> 
  //             <th>Qty</th>
  //             <th>UOM</th>
  //             <th>Unit Price</th>
  //             <th>Amount</th>
  //             <th>Status</th>
  //             <th>Remarks</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {group.map((item, index) => (
  //             <tr key={item.po_product_id}>
  //               <td>
  //                 {' '}
  //                 <FormGroup>
  //                   <Input
  //                     type="checkbox"
  //                     value={item.purchase_order_id}
  //                     onChange={(e) => {
  //                       handleCheck(e, index, item);
  //                     }}
  //                   />
  //                 </FormGroup>
  //               </td>

  //               <td>{item.item_title}</td>
  //               <td>{item.qty}</td>
  //               <td>{item.unit}</td>
  //               <td>{item.cost_price}</td>
  //               <td>{item.qty * item.cost_price}</td>
  //               <td>{item.status}</td>
  //               <td>{item.description}</td>
  //               <td>
  //                 {' '}
  //                 <FormGroup>
  //                   <Row>
  //                     <span
  //                       onClick={() => {
  //                         setTransferItem(item);
  //                         setTransferModal(true);
  //                       }}
  //                     >
  //                       <u>Transfer</u>
  //                     </span>
  //                   </Row>
  //                 </FormGroup> 
  //               </td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </Table>
  //     </>
  //   );
  // };  
  const groups = testJsonData && groupBy(testJsonData, 'purchase_order_id');
console.log('groups',groups)

  return (
    <>
      <Row className="mb-4">
        <Col md="3">
          <Button
            color="primary"
            className="shadow-none"
            onClick={() => {
              setAddPurchaseOrderModal(true);
            }}
          >
            Add Purchase Order
          </Button>
        </Col>
        <Col md="3">
          <Button
            color="primary"
            className="shadow-none"
            onClick={() => {
              insertDelivery();
            }}
          >
            Create Delivery Order
          </Button>
        </Col>
        <Col md="3">
          <Button color="primary" className="shadow-none" onClick={() => addQtytoStocks()}>
            Add all Qty to Stock
          </Button>
        </Col>
       
      </Row>

      {testJsonData && <>{Object.values(groups).map((group,index)=>(
      <>
        <Row key={index.toString()}>
          <CardTitle tag="h4" className="border-bottom bg-secondary p-2 mb-0 text-white">
            <Row>
              <Col>{group[0].company_name}</Col>
              <Col>
                <div className="anchor">
                  <span
                    onClick={() => {
                      setPOId(group);
                      setEditPo(true);
                     
                    }}
                  >
                    <u style={{ color: '#fff' }}> Edit Po </u>
                  </span>
                </div>
              </Col>
              <Col>
                <div className="anchor">
                  <span
                    onClick={() => {
                      setPOId(group);
                      setEditPOLineItemsModal(true);
                   
                    }}
                  >
                    <u style={{ color: '#fff' }}> Edit Line Items </u>
                  </span>
                </div>
              </Col>
              <Col>
                <div className="anchor">
                  <span>
                  
          <PdfMaterialPurchaseOrder
            addPurchaseOrderModal={addPurchaseOrderModal}
            tabPurchaseOrderLineItemTable={group}
          ></PdfMaterialPurchaseOrder>
        
                  </span>
                </div>
              </Col>
              <Col> Total : {getTotalOfPurchase(group)}</Col>
              <Col className="d-flex justify-content-end">
                <Button
                  color="primary"
                  className="shadow-none"
                  onClick={() => {
                    deletePurchaseOrder(group[0].purchase_order_id);
                  }}
                >
                  X
                </Button>
              </Col>
            </Row>
          </CardTitle>
        </Row>
        <Table
          key={group[0].purchase_order_id}
          id="example"
          className="display border border-secondary rounded"
        >
          <thead>
            <tr>
              <th>D.O</th>
              <th>Title</th> 
              <th>Qty</th>
              <th>UOM</th>
              <th>Unit Price</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {group.map((item, index) => (
              <tr key={item.po_product_id}>
                <td>
                  {' '}
                  <FormGroup>
                    <Input
                      type="checkbox"
                      value={item.purchase_order_id}
                      onChange={(e) => {
                        handleCheck(e, item);
                      }}
                    />
                  </FormGroup>
                </td>

                <td>{item.item_title}</td>
                <td>{item.qty}</td>
                <td>{item.unit}</td>
                <td>{item.cost_price}</td>
                <td>{item.qty * item.cost_price}</td>
                <td>{item.status}</td>
                <td>{item.description}</td>
                <td>
                  {' '}
                  <FormGroup>
                    <Row>
                      <span
                        onClick={() => {
                          setTransferItem(item);
                          setTransferModal(true);
                        }}
                      >
                        <u>Transfer</u>
                      </span>
                    </Row>
                  </FormGroup> 
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    ))}</>}
    </>
  );
}

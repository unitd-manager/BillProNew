/* eslint-disable */
import React, { useState,useEffect } from 'react'
import { Card, CardBody,Row,Col,Button,Modal,ModalHeader,ModalBody, ModalFooter, Table} from 'reactstrap';
import PropTypes from 'prop-types'
import Swal from 'sweetalert2';
// import moment from 'moment';
import api from '../../constants/api';
import message from '../Message';
import PurchaseReturnhistoryTable from './PurchaseReturnhistoryTable';
// import message from '../Message';


function ViewReturnHistoryModal({returnHistoryModal,SetReturnHistoryModal,PoProductId}) {

    ViewReturnHistoryModal.propTypes = {
        returnHistoryModal: PropTypes.bool,
        SetReturnHistoryModal: PropTypes.func,
        PoProductId:PropTypes.any
      }

      const [returnQty,SetReturnQty]=useState([]);
      const [product, setProduct] = useState();
      const [editModal, setEditModal] = useState(false);
      const [selectedPoProducts, setSelectedPoProducts] = useState([]);
      const [historyProduct, setHistoryProduct] = useState();
      const [viewHistoryModal, setViewHistoryModal] = useState(false);
//Add to stocks
const addQtytoStocks = () => {
  console.log('selected')
  if (selectedPoProducts.length > 1) {
    console.log('selected',selectedPoProducts)
    selectedPoProducts.forEach((elem) => {
      if (elem.status !== 'Closed') {
        elem.status = 'Closed';
        elem.qty_updated = elem.qty_delivered;
        elem.qty_in_stock -= parseFloat(elem.purchase_return_qty);
        elem.stock -= parseFloat(elem.purchase_return_qty);
         elem.qty_in_stock=elem.stock;
        api.post('/product/edit-ProductQty', elem);
        api
          .post('/purchaseorder/editTabPurchaseOrderLineItem', elem)
          .then(() => {
            api
              .post('/inventory/editInventoryStock', elem)
              .then(() => {
                message('Quantity updated in inventory successfully.', 'success');
              })
              .catch(() => {
                message('unable to update quantity in inventory.', 'danger');
              });
            message('Quantity added successfully.', 'success');
          })
          .catch(() => {
            message('unable to add quantity.', 'danger');
          });
      } else {
        message('This product is already added', 'danger');
      }
    });
  } else {
    message('Please select atleast one product','danger');
  }
};

const getCheckedPoProducts = (checkboxVal, index, Obj) => {
  if (checkboxVal.target.checked === true) {
    setSelectedPoProducts([...selectedPoProducts, Obj]);
  }
  if (checkboxVal.target.checked !== true) {
    const copyselectedPoProducts = [...selectedPoProducts];
    copyselectedPoProducts.splice(index, 1);
    setSelectedPoProducts(copyselectedPoProducts);
  }
};

      const getPurchaseReturmItemsById = () => {
        api.post('/purchasereturn/getPurchaseReturmItemsById',{po_product_id:PoProductId})
          .then((res) => {
            SetReturnQty(res.data.data); 
          })
          .catch(() => {
            // message('adjuststock logs Data Not Found', 'info');
          });
      };
      const deletePoProduct = (poProductId) => {
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
              .post('purchaseorder/deletePoProduct', { po_product_id: poProductId })
              .then(() => {
                Swal.fire('Deleted!', 'PoProduct has been deleted.', 'success');
                setTimeout(() => {
                  window.location.reload();
                }, 300);
              })
              .catch(() => {
                message('Unable to Delete PO Product', 'info');
              });
          }
        });
      };
      const alcolumns = [      
        {
          name: "Returned Qty",
         
        },
        {
            name: "Created By",
            
          },
          {
            name: "Creation Date",
            
          }
      ]
    useEffect(()=>{
        getPurchaseReturmItemsById();
    },[])

  return (
    <>
    <Modal isOpen={returnHistoryModal}>
    <ModalHeader>Returned Quantity History</ModalHeader>
    <ModalBody>
      <Row>
      <Col md="2">
              <Button
                color="success"
                // onClick={getReturnInvoiceItemById}
                onClick={() => {
                  addQtytoStocks();
                }}
              >
                Detect Stock
              </Button>
            </Col>
      </Row>
        <Row>
        <Col md="12">
        <Card>
            
            <CardBody>
            {/* <Table id="example" className="display">
          <thead>
              <tr >
                  {alcolumns.map(cell=>{
                    return (<td key={cell.name}>{cell.name}</td>)
                  })}
              </tr>
          </thead>
          <tbody>
             {returnQty && returnQty.map(element=>{
                return (<tr key={element.po_product_id}>
                <td>{element.purchase_return_qty}</td>
                
                <td>{element.created_by}</td>
                <td>{element.creation_date}</td>
                {/* <td>{element.modified_by}{element.modification_date}</td> */}
            
                {/* </tr>
                )
            })} */}

{/* </tbody>  */}
          {/* </Table> */} 
          <PurchaseReturnhistoryTable
          products={returnQty}
          setProduct={setProduct}
          getCheckedPoProducts={getCheckedPoProducts}
          setEditModal={setEditModal}
          setViewHistoryModal={setViewHistoryModal}
          deletePoProduct={deletePoProduct}
          setHistoryProduct={setHistoryProduct}
        />
            </CardBody>
        </Card>
        </Col>
        </Row>  
    </ModalBody>
    <ModalFooter>
        <Button color="secondary" onClick={()=>{SetReturnHistoryModal(false)}}> Cancel </Button>
    </ModalFooter>
</Modal> 
</>
  )
}

export default ViewReturnHistoryModal
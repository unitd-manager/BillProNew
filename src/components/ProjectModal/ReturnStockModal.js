import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  FormGroup,
  Input,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
} from 'reactstrap';
import api from '../../constants/api';
import message from '../Message';
import AppContext from '../../context/AppContext';

function ReturnStockModal({ returnStockModal, setReturnStockModal, returnItem }) {
  ReturnStockModal.propTypes = {
    returnStockModal: PropTypes.bool,
    setReturnStockModal: PropTypes.func,
    returnItem: PropTypes.object,
  };
  const [returnObj, setReturnObj] = useState({
    po_product_id: '',
    product_id: '',
    stock: '',
    qty: '',
  });
  const [product, setProduct] = useState({});
  const { loggedInuser } = React.useContext(AppContext);
console.log('loginuser',loggedInuser)
  const handleQty = (e) => {
    returnObj.product_id = returnItem.product_id;
    returnObj.qty = e.target.value;

    setReturnObj({
      po_product_id: returnItem.po_product_id,
      product_id: returnItem.product_id,
      qty: e.target.value,
    });
  };

  //get line items
  const getProduct = () => {
    api
      .post('/product/getProduct', { product_id: returnItem.product_id })
      .then((res) => {
        setProduct(res.data.data[0]);
      })
      .catch(() => {
        message('unable to get products', 'error');
      });
  };

  const MaterialsReturnToStock = () => {
    if (returnObj.qty <= returnItem.quantity) {
      returnItem.quantity -= returnObj.qty;
      returnItem.qty = returnObj.qty;
      returnItem.created_by = loggedInuser.name;
       console.log('product',product)
      const elem={};
      elem.product_id=product.product_id;
      elem.qty_in_stock = parseFloat(product.qty_in_stock)+parseFloat(returnObj.qty);
      console.log('elem',elem)
      api
        .post('/projecttabmaterialusedportal/insertMaterialsReturned', returnItem)
        .then(() => {
      api
        .post('/projecttabmaterialusedportal/editTabMaterialUsedPortal', returnItem)
        .then(() => {
        
          api
            .post('/product/edit-ProductQty', elem)
            .then(() => {
              api
                .post('/inventory/editInventoryStock', elem)
                .then(() => {
                  message('Quantity updated in inventory successfully.', 'success');
                  setTimeout(()=>{
                    setReturnStockModal(false)
                  },300)
                })
                .catch(() => {
                  message('unable to update quantity in inventory.', 'danger');
                });
              message('Quantity added successfully.', 'success');
            })
            .catch(() => {
              message('unable to add quantity.', 'danger');
            });
        })
        .catch(() => {
          message(' Materials Transferred Data not found', 'info');
        });
      }).catch(()=>{ message('unable to return items.', 'danger');})
    } else {
      alert(`Please Enter the quantity less than ${returnItem.quantity}`);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      <Modal isOpen={returnStockModal}>
        <ModalHeader>Return To Stock</ModalHeader>
        <span style={{marginLeft:'10px'}}> Total Quantity:{returnItem.quantity} </span>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Enter Return Quantity</Label>
              <Input
                type="text"
                name="qty"
                onChange={(e) => {
                  handleQty(e);
                }}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" className="shadow-none" onClick={() => MaterialsReturnToStock()}>
            {' '}
            Submit{' '}
          </Button>
          <Button
            color="secondary"
            className="shadow-none"
            onClick={() => {
              setReturnStockModal(false);
            }}
          >
            {' '}
            Cancel{' '}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ReturnStockModal;

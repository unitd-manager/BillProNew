import React, { useContext, useState, useEffect } from 'react';
import {
  FormGroup,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Input,
} from 'reactstrap';
import PropTypes from 'prop-types';
import api from '../../constants/api';
import message from '../Message';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

//addPurchaseOrderEditModal From VehicleEdit
const PurchaseRequestItemsEditModal = ({ addPurchaseOrderEditModal, setAddPurchaseOrderEditModal, PurchaseRequestID,arb }) => {
    PurchaseRequestItemsEditModal.propTypes = {
    addPurchaseOrderEditModal: PropTypes.bool,
    setAddPurchaseOrderEditModal: PropTypes.func,
    PurchaseRequestID: PropTypes.any,
    arb: PropTypes.any
  };

  // All State Variable
  
    const [purchaserequesteditdetails, setPurchaseRequestEditDetails] = useState();
    // get staff details
   const { loggedInuser } = useContext(AppContext);

  
    function updateState(index, property, e) {
    const copyDeliverOrderProducts = [...purchaserequesteditdetails];
    const updatedObject = { ...copyDeliverOrderProducts[index], [property]: e.target.value };
    
//   const quantity = parseFloat(updatedObject.goods_received_qty) || 0;
//   const unitPrice = parseFloat(updatedObject.unit_price) || 0;
  // const totalCost = parseFloat(updatedObject.total_cost);
//   updatedObject.total_cost = quantity * unitPrice;
  updatedObject.modification_date = creationdatetime;
  updatedObject.modified_by = loggedInuser.first_name;
  copyDeliverOrderProducts[index] = updatedObject;
    setPurchaseRequestEditDetails(copyDeliverOrderProducts);
  }

   

  //Api call for getting Vehicle Insurance Data By ID
  const PurchaseRequestLineItemById = () => {
      api
        .post('/purchaserequest/PurchaseRequestLineItemById', {purchase_request_id: PurchaseRequestID})
        .then((res) => {
          setPurchaseRequestEditDetails(res.data.data);
        })
        .catch(() => {
          message('Order Data Not Found', 'info');
        });
    };

  //Api call for Insert Vehicle Insurance Data
  const editPurchaseRequestItems = () => {
    
    purchaserequesteditdetails.forEach((item) => {
    api
      .post('/purchaserequest/editPurchaseRequestItems', item)
      .then(() => {
        message('Line Item Edited Successfully', 'sucess');
      })
      .catch(() => {
        message('Cannot Edit Line Items', 'error');
      });
    }) 
  };

  // useEffect for Vehicle Insurance
  useEffect(() => {
    PurchaseRequestLineItemById();
  }, [PurchaseRequestID]);

  return (
    <>
      <Modal size="xl" isOpen={addPurchaseOrderEditModal}>
        <ModalHeader>
        {arb ?'عناصر طلب الشراء':'Purchase Request Items'} 
          <Button
            color="secondary"
            onClick={() => {
              setAddPurchaseOrderEditModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <Table bordered className="lineitem">
              <thead>
                <tr>
                  <th scope="col">{arb ?'عنوان':'Title'}</th>
                  <th scope="col">{arb ?'وحدة':'Unit'}</th>
                  <th scope="col">{arb ?'كمية':'Quantity'}</th>
                </tr>
              </thead>
              <tbody>  
                {purchaserequesteditdetails &&
                  purchaserequesteditdetails.map((item, index)  => {
                    return (
                      <tr key={item.id}>                     
                        <td data-label="Title">
                          <Input
                            defaultValue={item.title}
                            type="text"
                            name="title"
                            onChange={(e) => updateState(index, 'title', e)}
                            disabled
                          />
                        </td>
                        <td data-label="Unit">
                          <Input
                            defaultValue={item.unit}
                            type="text"
                            name="unit"
                            onChange={(e) => updateState(index, 'unit', e)}
                            disabled
                          />
                        </td>
                        <td data-label="Quantity">
                          <Input
                            defaultValue={item.purchase_request_qty}
                            type="number"
                            name="purchase_request_qty"
                            onChange={(e) => updateState(index, 'purchase_request_qty', e)}
                          />
                        </td>                  
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            type="button"
            onClick={() => {
              editPurchaseRequestItems();
              setAddPurchaseOrderEditModal(false);
              // setTimeout(() => {
              //   window.location.reload()
              // }, 100);
            }}
          >
            {arb ?'يُقدِّم':'Submit'}
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              setAddPurchaseOrderEditModal(false);
            }}
          >
            {arb ?'يلغي':'Cancel'}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default PurchaseRequestItemsEditModal;

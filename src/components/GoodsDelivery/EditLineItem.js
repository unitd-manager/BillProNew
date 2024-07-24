import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import api from '../../constants/api';
import message from '../Message';

const InvoiceModal = ({ editModal, setEditModal, getgoodsLineItemById }) => {
  InvoiceModal.propTypes = {
    editModal: PropTypes.bool,
    setEditModal: PropTypes.func,
    getgoodsLineItemById: PropTypes.func,
  };

  const { id } = useParams();
  //Add Line Item
  const [addLineItem, setAddLineItem] = useState([
    {
      goods_delivery_item_id: id,
    },
  ]);

  function updateState(index, property, e) {
    const copyDeliverOrderProducts = [...addLineItem];
    const updatedObject = { ...copyDeliverOrderProducts[index], [property]: e.target.value };

    const quantity = parseFloat(updatedObject.delivery_qty) || 0;
    const unitPrice = parseFloat(updatedObject.unit_price) || 0;
    // const totalCost = parseFloat(updatedObject.total_cost);
    updatedObject.amount = quantity * unitPrice;

    const DeliveryQty = updatedObject.delivery_qty;
    const orderedQty = updatedObject.quantity;
  
    if (DeliveryQty > orderedQty) {
      alert('Entered quantity exceeds ordered quantity!');
      return;
    }
    copyDeliverOrderProducts[index] = updatedObject;
    setAddLineItem(copyDeliverOrderProducts);
  }

  const getLineItem = () => {
    api.post('/goodsdelivery/getgoodsdeliveryitemById', { goods_delivery_id: id }).then((res) => {
      setAddLineItem(res.data.data);
    });
  };

  //editlineitem
  const editLineItemApi = () => {
    const editPromises = addLineItem.map((item) => {
      return api.post('/goodsdelivery/edit-goodsdeliveryitem', item);
    });

    Promise.all(editPromises)
      .then(() => {
        getgoodsLineItemById();
        setEditModal(false);
        message('Line Items Edited Successfully', 'success');
      })
      .catch(() => {
        message('Cannot Edit Line Items', 'error');
      });
  };

  useEffect(() => {
    getLineItem();
  }, []);
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };

  const selectedLanguage = getSelectedLanguageFromLocalStorage();

  // Use the selected language value as needed
  console.log('Selected language from localStorage:', selectedLanguage);
 

  const [arabic, setArabic] = useState([]);

  const arb = selectedLanguage === 'Arabic';

  // const eng = selectedLanguage === 'English';

  const getArabicCompanyName = () => {
    api
      .get('/enquiry/getTranslationforTradingEnq')
      .then((res) => {
        setArabic(res.data.data);
      })
      .catch(() => {
        // Handle error if needed
      });
  };

  console.log('arabic', arabic);
  useEffect(() => {
    getArabicCompanyName();
  }, []);

  // let genLabel = '';

  // if (arb === true) {
  //   genLabel = 'arb_value';
  // } else {
  //   genLabel = 'value';
  // }

  return (
    <>
      <Modal size="xl" isOpen={editModal}>
        <ModalHeader>
        {arb?'تحرير عناصر التسليم': 'Edit Delivery Items'}
          <Button
            className="shadow-none"
            color="secondary"
            onClick={() => {
              setEditModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>
        <ModalBody>
          <Form>
            <Row>
              <Col>
                <table className="lineitem">
                  <thead>
                    <tr>
                      <th scope="col">{arb?'غرض': 'Item'} </th>
                      <th scope="col">{arb?'جامعة م': 'UoM'}</th>
                      <th scope="col">{arb?'الكمية': 'Qty'}</th>
                      <th scope="col">{arb?'تسليم الكمية': 'Delivery Qty'}</th>
                      <th scope="col">{arb?'كمية': 'Amount'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {addLineItem &&
                      addLineItem.map((item, index) => {
                        return (
                          <tr key={item.id}>
                            <td data-label="Item">
                              <Input
                                defaultValue={item.title}
                                type="text"
                                name="title"
                                onChange={(e) => updateState(index, 'title', e)}
                                disabled
                              />
                            </td>
                           
                            <td data-label="UoM">
                              <Input
                                defaultValue={item.unit}
                                type="text"
                                name="unit"
                                onChange={(e) => updateState(index, 'unit', e)}
                                disabled
                              />
                            </td>
                            <td data-label="Qty">
                              <Input
                                defaultValue={item.quantity}
                                type="number"
                                name="quantiy"
                                onChange={(e) => updateState(index, 'quantity', e)}
                              />
                            </td>
                            <td data-label="Delivery Qty">
                              <Input
                                defaultValue={item.delivery_qty}
                                type="number"
                                name="quantiy"
                                onChange={(e) => updateState(index, 'delivery_qty', e)}
                              />
                            </td>
                            <td data-label="Amount">
                              <Input
                                defaultValue={item.amount}
                                type="number"
                                name="amount"
                                onChange={(e) => updateState(index, 'amount', e)}
                                disabled
                              />
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </Col>
            </Row>
            <ModalFooter>
              <Button
                className="shadow-none"
                color="primary"
                onClick={() => {
                  editLineItemApi();
                }}
              >
                {' '}
                {arb?'يُقدِّم': 'Submit'}{' '}
              </Button>
              <Button
                className="shadow-none"
                color="secondary"
                onClick={() => {
                  setEditModal(false);
                }}
              >
                {arb?'يلغي': 'Cancel'}
              </Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};
export default InvoiceModal;

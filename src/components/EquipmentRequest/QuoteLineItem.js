import React, { useState } from 'react';
import {
  // Card,
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
import Select from 'react-select';
import * as $ from 'jquery';
import random from 'random';
import AsyncSelect from 'react-select/async';
import api from '../../constants/api';
import message from '../Message';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';


const QuoteLineItem = ({
  addLineItemModal,
  setAddLineItemModal,
  quoteLine,
  arb,
  arabic,
  genLabel
  //tenderDetails,
  //getLineItem,
}) => {
  QuoteLineItem.propTypes = {
    addLineItemModal: PropTypes.bool,
    setAddLineItemModal: PropTypes.func,
    quoteLine: PropTypes.any,
    arb: PropTypes.any,
    arabic: PropTypes.any,
    genLabel: PropTypes.any,
    //tenderDetails: PropTypes.any,
    //getLineItem: PropTypes.any,
  };
  const [totalAmount, setTotalAmount] = useState(0);
  const [supplier, setSupplier] = useState([]);
  const { loggedInuser } = React.useContext(AppContext);
  const [addLineItem, setAddLineItem] = useState([
    {
      id: random.int(1, 99),
      unit: '',
      quantity: '',
      unit_price: '',
      amount: '',
      remarks: '',
      product_id: '',
      supplier_id:'',
      title:'',
      description: '',
    },
  ]);

  const getSupplier = () => {
    api.get('/purchaseorder/getSupplier', supplier)
      .then((res) => {
        const items = res.data.data
        const finaldat = []
        items.forEach(item => {
          finaldat.push({ value: item.supplier_id, label: item.company_name })
        })
        setSupplier(finaldat)
      })
  }
  //onchange function
  const onchangeItemSupplier = (selectedValue, itemId) => {
    const updatedItems = addLineItem.map((item) => {
      if (item.supplier_id === itemId) {
        return {
          ...item,
          supplier_id: selectedValue.value, // Update supplier_id with the selected option's value (ID)
        };
      }
      return item;
    });
  
    setAddLineItem(updatedItems);
  };
  
  //Add new line item
  const AddNewLineItem = () => {
    setAddLineItem([
      ...addLineItem,
      {
        id: new Date().getTime().toString(),
        unit: '',
        quantity: '',
        unit_price: '',
        remarks: '',
        amount: '',
        product_id: '',
        supplier_id:'',
        title:'',
        description: '',
      },
    ]);
  };
  //Insert Invoice Item
  const addLineItemApi = (obj) => {
    //obj.opportunity_id = projectInfo;
    obj.creation_date = creationdatetime;
    obj.created_by = loggedInuser.first_name;
    obj.equipment_request_id = quoteLine;
    if (
      obj.amount !== '' 
    
    ) {
    api
      .post('/equipmentrequest/insertQuoteItems', obj)
      .then(() => {
        message('Line Item Added Successfully', 'sucess');
        //setAddLineItemModal(false);
        setTimeout(() => {
          window.location.reload();
        }, 300);
      })
      .catch(() => {
        //message('Cannot Add Line Items', 'error');
      });
    } else {
      message('All fields are required.', 'info');
    }
  };
  //Invoice item values
  const getAllValues = () => {
    const result = [];
    $('.lineitem tbody tr').each(function input() {
      const allValues = {};
      $(this)
        .find('input')
        .each(function output() {
          const fieldName = $(this).attr('name');
          allValues[fieldName] = $(this).val();
        });
      result.push(allValues);
    });
    setTotalAmount(0);
    console.log(result);
    result.forEach((element) => {
      addLineItemApi(element);
    });
    console.log(result);
  };

  const [unitdetails, setUnitDetails] = useState();
  // Fetch data from API
    const getUnit = () => {
      api.get('/product/getUnitFromValueList', unitdetails)
        .then((res) => {
          const items = res.data.data
          const finaldat = []
          items.forEach(item => {
            finaldat.push({ value: item.value, label: item.value })
          })
          setUnitDetails(finaldat)
        })
    }
    //onchange function
    const onchangeItem = (selectedValue) => {
      const updatedItems = addLineItem.map((item) => {
        if (item.unit === selectedValue.value) {  // Compare with selectedValue.value
          return {
            ...item,
            unit: selectedValue.value,  // Update the unit with the selected option's value
            value: selectedValue.value  // Update the value with the selected option's value
          };
        }
        return item;
      });
    
      setAddLineItem(updatedItems);
    };

  //Invoice Items Calculation
  const calculateTotal = () => {
    let totalValue = 0;
    const result = [];
    $('.lineitem tbody tr').each(function input() {
      const allValues = {};
      $(this)
        .find('input')
        .each(function output() {
          const fieldName = $(this).attr('name');
          allValues[fieldName] = $(this).val();
          allValues.amount = allValues.quantity * allValues.unit_price;
        });
      result.push(allValues);
    });
    result.forEach((e) => {
      if (e.amount) {
        totalValue += parseFloat(e.amount);
      }
    });
    console.log(result);
    setAddLineItem(result);
    setTotalAmount(totalValue);
  };
  // Clear row value
  const ClearValue = (ind) => {
    setAddLineItem((current) =>
      current.filter((obj) => {
        return obj.id !== ind.id;
      }),
    );
    if (ind.amount) {
      const finalTotal = totalAmount - parseFloat(ind.amount);
      setTotalAmount(finalTotal);
    }
  };

  React.useEffect(() => {
    getUnit();
    getSupplier();

  }, []);

 
  
  
  const onchangeItems = (selectedProduct, itemId) => {
    const updatedItems = addLineItem.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          product_id: selectedProduct.value.toString(),
          title: selectedProduct.label,
          type: selectedProduct.type,
        };
      }
      return item;
    });
    setAddLineItem(updatedItems);
  };
  
  
  
  const loadOptions = (inputValue, callback) => {
    api.get(`/product/getProductsbySearchFilter`, { params: { keyword: inputValue } })
  .then((res) => {
      const items = res.data.data;
      const options = items.map((item) => ({
        value: item.product_id,
        label: item.title,
        type: item.type,
      
      }));
      callback(options);
    });
  };

  return (
    <>
      <Modal size="xl" isOpen={addLineItemModal}>
        <ModalHeader>
          {arb?'إضافة عناصر المعدات':'Add Equipment Items'}
          <Button
            className="shadow-none"
            color="secondary"
            onClick={() => {
              setAddLineItemModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
              <Form>
                <Row>
                  <Row>
                    <Col md="3">
                      <Button
                        className="shadow-none"
                        color="primary"
                        type="button"
                        onClick={() => {
                          AddNewLineItem();
                        }}
                      >
                        {arb?'إضافة عنصر السطر':'Add Line Item'}
                      </Button>
                    </Col>
                    <br/>
                  </Row>
                 
                  {/* Invoice Item */}
                  {/* <Card> */}
                    <table className="lineitem">
                      <thead>
                        <tr>
                          <th scope="col">{arabic.find((item) => item.key_text === 'mdEquipmentRequest.Title')?.[genLabel]}</th>
                          <th scope="col">{arabic.find((item) => item.key_text === 'mdEquipmentRequest.Supplier')?.[genLabel]}</th>
                          <th scope="col">{arabic.find((item) => item.key_text === 'mdEquipmentRequest.Unit')?.[genLabel]} </th>
                          <th scope="col">{arabic.find((item) => item.key_text === 'mdEquipmentRequest.Qty')?.[genLabel]}</th>
                          <th scope="col">{arabic.find((item) => item.key_text === 'mdEquipmentRequest.Unit Price')?.[genLabel]}</th>
                          <th scope="col">{arabic.find((item) => item.key_text === 'mdEquipmentRequest.Amount')?.[genLabel]}</th>
                          <th scope="col">{arabic.find((item) => item.key_text === 'mdEquipmentRequest.Remarks')?.[genLabel]}</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                     
                        {addLineItem &&
                          addLineItem.map((item) => {
                            return (
                              <tr key={item.id}>
                <td>
                  <AsyncSelect
                    defaultValue={{
                      value: item.product_id,
                      label: item.title,
                      price: item.price,
                      unit: item.unit,
                    }}
                    onChange={(selectedOption) => {
                      onchangeItems(selectedOption, item.id); // Pass item.id as the itemId
                    }}
                    loadOptions={loadOptions}
                  />
                  <Input value={item.product_id} type="hidden" name="product_id"></Input>
                  <Input value={item.title} type="hidden" name="title"></Input>
                </td>
                
                    <td data-label="Supplier">
                                  <Select
                                    name="supplier_id"
                                    onChange={(selectedOption) => {
                                      onchangeItemSupplier(selectedOption, item.id); // Pass item.id as the itemId
                                    }}
                                    options={supplier}
                                  />
                                </td>
                                <td data-label="Unit">
                                  <Select
                                    name="unit"
                                    onChange={(selectedOption) => {
                                      onchangeItem(selectedOption);
                                    }}
                                    options={unitdetails}
                                  />
                                </td>
                                <td data-label="Qty">
                                  <Input Value={item.quantity} type="number" name="quantity" />
                                </td>
                                <td data-label="Unit Price">
                                  <Input
                                    Value={item.unit_price}
                                    onBlur={() => {
                                      calculateTotal();
                                    }}
                                    type="number"
                                    name="unit_price"
                                  />
                                </td>
                                <td data-label="Amount">
                                  <Input Value={item.amount} type="text" name="amount" disabled />
                                </td>
                                <td data-label="Remarks">
                                  <Input Value={item.remarks} type="text" name="remarks" />
                                </td>
                                <td data-label="Action">
                                  <Input type="hidden" name="id" Value={item.id}></Input>
                                  <span
                                    className="addline"
                                    onClick={() => {
                                      ClearValue(item);
                                    }}
                                  >
                                    Clear
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  {/* </Card> */}
                  <ModalFooter>
                    <Button
                      className="shadow-none"
                      color="primary"
                      onClick={() => {
                        getAllValues();
                        //setAddLineItemModal(false);
                      }}
                    >
                      {' '}
                      Submit{' '}
                    </Button>
                    <Button
                      className="shadow-none"
                      color="secondary"
                      onClick={() => {
                        setAddLineItemModal(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </ModalFooter>
                </Row>
              </Form>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};
export default QuoteLineItem;

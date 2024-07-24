import React, { useState, useContext } from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Modal,
  FormGroup,
  Label,
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
  tenderDetails,
  getLineItem,
  previousTenderDetails,
  arb,
  arabic,
}) => {
  QuoteLineItem.propTypes = {
    addLineItemModal: PropTypes.bool,
    setAddLineItemModal: PropTypes.func,
    quoteLine: PropTypes.any,
    tenderDetails: PropTypes.any,
    getLineItem: PropTypes.any,
    previousTenderDetails: PropTypes.any,
    arb: PropTypes.any,
    arabic: PropTypes.any,
  };
  const [totalAmount, setTotalAmount] = useState(0);
  const [addNewProductModal, setAddNewProductModal] = useState(false);
  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }
  const [addLineItem, setAddLineItem] = useState([
    {
      id: random.int(1, 99),
      unit: '',
      quantity: '',
      unit_price: '',
      amount: '',
      remarks: '',
      title: '',
      product_id: '',
      description: '',
    },
  ]);
  //get staff details
  const { loggedInuser } = useContext(AppContext);

  //Add new line item
  const AddNewLineItem = () => {
    setAddLineItem([
      ...addLineItem,
      {
        id: new Date().getTime().toString(),
        unit: '',
        quantity: '',
        product_id: '',
        unit_price: '',
        remarks: '',
        amount: '',
        title: '',
        description: '',
      },
    ]);
  };
  //Insert Invoice Item
  const addLineItemApi = (obj) => {
    obj.creation_date = creationdatetime;
    obj.created_by = loggedInuser.first_name;
    obj.opportunity_id = previousTenderDetails.opportunity_id;
    obj.quote_id = quoteLine;
    api
      .post('/tradingquote/insertQuoteItems', obj)
      .then(() => {
        message('Line Item Added Successfully', 'sucess');
        window.location.reload();
        getLineItem(tenderDetails.quote_id);
      })
      .catch(() => {
        // message('Cannot Add Line Items', 'error');
      });
  };
  //Invoice item values
  const getAllValues = () => {
    const result = [];
    let isValid = true; // Initialize a validation flag
    $('.lineitem tbody tr').each(function input() {
      const allValues = {};
      $(this)
        .find('input,textarea')
        .each(function output() {
          const fieldName = $(this).attr('name');
          const fieldValue = $(this).val();
          allValues[fieldName] = fieldValue;

          // Check if Amount, Title, and Description are empty
          if (fieldName === 'amount' || fieldName === 'title' || fieldName === 'description') {
            if (!fieldValue) {
              isValid = false; // Set the flag to false if any of these fields are empty
            }
          }
        });
      result.push(allValues);
    });
    if (!isValid) {
      alert('Please fill in Amount, Title, and Description for all line items.');
      return; // Prevent further processing if validation fails
    }
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
    api.get('/product/getUnitFromValueList', unitdetails).then((res) => {
      const items = res.data.data;
      const finaldat = [];
      items.forEach((item) => {
        finaldat.push({ value: item.value, label: item.value });
      });
      setUnitDetails(finaldat);
    });
  };
  //onchange function
  const onchangeItem = (selectedValue) => {
    const updatedItems = addLineItem.map((item) => {
      if (item.unit === selectedValue.value) {
        // Compare with selectedValue.value
        return {
          ...item,
          unit: selectedValue.value, // Update the unit with the selected option's value
          value: selectedValue.value, // Update the value with the selected option's value
        };
      }
      return item;
    });

    setAddLineItem(updatedItems);
  };
  const [productDetail, setProductDetail] = useState({
    category_id: null,
    sub_category_id: null,
    title: '',
    product_code: '',
    qty_in_stock: null,
    price: null,
    published: 1,
  });
  const handleNewProductDetails = (e) => {
    setProductDetail({ ...productDetail, [e.target.name]: e.target.value });
  };
  const insertProduct = (ProductCode, ItemCode) => {
    if (productDetail.title !== '') {
      productDetail.product_code = ProductCode;
      productDetail.item_code = ItemCode;
      productDetail.creation_date = creationdatetime;
      productDetail.created_by = loggedInuser.first_name;
      api
        .post('/purchaseorder/insertPurchaseProduct', productDetail)
        .then(() => {
          message('Product inserted successfully.', 'success');
        })
        .catch(() => {
          message('Unable to insert product.', 'error');
        });
    } else {
      message('Please fill the Product Name ', 'warning');
    }
  };

  //Auto generation code
  const generateCode = () => {
    api
      .post('/product/getCodeValue', { type: 'ProductCode' })
      .then((res) => {
        const ProductCode = res.data.data;
        api.post('/product/getCodeValue', { type: 'ItemCode' }).then((response) => {
          const ItemCode = response.data.data;
          insertProduct(ProductCode, ItemCode);
        });
      })
      .catch(() => {
        insertProduct('');
      });
  };

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
    api
      .get(`/product/getProductsbySearchFilter`, { params: { keyword: inputValue } })
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
  }, []);
  return (
    <>
      <Modal size="xl" isOpen={addLineItemModal}>
        <ModalHeader>
          Add Quote Items
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
                        Add Line Item
                      </Button>
                    </Col>
                    <Col md="3">
                      <Button
                        color="primary"
                        className="shadow-none"
                        onClick={() => {
                          setAddNewProductModal(true);
                        }}
                      >
                        {arb ?'قائمة الاقتباس':"Add New Product"}

                        
                      </Button>
                    </Col>
                  </Row>
                  {/* Invoice Item */}

                  <table className="lineitem">
                    <thead>
                      <tr>
                        <th scope="col">
                          {
                            arabic.find((item) => item.key_text === 'mdTradingQuote.Title')?.[
                              genLabel
                            ]
                          }
                        </th>
                        <th scope="col">
                          {' '}
                          {
                            arabic.find((item) => item.key_text === 'mdTradingQuote.Description')?.[
                              genLabel
                            ]
                          }
                        </th>
                        <th scope="col">
                          {arabic.find((item) => item.key_text === 'mdTradingQuote.Unit')?.[genLabel]}{' '}
                        </th>
                        <th scope="col">
                          {
                            arabic.find((item) => item.key_text === 'mdTradingQuote.Quantity')?.[
                              genLabel
                            ]
                          }
                        </th>
                        <th scope="col">
                          {
                            arabic.find((item) => item.key_text === 'mdTradingQuote.Unit Price')?.[
                              genLabel
                            ]
                          }
                        </th>
                        <th scope="col">
                          {
                            arabic.find((item) => item.key_text === 'mdTradingQuote.Amount')?.[
                              genLabel
                            ]
                          }
                        </th>
                        <th scope="col">
                          {
                            arabic.find((item) => item.key_text === 'mdTradingQuote.Remarks')?.[
                              genLabel
                            ]
                          }
                        </th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {addLineItem &&
                        addLineItem.map((item) => {
                          return (
                            <tr key={item.id}>
                              <td>
                                <div style={{ width: '130px' }}>
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
                                  <Input
                                    value={item.product_id}
                                    type="hidden"
                                    name="product_id"
                                  ></Input>
                                  <Input value={item.title} type="hidden" name="title"></Input>
                                </div>
                              </td>
                              <td data-label="Description">
                                <Input
                                  type="textarea"
                                  name={arb ? 'description_arb' : 'description'}
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
      {/* Add New Product Modal */}
      <Modal isOpen={addNewProductModal}>
        <ModalHeader>{arb ?'قائمة الاقتباس':"Add New Products"}  </ModalHeader>

        <ModalBody>
          <FormGroup>
            <Row>
              <Col md="12" className="mb-4">
                <Row>
                  <FormGroup>
                    <Row>
                      <Label sm="3">
                      {arb ?'اسم المنتج':"Product Name"}  <span className="required"> *</span>{' '}
                      </Label>
                      <Col sm="8">
                        <Input
                          type="text"
                          name="title"
                          onChange={handleNewProductDetails}
                          value={productDetail.title}
                        />
                      </Col>
                      
                    </Row>
                  </FormGroup>
                </Row>
              </Col>
            </Row>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="shadow-none"
            onClick={() => {
              generateCode();
              setAddNewProductModal(false);
              // getProduct();
              // setTimeout(() => {
              //   window;
              // }, 300);
            }}
          >
            Submit
          </Button>
          <Button
            color="secondary"
            className="shadow-none"
            onClick={() => {
              setAddNewProductModal(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default QuoteLineItem;

import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  FormGroup,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
} from 'reactstrap';
import PropTypes from 'prop-types';
import * as $ from 'jquery';
import random from 'random';
import moment from 'moment';
import Select from 'react-select';
import api from '../../constants/api';
import message from '../Message';

const AddPurchaseOrderModal = ({ projectId, addPurchaseOrderModal, setAddPurchaseOrderModal }) => {
  AddPurchaseOrderModal.propTypes = {
    addPurchaseOrderModal: PropTypes.bool,
    projectId: PropTypes.string,
    setAddPurchaseOrderModal: PropTypes.func,
  };

  const [productDetails, setProductDetails] = useState({
    title: '',
    product_code: '',
    site_id: 0,
    price:'',
    qty_in_stock:'',
    unit:'',


  });

  //setting data in ProductDetails
  const handleNewProductDetails = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };
  const [supplier, setSupplier] = useState([]);
  const [purchaseDetails, setPurchaseDetails] = useState({
    supplier_id: '',
    purchase_order_date: '',
    gst: 0,
    po_code: '',
  });
  const [addNewProductModal, setAddNewProductModal] = useState(false);
  //const [ItemCode, setItemcode] = useState();
  const [getProductValue, setProductValue] = useState();
  const [addMoreItem, setMoreItem] = useState([
    {
      id: random.int(1, 99).toString(),
      itemId: '',
      unit: '',
      qty: '',
      price: '',
      mrp: '',
      gst: 0,
      description: '',
    },
    {
      id: random.int(0, 9999).toString(),
      itemId: '',
      unit: '',
      qty: '',
      price: '',
      mrp: '',
      gst: 0,
      description: '',
    },
    {
      id: random.int(0, 9999).toString(),
      itemId: '',
      unit: '',
      qty: '',
      price: '',
      mrp: '',
      gst: 0,
      description: '',
    },
  ]);

  //handle inputs
  const handleInputs = (e) => {
    setPurchaseDetails({ ...purchaseDetails, [e.target.name]: e.target.value });
  };

  // Getting suppliers
  const getSupplier = () => {
    api.get('/purchaseorder/getSupplier').then((res) => {
      setSupplier(res.data.data);
    });
  };

  const AddNewLineItem = () => {
    setMoreItem([
      ...addMoreItem,
      {
        id: random.int(0, 9999).toString(),
        itemId: '',
        unit: '',
        qty: '',
        price: '',
        mrp: '',
        gst: 0,
        description: '',
      },
    ]);
  };

  const [insertPurchaseOrderData] = useState({
    po_code: '',
    supplier_id: '',
    contact_id_supplier: '',
    delivery_terms: '',
    status: 'test',
    project_id: projectId,
    flag: 1,
    creation_date: new Date(),
    modification_date: new Date(),
    created_by: '1',
    modified_by: '1',
    supplier_reference_no: '',
    our_reference_no: '',
    shipping_method: '',
    payment_terms: '',
    delivery_date: '',
    po_date: '',
    shipping_address_flat: '',
    shipping_address_street: '',
    shipping_address_country: '',
    shipping_address_po_code: '',
    expense_id: 0,
    staff_id: 0,
    purchase_order_date: new Date(),
    payment_status: '0',
    title: 'Purchase Order',
    priority: '1',
    follow_up_date: new Date(),
    notes: 'test',
    supplier_inv_code: '',
    gst: '',
    gst_percentage: '10%',
    delivery_to: '',
    contact: '',
    mobile: '',
    payment: '0',
    project: '',
  });

  //getting maximum of itemcode
  // const getMaxItemcode = () => {
  //   api.get('/product/getMaxItemCode').then((res) => {
  //     setItemcode(res.data.data[0].itemc);
  //   });
  // };

  //   Get Products
  const getProduct = () => {
    api.get('/product/getProducts').then((res) => {
      const items = res.data.data;
      const finaldat = [];
      items.forEach((item) => {
        finaldat.push({ value: item.product_id, label: item.title });
      });
      setProductValue(finaldat);
    });
  };

  // Materials Purchased

  const TabMaterialsPurchased = () => {
    api
      .get('/purchaseorder/TabPurchaseOrderLineItem')
      .then((res) => {
        const items = res.data.data;
        const finaldat = [];
        items.forEach((item) => {
          finaldat.push({ value: item.product_id, label: item.title });
        });
      })
      .catch(() => {
        message('Tab Purchase Order not found', 'info');
      });
  };

  const poProduct = (PurchaseOrderId, itemObj) => {
    
    api
      .post('/purchaseorder/insertPoProduct', {
        purchase_order_id: PurchaseOrderId,
        item_title: itemObj.Item,
        quantity: Number(itemObj.qty).toFixed(2),
        unit: itemObj.unit,
        amount: 0,
        description: itemObj.description,
        creation_date: new Date(),
        modification_date: new Date(),
        created_by: '1',
        modified_by: '1',
        status: 'In Progress',
        cost_price: Number(itemObj.cost_price).toFixed(2),
        selling_price: itemObj.mrp,
        qty_updated: parseInt(itemObj.qty, 10),
        qty: parseInt(itemObj.qty, 10),
        product_id: parseInt(itemObj.itemId, 10),
        supplier_id: insertPurchaseOrderData.supplier_id,
        gst: Number(itemObj.gst).toFixed(2),
        damage_qty: 0,
        brand: '',
        qty_requested: Number(0).toFixed(2),
        qty_delivered: Number(0).toFixed(2),
        price: Number(itemObj.price).toFixed(2),
      })
      .then(() => {
        //setAddPurchaseOrderModal(false);
        message('Product Added!', 'success');
        window.location.reload();
      })
      .catch(() => {
        message('Unable to add Product!', 'error');
      });
    
  };

  const getAllValues = () => {
    const result = [];
    const oldArray = addMoreItem;
    $('.lineitem tbody tr').each(() => {
      const allValues = {};
      $(this)
        .find('input')
        .each(() => {
          const fieldName = $(this).attr('name');
          allValues[fieldName] = $(this).val();
        });
      result.push(allValues);
    });
    purchaseDetails.project_id = projectId;
    if (purchaseDetails.supplier_id !== '' && purchaseDetails.purchase_order_date !== '' && purchaseDetails.po_code !=='') {
    api.post('/purchaseorder/insertPurchaseOrder', purchaseDetails).then((res) => {
      //message('Purchase Order Added!', 'success');
      
      // result.forEach((obj) => {
      //   if (obj.qty !== '' || !obj.qty) {
      //     poProduct(res.data.data.insertId, obj);
      //     }
      // });
     
      // getProduct();
      oldArray.forEach((obj) => {
        if (obj.id) {
          /* eslint-disable */
          // const objId = parseInt(obj.id)
          const foundObj = oldArray.find((el) => el.id === obj.id);
          if (foundObj) {
            obj.product_id = foundObj.product_id;
            obj.title = foundObj.title;
            obj.item_title = foundObj.item_title;
          }
          if(obj.unit){
            poProduct(res.data.data.insertId,foundObj);
             
            // setTimeout(()=>{
            //   setAddPurchaseOrderModal(false);
            //   window.location.reload()
            // },1300)
            }
        }
      });
    });
  } else {
    message('Please fill all required fields.', 'warning');
  }
    //setAddPurchaseOrderModal(false);
  };

  // const insertPurchaseOrder = () => {
  //   purchaseDetails.project_id = projectId;
  //   api.post('/purchaseorder/insertPurchaseOrder', purchaseDetails).then((res) => {
  //     poProduct(res.data.data.insertId);
  //     getProduct();
  //     message('Purchase Order Added!', 'success');
  //     setAddPurchaseOrderModal(false);
  //   });
  // };

  function updateState(index, property, e) {
    const copyDeliverOrderProducts = [...addMoreItem];
    const updatedObject = { ...copyDeliverOrderProducts[index], [property]: e.target.value };
    copyDeliverOrderProducts[index] = updatedObject;
    setMoreItem(copyDeliverOrderProducts);
  }

  const getTotalOfPurchase = () => {
    let total = 0;
    addMoreItem.forEach((a) => {
      total += parseInt(a.qty, 10) * parseFloat(a.cost_price, 10);
    });
    return total;
  };

  //Insert Product Data
  const insertProductData = (ProductCode,ItemCode) => {
    productDetails.product_code = ProductCode;
    productDetails.item_code = ItemCode;
    //productDetails.item_code = parseFloat(itemcode) + 1;
    if (productDetails.title !== '' && productDetails.item_code !== '') {
      api
        .post('/product/insertProduct', productDetails)
        .then(() => {
          // const insertedDataId = res.data.data.insertId;
          message('Product inserted successfully.', 'success');
          getProduct();
          setAddNewProductModal(false);
          // api.post('/inventory/insertinventory', {product_id:insertedDataId})
          // .then(() => { message('inventory created successfully.','success')})
          // .catch(() => {
          //   message('Unable to create inventory.', 'error')
          // })
          // setTimeout(()=> {
          //   navigate(`/ProductEdit/${insertedDataId}`)
          // },300);
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields.', 'warning');
    }
  };
  const generateCode = () => {
    api
      .post('/product/getCodeValue', { type: 'ProductCode' })
      .then((res) => {
        const ProductCode = res.data.data
      api
      .post('/product/getCodeValue', { type: 'ItemCode' })
      .then((response) => {
        const ItemCode = response.data.data
        insertProductData(ProductCode, ItemCode);
      })
      })
      .catch(() => {
        insertProductData('');
      });
  };


  useEffect(() => {
    getProduct();
    //getMaxItemcode();
    TabMaterialsPurchased();
    getSupplier();
  }, []);
  useEffect(() => {
    setMoreItem([
      {
        id: random.int(1, 99).toString(),
        itemId: '',
        unit: '',
        qty: '',
        price: '',
        mrp: '',
        gst: '',
        description: '',
      },
      {
        id: random.int(0, 9999).toString(),
        itemId: '',
        unit: '',
        qty: '',
        price: '',
        mrp: '',
        gst: '',
        description: '',
      },
      {
        id: random.int(0, 9999).toString(),
        itemId: '',
        unit: '',
        qty: '',
        price: '',
        mrp: '',
        gst: '',
        description: '',
      },
    ]);
  }, [addPurchaseOrderModal]);

  const onchangeItem = (str, itemId) => {
    const element = addMoreItem.find((el) => el.id === itemId);
    element.Item = str.label;
    element.itemId = str.value;
    setMoreItem(addMoreItem);
  };

  // Clear row value
  const ClearValue = (ind) => {
    setMoreItem((current) =>
      current.filter((obj) => {
        return obj.id !== ind.id;
      }),
    );
  };
  return (
    <>
      <Modal size="xl" isOpen={addPurchaseOrderModal}>
        <ModalHeader>Add Product</ModalHeader>

        <ModalBody>
          <FormGroup>
            <Row>
              <Col md="12" className="mb-4">
                <Row>
                  <Col md="2">
                    <Button
                      color="primary"
                      className="shadow-none"
                      onClick={() => {
                        setAddNewProductModal(true);
                      }}
                    >
                      Add New Product
                    </Button>
                  </Col>
                  <Col md="2">
                    <Button
                      color="primary"
                      className="shadow-none"
                      onClick={() => {
                        AddNewLineItem();
                      }}
                    >
                      Add Item
                    </Button>
                  </Col>
                  <Col md="2">
                    <FormGroup>
                      <Label>Supplier Name <span className="required"> *</span></Label>
                      <Input
                        type="select"
                        onChange={handleInputs}
                        value={purchaseDetails && purchaseDetails.supplier_id}
                        name="supplier_id"
                      >
                        <option defaultValue="selected">Please Select</option>
                        {supplier &&
                          supplier.map((e) => {
                            return (
                              <option key={e.supplier_id} value={e.supplier_id}>
                                {e.company_name}
                              </option>
                            );
                          })}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="2">
                    <FormGroup>
                      <Label>Po_Date <span className="required"> *</span></Label>
                      <Input
                        type="date"
                        name="purchase_order_date"
                        value={moment(
                          purchaseDetails && purchaseDetails.purchase_order_date,
                        ).format('YYYY-MM-DD')}
                        onChange={handleInputs}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="2">
                    <FormGroup>
                      <Label>Po_No <span className="required"> *</span></Label>
                      <Input
                        type="text"
                        name="po_code"
                        value={purchaseDetails && purchaseDetails.po_code}
                        onChange={handleInputs}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <Label>VAT</Label>
                      <br></br>
                      <Label>Yes</Label>
                      &nbsp;
                      <Input
                        name="gst"
                        value="1"
                        type="radio"
                        defaultChecked={purchaseDetails && purchaseDetails.gst === 1 && true}
                        onChange={handleInputs}
                      />
                      &nbsp; &nbsp;
                      <Label>No</Label>
                      &nbsp;
                      <Input
                        name="gst"
                        value="0"
                        type="radio"
                        defaultChecked={purchaseDetails && purchaseDetails.gst === 0 && true}
                        onChange={handleInputs}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <br />
                {/* <Row>
                  <FormGroup className="mt-3">
                    {' '}
                    Total Amount : {getTotalOfPurchase() || 0}{' '}
                  </FormGroup>
                </Row> */}
              </Col>
            </Row>

            <table className="lineitem">
              <thead>
                <tr>
                  <th scope="col">Product <span className="required"> *</span></th>
                  <th scope="col">UoM</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Unit Price</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Remarks</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {addMoreItem.map((el, index) => {
                  return (
                    <tr key={el.id}>
                      <td data-label="title">
                        <Select
                          key={el.id}
                          defaultValue={{ value: el.product_id, label: el.title }}
                          onChange={(e) => {
                            onchangeItem(e, el.id);
                          }}
                          options={getProductValue}
                        />
                        <Input
                          value={el.product_id}
                          type="hidden"
                          name="product_id"
                          onChange={(e) => updateState(index, 'product_id', e)}
                        ></Input>
                        <Input
                          value={el.title}
                          type="hidden"
                          name="title"
                          onChange={(e) => updateState(index, 'title', e)}
                        ></Input>
                      </td>
                      {/* <td data-label="ProductName"><Input type="text" name="item_title" value={el.item_title}  onChange={(e)=>updateState(index,"item_title",e)}/></td> */}
                      <td data-label="UoM">
                        <Input
                          type="text"
                          name="unit"
                          value={el.unit}
                          onChange={(e) => updateState(index, 'unit', e)}
                        />
                      </td>
                      <td data-label="Qty">
                        <Input
                          type="text"
                          name="qty"
                          value={el.qty}
                          onChange={(e) => updateState(index, 'qty', e)}
                        />
                      </td>
                      <td data-label="Unit Price">
                        <Input
                          type="text"
                          name="cost_price"
                          value={el.cost_price}
                          onChange={(e) => updateState(index, 'cost_price', e)}
                        />
                      </td>
                      <td data-label="Total Price">
                        {el.cost_price * el.qty || 0}</td>
                      <td data-label="Remarks">
                        <Input
                          type="textarea"
                          name="description"
                          value={el.description}
                          onChange={(e) => updateState(index, 'description', e)}
                        />
                      </td>
                      <td data-label="Action">
                        <div className="anchor">
                          <span
                            onClick={() => {
                              ClearValue(el);
                            }}
                          >
                            Clear
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {/* {[...Array(addMoreItem)].map((elem,index) => {
                        return (
                        <tr key={addMoreItem}>
                            <td data-label="ProductName"><Input type="text" name="item_title" value={elem.item_title} onChange={(e)=>updateNewItemState(index,"item_title",e)}/></td>
                            <td data-label="UoM"><Input type="text" name="uom" value={elem.unit} onChange={(e)=>updateNewItemState(index,"unit",e)} /></td>
                            <td data-label="Qty"><Input type="text" name="qty"  value={elem.qty}  onChange={(e)=>updateNewItemState(index,"qty",e)} /></td>
                            <td data-label="Unit Price"><Input type="text" name="cost_price" value={elem.cost_price} onChange={(e)=>updateNewItemState(index,"cost_price",e)} /></td>
                            <td data-label="Total Price">{elem.cost_price*elem.qty}</td>
                            <td data-label="Remarks"><Input type="textarea"  name="description"  value={elem.description}  onChange={(e)=>updateNewItemState(index,"description",e)}/></td>
                            <td data-label="Action"><Link to=""><span>Clear</span></Link></td>
                        </tr>
                        );
                    })} */}
              </tbody>
            </table>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="shadow-none"
            onClick={() => {
             
              // insertlineItem(res.data.data.insertId);
              getAllValues();
               getProduct();
               
             
    
            }}
          >
            Submit
          </Button>
          <Button
            color="secondary"
            className="shadow-none"
            onClick={() => {
              setAddPurchaseOrderModal(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* Add New Product Modal */}
      <Modal isOpen={addNewProductModal}>
        <ModalHeader>Add New Materials / Tools</ModalHeader>

        <ModalBody>
          <FormGroup>
            <Row>
              <Col md="12" className="mb-4">
                <Row>
                  <FormGroup>
                    <Row>
                      <Label sm="3">
                        Product Name <span className="required"> *</span>
                      </Label>
                      <Col sm="8">
                        <Input
                          type="text"
                          name="title"
                          onChange={handleNewProductDetails}
                          value={productDetails.title}
                        />
                      </Col>
                      <Label sm="3">
                        Product Type <span className="required"> *</span>
                      </Label>
                      <Col sm="8">
                        <Input
                          type="select"
                          name="product_type"
                          onChange={handleNewProductDetails}
                          value={productDetails.product_type}
                        >
                          <option value="">Please Select</option>
                          <option value="Material">Materials</option>
                          <option value="Tools">Tools</option>
                            
                        </Input>
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
              //insertProductData();
              generateCode();
              //getProduct();
              //setAddNewProductModal(false);
              
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

export default AddPurchaseOrderModal;

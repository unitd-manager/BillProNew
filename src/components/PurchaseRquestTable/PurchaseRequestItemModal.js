import React, { useContext, useState, useEffect } from 'react';
import {
  Row,
  Form,
  Table,
  ModalFooter,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Col,
  FormGroup,
  Button,
  Label
} from 'reactstrap';
// import {  useParams } from 'react-router-dom';
//import Select from 'react-select';
import random from 'random';
import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';
import Select from 'react-select';
// import * as Icon from 'react-feather';
// import Swal from 'sweetalert2';
//import { Link } from 'react-router-dom';
//import moment from 'moment';
import message from '../Message';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';
import api from '../../constants/api';



export default function PurchaseRequestItemModal({
  PurchaseRequestId,
  addPurchaseOrderModal,
  setAddPurchaseOrderModal,
  arabic,
  arb
}) {
  PurchaseRequestItemModal.propTypes = {
    PurchaseRequestId: PropTypes.any,
    addPurchaseOrderModal: PropTypes.bool,
    setAddPurchaseOrderModal: PropTypes.func,
    arabic: PropTypes.any,
    arb: PropTypes.any,
  };
  // const [setPlanData] = useState();
  // const [ setPlanEditModal] = useState(false);
  // const [planningDetails, setPlanningDetails] = useState(null);
  
  // const [newPlanningData, setNewPlanningData] = useState({
  //   product_id: '',
  //   purchase_request_qty: '',
  //   unit: '',
  //   title:'',

  // });

   //get staff details
   const { loggedInuser } = useContext(AppContext);

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
  const addContactToggle = () => {
    setAddPurchaseOrderModal(!addPurchaseOrderModal);
  };
  const [addNewProductModal, setAddNewProductModal] = useState(false);
// ...
const [addMoreItem, setMoreItem] = useState([
  {
    id: random.int(1, 99).toString(),
    unit: '',
    purchase_request_qty: '',
    product_id: '', // Initialize product_id here
    title: '', // Initialize title here
  },
]);

// get user information
const [unitdetails, setUnitDetails] = useState();
// fetch UoM dropdown from vauelist
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

let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }
 

// const deleteRecord = (deleteID) => {
//   Swal.fire({
//     title: `Are you sure? ${deleteID}`,
//     text: "You won't be able to revert this!",
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#d33',
//     confirmButtonText: 'Yes, delete it!',
//   }).then((result) => {
//     if (result.isConfirmed) {
//       api.post('/pricelistitem/deletePriceListItem', { purchase_request_items_id: deleteID }).then(() => {
//         Swal.fire('Deleted!', 'Your Line Items has been deleted.', 'success');
//         window.location.reload();
//       });
//     }
//   });
// };

// const getCpanelLinked = () => {
//   api
//     .post('/purchaserequest/PurchaseRequestLineItemById', { purchase_request_id: PurchaseRequestId })
//     .then((res) => {
//       setPlanningDetails(res.data.data);
//     })
//     .catch(() => {
     
//     });
// };

// const [getProductValue, setProductValue] = useState();

const AddNewPlanning = () => {
  // Iterate over addMoreItem to submit all line items

  addMoreItem.forEach((item,index) => {
    if (item.title !== '' &&
      item.unit !== ''
      )
      {
    item.purchase_request_id = PurchaseRequestId;
    item.created_by= loggedInuser.first_name; 
    item.creation_date = creationdatetime;
    console.log('item',item)
    api
      .post('/purchaserequest/insertPurchaseRequestLineItem', item)
      .then(() => {
        if (index === addMoreItem.length - 1) {
        message('Records inserted successfully.', 'success');
        setTimeout(()=>{
          window.location.reload();
        },300)
        }
      })
      .catch(() => {
        message('Network connection error.', 'error');
      });
    } else {
      message('Please fill all required field.', 'warning');
    }
  });
  
};


const AddNewLineItem = () => {
  setMoreItem((prevItems) => [
    ...prevItems,
    {
      id: new Date().getTime().toString(),
      unit: '',
      purchase_request_qty: '',
      product_id: '', // Initialize product_id here
      title: '', // Initialize title here
    },
  ]);
};

const onchangeItem = (selectedProduct, itemId) => {
  
  const updatedItems = addMoreItem.map((item) => {
    if (item.id === itemId) {
      return {
        ...item,
        product_id: selectedProduct.value.toString(),
        title: selectedProduct.label,
        purchase_request_qty: selectedProduct.purchase_request_qty || '',
        unit: selectedProduct.unit || '',
      };
    }
    return item;
  });
  setMoreItem(updatedItems);
};


const handleUnitChange = (itemId, newUnit) => {
  console.log('itemId',itemId)
  console.log('newUnit',newUnit)
  const updatedItems = addMoreItem.map((item) => {
    if (item.id === itemId) {
      return {
        ...item,
        unit: newUnit.value,
      };
    }
    return item;
  });
  setMoreItem(updatedItems);

  // setNewPlanningData((prevData) => ({
  //   ...prevData,
  //   unit: newUnit,
  // }));
};


  const handleQtyChange = (itemId, newQty) => {
    console.log('itemId',itemId)
  console.log('newQty',newQty)
    const updatedItems = addMoreItem.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          purchase_request_qty: newQty
        };
      }
      return item;
    });
  
  setMoreItem(updatedItems);

  // setNewPlanningData((prevData) => ({
  //   ...prevData,
  //   unit: newUnit,
  // }));
};

const loadOptions = (inputValue, callback) => {
  api.get(`/product/getProductsbySearchFilter`, { params: { keyword: inputValue } })
.then((res) => {
    const items = res.data.data;
    const options = items.map((item) => ({
      value: item.product_id,
      label: item.title,
      purchase_request_qty: item.purchase_request_qty,
      unit: item.unit,
    }));
    callback(options);
  });
};

// const getProduct = () => {
//   api.get('/product/getProducts').then((res) => {
//     const items = res.data.data;
//     const finaldat = [];
//     items.forEach((item) => {
//       finaldat.push({ value: item.product_id, label: item.title });
//     });
//     setProductValue(finaldat);
//   });
// };

const insertProduct = (ProductCode, ItemCode) => {
  if (productDetail.title !== '') {
    productDetail.product_code = ProductCode;
    productDetail.item_code = ItemCode;
    productDetail.creation_date = creationdatetime;
    productDetail.created_by= loggedInuser.first_name; 
    api
      .post('/purchaseorder/insertPurchaseProduct', productDetail)
      .then((res) => {
        const insertedDataId = res.data.data.insertId;
        message('Product inserted successfully.', 'success');
        api
          .post('/product/getCodeValue', { type: 'InventoryCode' })
          .then((res1) => {
            const InventoryCode = res1.data.data;
            message('inventory created successfully.', 'success');
            api
            .post('/inventory/insertinventory', { product_id: insertedDataId, inventory_code:InventoryCode  })
          
          .then(() => {
            message('inventory created successfully.', 'success');
            //  getProduct();
            setAddNewProductModal(false);
          })
          })
          .catch(() => {
            message('Unable to create inventory.', 'error');
          });
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
        const ProductCode = res.data.data
      api
      .post('/product/getCodeValue', { type: 'ItemCode' })
      .then((response) => {
        const ItemCode = response.data.data
        insertProduct(ProductCode, ItemCode);
      })
      })
      .catch(() => {
        insertProduct('');
      });
  };

  
  

  useEffect(() => {
    getUnit();
 }, []);
  //  Table Contact
  // // const columns = [
  // //   {
  // //     name: 'id',
  // //     selector: 'purchase_request_items_id ',
  // //     grow: 0,
  // //     wrap: true,
  // //     width: '4%',
  // //   },
   
  // //   // {
  // //   //   name: 'Del',
  // //   //   selector: 'delete',
  // //   //   cell: () => <Icon.Trash />,
  // //   //   grow: 0,
  // //   //   width: 'auto',
  // //   //   wrap: true,
  // //   // },
  // //   {
  // //     name: 'Name',
  // //     selector: 'title',
  // //     sortable: true,
  // //     grow: 2,
  // //     wrap: true,
  // //   },
  // //   {
  // //     name: 'Quantity',
  // //     selector: 'purchase_request_qty',
  // //     sortable: true,
  // //     grow: 0,
  // //   },
  // //   {
  // //     name: 'Unit',
  // //     selector: 'unit',
  // //     sortable: true,
  // //     width: 'auto',
  // //     grow: 3,
  // //   },
  // //   {
  // //     name: 'Action',
  // //     selector: 'edit',
  // //     cell: () => <Icon.Edit2 />,
  // //     grow: 0,
  // //     width: 'auto',
  // //     button: true,
  // //     sortable: false,
  // //   },
    
  // ];
  return (
    <Form>
       <Row>
        <Col md="3">
          <FormGroup>
            <Button color="primary" className="shadow-none" onClick={addContactToggle.bind(null)}>
            {arb ?'إضافة منتج جديد':'Add New Product'}{' '}
            </Button>
            <Modal size="lg" isOpen={addPurchaseOrderModal} toggle={addContactToggle.bind(null)}>
              <ModalHeader toggle={addContactToggle.bind(null)}>{arb ?'عناصر طلب الشراء':'Purchase request Items'} </ModalHeader>
              <ModalBody>
              <FormGroup>
                <Row>
                <Col md="12" className="mb-4">
                <Row>
                <Col md="3">
                    <Button
                      color="primary"
                      className="shadow-none"
                      onClick={() => {
                        setAddNewProductModal(true);
                      }}
                    >
                      {arb ?'إضافة منتج جديد':'Add New Product'}
                    </Button>
                  </Col>
                    <Col md="3">
                      <Button
                        className="shadow-none"
                        color="primary"
                        type="button"
                        onClick={() => {
                          AddNewLineItem();
                        }}
                      >
                        {arb ?'إضافة عنصر السطر':'Add Line Item'}
                      </Button>
                    </Col>
                    </Row>
                <br />
              </Col>
            </Row>
                    
                 
                  
                 
            <Table bordered className="lineitem">
                      <thead>
                        <tr>
                          <th scope="col">{arb ?'عنوان':'Title'} </th>
                          <th scope="col">{arb ?'وحدة':'Unit'} </th>
                          <th scope="col">{arb ?'كمية':'Quantity'}</th>
                        </tr>
                      </thead>
                      <tbody>
                      {addMoreItem.map((item) => (
     <tr key={item.id}>
    <td>
      <AsyncSelect
        key={item.id}
        defaultValue={{
          value: item.product_id,
          label: item.title,
          purchase_request_qty: item.purchase_request_qty,
          unit: item.unit,
        }}
        onChange={(e) => {
          onchangeItem(e, item.id);
        }}
        loadOptions={loadOptions}
       
       
      />
      <Input value={item.product_id} type="hidden" name="product_id"></Input>
      <Input value={item.title} type="hidden" name="title"></Input>
    </td>
    <td>
      {/* <Input
        type="select"
        onChange={(e) => {
          const newUnit = e.target.value;
          handleUnitChange(item.id, newUnit);
        }}
        value={item.unit}
        name="unit"
      >
        <option defaultValue="selected">Please Select</option>
        <option value="KGS">KGS</option>
        <option value="PCS">PCS</option>
        <option value="EA">EA</option>
        <option value="NOS">NOS</option>
        <option value="BOX">BOX</option>
      </Input> */}
       
                                  <Select
                                    name="unit"
                                    onChange={(selectedOption) => {
                                      handleUnitChange(item.id, selectedOption);
                                    }}
                                    options={unitdetails}
                                  />
                                
      {/* <Select
                                   
                                   onChange={(selectedOption) => {
                                     onchangeItem(selectedOption);
                                   }}
                                   defaultValue={{
                                    value: item.unit,
                                    label: item.title,
                                    purchase_request_qty: item.purchase_request_qty,
                                    unit: item.unit,
                                  }}// Ensure this is set correctly
                                   options={unitdetails}/> */}
                                    {/* <Input 
                                   name="unit"
                                   type='hidden'
                                   defaultValue={item.unit}
                                   ></Input> */}
                                   <Input
        type="hidden"
        onChange={(e) => {
          const newUnit = e.target.value;
          handleUnitChange(item.id, newUnit);
        }}
        value={item.unit}
        name="unit"
      ></Input>
                                   
    </td>
    <td>
      <Input
        type="text"
        name="purchase_request_qty"
        key={item.id}
        onChange={(e) => {
          const newQty = e.target.value;
          handleQtyChange(item.id, newQty);
        }}
        value={item.purchase_request_qty}
      />
                                     </td>
                                      </tr>
                                ))}

                      </tbody>
                    </Table>
                
               </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    AddNewPlanning();
                    //addPurchaseOrderModal(false);
                  }}
                >
                 {arb ?'يُقدِّم':'Submit'} 
                </Button>
                <Button
                  color="secondary"
                  className="shadow-none"
                  onClick={addContactToggle.bind(null)}
                >
                  {arb ?'يلغي':'Cancel'}
                </Button>
              </ModalFooter>
            </Modal>
          </FormGroup>
        </Col>
      </Row>
      {/* Add New Product Modal */}
      <Modal isOpen={addNewProductModal}>
        <ModalHeader > {' '} {arb ?'إضافة منتجات جديدة':'Add New Products'} {' '} </ModalHeader>

        <ModalBody>
          <FormGroup>
            <Row>
              <Col md="12" className="mb-4">
                <Row>
                  <FormGroup>
                    <Row>
                    <Label dir="rtl" style={{ textAlign: 'left' }}>
                {arabic.find((item) => item.key_text === 'mdPurchaseRequest.Product Name')?.[genLabel]}  
                <span className="required"> *</span></Label>{' '}
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
              // setAddNewProductModal(false);
              // getProduct();
              // setTimeout(() => {
              //   window;
              // }, 300);
            }}
          >
            {arb ?'يُقدِّم':'Submit'}
          </Button>
          <Button
            color="secondary"
            className="shadow-none"
            onClick={() => {
              setAddNewProductModal(false);
            }}
          >
            {arb ?'يلغي':'Cancel'}
          </Button>
        </ModalFooter>
      </Modal>
      {/* <Row>
        <Table id="example" className="display border border-secondary rounded">
          <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {planningDetails &&
              planningDetails.map((element, i) => {
                return (
                  <tr key={element.purchase_request_items_id}>
                    <td>{i + 1}</td>
                     
                    <td>
                      <div color="primary" className='anchor'>
                        <span onClick={() => deleteRecord(element.contact_id)}>
                          <Icon.Trash2 />
                        </span>
                      </div>
                    </td>  
                    <td>{element.title}</td>
                    <td>{element.purchase_request_qty}</td>
                    <td>{element.unit}</td>
                    <td>
                      <div className='anchor'>
                        <span
                          onClick={() => {
                            setPlanData(element);
                            setPlanEditModal(true);
                          }}
                        >
                          <Icon.Edit2 />
                        </span>
                        <span
                                className="addline"
                                onClick={() => {
                                  deleteRecord(element.purchase_request_items_id);
                                }}
                              >
                                <Icon.Trash2 />
                              </span>
                      </div>
                    </td>
                  
                   
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Row> */}
     
    </Form>
  );
}

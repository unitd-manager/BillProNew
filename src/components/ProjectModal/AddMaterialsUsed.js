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
} from 'reactstrap';
import { useParams } from 'react-router-dom';
import * as $ from 'jquery';
import random from 'random';
import PropTypes from 'prop-types';
import Select from 'react-select';
import api from '../../constants/api';
import message from '../Message';

const AddMaterialsUsed = ({ addMaterialsUsed, setAddMaterialsUsed }) => {
  const { id } = useParams();
  AddMaterialsUsed.propTypes = {
    addMaterialsUsed: PropTypes.bool,
    setAddMaterialsUsed: PropTypes.func,
  };
  // Logic for Add New Item Row

  const [addMoreItem, setMoreItem] = useState([
    {
      id: random.int(0, 9999).toString(),
      itemId: '',
      title: '',
      product_type: '',
      qty_in_stock: '',
      uom: '',
      qty: '',
      description: '',
    },
    {
      id: random.int(0, 9999).toString(),
      itemId: '',
      title: '',
      product_type: '',
      qty_in_stock: '',
      uom: '',
      qty: '',
      description: '',
    },
    {
      id: random.int(0, 9999).toString(),
      itemId: '',
      title: '',
      product_type: '',
      qty_in_stock: '',
      uom: '',
      qty: '',
      description: '',
    },
  ]);

  const [tabMaterialsPurchased, setTabMaterialsPurchased] = useState();

  const AddNewLineItem = () => {
    setMoreItem([
      ...addMoreItem,
      {
        id: random.int(0, 9999).toString(),
        itemId: '',
        title: '',
        product_type: '',
        qty_in_stock: '',
        uom: '',
        qty: '',
        description: '',
      },
    ]);
  };

  // Materials Purchased

  const TabMaterialsPurchased = () => {
    api
      .get('/product/getProducts')
      .then((res) => {
        const items = res.data.data;
        const finaldat = [];
        items.forEach((item) => {
          finaldat.push({
            value: item.product_id,
            label: item.title,
            type: item.product_type,
            stock: item.actual_stock,
          });
        });
        setTabMaterialsPurchased(finaldat);
      })
      .catch(() => {
        message('Tab Material Used not found', 'info');
      });
  };

  const addMultipleMaterial = () => {
    const oldArray = addMoreItem;

    const result = [];
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

    oldArray.forEach((obj) => {
      if (obj.id) {
        /* eslint-disable */
        const foundObj = oldArray.find((el) => el.id === obj.id);

        if (foundObj) {
          obj.title = foundObj.title;
          obj.product_type = foundObj.product_type;
          obj.product_id = foundObj.itemId;
          obj.stock = foundObj.stock;
        }
        if(obj.qty){
        submitData(foundObj);
        }
      }
    });
  };
  const submitData = (itemObj) => {
    if (itemObj.title !== '') {
      api
        .post('/projecttabmaterialusedportal/insertProjectMaterials', {
          project_id: id,
          title: itemObj.title,
          quantity: itemObj.qty,
          amount: parseInt(itemObj.qty) * parseInt(itemObj.uom),
          description: itemObj.description,
          product_id: itemObj.product_id,
          unit: itemObj.uom,
          creation_date: new Date(),
          modification_date: new Date(),
          created_by: 1,
          modified_by: 1,
          status: 'Used',
          material_used_date: new Date(),
          part_no: '',
          viresco_factory: 1,
          remark: itemObj.description,
        })
        .then(() => {
          const elem={};
          elem.product_id =itemObj.product_id;
          elem.qty_in_stock = parseFloat(itemObj.qty_in_stock)-parseFloat(itemObj.qty);
          api.post('/product/edit-ProductQty', elem)
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
          message('Product Added!', 'success');
          setTimeout(() => {
            // window.location.reload();
          }, 300);
        })
        .catch(() => {
          message('Unable to add Product!', 'error');
        });
    } else {
      message('please select item', 'warning');
    }
  };

  function updateState(index, property, e) {
    const copyDeliverOrderProducts = [...addMoreItem];
    const updatedObject = { ...copyDeliverOrderProducts[index], [property]: e.target.value };
    copyDeliverOrderProducts[index] = updatedObject;
    setMoreItem(copyDeliverOrderProducts);
  }

  useEffect(() => {
    TabMaterialsPurchased();
  }, []);

  const onchangeItem = (str, itemId) => {
    const element = addMoreItem.find((el) => el.id === itemId);
    element.title = str.label;
    element.itemId = str.value;
    element.product_type = str.type;
    element.qty_in_stock = str.stock;
    setMoreItem([...addMoreItem]);
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
      <Modal size="xl" isOpen={addMaterialsUsed}>
        <ModalHeader>Add Materials
        <Button
            color="secondary"
            onClick={() => {
              setAddMaterialsUsed();
            }}
          >
            {' '}
            X{' '}
          </Button>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <Row>
              <Col md="12" className="mb-4">
                <Row>
                  <Col md="3">
                    <Button
                      color="primary"
                      className="shadow-none"
                      type="button"
                      onClick={() => {
                        AddNewLineItem();
                      }}
                    >
                      Add Materials
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
            <table className="lineitem">
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Type</th>
                  <th scope="col">Stock</th>
                  <th scope="col">UoM</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Remarks</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {addMoreItem.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td data-label="Item">
                        <Select
                          key={item.id}
                          defaultValue={{ value: item.product_id, label: item.title }}
                          onChange={(e) => {
                            onchangeItem(e, item.id);
                          }}
                          options={tabMaterialsPurchased}
                        />
                      </td>
                      <td data-label="product_type">{item.product_type}</td>
                      <td data-label="stock">{item.qty_in_stock}</td>
                      <td data-label="uom">
                        <Input
                          type="text"
                          name="uom"
                          onChange={(e) => updateState(index, 'uom', e)}
                          defaultValue={item.uom}
                        />
                      </td>
                      <td data-label="qty">
                        <Input
                          type="number"
                          name="qty"
                          onChange={(e) => updateState(index, 'qty', e)}
                          defaultValue={item.qty}
                        />
                      </td>
                      <td data-label="Remarks">
                        <Input
                          type="text"
                          name="description"
                          onChange={(e) => updateState(index, 'description', e)}
                          defaultValue={item.description}
                        />
                      </td>
                      <td data-label="Action">
                        <div className="anchor">
                          <Input type="hidden" defaultValue={item.id} name="id"></Input>
                          <span
                            onClick={() => {
                              ClearValue(item);
                            }}
                          >
                            Clear
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            type="button"
            className="shadow-none"
            onClick={() => {
              addMultipleMaterial();
            }}
          >
            Submit
          </Button>
          <Button
            color="secondary"
            className="shadow-none"
            onClick={() => {
              setAddMaterialsUsed(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddMaterialsUsed;

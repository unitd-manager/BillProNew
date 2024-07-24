import React, { useState,useContext } from 'react';
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
import Select from 'react-select';
import * as $ from 'jquery';
import random from 'random';
import api from '../../constants/api';
import message from '../Message';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';


const MaterialLineItem = ({
  addMaterialItemModal,
  setAddMaterialItemModal,
  quoteLine,
  tenderDetails,
  getMaterialItem,
  arabic,
  genLabel,
  arb
}) => {
  MaterialLineItem.propTypes = {
    addMaterialItemModal: PropTypes.bool,
    setAddMaterialItemModal: PropTypes.func,
    quoteLine: PropTypes.any,
    tenderDetails: PropTypes.any,
    getMaterialItem: PropTypes.any,
    arabic: PropTypes.any,
    genLabel: PropTypes.any,
    arb: PropTypes.any,
  };
  const [totalAmount, setTotalAmount] = useState(0);
  const [addLineItem, setAddLineItem] = useState([
    {
      id: random.int(1, 99),
      unit: '',
      quantity: '',
      unit_price: '',
      amount: '',
      remarks: '',
      title: '',
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
    //obj.opportunity_id = projectInfo;
    obj.project_quote_id = quoteLine;
    api
      .post('/projectquote/insertMaterialItems', obj)
      .then(() => {
        message('Line Item Added Successfully', 'sucess');
        window.location.reload();
        getMaterialItem(tenderDetails.project_quote_id);
        
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
        .find('input')
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
  }, []);
  return (
    <>
      <Modal size="xl" isOpen={addMaterialItemModal}>
        <ModalHeader>
          {arb ?'إضافة عناصر المواد':'Add Material Items'}
          <Button
            className="shadow-none"
            color="secondary"
            onClick={() => {
              setAddMaterialItemModal(false);
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
                       {arb ?'إضافة عنصر السطر':'Add Line Item'}
                      </Button>
                    </Col>
                  </Row>
                  {/* Invoice Item */}
                  
                    <table className="lineitem">
                      <thead>
                        <tr>
                        <th scope="col">{arabic.find((item) => item.key_text === 'mdProjectQuote.Title')?.[genLabel]} </th>
                          <th scope="col">{arabic.find((item) => item.key_text === 'mdProjectQuote.Description')?.[genLabel]}</th>
                          <th scope="col">{arabic.find((item) => item.key_text === 'mdProjectQuote.Unit')?.[genLabel]} </th>
                          <th scope="col">{arabic.find((item) => item.key_text === 'mdProjectQuote.Qty')?.[genLabel]}</th>
                          <th scope="col">{arabic.find((item) => item.key_text === 'mdProjectQuote.Unit')?.[genLabel]}</th>
                          <th scope="col">{arabic.find((item) => item.key_text === 'mdProjectQuote.Amount')?.[genLabel]}</th>
                          <th scope="col">{arabic.find((item) => item.key_text === 'mdProjectQuote.Remark')?.[genLabel]}</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {addLineItem &&
                          addLineItem.map((item) => {
                            return (
                              <tr key={item.id}>
                                <td data-label="Title">
                                  <Input Value={item.title} type="text" name="title" />
                                </td>
                                <td data-label="Description">
                                  <Input Value={item.description} type="text" name="description" />
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
                        //setAddMaterialItemModal(false);
                      }}
                    >
                      {' '}
                      Submit{' '}
                    </Button>
                    <Button
                      className="shadow-none"
                      color="secondary"
                      onClick={() => {
                        setAddMaterialItemModal(false);
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
export default MaterialLineItem;

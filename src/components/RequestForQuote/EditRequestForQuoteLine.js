import React, { useState, useEffect } from 'react';
import Select from 'react-select';
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
  Label
} from 'reactstrap';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../constants/api';
import message from '../Message';

const EditRequestForQuoteLine = ({ editRequestForQuoteLine, setEditRequestForQuoteLine }) => {
  EditRequestForQuoteLine.propTypes = {
    editRequestForQuoteLine: PropTypes.bool,
    setEditRequestForQuoteLine: PropTypes.func,
  };
  const { id } = useParams();


  // Initialize state with data from props
  const [addLineItem, setAddLineItem] = useState([]);
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
  }
//onchange function
// const onchangeItems = (selectedValue) => {
//   const updatedItems = addLineItem.map((item) => {
//     if (item.unit === selectedValue.value) {  // Compare with selectedValue.value
//       return {
//         ...item,
//         unit: selectedValue.value,  // Update the unit with the selected option's value
//         value: selectedValue.value  // Update the value with the selected option's value
//       };
//     }
//     return item;
//   });

//   setAddLineItem(updatedItems);
// };

const onchangeItems = (selectedValue, index) => {
    const updatedItems = [...addLineItem];
    updatedItems[index] = {
      ...updatedItems[index],
      unit: selectedValue.value,
      value: selectedValue.value
    };
    setAddLineItem(updatedItems);
  };


  // Function to update state
  // Update state function
  const updateState = (index, property, e) => {
    const updatedItems = [...addLineItem];
    const updatedObject = { ...updatedItems[index], [property]: e.target.value };
    
    const quantity = parseFloat(updatedObject.quantity) || 0;
    const unitPrice = parseFloat(updatedObject.amount) || 0;
    updatedObject.total_cost = quantity * unitPrice;

    updatedItems[index] = updatedObject;
    setAddLineItem(updatedItems);
  };
  
  const getOrdersByOrderId = () => {
    api.post('/quote/RequestLineItemById', { purchase_quote_id : id }).then((res) => {
      setAddLineItem(res.data.data);
    });
  };
  
  // Function to edit line items
  const editLineItemApi = () => {
    addLineItem.forEach((item) => {
    
      api
        .post('quote/editTabQuoteLineItems',item )
        .then((res) => {
          console.log('API Response:', res.data.data); // Log the API response
          // setAddLineItem();
         window.location.reload();
        //  setEditRequestForQuoteLine(false)
        })
        .catch((error) => {
          console.error('Error updating item:', error);
          message('Cannot Edit Line Items', 'error');
        });
    });
  };

 

  useEffect(() => {
    getUnit();
    getOrdersByOrderId();
  }, []);

  return (
    <>
      <Modal size="xl" isOpen={editRequestForQuoteLine}>
        <ModalHeader>Edit Purchase Request Line Items</ModalHeader>

        <ModalBody>
          <FormGroup>
            <Row>
              <Col md="12" className="mb-4">
                <Row>
                  <Col md="3">
                    <Label>Supplier</Label>
                    <Input
                      disabled
                      type="text"
                      name="supplier"
                      value={addLineItem[0]?.company_name || ''}
                    />
                  </Col>
                  <Col md="3">
                    <Label>PR No.</Label>
                    <Input
                      disabled
                      type="text"
                      name="purchase_request_code"
                      value={addLineItem[0]?.purchase_request_code || ''}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <table className="lineitem">
              <thead>
                <tr>
                  <th scope="col">Product Name</th>
                  <th scope="col">Unit</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Total Price</th>
                  <th scope="col">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {addLineItem &&
                  addLineItem.map((el, index) => {
                    return (
                      <tr key={el.id}>
                        <td data-label="ProductName">
                          <Input
                           type="text"
                            name="title"
                            defaultValue={el.title}
                            // onChange={(e) => updateState(index, 'title', e)}
                            disabled
                          />
                        </td>
                        <td data-label="unit">
                          
                      <Select
                        name="unit"
                        defaultValue={{ value: el.unit, label: el.unit }}
                        onChange={(selectedOption) => onchangeItems(selectedOption, index)}
                        options={unitdetails}
                      />
                    </td>
                        <td data-label="quantity">
                          <Input
                            type="text"
                            name="quantity"
                            defaultValue={el.quantity}
                            onChange={(e) => updateState(index, 'quantity', e)}

                          />
                        </td>
                        <td data-label="Amount">
                          <Input
                            type="text"
                            name="amount"
                            defaultValue={el.amount}
                            onChange={(e) => updateState(index, 'amount', e)}
                            
                          />
                        </td>
                        <td data-label="Total Price">
                          <Input
                            defaultValue={el.total_cost}
                            type="text"
                            name="total_cost"
                            onChange={(e) => updateState(index, 'total_cost', e)}
                            disabled
                          />
                        </td>
                        <td data-label="Remarks">
                          <Input
                            type="textarea"
                            name="description"
                            defaultValue={el.description}
                            onChange={(e) => updateState(index, 'description', e)}
                          />
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
            className="shadow-none"
            onClick={() => {
              editLineItemApi();
            }}
          >
            Submit
          </Button>
          <Button
            color="secondary"
            className="shadow-none"
            onClick={() => {
              setEditRequestForQuoteLine(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default EditRequestForQuoteLine;

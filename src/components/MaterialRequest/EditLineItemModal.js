import React, { useState } from 'react';
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Input,
  Button,
  ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import api from '../../constants/api';
import message from '../Message';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';


const EditLineItemModal = ({ editLineModal, setEditLineModal, FetchLineItemData,arabic,genLabel}) => {
  EditLineItemModal.propTypes = {
    editLineModal: PropTypes.bool,
    setEditLineModal: PropTypes.func,
    FetchLineItemData: PropTypes.object,
    arabic: PropTypes.any,
    genLabel: PropTypes.any,
  };
const {id}=useParams();
  const [lineItemData, setLineItemData] = useState(null);
  const [totalAmount, setTotalAmount] = useState();
  const { loggedInuser } = React.useContext(AppContext);

  const handleData = (e) => {
    setLineItemData({ ...lineItemData, [e.target.name]: e.target.value });
  };
  const handleCalc = (Qty, UnitPrice, TotalPrice) => {
    if (!Qty) Qty = 0;
    if (!UnitPrice) UnitPrice = 0;
    if (!TotalPrice) TotalPrice = 0;

    setTotalAmount(parseFloat(Qty) * parseFloat(UnitPrice));
  };

  const UpdateData = () => {
    lineItemData.material_request_id=id;
    //lineItemData.amount=totalAmount;
    lineItemData.modification_date = creationdatetime;
    lineItemData.modified_by = loggedInuser.first_name;
    lineItemData.amount = parseFloat(lineItemData.quantity) * parseFloat(lineItemData.unit_price) 
    api
      .post('/materialrequest/editMaterialRequestItem', lineItemData)
      .then((res) => {
        console.log('edit Line Item', res.data.data);
        message('Edit Line Item Updated Successfully.', 'success');
     
          window.location.reload();
       
        })
      .catch(() => {
        message('Unable to edit quote. please fill all fields', 'error');
      });
  };
  const [unitdetails, setUnitDetails] = useState();
 //Api call for getting Unit From Valuelist
 const getUnit = () => {
  api
    .get('/product/getUnitFromValueList')
    .then((res) => {
      setUnitDetails(res.data.data);
    })
    .catch(() => {
      message('Staff Data Not Found', 'info');
    });
};
  React.useEffect(() => {
    getUnit();
  }, []);

  React.useEffect(() => {
    setLineItemData(FetchLineItemData);
  }, [FetchLineItemData]);

  return (
    <>
      <Modal isOpen={editLineModal}>
        <ModalHeader>Line Items</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Row>
              <Label dir="rtl" style={{ textAlign: 'left' }}>
                {arabic.find((item) => item.key_text === 'mdMaterialRequest.Title')?.[genLabel]}
              </Label>
              <Col sm="10">
                <Input
                  type="text"
                  name="product_name"
                  defaultValue={lineItemData && lineItemData.product_name}
                  onChange={handleData}
                  disabled
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
            
              <Label dir="rtl" style={{ textAlign: 'left' }}>
                {arabic.find((item) => item.key_text === 'mdMaterialRequest.Brand')?.[genLabel]}
              </Label>
              <Col sm="10">
                <Input
                  type="text"
                  name="brand"
                  defaultValue={lineItemData && lineItemData.brand}
                  onChange={handleData}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>

              <Label dir="rtl" style={{ textAlign: 'left' }}>
                {arabic.find((item) => item.key_text === 'mdMaterialRequest.Qty')?.[genLabel]}
              </Label>
              <Col sm="10">
                <Input
                  type="text"
                  name="quantity"
                  defaultValue={lineItemData && lineItemData.quantity}
                  onChange={(e)=>{handleData(e);
                    handleCalc(e.target.value, lineItemData.unit_price,lineItemData.amount
                      )}}
                 
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
      
              <Label dir="rtl" style={{ textAlign: 'left' }}>
                {arabic.find((item) => item.key_text === 'mdMaterialRequest.Unit')?.[genLabel]}
              </Label>
              <Col sm="10">
                <Input
                  type="select"
                  name="unit"
                  defaultValue={lineItemData && lineItemData.unit}
                  onChange={handleData}
                >
                <option defaultValue="selected">Please Select</option>
                  {unitdetails &&
                    unitdetails.map((ele) => {
                      return (
                        <option key={ele.value} value={ele.value}>
                          {ele.value}
                        </option>
                      );
                    })}
                </Input>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              
              <Label dir="rtl" style={{ textAlign: 'left' }}>
                {arabic.find((item) => item.key_text === 'mdMaterialRequest.Unit Price')?.[genLabel]}
              </Label>
              <Col sm="10">
                <Input
                  type="text"
                  name="unit_price"
                  defaultValue={lineItemData && lineItemData.unit_price}
                  onChange={(e)=>{handleData(e);
                    handleCalc(lineItemData.quantity,e.target.value,lineItemData.amount)
                  }}
                />
                 
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
            
              <Label dir="rtl" style={{ textAlign: 'left' }}>
                {arabic.find((item) => item.key_text === 'mdMaterialRequest.Amount')?.[genLabel]}
              </Label>
              <Col sm="10">
                <Input
                  type="text"
                  name="amount"
                  value={totalAmount || lineItemData && lineItemData.amount}
                  onChange={(e)=>{handleData(e);
                    handleCalc(lineItemData.quantity,lineItemData.unit_price,e.target.value)
                  }}
                  disabled
                />
              </Col>
            </Row>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="shadow-none"
            type="button"
            onClick={() => {
              UpdateData();
              setEditLineModal(false);
            }}
          >
            Save & Continue
          </Button>
          <Button
            color="secondary"
            className="shadow-none"
            onClick={() => {
              setEditLineModal(false);
            }}
          >
            {' '}
            Cancel{' '}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default EditLineItemModal;

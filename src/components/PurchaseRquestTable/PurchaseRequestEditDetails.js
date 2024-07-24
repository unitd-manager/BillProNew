import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import moment from 'moment';
import ComponentCard from '../ComponentCard';



function PurchaseRequestEditDetails ({ purchaserequesteditdetails, handleInputs, customername,arabic,arb}) {
    PurchaseRequestEditDetails.propTypes = {
        purchaserequesteditdetails: PropTypes.bool,
        handleInputs: PropTypes.func,
        customername: PropTypes.bool,
        arabic: PropTypes.any,
        arb: PropTypes.any,
  };

  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }

  return (
    <div>   
      <Form>
        <FormGroup>
        <ComponentCard title={arb ?'تفاصيل طلب الشراء':'Purchase Request Details'} creationModificationDate={purchaserequesteditdetails}>
            <ToastContainer></ToastContainer>
            <Row>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdPurchaseRequest.Purchase Request code')?.[genLabel]}  
                </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            purchaserequesteditdetails && purchaserequesteditdetails.purchase_request_code_arb ? purchaserequesteditdetails.purchase_request_code_arb :
                            (purchaserequesteditdetails && purchaserequesteditdetails.purchase_request_code_arb !== null ? '' : purchaserequesteditdetails && purchaserequesteditdetails.purchase_request_code)
                          )
                        : (purchaserequesteditdetails && purchaserequesteditdetails.purchase_request_code)
                    }
                    name={arb ? 'purchase_request_code_arb' : 'purchase_request_code'}
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdPurchaseRequest.Purchase Request Date')?.[genLabel]}   
                </Label><span className="required"> *</span>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            purchaserequesteditdetails && purchaserequesteditdetails.purchase_request_date_arb ? purchaserequesteditdetails.purchase_request_date_arb :
                            (purchaserequesteditdetails && purchaserequesteditdetails.purchase_request_date_arb !== null ? '' : purchaserequesteditdetails && purchaserequesteditdetails.purchase_request_date)
                          )
                        : (purchaserequesteditdetails && purchaserequesteditdetails.purchase_request_date)
                    }
                    name={arb ? 'purchase_request_date_arb' : 'purchase_request_date'}
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdPurchaseRequest.Purchase Delivery Date')?.[genLabel]} 
                </Label><span className="required"> *</span> 
                  <Input
                    type="date"
                    onChange={handleInputs}
                    min={purchaserequesteditdetails && moment(purchaserequesteditdetails.purchase_request_date).format('YYYY-MM-DD')}
                    value={
                      arb
                        ? (
                            purchaserequesteditdetails && purchaserequesteditdetails.purchase_delivery_date_arb ? purchaserequesteditdetails.purchase_delivery_date_arb :
                            (purchaserequesteditdetails && purchaserequesteditdetails.purchase_delivery_date_arb !== null ? '' : purchaserequesteditdetails && purchaserequesteditdetails.purchase_delivery_date)
                          )
                        : (purchaserequesteditdetails && purchaserequesteditdetails.purchase_delivery_date)
                    }
                    //value={purchaserequesteditdetails && moment(purchaserequesteditdetails.purchase_delivery_date).format('YYYY-MM-DD')}
                    name="purchase_delivery_date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdPurchaseRequest.Department')?.[genLabel]} 
                </Label><span className="required"> *</span>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            purchaserequesteditdetails && purchaserequesteditdetails.department_arb ? purchaserequesteditdetails.department_arb :
                            (purchaserequesteditdetails && purchaserequesteditdetails.department_arb !== null ? '' : purchaserequesteditdetails && purchaserequesteditdetails.department)
                          )
                        : (purchaserequesteditdetails && purchaserequesteditdetails.department)
                    }
                    name={arb ? 'department_arb' : 'department'}
                  />
                </FormGroup>
              </Col>
              </Row>
              <Row>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdPurchaseRequest.Customer Name')?.[genLabel]}</Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={purchaserequesteditdetails && purchaserequesteditdetails.company_id}
                    name="company_id"
                  >
                    <option defaultValue="selected">{arb ?'الرجاء التحديد':'Please Select'}</option>
                    {customername &&
                      customername.map((e) => {
                        return (
                          <option key={e.company_id} value={e.company_id}>
                            {arb?e.company_name_arb:e.company_name}
                          </option>
                        );               
                      })}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdPurchaseRequest.Status')?.[genLabel]} </Label>
                  <Input
                    value={
                      arb
                        ? (
                            purchaserequesteditdetails && purchaserequesteditdetails.status_arb ? purchaserequesteditdetails.status_arb :
                            (purchaserequesteditdetails && purchaserequesteditdetails.status_arb !== null ? '' : purchaserequesteditdetails && purchaserequesteditdetails.status)
                          )
                        : (purchaserequesteditdetails && purchaserequesteditdetails.status)
                    }
                    //value={purchaserequesteditdetails && purchaserequesteditdetails.status}
                    type="select"
                    onChange={handleInputs}
                    name={arb ? 'status_arb' : 'status'}
                  >
                    <option value="">{arb ?'الرجاء التحديد':'Please Select'}</option>
                    <option value="Pending">{arb ?'قيد الانتظار':'Pending'}</option>
                    <option value="Approved">{arb ?'موافقة':'Approved'}</option>
                    <option value="Rejected">{arb ?'مرفوض':'Rejected'}</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdPurchaseRequest.Priority')?.[genLabel]} 
                </Label>
                  <Input
                  value={
                    arb
                      ? (
                          purchaserequesteditdetails && purchaserequesteditdetails.priority_arb ? purchaserequesteditdetails.priority_arb :
                          (purchaserequesteditdetails && purchaserequesteditdetails.priority_arb !== null ? '' : purchaserequesteditdetails && purchaserequesteditdetails.priority)
                        )
                      : (purchaserequesteditdetails && purchaserequesteditdetails.priority)
                  }
                    type="select"
                    onChange={handleInputs}
                    name={arb ? 'priority_arb' : 'priority'}
                  >
                    <option value="">{arb ?'الرجاء التحديد':'Please Select'}</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Input>
                </FormGroup>
              </Col>
              </Row>
              </ComponentCard>
              </FormGroup>
              </Form>
    </div>
  );
}

export default PurchaseRequestEditDetails;

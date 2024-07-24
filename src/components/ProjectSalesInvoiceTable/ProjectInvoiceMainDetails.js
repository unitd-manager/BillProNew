import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
//import moment from 'moment';
// import api from '../../constants/api';
// import message from '../Message';

export default function BookingDetailComp({ bookingDetails, handleInputs,arb,arabic }) {
  BookingDetailComp.propTypes = {
    bookingDetails: PropTypes.object,
    handleInputs: PropTypes.func,
    // goodsdeliverydropdown: PropTypes.any,
    // orderdropdown: PropTypes.any,
    arb: PropTypes.any,
    arabic: PropTypes.any,
    

  };
  // const [orderdropdown, setOrderDropdown] = useState();
  // const [goodsdeliverydropdown, setGoodsDeliveryDropdown] = useState();
  // const getSalesOrderDropdown = () => {
  //   api
  //     .get('/invoice/getSalesOrderDropdown')
  //     .then((res) => {
  //       setOrderDropdown(res.data.data);
  //     })
  //     // .catch(() => {
  //     //   message('Sales Order Data not found', 'info');
  //     // });
  // }

  // //Api call for getting customer dropdown
  // const getGoodsDeliveryDropdown = () => {
  //   api
  //     .get('/invoice/getGoodsDeliveryDropdown')
  //     .then((res) => {
  //       setGoodsDeliveryDropdown(res.data.data);
  //     })
  //     // .catch(() => {
  //     //   message('Goods Delivery Data not found', 'info');
  //     // });
  // }

  // useEffect(() => {
  //   getSalesOrderDropdown();
  //   getGoodsDeliveryDropdown();
  //    },[] );
  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }

  return (
    <>
      <Form>
        <FormGroup>
          <Row>
            <Col md="3">
              <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                  {
                    arabic.find((item) => item.key_text === 'mdProjectSalesInvoice.InvoiceCode')?.[
                    genLabel]}
                 </Label>

                <Input
                  type="text"
                  onChange={handleInputs}
                  readOnly

                  value={
                  arb
                        ? bookingDetails && bookingDetails.project_invoice_code_arb
                          ? bookingDetails.project_invoice_code_arb
                          : bookingDetails && bookingDetails.project_invoice_code_arb !== null
                            ? ''
                            : bookingDetails && bookingDetails.project_invoice_code
                        : bookingDetails && bookingDetails.project_invoice_code
                    }
                    name={arb ? 'project_invoice_code_arb' : 'project_invoice_code'} 
                    />
                    </FormGroup>
                        
                     </Col>
            <Col md="3">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                  {
                    arabic.find((item) => item.key_text === 'mdProjectSalesInvoice.InvoiceSource')?.[
                    genLabel]}
                 </Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  readOnly
                  value={
                  arb
                  ? bookingDetails && bookingDetails.source_type_arb
                    ? bookingDetails.source_type_arb
                    : bookingDetails && bookingDetails.source_type_arb !== null
                      ? ''
                      : bookingDetails && bookingDetails.source_type
                  : bookingDetails && bookingDetails.source_type
              }
              name={arb ? 'source_type_arb' : 'source_type'} 
              />
                
              </FormGroup>
            </Col>
            {
              bookingDetails && (
                bookingDetails.source_type === 'Sales_Order') &&
              (
                <>

                  <Col md="3">
                    <FormGroup>
                    <Label dir="rtl" style={{ textAlign: 'right' }}>
                  {
                    arabic.find((item) => item.key_text === 'mdProjectSalesInvoice.SalesOrder')?.[
                    genLabel]}
                 </Label> 
                      <Input
                        type="text"
                        readOnly
                        value={
                        
                        arb
                        ? bookingDetails && bookingDetails.order_code_arb
                          ? bookingDetails.order_code_arb
                          : bookingDetails && bookingDetails.order_code_arb !== null
                            ? ''
                            : bookingDetails && bookingDetails.order_code
                        : bookingDetails && bookingDetails.order_code
                    }
                    name={arb ? 'order_code_arb' : 'order_code'} 
                    />
                        {/* <option>Select Order</option>
              {orderdropdown &&
                orderdropdown.map((e) => {
                  return (
                    <option key={e.order_id} value={e.order_id}>
                      {e.project_order_code}
                    </option>
                  );
                })} */}
                      
                    </FormGroup>
                  </Col>
                </>
              )}

            {bookingDetails && bookingDetails.source_type === 'Goods_Delivery' && (
              <>
                <Col md="3">
                  <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                  {
                    arabic.find((item) => item.key_text === 'mdProjectSalesInvoice.GoodsDelivery')?.[
                    genLabel]}
                 </Label>
                    <Input
                      type="text"
                      readOnly
                      value={
                      
                      arb
                        ? bookingDetails && bookingDetails.project_goods_delivery_code_arb
                          ? bookingDetails.project_goods_delivery_code_arb
                          : bookingDetails && bookingDetails.project_goods_delivery_code_arb !== null
                            ? ''
                            : bookingDetails && bookingDetails.project_goods_delivery_code
                        : bookingDetails && bookingDetails.project_goods_delivery_code
                    }
                    name={arb ? 'project_goods_delivery_code_arb' : 'project_goods_delivery_code'} 
                    /></FormGroup>

                    
                      {/* <option>Select Goods Delivery</option>
          {goodsdeliverydropdown &&
            goodsdeliverydropdown.map((e) => {
              return (
                <option key={e.goods_delivery_id} value={e.goods_delivery_id}>
                  {e.project_goods_delivery_code}
                </option>
              );
            })} */}
                    
                  
                </Col>
              </>
            )}

            <Col md="3">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                  {
                    arabic.find((item) => item.key_text === 'mdProjectSalesInvoice.CompanyName')?.[
                    genLabel]}
                 </Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  readOnly
                  value={
                  arb
                  ? bookingDetails && bookingDetails.company_name_arb
                    ? bookingDetails.company_name_arb
                    : bookingDetails && bookingDetails.company_name_arb !== null
                      ? ''
                      : bookingDetails && bookingDetails.company_name
                  : bookingDetails && bookingDetails.company_name
              }
              name={arb ? 'company_name_arb' : 'company_name'} 
              /></FormGroup>

            </Col>
            <Col md="3">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                  {
                    arabic.find((item) => item.key_text === 'mdProjectSalesInvoice.InvoiceDate')?.[
                    genLabel]}
                 </Label>

                <Input
                  type="date"
                  onChange={handleInputs}

                  // value={bookingDetails && bookingDetails.project_invoice_date}
                  value={
                   
                  arb
                  ? bookingDetails && bookingDetails.project_invoice_date_arb
                    ? bookingDetails.project_invoice_date_arb
                    : bookingDetails && bookingDetails.project_invoice_date_arb !== null
                      ? ''
                      : bookingDetails && bookingDetails.project_invoice_date
                  : bookingDetails && bookingDetails.project_invoice_date
              }
              name={arb ? 'project_invoice_date_arb' : 'project_invoice_date'} 
              /></FormGroup>
            </Col>

            <Col md="3">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                  {
                    arabic.find((item) => item.key_text === 'mdProjectSalesInvoice.Status')?.[
                    genLabel]}
                 </Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  readOnly

                  value={
                  arb
                  ? bookingDetails && bookingDetails.status_arb
                    ? bookingDetails.status_arb
                    : bookingDetails && bookingDetails.status_arb !== null
                      ? ''
                      : bookingDetails && bookingDetails.status
                  : bookingDetails && bookingDetails.status
              }
              name={arb ? 'status_arb' : 'status'} 
              /></FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
               
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                  {
                    arabic.find((item) => item.key_text === 'mdProjectSalesInvoice.InvoiceDueDate')?.[
                    genLabel]}
                 </Label>

                <Input
                  type="date"
                  onChange={handleInputs}
                  value={
                   arb
                  ? bookingDetails && bookingDetails.project_invoice_due_date_arb
                    ? bookingDetails.project_invoice_due_date_arb
                    : bookingDetails && bookingDetails.project_invoice_due_date_arb !== null
                      ? ''
                      : bookingDetails && bookingDetails.project_invoice_due_date
                  : bookingDetails && bookingDetails.project_invoice_due_date
              }
              name={arb ? 'project_invoice_due_date_arb' : 'project_invoice_due_date'} 
              /></FormGroup>
                  
            </Col>


            <Col md="3">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                  {
                    arabic.find((item) => item.key_text === 'mdProjectSalesInvoice.InvoiceAmount')?.[
                    genLabel]}
                 </Label>
 

                <Input
                  type="text"
                  onChange={handleInputs}
                  readOnly
               
                  value={
                  arb
                  ? bookingDetails && bookingDetails.InvoiceAmount
                    ? bookingDetails.InvoiceAmount
                    : bookingDetails && bookingDetails.InvoiceAmount !== null
                      ? ''
                      : bookingDetails && bookingDetails.InvoiceAmount
                  : bookingDetails && bookingDetails.InvoiceAmount
              }
              name={arb ? 'InvoiceAmount' : 'InvoiceAmount'} 
              /></FormGroup>
                  
                             </Col>

            <Col md="6">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                  {
                    arabic.find((item) => item.key_text === 'mdProjectSalesInvoice.InvoiceTerms')?.[
                    genLabel]}
                 </Label>
  
                <Input
                  type="textarea"
                  onChange={handleInputs}

                  value={
                  arb
                  ? bookingDetails && bookingDetails.project_invoice_terms_arb
                    ? bookingDetails.project_invoice_terms_arb
                    : bookingDetails && bookingDetails.project_invoice_terms_arb !== null
                      ? ''
                      : bookingDetails && bookingDetails.project_invoice_terms
                  : bookingDetails && bookingDetails.project_invoice_terms
              }
              name={arb ? 'project_invoice_terms_arb' : 'project_invoice_terms'} 
              /></FormGroup>
                  
                </Col>

          </Row>
          <Row></Row>
        </FormGroup>
      </Form>
    </>
  );
}

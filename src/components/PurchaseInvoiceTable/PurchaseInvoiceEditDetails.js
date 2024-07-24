import { Row, Col, Form, FormGroup,Input,Label} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import moment from 'moment';
import PropTypes from 'prop-types';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../ComponentCard';
//import PurchaseInvoiceEditButton from './PurchaseInvoiceEditButton';
import ApiButton from '../ApiButton';

//purchaseinvoiceeditdetails From PO Product Edit
const PurchaseInvoiceEditDetails = ({ purchaseinvoiceeditdetails, handleInputs, editPurchaseInvoiceData,arabic,arb}) => {
    PurchaseInvoiceEditDetails.propTypes = {
        purchaseinvoiceeditdetails: PropTypes.bool,
        handleInputs: PropTypes.func,
        editPurchaseInvoiceData: PropTypes.any,  
        //id: PropTypes.bool,
        arabic: PropTypes.any,
        arb: PropTypes.any,
       };
  
  // Navigation and Parameter Constants
  const navigate = useNavigate();
  const backToList = () => {
    navigate('/PurchaseInvoice');
  };
  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }
  return (
    <> 
     <BreadCrumbs/>
      <Form>
        <FormGroup>
          {/* <PurchaseInvoiceEditButton id={id}  editPurchaseInvoiceData={editPurchaseInvoiceData} navigate={navigate} /> */}
          <ApiButton
              editData={editPurchaseInvoiceData}
              navigate={navigate}
              applyChanges={editPurchaseInvoiceData}
              //deleteData={deleteBookingData}
              backToList={backToList}
              module="PurchaseInvoice"
            ></ApiButton>
          {/* Content Details Form */}
          <ComponentCard title="Purchase Invoice Details" creationModificationDate={purchaseinvoiceeditdetails}>
            <ToastContainer></ToastContainer>
             <Row>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdPurchaseInvoice.Purchase Invoice Code')?.[genLabel]}
              </Label>
              
                  <Input
                type="text"
                onChange={handleInputs}
                value={
                  arb
                    ? purchaseinvoiceeditdetails && purchaseinvoiceeditdetails.purchase_invoice_code_arb
                    : purchaseinvoiceeditdetails && purchaseinvoiceeditdetails.purchase_invoice_code
                }
                name={arb ? 'purchase_invoice_code_arb' : 'purchase_invoice_code'}
                disabled
              />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdPurchaseInvoice.Project Name')?.[genLabel]}
              </Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={
                  arb
                    ? purchaseinvoiceeditdetails && purchaseinvoiceeditdetails.title_arb
                    : purchaseinvoiceeditdetails && purchaseinvoiceeditdetails.title
                }
                name={arb ? 'title_arb' : 'title'}
                disabled
              />
                  
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdPurchaseInvoice.Supplier Name')?.[genLabel]}
              </Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={
                  arb
                    ? purchaseinvoiceeditdetails && purchaseinvoiceeditdetails.company_name_arb
                    : purchaseinvoiceeditdetails && purchaseinvoiceeditdetails.company_name
                }
                name={arb ? 'company_name_arb' : 'company_name'}
                disabled
              />
                 
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdPurchaseInvoice.Invoice Date')?.[genLabel]}<span className="required"> *</span>
              </Label>
              
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={
                      purchaseinvoiceeditdetails && moment(purchaseinvoiceeditdetails.purchase_invoice_date).format('YYYY-MM-DD')
                    }
                    name="purchase_invoice_date"
                  />
                </FormGroup>
              </Col> 
              </Row>
              <Row>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdPurchaseInvoice.Due Date')?.[genLabel]}
              </Label>
                  
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={
                      purchaseinvoiceeditdetails && moment(purchaseinvoiceeditdetails.due_date).format('YYYY-MM-DD')
                    }
                    name="due_date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
        
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdPurchaseInvoice.Total Amount')?.[genLabel]}
              </Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={
                  arb
                    ? purchaseinvoiceeditdetails && purchaseinvoiceeditdetails.invoice_amount_arb
                    : purchaseinvoiceeditdetails && purchaseinvoiceeditdetails.invoice_amount
                }
                name={arb ? 'invoice_amount_arb' : 'invoice_amount'}
                disabled
              />
                
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdPurchaseInvoice.Mode of Payment')?.[genLabel]}
              </Label>
                  
                  <Input
                    value={purchaseinvoiceeditdetails && purchaseinvoiceeditdetails.mode_of_payment}
                    type="select"
                    onChange={handleInputs}
                    name="mode_of_payment"
                  >
                    <option value="">Please Select</option>
                    <option value="Pending">Cheque</option>
                    <option value="Approved">Cash</option>
                    <option value="Rejected">Online Transaction</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdPurchaseInvoice.Status')?.[genLabel]}
              </Label>
                 
                  <Input
                    value={purchaseinvoiceeditdetails && purchaseinvoiceeditdetails.status}
                    type="select"
                    onChange={handleInputs}
                    name="status"
                  >
                    <option value="">Please Select</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </Input>
                </FormGroup>
              </Col>            
              </Row>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdPurchaseInvoice.Terms and Condition')?.[genLabel]}
              </Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={
                  arb
                    ? purchaseinvoiceeditdetails && purchaseinvoiceeditdetails.terms_and_condition_arb
                    : purchaseinvoiceeditdetails && purchaseinvoiceeditdetails.terms_and_condition
                }
                name={arb ? 'terms_and_condition_arb' : 'terms_and_condition'}
                
              />
                 
                </FormGroup>
              </Col>
              </ComponentCard>
              </FormGroup>
              </Form>
  </>
  );
};

export default PurchaseInvoiceEditDetails;

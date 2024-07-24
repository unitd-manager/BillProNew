import { Row, Col, Form, FormGroup,Input,Label} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import moment from 'moment';
import PropTypes from 'prop-types';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../ComponentCard';
//import GoodsReceiptEditButton from './GoodsReceiptEditButton';
import ApiButton from '../ApiButton';



//GoodsReceiptEditDetails From Goods Receipt Edit
const GoodsReceiptEditDetails = ({ goodsreceipteditdetails, handleInputs, employee, editGoodsReceiptData, id,arabic,arb}) => {
    GoodsReceiptEditDetails.propTypes = {
        goodsreceipteditdetails: PropTypes.bool,
        handleInputs: PropTypes.func,
        employee: PropTypes.any,
        editGoodsReceiptData: PropTypes.any,  
        id: PropTypes.bool,
        arabic: PropTypes.any,
        arb: PropTypes.any,
  };
  
  console.log('id',id)
  // Navigation and Parameter Constants
  const navigate = useNavigate();
  const backToList = () => {
    navigate('/GoodsReceipt');
  };
  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }

  return (
    <>
    <BreadCrumbs heading={goodsreceipteditdetails && goodsreceipteditdetails.title} />
    <Form>
        <FormGroup>
        {/* <GoodsReceiptEditButton id={id} editGoodsReceiptData={editGoodsReceiptData} navigate={navigate} />
         */}
        <ApiButton
              editData={editGoodsReceiptData}
              navigate={navigate}
              applyChanges={editGoodsReceiptData}
              backToList={backToList}
              module="GoodsReceipt"
            ></ApiButton>
          {/* Content Details Form */}
          <ComponentCard title={arb ?'تفاصيل استلام البضائع':'Goods Receipt Details'} creationModificationDate={goodsreceipteditdetails}>
            <ToastContainer></ToastContainer>
      <Row>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdGoodsReceipt.PO Code')?.[genLabel]}   
                </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            goodsreceipteditdetails && goodsreceipteditdetails.po_code_arb ? goodsreceipteditdetails.po_code_arb :
                            (goodsreceipteditdetails && goodsreceipteditdetails.po_code_arb !== null ? '' : goodsreceipteditdetails && goodsreceipteditdetails.po_code)
                          )
                        : (goodsreceipteditdetails && goodsreceipteditdetails.po_code)
                    }
                    name={arb ? 'po_code_arb' : 'po_code'}
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdGoodsReceipt.Supplier Name')?.[genLabel]}   
                </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            goodsreceipteditdetails && goodsreceipteditdetails.company_name_arb ? goodsreceipteditdetails.company_name_arb :
                            (goodsreceipteditdetails && goodsreceipteditdetails.company_name_arb !== null ? '' : goodsreceipteditdetails && goodsreceipteditdetails.company_name)
                          )
                        : (goodsreceipteditdetails && goodsreceipteditdetails.company_name)
                    }
              
              
                    name={arb ? 'company_name_arb' : 'company_name'}
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdGoodsReceipt.Goods Received Date')?.[genLabel]} 
                <span className="required"> *</span> </Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    // value={goodsreceipteditdetails && goodsreceipteditdetails.goods_received_date}
                    value={
                      goodsreceipteditdetails && moment(goodsreceipteditdetails.goods_received_date).format('YYYY-MM-DD')
                    }
                    name="goods_received_date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdGoodsReceipt.Received By')?.[genLabel]}
                </Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={goodsreceipteditdetails && goodsreceipteditdetails.employee_id}
                    name="employee_id"
                  >
                    <option defaultValue="selected">{arb ?'الرجاء التحديد':'Please Select'}</option>
                    {employee &&
                      employee.map((e) => {
                        return (
                          <option key={e.employee_id} value={e.employee_id}>
                            {arb?e.first_name_arb:e.first_name}
                          </option>
                        );               
                      })}
                  </Input>
                </FormGroup>
              </Col>
              </Row>
              <Row>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdGoodsReceipt.Total Amount')?.[genLabel]}</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            goodsreceipteditdetails && goodsreceipteditdetails.total_amount_arb ? goodsreceipteditdetails.total_amount_arb :
                            (goodsreceipteditdetails && goodsreceipteditdetails.total_amount_arb !== null ? '' : goodsreceipteditdetails && goodsreceipteditdetails.total_amount)
                          )
                        : (goodsreceipteditdetails && goodsreceipteditdetails.total_amount)
                    }
                    name={arb ? 'total_amount_arb' : 'total_amount'}
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdGoodsReceipt.Status')?.[genLabel]} 
                </Label>
                  <Input
                  value={
                    arb
                      ? (
                          goodsreceipteditdetails && goodsreceipteditdetails.status_arb ? goodsreceipteditdetails.status_arb :
                          (goodsreceipteditdetails && goodsreceipteditdetails.status_arb !== null ? '' : goodsreceipteditdetails && goodsreceipteditdetails.status)
                        )
                      : (goodsreceipteditdetails && goodsreceipteditdetails.status)
                  }
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
             
              </Row>
              </ComponentCard>
              </FormGroup>
              </Form>
    </>
  );
};

export default GoodsReceiptEditDetails;

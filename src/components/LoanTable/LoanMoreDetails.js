import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
//import moment from 'moment';
import * as Icon from 'react-feather';
import { ToastContainer } from 'react-toastify';
import { Row, Col, Form, Table, FormGroup, Label, Input, TabContent, TabPane, Button, Modal, ModalBody, ModalHeader, ModalFooter, CardBody } from 'reactstrap';
import api from '../../constants/api';
import ComponentCard from '../ComponentCard';
import PreviousEarlierLoan from './PreviousEarlierLoan';
import AttachmentModalV2 from '../Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../ProjectModal/ViewFileComponentV2';
import Tab from '../project/Tab';

export default function LoanMoreDetails({
  activeTab,
  setActiveTab,
  dataForAttachment,
  setAttachmentModal,
  attachmentModal,
  id,
  columns1,
  paymentdetails,
  attachmentData,
  addpaymentToggle,
  handlePaymentInputs,
  insertPayment,
  newpaymentData,
  addpaymentModal,
  loan,
  loanDetails,
  isStatusActive,
}) {
  LoanMoreDetails.propTypes = {
    activeTab: PropTypes.string,
    setActiveTab: PropTypes.string,
    dataForAttachment: PropTypes.func,
    setAttachmentModal: PropTypes.func,
    attachmentModal: PropTypes.bool,
    id: PropTypes.any,
    columns1: PropTypes.array,
    paymentdetails: PropTypes.array,
    attachmentData: PropTypes.any,
    addpaymentToggle: PropTypes.func,
    handlePaymentInputs: PropTypes.func,
    insertPayment: PropTypes.func,
    newpaymentData: PropTypes.any,
    addpaymentModal: PropTypes.bool,
    loan: PropTypes.any,
    loanDetails: PropTypes.any,
    isStatusActive: PropTypes.any,
  };

  const [RoomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState('');
  const [update, setUpdate] = useState(false);
  // Start for tab refresh navigation #Renuka 1-06-23
  
  // const tabsArb = [
  //   { id: '1', name: 'مرفق' },
  //   { id: '2', name: 'تاريخ الدفع' },
  //   { id: '3', name: 'السابق/القرض السابق' },
  // ];
 
  const toggle = (tab) => {
    setActiveTab(tab);
  };
  // End for tab refresh navigation #Renuka 1-06-23
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };

  const selectedLanguage = getSelectedLanguageFromLocalStorage();

  // Use the selected language value as needed
  console.log('Selected language from localStorage:', selectedLanguage);
  // const companyhandleInputs = (e) => {
  //   setCompanyInsertData({ ...companyInsertData, [e.target.name]: e.target.value });
  // };

   const [arabic, setArabic] = useState([]);

   const arb = selectedLanguage === 'Arabic';

  // const eng = selectedLanguage === 'English';

  const getArabicCompanyName = () => {
    api
      .get('/loan/getTranslationforHRLoan')
      .then((res) => {
        setArabic(res.data.data);
      })
      .catch(() => {
        // Handle error if needed
      });
  };

  console.log('arabic', arabic);
  useEffect(() => {
    getArabicCompanyName();
  }, []);
  const tabs = [
    { id: '1', name:arb?'مرفق': 'Attachment' },
    { id: '2', name: arb?'تاريخ الدفع': 'Payment History' },
    { id: '3', name: arb?'السابق/القرض السابق': 'Previous/EarlierLoan' },
  ];
  
  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else { 
    genLabel = 'value';
  }

  return (
    <ComponentCard title={arb?'المزيد من التفاصيل':"More Details"}>
      <ToastContainer></ToastContainer>
      <Tab toggle={toggle} tabs={tabs} />
      <TabContent className="p-4" activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col xs="12" md="3" className="mb-3">
              <Button
                className="shadow-none"
                color="primary"
                onClick={() => {
                  setRoomName('Booking');
                  setFileTypes(['JPG', 'JPEG', 'PNG', 'GIF', 'PDF']);
                  dataForAttachment();
                  setAttachmentModal(true);
                }}
              >
                <Icon.File className="rounded-circle" width="20" />
              </Button>
            </Col>
          </Row>
          <AttachmentModalV2
            moduleId={id}
            attachmentModal={attachmentModal}
            setAttachmentModal={setAttachmentModal}
            roomName={RoomName}
            fileTypes={fileTypes}
            altTagData="BookingRelated Data"
            desc="BookingRelated Data"
            recordType="RelatedPicture"
            mediaType={attachmentData.modelType}
            update={update}
            setUpdate={setUpdate}
          />
          <ViewFileComponentV2
            moduleId={id}
            roomName="Booking"
            recordType="RelatedPicture"
            update={update}
            setUpdate={setUpdate}
          />
        </TabPane>
        <TabPane tabId="2">
          <Row>
          <div className="container">
            <Row>
              
              {isStatusActive && loanDetails && loanDetails.amount_payable !== 0 && (
                <Col md="6">
                  <Button
                    className="shadow-none"
                    color="primary"
                    to=""
                    onClick={addpaymentToggle.bind(null)}
                  >
                   {arb?'قم بالدفع':'Make Payment'} 
                  </Button>
                </Col>
              )}
              {!isStatusActive  && loanDetails && loanDetails.amount_payable !== 0 &&(
                <Col md="6">
                  <Button
                    className="shadow-none"
                    color="primary"
                    onClick={() => {
                      alert(arb?'لا يمكنك إجراء الدفع إلا عندما تكون الحالة نشطة.': 'You can only make payment when the status is Active.');
                    }}
                  >
                    {arb?'قم بالدفع': 'Make Payment'}
                  </Button>
                </Col>
              )}
            </Row>
            <br/>
         
              <Table id="example" className="display border border-secondary rounded">
                <thead>
                  <tr>
                    {columns1.map((cell) => {
                      return <td key={cell.name}>{cell.name}</td>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {paymentdetails &&
                    paymentdetails.map((element, index) => {
                      return (
                        <tr key={element.loan__repayment_history_id}>
                          <td>{index + 1}</td>
                          <td>{element.payment_date ? element.payment_date : ''}</td>
                          <td>{element.loan_repayment_amount_per_month}</td>
                          <td>{element.remarks}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </div>
          </Row>

          <Modal size="l" isOpen={addpaymentModal} toggle={addpaymentToggle.bind(null)}>
            <ModalHeader toggle={addpaymentToggle.bind(null)}>Payment Details</ModalHeader>
            <ModalBody>
              <Row>
                <Col md="12">
                  <CardBody>
                    <Form>
                      <Row>
                        <FormGroup>
                        <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdHRLoan.Date')?.[genLabel]}{' '}                   
                   
                      </Label>                          
                      <Input
                            type="date"
                            onChange={handlePaymentInputs}
                            value={
                              arb
                      ? newpaymentData && newpaymentData.generated_date_arb
                        ? newpaymentData.generated_date_arb
                        : newpaymentData && newpaymentData.generated_date_arb !== null
                        ? ''
                        : newpaymentData && newpaymentData.generated_date
                      : newpaymentData && newpaymentData.generated_date
                  }
                  name={arb ? 'generated_date_arb' : 'generated_date'}
                          />
                        </FormGroup>
                        <FormGroup>
                        <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdHRLoan.Amount')?.[genLabel]}{' '}                   
                   </Label>                          
                   <Input
                            type="number"
                            onChange={handlePaymentInputs}
                            max={loanDetails && loanDetails.amount_payable}
                            value={
                              arb
                      ? newpaymentData && newpaymentData.loan_repayment_amount_per_month_arb
                        ? newpaymentData.loan_repayment_amount_per_month_arb
                        : newpaymentData && newpaymentData.loan_repayment_amount_per_month_arb !== null
                        ? ''
                        : newpaymentData && newpaymentData.loan_repayment_amount_per_month
                      : newpaymentData && newpaymentData.loan_repayment_amount_per_month
                  }
                  name={arb ? 'loan_repayment_amount_per_month_arb' : 'loan_repayment_amount_per_month'}
                          />                          
                        </FormGroup>
                        <FormGroup>
                        <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdHRLoan.Remarks')?.[genLabel]}{' '}                   
                   </Label>                         
                    <Input
                            type="textarea"
                            onChange={handlePaymentInputs}
                            value={
                              arb
                      ? newpaymentData && newpaymentData.remarks_arb
                        ? newpaymentData.remarks_arb
                        : newpaymentData && newpaymentData.remarks_arb !== null
                        ? ''
                        : newpaymentData && newpaymentData.remarks
                      : newpaymentData && newpaymentData.remarks
                  }
                  name={arb ? 'remarks_arb' : 'remarks'}
                          />
                        </FormGroup>
                      </Row>
                    </Form>
                  </CardBody>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button
                className="shadow-none"
                color="primary"
                onClick={() => {
                  insertPayment();
                }}
              >
              { arb?'حفظ ومتابعة': "Save & Continue"}
              </Button>
              <Button
                className="shadow-none"
                color="secondary"
                onClick={addpaymentToggle.bind(null)}
              >
                {arb? 'يلغي': 'Cancel'}
              </Button>
            </ModalFooter>
          </Modal>
        </TabPane>
        <TabPane tabId="3">
          <PreviousEarlierLoan 
          loan={loan} 
          loanDetails={loanDetails}
          arb={arb}
       arabic={arabic}
       ></PreviousEarlierLoan>
        </TabPane>
      </TabContent>
    </ComponentCard>
  );
}

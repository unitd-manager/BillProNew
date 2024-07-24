import React, { useEffect } from 'react';
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Input,
} from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';


function LoanPaymentHistoryModal({ loanPaymentHistoryModal, setLoanPaymentHistoryModal,loanamountdata,updateState,insertLoanRepayment }) {
  LoanPaymentHistoryModal.propTypes = {
    loanPaymentHistoryModal: PropTypes.bool,
    setLoanPaymentHistoryModal: PropTypes.func,
    insertLoanRepayment: PropTypes.any,
    loanamountdata:PropTypes.any,
    updateState:PropTypes.any,

  };

  // // Call the API to update the loan record
  // const insertLoanRepayment = () => {
   
  //   loanamountdata.forEach((elem) => {
  //     elem.payroll_management_id= id;
  //     elem.generated_date = moment();
  //   //payroll.loan_amount = elem.loan_repayment_amount_per_month;
  //     api
  //       .post('/loan/insertLoanRepaymenthistory', elem)
  //       .then(() => {
  //         message('Loan record updated successfully');
  //       })
  //       .catch(() => {
  //         message('Unable to update loan record.', 'error');
  //       });
  //   });
  // };
  // function updateState(index, property, e) {
  //   const copyloanDetails = [...loanamountdata];
  //   const updatedObject = { ...copyloanDetails[index], [property]: e.target.value };
  //   copyloanDetails[index] = updatedObject;
  //   setLoanamountData(copyloanDetails);
  // }

  const columns = [
    {
      name: 'SN.No',
    },
    {
      name: 'Loan Type/Date',
    },
    {
      name: 'Total Loan Amount',
    },
    {
      name: ' Total Amount Paid',
    },
    {
      name: 'Amount Paid Now',
    },
    {
      name: 'Remarks',
    },
    {
      name: 'Amount Payable',
    },
  ];
  useEffect(() => {}, []);

  return (
    <>
      <Modal isOpen={loanPaymentHistoryModal} size="xl">
        <ModalHeader>Loan Payment History</ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
              {/* <Card className="shadow-none">
                  <CardBody className="shadow-none"> */}
              <Table id="example" className="display border border-secondary rounded">
                <thead>
                  <tr>
                    {columns.map((cell) => {
                      return <td key={cell.name}>{cell.name}</td>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {loanamountdata &&
                    loanamountdata.map((element, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>
                            {element.type}/
                            {element.date ? moment(element.date).format('DD-MM-YYYY') : ''}
                          </td>
                          <td>{element.amount}</td>
                          <td>{element.total_repaid_amount}</td>
                          <td>
                            {' '}
                            <Input
                              type="text"
                              value={element.loan_repayment_amount_per_month}
                              onChange={(e) => updateState(index, 'loan_repayment_amount_per_month', e)}
                              name="loan_repayment_amount_per_month"
                            ></Input>
                          </td>
                          <td>
                            <Input
                              type="textarea"
                              value={element.remarks}
                              onChange={(e) => updateState(index, 'remarks', e)}
                              name="remarks"
                            ></Input>
                          </td>
                          <td>{element.amount_payable}</td>{' '}
                          {/* Display the calculated Amount Payable */}
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
              {/* </CardBody>
                </Card> */}
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            className="shadow-none"
            color="primary"
            onClick={() => {
              insertLoanRepayment();
            }}
          >
            submit
          </Button>
          <Button
            color="dark"
            className="shadow-none"
            onClick={() => {
              setLoanPaymentHistoryModal(false);
            }}
          >
            {' '}
            Close{' '}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default LoanPaymentHistoryModal;

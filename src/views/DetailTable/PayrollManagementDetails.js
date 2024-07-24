import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as Icon from 'react-feather';
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
  Form,
  FormGroup
} from 'reactstrap';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { ToastContainer } from 'react-toastify';
import message from '../../components/Message';
import ComponentCardV2 from '../../components/ComponentCardV2';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
//import LoanPaymentHistoryModal from '../../components/PayrollManagementTable/LoanPaymentHistoryModal';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import PdfPaySlip from '../../components/PDF/PdfPaySlip';
// import PdfTimeSheet from '../../components/PDF/PdfTimeSheet';
import AddNote from '../../components/Tender/AddNote';
import ViewNote from '../../components/Tender/ViewNote';
import PayslipSummary from '../../components/PayrollManagement/PayslipSummary';
import EarningDeductions from '../../components/PayrollManagement/EarningDeductions';
import PayrollLeaveSummary from '../../components/PayrollManagement/PayrollLeaveSummary';
import ApiButton from '../../components/ApiButton';

//import Loan from '../smartconTables/Loan';

function PayrollManagementDetails() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [payroll, setPayroll] = useState({
    payroll_month: '',
    payslip_start_date: '',
    payslip_end_date: '',
    payroll_year: '',
    basic_pay: '',
    gross_pay:'',
    ot_hours: '',
    ot_amount: '',
    cpf_employer: '',
    cpf_employee: '',
    payroll_management_id: '',
    mode_of_payment: '',
    pay_sinda: '',
    loan_amount: '',
    working_days_in_month: '',
    actual_working_days: '',
    notes: '',
    pay_cdac: '',
    pay_mbmf: '',
    pay_eucf: '',
    department: '',
    flag: '',
    status: '',
    cpf_account_no: '',
    govt_donation: '',
    overtime: '',
    allowance1: '',
    allowance2: '',
    allowance3: '',
    allowance4: '',
    allowance5: '',
    allowance6: '',
    deduction1: '',
    deduction2: '',
    deduction3: '',
    deduction4: '',
    income_tax_amount: '',
    sdl: '',
    reimbursement: '',
    director_fee: '',
    generated_date: '',
    net_total: '',
    total_basic_pay_for_month: '',
    employee_name: '',
  });

  const [finalGrossPay, setFinalGrossPay] = useState(0);
  const [loanPaymentHistoryModal, setLoanPaymentHistoryModal] = useState(false);
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const [roomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState();
  const [totalMonthPay, setTotalMonthPay] = useState();
  const [totalDeductions, setTotalDeductions] = useState();
  const [otAmount, setOtAmount] = useState();
  const [update, setUpdate] = useState(false);
  const [leave, setLeave] = useState([]);
  const [editTotalDeduction, setEditTotalDeduction] = useState(false);
  //handle inputs

  const backToList = () => {
    navigate('/PayrollManagement');
  };
  //Attachments
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
  };

  const handleOtAmount = (otRate, otHours) => {
    if (!otRate) otRate = 0;
    if (!otHours) otHours = 0;
    setOtAmount(parseFloat(otRate) * parseFloat(otHours));
  };

  // calculation earnings
  const handleDeductions = (
    loanDeduction,
    cpf,
    sDl,
    euCf,
    cdac,
    mbmf,
    sinda,
    incomeTax,
    deductions1,
    deductions2,
    deductions3,
    deductions4,
    totalDeduction,
    cpfEmployee,
  ) => {
    /* eslint-disable */
    if (!totalDeduction) totalDeduction = 0;
    if (!loanDeduction) loanDeduction = 0;
    if (!cpf) cpf = 0;
    if (!sDl) sDl = 0;
    if (!incomeTax) incomeTax = 0;
    if (!deductions1) deductions1 = 0;
    if (!deductions2) deductions2 = 0;
    if (!deductions3) deductions3 = 0;
    if (!deductions4) deductions4 = 0;
    if (!euCf) euCf = 0;
    if (!sinda) sinda = 0;
    if (!cdac) cdac = 0;
    if (!mbmf) mbmf = 0;
    if (!cpfEmployee) cpfEmployee = 0;

    setTotalDeductions(
      parseFloat(totalDeduction) +
        parseFloat(loanDeduction) +
        parseFloat(cpf) +
        parseFloat(sDl) +
        parseFloat(incomeTax) +
        parseFloat(deductions1) +
        parseFloat(deductions2) +
        parseFloat(deductions3) +
        parseFloat(deductions4) +
        parseFloat(euCf) +
        parseFloat(cdac) +
        parseFloat(sinda) +
        parseFloat(mbmf)+
        parseFloat(cpfEmployee),
    );
    setEditTotalDeduction(true);
  };
  // calculation earnings
  const handleEarnings = (
    grossPay,
    otAmount,
    allowances1,
    allowances2,
    allowances3,
    allowances4,
    allowances5,
  ) => {
    /* eslint-disable */
    if (!grossPay) grossPay = 0;
    if (!otAmount) otAmount = 0;
    if (!allowances1) allowances1 = 0;
    if (!allowances2) allowances2 = 0;
    if (!allowances3) allowances3 = 0;
    if (!allowances4) allowances4 = 0;
    if (!allowances5) allowances5 = 0;

    setTotalMonthPay(
      parseFloat(grossPay) +
        parseFloat(otAmount) +
        parseFloat(allowances1) +
        parseFloat(allowances2) +
        parseFloat(allowances3) +
        parseFloat(allowances4) +
        parseFloat(allowances5),
    );
  };

  // const handleInputs = (e) => {
  //   const { name, value } = e.target;
  //   setPayroll({ ...payroll, [name]: value });

  //   // If the input name is "loan_amount," update loan_repayment_amount_per_month as well
  //   if (name === 'loan_amount') {
  //     setLoan((prevLoan) => ({
  //       ...prevLoan,
  //       loan_repayment_amount_per_month: value,
  //     }));
  //   }
  // };

  //Calculate and update Gross Pay whenever relevant fields change
  // useEffect(() => {
  //   const basicPay = parseFloat(payroll.total_basic_pay_for_month) || 0;
  //   const allowance1 = parseFloat(payroll.allowance1) || 0;
  //   const allowance2 = parseFloat(payroll.allowance2) || 0;
  //   const allowance3 = parseFloat(payroll.allowance3) || 0;
  //   const allowance4 = parseFloat(payroll.allowance4) || 0;
  //   const allowance5 = parseFloat(payroll.allowance5) || 0;
  //   const otAmountValue = parseFloat(otAmount || (payroll && payroll.ot_amount)) || 0;

  //   const newGrossPay =
  //     basicPay + allowance1 + allowance2 + allowance3 + allowance4 + allowance5 + otAmountValue;

  //   setTotalMonthPay(newGrossPay);
  // }, [
  //   payroll.basic_pay,
  //   payroll.allowance1,
  //   payroll.allowance2,
  //   payroll.allowance3,
  //   payroll.allowance4,
  //   payroll.allowance5,
  //   otAmount || (payroll && payroll.ot_amount),
  // ]);
  const calculateBasicPayPercentage = () => {
    if (
      payroll &&
      payroll.basic_pay &&
      payroll.actual_working_days &&
      payroll.working_days_in_month
    ) {
      const totalBasicPay = parseFloat(payroll.basic_pay);
      const actualWorkingDays = parseFloat(payroll.actual_working_days);
      const workingDaysInMonth = parseFloat(payroll.working_days_in_month);

      if (actualWorkingDays > 0 && workingDaysInMonth > 0) {
        const basicPayPercentage = (
          (totalBasicPay / workingDaysInMonth) *
          actualWorkingDays
        ).toFixed(2);
        handleEarnings(
          basicPayPercentage,
          payroll.ot_amount,
          payroll.allowance1,
          payroll.allowance2,
          payroll.allowance3,
          payroll.allowance4,
          payroll.allowance5,
        );
        setFinalGrossPay(parseFloat(basicPayPercentage).toFixed(2));
        return `${basicPayPercentage}`;
      }
    }
    return '';
  };
  // const handleInputs = (e) => {
  //   setPayroll({ ...payroll, [e.target.name]: e.target.value });
  // };
  const handleInputs = (e) => {
    const { name, value } = e.target;

    // Check if the edited field is "actual_working_days" and the value is greater than "workingDaysInMonth"
    if (name === 'actual_working_days') {
      const actualWorkingDays = parseFloat(value);
      if (actualWorkingDays > workingDaysInMonth) {
        // Show an alert or error message
        alert('Actual worked days cannot be greater than Working Days in Month');
        // Reset the input field to the previous valid value
        e.target.value = payroll.actual_working_days || ''; // You can set an empty string or some default value
        return; // Do not update the state with an invalid value
      }
    }

    // Update the state with the new value
    setPayroll((prevPayroll) => ({
      ...prevPayroll,
      [name]: value,
    }));
  };
  // Function to calculate working days in a month
  const calculateDaysInRange = () => {
    const workingDaysInWeek = parseFloat(payroll.working_days);
    const startDate = moment(payroll.payslip_start_date);
    const endDate = moment(payroll.payslip_end_date);
    const daysInRange = endDate.diff(startDate, 'days') + 1;
    console.log('1', daysInRange);
    // Calculate the number of weeks between the two dates
    //const weeksInRange = Math.ceil(endDate.diff(startDate, 'days') / 7);
    console.log('2', workingDaysInWeek);
    // Calculate the number of weeks (rounded down)
    const TotaldaysInRanges = Math.floor(daysInRange / 7);

    // Calculate the remaining days
    const remainingDays = daysInRange - TotaldaysInRanges * 7;

    // Calculate total working days in the month
    const workingdaysInRanges = workingDaysInWeek * TotaldaysInRanges + remainingDays;
    console.log('3', 'Total days in range:', daysInRange);
    console.log('4', 'Total weeks in range:', TotaldaysInRanges);
    console.log('5', 'Total weeks in range:', remainingDays);
    console.log('6', 'Total weeks in range:', workingdaysInRanges);

    return workingdaysInRanges;
  };

  const [workingDaysInMonth, setWorkingDaysInMonth] = useState(calculateDaysInRange());

  useEffect(() => {
    // Recalculate working days in a month whenever payroll data changes
    setWorkingDaysInMonth(calculateDaysInRange());
  }, [payroll]);

  // Calculate and update totalMonthPay with the latest values
  // PREVIOUS STATE AS: 2023-09-30
  const newTotalMonthPay =
    // parseFloat(payroll.total_basic_pay_for_month || 0) +
    parseFloat(finalGrossPay) +
    parseFloat(otAmount || (payroll && payroll.ot_amount) || 0) +
    parseFloat(payroll.allowance1 || 0) +
    parseFloat(payroll.allowance2 || 0) +
    parseFloat(payroll.allowance3 || 0) +
    parseFloat(payroll.allowance4 || 0) +
    parseFloat(payroll.allowance5 || 0);
  // const newTotalMonthPay = finalGrossPay;

  // Calculate and update totalDeductions with the latest values
  const newTotalDeductions =
    parseFloat(payroll.deduction1 || 0) +
    parseFloat(payroll.deduction2 || 0) +
    parseFloat(payroll.deduction3 || 0) +
    parseFloat(payroll.deduction4 || 0) +
    parseFloat(payroll.sdl || 0) +
    parseFloat(payroll.income_tax_amount || 0) +
    parseFloat(payroll.loan_amount || 0) +
    parseFloat(payroll.pay_eucf || 0) +
    parseFloat(payroll.pay_cdac || 0) +
    parseFloat(payroll.pay_mbmf || 0) +
    parseFloat(payroll.pay_sinda || 0)+
    parseFloat(payroll.cpf_employee || 0);

  const newNetTotal =
    newTotalMonthPay +
    parseFloat(payroll.director_fee || 0) +
    parseFloat(payroll.reimbursement || 0) -
    newTotalDeductions;

  // Edit Payroll Data Function
  const editPayrollData = () => {
    if (editTotalDeduction) {
      payroll.total_deductions = totalDeductions;
    }

    //payroll.ot_amount= otAmount;

    const updatedPayrollData = {
      ...payroll,

      total_deductions: newTotalDeductions,
      net_total: newNetTotal,
      ot_amount: otAmount || (payroll && payroll.ot_amount) || 0, // Ensure ot_amount is always included
    };

  //   let newLoanAmount = 0;
  //   loanamountdata.forEach((elem) => {
  //     newLoanAmount += parseFloat(elem.loan_repayment_amount_per_month || 0);
  //   });
  //   // Update payroll with the new loan amount
  // payroll.loan_amount = newLoanAmount;
    api
      .post('/payrollmanagement/editpayrollmanagementMain', updatedPayrollData)
      .then(() => {
        message('Record edited successfully', 'success');
        //navigate(`/PayrollManagement?month=${payroll.payroll_month}&year=${payroll.payroll_year}`);
        getPayroll();
        //getPreviousEarlierLoan();
        setEditTotalDeduction(false);
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };
  const [loanamountdata, setLoanamountData] = useState([]);

  const getPreviousEarlierLoan = (empId) => {
   
    api
      .post('/payrollmanagement/TabPreviousEarlierLoanById', {
        employee_id: empId,
      })
      .then((res) => {
        setLoanamountData(res.data.data);
      })
      .catch(() => {
        
      });
  };

  // Get payroll By Id
  const getPayroll = () => {
    api
      .post('/payrollmanagement/getpayrollmanagementById', { payroll_management_id: id })
      .then((res) => {
        setPayroll(res.data.data[0]);

        getPreviousEarlierLoan(res.data.data[0].employee_id);
        getLeaves(res.data.data[0].employee_id);
      })
      .catch(() => {
        //message('Loan Data Not Found', 'info');
      });
  };

  //getting lastmonth first and last date
  const getlastmonthdates = () => {
    const lastmonthfirstdate = moment(new Date())
      .subtract(1, 'months')
      .startOf('month')
      .format('DD-MM-YYYY');

    const lastmonthlastdate = moment(new Date())
      .subtract(1, 'months')
      .endOf('month')
      .format('DD-MM-YYYY');
  };

  const getLeaves = async (empid) => {
    api
      .post('/payrollmanagement/getPastLeaveHistory', { employee_id: empid })
      .then((res) => {
        setLeave(res.data.data);
      })
      .catch(() => {
        message('Unable to get leave record.', 'error');
      });
  };
  const deletePayrollData = () => {
    Swal.fire({
      title: `Are you sure? ${id}`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .post('/payrollmanagement/deletepayroll_management', { payroll_management_id: id })
          .then(() => {
            Swal.fire('Deleted!', 'Your payroll has been deleted.', 'success');
            //window.location.reload();
          });
      }
    });
  };
  // Function to handle changes in loan_repayment_amount_per_month input
  const handleLoanRepaymentAmountChange = (index, value) => {
    const copyLoanAmountData = [...loanamountdata];
    copyLoanAmountData[index].loan_repayment_amount_per_month = value;
    setLoanamountData(copyLoanAmountData);

    // Calculate the total loan amount
    const totalLoanAmount = copyLoanAmountData.reduce((acc, item) => {
      return acc + parseFloat(item.loan_repayment_amount_per_month || 0);
    }, 0);
    // console.log('total loan amount',totalLoanAmount);
    // Update the loan_amount field in the payroll state
    // setPayroll((prevPayroll) => ({
    //   ...prevPayroll,
    //   loan_amount: totalLoanAmount,
    // }));
  };
  useEffect(() => {
    //getlastmonthdates();
    getPayroll();
  }, [id]);
  // Call the API to update the loan record
  const insertLoanRepayment = () => {
   
    // console.log('payroll.loan_amount_before:', payroll.loan_amount);
    loanamountdata.forEach((elem, i) => {
      elem.payroll_management_id= id;
      elem.generated_date = moment();
      // console.log('payroll.loan_amount:', payroll.loan_amount);
      // console.log('elem.loan_repayment_amount_per_month:', elem.loan_repayment_amount_per_month);
      if (i===0) {
        payroll.loan_amount = parseFloat(elem.loan_repayment_amount_per_month);
      }else {
        payroll.loan_amount += parseFloat(elem.loan_repayment_amount_per_month);
      }

      console.log('loanamountdata', loanamountdata)
      api
        .post('/loan/insertLoanRepaymenthistory', elem)
        .then(() => {
          message('Loan record updated successfully','success');
          console.log("totalLoanAmount-console:", totalLoanAmount)
          // setPayroll({...payroll,loan_amount:totalLoanAmount})
          handleDeductions(
            totalLoanAmount,
            payroll.income_tax_amount,
            payroll.cpf_employee,
            payroll.deduction1,
            payroll.deduction2,
            payroll.deduction3,
            payroll.deduction4,
            payroll.sdl,
            payroll.pay_eucf,
            payroll.pay_cdac,
            payroll.pay_mbmf,
            payroll.pay_sinda,
          );
        })
        .catch(() => {
          //message('Unable to update loan record.', 'error');
        });
    });
  };
  function updateState(index, property, e) {
    const copyloanDetails = [...loanamountdata];
    const updatedObject = { ...copyloanDetails[index], [property]: e.target.value };
    copyloanDetails[index] = updatedObject;
    setLoanamountData(copyloanDetails);
  }

  const columns = [
    {
      name: 'S.No',
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
      <BreadCrumbs />
      <Form>
        <FormGroup>
          <ToastContainer></ToastContainer>
         
            {/* Save,Apply Buttons */}
            <ApiButton
              editData={editPayrollData}
              navigate={navigate}
              deleteData={deletePayrollData}
              //applyChanges={editPayrollData}
              backToList={backToList}
              module="Payroll Management"
            ></ApiButton>
        </FormGroup>
      </Form>
      <ComponentCardV2>
        <PdfPaySlip payroll={payroll}></PdfPaySlip>
        &nbsp;&nbsp;
        {/* <PdfTimeSheet payroll={payroll}></PdfTimeSheet>
        &nbsp;&nbsp; */}
      </ComponentCardV2>

      <ComponentCard title="Main Details">
        <PayrollLeaveSummary leave={leave} />

        {/* Payslip summary */}

        <PayslipSummary
          payroll={payroll}
          handleInputs={handleInputs}
          workingDaysInMonth={workingDaysInMonth}
        />
        {/* Earnings and deductions table */}
        <EarningDeductions
          payroll={payroll}
          handleDeductions={handleDeductions}
          handleEarnings={handleEarnings}
          handleInputs={handleInputs}
          handleOtAmount={handleOtAmount}
          otAmount={otAmount}
          newTotalMonthPay={newTotalMonthPay}
          totalDeductions={totalDeductions}
          totalMonthPay={totalMonthPay}
          finalGrossPay={finalGrossPay}
          setLoanPaymentHistoryModal={setLoanPaymentHistoryModal}
          calculateBasicPayPercentage={calculateBasicPayPercentage}
        />
        {/* {loanPaymentHistoryModal && (
          <LoanPaymentHistoryModal
            loanPaymentHistoryModal={loanPaymentHistoryModal}
            setLoanPaymentHistoryModal={setLoanPaymentHistoryModal}
            payroll={payroll}
            id={id}
            handleInputs={handleInputs}
            loanamountdata={loanamountdata}
            setLoanamountData={setLoanamountData}
          />
        )} */}
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
                              onChange={(e) =>
                                handleLoanRepaymentAmountChange(index, e.target.value)
                              }
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

        {/* Notes */}
        <Form>
          <Row>
            <ComponentCard title="Add a note">
              <AddNote recordId={id} roomName="PayrollManagement" />
              <ViewNote recordId={id} roomName="PayrollManagement" />
            </ComponentCard>
          </Row>
        </Form>
      </ComponentCard>

      {/* Attachment */}
      <Row>
        <Form>
          <ComponentCard title="Add">
            <Row>
              <Col xs="12" md="10" className="mb-3">
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    setRoomName('PayrollAttachment');
                    setFileTypes(['JPG', 'PNG', 'GIF', 'PDF']);
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
              roomName={roomName}
              fileTypes={fileTypes}
              altTagData="Payrollmanagement"
              recordType="PayrollAttachment"
              desc="Payrollmanagement"
              modelType={attachmentData.modelType}
              attachmentModal={attachmentModal}
              setAttachmentModal={setAttachmentModal}
              update={update}
              setUpdate={setUpdate}
            />
            <ViewFileComponentV2
              moduleId={id}
              roomName="PayrollAttachment"
              recordType="PayrollAttachment"
              update={update}
              setUpdate={setUpdate}
            />
          </ComponentCard>
        </Form>
      </Row>
    </>
  );
}

export default PayrollManagementDetails;

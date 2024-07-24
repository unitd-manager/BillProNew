import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, FormGroup } from 'reactstrap';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import moment from 'moment';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import message from '../../components/Message';
import api from '../../constants/api';
import LoanMoreDetails from '../../components/LoanTable/LoanMoreDetails';
import LoanDetailComp from '../../components/LoanTable/LoanDetailComp';
//import ComponentCardV2 from '../../components/ComponentCardV2';
//import LoanButtons from '../../components/LoanTable/LoanButton';
import ApiButton from '../../components/ApiButton';
import AppContext from '../../context/AppContext';
import creationdatetime from '../../constants/creationdatetime';

const LoanEdit = () => {
  //All state variables
  const [loan, setLoan] = useState(null);
  const [activeTab, setActiveTab] = useState('1'); 
  const [loanDetails, setLoanDetails] = useState([]);
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [paymentdetails, setPaymentDetails] = useState();
  const [addpaymentModal, setAddPaymentModal] = useState(false);
  const [loanStatus, setLoanStatus] = useState();
  const { loggedInuser } = useContext(AppContext);

  //const [loanStartDate, setLoanStartDate] = useState(null); // State variable to store the loan start date

  //  AttachmentModal
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });

  //Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();

  const addpaymentToggle = () => {
    setAddPaymentModal(!addpaymentModal);
  };

  // Button Save Apply Back List
  //const applyChanges = () => {};
  const saveChanges = () => {
    if (
      loanDetails.type &&
      loanDetails.type !== '' &&
      loanDetails.amount !== '' &&
      loanDetails.month_amount !== ''
    ) {
      navigate('/Loan');
    }
  };
  const backToList = () => {
    navigate('/Loan');
  };

  //All functions/Methods

  //Method for getting data by LoanId and Employee Id
  const getPreviousEarlierLoan = (empId) => {
    api
      .post('/loan/TabPreviousEarlierLoanById', { employee_id: empId })
      .then((res) => {
        setLoan(res.data.data);
      })

      .catch(() => {
        message('Loan not found', 'info');
      });
  };
  // Create a state variable to track whether the status is "Active"
  const [isStatusActive, setIsStatusActive] = useState(false);
  // Get Loan By Id
  const getLoanById = () => {
    api
      .post('/loan/getLoanById', { loan_id: id })
      .then((res) => {
        setLoanDetails(res.data.data[0]);
        setLoanStatus(res.data.data[0].status);
        // Update the isStatusActive variable based on the status
        //  setIsStatusActive(res.data.data[0].status === 'Active');
        setIsStatusActive(res.data.data[0].status === 'Active');
        getPreviousEarlierLoan(res.data.data[0].employee_id);
      })
      .catch(() => {
        message('Loan Data Not Found', 'info');
      });
  };

  //Setting Data in Loan Details
  const handleInputs = (e) => {
    setLoanDetails({ ...loanDetails, [e.target.name]: e.target.value });
  };

  //Logic for edit data in db
  //const [recordEdited, setRecordEdited] = useState(false); // Add this state variable

  // ...

  // Edit loan data
  const editLoanData = () => {
    if (
      loanDetails.type &&
      loanDetails.type !== '' &&
      loanDetails.amount !== '' &&
      loanDetails.month_amount !== ''
    ) {
      loanDetails.modification_date = creationdatetime;
      loanDetails.modified_by= loggedInuser.first_name;
      api
        .post('/loan/edit-Loan', loanDetails)
        .then(() => {
          if (loanDetails && loanDetails.status === 'Active') {
            api.post('/loan/editLoanStartDate', { loan_id: id });
            
          }

          message('Record edited successfully', 'success');
          getLoanById();
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields', 'error');
    }
  };

  useEffect(() => {
    // Check if the amount_payable becomes 0 and the closing date is not already set
    if (loanDetails.amount_payable === 0 && !loanDetails.loan_closing_date) {
      // Create the closing date as the current date
      const closingDate = moment().format('YYYY-MM-DD');

      // Update the loanDetails with the closing date
      // When amount_payable becomes 0, change the status to 'Closed'

      setLoanDetails({
        ...loanDetails,
        loan_closing_date: closingDate,
        status: 'Closed',
      });

      api
        .post('/loan/editLoanClosingDate', { loan_id: id, closing_date: closingDate })
        .then(() => {
          // Handle the API call success
          console.log('Loan closing date updated successfully.');
        })
        .catch((error) => {
          // Handle the API call error
          console.error('Failed to update loan closing date:', error);
        });
    }
  }, [loanDetails.amount_payable, loanDetails.loan_closing_date, loanDetails.status]);

  //for deleting the data
  const deleteLoanData = () => {
    api
      .post('/loan/deleteLoan', { loan_id: id })
      .then(() => {
        message('Record deteled successfully', 'success');
      })
      .catch(() => {
        message('Unable to delete record.', 'error');
      });
  };

  //getting payment data By Loan Id
  const getPaymentById = () => {
    api
      .post('/loan/TabPaymentHistoryById', { loan_id: id })
      .then((res) => {
        setPaymentDetails(res.data.data);
      })
      .catch(() => {
        message('Loan Data Not Found', 'info');
      });
  };
  const getRemainingAmount = () => {
    let paid = 0;
    if (paymentdetails && paymentdetails.length > 0) {
      paymentdetails.forEach((element) => {
        paid += parseFloat(element.loan_repayment_amount_per_month);
      });
      const rem = parseFloat(loanDetails.amount) - parseFloat(paid);
      return rem;
    }
    if (loanDetails) {
      return loanDetails.amount;
    }
    return 0;
  };
  const remainingAmount = getRemainingAmount();
  //Add payment data
  const [newpaymentData, setNewPaymentData] = useState({
    loan_id: '',
    payment_date: '',
    loan_repayment_amount_per_month: '',
    remarks: '',
  });

  const handlePaymentInputs = (e) => {
    setNewPaymentData({ ...newpaymentData, [e.target.name]: e.target.value });
  };

  const insertPayment = () => {
    newpaymentData.generated_date = moment();
    const newLoanId = newpaymentData;
    newLoanId.loan_id = id;
    if (newLoanId.loan_repayment_amount_per_month > remainingAmount) {
      message('The Amount you entered is more than the amoiunt you need to pay', 'warning');
    } else {
      api
        .post('/loan/insertLoanRepaymenthistory', newLoanId)
        .then(() => {
          message('payment inserted successfully.', 'success');
          // Check if amount_payable is 0 after inserting the payment
          if (remainingAmount - newLoanId.loan_repayment_amount_per_month === 0) {
            // Update the status to 'Closed'
            const updatedLoanDetails = {
              ...loanDetails,
              status: 'Closed',
            };

            // Update the status in the component state
            setLoanDetails(updatedLoanDetails);

            // Send an API request to update the status in the backend
            api
              .post('/loan/editLoanClosedDate', {
                loan_id: id,
                status: 'Closed',
              })
              .then(() => {
                console.log('Loan status updated to Closed.');
              })
              .catch((error) => {
                console.error('Failed to update loan status:', error);
              });
          }
          setNewPaymentData({
            loan_id: '',
            payment_date: '',
            loan_repayment_amount_per_month: '',
            remarks: '',
          });
          addpaymentToggle(false);
          getPaymentById();
          getLoanById();
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    }
  };

  //attachment for upload file
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
  };

  useEffect(() => {
    getLoanById();
    getPaymentById();
    getPreviousEarlierLoan();
  }, [id]);
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };

  const selectedLanguage = getSelectedLanguageFromLocalStorage();

  // Use the selected language value as needed
  console.log('Selected language from localStorage:', selectedLanguage);
 
  const [arabic, setArabic] = useState([]);

  const arb = selectedLanguage === 'Arabic';

  const eng = selectedLanguage === 'English';

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

  
  const columns1 = [
    {
      name: '#',
    },
    {
      name: arb?'تاريخ': 'Date',
    },
    {
      name: arb?'كمية': 'Amount',
    },
    {
      name:  arb?'ملاحظات':'Remarks',
    },
  ];

  return (
    <>
    {eng === true && <BreadCrumbs heading={loanDetails && loanDetails.title} />}
    {arb === true && <BreadCrumbs heading={loanDetails && loanDetails.title_arb} />}
    
      {/* <BreadCrumbs /> */}
      <Form>
        <FormGroup>
          <ToastContainer></ToastContainer>

          {/* Button */}

          <ApiButton
            saveChanges={saveChanges}
            editData={editLoanData}
            navigate={navigate}
            //applyChanges={editLoanData}
            backToList={backToList}
            deleteData={deleteLoanData}
            module="Loan"
          ></ApiButton>
        </FormGroup>
      </Form>
      {/*Main Details*/}
      <LoanDetailComp
        handleInputs={handleInputs}
        loanStatus={loanStatus}
        loanDetails={loanDetails}
        arb={arb}
       arabic={arabic}
      ></LoanDetailComp>
      <LoanMoreDetails
        isStatusActive={isStatusActive}
        setAttachmentModal={setAttachmentModal}
        attachmentModal={attachmentModal}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        id={id}
        columns1={columns1}
        dataForAttachment={dataForAttachment}
        paymentdetails={paymentdetails}
        attachmentData={attachmentData}
        addpaymentToggle={addpaymentToggle}
        handlePaymentInputs={handlePaymentInputs}
        insertPayment={insertPayment}
        newpaymentData={newpaymentData}
        addpaymentModal={addpaymentModal}
        loan={loan}
        loanDetails={loanDetails}
        arb={arb}
       arabic={arabic}
      ></LoanMoreDetails>
    </>
  );
};

export default LoanEdit;

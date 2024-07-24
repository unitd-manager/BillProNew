import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { Form, Table } from 'reactstrap';
import api from '../../constants/api';

export default function CustomerFinanceInvoice({
  receiptDetails,
  
}) {
  CustomerFinanceInvoice.propTypes = {
    receiptDetails: PropTypes.array,
     };


     const getSelectedLanguageFromLocalStorage = () => {
      return localStorage.getItem('selectedLanguage') || '';
    };
    
  const selectedLanguage = getSelectedLanguageFromLocalStorage();
  
  // Use the selected language value as needed
  console.log('Selected language from localStorage:', selectedLanguage);
  
  const arb =selectedLanguage === 'Arabic'
  
    // const eng =selectedLanguage === 'English'
  
    const [arabic, setArabic] = useState([]);
  
    const getArabicCompanyName = () => {
      api
      .get('/invoice/getTranslationforTradingReceipt')
      .then((res) => {
        setArabic(res.data.data);
      })
      .catch(() => {
        // Handle error if needed
      });   
  };
  
  console.log('arabic',arabic)
  useEffect(() => {
    getArabicCompanyName();
  }, []);
  
  let genLabel = '';
  
  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }
  
   //Structure of Invoice table
 const invoiceTableColumns = [
  {name: arabic.find(item => item.key_text === 'mdTradingReceipt.Invoice No')?.[genLabel]},
  {name: arabic.find(item => item.key_text === 'mdTradingReceipt.Receipt No')?.[genLabel]},
  {name: arabic.find(item => item.key_text === 'mdTradingReceipt.Receipt Date')?.[genLabel]},
  {name: arabic.find(item => item.key_text === 'mdTradingReceipt.Status')?.[genLabel], },
  { name: arabic.find(item => item.key_text === 'mdTradingReceipt.ModeOfPayment')?.[genLabel], },
  { name: arabic.find(item => item.key_text === 'mdTradingReceipt.Receipt Amount')?.[genLabel], },
];
  // //Structure of Invoice table
  // const invoiceTableColumns = [
  //   { name: 'Invoice No' },
  //   { name: 'Receipt No' },
  //   { name: 'Receipt Date' },
  //   { name: 'Status' },
  //   { name: 'Mode of Payment' },
  //   { name: 'Receipt Amount' },
  // ];

  return (
    // Invoice Tab

    <Form>
      <div className="MainDiv">
        <div className="container">
          <Table id="example">
            <thead>
              <tr>
                {invoiceTableColumns.map((cell) => {
                  return <td key={cell.name}>{cell.name}</td>;
                })}
              </tr>
            </thead>
            <tbody>
              {receiptDetails &&
                receiptDetails.map((element) => {
                  return (
                    <tr key={element.order_id}>
                      <td>{element.invoice_code}</td>
                      <td>{element.receipt_code}</td>
                      <td>{element.receipt_date}</td>
                      <td>{arb && element.receipt_status_arb ? element.receipt_status_arb : element.receipt_status}</td>
                      <td>{arb && element.mode_of_payment_arb ? element.mode_of_payment_arb : element.mode_of_payment}</td>
                      <td>{element.amount}</td>
                 
                    
                
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        
        </div>
      </div>
    </Form>
  );
}

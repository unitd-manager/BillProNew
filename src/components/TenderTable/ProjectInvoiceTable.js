import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { Form, Table } from 'reactstrap';
import api from '../../constants/api';

export default function CustomerFinanceInvoice({
  invoiceDetails,
  
}) {
  CustomerFinanceInvoice.propTypes = {
    invoiceDetails: PropTypes.array,
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
      .get('/invoice/getTranslationforTradingInvoice')
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
  {name: arabic.find(item => item.key_text === 'mdTradingInvoice.Invoice No')?.[genLabel]},
  {name: arabic.find(item => item.key_text === 'mdTradingInvoice.Invoice Date')?.[genLabel]},
  {name: arabic.find(item => item.key_text === 'mdTradingInvoice.Status')?.[genLabel], },
  { name: arabic.find(item => item.key_text === 'mdTradingInvoice.Amount')?.[genLabel], },
  { name: arabic.find(item => item.key_text === 'mdTradingInvoice.Due Date')?.[genLabel], },
];


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
              {invoiceDetails &&
                invoiceDetails.map((element) => {
                  return (
                    <tr key={element.order_id}>
                      <td>{element.invoice_code}</td>
                      <td>{element.invoice_date}</td>
                      {/* <td>{element.status}</td> */}
                      <td>{arb && element.status_arb ? element.status_arb : element.status}</td>
                      <td>{element.InvoiceAmount}</td>
                      <td>{element.invoice_due_date}</td>
                 
                    
                
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

/* eslint-disable */
import React, { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import PropTypes from 'prop-types';
import api from '../../constants/api';
import message from '../Message';
import moment from 'moment';


const PdfReactInvoice =  ({ invoiceId, invoiceRef }) => {
  PdfReactInvoice.propTypes = {
    invoiceId: PropTypes.any,
  };
  const [cancelInvoice, setCancelInvoice] = React.useState([]);
  const [createInvoice, setCreateInvoice] = React.useState();
  const [gTotal, setGtotal] = React.useState(0);
  const [gstTotal, setGsttotal] = React.useState(0);
  const [Total, setTotal] = React.useState(0);
  const [hfdata, setHeaderFooterData] = React.useState();


  React.useEffect(() => {
    api.get('/setting/getSettingsForCompany').then((res) => {
      setHeaderFooterData(res.data.data);
    });
  }, []);

 
  // Gettind data from Job By Id
  const getInvoiceById = () => {
    api
      .post('/invoice/getInvoiceByInvoiceId', { invoice_id: invoiceId })
      .then((res) => {
        setCreateInvoice(res.data.data);
      })
      .catch(() => {
        message('Invoice Data Not Found', 'info');
      });
  };
  const getInvoiceItemById = () => {
    api
      .post('/invoice/getInvoiceItemByInvoiceId', { invoice_id: invoiceId })
      .then((res) => {
        setCancelInvoice(res.data.data);
        //grand total
        let grandTotal = 0;
        let grand = 0;
        let gst = 0;
        res.data.data.forEach((elem) => {
          grandTotal += elem.amount;
        });
        setGtotal(grandTotal);
        gst = grandTotal * 0.07;
        setGsttotal(gst);
        grand = grandTotal + gst;
        setTotal(grand);
      })
      .catch(() => {
        message('Invoice Data Not Found', 'info');
      });
  };



  React.useEffect(() => {
    getInvoiceItemById();
    getInvoiceById();
  }, []);
 

  const [pdfGenerated, setPdfGenerated] = useState(false);

  const handleGeneratePdf = () => {
    console.log('Generating PDF...');
  const input = invoiceRef.current;
  if (input) {
    // Create a new jsPDF instance

    // Convert the invoice HTML element to a canvas

    // Convert the invoice HTML element to a canvas with a higher scale (e.g., 2)
    html2canvas(input, { scale: 3 }).then((canvas) => {
    const imgData = canvas.toDataURL('image/jpeg');
    const pdf = new JsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

    pdf.setFont('Inter-Regular', 'normal');

    // Add the canvas image to the PDF

    // Save the PDF
    pdf.save('invoice.pdf');
    setPdfGenerated(true);
    });
  }
  };


  // Calculate the total price

  return (
    <div className="invoice" id="invoice" ref={invoiceRef}  style={{alignItems:'center',justifyContent:'center',padding:23}}>
       
        <table border="0" width="100%" style={{ border: '1px solid #0e502a' }} cellpadding="4">
        <tr>
          <td align="center" style={{ fontSize: 16, fontWeight: 'bold', color: '#14213d', textDecoration: 'underline', lineHeight: '35px' }}>TAX INVOICE</td>
        </tr>
      </table>
      <table border="0" width="100%" cellpadding="2" cellspacing="0">
        <tr>
          <td width="33%" style={{ fontSize: '10px', fontWeight: 'bold', backgroundColor: '#ededf0', border: '1px solid #000', lineHeight: '16px' }}>Bill To:</td>
          <td width="34%"></td>
          <td width="33%" style={{ fontSize: '10px', fontWeight: 'bold', backgroundColor: '#ededf0', border: '1px solid #000', lineHeight: '16px' }}>Bill From:</td>
        </tr>
        <tr>
          <td width="33%" style={{ border: '1px solid #000' }}>
            <table border="0" cellpadding="0">
              <tr>
                <td width="25%" style={{ fontSize: '10px', lineHeight: '16px' }}>Name</td>
                <td width="75%" style={{ fontSize: '10px', lineHeight: '16px' }}>: {createInvoice && createInvoice.first_nammmm}</td>
              </tr>
              <tr>
                <td width="25%" style={{ fontSize: '10px', lineHeight: '16px' }}>Co.Name</td>
                <td width="75%" style={{ fontSize: '10px', lineHeight: '16px' }}>: {createInvoice && createInvoice.company_name}</td>
              </tr> 
              <tr>
                <td width="25%" style={{ fontSize: '10px', lineHeight: '16px' }}>Address</td>
                <td width="75%" style={{ fontSize: '10px', lineHeight: '16px' }}>: {createInvoice && createInvoice.cust_address1}</td>
              </tr>
              <tr>
                <td width="25%" style={{ fontSize: '10px', lineHeight: '16px' }}>Email</td>
                <td width="75%" style={{ fontSize: '10px', lineHeight: '16px' }}>: </td>
              </tr>  
              <tr>
                <td width="25%" style={{ fontSize: '10px', lineHeight: '16px' }}>Tel</td>
                <td width="75%" style={{ fontSize: '10px', lineHeight: '16px' }}>:{createInvoice && createInvoice.cust_phone}</td>
              </tr>         
              <tr>
                <td width="25%" style={{ fontSize: '10px', lineHeight: '16px' }}>Fax</td>
                <td width="75%" style={{ fontSize: '10px', lineHeight: '16px' }}>:{createInvoice && createInvoice.cust_fax} </td>
              </tr>

            </table>
          </td>
          <td width="34%"></td>
          <td width="33%" style={{ border: '1px solid #000' }}>
            <table border="0">
              <tr>
                <td width="25%" style={{ fontSize: '10px', lineHeight: '16px' }}>Invoice No</td>
                <td width="75%" style={{ fontSize: '10px', lineHeight: '16px' }}>: {createInvoice && createInvoice.invoice_code}</td>
              </tr>
              <tr>
                <td width="25%" style={{ fontSize: '10px', lineHeight: '16px' }}>Date</td>
                <td width="75%" style={{ fontSize: '10px', lineHeight: '16px' }}>:{moment(createInvoice && createInvoice.invoice_date).format('YYYY-MM-DD')} </td>
              </tr>
              <tr>
                <td width="25%" style={{ fontSize: '10px', lineHeight: '16px' }}>Po.No</td>
                <td width="75%" style={{ fontSize: '10px', lineHeight: '16px' }}>: {createInvoice && createInvoice.po_number}</td>
              </tr>
            
              <tr>
                <td width="25%" style={{ fontSize: '10px', lineHeight: '16px' }}>Email</td>
                <td width="75%" style={{ fontSize: '10px', lineHeight: '16px' }}>: </td>
              </tr>
              <tr>
                <td width="25%" style={{ fontSize: '10px', lineHeight: '16px' }}>Tel</td>
                <td width="75%" style={{ fontSize: '10px', lineHeight: '16px' }}>: </td>
              </tr>
              
            </table>
          </td>
        </tr>
      </table>
      <br /><br />
      <table border="0">
        <tr>
          <td width="13%" align="left" style={{ fontWeight: 'bold', fontSize: '10px', lineHeight: '20px' }}>Project location</td>
          <td width="2%" align="left" style={{ fontWeight: 'bold', fontSize: '10px', lineHeight: '20px' }}>:{createInvoice && createInvoice.project_location}</td>
          <td width="85%" align="left" style={{ fontWeight: 'bold', fontSize: '10px', lineHeight: '20px' }}></td>
        </tr>
        <tr>
          <td width="13%" align="left" style={{ fontWeight: 'bold', fontSize: '10px', lineHeight: '20px' }}>Project Reference</td>
          <td width="2%" align="left" style={{ fontWeight: 'bold', fontSize: '10px', lineHeight: '20px' }}>:{createInvoice && createInvoice.project_reference}</td>
          <td width="85%" align="left" style={{ fontWeight: 'bold', fontSize: '10px', lineHeight: '20px' }}></td>
        </tr>
      </table>
      <table border="0" cellpadding="4" width="100%">
        <thead>
        <tr bgcolor="#ededf0">
          <th width="55%" align="center" style={{ border: '1px solid #000', fontSize: '10px', fontWeight: 'bold' }}>DESCRIPTION</th>
          <th width="7%" align="center" style={{ border: '1px solid #000', fontSize: '10px', fontWeight: 'bold' }}>QTY</th>
          <th width="10%" align="center" style={{ border: '1px solid #000', fontSize: '10px', fontWeight: 'bold' }}>UNIT</th>
          <th width="12%" align="center" style={{ border: '1px solid #000', fontSize: '10px', fontWeight: 'bold' }}>UNIT PRICE($)</th>
          <th width="16%" align="center" style={{ border: '1px solid #000', fontSize: '10px', fontWeight: 'bold' }}>TOTAL PRICE($) صباح الخير</th>
        </tr>
           
        </thead>
        <tbody>
          {cancelInvoice &&
              cancelInvoice.map((item) => (
            <tr>
            <td width="55%" style={{ fontSize: '10px', fontWeight: 'bold', borderLeft: '1px solid #000', borderRight: '1px solid #000' }}>
              {item.item_title}
            </td>
            <td width="7%" style={{ borderLeft: '1px solid #000', borderRight: '1px solid #000' }}>
              {item.unit}
            </td>
            <td width="10%" style={{ borderLeft: '1px solid #000', borderRight: '1px solid #000' }}>
              {item.qty}
            </td>
            <td width="12%" style={{ borderLeft: '1px solid #000', borderRight: '1px solid #000' }}>
              {item.unit_price}
            </td>
            <td width="16%" style={{ borderRight: '1px solid #000' }}>
            {item.amount}
            </td>
          </tr>
        
           
          ))}
        </tbody>
        <tfoot>
        <tr>
    <td colSpan="4" className="total-label" style={{ borderTop: '1px solid #000' }}>
      Sub Total:
    </td>
    <td style={{ borderTop: '1px solid #000' }}>${gTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td> {/* Use the Total state here */}
  </tr>
  <tr>
  <td colSpan="4" className="total-label" style={{ borderTop: '1px solid #000' }}>

      Discount:
    </td>
    <td style={{ borderTop: '1px solid #000' }}>{createInvoice && createInvoice.discount}</td> {/* Use the Total state here */}
  </tr>
  <tr>
  <td colSpan="4" className="total-label" style={{ borderTop: '1px solid #000' }}>

      VAT:
    </td>
    <td style={{ borderTop: '1px solid #000' }}>${gstTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td> {/* Use the Total state here */}
  </tr>
  <tr>
    <td colSpan="4" className="total-label" style={{ borderTop: '1px solid #000' }}>
      Total:
    </td>
    <td style={{ borderTop: '1px solid #000' }}>${Total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td> {/* Use the Total state here */}
  </tr>
</tfoot>
      </table>
      
    </div>
  );
};




  export default PdfReactInvoice;
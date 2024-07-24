import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { Page, Text, Document, Font, View, PDFDownloadLink, StyleSheet } from '@react-pdf/renderer';
import api from '../../constants/api';
import message from '../Message';



const PdfCreateInvoice = ({ invoiceId }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [createInvoice, setCreateInvoice] = useState();
  const [cancelInvoice, setCancelInvoice] = useState([]);
  const [gTotal, setGtotal] = useState(0);
  const [gstTotal, setGsttotal] = useState(0);
  const [Total, setTotal] = useState(0);

  useEffect(() => {
    Font.register({
      family: 'ArabicFont-Regular',
      src: '/fonts/ArabicFont-Regular.ttf', // Adjust the path accordingly
    });
    setFontLoaded(true);
  }, []);

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

        let grandTotal = 0;
        let gst = 0;
        res.data.data.forEach((elem) => {
          grandTotal += elem.amount;
        });
        setGtotal(grandTotal);
        gst = grandTotal * 0.07;
        setGsttotal(gst);
        setTotal(grandTotal + gst);
      })
      .catch(() => {
        message('Invoice Data Not Found', 'info');
      });
  };

  useEffect(() => {
    getInvoiceById();
    getInvoiceItemById();
  }, []);

  if (!fontLoaded || !createInvoice || !cancelInvoice || gTotal === 0 || gstTotal === 0 || Total === 0) {
    return null; // Font loading or invoice data fetching in progress
  }

  return (
    <>
      {fontLoaded && createInvoice && cancelInvoice && gTotal && gstTotal && Total && (
        <PDFDownloadLink document={<MyPdfDocument createInvoice={createInvoice} invoiceItems={cancelInvoice} gTotal={gTotal} gstTotal={gstTotal} Total={Total} />} fileName="invoice.pdf">
          {({ loading }) => (loading ? 'Loading document...' : <Button type="button">Download Invoice</Button>)}
        </PDFDownloadLink>
      )}
    </>
  );
};

const MyPdfDocument = ({ createInvoice, invoiceItems, gTotal, gstTotal, Total }) => {
  const styles = StyleSheet.create({
    page: { backgroundColor: 'white' },
    section: { color: 'black', textAlign: 'center', fontFamily: 'ArabicFont-Regular', margin: 30 },
    sections: { color: 'blue', textAlign: 'center', fontFamily: 'ArabicFont-Regular', marginTop: -30 },
    Terms: { color: 'black',marginLeft:20,  fontFamily: 'ArabicFont-Regular',marginRight:'30%',fontSize:10 },
    Termshead: { color: 'black',marginLeft:20,fontSize:12,fontWeight: 'bold', },
    addressContainer: { display: 'flex', flexDirection: 'row', fontSize: 10, justifyContent: 'space-between', margin: 20 },
    addressSection: { fontFamily: 'ArabicFont-Regular', fontSize: 12, flex: 1 },
    totalContainer: {
      display: 'flex',
      flexDirection: 'row',
      fontSize: 10,
      justifyContent: 'space-between',
      margin: 5,
    },
    totalLabel: {
      fontFamily: 'ArabicFont-Regular',
      fontSize: 10,
      marginLeft:'61%',
      flex: 3,
      textAlign: 'right',
    },
    totalValue: {
      fontSize: 12,
      marginRight:'9%',
      fontFamily: 'ArabicFont-Regular',
      flex: 1,
      textAlign: 'right',
    },
   
    Label: {
      fontFamily: 'ArabicFont-Regular',
      fontSize: 12,
      marginLeft:'75%',
      marginBottom:5,
      flex: 3,
    },
    LabelValue: {
      fontSize: 10,
      marginRight:'30%',
      flex: 1,
      textAlign: 'right',
    },
      
    Label1: {
      fontFamily: 'ArabicFont-Regular',
      fontSize: 10,
      marginRight:'75%',
      
    },
    LabelValue1: {
      fontFamily: 'ArabicFont-Regular',
      fontSize: 10,
      marginLeft:20,
      textAlign: 'left',
    },
    table: {
      display: 'table',
      width: 'auto',
      fontFamily: 'ArabicFont-Regular',
      marginVertical: 20,
      marginRight: 20,
      marginLeft: 20,
    },
    
  zebraRow: {
    backgroundColor: 'white', // Set the background color for zebra rows
  },
  Addresss: {
    fontFamily: 'ArabicFont-Regular', // Set the background color for zebra rows
  },
    tableRow: {
      flexDirection: 'row',
      fontFamily: 'ArabicFont-Regular',
      width: 'auto',
    },
    // tableHeaderCell: {
     
    //   borderWidth: 0,
    //   padding: 8,
    //   fontSize: 12,
    //   fontFamily: 'ArabicFont-Regular',
    //   textAlign: 'center',
    //   width: ['20%', '40%', '10%', '10%', '10%', '10%'],
    //   fontWeight: 'bold',
    //   backgroundColor: '#bfdde8',
    // },
    tableHeader: {
      marginLeft:20,
      marginRight:20,
      marginTop:50,
      borderWidth: 0,
      padding: 8,
      width:'93%',
      fontSize: 12,
      fontFamily: 'ArabicFont-Regular',
      textAlign: 'center',
      fontWeight: 'bold',
      backgroundColor: '#bfdde8',
    },
    tableCell: {
      borderWidth: 0,
      borderBottomWidth: 1,
      borderColor: '#eaeaea',
      padding: 8,
      fontSize: 12,
      fontFamily: 'ArabicFont-Regular',
      textAlign: 'center',
      fontWeight: 'normal',
    },
  
    tableHeaderCell: {
      borderWidth: 0,
      padding: 8,
      fontSize: 12,
      fontFamily: 'ArabicFont-Regular',
      textAlign: 'center',
      fontWeight: 'bold',
      backgroundColor: '#bfdde8',
    },
  
//  tableCell: {
//     borderWidth: 0,
//     borderBottomWidth: 1,
//     borderColor: '#eaeaea',
//     padding: 8,
//     fontSize: 12,
//     fontFamily: 'ArabicFont-Regular',
//     textAlign: 'center',
//     width: ['5%', '35%', '10%', '10%', '10%', '10%'], // Adjust these widths
//     fontWeight: 'normal',
//   },
  });
  const productItems = [
    [
      { text: 'Sn',  },
      { text: 'Description                                                                                                            وصف', },
      { text: 'Uom           أوم', },
      { text: 'Qty          كمية', },
      { text: 'Price                             سعر',  },
      { text: 'Total Amount         المبلغ الإجمالي', },
    ],
    ...invoiceItems.map((element, index) => [
      { text: `${index + 1}`,border: [false, false, false, true],width:'10%'},
      { text: `${element.description ? element.description : ''}`, border: [false, false, false, true],width:'40%'},
      { text: `${element.unit ? element.unit : ''}`, border: [false, false, false, true],width:'10%' },
      { text: `${element.qty ? element.qty : ''}`, border: [false, false, false, true],width:'10%'  },
      { text: `${element.unit_price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, border: [false, false, false, true], width: '10%' },
       { text: `${element.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, border: [false, false, false, true],width:'10%' },
    ]),
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.tableHeader}>Tax Invoice</Text>
        </View>

        {/* Address sections */}
        <View style={styles.addressContainer}>
          {/* Left-aligned section */}
          <View style={styles.addressSection}>
            <Text style={styles.Addresss}>Company Address</Text>
            <Text style={styles.Addresss}>{createInvoice.cust_address1}</Text>
            <Text style={styles.Addresss}>{createInvoice.cust_address2}</Text>
            <Text style={styles.Addresss}>{createInvoice.cust_address_country}</Text>
            <Text style={styles.Addresss}>{createInvoice.cust_address_po_code}</Text>
          </View>

          {/* Right-aligned section */}
          <View style={styles.addressSection}>
            <Text style={styles.LabelValue}>Invoice No:</Text>
            <Text style={styles.Label}>{createInvoice.invoice_code}</Text>
            <Text style={styles.LabelValue}>Date :</Text>
            <Text  style={styles.Label}>{createInvoice.invoice_date}</Text>
            <Text  style={styles.LabelValue} >Code :</Text>
            <Text  style={styles.Label}>{createInvoice.code}</Text>
            <Text  style={styles.LabelValue} >SO Ref Number :</Text>
            <Text style={styles.Label}>{createInvoice.so_ref_no}</Text>
            <Text  style={styles.LabelValue}>PO Number :</Text>
            <Text  style={styles.Label}>{createInvoice.po_number}</Text>
          </View>
        </View>
        <View >
            <Text style={styles.LabelValue1}>ATTN:</Text>
            <Text style={styles.LabelValue1}>Dear Sir,</Text>
            <Text style={styles.LabelValue1}>Site Name :{createInvoice.title}</Text>
            {/* <Text style={styles.Label1}>{createInvoice.title}</Text> */}
            <Text style={styles.LabelValue1}>Site Code :{createInvoice.site_code} </Text>
            {/* <Text  style={styles.Label1}>{createInvoice.site_code}</Text> */}
            <Text  style={styles.LabelValue1} >Reference :{createInvoice.reference}</Text>
            {/* <Text  style={styles.Label1}>{createInvoice.reference}</Text> */}
            <Text  style={styles.LabelValue1} >Project Reference :{createInvoice.project_reference}</Text>
            {/* <Text style={styles.Label1}>{createInvoice.project_reference}</Text> */}
            <Text  style={styles.LabelValue1}>Project Location : {createInvoice.project_location}</Text>
            {/* <Text  style={styles.Label1}>{createInvoice.project_location}</Text> */}
          </View>
          
          <View style={styles.table}>
  {/* Render the header row with the new tableHeaderCell style */}
  <View style={styles.tableRow}>
    {productItems[0].map((cell, cellIndex) => (
      <Text
        key={cellIndex.invoiceId}
        style={[
          styles.tableHeaderCell,
          {
            width:
              cellIndex === 0 ? '5%' :
              cellIndex === 1 ? '40%' :
              cellIndex === 2 ? '10%' :
              cellIndex === 3 ? '10%' :
              cellIndex === 4 ? '15%' :
              cellIndex === 5 ? '20%' :
              'auto', // Default width for cells beyond index 5
          },
        ]}
      >
        {cell.text}
      </Text>
    ))}
  </View>

  {/* Render the rest of the table rows with zebra-striped format from the second row */}
  {productItems.slice(1).map((row, rowIndex) => (
    <View
      key={rowIndex.invoiceId}
      style={[
        styles.tableRow,
        rowIndex % 2 !== 0 ? styles.zebraRow : null, // Apply zebraRow style conditionally
      ]}
    >
      {row.map((cell, cellIndex) => (
        <Text
          key={cellIndex.invoiceId}
          style={[
            styles.tableCell,
            {
              width:
                cellIndex === 0 ? '5%' :
                cellIndex === 1 ? '40%' :
                cellIndex === 2 ? '10%' :
                cellIndex === 3 ? '10%' :
                cellIndex === 4 ? '15%' :
                cellIndex === 5 ? '20%' :
                'auto', // Default width for cells beyond index 5
            },
          ]}
        >
          {cell.text}
        </Text>
      ))}
    </View>
  ))}
</View>
        {/* Total */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Grand Total:</Text>
          <Text style={styles.totalValue}>{gTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>VAT Total:</Text>
          <Text style={styles.totalValue}>{gstTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalValue}>{Total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</Text>
        </View>
                 
          
        <View>
          <Text style={styles.Termshead}>Terms And conditions</Text>
          <Text style={styles.Terms}>{createInvoice.payment_terms}</Text>
        </View>
      </Page>
    </Document>
  );
};

PdfCreateInvoice.propTypes = {
  invoiceId: PropTypes.string.isRequired,
};

MyPdfDocument.propTypes = {
  createInvoice: PropTypes.shape({
    cust_address1: PropTypes.string.isRequired,
    cust_address2: PropTypes.string.isRequired,
    cust_address_country: PropTypes.string.isRequired,
    cust_address_po_code: PropTypes.string.isRequired,
    invoice_code: PropTypes.string.isRequired,
    invoice_date: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    so_ref_no: PropTypes.string.isRequired,
    po_number: PropTypes.string.isRequired,
    payment_terms: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    site_code: PropTypes.string.isRequired,
    reference: PropTypes.string.isRequired,
    project_reference: PropTypes.string.isRequired,
    project_location: PropTypes.string.isRequired,
    // Add any other expected properties here
  }).isRequired,
  invoiceItems: PropTypes.arrayOf(
    PropTypes.shape({
      item_title: PropTypes.string.isRequired,
      qty: PropTypes.string.isRequired,
      unit: PropTypes.string.isRequired,
      unit_price: PropTypes.string.isRequired,
      amount: PropTypes.string.isRequired,
      // ... Your invoice item properties ...
    })
  ).isRequired,
  gTotal: PropTypes.number.isRequired,
  gstTotal: PropTypes.number.isRequired,
  Total: PropTypes.number.isRequired,
};

export default PdfCreateInvoice;

import React, { useState } from 'react';
//import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import Converter from 'number-to-words';
import PropTypes from 'prop-types';
import moment from 'moment';
import api from '../../constants/api';
import PdfFooter from './PdfFooter';
import PdfHeader from './PdfHeader';

const PdfMaterialIssue = ({ id }) => {
    PdfMaterialIssue.propTypes = {
    id: PropTypes.any,
  };
  const [hfdata, setHeaderFooterData] = React.useState();
  const [quote, setQuote] = React.useState([]);
  const [tenderDetails, setTenderDetails] = useState(null);
  const [lineItem, setLineItem] = useState([]);
  const [gTotal, setGtotal] = React.useState(0);
  const [gstTotal, setGsttotal] = React.useState(0);
  const [Total, setTotal] = React.useState(0);
  //const [lineItem, setLineItem] = useState(null);

  React.useEffect(() => {
    api.get('/MaterialIssue/getSettingsForCompany').then((res) => {
      setHeaderFooterData(res.data.data);
    });
  }, []);

  const findCompany = (key) => {
    const filteredResult = hfdata.find((e) => e.key_text === key);
    return filteredResult.value;
  };

  const getCompany = () => {
    api
      .post('/MaterialIssue/getMaterialIssueDataById', { material_issue_id: id })
      .then((res) => {
        setTenderDetails(res.data.data);
        console.log('1', res.data.data);
      })
      .catch(() => {});
  };

  // Get Quote By Id
  const getQuote = () => {
    api.post('/MaterialIssue/getMaterialIssueDataById', { material_issue_id: id }).then((res) => {
      setQuote(res.data.data);
      console.log('quote', res.data.data);
    });
  };
  // const getQuoteById = () => {
  //   api
  //     .post('/materialrequest/getMaterialrequestItemsById', { material_request_id: id })
  //     .then((res) => {
  //       const items = Array.isArray(res.data.data) ? res.data.data : [res.data.data];
      
  //     setLineItem(items);
  //       console.log('quote1', res.data.data);
  //       let grandTotal = 0;
  //       let grand = 0;
  //       let gst = 0;
  //       res.data.data.forEach((elem) => {
  //         grandTotal += elem.amount;
  //         //  grand += elem.actual_value;
  //       });
  //       setGtotal(grandTotal);
  //       gst = grandTotal * 0.07;
  //       setGsttotal(gst);
  //       grand = grandTotal + gst;
  //       setTotal(grand);
  //       //setViewLineModal(true);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching quote:', error);
  //       // Handle the error here, e.g., display an error message to the user
  //     });
  // };

  const getQuoteById = () => {
    api
      .post('/materialissue/getMaterialissueItemsById', { material_issue_id: id })
      .then((res) => {
        setLineItem(res.data.data);
        console.log('quote1', res.data.data[0]);
        let grandTotal = 0;
        let grand = 0;
        let gst = 0;
        res.data.data.forEach((elem) => {
          grandTotal += elem.amount;
          //  grand += elem.actual_value;
        });
        setGtotal(grandTotal);
        gst = grandTotal * 0.07;
        setGsttotal(gst);
        grand = grandTotal + gst;
        setTotal(grand);
        //setViewLineModal(true);
      })
      .catch(() => {});
  };
console.log('lineitem', lineItem)

  React.useEffect(() => {
    getQuote();
    getQuoteById();
    getCompany();
  }, []);
  React.useEffect(() => {
   
    getQuoteById();
  }, [id]);

  const GetPdf = () => {
    const lineItemBody = [
      [
        {
          text: 'SN',
          style: 'tableHead',
        },
        {
          text: 'Title',
          style: 'tableHead',
        },
        {
          text: 'Brand',
          style: 'tableHead',
        },
        {
          text: 'Supplier',
          style: 'tableHead',
        },
        {
          text: 'Qty',
          style: 'tableHead',
        },
        {
          text: 'Unit Price',
          style: 'tableHead',
        },
        {
          text: 'Amount S$',
          style: 'tableHead',
          alignment: 'right',
        },
      ],
    ];
    lineItem.forEach((element, index) => {
      lineItemBody.push([
        {
          text: `${index + 1}`,
          style: 'tableBody',
          border: [false, false, false, true],
        },
        {
          text: `${element.title}`,
          border: [false, false, false, true],
          style: 'tableBody',
        },
        {
            text: `${element.brand}`,
            border: [false, false, false, true],
            style: 'tableBody',
          },
          {
            text: `${element.company_name}`,
            border: [false, false, false, true],
            style: 'tableBody',
          },
          {
            text: `${element.quantity}`,
            border: [false, false, false, true],
            style: 'tableBody',
          },
          {
            text: `${element.unit_price}`,
            border: [false, false, false, true],
            style: 'tableBody',
          },
        {
          text: `${element.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
          border: [false, false, false, true],
          fillColor: '#f5f5f5',
          style: 'tableBody',
          alignment: 'right',
        },
      ]);
    });

    const dd = {
      pageSize: 'A4',
      header: PdfHeader({ findCompany }),
      pageMargins: [40, 150, 40, 80],
      footer: PdfFooter,
      content: [
        {
          layout: {
            defaultBorder: false,
            hLineWidth: () => {
              return 1;
            },
            vLineWidth: () => {
              return 1;
            },
            hLineColor: (i) => {
              if (i === 1 || i === 0) {
                return '#bfdde8';
              }
              return '#eaeaea';
            },
            vLineColor: () => {
              return '#eaeaea';
            },
            hLineStyle: () => {
              // if (i === 0 || i === node.table.body.length) {
              return null;
              //}
            },
            // vLineStyle: function () { return {dash: { length: 10, space: 4 }}; },
            paddingLeft: () => {
              return 10;
            },
            paddingRight: () => {
              return 10;
            },
            paddingTop: () => {
              return 2;
            },
            paddingBottom: () => {
              return 2;
            },
            fillColor: () => {
              return '#fff';
            },
          },
          table: {
            headerRows: 1,
            widths: ['105%', '51%'],

            body: [
              [
                {
                  text: 'Material Issue',
                  alignment: 'center',
                  style: 'tableHead',
                },
              ],
            ],
          },
        },
        '\n',
        {
          columns: [
            {
              text: `TO`,
              style: ['notesText', 'textSize'],
              bold: 'true',
            },
            {
              text: ` ${tenderDetails.company_name ? tenderDetails.company_name : ''}
                               ${tenderDetails.address_flat ? tenderDetails.address_flat : ''}
                               ${tenderDetails.address_street ? tenderDetails.address_street : ''}
                               ${tenderDetails.address_country ? tenderDetails.address_country : ''}
                               ${
                                 tenderDetails.address_po_code ? tenderDetails.address_po_code : ''
                               }`,
              style: ['notesText', 'textSize'],
              margin: [-250, 20, 0, 0],
              bold: 'true',
            },
          ],
        },

        {
          text: `Date :   ${quote.material_request_date ? moment(quote.material_request_date).format('DD-MM-YYYY') : ''}
           Quote Code :  ${quote.material_request_code ? quote.material_request_code : ''}\n \n  `,
          style: ['invoiceAdd', 'textSize'],
          margin: [0, -60, 0, 0],
        },

        '\n\n',
        {
          text: `Att : ${tenderDetails.first_name ? tenderDetails.first_name : ''}`,
          style: ['notesText', 'textSize'],
          bold: 'true',
        },

        '\n',
        {
          text: `Dear Sir/Madam,

          We would like to express our gratitude for the opportunity to fulfill your material request. Enclosed herewith, please find the requested items and their corresponding specifications for your review and consideration:`,

          style: ['notesText', 'textSize'],
        },
        '\n',

        {
          layout: {
            defaultBorder: false,
            hLineWidth: () => {
              return 1;
            },
            vLineWidth: () => {
              return 1;
            },
            hLineColor: (i) => {
              if (i === 1 || i === 0) {
                return '#bfdde8';
              }
              return '#eaeaea';
            },
            vLineColor: () => {
              return '#eaeaea';
            },
            hLineStyle: () => {
              // if (i === 0 || i === node.table.body.length) {
              return null;
              //}
            },
            // vLineStyle: function () { return {dash: { length: 10, space: 4 }}; },
            paddingLeft: () => {
              return 10;
            },
            paddingRight: () => {
              return 10;
            },
            paddingTop: () => {
              return 2;
            },
            paddingBottom: () => {
              return 2;
            },
            fillColor: () => {
              return '#fff';
            },
          },
          table: {
            headerRows: 1,
            widths: [20, 130, 40, 60, 40, 40, 60],

            body: lineItemBody,
          },
        },
        '\n',
        {
          stack: [
            {
              text: `SubTotal $ :     ${gTotal.toLocaleString('en-IN', {
                minimumFractionDigits: 2,
              })}`,
              alignment: 'right',
              margin: [0, 0, 20, 0],
              style: 'textSize',
            },
            '\n',
            {
              text: `VAT :         ${gstTotal.toLocaleString('en-IN', {
                minimumFractionDigits: 2,
              })}`,
              alignment: 'right',
              margin: [0, 0, 20, 0],
              style: 'textSize',
            },
            '\n',
            {
              text: `Total $ :     ${Total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
              alignment: 'right',
              margin: [0, 0, 20, 0],
              style: 'textSize',
            },
            '\n\n\n',
            { text: `TOTAL : ${Converter.toWords(Total)}`, style: 'bold', margin: [40, 0, 0, 0] },
          ],
        },
        '\n',
        '\n',

        {
          columns: [
            {
              text: `Terms and Condition:- \n
              :- Payment : COD \n
              :- The above quote does not cover replacement of any parts unless expressly stated above. \n
              :- We reserve the right to terminate any scope of work in event where there is a default to our Payment Schedule`,

              style: ['notesText', 'textSize'],
            },
          ],
        },

        '\n\n',

        {
          width: '100%',
          alignment: 'center',
          text: 'Thank you very much for your business',
          bold: true,
          margin: [0, 10, 0, 10],
          fontSize: 12,
        },
      ],
      margin: [0, 50, 50, 50,50, 50],

      styles: {
        logo: {
          margin: [-20, 20, 0, 0],
        },
        address: {
          margin: [-10, 20, 0, 0],
        },
        invoice: {
          margin: [0, 30, 0, 10],
          alignment: 'right',
        },
        invoiceAdd: {
          alignment: 'right',
        },
        textSize: {
          fontSize: 10,
        },
        notesTitle: {
          bold: true,
          margin: [0, 50, 0, 3],
        },
        tableHead: {
          border: [false, true, false, true],
          fillColor: '#eaf2f5',
          margin: [0, 5, 0, 5],
          fontSize: 10,
          bold: 'true',
        },
        tableBody: {
          border: [false, false, false, true],
          margin: [0, 5, 0, 5],
          alignment: 'left',
          fontSize: 10.5,
        },
        tableBody1: {
          border: [false, false, false, true],
          margin: [0, 5, 0, 5],
          alignment: 'right',
          fontSize: 10,
        },
        tableBody2: {
          border: [false, false, false, true],
          margin: [0, 5, 35, 5],
          alignment: 'right',
          fontSize: 10,
        },
      },
      defaultStyle: {
        columnGap: 20,
      },
    };
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(dd, null, null, pdfFonts.pdfMake.vfs).open();
  };

  return (
    <>
      <Button type="button" color="primary" onClick={GetPdf}>
        Print pdf
      </Button>
    </>
  ); 
};

export default PdfMaterialIssue;

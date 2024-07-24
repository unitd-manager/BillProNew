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

const PdfQuote = ({ id, quoteId }) => {
  PdfQuote.propTypes = {
    id: PropTypes.any,
    quoteId: PropTypes.any,
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
    api.get('/setting/getSettingsForCompany').then((res) => {
      setHeaderFooterData(res.data.data);
    });
  }, []);

  const findCompany = (key) => {
    const filteredResult = hfdata.find((e) => e.key_text === key);
    return filteredResult.value;
  };

  const getCompany = () => {
    api
      .post('/goodsdelivery/getgoodsdeliveryById', { goods_delivery_id: id })
      .then((res) => {
        setTenderDetails(res.data.data[0]);
        console.log('1', res.data.data);
      })
      .catch(() => {});
  };

  // Get Quote By Id
  const getQuote = () => {
    api.post('/goodsdelivery/getgoodsdeliveryById', { goods_delivery_id: id }).then((res) => {
      setQuote(res.data.data[0]);
      console.log('quote', res.data.data);
    });
  };
  const getQuoteById = () => {
    api
      .post('/tradingquote/getQuoteLineItemsByIdss', { goods_delivery_id: quoteId })
      .then((res) => {
        setLineItem(res.data.data);
        console.log('quote1', res.data.data);
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
  React.useEffect(() => {
    getQuote();
    getQuoteById();
    getCompany();
  }, []);

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
          text: 'Description',
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
          text: `${element.description}`,
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
                  text: 'GOODS DELIVERY',
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
          text: `Date :   ${quote.goods_delivery_date ? moment(quote.goods_delivery_date).format('DD-MM-YYYY') : ''}
           Code :  ${quote.goods_delivery_code ? quote.goods_delivery_code : ''}\n \n  `,
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
          text: `Dear Sir,

           With reference to the above captions, we would like to thank you for inviting us to quote for the above mentioned works and we are pleased to submit herewith our Value Quotation for you kind persual.`,

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
            widths: [95, 120, 105, 100],

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
      margin: [0, 50, 50, 50],

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
        Pdf Quote
      </Button>
    </>
  );
};

export default PdfQuote;

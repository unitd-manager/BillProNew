import React from 'react';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Button } from 'reactstrap';
// import moment from 'moment';
import PropTypes from 'prop-types';
import api from '../../constants/api';
import PdfFooter from './PdfFooter';
import PdfHeader from './PdfHeader';
import message from '../Message';

const PdfPaySlip = ({receiptId}) => {
  PdfPaySlip.propTypes = {
    receiptId: PropTypes.any,
   
  }
console.log('receiptID',receiptId);
  const [hfdata, setHeaderFooterData] = React.useState();
  const [invoice, setInvoice] = React.useState([]);
  const [receipt, setReceipt] = React.useState([]);

  // const [bookingDetails, setPayroll] = React.useState();
  React.useEffect(() => {
    api.get('/setting/getSettingsForCompany').then((res) => {
      setHeaderFooterData(res.data.data);
    });
  }, []);

  const findCompany = (key) => {
    const filteredResult = hfdata.find((e) => e.key_text === key);
    return filteredResult.value;
  };

  const getReceiptItemById = () => {
    api
      .post('/invoice/getReceiptData', { receipt_id : receiptId })
      .then((res) => {
        setInvoice(res.data.data);
        //grand total
    
      })
      .catch(() => {
        message('Invoice Data Not Found', 'info');
      });
  };
  const getReceipt = () => {
    api
      .post('/invoice/getReceiptInvoiceData', { receipt_id : receiptId })
      .then((res) => {
        setReceipt(res.data.data[0]);
        //grand total
    
      })
      .catch(() => {
        message('Invoice Data Not Found', 'info');
      });
  };

  React.useEffect(() => {
    getReceiptItemById();
    getReceipt();
  }, []);

  const GetPdf = () => {
    const productItems = [
      [
     
        {
          text: 'Receipt No',
          style: 'tableHead',
        },
        {
          text: 'Payment Method',
          style: 'tableHead',
        },
        {
          text: 'Status',
          style: 'tableHead',
        },
        {
          text: 'amount',
          style: 'tableHead',
        },
       
       
      ],
    ];
    invoice.forEach((element) => {
      productItems.push([
      
        {
          text: `${element.receipt_code ? element.receipt_code : ''}`,
          border: [false, false, false, true],
          style: 'tableBody',
        },
        {
          text: `${element.mode_of_payment ? element.mode_of_payment : ''}`,
          border: [false, false, false, true],
          style: 'tableBody',
        },
        {
          text: `${element.receipt_status ? element.receipt_status : ''}`,
          border: [false, false, false, true],
          style: 'tableBody',
        },
        {
          text: `${element.amount ? element.amount : ''}`,
          border: [false, false, false, true],
          style: 'tableBody',
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
              return null;
            },
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
            widths: ['101%'],
            body: [
              [
                {
                  text: `Receipt`,
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
              stack: [
                {
                  text: ` Order No:${
                    receipt.order_code ? receipt.order_code : ''
                  } `,
                  style: ['textSize'],
                  margin: [20, 0, 0, 0],
                },
                {
                  text: ` Invoice No:${
                    receipt.invoice_code ? receipt.invoice_code : ''
                  } `,
                  style: ['textSize'],
                  margin: [20, 0, 0, 0],
                },
               
             
              ],
            },
          ],
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
              return null;
            },
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
            widths: [100, 100, 150, 100 ],

            body: productItems,
          },
       
        },
        {
            columns: [
              {
                text: ``,
                alignment: 'left',
                style: ['invoiceAdd', 'textSize'],
              },
              {
               
              },
            ],
          },
          '\n',
     
        {
          text: 'Terms and conditions : \n\n 1.The above rates are in Singapore Dollars. \n\n 2. Payment Terms 30 days from the date of Invoice \n\n  3.Payment should be made in favor of " CUBOSALE ENGINEERING PTE LTD " \n\n 4.Any discrepancies please write to us within 3 days from the date of invoice  \n\n\n 5. For Account transfer \n\n \n\n',
          style: 'textSize',
        },
        {
          text: 'UNITED OVERSEAS BANK \n ACCT NAME: CUBOSALE ENGINEERING PTE LTD \n ACCT NO.:- 3923023427 \n Paynow By UEN : 201222688M   \n\n',
          style: 'textSize',
          bold: true,
        },

        '\n\n',
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
          fontSize: 10,
        },
        tableBody1: {
          border: [false, false, false, true],
          margin: [10, 5, 0, 5],
          alignment: 'right',
          fontSize: 10,
        },
        tableBody2: {
          border: [false, false, false, true],
          margin: [15, 5, 0, 5],
          alignment: 'center',
          fontSize: 10,
        },
        tableBody3: {
          border: [false, false, false, true],
          margin: [15, 5, 0, 5],
          alignment: 'center',
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
      <Button type="button" className="btn btn-dark mr-2" onClick={GetPdf}>
        Print Receipt
      </Button>
    </>
  );
};

export default PdfPaySlip;

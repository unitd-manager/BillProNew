import React, { useState } from 'react';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Button } from 'reactstrap';
import moment from 'moment';
import PropTypes from 'prop-types';
import api from '../../constants/api';
import PdfFooter from './PdfFooter';
import PdfHeader from './PdfHeader';
import message from '../Message';

const PdfCreateInvoice = ({invoiceId,orderitemDetails}) => {
  PdfCreateInvoice.propTypes = {
    invoiceId: PropTypes.any,
    orderitemDetails: PropTypes.any
  }
console.log('invoiceId',invoiceId);
  const [hfdata, setHeaderFooterData] = React.useState();
  const [invoiceDetails, setInvoiceDetails] = useState({});

  const getInvoiceById = () => {
    api
      .post('/invoice/getInvoiceByInvoiceId', { invoice_id: invoiceId })
      .then((res) => {
        setInvoiceDetails(res.data.data);
      })
      .catch(() => {
        message('Invoice Data Not Found', 'info');
      });
  };

  React.useEffect(() => {
    api.get('/setting/getSettingsForCompany').then((res) => {
      setHeaderFooterData(res.data.data);
    });
  }, []);

  const findCompany = (key) => {
    const filteredResult = hfdata.find((e) => e.key_text === key);
    return filteredResult.value;
  };
  // const subtotal = orderitemDetails.reduce((total, element) => total + parseFloat(element.total_cost || 0), 0);
  // const getInvoiceItemById = () => {
  //   api
  //     .post('/invoice/getInvoiceItemByInvoiceId', { invoice_id: invoiceId })
  //     .then((res) => {
  //       setCompany(res.data.data);
  //       //grand total
    
  //     })
  //     .catch(() => {
  //       message('Invoice Data Not Found', 'info');
  //     });
  // };

  React.useEffect(() => {
 getInvoiceById();

  }, []);

  const GetPdf = () => {
    const productItems = [
      [
        {
          text: 'Title',
          style: 'tableHead',
        },
        {
          text: 'Unit Price',
          style: 'tableHead',
        },
        {
          text: 'Invoice Quantity',
          style: 'tableHead',
        },
        {
          text: 'Total',
          style: 'tableHead',
        },
       
      ],
    ];
    orderitemDetails.forEach((element) => {
      productItems.push([
        {
          text: `${element.item_title ? element.item_title : ''}`,
          border: [false, false, false, true],
          style: 'tableBody',
        },
        {
          text: `${element.unit_price ? element.unit_price : ''}`,
          border: [false, false, false, true],
          style: 'tableBody',
        },
        {
          text: `${element.invoice_qty ? element.invoice_qty : ''}`,
          border: [false, false, false, true],
          style: 'tableBody',
        },
        {
          text: `${element.total_cost ? element.total_cost : ''}`,
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
                  text: `TAX INVOICE`,
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
                  text: ` Invoice No:${
                    invoiceDetails.invoice_code ? invoiceDetails.invoice_code : ''
                  } `,
                  style: ['textSize'],
                  margin: [20, 0, 0, 0],
                },
                {
                  text: ` Date :${moment(
                    invoiceDetails.invoice_date ? invoiceDetails.invoice_date : '',
                  ).format('DD-MM-YYYY')}  `,
                  style: ['textSize'],
                  margin: [20, 0, 0, 0],
                },
            
              
                  '\n',
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
              // {
              //   stack: [
                  
              //       {
              //           text: `SubTotal $ : ${subtotal.toLocaleString('en-IN', {
              //             minimumFractionDigits: 2,
              //           })}`,
              //           style: ['textSize'],
              //           margin: [145, 0, 0, 0],
              //         },
              //   ],
              // },
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
        Print Pdf
      </Button>
    </>
  );
};

export default PdfCreateInvoice;

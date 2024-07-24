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

const PdfPaySlip = ({returnId,invoiceId}) => {
  PdfPaySlip.propTypes = {
    returnId: PropTypes.any,
    invoiceId: PropTypes.any,
  }

  const [hfdata, setHeaderFooterData] = React.useState();
  const [salesReturn, setReturn] = React.useState([]);
  const [returnItems, setReturnItems] = React.useState([]);

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

  const getSalesReturnId = () => {
    api
      .post('/invoice/getSalesReturnId', { sales_return_id : returnId })
      .then((res) => {
        setReturn(res.data.data[0]);
        //grand total
    
      })
      .catch(() => {
        message('Invoice Data Not Found', 'info');
      });
  };
  const getReceipt = () => {
    api
      .post('/invoice/getReturnInvoiceItemsById', { invoice_id : invoiceId })
      .then((res) => {
        setReturnItems(res.data.data);
        //grand total
    
      })
      .catch(() => {
        message('Invoice Data Not Found', 'info');
      });
  };

  React.useEffect(() => {
    getSalesReturnId();
    getReceipt();
  }, []);

  const GetPdf = () => {
    const productItems = [
      [
     
        {
          text: 'Item',
          style: 'tableHead',
        },
        {
          text: 'Quantity',
          style: 'tableHead',
        },
        {
          text: 'Price',
          style: 'tableHead',
        },
        {
          text: 'Return Date',
          style: 'tableHead',
        },
       
       
      ],
    ];
    returnItems.forEach((element) => {
      productItems.push([
      
        {
          text: `${element.item_title ? element.item_title : ''}`,
          border: [false, false, false, true],
          style: 'tableBody',
        },
        {
          text: `${element.qty_return ? element.qty_return : ''}`,
          border: [false, false, false, true],
          style: 'tableBody',
        },
        {
          text: `${element.price ? element.price : ''}`,
          border: [false, false, false, true],
          style: 'tableBody',
        },
        {
          text: `${element.return_date ? element.return_date : ''}`,
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
                  text: `Sales Returns`,
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
                    salesReturn.invoice_code ? salesReturn.invoice_code : ''
                  } `,
                  style: ['textSize'],
                  margin: [20, 0, 10, 0],
                },
                
                {
                  text: ` Status:${
                    salesReturn.status ? salesReturn.status : ''
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
        Print Pdf
      </Button>
    </>
  );
};

export default PdfPaySlip;

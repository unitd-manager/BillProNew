import React from 'react';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import api from '../../constants/api';
import PdfFooter from './PdfFooter';
import PdfHeader2 from './PdfHeader2';

const PdfCreateReceipt = ({ receiptId,financeDetails }) => {
  PdfCreateReceipt.propTypes = {
    receiptId: PropTypes.any,
    financeDetails: PropTypes.any,
  };
  const [hfdata, setHeaderFooterData] = React.useState();
  //const [hfdata1, setHeaderFooterData1] = React.useState();
  const [note, setNote] = React.useState();
  const [notes, setNotes] = React.useState();

  React.useEffect(() => {
    api.get('/setting/getSettingsForCompany').then((res) => {
      setHeaderFooterData(res.data.data);
    });
  }, []);
  // React.useEffect(() => {
  //   api.get('/setting/getSettingsForCompany1').then((res) => {
  //     setHeaderFooterData1(res.data.data);
  //   });
  // }, []);

  const findCompany = (key) => {
    console.log('key', key);
    if (financeDetails.company_invoice === 'Company Invoice 1') {
      if (hfdata && hfdata.length > 0) {
        const filteredResult = hfdata.find((e) => e.key_text === key);
        return filteredResult ? filteredResult.value : '';
      }
    } else {
     
        const filteredResult = hfdata.find((e) => e.key_text === key);
        return filteredResult ? filteredResult.value : '';
      
    }
    return '';
  };
  const getReceiptNote = () => {
    api
      .post('/invoice/getPDfProjectReceiptById', { receipt_id: receiptId })
      .then((res) => {
        setNotes(res.data.data[0]);
      })
      .catch(() => {
        
      });
  };
  const getReceiptNoteId = () => {
    api
      .post('/invoice/getPDfProjectReceiptById', { receipt_id: receiptId })
      .then((res) => {
        setNote(res.data.data);
      })
      .catch(() => {
       
      });
  };
  React.useEffect(() => {
    getReceiptNote();
    getReceiptNoteId();
  }, []);

  const GetPdf = () => {
    const productItems = [
      [
       
        {
          text: 'Date',
          style: 'tableHead',
        },
        {
          text: 'Receipt Code',
          style: 'tableHead',
        },
  
        {
          text: 'Amount',
          style: 'tableHead',
        },
      ],
    ];
    note.forEach((element) => {
      productItems.push([
        {
          text: `${moment(
            element.receipt_date ? element.receipt_date : '',
          ).format('DD-MM-YYYY')}`,
          border: [false, false, false, true],
          style: 'tableBody',
        },
        {
          text: `${element.receipt_code ? element.receipt_code : ''}`,
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
      header: PdfHeader2({ findCompany }),
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
        '\n\n\n',
        {
          columns: [
            {
              text: `Address:
              \n ${notes.cust_company_name ? notes.cust_company_name : ''} \n ${notes.cust_address1 ? notes.cust_address1 : ''}\n${notes.cust_address2 ? notes.cust_address2 : ''}
              \n${notes.cust_address_country ? notes.cust_address_country : ''}\n${notes.cust_address_po_code ? notes.cust_address_po_code : ''} `,
              style: 'textSize',
             
            },
            {
              text: ` Status :${
                notes.receipt_status ? notes.receipt_status : ''
              } \n Mode of Payment: ${notes.mode_of_payment ? notes.mode_of_payment : ''}`,
              style: 'textSize',
              margin: [140, 0, 0, 0],
              
            },
          ],
        },
        '\n\n\n',

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
            widths: ['30%', '35%', '35%',],

            body: productItems,
          },
        },
        '\n',
        '\n\n',
        '\n\n',
        '\n\n',
        '\n\n',
        '\n\n',
        '\n\n',
        '\n\n',

        
        {canvas: [ { type: 'line', x1: 250, y1: 0, x2: 0, y2: 0, lineWidth:1}],margin:[20,-5,0,20]},
        {text:`Authorised Signatory,`,margin:[20,-18,50,10],style: 'textSize'},'\n',
        {text:`${findCompany('cp.companyName')}`,margin:[20,-18,50,10],style: 'textSize'},
      
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
          alignment: 'center',
          bold: 'true',
        },
        tableBody: {
          border: [false, false, false, true],
          margin: [0, 5, 0, 5],
          alignment: 'center',
          fontSize: 10,
        },
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

export default PdfCreateReceipt;

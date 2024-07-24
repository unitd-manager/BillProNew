import React from 'react';
import { useParams } from 'react-router-dom';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Button } from 'reactstrap';
import moment from 'moment';
import api from '../../constants/api';
//import PdfFooter from './PdfFooter';
import PdfHeader from './PdfHeader';


const PdfPurchaseOrder = () => {
  const { id } = useParams();
  const [hfdata, setHeaderFooterData] = React.useState();
  const [products, setProducts] = React.useState([]);
  const [purchaseDetails, setPurchaseDetails] = React.useState();
  const [gTotal, setGtotal] = React. useState(0);
  const [gstTotal, setGsttotal] = React. useState(0);
  const [Total, setTotal] = React. useState(0);

  React.useEffect(() => {
    api.get('/setting/getSettingsForCompany').then((res) => {
      setHeaderFooterData(res.data.data);
     
    });
  }, []);

  const findCompany = (key) => {
    const filteredResult = hfdata.find((e) => e.key_text === key);
    return filteredResult.value;
  };
  // Gettind data from Job By Id
  const getPoProduct = () => {
    api
      .post('/purchaseorder/getPurchaseOrderById', { purchase_order_id: id })
      .then((res) => {
        setPurchaseDetails(res.data.data[0]);
        
      })
      .catch(() => {
         
      });
  };
  console.log("1111",purchaseDetails)
  const getPurchaseOrderId = () => {
    api
      .post('/purchaseorder/getPurchaseOrderByPdf', { purchase_order_id: id })
      .then((res) => {
        setProducts(res.data.data);
          //grand total
          let grandTotal = 0;
          let grand = 0;
         let gst = 0;
         res.data.data.forEach((elem) => {
           grandTotal += elem.total_price;
          //  grand += elem.actual_value;
         });
         setGtotal(grandTotal);
         gst=grandTotal*0.07
         setGsttotal(gst);
         grand=grandTotal+gst
         setTotal(grand);
      })
      .catch(() => {
         
      });
  };
  React.useEffect(() => {
    getPurchaseOrderId();
    getPoProduct();
  }, []);

  const GetPdf = () => {
    const productItems = [
      [
        {
          text: 'Sn',
          style: 'tableHead',
          
        },
        {
          text: 'Description',
          style: 'tableHead',
          alignment: 'center',
        },
        {
          text: 'Unit',
          style: 'tableHead',
        },
        {
          text: 'Qty',
          style: 'tableHead',
          alignment: 'center',
        },
        {
          text: 'Unit Price',
          style: 'tableHead',
          alignment: 'right',
        },
        {
          text: 'Amount',
          style: 'tableHead',
          alignment: 'right',
        },
      ],
    ];
    products.forEach((element, index) => {
      
      productItems.push([
        {
          text: `${index + 1}`,
          style: 'tableBody',
          border: [false, false, false, true],
          alignment: 'left',
        },
        {
          text: `${element.item_title? element.item_title : ''}`,
          border: [false, false, false, true],
          style: 'tableBody',
          alignment: 'left',
        },
        {
          text: `${element.unit? element.unit : ''}`,
          border: [false, false, false, true],
          style: 'tableBody',
          alignment: 'left',
        },
        {
          text: `${element.po_QTY ? element.po_QTY : ''}`,
          border: [false, false, false, true],
          style: 'tableBody2',
          alignment: 'left',
        },
        {
          text: `${(element.cost_price  .toLocaleString('en-IN', {  minimumFractionDigits: 2 }))}`,
          border: [false, false, false, true],
          margin: [0, 5, 0, 5],
          style: 'tableBody1',
          alignment: 'right',
        },
        {
          border: [false, false, false, true],
          text: `${(element.total_price  .toLocaleString('en-IN', {  minimumFractionDigits: 2 }))}`,
          fillColor: '#f5f5f5',
          style: 'tableBody1',
          alignment: 'right',
        },
      ]);
    });

    const dd = {
      pageSize: 'A4',
      header: PdfHeader({ findCompany }),
      pageMargins: [40, 150, 40, 80],
      //footer: PdfFooter,
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
            widths: ['101%',],

            body: [
              [
                {
                  text: `~PURCHASE ORDER~`,
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
                { text: `From:`,  bold:'true', style: ['textSize'] },
                '\n',

                {
                  text:` ${purchaseDetails.title ? purchaseDetails.title : ''}
                  ${purchaseDetails.address_flat ? purchaseDetails.address_flat : ''}
                         ${purchaseDetails.address_street ? purchaseDetails.address_street : ''}
                         ${purchaseDetails.address_country ? purchaseDetails.address_country : ''}
                         ${purchaseDetails.address_po_code ? purchaseDetails.address_po_code : ''}`,
        style: [ 'textSize'],
        bold:'true'
      },
              ],
            },
            { 
              stack: [
                {text:` Po Number :${purchaseDetails.po_code?purchaseDetails.po_code:''} `,style: [ 'textSize'],margin:[120,0,0,0]  },
                {text:` Date : ${(purchaseDetails.purchase_order_date)? moment(purchaseDetails.purchase_order_date).format('DD-MM-YYYY'):''} `,style: [ 'textSize'],margin:[120,0,0,0]  },
              //  {text:` Yr Ref No :${purchaseDetails.supplier_reference_no?purchaseDetails.supplier_reference_no:''} `,style: [ 'textSize'],margin:[120,0,0,0]  },
               // {text:` Yr Quote Date : ${(purchaseDetails.yr_quote_date)? moment(purchaseDetails.yr_quote_date).format('DD-MM-YYYY'):''} `,style: [ 'textSize'],margin:[120,0,0,0]  },
              //  {text:` Delivery Date : ${(purchaseDetails.delivery_date)? moment(purchaseDetails.delivery_date).format('DD-MM-YYYY'):''} `,style: [ 'textSize'],margin:[120,0,0,0]  },

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
            widths: ['24%','33%', '43%'],

            body: [
              [
                {
                  text: 'Terms',
                  alignment: 'left',
                  style: 'tableHead',
                },
                {
                  text: 'Payment Terms',
                  alignment: 'right',
                  style: 'tableHead',
                },
               {
                text: 'Supplier Inv Code',
               alignment: 'right',
                style: 'tableHead',
                },
              ],
              [
                {
                  text: `${purchaseDetails.delivery_terms ? purchaseDetails.delivery_terms : ''}`,
                  alignment: 'left',
                  style: 'tableBody',
                  border: [false, false, false, true],
                },
                {
                  text: `${purchaseDetails.payment_terms ? purchaseDetails.payment_terms : ''}`,
                  alignment: 'right',
                  style: 'tableBody',
                  border: [false, false, false, true],
                },
                {
                  text: `${purchaseDetails.supplier_inv_code ? purchaseDetails.supplier_inv_code : ''}`,
                  alignment: 'right',
                  border: [false, false, false, true],
                  style: 'tableBody',
                },
              ],
            ],
          },
        },

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
            widths: [20, 155,'*' , '*', 60, 83],

            body: productItems,
          },
        },
        '\n\n',
        {
          columns: [
              {
              text: `General Condition : \n${(purchaseDetails.notes ? purchaseDetails.notes : '')}`,
              alignment: 'left',
              bold: true,
              style: ['invoiceAdd', 'textSize']
            },
          
             {   stack:[
    {text:`SubTotal $ : ${(gTotal.toLocaleString('en-IN', {  minimumFractionDigits: 2 }))}`, alignment: 'right',style: [ 'textSize'], margin :[130,0,0,0] },
     '\n',
   
     {text:`GST:    ${(gstTotal.toLocaleString('en-IN', {  minimumFractionDigits: 2 }))}`,alignment: 'right', style: [ 'textSize'], margin :[160,0,0,0]  },
     '\n',
      {text:`Total $ :  ${(Total.toLocaleString('en-IN', {  minimumFractionDigits: 2 }))}`,alignment: 'right', style: [ 'textSize'], margin :[145,0,0,0] },
     
      ]},
      
            
          ],
          
        },
        '\n',
    {
        columns: [
          {
            width: '80%',
            text: `Authorized By`,
            alignment: 'right',
            bold: true,
            margin: [0, 10, 0, 10],
            style: ['invoiceAdd', 'textSize']
          },
        ],
      },
      '\n',
        {
          width: '100%',
          alignment: 'center',
          text: 'PURCHASE ORDER CREATED',
          bold: true,
          margin: [10, 10, 0, 10],
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
        Print Purchase Order
      </Button>
    </>
  );
};

export default PdfPurchaseOrder;

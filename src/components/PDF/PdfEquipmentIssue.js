import React from 'react';
import { useParams } from 'react-router-dom';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Button } from 'reactstrap';
import moment from 'moment';
import PropTypes from 'prop-types';
import api from '../../constants/api';
import PdfFooter from './PdfFooter';
import PdfHeader from './PdfHeader';

// const PdfEquipmentIssue = () => {
const PdfEquipmentIssue = ({ ProjectID }) => {
  PdfEquipmentIssue.propTypes = {
    //   id: PropTypes.any,
    ProjectID: PropTypes.any, 
  };
  const { id } = useParams();
  const [hfdata, setHeaderFooterData] = React.useState();
  const [products, setProducts] = React.useState([]);
  const [purchaseDetails, setPurchaseDetails] = React.useState([]);
  const [gTotal, setGtotal] = React.useState(0);
//   const [gstTotal, setGsttotal] = React.useState(0);
//   const [Total, setTotal] = React.useState(0);

  React.useEffect(() => {
    api.get('/setting/getSettingsForCompany').then((res) => {
      setHeaderFooterData(res.data.data);
    });
  }, []);

  const findCompany = (key) => {
    const filteredResult = hfdata.find((e) => e.key_text === key);
    return filteredResult.value;
  };
  console.log("111111",ProjectID,id)
  // Get Line Item
  const getPoProduct = () => {
    api
    //   .post('/equipmentrequest/getEquipmentRequestById', { equipment_request_id: ProjectID })
      .post('/equipmentissue/getEquipmentIssueById', { equipment_issue_id: ProjectID })
      .then((res) => {
        setPurchaseDetails(res.data.data[0]);
        //setAddLineItemModal(true);
      });
  };
  // Gettind data from Job By Id
  //   const getPoProduct = () => {
  //     api
  //       .post('/purchaseorder/getPurchaseOrderById', { purchase_order_id: id })
  //       .then((res) => {
  //         setPurchaseDetails(res.data.data[0]);

  //       })
  //       .catch(() => {

  //       });
  //   };
  const getPurchaseOrderId = () => {
    api
      .post('/equipmentissue/getEquipmentIssuesById', { equipment_issue_id: id })
      .then((res) => {
        setProducts(res.data.data);
        //grand total
        let grandTotal = 0;
        // let grand = 0;
        // let gst = 0;
        res.data.data.forEach((elem) => {
          grandTotal += elem.amount;
          //  grand += elem.actual_value;
        });
        setGtotal(grandTotal);
    //     gst = grandTotal * 0.07;
    //     setGsttotal(gst);
    //     grand = grandTotal + gst;
    //     setTotal(grand);
      })
      .catch(() => {});
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
          alignment:'center'
        },
        {
          text: 'Uom',
          style: 'tableHead',
        },
        {
          text: 'Qty',
          style: 'tableHead',
        },
        {
          text: 'Unit Price S$ ',
          style: 'tableHead',
        },
        {
          text: 'Amount S$',
          alignment:'right',
          style: 'tableHead',
        },
      ],
    ];
    products.forEach((element, index) => {
      const unitPrice = element.unit_price || 0; // Default to 0 if undefined
      const amount = element.amount || 0; // Default to 0 if undefined

      productItems.push([
        {
          text: `${index + 1}`,
          style: 'tableBody',
          border: [false, false, false, true],
        },
        {
          text: `${element.product_name ? element.product_name : ''}`,
          border: [false, false, false, true],
          style: 'tableBody',
        },
        {
          text: `${element.unit ? element.unit : ''}`,
          border: [false, false, false, true],
          style: 'tableBody',
        },
        {
          text: `${element.quantity ? element.quantity : ''}`,
          border: [false, false, false, true],
          style: 'tableBody',
        },
        {
          text: `${unitPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
          border: [false, false, false, true],
          margin: [0, 5, 0, 5],
          style: 'tableBody1',
        },
        {
          border: [false, false, false, true],
          text: `${amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
          fillColor: '#f5f5f5',
          style: 'tableBody1',
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
            widths: ['101%'],

            body: [
              [
                {
                  text: `~Equipment Issues~`,
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
                { text: `Request By   : ${
                    purchaseDetails.request_by
                      ? purchaseDetails.request_by
                      : ''
                  }`, style: ['textSize'], 
                  margin:[0,10,0,0]},
             

                {
                  text: `Request Date : ${
                    purchaseDetails.request_date
                      ? moment(purchaseDetails.request_date).format('DD-MM-YYYY')
                      : ''
                  }`,
                  style: ['textSize'],
                  margin:[0,6,0,0]
                },
                {
                    text: `Project Name : ${purchaseDetails.proj_title ? purchaseDetails.proj_title : ''}`,
                    alignment: 'left',
                    bold: true,
                    style: [ 'textSize'],
                    margin:[0,6,0,0]
                  },
              ],
            },
            {
              stack: [
                {
                  text: ` Equip/Req Code      : ${
                    purchaseDetails.equipment_request_code
                      ? purchaseDetails.equipment_request_code
                      : ''
                  } `,
                  style: ['textSize'],
                  margin: [80, 4, 0, 0],
                },
                {
                  text: `Equip/issue Date    : ${
                    purchaseDetails.equipment_issue_date
                      ? moment(purchaseDetails.equipment_issue_date).format('DD-MM-YYYY')
                      : ''
                  } `,
                  style: ['textSize'],
                  margin: [80, 4, 0, 0],
                },
                // {
                //   text: ` Shipping Method  : ${
                //     purchaseDetails.shipping_method ? purchaseDetails.shipping_method : ''
                //   } `,
                //   style: ['textSize'],
                //   margin: [80, 4, 0, 0],
                // },
                
           
                // {
                //   text: ` Payment Terms    : ${
                //     purchaseDetails.payment_terms
                //       ? (purchaseDetails.payment_terms)
                //       : ''
                //   } `,
                //   style: ['textSize'],
                //   margin: [80, 4, 0, 0],
                // },
              ],
            },
          ],
        },
     
        '\n\n\n\n',
       
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
              widths: ['50%', '51%'],
  
              body: [
                [
                  {
                    text: 'Project Name',
                    alignment: 'center',
                    style: 'tableHead',
                  },
                  {
                    text: 'Reason for issue',
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
                text: ` ${purchaseDetails.proj_title ? purchaseDetails.proj_title : ''}`,
                margin: [20, 0, 0, 0],
                alignment:'center',
                style: ['notesText', 'textSize'],
              },
              {
                text: `${purchaseDetails.reason_for_issue ? purchaseDetails.reason_for_issue : ''}`,
                alignment: 'center',
                style: ['invoiceAdd', 'textSize'],
              },
            ],
          },
          '\n',
       
        '\n',
        // '\n\n',
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
            widths: [30, 155, '*', '*',60, 83],

            body: productItems,
          },
        },
        '\n\n',
        {
          columns: [
            // {
            //   text: `General Condition : \n${purchaseDetails.notes ? purchaseDetails.notes : ''}`,
            //   alignment: 'left',
            //   bold: true,
            //   style: ['invoiceAdd', 'textSize'],
            // },

            {
              stack: [
                {
                  text: `SubTotal $ : ${gTotal.toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                  })}`,
                  style: ['textSize'],
                  alignment:'right',
                  margin: [120, 0, 10, 0],
                },
                '\n',
                

                // {
                //   text: `GST:    ${gstTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
                //   style: ['textSize'],
                //   margin: [160, 0, 0, 0],
                // },
                // '\n',
                // {
                //   text: `Total $ :  ${Total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
                //   style: ['textSize'],
                //   margin: [145, 0, 0, 0],
                // },
              ],
            },
          ],
        },
        '\n',
       
        {
            stack: [
              { text: `Approved By :`, fontSize: 10, style: ['textSize'],bold:true, margin: [10, 0, 0, 0] },
              '\n\n\n',
              { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 100, y2: 0, lineWidth: 1 }] },
              {
                text: `Authorised Signature`,
                fontSize: 10,
                style: ['textSize'],
                margin: [0, 0, 0, 0],
              },
            ],
          },
        '\n',
        // {
        //   width: '100%',
        //   alignment: 'center',
        //   text: 'Equipme CREATED',
        //   bold: true,
        //   margin: [10, 10, 0, 10],
        //   fontSize: 12,
        // },
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
        Print Equipment Issue
      </Button>
    </>
  );
};

export default PdfEquipmentIssue;

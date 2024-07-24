import React,{useState} from 'react';
import pdfMake from 'pdfmake';
import { useParams } from 'react-router-dom';
import * as Icon from 'react-feather';
import PropTypes from 'prop-types';
import moment from 'moment';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import api from '../../constants/api';
import PdfFooter from './PdfFooter';
import PdfHeader from './PdfHeader';


const PdfDeliveryOrder = ({ deliverOrderId }) => {
  PdfDeliveryOrder.propTypes = {
    deliverOrderId: PropTypes.any,
    
  };
  const { id } = useParams();
  const [hfdata, setHeaderFooterData] = React.useState();
  
  const [projectDetail, setProjectDetail] = useState();
  const [editDeliveryOrder, setEditDeliveryOrder] = React.useState();
  const[deliveryData,setdeliveryData]=React.useState();
  React.useEffect(() => {
    api.get('/setting/getSettingsForCompany').then((res) => {
      setHeaderFooterData(res.data.data);
    });
  }, [0]);

  const findCompany = (key) => {
    const filteredResult = hfdata.find((e) => e.key_text === key);
    return filteredResult.value;
  };
  
  const getProjectById = () => {
    api
      .post('/project/getProjectById', { project_id: id })
      .then((res) => {
        setProjectDetail(res.data.data[0]);
      })
      .catch(() => {});
  };
  const TabDeliveryOrder = () => {
    api
      .post('/projecttabdeliveryorder/TabDeliveryOrder', { project_id: id })
      .then((res) => {
        setdeliveryData(res.data.data[0]);
      })
      .catch(() => {
        
      });
  };
  const getPurchaseOrderId = () => {
    api
      .post('/projecttabdeliveryorder/TabDeliveryOrderHistoryId', { delivery_order_id: deliverOrderId })
      .then((res) => {
        setEditDeliveryOrder(res.data.data);
      })
      .catch(() => {
         
      });
  };
  React.useEffect(() => {
    getPurchaseOrderId();
    getProjectById();
    TabDeliveryOrder();
  }, []);
  const GetPdf = () => {
    const productItems = [
      [
        {
          text: 'S.NO',
          style: 'tableHead',
        },
        {
          text: 'PRODUCT NAME',
          style: 'tableHead',
        },

        {
          text: 'QTY',
          style: 'tableHead',
        },
        {
          text: 'REMARKS',
          style: 'tableHead',
        },
      ],
    ];
    editDeliveryOrder?.forEach((element, index) => {
      productItems.push([
        {
          text: `${index + 1}`,
          style: 'tableBody',
          border: [false, false, false, true],
        },

        {
          text: `${element.item_title ? element.item_title : ''}`,
          border: [false, false, false, true],
          style: 'tableBody',
        },
        {
          text: `${element.quantity ? element.quantity : ''}`,
          border: [false, false, false, true],
          style: 'tableBody',
        },
        {
          text: `${element.remarks ? element.remarks : ''}`,
          border: [false, false, false, true],
          style: 'tableBody',
        },
      ]);
    });

    const dd = {
      pageSize: 'A4',
      header: PdfHeader({ findCompany }),
      pageMargins: [40, 120, 40, 80],
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
                  text: 'DELIVERY ORDER',
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
              text: `${projectDetail.company_name ? projectDetail.company_name : ''}
                 ${projectDetail.address_street ? projectDetail.address_street : ''}
                 ${projectDetail.address_town ? projectDetail.address_town : ''}
                 ${projectDetail.address_country ? projectDetail.address_country : ''}
                 ${ projectDetail.address_po_code ? projectDetail.address_po_code : ''}`,
              style: ['notesText', 'textSize'],
              margin: [-250, 20, 0, 0],

              bold: 'true',
            },
          ],
        },

        {
          text: `DATE :${
            deliveryData && deliveryData.date ? moment(deliveryData.date).format('DD-MM-YYYY') : ''
          }`,
          
          style: ['invoiceAdd', 'textSize'],
          margin: [0, -60, 0, 0],
        },
        '\n\n\n\n\n\n',

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
            widths: ['10%', '41%', '20%', '30%'],

            body: productItems,
          },
        },
        '\n\n\n\n\n',
        '\n\n\n\n\n',

        {
          columns: [
            {
              stack: [
                {
                  text: 'Your Faithfully :',
                  alignment: 'left',
                  bold: true,
                  fontSize: 10,
                  style: ['invoiceAdd', 'textSize'],
                },
                '\n\n\n',
                { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 190, y2: 0, lineWidth: 1 }] },
                {
                  text: `Authorised Signature/Date`,
                  fontSize: 10,
                  style: ['textSize'],
                  margin: [0, 0, 0, 0],
                },
              ],
            },
            {
              stack: [
                '\n\n\n\n',
                {
                  canvas: [
                    {
                      type: 'line',
                      margin: [0, 0, 0, 0],
                      x1: 0,
                      y1: 0,
                      x2: 200,
                      y2: 0,
                      lineWidth: 1,
                    },
                  ],
                },
                {
                  text: `Accepted By/date`,
                  fontSize: 10,
                  style: ['textSize'],
                  margin: [0, 0, 0, 0],
                },
              ],
            },
          ],
        },
        '\n\n\n\n\n',
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
      <span onClick={GetPdf}>
        <Icon.Printer />
      </span>
    </>
  );
};

export default PdfDeliveryOrder;

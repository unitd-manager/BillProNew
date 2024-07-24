import React from 'react';
import pdfMake from 'pdfmake';
import * as Icon from 'react-feather';
import PropTypes from 'prop-types';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import api from '../../constants/api';
import PdfFooter from './PdfFooter';
import PdfHeader from './PdfHeader';

const PdfEmpTimesheet = ({ getSingleEmployeeData,selectedmonth,selectedYear }) => {
  PdfEmpTimesheet.propTypes = {
    getSingleEmployeeData: PropTypes.object.isRequired,
    selectedmonth: PropTypes.any, // Assuming selectedmonth is a number representing the month
    selectedYear:  PropTypes.any
  };
  console.log("monthend11",selectedmonth)

  const [totalEmpTimesheetRecord, setTotalEmpTimesheetRecord] = React.useState([]);
  const [hfdata, setHeaderFooterData] = React.useState([]);

  React.useEffect(() => {
    api.get('/setting/getSettingsForCompany').then((res) => {
      setHeaderFooterData(res.data.data);
    });
  
    if (getSingleEmployeeData && selectedmonth) {
      api.post('/timesheet/getAllEmpTimesheetPDFold', {
        employee_id: getSingleEmployeeData.employee_id,
        monthend: selectedmonth,
        year: selectedYear,
      }).then((res) => {
        setTotalEmpTimesheetRecord(res.data.data);
      });
    }
  }, [getSingleEmployeeData, selectedmonth,selectedYear]);
  

  console.log("getSingleEmployeeData", getSingleEmployeeData);
  console.log("totalEmpTimesheetRecord", totalEmpTimesheetRecord);

  const findCompany = (key) => {
    const filteredResult = hfdata?.find((e) => e.key_text === key);
    return filteredResult?.value || "";
  };

  const GetPdf = () => {
    const TimesheetData = Array.from({ length: 31 }, (_, index) => {
    const day = index + 1;
    // Find record for the current day if available
    const record = totalEmpTimesheetRecord.find(item => item.day === day);
    // If record exists, return an array with day and hours, else return an array with day and empty hours
    return [
      {
        text: day,
        border: [true, true, true, true],
        style: 'tableBody',
      },
      {
        text: record ? record.normal_hours : '',
        border: [true, true, true, true],
        style: 'tableBody',
      },
      {
        text: record ? record.ot_hours : '',
        border: [true, true, true, true],
        style: 'tableBody',
      },
      {
        text: record ? record.ph_hours : '',
        border: [true, true, true, true],
        style: 'tableBody',
      },
     
    ];
  });

    const dd = {
      pageSize: 'A4',
      header: PdfHeader({ findCompany }),
      pageMargins: [40, 150, 40, 80],
      footer: PdfFooter,
      content: [
        '\n',
        {
          canvas: [
            { type: 'line', x1: 0, y1: -35, x2: 510, y2: -35, lineWidth: 1 }, //Bottom line
          ],
        },
        {
          layout: {
            defaultBorder: false,
            hLineWidth: () => 1,
            hLineColor: (i) => (i === 1 || i === 0 ? '#bfdde8' : '#eaeaea'),
            hLineStyle: () => null,
            paddingLeft: () => 10,
            paddingRight: () => 10,
            paddingTop: () => 2,
            paddingBottom: () => 2,
            fillColor: () => '#fff',
          },
          table: {
            headerRows: 1,
            widths: ['104%', '41%'],
            body: [
              [{ text: ` Project Name:  ${getSingleEmployeeData.title || ''}`, style: ['textSize'] }],
              [{ text: `Direct Workers Timesheet : `, style: ['textSize'] }],
              [{ text: `Employee Name : ${getSingleEmployeeData?.first_name}`, style: ['textSize'] }],
            ],
          },
        },
        '\n\n',
        {
          style: 'tableExample',
          table: {
            body: [
              [{ text: 'Day', style: 'tableHead' },
               { text: 'NH', style: 'tableHead' }, { text: 'OT', style: 'tableHead' }, { text: 'PH', style: 'tableHead' }],
              ...TimesheetData
            ],
          },
        },
        '\n\n',
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: [100, '*', 200, '*'],
            body: [
              [{}, {}, {}, { text: 'Total', style: 'textSize' }],
              [{}, {}, { text: 'NH Total', style: 'textSize', alignment: 'center' }, { text: '270 * 140', style: 'textSize', alignment: 'center' }],
              [{}, {}, { text: 'OT Total', style: 'textSize', alignment: 'center' }, { text: '9 * 170', style: 'textSize', alignment: 'center' }],
              [{}, {}, { text: 'PH Total', style: 'textSize', alignment: 'center' }, { text: '5 * 190', style: 'textSize', alignment: 'center' }],
              [{}, {}, { text: 'Total Hours', style: 'textSize', alignment: 'center' }, { text: '284', style: 'textSize', alignment: 'center' }],
              [{}, {}, { text: 'Salary', style: 'textSize', alignment: 'center' }, { text: '29,110', style: 'textSize', alignment: 'center' }],
            ]
          },
          layout: 'lightHorizontalLines'
        },
      ],
      margin: [0, 50, 50, 50],
      styles: {
        logo: { margin: [-20, 20, 0, 0] },
        address: { margin: [-10, 20, 0, 0] },
        invoice: { margin: [0, 30, 0, 10], alignment: 'right' },
        invoiceAdd: { alignment: 'right' },
        textSize: { fontSize: 10 },
        notesTitle: { bold: true, margin: [0, 50, 0, 3] },
        tableHead: { border: [false, true, false, true], fillColor: '#eaf2f5', margin: [0, 5, 0, 5], fontSize: 7, bold: true, writingMode: 'vertical-rl' },
        tableBody: { border: [false, false, false, true], margin: [0, 5, 0, 5], alignment: 'left', fontSize: 7, bold: true, writingMode: 'vertical-rl', width: 5 },
      },
      defaultStyle: { columnGap: 20 }
    };

    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(dd, null, null, pdfFonts.pdfMake.vfs).open();
  };

  return (
    <span onClick={GetPdf}><Icon.Printer /></span>
  );
};

export default PdfEmpTimesheet;

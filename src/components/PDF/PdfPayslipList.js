import React from 'react';
import { Link } from 'react-router-dom';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import moment from 'moment';
import PropTypes from 'prop-types';
import api from '../../constants/api';
//import message from '../Message';
import PdfFooter from './PdfFooter';
import PdfHeader from './PdfHeader';

const PdfPaySlipList = ({payroll}) => {
  PdfPaySlipList.propTypes = {
    payroll: PropTypes.any,
  };
  const [hfdata, setHeaderFooterData] = React.useState();
  //const [payroll, setPayroll] = React.useState();

  React.useEffect(() => {
    api.get('/setting/getSettingsForCompany').then((res) => {
      setHeaderFooterData(res.data.data);
      console.log(res.data);
    });
  }, []);

  const findCompany = (key) => {
    const filteredResult = hfdata.find((e) => e.key_text === key);
    return filteredResult.value;
  };
  // // Gettind data from Job By Id
  // const getPayslip = () => {
  //   api
  //     .post('/PayrollManagement/getpayrollmanagementById', { payroll_management_id: id })
  //     .then((res) => {
  //       setPayroll(res.data.data[0]);
  //     })
  //     .catch(() => {
  //       message('payroll Data Not Found', 'info');
  //     });
  // };

 
  React.useEffect(() => {
    //getPayslip();
  }, []);

  const GetPdf = () => {
    const dd = {
      pageSize: 'A4',
      header: PdfHeader({ findCompany }),
      pageMargins: [40, 150, 40, 80],
      footer: PdfFooter,
      content: [
        {
          layout: {
            defaultBorder: true,
            hLineWidth: () => {
              return 1;
            },
            vLineWidth: () => {
              return 1;
            },
            hLineColor: (i) => {
              if (i === 1 || i === 0) {
                return 'black';
              }
              return 'black';
            },
            vLineColor: () => {
              return 'Black';
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
            widths: [20,40,50,15,130,100,30],
            heights: [55,0,50,0,40,0,20,20,20,5,35,20,30,30],
            headerRows: 1,
           // widths: ['105%', '51%'],

            body: [
              [
                {
                  text: 'PAYSLIP',
                  style: 'tableHeader',
                  colSpan: 4,
                  alignment: 'center',
                  fontSize:26,
                  margin: [0, 12, 0, 0],
                },
                {},
                { text: '', style: 'tableHeader', alignment: 'Left' },
                {},
              // [
              //     { type: 'line', margin: [0, 50, -150, 0], x1: 0, y1: 0, x2: 150, y2: 0, lineWidth: 1 },
              //   ],
              { text: `For the Period: \n \n ${
                moment(payroll.payslip_start_date).format('DD-MM-YYYY')
                  ? moment(payroll.payslip_start_date).format('DD-MM-YYYY')
                  : ''
              }    -   ${
                moment(payroll.payslip_end_date).format('DD-MM-YYYY')
                  ? moment(payroll.payslip_end_date).format('DD-MM-YYYY')
                  : ''
              }`,  colSpan: 3, style: 'tableHeader2' 
            },
              {},
              { text: '', alignment: 'center', colSpan: 2 },
              ],
              [
                {
                  text: 'Name of Employer',
                  style: 'tableHeader1',
                  alignment: 'center',
                  colSpan: 4,
                },
                {},
                { text: `${payroll.employee_name ? payroll.employee_name : ''}`, style: 'tableHeader', alignment: 'center' },
                {},
                { text: 'Date of Payment', alignment: 'center', colSpan: 3, style: 'tableHeader1' },
                {},
                { text: '', alignment: 'center' },
              ],
              [
                {
                  text: 'SPEEDO OFFSHORE ENGINEERING PTE LTD ',
                  style: 'tableHeader2',
                  alignment: 'center',
                  colSpan: 4,
                  margin: [0, 15, 0, 0],
                },
                {},
                { text: '', style: 'tableHeader', alignment: 'center' ,margin: [0, 10, 0, 0],},
                {},
                {
                  text:  ` ${
                    moment(payroll.generated_date).format('DD-MM-YYYY')
                      ? moment(payroll.generated_date).format('DD-MM-YYYY')
                      : ''
                  } `,
                  alignment: 'center',
                  colSpan: 3,
                  style: 'tableHeader2',
                  margin: [0, 16, 0, 0],
                },
                {},
                { text: '', alignment: 'center' },
              ],
              [
                {
                  text: 'Name of Employee',
                  style: 'tableHeader1',
                  alignment: 'center',
                  colSpan: 4,
                },
                {},
                { text: '', style: 'tableHeader', alignment: 'center' },
                {},
                { text: 'Mode of Payment', style: 'tableHeader1', alignment: 'center', colSpan: 3 },
                {},
                { text: '', alignment: 'center' },
              ],
              [
                {
                  text: `${payroll.employee_name ? payroll.employee_name : ''}`,
                  alignment: 'center',
                  colSpan: 4,
                  margin: [0, 15, 0, 0],
                  style: 'tableHeader2',
                },
                {},
                '',
                {},
                {
                  text: `${payroll.mode_of_payment ? payroll.mode_of_payment : ''}`,
                  alignment: 'center',
                  colSpan: 3,
                  margin: [0, 15, 0, 0],
                  style: 'tableHeader2',
                },
                {},
                { text: '', alignment: 'center' },
              ],
              [
                {
                  text: 'Fin Number',
                  style: 'tableHeader1',
                  alignment: 'center',
                  colSpan: 4,
                },
                {},
                { text: '', style: 'tableHeader', alignment: 'center' },
                {},
                { text: 'Employee Code', style: 'tableHeader1', alignment: 'center', colSpan: 3 },
                {},
                { text: '', alignment: 'center' },
              ],
              [
                {
                  text: `${payroll.fin_no ? payroll.fin_no : ''}`,
                  alignment: 'center',
                  colSpan: 4,
                  margin: [0, 15, 0, 0],
                  style: 'tableHeader2',
                },
                {},
                '',
                {},
                {
                  text: `${payroll.emp_code ? payroll.emp_code : ''}`,
                  alignment: 'center',
                  colSpan: 3,
                  margin: [0, 15, 0, 0],
                  style: 'tableHeader2',
                },
                {},
                { text: '', alignment: 'center' },
              ],
              [
                { text: 'Item', alignment: 'center', colSpan: 2, style: 'tableHeader1' },
                {},
                { text: 'Amount', alignment: 'center', colSpan: 2, style: 'tableHeader1' },
                {},
                {
                  text: 'Overtime Details',
                  alignment: 'center',
                  colSpan: 3,
                  style: 'tableHeader1',
                },
                {},
                { text: '', alignment: 'center' },
              ],
              [
                {
                  text:'Basic Pay',
                  
                  colSpan: 2,
                  style: 'tableHeader2',
                  margin: [0, 6, 0, 0],
                },
                {},
                {
                  text: `${payroll.basic_pay.toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                  })}`,
                  alignment: 'right',
                  colSpan: 1,
                  margin: [0, 6, 0, 0],
                  style: 'tableHeader2',
                },
                {
                  text: '[A]',
                  alignment: 'center',
                  colSpan: 1,
                  colour: 'black',
                  margin: [0, 6, 0, 0],
                  style: 'tableHeader2',
                  fillColor:'#FFE5CC'
                },
                {
                  text: 'Overtime payment Period(s)',
                  alignment: 'left',
                  style: 'tableHeader2',
                  colSpan: 1,
                  margin: [0, 6, 0, 0],
                },
                {  text: `  ${
                  moment(payroll.payslip_start_date).format('DD-MM-YYYY')
                    ? moment(payroll.payslip_start_date).format('DD-MM-YYYY')
                    : ''
                }   TO   ${
                  moment(payroll.payslip_end_date).format('DD-MM-YYYY')
                    ? moment(payroll.payslip_end_date).format('DD-MM-YYYY')
                    : ''
                } `, alignment: 'center', colSpan: 2,style: 'tableHeader2',margin: [0, 6, 0, 0], },
                {},
              ],
              [
                {
                  text: 'Total Allowance',
                  alignment: 'left',
                  colSpan: 2,
                  style: 'tableHeader2',
                  margin: [0, 6, 0, 0],
                },
                { text: '', alignment: 'right', colSpan: 1 ,style: 'tableHeader2',},
                { text: `${
                  payroll.total_alowance
                    ? payroll.total_alowance.toLocaleString('en-IN', {
                        minimumFractionDigits: 2,
                      })
                    : 0.0
                }`, alignment: 'right', margin: [0, 6, 0, 0], style: 'tableHeader2' },
                { text: '[B]', alignment: 'center', margin: [0, 6, 0, 0], style: 'tableHeader2',fillColor:'#FFE5CC' },
                {
                  text: 'Overtime Hours Worked',
                  alignment: 'left',
                  style: 'tableHeader2',
                  colSpan: 1,
                  margin: [0, 6, 0, 0],
                },
                { text: ` ${
                  payroll.ot_hours
                    ? payroll.ot_hours.toLocaleString('en-IN', {
                        minimumFractionDigits: 2,
                      })
                    : 0.0
                }`, alignment: 'center', colSpan: 2 ,style: 'tableHeader2',margin: [0, 6, 0, 0],},
                {},
              ],
              [
                { text: '', alignment: 'center', colSpan: 2, style: 'tableHeader2' },
                { text: 'Total Allowances', alignment: 'center', colSpan: 1 },
                { text: '', alignment: 'center', colSpan: 2 },
                {},
                {
                  text: 'Total Overtime Pay',
                  alignment: 'left',
                  style: 'tableHeader2',
                  margin: [0, 6, 0, 0],
                },
                {  text: ` ${
                  payroll.ot_amount
                    ? payroll.ot_amount.toLocaleString('en-IN', {
                        minimumFractionDigits: 2,
                      })
                    : 0.0
                } `, alignment: 'center',style: 'tableHeader2',margin: [0, 6, 0, 0], },
                { text: '[E]', alignment: 'center',style: 'tableHeader2',margin: [0, 6, 0, 0],fillColor:'#FFE5CC' },
              ],
              [
                { text: 'Gross(A+B)', alignment: 'center', colSpan: 2, style: 'tableHeader2' },
                { text: '', alignment: 'right', colSpan: 1 ,style: 'tableHeader2',},
                { text: `${payroll.total_basic_pay_for_month.toLocaleString('en-IN', {
                  minimumFractionDigits: 2,
                })}`, alignment: 'right',style: 'tableHeader2', },
                { text: '[C]', alignment: 'center',style: 'tableHeader2',fillColor:'#FFE5CC' },
                { text: 'Item', alignment: 'center', colSpan: 1 ,style: 'tableHeader1'},
                { text: 'Amount', alignment: 'center', colSpan: 2,style: 'tableHeader1' },
                {},
              ],
              [
                { text: '', alignment: 'center', colSpan: 2 },
                { text: 'Total Allowances', alignment: 'left', colSpan: 1,style: 'tableHeader2', },
                { text: '', alignment: 'center', colSpan: 2 },
                {},
                { text: 'Other Additional Payments (Performance Allowance)', alignment: 'left',style: 'tableHeader2',margin: [0, 8, 0, 0], },
                { text: `${
                  payroll.reimbursement
                    ? payroll.reimbursement.toLocaleString('en-IN', {
                        minimumFractionDigits: 2,
                      })
                    : 0.0
                }  \n ${
                  payroll.director_fee
                    ? payroll.director_fee.toLocaleString('en-IN', {
                        minimumFractionDigits: 2,
                      })
                    : 0.0
                } `, alignment: 'center' ,style: 'tableHeader2',margin: [0, 10, 0, 0],},
                { text: '[F]', alignment: 'center' ,style: 'tableHeader2',fillColor:'#FFE5CC',margin: [0, 10, 0, 0],},
              ],
              [
                { text: 'Total Deductions', alignment: 'left', colSpan: 2, style: 'tableHeader2',margin: [0, 2, 0, 0],  },
                { text: '430.00', alignment: 'center', colSpan: 1 ,style: 'tableHeader2',},
                { text: `${
                  payroll.total_deductions
                    ? payroll.total_deductions.toLocaleString('en-IN', {
                        minimumFractionDigits: 2,
                      })
                    : 0.0
                } `, alignment: 'right' ,style: 'tableHeader2',},
                { text: '[D]', alignment: 'center',style: 'tableHeader2',fillColor:'#FFE5CC' },
                { text: 'Annual Bonus', alignment: 'left', style: 'tableHeader2',margin: [0, 2, 0, 0],  },
                { text: '', alignment: 'center', colSpan: 2 , style: 'tableHeader2' },
                {},
              ],
              [
                {
                  text: 'Accomodation Employee CPF Advanced Loan ',
                  alignment: 'Left',
                  colSpan: 2,
                  rowSpan: 2,
                  margin: [0, 10, 0, 0],
                  style: 'tableHeader2',
                },
                { text: '', alignment: 'center', colSpan: 1 },
                { text: `0.00 \n   ${payroll.cpf_employee
                    ? payroll.cpf_employee.toLocaleString('en-IN', {
                        minimumFractionDigits: 2,
                      })
                    : 0.0
                }\n ${
                  payroll.loan_amount
                    ? payroll.loan_amount.toLocaleString('en-IN', {
                        minimumFractionDigits: 2,
                      })
                    : 0.0
                } `, alignment: 'right', colSpan: 1, rowSpan: 2 , style: 'tableHeader2',margin: [0, 10, 0, 0], },
                { text: '', rowSpan: 2, alignment: 'center' },
                { text: 'Net Pay[C-D+E+F] ', alignment: 'center', margin: [0, 6, 0, 0],style: 'tableHeader2', },
                {  text: ` ${
                  payroll.net_total
                    ? payroll.net_total.toLocaleString('en-IN', {
                        minimumFractionDigits: 2,
                      })
                    : 0.0
                }`, alignment: 'center', colSpan: 2,style: 'tableHeader2', margin: [0, 6, 0, 0], },
                {},
              ],
              [
                { text: '', alignment: 'center', colSpan: 2, rowSpan: 2, margin: [0, 10, 0, 0] },
                { text: 'Total Allowances', alignment: 'center', colSpan: 1,style: 'tableHeader2', },
                { text: '20.00 30.00 40.00 ', alignment: 'center', colSpan: 1,style: 'tableHeader2', },
                { text: '', alignment: 'center' },
                { text: 'Employer CPF Contribution ', alignment: 'center' ,margin: [0, 6, 0, 0],style: 'tableHeader2',},
                {  text: `${
                  payroll.cpf_employer
                    ? payroll.cpf_employer.toLocaleString('en-IN', {
                        minimumFractionDigits: 2,
                      })
                    : 0.0
                }`, alignment: 'center', colSpan: 2 ,style: 'tableHeader2', margin: [0, 6, 0, 0],},
                {},
              ],
            ],
          },
        },
        '\n',
        '\n',
        {
          width: '100%',
          alignment: 'center',
          text: 'PAYSLIP CREATED',
          bold: true,
          margin: [0, 10, 0, 10],
          fontSize: 12,
        },
      ],
      margin: [0, 50, 50, 50],

      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        tableHeader: {
          bold: true,
          fontSize: 22,
          color: 'black'
        },
        tableHeader1: {
          bold: true,
          fontSize: 10,
          color: 'black',
          fillColor:'#FFCC99'
        },
        tableHeader2: {
          bold: false,
          fontSize: 10,
          color: 'black',
          
        }
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
     <Link to="" onClick={GetPdf}>
        Print PaySlip
      </Link>
    </>
  );
};

export default PdfPaySlipList;

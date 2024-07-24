import React, { useState, useEffect } from 'react';
import * as Icon from 'react-feather';
import { Row, Col, Button, Card, Badge,Modal,ModalBody,ModalFooter,ModalHeader } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import $ from 'jquery';
import moment from 'moment';
import { ToastContainer } from 'react-toastify';
import message from '../../components/Message';
import 'datatables.net-buttons/js/buttons.colVis';
// import 'datatables.net-buttons/js/buttons.flash';
// import 'datatables.net-buttons/js/buttons.html5';
// import 'datatables.net-buttons/js/buttons.print';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';
import TerminatingPayslipModal from '../../components/PayrollManagement/TerminatingPayslipModal';
import UpdateOtModal from '../../components/PayrollManagement/updateOtModal';
import PrintPayslipModal from '../../components/PayrollManagement/PrintPayslipModal';
//import FileExporter from '../../components/Excelarabexport';
// import PrintIR8AModal from '../../components/PayrollManagement/PrintIR8AModal';
// import { columns } from '../../data/PayrollHR/PayrollColumn';
// import PdfPaySlipList from '../../components/PDF/PdfPaySlipList';

const Payrollmanagement = () => {
  //state variables
  const [payrollManagementsdata, setPayrollManagementsdata] = useState([]);
  const [jobInformationRecords, setJobInformationRecords] = useState([]);
  const [terminatingPayslipModal, setTerminatingPayslipModal] = useState(false);
  const [updateOtModal, setUpdateOtModal] = useState(false);
  const [terminatingPayslip, setTerminatingPayslip] = useState([]);
  const [printPayslipModal, setPrintPayslipModal] = useState(false);
  //const [printIR8AModal,setPrintIR8AModal]= useState(false);
  const [loading, setLoading] = useState(false);
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
const selectedLanguage = getSelectedLanguageFromLocalStorage();
  const [empWithoutJobInfo, setEmpWithoutJobInfo] = useState([]);
  //handleinputs
  const [arabic, setArabic] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const arb =selectedLanguage === 'Arabic'

  // const eng =selectedLanguage === 'English'
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const getArabicLabels = () => {
      api
      .get('/translation/getTranslationForPayrollManagement')
      .then((res) => {
        setArabic(res.data.data);
      })
      .catch(() => {
        // Handle error if needed
      });   
  };

  useEffect(() => {
  
    getArabicLabels();
  }, []);
  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }

  const handleInputs = (e) => {
    setPayrollManagementsdata({ ...payrollManagementsdata, [e.target.name]: e.target.value });
  };
  // Initialize default values for month and year
  const defaultMonth = moment(new Date()).subtract(1, 'months').format('MM');
  const defaultYear = moment(new Date()).format('YYYY');

  const [filterPeriod, setFilterPeriod] = useState({
    month: defaultMonth,
    year: defaultYear,
  });

  // const handleFilterInputs = (e) => {
  //   setFilterPeriod({ ...filterPeriod, [e.target.name]: e.target.value });
  // };

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const month = queryParams.get('month');
    const year = queryParams.get('year');

    if (month && year) {
      // Fetch data based on the query parameters
      setFilterPeriod({ month, year });
      // You can also call your fetch data function here if needed.
      // Example: getAllPayrollManagements();
    }
  }, [location.search]);

  //edit update ot
  //edit payroll
  const editPayrollManagementData = () => {
    navigate(`/PayrollManagement?month=${filterPeriod.month}&year=${filterPeriod.year}`);
    const grossPay =
      parseFloat(payrollManagementsdata.basicPay) +
      parseFloat(payrollManagementsdata.allowance1) +
      parseFloat(payrollManagementsdata.allowance2) +
      parseFloat(payrollManagementsdata.allowance3) +
      parseFloat(payrollManagementsdata.allowance4) +
      parseFloat(payrollManagementsdata.allowance5) +
      parseFloat(payrollManagementsdata.allowance6).parseFloat(payrollManagementsdata.ot_amount);
    const totalDeductions =
      parseFloat(payrollManagementsdata.deduction1) +
      parseFloat(payrollManagementsdata.deduction2) +
      parseFloat(payrollManagementsdata.deduction3) +
      parseFloat(payrollManagementsdata.deduction4) +
      parseFloat(payrollManagementsdata.cpf_employee) +
      parseFloat(payrollManagementsdata.loan_deduction) +
      parseFloat(payrollManagementsdata.income_tax_amount) +
      parseFloat(payrollManagementsdata.sdl) +
      parseFloat(payrollManagementsdata.pay_eucf);
    payrollManagementsdata.total_basic_pay_for_month = grossPay;
    payrollManagementsdata.net_total = grossPay - totalDeductions;
    api
      .post('/payrollmanagement/editpayrollmanagementMain', payrollManagementsdata)
      .then(() => {
        message('Record editted successfully', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 300);
      })
      .catch(() => {
        //message('Unable to edit record.', 'error');
      });
  };

  //get all records
  const getAllPayrollManagements = () => {
    setLoading(true);
    api
      .get('/payrollmanagement/getpayrollmanagementMain', {
        params: {
          month: filterPeriod.month,
          year: filterPeriod.year,
        },
      })
      .then((res) => {
        res.data.data.forEach((element) => {
          const totalallowance = element.allowance1
            ? parseFloat(element.allowance1)
            : 0 + element.allowance2
            ? parseFloat(element.allowance2)
            : 0 + element.allowance3
            ? parseFloat(element.allowance3)
            : 0 + element.allowance4
            ? parseFloat(element.allowance4)
            : 0 + element.allowance5
            ? parseFloat(element.allowance5)
            : 0 + element.allowance6
            ? parseFloat(element.allowance6)
            : 0;
          element.total_allowance = totalallowance ? parseFloat(totalallowance) : '';
        });
        setPayrollManagementsdata(res.data.data);
        $('#example').DataTable({
          pagingType: 'full_numbers',
          pageLength: 20,
          processing: true,
          dom: 'Bfrtip',
        });
        setLoading(false);
      })
      .catch(() => {
        //message('Payrollmanagement Data Not Found', 'info');
        setLoading(false);
      });
  };
  //get allarchive employee
  const getArchiveEmployees = () => {
    api
      .get('/payrollmanagement/getJobInformationTerminationPayroll')
      .then((res) => {
        setTerminatingPayslip(res.data.data);
      })
      .catch(() => {
        //message('Payrollmanagement Data Not Found', 'info');
      });
  };
  const lastmonthfirst = moment(new Date())
    .subtract(1, 'months')
    .startOf('month')
    .format('YYYY-MM-DD');

  const lastmonthlast = moment(new Date())
    .subtract(1, 'months')
    .endOf('month')
    .format('YYYY-MM-DD');

  console.log('last month first date', lastmonthfirst);
  console.log('last month last date', lastmonthlast);

  //create payroll api
  const createPayrollManagements = async (Arr) => {
    const lastmonthfirstdate = moment(new Date())
      .subtract(1, 'months')
      .startOf('month')
      .format('YYYY-MM-DD');

    const lastmonthlastdate = moment(new Date())
      .subtract(1, 'months')
      .endOf('month')
      .format('YYYY-MM-DD');
    const payrollMonth = moment(lastmonthfirstdate).format('MM');
    const payrollYear = moment(lastmonthfirstdate).format('YYYY');
    console.log('last month first date', lastmonthfirstdate);
    console.log('last month last date', lastmonthlastdate);

    console.log('filtered', Arr);
    await Arr.forEach(async (obj,index) => {
      const workingDaysInWeek = obj.working_days;
      // const daysInMonth = moment(obj.payslip_start_date);
      // const endDate = moment(obj.payslip_end_date);
      const startDate = moment(lastmonthfirstdate);
      const endDate = moment(lastmonthlastdate);
      const daysInRange = endDate.diff(startDate, 'days') + 1;
      console.log('1', daysInRange);
      console.log('obj', obj);
      console.log('2', workingDaysInWeek);

      const weeksInMonth = Math.floor(daysInRange / 7);
      console.log('3', weeksInMonth);
      const remainingDays = daysInRange - weeksInMonth * 7;
      console.log('4', remainingDays);
      const workingdaysInRanges = workingDaysInWeek * weeksInMonth + remainingDays;
      console.log('4', workingdaysInRanges);
      // Set actual_working_days
      obj.actual_working_days = workingdaysInRanges;
      obj.working_days_in_month = workingdaysInRanges;

      obj.payslip_start_date = lastmonthfirstdate;
      obj.payslip_end_date = lastmonthlastdate;
      obj.payroll_month = payrollMonth;
      obj.payroll_year = payrollYear;
      obj.status = 'generated';

      // Calculate basic_per_month based on basic_pay, actual_working_days, and working_days_in_month
      const totalBasicPay = parseFloat(obj.basic_pay);
      const actualWorkingDays = parseFloat(obj.actual_working_days);
      const workingDaysInMonth = parseFloat(obj.working_days_in_month);

      if (actualWorkingDays > 0 && workingDaysInMonth > 0) {
        const basicPayPercentage = (
          (totalBasicPay / workingDaysInMonth) *
          actualWorkingDays
        ).toFixed(2);
        obj.total_basic_pay_for_month = parseFloat(basicPayPercentage);
      }

      // // Example usage:
      // const totalBasicPayForMonth = 1000; // Replace with your value
      // const age = 60; // Replace with your age
      // calculateCpfContributions(totalBasicPayForMonth, age);

      // Ensure it's formatted as a two-decimal float
      //const grosspay = parseFloat(obj.basic_pay);
      const empID = obj.employee_id;

      console.log('employee', empID);
      await api
        .post('/payrollmanagement/getemployeeages', {
          employee_id: empID,
        })

        .then((res1) => {
          console.log('res1', res1.data.data[0]);
          // You may need to adjust this based on the actual field in your obj
          const { age } = res1.data.data[0];

          console.log('age', age);
          // Call // with empId
          //const selectedEmployeeId = obj.employee_id;
          const payrollyear = obj.payroll_year;
          const basicpays = obj.basic_pay;
         

          
          console.log('basicpay', basicpays);
          console.log('payrollyear', payrollyear);
          

              // obj.cpf_employee = cpfmployee;
              // obj.cpf_employer = cpfmployer;
              // obj.total_cpf_contribution = totalcontribution;
              obj.ot_hours=parseFloat(obj.total_ot_hours)*(parseFloat(1.5)) +parseFloat(obj.total_ph_hours)*(parseFloat(2));
              obj.ot_amount= parseFloat(obj.ot_hours)*parseFloat(obj.overtime_pay_rate);
              const normalHoursPay=parseFloat(obj.total_normal_hours)*parseFloat(obj.hourly_pay);
              const realAmount=parseFloat(normalHoursPay)+parseFloat(obj.ot_amount);

              // if(obj.pay ==='GroupPay'){
              // if(parseFloat(obj.ot_hours) > 72 ){
              //   obj.ot_hours=72;
              //   obj.ot_amount= parseFloat(obj.ot_hours)*parseFloat(obj.overtime_pay_rate);
              //   }
              //   const actualAmount=parseFloat(obj.ot_amount)+parseFloat(obj.basic_pay)
              // if(obj.total_share > actualAmount ){
              //                   obj.allowance1=parseFloat(obj.allowance1)+parseFloat(obj.total_share)-parseFloat(actualAmount)
              //                                 }
              // console.log('objectishere',obj)
              // console.log('actualamount',actualAmount)
              // }
               //if(obj.pay ==='HourlyPay'){
              console.log('obj',obj);
                if(parseFloat(obj.ot_hours) > 72 ){
                  obj.ot_hours=72;
                  obj.ot_amount= parseFloat(obj.ot_hours)*parseFloat(obj.overtime_pay_rate);
                  }
                 
                  const actualAmount=parseFloat(obj.ot_amount)+parseFloat(obj.basic_pay)
                  if(realAmount > actualAmount ){
                                    obj.allowance1=parseFloat(obj.allowance1)+parseFloat(realAmount)-parseFloat(actualAmount)
                                                  }
               
             // }
              api
                .post('/payrollmanagement/insertpayroll_management', obj)
                .then(() => {
                  //generatecpfcalculator();
                  
                 message('Payrolls created successfully.', 'success');
                  // setLoading(false);
                  if(index === Arr.length -1){
                    setTimeout(()=>{
                      window.location.reload();
                    },300)
                  }
                  
                })
                .catch(() => {
                  message('Unable to create record', 'info');
                });
          
        });
    });
   
 
  
  };

  // generate payslip
  const generateTerminatingPayslips = () => {
    api.get('/payrollmanagement/getJobInformationTerminationPayroll').then((res) => {
      setJobInformationRecords(res.data.data);
      createPayrollManagements(res.data.data);
    });
  };

  // generate payslip
  const generatePayslips = () => {
    navigate(`/PayrollManagement?month=${filterPeriod.month}&year=${filterPeriod.year}`);
    // setLoading(true);
    api.get('/projecttask/timesheettopayroll').then((res) => {
      setJobInformationRecords(res.data.data);
      console.log('jobinformationrecords', res.data.data);
      console.log('jobinformationrecords', jobInformationRecords);
      createPayrollManagements(res.data.data);
    });
  };

  //getting employee list not having jobinformation record
  const getEmployeesWithoutJobInformation = () => {
    api
      .get('/payrollmanagement/getEmployeeWithoutJobinfo')
      .then((res) => {
        setEmpWithoutJobInfo(res.data.data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    let table;

    const initializeDataTable = () => {
      table = $('#example').DataTable({
        pagingType: 'full_numbers',
        pageLength: 20,
        processing: true,
        dom: 'Bfrtip',
        searching: true,
      });
    };

    initializeDataTable();

    getAllPayrollManagements();
    getArchiveEmployees();
    //getCPf();
    getEmployeesWithoutJobInformation();

    // Make sure to destroy the DataTable before reinitializing it
    return () => {
      if (table) {
        table.destroy();
      }
    };
  }, [filterPeriod]);
  const columns = [
    {
      name: '#',
      selector: 'id',
      sortable: true,
      grow: 0,
      width: 'auto',
    },
    {
      name: 'edit',
      selector: 'edit',
      sortable: true,
      grow: 0,
      width: 'auto',
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdPayrollManagement.Employee Name')?.[genLabel],
     
      selector: 'code',
      sortable: true,
      grow: 1,
    },
    {
    
      name: arabic.find(item => item.key_text === 'mdPayrollManagement.Payslip print')?.[genLabel],
      selector: 'code',
      sortable: true,
      grow: 1,
    },
    {
      name: arabic.find(item => item.key_text === 'mdPayrollManagement.Month')?.[genLabel],
      selector: 'project',
      sortable: true,
      grow: 1,
      cell: (d) => <span>{d.closing.join(', ')}</span>,
    },
    {
      name: arabic.find(item => item.key_text === 'mdPayrollManagement.Year')?.[genLabel],
      selector: 'project',
      sortable: true,
      grow: 1,
      cell: (d) => <span>{d.closing.join(', ')}</span>,
    },
    {
      name: arabic.find(item => item.key_text === 'mdPayrollManagement.Basic Pay')?.[genLabel],
      selector: 'project',
      sortable: true,
      grow: 1,
      cell: (d) => <span>{d.closing.join(', ')}</span>,
    },
    {
      name: arabic.find(item => item.key_text === 'mdPayrollManagement.OT')?.[genLabel],
      selector: 'project',
      sortable: true,
      grow: 1,
      cell: (d) => <span>{d.closing.join(', ')}</span>,
    },
    {
      name: arabic.find(item => item.key_text === 'mdPayrollManagement.CPF(Employer)')?.[genLabel],
      selector: 'project',
      sortable: true,
      grow: 1,
      cell: (d) => <span>{d.closing.join(', ')}</span>,
    },
    {
      name: arabic.find(item => item.key_text === 'mdPayrollManagement.CPF(Employee)')?.[genLabel],
      selector: 'project',
      sortable: true,
      grow: 1,
      cell: (d) => <span>{d.closing.join(', ')}</span>,
    },
    {
      name: arabic.find(item => item.key_text === 'mdPayrollManagement.Allowance')?.[genLabel],
      selector: 'project',
      sortable: true,
      grow: 1,
      cell: (d) => <span>{d.closing.join(', ')}</span>,
    },
    {
      name: arabic.find(item => item.key_text === 'mdPayrollManagement.Deductions')?.[genLabel],
      selector: 'project',
      sortable: true,
      grow: 1,
      cell: (d) => <span>{d.closing.join(', ')}</span>,
    },
    {
      name: arabic.find(item => item.key_text === 'mdPayrollManagement.Net Pay')?.[genLabel],
      selector: 'project',
      sortable: true,
      grow: 1,
      cell: (d) => <span>{d.closing.join(', ')}</span>,
    },
    {
      name: arabic.find(item => item.key_text === 'mdPayrollManagement.Status')?.[genLabel],
      selector: 'project',
      sortable: true,
      grow: 1,
      cell: (d) => <span>{d.closing.join(', ')}</span>,
    },
    {
      name: arabic.find(item => item.key_text === 'mdPayrollManagement.ID')?.[genLabel],
      selector: 'project',
      sortable: true,
      grow: 1,
      cell: (d) => <span>{d.closing.join(', ')}</span>,
    },
  ];
  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />
        <ToastContainer></ToastContainer>
        <Button class="primary" onClick={handleShowModal}>
         Employee Name
        </Button>
           {/* Modal */}
           <Modal  size="lg" isOpen={showModal} toggle={handleCloseModal}>     
           <ModalHeader closeButton>
            
          </ModalHeader>
          <ModalBody>
            <Card style={{ padding: '10px' }}>
              <div>
                <h5>
                {arabic.find(item => item.key_text === 'mdPayrollManagement.Plase create Job information records for the below employees to make them appear in payroll')?.[genLabel]}
                </h5>
                {empWithoutJobInfo.map((el) => (
                  <span style={{ marginRight: '5px' }}>
                    <Badge>{el.employee_name}</Badge>
                  </span>
                ))}
              </div>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
        
        <Card className="p-2">
          <Row>
            <Col md="2">
              <Button
                type="submit"
                className="border btn-dark rounded"
                onClick={() => {
                  if (window.confirm('Are you sure you want to generate Payslips?')) {
                    generatePayslips();
                  }
                }}
              >
                Generate Payslips
              </Button>
            </Col>
            <Col md="2">
              <Button
                type="submit"
                className="border btn-dark rounded"
                onClick={() => {
                  setPrintPayslipModal(true);
                }}
              >
                All Payslip
              </Button>
            </Col>
            <Col md="3">
              <Button
                type="submit"
                className="border btn-dark rounded"
                onClick={() => setTerminatingPayslipModal(true)}
              >
                Generate Terminating Payslip
              </Button>
            </Col>
            <Col md="3">
              <Button
                type="submit"
                className="border btn-dark rounded"
                onClick={() => setUpdateOtModal(true)}
              >
                Update OT
              </Button>
            </Col>
            {/* <Col md="2">
              <Button
                type="submit"
                className="border btn-dark rounded"
                onClick={() => {
                  setPrintIR8AModal(true);
                }}
              >
                IR8A yearly Pdf
              </Button>
            </Col> */}
          </Row>
        </Card>
        {terminatingPayslipModal && (
          <TerminatingPayslipModal
            terminatingPayslipModal={terminatingPayslipModal}
            setTerminatingPayslipModal={setTerminatingPayslipModal}
            terminatingPayslip={terminatingPayslip}
            generateTerminatingPayslips={generateTerminatingPayslips}
          />
        )}
        {updateOtModal && (
          <UpdateOtModal
            updateOtModal={updateOtModal}
            setUpdateOtModal={setUpdateOtModal}
            payrollManagementsData={payrollManagementsdata}
            handleInputs={handleInputs}
            editPayrollManagementData={editPayrollManagementData}
          />
        )}
        {printPayslipModal && (
          <PrintPayslipModal
            printPayslipModal={printPayslipModal}
            setPrintPayslipModal={setPrintPayslipModal}
            payrollManagementsdata={payrollManagementsdata}
          />
        )}
        {/* {printIR8AModal && (
          <PrintIR8AModal
            printIR8AModal={printIR8AModal}
            setPrintIR8AModal={setPrintIR8AModal}
            payrollManagementsdata={payrollManagementsdata}
          />
        )} */}
        {/* <FileExporter/> */}
        <CommonTable
          loading={loading}
          title="Payroll Management List"
          module='Payroll Management'
          SampleButton={
            <>
           
                <Col md="6">
                  <a
                    href="http://43.228.126.245/smartco-api/storage/excelsheets/PayrollManagement.xlsx"
                    download
                  >
                    <Button color="primary" className="shadow-none">
                      Sample
                    </Button>
                  </a>
                </Col>
            
            </>
          }
        >
          <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {payrollManagementsdata &&
              payrollManagementsdata.map((element, index) => {
                return (
                  <tr key={element.payroll_management_id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/PayrollManagementDetails/${element.payroll_management_id}`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    {/* <td>{element.employee_name}</td> */}
                    <td>{arb ? element.employee_name_arb ||element.first_name_arb : element.employee_name ||element.first_name}</td>

                    <td>
                      {/* <PdfPaySlipList payroll={element}></PdfPaySlipList> */}
                    </td>
                    <td>{element.payroll_month}</td>
                    <td>{element.payroll_year}</td>
                    <td>{element.basic_pay}</td>
                    <td>{element.ot_amount}</td>
                    <td>{element.cpf_employer}</td>
                    <td>{element.cpf_employee}</td>
                    <td>{element.total_alowance}</td>
                    <td>{element.total_deductions}</td>
                    <td>{element.net_total}</td>
                    <td>{element.status}</td>
                    <td>{element.payroll_management_id}</td>
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
};

export default Payrollmanagement;

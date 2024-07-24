import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';
import $ from 'jquery';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import readXlsxFile from 'read-excel-file';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import 'bootstrap/dist/css/bootstrap.min.css';
import EmployeeCard from '../../components/dashboard/extraDashboard/EmployeeCard';
import api from '../../constants/api';
import message from '../../components/Message';
import CommonTable from '../../components/CommonTable';
import Image from '../../assets/images/users/user1.jpg';

const Cards = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllEmployees = () => {
    setLoading(true);
    api
      .get('/employeeModule/getCurrentEmployee')
      .then((res) => {
        setEmployees(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        //message('Employee Data Not Found', 'info');
        setLoading(false);
      });
  };

  
   // TRIGGER TO IMPORT EXCEL SHEET
   const importExcel = () => {
    $('#import_excel').trigger('click');
  }

  // UPLOAD FILE ON THER SERVER
  const uploadOnServer = (arr) => {
      api.post('/employeeModule/import/excel', {data: JSON.stringify(arr)})
      .then(() => {
        message('File uploaded successfully', 'success');
        $('#upload_file').val(null);
      })
      .catch(() => {
        message('Failed to upload.', 'error');
      });
  }

  // PROCESSING AND FORMATTING THE DATA
  const processData = (rows) => {
    const arr = [];
    rows.shift();

    console.log(rows[0]);
    for ( let x = 0; x < rows.length; x++ ) {
      arr.push(
        {
          Name: rows[x][0],
          Salutation: rows[x][1],
          Gender: rows[x][2],
          NricNo: rows[x][3],
          FinNo: rows[x][4],
          WpNo: rows[x][5],
          BasicPay: rows[x][6],
          HourlyCharge: rows[x][7],
          FinExpiry: rows[x][8],
          WpExpiry: rows[x][9],
          Dob: rows[x][10],
          Nationality: rows[x][11],
          Race: rows[x][12],
          YearofPR: rows[x][13],
          Occupation: rows[x][14],
          HandphoneNo: rows[x][15],
          PassportNo: rows[x][16],
          PassportExpiry: rows[x][17],
          PassType: rows[x][18],
          EmploymentStartDate: rows[x][19],
          DutiesAndResponsibilities: rows[x][20],
          Detailsofworkinghours: rows[x][21],
          Noofworkingdays: rows[x][22]
        }
      )
    }

    uploadOnServer(arr);
  }

  // IMPORTING EXCEL FILE
  const importExcelFile = (e) => {
    console.log(e.target.id)
    message('test1', 'success');
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        readXlsxFile(e.target.files[0])
          .then((rows) => {
            processData(rows);
            message('Uploading File On The Server', 'info');
          })
          .finally(() => {
            $('#upload_file').val(null);
          }).catch(
            err => console.log('Error Found:', err)
          );
      }
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
   const selectedLanguage = getSelectedLanguageFromLocalStorage();

  const [arabic, setArabic] = useState([]);


  const arb =selectedLanguage === 'Arabic'

  //const eng =selectedLanguage === 'English'
  

  const getArabicCompanyName = () => {
      api
      .get('/employeeModule/getTranslationForEmployee')
      .then((res) => {
        setArabic(res.data.data);
      })
      .catch(() => {
        // Handle error if needed
      });   
  };

  // let genLabel = '';

  // if (arb === true) {
  //   genLabel = 'arb_value';
  // } else {
  //   genLabel = 'value';
  // }


  useEffect(() => {
    getAllEmployees();
    getArabicCompanyName();
  }, []);

  return (
    <>
      <div className="pt-xs-25">
        <BreadCrumbs />
        <ToastContainer></ToastContainer>
        <CommonTable
        
          loading={loading}
          title={arb ?'قائمة موظف':'Employee List'}
          module='Employee'
          Button={
            <>
              
                <Col md="4">
                  <Link to="/EmployeeDetails">
                    <Button color="primary" className="shadow-none">
                      New
                    </Button>
                  </Link>
                </Col>
               
              
            </>
          }
          ImportButton={
            <>
             <Col md="4">
            {/* <Link to=""> */}
            <Button color="primary" className="shadow-none mr-2" onClick={() => importExcel()}>
            {arb ?'يستورد':'Import'}
              </Button>
            {/* </Link> */}
            <input type='file' style={{display: 'none'}} id="import_excel" onChange={importExcelFile} />
            </Col>
            </>
          }
          SampleButton={
            <>
          <Col md="4">
          <a
            href="http://43.228.126.245/smartco-api/storage/excelsheets/Employee.xlsx"
            download
          >
            <Button color="primary" className="shadow-none">
            {arb ?'عينة':'Sample'}
            </Button>
          </a>
        </Col>
        </>
          }
          
        >
        <p><b>{arb ?'عدد الموظفي:':'Total Employees:'} {employees.length}</b></p>
        </CommonTable>

        <Row className="employee-img">
          {employees.map((blg) => {
            console.log(blg.project_designation)
            return (
              <Col sm="6" lg="6" xl="4" key={blg.employee_id_duplicate}>
                <EmployeeCard
                  onClick={`/EmployeeEdit/${blg.employee_id_duplicate}?tab=1`}
                  image={Image}
                  id={blg.employee_id_duplicate}
                  title= {
                    arb?
                    (blg.employee_name_arb?.split(' ').shift().toUpperCase()?blg.employee_name_arb?.split(' ').shift().toUpperCase():
                    blg.employee_name_arb !== null ? '' : blg.employee_name) :blg.employee_name}  // before: title={blg.employee_name.charAt(0).toUpperCase() + blg.employee_name.slice(1)}
                  dateOfBirth={blg.date_of_birth}
                  empId={blg.employee_id_duplicate}
                  projectDesignation={arb ? blg.project_designation_arb : blg.project_designation}
                  gender={blg.gender}
                  team={blg.team}
                  empCode={blg.emp_code}
                  email={blg.login_email}
                  joinDate={blg.act_join_date}
                  arb={arb}
                  arabic={arabic}
                />
              </Col>
            )
          })}
        </Row>
      </div>
    </>
  );
};

export default Cards;

import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Badge, Button, Card, Modal,
  ModalBody,
  ModalHeader,
  ModalFooter, } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import moment from 'moment';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
// import 'datatables.net-buttons/js/buttons.html5';
// import 'datatables.net-buttons/js/buttons.print';
import { Link } from 'react-router-dom';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';

const JobInformation = () => {
  //All state variable
  const [jobInformation, setJobInformation] = useState(null);
  const [empWithoutJobInfo, setEmpWithoutJobInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  
const [showModal, setShowModal] = useState(false);

const handleCloseModal = () => setShowModal(false);
const handleShowModal = () => setShowModal(true);

  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
const selectedLanguage = getSelectedLanguageFromLocalStorage();

// Use the selected language value as needed
console.log('Selected language from localStorage:', selectedLanguage);

const arb =selectedLanguage === 'Arabic'

  // const eng =selectedLanguage === 'English'

  const [arabic, setArabic] = useState([]);

  const getArabicLabels = () => {
    api
    .get('/translation/getTranslationForJobInformation')
    .then((res) => {
      setArabic(res.data.data);
    })
    .catch(() => {
      // Handle error if needed
    });   
};
 //getting employee list not having jobinformation record
 const getEmployeesWithoutJobInformation = () => {
  api
    .get('/payrollmanagement/getEmployeeWithoutJobinfo')
    .then((res) => {
      setEmpWithoutJobInfo(res.data.data);
    
    })
    .catch(() => {
      
    });
};
let genLabel = '';

if (arb === true) {
  genLabel = 'arb_value';
} else {
  genLabel = 'value';
}

  //getting data from jobinformation
  const getJobInformation = () => {
    api
      .get('/jobinformation/getjobinformationforList')
      .then((res) => {
        setJobInformation(res.data.data);
        $('#example').DataTable({
          pagingType: 'full_numbers',
          pageLength: 20,
          processing: true,
          dom: 'Bfrtip',
          // buttons: [
          //   {
          //     extend: 'print',
          //     text: 'Print',
          //     className: 'shadow-none btn btn-primary',
          //   },
          // ],
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getJobInformation();
    getEmployeesWithoutJobInformation();
    getArabicLabels();
  }, []);
  //structure of jobinformation list view
  const columns = [
    {
      name: '#',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: 'Edit',
      selector: 'edit',
      cell: () => <Icon.Edit2 />,
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
    {
      name: arabic.find(item => item.key_text === 'mdJobInformation.EMP Code')?.[genLabel],
      selector: 'emp_code',
      sortable: true,
      grow: 0,
    },
    {
      name: arabic.find(item => item.key_text === 'mdJobInformation.Full Name')?.[genLabel],
      selector: 'employee_name',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    // {
    //   name: 'Department',
    //   selector: 'department',
    //   sortable: true,
    //   grow: 2,
    //   wrap: true,
    // },
    {
      name: arabic.find(item => item.key_text === 'mdJobInformation.S Pass No')?.[genLabel],
      selector: 'spass_no',
      sortable: true,
      grow: 0,
    },
    {
      name: arabic.find(item => item.key_text === 'mdJobInformation.FIN No')?.[genLabel],
      selector: 'fin_no',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdJobInformation.NRIC No')?.[genLabel],
      selector: 'nric_no',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdJobInformation.DOB')?.[genLabel],
      selector: 'date_of_birth',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdJobInformation.Basic Pay')?.[genLabel],
      selector: 'basic_pay',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdJobInformation.Pass Type')?.[genLabel],
      selector: 'citizen',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdJobInformation.id')?.[genLabel],
      selector: 'job_information_id',
      grow: 0,
      wrap: true,
      width: '4%',
    },
  ];

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />
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
                  {arabic.find(
                    (item) =>
                      item.key_text ===
                      'mdJobInformation.Please create Job information records for the below employees to make them appear in payroll'
                  )?.[genLabel]}
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
        <CommonTable
          loading={loading}
          title="Job Information List"
          module="Job Information"
          Button={
            <Link to="/JobInformationDetails">
              <Button color="primary" className="shadow-none mr-2">
                Add New
              </Button>
            </Link>
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
            {jobInformation &&
              jobInformation.map(
                (element, index) =>
                  element.status !== 'archive' &&
                  element.status !== 'cancel' && (
                    <tr key={element.job_information_id}>
                      <td>{index + 1}</td>
                      <td>
                        <Link to={`/JobInformationEdit/${element.job_information_id}?tab=1`}>
                          <Icon.Edit2 />
                        </Link>
                      </td>
                      <td>{element.emp_code}</td>
                      
                      <td>{arb 
    ? (element.employee_name_arb ? element.employee_name_arb : element.first_name_arb)
    : (element.employee_name ? element.employee_name : element.first_name)
  }</td>
                      {/* <td>{element.department}</td> */}
                
                      <td>{arb ? element.passport_arb : element.passport}</td>
                      <td>{arb ? element.fin_no_arb : element.fin_no}</td>
                      <td>{arb ? element.nric_no_arb : element.nric_no}</td>
                      <td>{element.date_of_birth ? moment(element.date_of_birth).format('DD-MM-YYYY') : ''}</td>
                      <td>{arb ? element.basic_pay_arb : element.basic_pay}</td>
                      <td>{arb ? element.citizen_arb : element.citizen}</td>
                      <td>{element.job_information_id}</td>
                    </tr>
                  ),
              )}
          </tbody>
        </CommonTable>
        
     
      </div>
    </div>
    
  );
  
};

export default JobInformation;

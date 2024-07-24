import React, { useState, useEffect,useContext } from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Button,
  CardTitle,
  TabContent,
  TabPane,
} from 'reactstrap';
import Swal from 'sweetalert2';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useNavigate, useParams } from 'react-router-dom';
import '../form-editor/editor.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import * as Icon from 'react-feather';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import message from '../../components/Message';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import Jobinformationedit from '../../components/JobInformation/Jobinformationedit';
import JobKeyDetails from '../../components/JobInformation/JobKeyDetails';
import JobLeaveandMedical from '../../components/JobInformation/JobLeaveandMedical';
import JobWorkingHours from '../../components/JobInformation/JobWorkingHours';
import JobProbation from '../../components/JobInformation/JobProbation';
import JobSalary from '../../components/JobInformation/JobSalary';
import JobInformationSalary from '../../components/JobInformation/JobInformationSalary';
import ViewNote from '../../components/Tender/ViewNote';
import AddNote from '../../components/Tender/AddNote';
import JobTermination from '../../components/JobInformation/JobInformationTermination';
import JobBank from '../../components/JobInformation/Job';
import Tab from '../../components/project/Tab';
import Tabs from '../../components/project/Tabs';
import AppContext from '../../context/AppContext';

const JobInformationEdit = () => {
  //All state variable
  const [activeTab, setActiveTab] = useState('1');
  const [job, setJob] = useState();
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const [JobInformationEditModal, setJobInformationEditModal] = useState(false);
  const [overTimeRate, setOverTimeRate] = useState('');
  const [allBank, setAllBank] = useState();
  const [roomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState();
  const [update, setUpdate] = useState(false);
  const [arabic, setArabic] = useState([]);
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  const { loggedInuser } = useContext(AppContext);

const selectedLanguage = getSelectedLanguageFromLocalStorage();

const arb =selectedLanguage === 'Arabic'

  //const eng =selectedLanguage === 'English'
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

useEffect(() => {
  getArabicLabels();
}, []);
  
  //navigation and parameters
  const { id } = useParams();
  const navigate = useNavigate();
  //Button fuctions
  const applyChanges = () => {};
  const backToList = () => {
    navigate('/JobInformation');
  };
  // Getting data from jobinformation By Id
  const editJobById = () => {
    api
      .post('/jobinformation/EditjobinformationById', { job_information_id: parseFloat(id) })
      .then((res) => {
        setJob(res.data.data[0]);
        setOverTimeRate(res.data.data[0].overtime_pay_rate);
      })
      .catch(() => {
        // message('JobInformation Data Not Found', 'info');
      });
  };

  //jobinformation data in jobinformationDetails
  const handleInputsJobInformation = (e) => {
    if (e.target.name === 'overtime') {
      // Check if "Yes" is selected for overtime
      if (e.target.value === '1') {
        setJob({
          ...job,
          [e.target.name]: e.target.value,
          over_time_rate: '', // Reset the overtime rate
        });
      } else {
        setJob({
          ...job,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setJob({
        ...job,
        [e.target.name]: e.target.value,
      });
    }

    // Check if the status is "current"
    if (job && job.status === 'current') {
      if (
        e.target.name === 'notice_period_for_termination' ||
        e.target.name === 'termination_date' ||
        e.target.name === 'resignation_notice_date' ||
        e.target.name === 'termination_reason' ||
        e.target.name === 'departure_date'
      ) {
        // Show an alert
        Swal.fire({
          title: 'Invalid Input',
          text: 'You cannot enter values for Termination Information when the status is "current".',
          icon: 'error',
          confirmButtonText: 'OK',
        });

        // Clear the values
        setJob({
          ...job,
          [e.target.name]: '',
          termination_date: '', // Replace 'termination_date' with the actual field name if needed
        });
      }
    }
  };

  //jobinformation data in jobinformationDetails
  // const handleInputsJobInformation = (e) => {
  //   if (e.target.name === 'overtime') {
  //     // Check if "Yes" is selected for overtime
  //     if (e.target.value === '1') {
  //       setJob({
  //         ...job,
  //         [e.target.name]: e.target.value,
  //         over_time_rate: '', // Reset the overtime rate
  //       });
  //     } else {
  //       setJob({
  //         ...job,
  //         [e.target.name]: e.target.value,
  //       });
  //     }
  //   } else {
  //     setJob({
  //       ...job,
  //       [e.target.name]: e.target.value,
  //     });
  //   }
  // };

  //Calculation for gst
  const handleRadioGst = (radioVal, overtimeRate, basicPay) => {
    /* eslint-disable */
    if (basicPay == '') {
      basicPay = 0;
    }
    if (overtimeRate == '') {
      overtimeRate = 0;
    }
    if (radioVal === '1') {
      setOverTimeRate((parseFloat(basicPay) / 30) * parseFloat(1 / 8) * parseFloat(overtimeRate));
    } else {
      setOverTimeRate(0);
    }
  };

  //Logic for editting data in db
  const editJobData = () => {
    if (job.status === 'archive') {
      // Check if the status is "archive"
      if (!job.termination_date || !job.termination_reason || !job.notice_period_for_termination || !job.resignation_notice_date || !job.departure_date) {
        // If any of the required fields is empty, show a validation error
        message('Please enter all required termination information for Archive status.', 'error');
        return; // Exit the function without making the API request
      }
    }
    
    if (job.overtime === '1' && !overTimeRate) {
      // If overtime is 1 and overTimeRate is empty, show a validation error
      message('Please enter overtime rate ', 'warninng');
      return; // Exit the function without making the API request
    }
    //job.overtime_pay_rate = overTimeRate;
    job.deduction4 = parseFloat(job.deduction4);
    if (job.act_join_date && job.working_days && job.basic_pay && job.join_date && job.govt_donation) {
      job.modification_date = creationdatetime;
      job.modified_by= loggedInuser.first_name;

      api
        .post('/jobinformation/edit-jobinformation', job)
        .then(() => {
          message('Record editted successfully', 'success');
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message(
        'Please fill Employment Start/date,basic pay,working days,join date and govt donation required fields.',
        'error',
      );
    }
  };

  const deletejobData = () => {
    Swal.fire({
      title: `Are you sure? ${id}`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        api.post('/jobinformation/deletejob_information', { job_information_id: id }).then(() => {
          Swal.fire('Deleted!', 'Your job has been deleted.', 'success');
          //window.location.reload();
        });
      }
    });
  };
  // Start for tab refresh navigation #Renuka 1-06-23
  const tabs = [
    { id: '1', name: 'Working hours' },
    { id: '2', name: 'Leave and Medical' },
    { id: '3', name: 'Probation Details (KET)' },
    { id: '4', name: 'Salary Information' },
    { id: '5', name: 'CPF Information' },
    { id: '6', name: 'Bank Information' },
    { id: '7', name: 'Termination Information' },
    { id: '8', name: 'Attachment' },
    { id: '9', name: 'Add a note' },
  ];
  const tabsArb =  [
    {id:'1',name:'ساعات العمل'},
    {id:'2',name:'الإجازة والطبية'},
    {id:'3',name:'تفاصيل الاختبار (KET)'},
    {id:'4',name:'معلومات الراتب'},
    {id:'5',name:'معلومات CPF'},
    {id:'6',name:'المعلومات المصرفية'},
    {id:'7',name:'معلومات الإنهاء'},
    {id:'8',name:'مرفق'},
    {id:'9',name:'أضف ملاحظة'},
  ];
  const toggle = (tab) => {
    setActiveTab(tab);
  };
  // End for tab refresh navigation #Renuka 1-06-23

  //for duplicating job information
  const insertJobInformation = () => {
    Swal.fire({
      title: `Are you sure? ${id}`,
      text: 'Do you wish to duplicate the job information',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok',
    }).then((result) => {
      if (result.isConfirmed) {
        api.post('/jobinformation/edit-jobinformation', { job_information_id: id }).then(() => {
          Swal.fire('Your Job Information duplicated successfully', 'success').then(() => {
            setJobInformationEditModal(true);
          });
          editJobData();
        });
      }
    });
  };

  //attachments
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
  };
  const BankDetails = () => {
    api
      .get('/bank/getBank')
      .then((res) => {
        setAllBank(res.data.data);
      })
      .catch(() => {
        //message('JobInformation Data Not Found', 'info');
      });
  };

  useEffect(() => {
    BankDetails();
    editJobById();
  
  }, [id]);

  return (
    <>
      <BreadCrumbs />
      <CardTitle>Step 1 (Job Information)</CardTitle>
      <CardTitle>
        <Label>Employee Name:</Label>
        {job && job.employee_name}
      </CardTitle>
      <CardTitle>
        {/* {job && job.fin_no ? null : (
          <>
            <Label>NRIC No:</Label>
            {job && job.nric_no}
            <br />
          </>
        )} */}
        {job && job.nric_no && !job.fin_no ? null : (
          <>
            <Label>FIN No:</Label>
            {job && job.fin_no}
          </>
        )}
      </CardTitle>

      <ToastContainer></ToastContainer>
      <Jobinformationedit
     
        editJobData={editJobData}
        // id={id}
        applyChanges={applyChanges}
        navigate={navigate}
        backToList={backToList}
        deletejobData={deletejobData}
        // insertJobInformation={insertJobInformation}
        JobInformationEditModal={JobInformationEditModal}
        setJobInformationEditModal={setJobInformationEditModal}
        job={job}
      ></Jobinformationedit>
      <Form>
        <FormGroup>
          {/* JobInformation Details */}
          <JobKeyDetails
            handleInputsJobInformation={handleInputsJobInformation}
            job={job}
            insertJobInformation={insertJobInformation}
            id={id}
          ></JobKeyDetails>

          <ComponentCard title="More Details">
          {/* {eng === true &&
        <Tab toggle={toggle} tabs={tabs} />
        } */}
        { arb === true ?
        <Tabs toggle={toggle} tabsArb={tabsArb} />:  <Tab toggle={toggle} tabs={tabs} />
        }
            <TabContent className="p-4" activeTab={activeTab}>
              <TabPane tabId="1">
                <JobWorkingHours
                arb={arb}
                arabic={arabic}
                  handleInputsJobInformation={handleInputsJobInformation}
                  job={job}
                ></JobWorkingHours>
              </TabPane>
              <TabPane tabId="2">
                <JobLeaveandMedical
                  arb={arb}
                  arabic={arabic}
                  handleInputsJobInformation={handleInputsJobInformation}
                  job={job}
                ></JobLeaveandMedical>
              </TabPane>
              <TabPane tabId="3">
                <JobProbation
                  arb={arb}
                  arabic={arabic}
                  handleInputsJobInformation={handleInputsJobInformation}
                  job={job}
                ></JobProbation>
              </TabPane>
              <TabPane tabId="4">
                <JobInformationSalary
                  arb={arb}
                  arabic={arabic}
                  handleInputsJobInformation={handleInputsJobInformation}
                  handleRadioGst={handleRadioGst}
                  job={job}
                  overTimeRate={overTimeRate}
                ></JobInformationSalary>
              </TabPane>
              <TabPane tabId="5">
                <JobSalary
                  arb={arb}
                  arabic={arabic}
                  handleInputsJobInformation={handleInputsJobInformation}
                  job={job}
                ></JobSalary>
              </TabPane>
              <TabPane tabId="6">
                <JobBank
                  arb={arb}
                  arabic={arabic}
                  handleInputsJobInformation={handleInputsJobInformation}
                  job={job}
                  allBank={allBank}
                ></JobBank>
              </TabPane>
              <TabPane tabId="7">
                <JobTermination
                  arb={arb}
                  arabic={arabic}
                  handleInputsJobInformation={handleInputsJobInformation}
                  job={job}
                ></JobTermination>
              </TabPane>
              <TabPane tabId="8">
                <Form>
                  <FormGroup>
                    <ComponentCard title="Attachments">
                      <Row>
                        <Col xs="12" md="3" className="mb-3">
                          <Button
                            className="shadow-none"
                            color="primary"
                            onClick={() => {
                              setRoomName('Booking');
                              setFileTypes(['JPG', 'JPEG', 'PNG', 'GIF', 'PDF']);
                              dataForAttachment();
                              setAttachmentModal(true);
                            }}
                          >
                            <Icon.File className="rounded-circle" width="20" />
                          </Button>
                        </Col>
                      </Row>
                      <AttachmentModalV2
                        moduleId={id}
                        attachmentModal={attachmentModal}
                        setAttachmentModal={setAttachmentModal}
                        roomName={roomName}
                        fileTypes={fileTypes}
                        altTagData="BookingRelated Data"
                        desc="BookingRelated Data"
                        recordType="RelatedPicture"
                        mediaType={attachmentData.modelType}
                        update={update}
                        setUpdate={setUpdate}
                      />
                      <ViewFileComponentV2
                        moduleId={id}
                        roomName="Booking"
                        recordType="RelatedPicture"
                        update={update}
                        setUpdate={setUpdate}
                      />
                    </ComponentCard>
                  </FormGroup>
                </Form>
              </TabPane>
              <TabPane tabId="9">
                {/* ADD NOTE */}
                <ComponentCard title="Add a note">
                  <AddNote recordId={id} roomName="JobInfoEdit" />
                  <ViewNote recordId={id} roomName="JobInfoEdit" />
                </ComponentCard>
              </TabPane>
            </TabContent>
          </ComponentCard>
        </FormGroup>
      </Form>
    </>
  );
};
export default JobInformationEdit;

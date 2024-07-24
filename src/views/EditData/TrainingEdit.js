import React, { useEffect, useState, useContext } from 'react';
import { Row, Col, Input, Button, Form, FormGroup, TabContent, TabPane } from 'reactstrap';
import { useNavigate, useParams,Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import random from 'random';
import * as $ from 'jquery';
import * as Icon from 'react-feather';
import Select from 'react-select';
import Swal from 'sweetalert2';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';
import TrainingCompany from '../../components/Training/TrainingCompany';
import TrainingMainDetails from '../../components/Training/TrainingMainDetails';
//import TrainingButton from '../../components/Training/TrainingButton';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
//import ComponentCardV2 from '../../components/ComponentCardV2';
import ApiButton from '../../components/ApiButton';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';
import Tab from '../../components/project/Tab';
import Tabs from '../../components/project/Tabs';

const TrainingEdit = () => {
  //All state variables
  const [activeTab, setActiveTab] = useState('1');
  const [trainingDetails, setTrainingDetails] = useState();
  const [employeeLinked, setEmployeeLinked] = useState();
  const [prevEmployee, setPreviousEmployee] = useState();
  const [RoomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState('');
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const [update, setUpdate] = useState(false);
  const [apiedit, setApiEdit] = useState(false);
  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();
  const { loggedInuser } = useContext(AppContext);
  const tabs = [
    { id: '1', name: 'Linked Employee' },
    { id: '2', name: 'Attachments' },
    
  ];
  const tabsArb = [
    { id: '1', name: 'الموظف المرتبط' },
    { id: '2', name: 'المرفقات' },
   
  ];
  const toggle = (tab) => {
    setActiveTab(tab);
  };
  //Button fuctions
  // const applyChanges = () => {};
  const backToList = () => {
    navigate('/Training');
  };
  //setting data in training details
  const handleInputs = (e) => {
    setTrainingDetails({ ...trainingDetails, [e.target.name]: e.target.value });
  };
  // Addline item in Link employee
  const [addLineItem, setAddLineItem] = useState([
    {
      id: random.int(1, 99),
      employee_name: '',
      employee_id: '',
      from_date: '',
      to_date: '',
    },
  ]);
  //Onchange item in training staff employee name selectfield
  const onchangeItem = (str, itemId) => {
    // Check if the selected employee name already exists in prevEmployee
    const isEmployeeNameAlreadySelected = prevEmployee.some(
      (item) => item.employee_name === str.label,
    );

    if (isEmployeeNameAlreadySelected) {
      alert('Employee name already exists in the list.');
      // Reset addLineItem
      setAddLineItem([
        {
          id: random.int(1, 99),
          employee_name: '',
          employee_id: '',
          from_date: '',
          to_date: '',
        },
      ]);
    } else {
      const element = addLineItem.find((el) => el.id === itemId);
      const isNameInAddLineItem = addLineItem.some((item) => item.employee_name === str.label);

      if (!isNameInAddLineItem) {
        // Update the selected employee name
        element.employee_name = str.label;
        element.employee_id = str.value.toString();
        setAddLineItem([...addLineItem]);
      } else {
        alert('Employee name already exists in the addLineItem.');
        // Reset addLineItem
        setAddLineItem([
          {
            id: random.int(1, 99),
            employee_name: '',
            employee_id: '',
            from_date: '',
            to_date: '',
          },
        ]);
      }
    }
  };

  // Add new line item in link Employee
  const AddNewLineItem = () => {
    setAddLineItem([
      ...addLineItem,
      {
        id: random.int(1, 99),
        employee_name: '',
        employee_id: '',
        from_date: '',
        to_date: '',
      },
    ]);
  };
  //getting Training Staff data by training id
  const getLinkedEmployee = () => {
    // eslint-disable-next-line
    api
      .post('/training/getTrainingStaffById', { training_id: id })
      .then((res) => {
        const resData = res.data.data;
        const empArray = [];
        resData.forEach((element) => {
          empArray.push({
            id: random.int(1, 99),
            employee_name: element.employee_name,
            employee_id: element.employee_id,
            from_date: element.from_date && element.from_date.substring(0, 10),
            to_date: element.to_date && element.to_date.substring(0, 10),
            training_staff_id: element.training_staff_id,
          });
        });

        setPreviousEmployee([...empArray]);
      })
      .catch(() => {
        message('Training Data Not Found', 'info');
      });
  };
  //getting Training data by training id
  const getTrainingeById = () => {
    api
      .post('/training/getTrainingById', { training_id: id })
      .then((res) => {
        setTrainingDetails(res.data.data[0]);
      })
      .catch(() => {
        message('Training Data Not Found', 'info');
      });
  };
  //Get employee name and id for linked employee select field
  const getEmployee = () => {
    api.get('/training/getEmployeeName', employeeLinked).then((res) => {
      const items = res.data.data;
      const finaldat = [];
      items.forEach((item) => {
        finaldat.push({ value: item.employee_id, label: item.employee_name });
      });
      setEmployeeLinked(finaldat);
    });
  };
  //edit data in link employee
  const insertTrainingStaff = (trainingId, staffObj) => {
    if (new Date(staffObj.to_date) > new Date(staffObj.from_date)) {
      staffObj.creation_date = creationdatetime;
      staffObj.created_by= loggedInuser.first_name;
      api
        .post('/training/insertTrainingStaff', {
          training_id: trainingId,
          employee_id: staffObj.employee_id,
          staff_id: '',
          created_by: '1',
          modified_by: '1',
          from_date: staffObj.from_date,
          to_date: staffObj.to_date,
        })
        .then(() => {
          message('TrainingStaff Added!', 'success');
          setApiEdit(!apiedit);
        })
        .catch(() => {
          message('Unable to insert record.', 'error');
        });
    } else {
      message('The To date should be the future date of From date', 'error');
    }
  };
  //insert training staff
  const insertStaff = async (formalArray) => {
    try {
      await formalArray.forEach((pItems) => {
        if (pItems.item !== '') {
          if (pItems.employee_id !== '') {
            insertTrainingStaff(id, pItems);
          }
        }
      });

      // await setTimeout(() => {
      //     window.location.reload()
      //   }, 1000);
    } catch (err) {
      message('Unable to delete record.', 'error');
    }
  };

  

  //Insert Training
  const insertTrainingData = () => {
    const result = [];
    const oldArray = addLineItem;
    $('.newemp tbody tr').each(function input() {
      const allValues = {};
      $(this)
        .find('input')
        .each(function output() {
          const fieldName = $(this).attr('name');
          allValues[fieldName] = $(this).val();
        });
      result.push(allValues);
    });
    result.forEach((obj) => {
      if (obj.id) {
        /* eslint-disable */
        const foundObj = oldArray.find((el) => el.id === parseInt(obj.id));
        if (foundObj) {
          obj.employee_id = foundObj.employee_id;
        }
      }
    });
    if ((new Date(trainingDetails.to_date) == new Date(trainingDetails.from_date)) ||(new Date(trainingDetails.to_date) > new Date(trainingDetails.from_date))) {
      if (trainingDetails.title !== '') {
        trainingDetails.modification_date = creationdatetime;
        trainingDetails.modified_by= loggedInuser.first_name;
        //Update training
        api
          .post('/training/edit-Training', trainingDetails)
          .then(() => {
            message('Record editted successfully', 'success');
            insertStaff(result);
          })
          .catch(() => {
            message('Unable to edit record.', 'error');
          });
      } else {
        message('Please fill all required fields', 'error');
      }
    } else {
      message('The To date should be the future date of From date', 'error');
    }
  };
  const deleteData = () => {
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
        api.post('/training/deleteTraining', { training_id: id }).then(() => {
          Swal.fire('Deleted!', 'Your employee has been deleted.', 'success');
          window.location.reload();
        });
      }
    });
  };
  // Clear row value
  const ClearValue = (ind) => {
    setAddLineItem((current) =>
      current.filter((obj) => {
        return obj.id !== ind.id;
      }),
    );
  };

  //Attachments
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
  };

  useEffect(() => {
    getEmployee();
    getLinkedEmployee();
    getTrainingeById();
  }, [id]);

  useEffect(() => {
    getEmployee();
    getLinkedEmployee();
    getTrainingeById();
    setAddLineItem([
      {
        id: random.int(1, 99),
        employee_name: '',
        employee_id: '',
        from_date: '',
        to_date: '',
      },
    ]);
  }, [apiedit]);

  // //Delete Training staff data by training staff id
  //   const deleteTrainingStaffData = (staffId) => {
  //     api.post('/training/deleteTrainingStaff', { training_staff_id: staffId })
  //       .then(() => {
  //         message('Record deleted successfully', 'success')
  //         setTimeout(() => {
  //           window.location.reload()
  //         }, 300);
  //       })
  //       .catch(() => {
  //         message('Unable to delete record.', 'error')
  //       })
  //   }
  const deleteTrainingStaffData = (staffId) => {
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
        api.post('/training/deleteTrainingStaff', { training_staff_id: staffId }).then(() => {
          Swal.fire('Deleted!', 'Your employee has been deleted.', 'success');
          window.location.reload();
        });
      }
    });
  };
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };

  const selectedLanguage = getSelectedLanguageFromLocalStorage();

  // Use the selected language value as needed
  console.log('Selected language from localStorage:', selectedLanguage);
 
  const [arabic, setArabic] = useState([]);

  const arb = selectedLanguage === 'Arabic';

  const eng = selectedLanguage === 'English';

  const getArabicCompanyName = () => {
    api
      .get('/training/getTranslationforHRTraining')
      .then((res) => {
        setArabic(res.data.data);
      })
      .catch(() => {
        // Handle error if needed
      });
  };

  console.log('arabic', arabic);
  useEffect(() => {
    getArabicCompanyName();
  }, []);

  
  return (
    <> 
    {arb === true ?<BreadCrumbs heading={trainingDetails && trainingDetails.title_arb} />:<BreadCrumbs heading={trainingDetails && trainingDetails.title} />}
    
      {/* <BreadCrumbs heading={trainingDetails && trainingDetails.title} /> */}
      <Form>
        <FormGroup>
          <ToastContainer></ToastContainer>
          
            {/* Save,Apply Buttons */}
            {/* <TrainingButton navigate={navigate} insertTrainingData={insertTrainingData} applyChanges={applyChanges} backToList={backToList}></TrainingButton> */}
            <ApiButton
              editData={insertTrainingData}
              navigate={navigate}
             // applyChanges={insertTrainingData}
              backToList={backToList}
              module="Training"
              deleteData={deleteData}
            ></ApiButton>
         
        </FormGroup>
      </Form>

      {/* Main Details */}
      <TrainingMainDetails
       arb={arb}
       arabic={arabic}
      
        trainingDetails={trainingDetails}
        handleInputs={handleInputs}
      ></TrainingMainDetails>

      {/* Training Company Form */}
      <TrainingCompany
       arb={arb}
       arabic={arabic}
      
        trainingDetails={trainingDetails}
        handleInputs={handleInputs}
      ></TrainingCompany>
 <ComponentCard title="More Details">
{ arb === true ?
        <Tabs toggle={toggle} tabsArb={tabsArb} />: <Tab toggle={toggle} tabs={tabs} />
        }

        <TabContent className="p-4" activeTab={activeTab}>
       
<TabPane tabId="1">

      <ComponentCard>
        {/* Training Staff */}
        <Row>
          <table className="lineitem  border border-secondary rounded">
            <thead>
              <tr>
                <th scope="col">{arb ? 'اسم الموظف' : ' Employee Name' }</th>
                <th scope="col">{arb ? 'من التاريخ' : ' From Date' }</th>
                <th scope="col">{arb ? 'ان يذهب في موعد' : ' To date' }</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {prevEmployee &&
                prevEmployee.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td data-label="Employee Name">
                        <Select
                          key={item.id}
                          defaultValue={{ value: item.employee_id, label: item.employee_name }}
                          isDisabled={false}
                          options={employeeLinked}
                        />
                        <Input
                          value={item.employee_id.toString()}
                          type="hidden"
                          name="employee_id"
                        ></Input>
                      </td>
                      <td data-label="From Date">
                        <p>{item.from_date}</p>
                      </td>
                      <td data-label="To Date">
                        <p>{item.to_date}</p>
                      </td>
                      <td>
                        <Input type="hidden" name="id" defaultValue={item.id}></Input>
                      </td>
                      {/* delete button from training staff*/}
                      <td>
                        <Button
                          color="danger"
                          className="shadow-none"
                          onClick={() => {
                            {
                              deleteTrainingStaffData(item.training_staff_id);
                            }
                          }}
                        >
                          {arb?'يمسح':'Delete'}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </Row>
        <br />
        <Row>
          <Col md="3">
            <Button
              color="primary"
              className="shadow-none"
              type="button"
              onClick={() => {
                AddNewLineItem();
              }}
            >
              {arb?'الموظف المرتبط': 'Linked Employee'}
            </Button>
          </Col>
        </Row>
        <br />
        <Row>
          <table className="lineitem newemp border border-secondary rounded">
            <thead>
              <tr>
              <th scope="col">{arb ? 'اسم الموظف' : ' Employee Name' }</th>
                <th scope="col">{arb ? 'من التاريخ' : ' From Date' }</th>
                <th scope="col">{arb ? 'ان يذهب في موعد' : ' To date' }</th>
                </tr>
            </thead>
            <tbody>
              {addLineItem.map((item) => {
                return (
                  <tr key={item.id}>
                    <td data-label="Employee Name">
                      <Select
                        key={item.id}
                        defaultValue={{ value: item.employee_id, label: item.employee_name }}
                        onChange={(e) => {
                          onchangeItem(e, item.id);
                        }}
                        options={employeeLinked}
                      />
                      <Input
                        value={item.employee_id.toString()}
                        type="hidden"
                        name="employee_id"
                      ></Input>
                    </td>
                    <td data-label="From Date">
                      <Input type="date" defaultValue={item && item.from_date} name="from_date" />
                    </td>
                    <td data-label="To Date">
                      <Input
                        type="date"
                        defaultValue={item && item.to_date}
                        min={new Date(item && item.from_date)}
                        name="to_date"
                      />
                    </td>
                    <td>
                      <Input type="hidden" name="id" defaultValue={item.id}></Input>
                    </td>
                    <td data-label="Action">
                      <Link to="">
                        <Input type="hidden" name="id" defaultValue={item.id}></Input>
                        <span
                          onClick={() => {
                            ClearValue(item);
                          }}
                        >
                         {arb?'واضح': 'Clear'}
                        </span>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Row>
      </ComponentCard>
      </TabPane>
      <TabPane tabId="2">

{/* Attachment */}
<Form>
  <FormGroup>
    <ComponentCard title={arb ? 'المرفقات':"Attachments"}>
      <Row>
        <Col xs="12" md="3" className="mb-3">
          <Button
            className="shadow-none"
            color="primary"
            onClick={() => {
              setRoomName('Training');
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
      arb={arb}
      arabic={arabic}
        moduleId={id}
        attachmentModal={attachmentModal}
        setAttachmentModal={setAttachmentModal}
        roomName={RoomName}
        fileTypes={fileTypes}
        altTagData="TrainingRelated Data"
        desc="TrainingRelated Data"
        recordType="TrainingRelatedPicture"
        mediaType={attachmentData.modelType}
        update={update}
        setUpdate={setUpdate}
      />
      <ViewFileComponentV2
      arb={arb}
      arabic={arabic}
        moduleId={id}
        roomName="Training"
        recordType="TrainingRelatedPicture"
        update={update}
        setUpdate={setUpdate}
      />
    </ComponentCard>
  </FormGroup>
</Form>
</TabPane>
      </TabContent>
      </ComponentCard>
    </>
  );
};
export default TrainingEdit;

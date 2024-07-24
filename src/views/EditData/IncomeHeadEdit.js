import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardBody,
} from 'reactstrap';
import Swal from 'sweetalert2';
import IncomeHeadModal from '../../components/Tender/IncomeHeadModal';
import ComponentCard from '../../components/ComponentCard';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import message from '../../components/Message';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import api from '../../constants/api';
//import IncomeButton from '../../components/IncomeHeadTable/IncomeButton';
import IncomeHeadMainDetails from '../../components/IncomeHeadTable/IncomeHeadMainDetails';
import IncomeHeadSubHead from '../../components/IncomeHeadTable/IncomeHeadSubHead';
import creationdatetime from '../../constants/creationdatetime';
import ApiButton from '../../components/ApiButton';

const IncomeEdit = () => {
  //Const Variables
  const [IncomeSuphead, SetIncomeSuphead] = useState(false);
  const [incomeData, setIncomeData] = useState();
  const [incomeDetails, setIncomeDetails] = useState();
  const [addContactModal, setAddContactModal] = useState(false);
  const [SubincomeDetails, setSubIncomeDetails] = useState(null);
  const [incomehead, SetincomeHead] = useState({
    title: '',
  });
  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();

  //Setting data in expenseDetails
  const handleInputs = (e) => {
    setIncomeDetails({ ...incomeDetails, [e.target.name]: e.target.value });
  };
  //Setting data in expenseHead
  const handleAddNewContact = (e) => {
    SetincomeHead({ ...incomehead, [e.target.name]: e.target.value });
  };
  // TOGGLE
  const addContactToggle = () => {
    setAddContactModal(!addContactModal);
  };
  // Button
  //const applyChanges = () => {};
  const backToList = () => {
    navigate('/Incomehead');
  };
  //  Api Get Expense By Id
  const editIncomeById = () => {
    api
      .post('/incomehead/getIncomeHeadByid', { income_group_id: id })
      .then((res) => {
        setIncomeDetails(res.data.data[0]);
      })
      .catch(() => {
        message('IncomeHead Data Not Found', 'info');
      });
  };
  //Logic for edit data in db
  const editIncomeData = () => {
    if (incomeDetails.title !== '') {
      incomeDetails.modification_date = creationdatetime;
      api
        .post('/incomehead/editIncomeHead', incomeDetails)
        .then(() => {
          message('Record editted successfully', 'success');
          //navigate('/ExpenseHead');

        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };

  //  Subhead By id
  const SubIncomeById = () => {
    api.post('/incomehead/getIncomeSubHeadLinkedById', { income_group_id: id }).then((res) => {
      setSubIncomeDetails(res.data.data);
    });
  };


  //Api Insert ExpenseHead
  const AddNewSubHead = () => {
    if (incomehead.title !== '') {
      const IncomeHeadIncomeId = incomehead;
      IncomeHeadIncomeId.income_group_id = id;
      api
        .post('/incomehead/insertInc', IncomeHeadIncomeId)
        .then(() => {
          message('Income inserted successfully.', 'success');
          window.location.reload();
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };
  // Delete Contact
  const deleteRecord = (staffId) => {
    Swal.fire({
      title: `Are you sure? `,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .post('/incomehead/deleteInc', { income_sub_group_id: staffId })
          .then(() => {
            Swal.fire('Deleted!', 'Contact has been deleted.', 'success');
            message('Record deleted successfully', 'success');
            window.location.reload();
          })
          .catch(() => {
            message('Unable to delete record.', 'error');
          });
      }
    });
  };
 
  useEffect(() => {
    editIncomeById();
    SubIncomeById();

  }, [id]);

  return (
    <>
      <BreadCrumbs heading={incomeDetails && incomeDetails.title} />
      {/* button */}
      {/* <IncomeButton
        editIncomeData={editIncomeData}
        navigate={navigate}
        applyChanges={applyChanges}
        backToList={backToList}
      ></IncomeButton> */}
<ApiButton
              editData={editIncomeData}
              navigate={navigate}
              applyChanges={editIncomeData}
              //deleteData={deleteBookingData}
              backToList={backToList}
              module="IncomeHead"
            ></ApiButton>
      {/* Income Head Details */}
      <ComponentCard title="Income Head Details" creationModificationDate={incomeDetails}>
        <IncomeHeadMainDetails
          handleInputs={handleInputs}
          incomeDetails={incomeDetails}
        ></IncomeHeadMainDetails>
      </ComponentCard>

      {/* Expense sup Head */}
      <ComponentCard title="Income Sup Head Linked">
        <ToastContainer></ToastContainer>
        <Row>
          {/* // ExpenseHeadSubHead Table */}
          <IncomeHeadSubHead
            SubincomeDetails={SubincomeDetails}
            setIncomeData={setIncomeData}
            SetIncomeSuphead={SetIncomeSuphead}
            deleteRecord={deleteRecord}
          ></IncomeHeadSubHead>
          {/*IncomeHead edit modal*/}
          <IncomeHeadModal
            IncomeSuphead={IncomeSuphead}
            SetIncomeSuphead={SetIncomeSuphead}
            incomeData={incomeData}
          />
        </Row>
        <Row>
          <Col md="3">
            <FormGroup>
              <Button color="primary" className="shadow-none" onClick={addContactToggle.bind(null)}>
                Add Income Sup Head{' '}
              </Button>
              {/* Expense SubHead insert modal */}
              <Modal size="lg" isOpen={addContactModal} toggle={addContactToggle.bind(null)}>
                <ModalHeader toggle={addContactToggle.bind(null)}>Sub Head</ModalHeader>
                <ModalBody>
                  <Row>
                    <Col md="12">
                        <CardBody>
                          <Form>
                            <Row>
                              <Col md="12">
                                <FormGroup>
                                  <Label>Title</Label>
                                  <Input
                                    type="text"
                                    name="title"
                                    onChange={handleAddNewContact}
                                    value={incomehead && incomehead.title}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          </Form>
                        </CardBody>
                    </Col>
                  </Row>
                </ModalBody>
                <ModalFooter>
                  <Button
                    className="shadow-none"
                    color="primary"
                    onClick={() => {
                      AddNewSubHead();
                    }}
                  >
                    Submit
                  </Button>
                  <Button
                    color="secondary"
                    className="shadow-none"
                    onClick={addContactToggle.bind(null)}
                  >
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            </FormGroup>
          </Col>
        </Row>
      </ComponentCard>
    </>
  );
};
export default IncomeEdit;

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
import ExpenseHeadModal from '../../components/Tender/ExpenseHeadModal';
import ComponentCard from '../../components/ComponentCard';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import message from '../../components/Message';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import api from '../../constants/api';
//import ExpenseButton from '../../components/ExpenseHeadTable/ExpenseButton';
import ExpenseHeadMainDetails from '../../components/ExpenseHeadTable/ExpenseHeadMainDetails';
import ExpenseHeadSubHead from '../../components/ExpenseHeadTable/ExpenseHeadSubHead';
import creationdatetime from '../../constants/creationdatetime';
import ApiButton from '../../components/ApiButton';

const ExpenseEdit = () => {
  //Const Variables
  const [ExpenseSuphead, SetExpenseSuphead] = useState(false);
  const [expenseData, setExpenseData] = useState();
  const [expenseDetails, setExpenseDetails] = useState();
  const [addContactModal, setAddContactModal] = useState(false);
  const [SubexpenseDetails, setSubExpenseDetails] = useState(null);
  const [expensehead, SetexpenseHead] = useState({
    title: '',
  });
  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();

  //Setting data in expenseDetails
  const handleInputs = (e) => {
    setExpenseDetails({ ...expenseDetails, [e.target.name]: e.target.value });
  };
  //Setting data in expenseHead
  const handleAddNewContact = (e) => {
    SetexpenseHead({ ...expensehead, [e.target.name]: e.target.value });
  };
  // TOGGLE
  const addContactToggle = () => {
    setAddContactModal(!addContactModal);
  };
  // Button
  //const applyChanges = () => {};
  const backToList = () => {
    navigate('/Expensehead');
  };
  //  Api Get Expense By Id
  const editExpenseById = () => {
    api
      .post('/expensehead/getExpenseHeadByid', { expense_group_id: id })
      .then((res) => {
        setExpenseDetails(res.data.data[0]);
      })
      .catch(() => {
        message('ExpenseHead Data Not Found', 'info');
      });
  };
  //Logic for edit data in db
  const editExpenseData = () => {
    if (expenseDetails.title !== '') {
      expenseDetails.modification_date = creationdatetime;
      api
        .post('/expensehead/editExpenseHead', expenseDetails)
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
  const SubExpenseById = () => {
    api.post('/expensehead/getExpenseSubHeadLinkedById', { expense_group_id: id }).then((res) => {
      setSubExpenseDetails(res.data.data);
    });
  };

  const [subExpenseRec, setSubExpenseRec] = useState([]);

  // ... Other functions ...

  // Api Get Expense SubHead Cannot Edit
  const getExpenseSubHeadCannotEdit = () => {
    api
      .post('/expensehead/getExpenseSubHeadcannotedit', { expense_group_id: id })
      .then((res) => {
        setSubExpenseRec(res.data.data);
      })
      .catch(() => {
        message('Unable to fetch data.', 'error');
      });
  };

  useEffect(() => {
  
    getExpenseSubHeadCannotEdit();

  }, []);


  //Api Insert ExpenseHead
  const AddNewSubHead = () => {
    if (expensehead.title !== '') {
      const ExpenseHeadExpenseId = expensehead;
      ExpenseHeadExpenseId.expense_group_id = id;
      api
        .post('/expensehead/insertExp', ExpenseHeadExpenseId)
        .then(() => {
          message('Expense inserted successfully.', 'success');
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
          .post('/expensehead/deleteExp', { expense_sub_group_id: staffId })
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
    editExpenseById();
    SubExpenseById();

  }, [id]);

  return (
    <>
      <BreadCrumbs heading={expenseDetails && expenseDetails.title} />
      {/* button */}
      {/* <ExpenseButton
        editExpenseData={editExpenseData}
        navigate={navigate}
        applyChanges={applyChanges}
        backToList={backToList}
      ></ExpenseButton> */}
<ApiButton
              editData={editExpenseData}
              navigate={navigate}
              applyChanges={editExpenseData}
              //deleteData={deleteBookingData}
              backToList={backToList}
              module="ExpenseHead"
            ></ApiButton>
      {/* Expense Head Details */}
      <ComponentCard title="Expense Head Details" creationModificationDate={expenseDetails}>
        <ExpenseHeadMainDetails
          handleInputs={handleInputs}
          expenseDetails={expenseDetails}
        ></ExpenseHeadMainDetails>
      </ComponentCard>

      {/* Expense sup Head */}
      <ComponentCard title="Expense Sup Head Linked">
        <ToastContainer></ToastContainer>
        <Row>
          {/* // ExpenseHeadSubHead Table */}
          <ExpenseHeadSubHead
            SubexpenseDetails={SubexpenseDetails}
            setExpenseData={setExpenseData}
            SetExpenseSuphead={SetExpenseSuphead}
            deleteRecord={deleteRecord}
            subExpenseRec={subExpenseRec}
          ></ExpenseHeadSubHead>
          {/*ExpenseHead edit modal*/}
          <ExpenseHeadModal
            ExpenseSuphead={ExpenseSuphead}
            SetExpenseSuphead={SetExpenseSuphead}
            expenseData={expenseData}
          />
        </Row>
        <Row>
          <Col md="3">
            <FormGroup>
              <Button color="primary" className="shadow-none" onClick={addContactToggle.bind(null)}>
                Add Expense Sup Head{' '}
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
                                    value={expensehead && expensehead.title}
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
export default ExpenseEdit;

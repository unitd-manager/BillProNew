import React, { useState, useEffect } from 'react';
import {
  Row,
  Form,
  ModalFooter,
  Modal,
  ModalHeader,
  ModalBody,
  Table,
  Label,
  Input,
  Col,
  FormGroup,
  Button,
  CardBody,
} from 'reactstrap';
import PropTypes from 'prop-types';
import * as Icon from 'react-feather';
import api from '../../constants/api';

export default function ClientContactGetAndInsert({
  setContactData,
  setEditContactEditModal,
  deleteRecord,
  contactsDetails,
  addContactToggle,
  addContactModal,
  handleAddNewContact,
  newContactData,
  AddNewContact,
  // setFormSubmitted,
  // formSubmitted,
}) {
  ClientContactGetAndInsert.propTypes = {
    setContactData: PropTypes.func,
    setEditContactEditModal: PropTypes.func,
    deleteRecord: PropTypes.func,
    contactsDetails: PropTypes.any,
    addContactToggle: PropTypes.func,
    addContactModal: PropTypes.bool,
    handleAddNewContact: PropTypes.func,
    newContactData: PropTypes.object,
    AddNewContact: PropTypes.func,
    // setFormSubmitted: PropTypes.any,
    // formSubmitted: PropTypes.any,
  };

  const [arabic, setArabic] = useState([]);

  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };

  const selectedLanguage = getSelectedLanguageFromLocalStorage();

  // Use the selected language value as needed
  console.log('Selected language from localStorage:', selectedLanguage);
  const arb = selectedLanguage === 'Arabic';

  //const eng = selectedLanguage === 'English';

  const getArabicCompanyName = () => {
    api
      .get('/translation/getTranslationForContact')
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

  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }
  //  Table Contact
  const columns = [
    {
      name: 'id',
      selector: 'contact_id',
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
      name: 'Del',
      selector: 'delete',
      cell: () => <Icon.Trash />,
      grow: 0,
      width: 'auto',
      wrap: true,
    },
    {
      name: arabic.find((item) => item.key_text === 'mdTradingContact.Name')?.[genLabel],
      selector: 'first_name',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: arabic.find((item) => item.key_text === 'mdTradingContact.Email')?.[genLabel],
      //name: 'Email',
      selector: 'email',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: arabic.find((item) => item.key_text === 'mdTradingContact.Phone')?.[genLabel],
      //name: 'Phone(Direct)',
      selector: 'phone_direct',
      sortable: true,
      grow: 0,
    },
    {
      name: arabic.find((item) => item.key_text === 'mdTradingContact.Mobile')?.[genLabel],
      selector: 'mobile',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: arabic.find((item) => item.key_text === 'mdTradingContact.Position')?.[genLabel],
      selector: 'position',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: arabic.find((item) => item.key_text === 'mdTradingContact.Department')?.[genLabel],
      selector: 'department',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
  ];
  return (
    <Form>
      <Row>
        <Col md="3">
          <FormGroup>
            <Button color="primary" className="shadow-none" onClick={addContactToggle.bind(null)}>
              {arb ? 'إضافة جهة اتصال جديدة' : 'Add New Contact'}
            </Button>
            <Modal size="lg" isOpen={addContactModal} toggle={addContactToggle.bind(null)}>
              <ModalHeader toggle={addContactToggle.bind(null)}>New Contact</ModalHeader>
              <ModalBody>
                <Row>
                  <Col md="12">
                    <CardBody>
                      <Form>
                        <Row>
                          <Col md="4">
                            <FormGroup>
                              <Label>
                                Title<span className="required">*</span>
                              </Label>
                              <Input
                                type="select"
                                name="salutation"
                                onChange={handleAddNewContact}
                                value={newContactData && newContactData.salutation}
                              >
                                <option defaultChecked="Mr">Mr</option>
                                <option value="Ms">Ms</option>

                                <option value="Mrs">Mrs</option>
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col md="4">
            <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdTradingContact.Name')?.[genLabel]}
              </Label> <span className='required'>*</span>
              <Input
                type="text"
                onChange={handleAddNewContact}
                value={
                  arb
                    ? newContactData && newContactData.first_name_arb
                      ? newContactData.first_name_arb
                      : newContactData && newContactData.first_name_arb !== null
                      ? ''
                      : newContactData && newContactData.first_name
                    : newContactData && newContactData.first_name
                }
               
                name={arb ? 'first_name_arb' : 'first_name'}
              />
            </FormGroup>
          </Col>

          <Col md="4">
            <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdTradingContact.Email')?.[genLabel]}
              </Label> <span className='required'>*</span>
              <Input
                type="text"
                onChange={handleAddNewContact}
                value={
                  arb
                    ? newContactData && newContactData.email_arb
                      ? newContactData.email_arb
                      : newContactData && newContactData.email_arb !== null
                      ? ''
                      : newContactData && newContactData.email
                    : newContactData && newContactData.email
                }
               
                name={arb ? 'email_arb' : 'email'}
              />
            </FormGroup>
          </Col>
                          {/* <Col md="4">
                            <FormGroup>
                              <Label>
                                Email <span className="required">*</span>{' '}
                              </Label>
                              <Input
                                type="text"
                                name="email"
                                onChange={handleAddNewContact}
                                value={newContactData && newContactData.email}
                                className={`form-control ${
                                  formSubmitted &&
                                  newContactData &&
                                  newContactData.email.trim() === ''
                                    ? 'highlight'
                                    : ''
                                }`}
                              />
                              {formSubmitted &&
                                newContactData &&
                                newContactData.email.trim() === '' && (
                                  <div className="error-message">Please Enter</div>
                                )}
                            </FormGroup>
                          </Col> */}

                          <Col md="4">
                            <FormGroup>
                              <Label dir="rtl" style={{ textAlign: 'right' }}>
                                {
                                  arabic.find(
                                    (item) => item.key_text === 'mdTradingContact.Position',
                                  )?.[genLabel]
                                }{' '}
                                {/*Access the value property */}
                            
                              </Label>
                              <Input
                                type="text"
                                onChange={handleAddNewContact}
                                value={
                                  arb
                                    ? newContactData && newContactData.position_arb
                                      ? newContactData.position_arb
                                      : newContactData && newContactData.position_arb !== null
                                      ? ''
                                      : newContactData && newContactData.position
                                    : newContactData && newContactData.position
                                }
                                name={arb ? 'position_arb' : 'position'}
              
                              ></Input>
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label dir="rtl" style={{ textAlign: 'right' }}>
                                {
                                  arabic.find(
                                    (item) => item.key_text === 'mdTradingContact.Department',
                                  )?.[genLabel]
                                }{' '}
                                {/*Access the value property */}
                                
                              </Label>
                              <Input
                                type="text"
                                onChange={handleAddNewContact}
                                value={
                                  arb
                                    ? newContactData && newContactData.department_arb
                                      ? newContactData.department_arb
                                      : newContactData && newContactData.department_arb !== null
                                      ? ''
                                      : newContactData && newContactData.department
                                    : newContactData && newContactData.department
                                }
                                name={arb ? 'department_arb' : 'department'}
                                
                              ></Input>
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label dir="rtl" style={{ textAlign: 'right' }}>
                                {
                                  arabic.find(
                                    (item) => item.key_text === 'mdTradingContact.Phone',
                                  )?.[genLabel]
                                }{' '}
                                {/*Access the value property */}
                               
                              </Label>
                              <Input
                                type="text"
                                onChange={handleAddNewContact}
                                value={
                                  arb
                                    ? newContactData && newContactData.phone_direct_arb
                                      ? newContactData.phone_direct_arb
                                      : newContactData && newContactData.phone_direct_arb !== null
                                      ? ''
                                      : newContactData && newContactData.phone_direct
                                    : newContactData && newContactData.phone_direct
                                }
                                name={arb ? 'phone_direct_arb' : 'phone_direct'}
                                
                              ></Input>
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label dir="rtl" style={{ textAlign: 'right' }}>
                                {
                                  arabic.find(
                                    (item) => item.key_text === 'mdTradingContact.Fax',
                                  )?.[genLabel]
                                }{' '}
                                {/*Access the value property */}
                                
                              </Label>
                              <Input
                                type="text"
                                onChange={handleAddNewContact}
                                value={
                                  arb
                                    ? newContactData && newContactData.fax_arb
                                      ? newContactData.fax_arb
                                      : newContactData && newContactData.fax_arb !== null
                                      ? ''
                                      : newContactData && newContactData.fax
                                    : newContactData && newContactData.fax
                                }
                                name={arb ? 'fax_arb' : 'fax'}
                                
                              ></Input>
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label dir="rtl" style={{ textAlign: 'right' }}>
                                {
                                  arabic.find(
                                    (item) => item.key_text === 'mdTradingContact.Mobile',
                                  )?.[genLabel]
                                }{' '}
                                {/*Access the value property */}
                                
                              </Label>
                              <Input
                                type="text"
                                onChange={handleAddNewContact}
                                value={
                                  arb
                                    ? newContactData && newContactData.mobile_arb
                                      ? newContactData.mobile_arb
                                      : newContactData && newContactData.mobile_arb !== null
                                      ? ''
                                      : newContactData && newContactData.mobile
                                    : newContactData && newContactData.mobile
                                }
                                name={arb ? 'mobile_arb' : 'mobile'}
                                
                              ></Input>
                            </FormGroup>
                          </Col>
                          {/* <Col md="4">
                            <FormGroup>
                              <Label>position</Label>
                              <Input
                                type="text"
                                name="position"
                                onChange={handleAddNewContact}
                                value={newContactData && newContactData.position}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Department</Label>
                              <Input
                                type="text"
                                name="department"
                                onChange={handleAddNewContact}
                                value={newContactData && newContactData.department}
                              />
                            </FormGroup>
                          </Col> */}
                          {/* <Col md="4">
                            <FormGroup>
                              <Label>Phone (Direct)</Label>
                              <Input
                                type="number"
                                name="phone_direct"
                                onChange={handleAddNewContact}
                                value={newContactData && newContactData.phone_direct}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Fax (Direct)</Label>
                              <Input
                                type="number"
                                name="fax"
                                onChange={handleAddNewContact}
                                value={newContactData && newContactData.fax}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Mobile</Label>
                              <Input
                                type="number"
                                name="mobile"
                                onChange={handleAddNewContact}
                                value={newContactData && newContactData.mobile}
                              />
                            </FormGroup>
                          </Col> */}
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
                    //setFormSubmitted(true);
                    AddNewContact();
                    //addContactModal(false);
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
      <Row>
        <Table id="example" className="display border border-secondary rounded">
          <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {contactsDetails &&
              contactsDetails.map((element, i) => {
                return (
                  <tr key={element.contact_id}>
                    <td>{i + 1}</td>
                    <td>
                      <div className="anchor">
                        <span
                          onClick={() => {
                            setContactData(element);
                            setEditContactEditModal(true);
                          }}
                        >
                          <Icon.Edit2 />
                        </span>
                      </div>
                    </td>
                    <td>
                      <div color="primary" className="anchor">
                        <span onClick={() => deleteRecord(element.contact_id)}>
                          <Icon.Trash2 />
                        </span>
                      </div>
                    </td>
                    <td>{arb ? element.first_name_arb : element.first_name}</td>
                    <td>{element.email}</td>
                    <td>{element.phone_direct}</td>
                    <td>{arb ? element.mobile_arb : element.mobile}</td>
                    <td>{arb ? element.position_arb : element.position}</td>
                    <td>{arb ? element.department_arb : element.department}</td>
                    {/* <td>{element.first_name}</td> */}
                    {/* <td>{element.email}</td>
                    <td>{element.phone_direct}</td>
                    <td>{element.mobile}</td>
                    <td>{element.position}</td>
                    <td>{element.department}</td> */}
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Row>
    </Form>
  );
}

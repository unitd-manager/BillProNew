import React, { useEffect, useState, useContext } from 'react';
// import { useParams } from 'react-router-dom';
import {
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  ModalBody,
  ModalFooter,
  Modal,
  ModalHeader,
} from 'reactstrap';
import PropTypes from 'prop-types';
import message from '../Message';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../../views/form-editor/editor.scss';
import AppContext from '../../context/AppContext';
import creationdatetime from '../../constants/creationdatetime';

import api from '../../constants/api';

const ContactEditModal = ({ contactData, editContactEditModal, setEditContactEditModal,formSubmitted  }) => {
  ContactEditModal.propTypes = {
    contactData: PropTypes.object,
    editContactEditModal: PropTypes.bool,
    setEditContactEditModal: PropTypes.func,
    formSubmitted: PropTypes.any,
    //  setFormSubmitted: PropTypes.any,
  };

  const [contactinsert, setContactInsert] = useState(null);

  const handleInputs = (e) => {
    setContactInsert({ ...contactinsert, [e.target.name]: e.target.value });
  };
  const { loggedInuser } = useContext(AppContext);

  //Logic for edit data in db

  const editContactsData = () => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(contactinsert.email) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(contactinsert.email_arb)) {
      message('Invalid email address', 'warning');
    }
    else if (contactinsert.first_name !== '' &&
    contactinsert.email !== ''
    ) {
      contactinsert.modification_date = creationdatetime;
      contactinsert.modified_by = loggedInuser.first_name;
    api
      .post('/clients/editContact', contactinsert)
      .then(() => {
        message('Record editted successfully', 'success');
        window.location.reload();
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
    }  
    else {
      message('Please fill all required fields', 'warning');
    }
  };
  const handleSave = () => {
    //setFormSubmitted(true);
    editContactsData();

  };
  useEffect(() => {
    setContactInsert(contactData);
  }, [contactData]);


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
  return (
    <>
      <Modal size="lg" isOpen={editContactEditModal}>
        <ModalHeader>
          Edit Contact
          <Button
            color="secondary"
            onClick={() => {
              setEditContactEditModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>

        <ModalBody>
          <Row>
            <Col md="3" className="mb-4 d-flex justify-content-between"></Col>
          </Row>
          <Row>
            <Col md="4">
            <FormGroup>
              <Label>Title<span className="required"> *</span> </Label>
              <Input
                type="select"
                onChange={handleInputs}
                value={contactinsert && contactinsert.salutation}
                name="salutation"
              >
                <option value="" selected="selected">
                  Please Select
                </option>
                <option value="Ms">Ms</option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
              </Input>
              </FormGroup>              
            </Col>
            {/* <Col md="4">
              <FormGroup>
                <Label>Name <span className="required"> *</span></Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={contactinsert && contactinsert.first_name}
                  name="first_name"
                  className={`form-control ${
                    formSubmitted && contactinsert && contactinsert.first_name.trim() === '' ? 'highlight' : ''
                  }`}
                />
                {formSubmitted && contactinsert && contactinsert.first_name.trim() === '' && (
                <div className="error-message">Please Enter</div>
              )}
              </FormGroup>
            </Col> */}
            <Col md="4">
            <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdTradingContact.Name')?.[genLabel]}
              </Label><span className="required"> *</span>
              <Input
                type="text"
                onChange={handleInputs}
                value={
                  arb
                    ? contactinsert && contactinsert.first_name_arb
                      ? contactinsert.first_name_arb
                      : contactinsert && contactinsert.first_name_arb !== null
                      ? ''
                      : contactinsert && contactinsert.first_name
                    : contactinsert && contactinsert.first_name
                }
               
                name={arb ? 'first_name_arb' : 'first_name'}
              />
            </FormGroup>
          </Col>

          {/* <Col md="4">
            <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdTradingContact.Email')?.[genLabel]}
              </Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={
                  arb
                    ? contactinsert && contactinsert.email_arb
                      ? contactinsert.email_arb
                      : contactinsert && contactinsert.email_arb !== null
                      ? ''
                      : contactinsert && contactinsert.email
                    : contactinsert && contactinsert.email
                }
               
                name={arb ? 'email_arb' : 'email'}
              />
            </FormGroup>
          </Col> */}
            <Col md="4">
              <FormGroup>
                <Label>Email <span className="required"> *</span></Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={
                    arb
                      ? contactinsert && contactinsert.email_arb
                        ? contactinsert.email_arb
                        : contactinsert && contactinsert.email_arb !== null
                        ? ''
                        : contactinsert && contactinsert.email
                      : contactinsert && contactinsert.email
                  }
                  name={arb ? 'email_arb' : 'email'}
                  className={`form-control ${
                    formSubmitted && contactinsert && contactinsert.email_arb.trim() && contactinsert && contactinsert.email.trim() === '' ? 'highlight' : ''
                  }`}
                />
                {formSubmitted && contactinsert && contactinsert.email_arb.trim() && contactinsert && contactinsert.email.trim() === '' && (
                <div className="error-message">Please Enter</div>
              )}
              </FormGroup>
            </Col>
            {/* <Col md="4">
              <FormGroup>
                <Label>Position </Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={contactinsert && contactinsert.position}
                  name="position"
                />
              </FormGroup>
            </Col> */}
            <Col md="4">
            <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdTradingContact.Position')?.[genLabel]}
              </Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={
                  arb
                    ? contactinsert && contactinsert.position_arb
                      ? contactinsert.position_arb
                      : contactinsert && contactinsert.position_arb !== null
                      ? ''
                      : contactinsert && contactinsert.position
                    : contactinsert && contactinsert.position
                }
               
                name={arb ? 'position_arb' : 'position'}
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdTradingContact.Department')?.[genLabel]}
              </Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={
                  arb
                    ? contactinsert && contactinsert.department_arb
                      ? contactinsert.department_arb
                      : contactinsert && contactinsert.department_arb !== null
                      ? ''
                      : contactinsert && contactinsert.department
                    : contactinsert && contactinsert.department
                }
               
                name={arb ? 'department_arb' : 'department'}
              />
            </FormGroup>
          </Col>
            {/* <Col md="4">
              <FormGroup>
                <Label>Dept </Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={contactinsert && contactinsert.department}
                  name="department"
                />
              </FormGroup>
            </Col> */}
             <Col md="4">
            <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdTradingContact.Phone')?.[genLabel]}
              </Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={
                  arb
                    ? contactinsert && contactinsert.phone_direct_arb
                      ? contactinsert.phone_direct_arb
                      : contactinsert && contactinsert.phone_direct_arb !== null
                      ? ''
                      : contactinsert && contactinsert.phone_direct
                    : contactinsert && contactinsert.phone_direct
                }
               
                name={arb ? 'phone_direct_arb' : 'phone_direct'}
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdTradingContact.Fax')?.[genLabel]}
              </Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={
                  arb
                    ? contactinsert && contactinsert.fax_arb
                      ? contactinsert.fax_arb
                      : contactinsert && contactinsert.fax_arb !== null
                      ? ''
                      : contactinsert && contactinsert.fax
                    : contactinsert && contactinsert.fax
                }
               
                name={arb ? 'fax_arb' : 'fax'}
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdTradingContact.Mobile')?.[genLabel]}
              </Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={
                  arb
                    ? contactinsert && contactinsert.mobile_arb
                      ? contactinsert.mobile_arb
                      : contactinsert && contactinsert.mobile_arb !== null
                      ? ''
                      : contactinsert && contactinsert.mobile
                    : contactinsert && contactinsert.mobile
                }
               
                name={arb ? 'mobile_arb' : 'mobile'}
              />
            </FormGroup>
          </Col>
            {/* <Col md="4">
              <FormGroup>
                <Label>Phone(Direct) </Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={contactinsert && contactinsert.phone_direct}
                  name="phone_direct"
                />
              </FormGroup>
            </Col>

            <Col md="4">
              <FormGroup>
                <Label>Fax(Direct) </Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={contactinsert && contactinsert.fax}
                  name="fax"
                />
              </FormGroup>
            </Col> */}

            {/* <Col md="4">
              <FormGroup>
                <Label>Mobile </Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={contactinsert && contactinsert.mobile}
                  name="mobile"
                />
              </FormGroup>
            </Col> */}
          </Row>
        </ModalBody>

        <ModalFooter>
        
              <Button
                color="primary"
                onClick={() => {
                  handleSave();
                  // setFormSubmitted(true)
                }}
              >
                Submit
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  setEditContactEditModal(false);
                }}
              >
                Cancel
              </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default ContactEditModal;

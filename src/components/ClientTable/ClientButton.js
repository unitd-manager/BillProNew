import React from 'react';
import { Row, Col, Form, FormGroup, Button, ModalFooter,
  Modal,
  ModalHeader,
  ModalBody,CardBody } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCardV2 from '../ComponentCardV2';
import CommonTranslationEdit from '../CommonTranslationEdit';

export default function ClientButton({clientsDetails,navigate,editClientsData, applyChanges, backToList , setFormSubmitted,arb,id,tablevalue,whereCondition,logButtonActivityToFile,addLogToggle,addLogModal,log}) {
  ClientButton.propTypes = {
    editClientsData: PropTypes.any,
    applyChanges: PropTypes.func,
    backToList: PropTypes.func,
    setFormSubmitted: PropTypes.any,
    clientsDetails: PropTypes.any,
    navigate: PropTypes.any,
    arb: PropTypes.any,
    id: PropTypes.any,
    tablevalue: PropTypes.any,
    whereCondition: PropTypes.any,
    logButtonActivityToFile:PropTypes.any,
    addLogToggle:PropTypes.any,
    addLogModal:PropTypes.any,
    log:PropTypes.any
  };
  const handleSave = () => {
    console.log('Handling Save...');
  
    // Logging the clientsDetails object
    console.log('clientsDetails:', clientsDetails);
  
    // Validate company name
    const trimmedCompanyName = clientsDetails?.company_name?.trim();
    if (!trimmedCompanyName) {
      // If validation fails, show an error message or take appropriate action
      console.error('Company name cannot be empty. Current value:', trimmedCompanyName);
      // You can also show an error message to the user using a toast or other UI element
      return;
    }
  
    // If validation passes, proceed with setting formSubmitted to true
    setFormSubmitted(true);
    editClientsData();

  // Now navigate to the '/Client' route
  navigate('/Client');
  };
  console.log('log',log)
  return (
    <Form>
      <FormGroup>
        {/* Button */}
        <ComponentCardV2>
          <Row>
          <CommonTranslationEdit tablevalue = {tablevalue} id = {id} whereCondition = {whereCondition} ></CommonTranslationEdit>


          <Col>
          <Button color="primary" className="shadow-none" onClick={addLogToggle.bind(null)}>
              Log View
            </Button>
            <Modal size="lg" isOpen={addLogModal} toggle={addLogToggle.bind(null)}>
              <ModalHeader toggle={addLogToggle.bind(null)}>Log View</ModalHeader>
              <ModalBody>
                <Row>
                  <Col md="12">
                    <CardBody>
                      <Form>
                        <Row>
                          {log}
                        </Row>
                      </Form>
                    </CardBody>
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="secondary"
                  className="shadow-none"
                  onClick={addLogToggle.bind(null)}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>

          
          </Col>
            <Col>
              <Button
                className="shadow-none"
                color="primary"
                onClick={() => {
                  console.log('Clicked Save');
                  handleSave();
                  logButtonActivityToFile('Save')
                  // console.log('formSubmitted:', formSubmitted);
                  setFormSubmitted(true);
                  // editClientsData();
                   // navigate('/Client')
                  }}
              >
             {arb ?'يحفظ':'Save'}  
              </Button>
            </Col>
            <Col>
              <Button
                className="shadow-none"
                color="primary"
                onClick={() => {
                  setFormSubmitted(true);
                  editClientsData();
                  logButtonActivityToFile('Apply')
                  applyChanges();
                }}
              >
                {arb ?'يتقدم':'Apply'}  
              </Button>
            </Col>
            <Col>
              <Button
                className="shadow-none"
                color="dark"
                onClick={() => {
                  backToList();
                }}
              >
                   {arb ?'الرجوع للقائمة':'Back to List'}  

              </Button>
            </Col>
          </Row>
        </ComponentCardV2>
      </FormGroup>
    </Form>
  );
}

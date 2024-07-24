import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';
import ProposalCompanyEditDetails from './ProposalCompanyEditDetails';
import ProposalContactDetails from './ProposalContactDetails';

export default function ProposalMoreDetails({
  proposalDetails,
  handleInputs,
  handleAddNewContact,
  company,
  contact,
  getContact,
  addCompanyToggle,
  addContactModal,
  addContactToggle,
  AddNewContact,
  insertCompany,
  companyhandleInputs,
  projectManager,
  formSubmitted,
  arabic,
  arb,
  //setAddContactModal,
  allCountries,
}) {
  ProposalMoreDetails.propTypes = {
    proposalDetails: PropTypes.object,
    handleInputs: PropTypes.object,
    handleAddNewContact: PropTypes.object,
    contact: PropTypes.object,
    company: PropTypes.object,
    addCompanyToggle: PropTypes.object,
    addContactModal: PropTypes.object,
    addContactToggle: PropTypes.object,
    AddNewContact: PropTypes.object,
    insertCompany: PropTypes.object,
    companyhandleInputs: PropTypes.object,
    projectManager:PropTypes.object,
    getContact: PropTypes.object,
    allCountries: PropTypes.object,
    formSubmitted: PropTypes.object,
    arabic: PropTypes.any,
    arb: PropTypes.any,
  };
  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }
  return (
    <div>
      {' '}
      <Form>
        <FormGroup>
          <ComponentCard title="Proposal Details"  creationModificationDate={proposalDetails}
          >
            <Row>
              <Col md="3">
                <FormGroup>
                
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdproposal.Quotation Code')?.[genLabel]}
              </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={proposalDetails && proposalDetails.quote_code}
                    name="quote_code"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
              <FormGroup>
                 
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdproposal.Proposal Code')?.[genLabel]}
              </Label>
                  <Input
                    value={proposalDetails && proposalDetails.proposal_code}
                    type="text"
                    onChange={handleInputs}
                    name="proposal_code"
                    disabled
                  />
                </FormGroup>
              </Col>
              
              <Col md="3">
                <FormGroup>
                 
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdproposal.Title')?.[genLabel]}
                <span className="required"> *</span>
              </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    className={`form-control ${
                      formSubmitted && proposalDetails.title.trim() === '' ? 'highlight' : ''
                    }`}
                    value={
                      arb
                        ? (
                            proposalDetails && proposalDetails.title_arb ? proposalDetails.title_arb :
                            (proposalDetails && proposalDetails.title_arb !== null ? '' : proposalDetails && proposalDetails.title)
                          )
                        : (proposalDetails && proposalDetails.title)
                    }
                    name={arb ? 'title_arb': 'title'}
                  />
                </FormGroup>
                {formSubmitted && proposalDetails.title_arb.trim() &&proposalDetails.title.trim() === '' && (
                      <div className="error-message">Please enter Title</div>
                    )}
              </Col>
              
              <Col md="3">
                <FormGroup>
                  
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdproposal.Company Name')?.[genLabel]}
              </Label>
                  <Input
                    type="select"
                    onChange={(e) => {
                      handleInputs(e);
                      getContact(e.target.value);
                    }}
                    value={proposalDetails && proposalDetails.company_id}
                    name="company_id"
                    disabled
                  >
                    <option value="selected">Please Select</option>
                    {company &&
                      company.map((e) => {
                        return (
                          <option key={e.company_id} value={e.company_id}>
                            {' '}
                            {arb? e.company_name_arb:e.company_name}{' '}
                          </option>
                        );
                      })}
                  </Input>
                </FormGroup>

                <ProposalCompanyEditDetails
                  
                  addCompanyToggle={addCompanyToggle}
                  insertCompany={insertCompany}
                  allCountries={allCountries}
                  companyhandleInputs={companyhandleInputs}
                ></ProposalCompanyEditDetails>
              </Col>

              <Col md="3">
                <FormGroup>
                  <Label>
                    Contact (OR){' '}
                    <span className="anchor" onClick={addContactToggle.bind(null)}>
                      <b>
                        <u>Add New Contact</u>
                      </b>
                    </span>
                  </Label>
                  <Input
                    type="select"
                    onChange={(e) => {
                      handleInputs(e);
                      
                    }}
                    value={proposalDetails && proposalDetails.contact_id}
                    name="contact_id"
                  >
                    <option value="selected" >
                      Please Select
                    </option>
                    {contact &&
                      contact.map((e) => {
                        return (
                          <option key={e.contact_id} value={e.contact_id}>
                            {arb?e.first_name_arb:e.first_name}
                          </option>
                        );
                      })}
                    <ProposalContactDetails
                      addContactModal={addContactModal}
                      addContactToggle={addContactToggle}
                      AddNewContact={AddNewContact}
                      handleAddNewContact={handleAddNewContact}
                    ></ProposalContactDetails>
                  </Input>
                </FormGroup>
              </Col>
              
              <Col md="3">
              <FormGroup>
             
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdproposal.Est Start_Date')?.[genLabel]}
              </Label> 
                  <Input
                    type="date"
                    value={proposalDetails && proposalDetails.est_start_date}
                    onChange={handleInputs}
                    name="est_start_date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
              <FormGroup>
                 
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdproposal.Est End_Date')?.[genLabel]}
              </Label>
                  <Input
                    type="date"
                    value={proposalDetails && proposalDetails.est_end_date}
                    onChange={handleInputs}
                    name="est_end_date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
              <FormGroup>
                  
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdproposal.Budget')?.[genLabel]}
              </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            proposalDetails && proposalDetails.budget_arb ? proposalDetails.budget_arb :
                            (proposalDetails && proposalDetails.budget_arb !== null ? '' : proposalDetails && proposalDetails.budget)
                          )
                        : (proposalDetails && proposalDetails.budget)
                    }
                    name={arb ? 'budget_arb': 'budget'}
                  />
                </FormGroup>
              </Col>
              
            </Row>
            <Row>
            <Col md="3">
            <FormGroup>
                
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdproposal.Project Manager')?.[genLabel]}
              </Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={proposalDetails && proposalDetails.project_manager}
                    name="project_manager"
                  >
                  <option value="selected" >
                      Please Select
                    </option>
                    {projectManager &&
                      projectManager.map((e) => {
                        return (
                          <option key={e.employee_id} value={e.employee_id}>
                            {arb?e.first_name_arb:e.first_name}
                          </option>
                        );
                      })}
                      </Input>
                </FormGroup>
              </Col>
            <Col md="3">
                <FormGroup>
                  
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdproposal.Description')?.[genLabel]}
              </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            proposalDetails && proposalDetails.description_arb ? proposalDetails.description_arb :
                            (proposalDetails && proposalDetails.description_arb !== null ? '' : proposalDetails && proposalDetails.description)
                          )
                        : (proposalDetails && proposalDetails.description)
                    }
                    name={arb ? 'description_arb': 'description'}
                  />
                </FormGroup>
              </Col>
              
              
              <Col md="3">
                <FormGroup>
                  
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdproposal.Status')?.[genLabel]}
              </Label>
                  <Input
                    value={proposalDetails && proposalDetails.status}
                    type="select"
                    onChange={handleInputs}
                    name="status"
                  >
                    <option value="">Please Select</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Waiting for Approval">Waiting for Approval</option>
                    <option value="Submitted">Submitted</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Awarded">Awarded</option>
                    <option value="Not Awarded">Not Awarded</option>
                    <option value="Enquiry">Enquiry</option>
                    <option value="Cancelled">Cancelled</option>
                    <option selected="selected" value="Converted to Project">
                      Converted to Project
                    </option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
              <FormGroup>
                  
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdproposal.No of Employees')?.[genLabel]}
              </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            proposalDetails && proposalDetails.no_of_employees_arb ? proposalDetails.no_of_employees_arb :
                            (proposalDetails && proposalDetails.no_of_employees_arb !== null ? '' : proposalDetails && proposalDetails.no_of_employees)
                          )
                        : (proposalDetails && proposalDetails.no_of_employees)
                    }
                    name={arb ? 'no_of_employees_arb': 'no_of_employees'}
                  />
                </FormGroup>
              </Col>
              </Row>
              <Row>
            <Col md="3">
            <FormGroup>
                  
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdproposal.Date')?.[genLabel]}
              </Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={proposalDetails && proposalDetails.proposal_date}
                    name="proposal_date"
                  />
                </FormGroup>
              </Col>
              </Row>
          </ComponentCard>
        </FormGroup>
      </Form>
    </div>
  );
}

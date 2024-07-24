import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import moment from 'moment';
import ComponentCard from '../ComponentCard';

function DocumentEditDetails ({ documenteditdetails, handleInputs, arabic, arb, genLabel }) {
    DocumentEditDetails.propTypes = {
        documenteditdetails: PropTypes.bool,
        handleInputs: PropTypes.func,
        arabic:PropTypes.any,
        arb:PropTypes.any,
        genLabel:PropTypes.any,
    };
  return (
    <div>
        
      <Form>
        <FormGroup>
          
      <ComponentCard title="Document Details" creationModificationDate={documenteditdetails}>
            <ToastContainer></ToastContainer>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdDocument.DOC Code')?.[genLabel]}
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={documenteditdetails && documenteditdetails.document_code}
                    name="document_code"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdDocument.DOC Title')?.[genLabel]}
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            documenteditdetails && documenteditdetails.document_title_arb ? documenteditdetails.document_title_arb :
                            (documenteditdetails && documenteditdetails.document_title_arb !== null ? '' : documenteditdetails && documenteditdetails.document_title)
                          )
                        : (documenteditdetails && documenteditdetails.document_title)
                    }
                    name={arb ? 'document_title_arb': 'document_title'}
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdDocument.Project Title')?.[genLabel]}
                  </Label>
                    <Input
                          type="text"
                          onChange={handleInputs}
                          value={documenteditdetails && documenteditdetails.project_title}
                          name="project_title"
                          disabled>
                     </Input>
              </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdDocument.Project Start Date')?.[genLabel]}
                  </Label>
                    <Input
                          type="text"
                          onChange={handleInputs}
                          value={documenteditdetails && moment(documenteditdetails.start_date).format('YYYY-MM-DD')}
                          name="start_date"
                          disabled>
                     </Input>
              </FormGroup>
              </Col>
              </Row>
              <Row>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdDocument.Budget')?.[genLabel]}
                  </Label>
                    <Input
                          type="text"
                          onChange={handleInputs}
                          value={documenteditdetails && documenteditdetails.budget}
                          name="budget"
                          disabled>
                     </Input>
              </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdDocument.Company Name')?.[genLabel]}
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={documenteditdetails && documenteditdetails.company_name}
                    name="company_name"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdDocument.Contact Name')?.[genLabel]}
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={documenteditdetails && documenteditdetails.contact_name}
                    name="contact_name"
                    disabled
                  />
                </FormGroup>
              </Col>
             
              
            
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdDocument.Project End Date')?.[genLabel]}
                  </Label>
                    <Input
                          type="text"
                          onChange={handleInputs}
                          value={documenteditdetails && documenteditdetails.estimated_finish_date}
                          name="estimated_finish_date"
                          disabled>
                     </Input>
              </FormGroup>
              </Col>
              </Row>
          </ComponentCard>
              </FormGroup>
            </Form>
            <Form>
            <ComponentCard title="Client Details">
            <ToastContainer></ToastContainer>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdDocument.Company Name')?.[genLabel]}
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={documenteditdetails && documenteditdetails.company_name}
                    name="company_name"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdDocument.Website')?.[genLabel]}
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={documenteditdetails && documenteditdetails.website}
                    name="website"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdDocument.Email')?.[genLabel]}
                  </Label>
                    <Input
                          type="text"
                          onChange={handleInputs}
                          value={documenteditdetails && documenteditdetails.email}
                          name="email"
                          disabled>
                     </Input>
              </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdDocument.Address')?.[genLabel]}
                  </Label>
                    <Input
                          type="text"
                          onChange={handleInputs}
                          value={documenteditdetails && documenteditdetails.company_address}
                          name="company_address"
                          disabled>
                     </Input>
              </FormGroup>
              </Col>
              </Row>
              <Row>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdDocument.Phone Number')?.[genLabel]}
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={documenteditdetails && documenteditdetails.phone}
                    name="phone"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdDocument.PO Code')?.[genLabel]}
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={documenteditdetails && documenteditdetails.address_po_code}
                    name="address_po_code"
                    disabled
                  />
                </FormGroup>
              </Col>
           
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdDocument.Country')?.[genLabel]}
                  </Label>
                    <Input
                          type="text"
                          onChange={handleInputs}
                          value={documenteditdetails && documenteditdetails.address_country}
                          name="address_country"
                          disabled>
                     </Input>
              </FormGroup>
              </Col>
              </Row>
              </ComponentCard>
            </Form>
            <Form>
            <ComponentCard title="Contact Details">
            <ToastContainer></ToastContainer>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdDocument.Contact Name')?.[genLabel]}
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={documenteditdetails && documenteditdetails.contact_name}
                    name="contact_name"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdDocument.Position')?.[genLabel]}
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={documenteditdetails && documenteditdetails.position}
                    name="position"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdDocument.Email')?.[genLabel]}
                  </Label>
                    <Input
                          type="text"
                          onChange={handleInputs}
                          value={documenteditdetails && documenteditdetails.contact_email}
                          name="contact_email"
                          disabled>
                     </Input>
              </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdDocument.Address')?.[genLabel]}
                  </Label>
                    <Input
                          type="text"
                          onChange={handleInputs}
                          value={documenteditdetails && documenteditdetails.contact_address}
                          name="contact_address"
                          disabled>
                     </Input>
              </FormGroup>
              </Col>
              </Row>
              <Row>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdDocument.Phone Number')?.[genLabel]}
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={documenteditdetails && documenteditdetails.contact_phone}
                    name="contact_phone"
                    disabled
                  />
                </FormGroup>
              </Col>
              {/* <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdDocument.PO Code')?.[genLabel]}
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={documenteditdetails && documenteditdetails.contact_address_po_code}
                    name="contact_address_po_code"
                    disabled
                  />
                </FormGroup>
              </Col> */}
              {/* <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdDocument.State')?.[genLabel]}
                  </Label>
                    <Input
                          type="text"
                          onChange={handleInputs}
                          value={documenteditdetails && documenteditdetails.contact_address_state}
                          name="contact_address_state"
                          disabled>
                     </Input>
              </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdDocument.Country')?.[genLabel]}
                  </Label>
                    <Input
                          type="text"
                          onChange={handleInputs}
                          value={documenteditdetails && documenteditdetails.contact_address_country}
                          name="contact_address_country"
                          disabled>
                     </Input>
        </FormGroup>
              </Col> */}
              </Row>
              </ComponentCard>
            </Form>
    </div>
  );
}

export default DocumentEditDetails;


import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

export default function TenderMoreDetails({
  tenderDetails,
  handleInputs,

  getContact,
  formSubmitted,
  arb,
  arabic,
}) {
  TenderMoreDetails.propTypes = {
    tenderDetails: PropTypes.object,
    handleInputs: PropTypes.object,
    getContact: PropTypes.any,
    
    formSubmitted:PropTypes.object,
    arb: PropTypes.any,
    arabic: PropTypes.any,
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
          <ComponentCard title="Enquiry Details" creationModificationDate={tenderDetails}>
            <Row>
            <Col md="3">
                <FormGroup>
                  {arabic.find((item) => item.key_text === 'mdProjectEnq.Enquiry No')?.[genLabel]}
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.enquiry_code}
                    name="enquiry_code"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  {arabic.find((item) => item.key_text === 'mdProjectEnq.customer')?.[genLabel]}
                  <Input
                    type="text"
                    onChange={(e) => {
                      handleInputs(e);
                      getContact(e.target.value);
                    }}
                    value={tenderDetails && tenderDetails.company_name}
                    name="company_name"
                    disabled
                  >
                    {/* <option value="selected">Please Select</option>
                    {company &&
                      company.map((e) => {
                        return (
                          <option key={e.company_id} value={e.company_id}>
                            {' '}
                            {arb?e.company_name_arb:e.company_name}{' '}
                          </option>
                        );
                      })} */}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdProjectEnq.Title')?.[genLabel]}{' '}
                    {/*Access the value property */}
                    
                  </Label>
                  <span className="required"> *</span>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? tenderDetails && tenderDetails.title_arb
                          ? tenderDetails.title_arb
                          : tenderDetails && tenderDetails.title_arb !== null
                          ? ''
                          : tenderDetails && tenderDetails.title
                        : tenderDetails && tenderDetails.title
                    }
                    name={arb ? 'title_arb' : 'title'}

                  ></Input>
                </FormGroup>
              </Col>

              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdProjectEnq.Enquiry Date')?.[genLabel]}
              </Label>
                  <Input
                    type="Date"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.enquiry_date}
                    name="enquiry_date"
                    className={`form-control ${
                      formSubmitted && tenderDetails.enquiry_date.trim() === '' ? 'highlight' : ''
                    }`}
                  />
                </FormGroup>
                {formSubmitted && tenderDetails.enquiry_date.trim() === '' && (
                      <div className="error-message">Please Select Date</div>
                    )}
              </Col>
              <Col md="3">
                <FormGroup>
                {arabic.find((item) => item.key_text === 'mdProjectEnq.status')?.[genLabel]}
                  <Input
                    type="select"
                    value={tenderDetails && tenderDetails.status}
                    onChange={handleInputs}
                    name="status"
                  >
                      <option value="">Please Select</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Quotation Sent">Quotation Sent</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="On Hold">On Hold</option>
                  </Input>
                </FormGroup>
              </Col>
              
              
              <Col md="3">
                <FormGroup>
                  {arabic.find((item) => item.key_text === 'mdProjectEnq.Reference')?.[genLabel]}
                  <Input
                    type="text"
                    value={
                      arb
                        ? (
                            tenderDetails && tenderDetails.office_ref_no_arb ? tenderDetails.office_ref_no_arb :
                            (tenderDetails && tenderDetails.office_ref_no_arb !== null ? '' : tenderDetails && tenderDetails.office_ref_no)
                          )
                        : (tenderDetails && tenderDetails.office_ref_no)
                    }
                    onChange={handleInputs}
                    name={arb? 'office_ref_no_arb':'office_ref_no'}
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  {arabic.find((item) => item.key_text === 'mdProjectEnq.BID Expiry')?.[genLabel]}
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.project_end_date}
                    name="project_end_date"
                  />
                </FormGroup>
              </Col>
              
              <Col md="3">
                <FormGroup>
                {arabic.find((item) => item.key_text === 'mdProjectEnq.service')?.[genLabel]}
                  <Input
                    type="textarea"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            tenderDetails && tenderDetails.services_arb ? tenderDetails.services_arb :
                            (tenderDetails && tenderDetails.services_arb !== null ? '' : tenderDetails && tenderDetails.services)
                          )
                        : (tenderDetails && tenderDetails.services)
                    }
                    name={arb ? 'services_arb': 'services'}
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

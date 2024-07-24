import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
// import moment from 'moment';
import ComponentCard from '../ComponentCard';

export default function TenderMoreDetails({
  tenderDetails,
  handleInputs,
  //formSubmitted,
  arb,
  arabic,
}) {
  TenderMoreDetails.propTypes = {
    tenderDetails: PropTypes.object,
    //company: PropTypes.object,
    handleInputs: PropTypes.object,
    //formSubmitted: PropTypes.object,
    arb: PropTypes.any,
    arabic: PropTypes.any,
  };
  console.log('tender', tenderDetails);
  //  const getCurrentDate = () => {
  //   return moment().format('YYYY-MM-DD');
  // };
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
              {/* <Col md="3">
                <FormGroup>
                  <Label>Enquiry Code</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.opportunity_code}
                    name="opportunity_code"
                    readOnly
                  />
                </FormGroup>
              </Col> */}

              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {
                      arabic.find((item) => item.key_text === 'mdTradingEnq.Enquiry Code')?.[
                        genLabel
                      ]
                    }{' '}
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? tenderDetails && tenderDetails.opportunity_code_arb
                          ? tenderDetails.opportunity_code_arb
                          : tenderDetails && tenderDetails.opportunity_code_arb !== null
                          ? ''
                          : tenderDetails && tenderDetails.opportunity_code
                        : tenderDetails && tenderDetails.opportunity_code
                    }
                    name={arb ? 'opportunity_code_arb' : 'opportunity_code'}
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdTradingEnq.Customer')?.[genLabel]}{' '}
                    {/*Access the value property */}
                    
                  </Label>
                  <Input
                    type="text"
                    onChange={(e) => {
                      handleInputs(e);
                      // getContact(e.target.value);
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
                    {arabic.find((item) => item.key_text === 'mdTradingEnq.Title')?.[genLabel]}{' '}
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
              {/* <Col md="3">
                <FormGroup>
                  <Label>
                    Title<span className="required"> *</span>
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    className={`form-control ${
                      formSubmitted && tenderDetails.title.trim() === '' ? 'highlight' : ''
                    }`}
                    value={tenderDetails && tenderDetails.title}
                    name="title"
                  />
                </FormGroup>
                {formSubmitted && tenderDetails.title.trim() === '' && (
                  <div className="error-message">Please Enter</div>
                )}
              </Col> */}
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {
                      arabic.find((item) => item.key_text === 'mdTradingEnq.Enquiry Date')?.[
                        genLabel
                      ]
                    }{' '}
                    {/*Access the value property */}
                    
                  </Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (tenderDetails && tenderDetails.enquiry_date_arb
                          ? tenderDetails.enquiry_date_arb
                          : (tenderDetails && tenderDetails.enquiry_date_arb !== null
                          ? ''
                          : tenderDetails && tenderDetails.enquiry_date)
                        )
                        : tenderDetails && tenderDetails.enquiry_date
                    }
                    name={arb ? 'enquiry_date_arb' : 'enquiry_date'}
                  ></Input>
                </FormGroup>
              </Col>

              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {
                      arabic.find((item) => item.key_text === 'mdTradingEnq.Enquiry Status')?.[
                        genLabel
                      ]
                    }{' '}
                    {/*Access the value property */}
                    
                  </Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={
                      arb
                        ? tenderDetails && tenderDetails.status_arb
                          ? tenderDetails.status_arb
                          : tenderDetails && tenderDetails.status_arb !== null
                          ? ''
                          : tenderDetails && tenderDetails.status
                        : tenderDetails && tenderDetails.status
                    }
                    name={arb ? 'status_arb' : 'status'}
                  >
                    <option value="">Please Select</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Quotation Sent">Quotation Sent</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="On Hold">On Hold</option>
                  </Input>
                </FormGroup>
              </Col>

              {/* <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdTradingEnq.Client')?.[genLabel]}{' '}
                    
                    <span className="required">*</span>
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? tenderDetails && tenderDetails.company_name_arb
                          ? tenderDetails.company_name_arb
                          : tenderDetails && tenderDetails.company_name_arb !== null
                          ? ''
                          : tenderDetails && tenderDetails.company_name
                        : tenderDetails && tenderDetails.company_name
                    }
                    
                    name={arb ? 'company_name_arb' : 'company_name'}
                    disabled
                  ></Input>
                </FormGroup>
              </Col> */}
              {/* <Col md="3">
                <Label>
                  Client <span className="required"> *</span>{' '}
                </Label>
                <Input
                  type="text"
                  name="company_name"
                  value={tenderDetails && tenderDetails.company_name}
                  // className={`form-control ${
                  //   formSubmitted && tenderDetails.company_id.trim() === '' ? 'highlight' : ''
                  // }`}
                  onChange={handleInputs}
                  disabled
                > */}
              {/* <option>Please Select</option>
                  {company &&
                    company.map((ele) => {
                      return (
                        <option key={ele.company_id} value={ele.company_id}>
                          {ele.company_name}
                        </option>
                      );
                    })} */}
              {/* </Input> */}
              {/* {formSubmitted && tenderDetails.company_id.trim() === '' && (
                      <div className="error-message">Please Select Client</div>
                    )} */}
              {/* </Col> */}

              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdTradingEnq.Reference')?.[genLabel]}{' '}
                    {/*Access the value property */}
                    
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? tenderDetails && tenderDetails.office_ref_no_arb
                          ? tenderDetails.office_ref_no_arb
                          : tenderDetails && tenderDetails.office_ref_no_arb !== null
                          ? ''
                          : tenderDetails && tenderDetails.office_ref_no
                        : tenderDetails && tenderDetails.office_ref_no
                    }
                    name={arb ? 'office_ref_no_arb' : 'office_ref_no'}
                  ></Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {
                      arabic.find((item) => item.key_text === 'mdTradingEnq.Expiry Date')?.[
                        genLabel
                      ]
                    }{' '}
                    {/*Access the value property */}
                    
                  </Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={
                      arb
                        ? tenderDetails && tenderDetails.project_end_date_arb
                          ? tenderDetails.project_end_date_arb
                          : tenderDetails && tenderDetails.project_end_date_arb !== null
                          ? ''
                          : tenderDetails && tenderDetails.project_end_date
                        : tenderDetails && tenderDetails.project_end_date
                    }
                    name={arb ? 'project_end_date_arb' : 'project_end_date'}
                  ></Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdTradingEnq.Notes')?.[genLabel]}{' '}
                    {/*Access the value property */}
                    
                  </Label>
                  <Input
                    type="textarea"
                    onChange={handleInputs}
                    value={
                      arb
                        ? tenderDetails && tenderDetails.service_arb
                          ? tenderDetails.service_arb
                          : tenderDetails && tenderDetails.service_arb !== null
                          ? ''
                          : tenderDetails && tenderDetails.services
                        : tenderDetails && tenderDetails.services
                    }
                    name={arb ? 'service_arb' : 'services'}
                  ></Input>
                </FormGroup>
              </Col>
            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>
    </div>
  );
}

import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

export default function ProjectQuoteMoreDetails({
  tenderDetails,
  handleInputs,
  company,
  getContact,
  arb,
  subcon,
  arabic,
  genLabel
}) {
  ProjectQuoteMoreDetails.propTypes = {
    tenderDetails: PropTypes.object,
    handleInputs: PropTypes.object,
    company: PropTypes.object,
    subcon: PropTypes.object,
    getContact: PropTypes.any,
    arb: PropTypes.any,
    arabic: PropTypes.any,
    genLabel: PropTypes.any,
  };
  return (
    <div>
      {' '}
      <Form>
        <FormGroup>
          <ComponentCard title="Job Details" creationModificationDate={tenderDetails}>
            <Row>
              <Col md="3">
                <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobOrder.Job Number')?.[genLabel]}
                <span className="required"> *</span>
              </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.job_code}
                    name="job_code"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobOrder.Job Title')?.[genLabel]}
              </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            tenderDetails && tenderDetails.job_title_arb ? tenderDetails.job_title_arb :
                            (tenderDetails && tenderDetails.job_title_arb !== null ? '' : tenderDetails && tenderDetails.job_title)
                          )
                        : (tenderDetails && tenderDetails.job_title)
                    }
                    name={arb ? 'job_title_arb': 'job_title'}
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobOrder.Date')?.[genLabel]}
              </Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.job_date}
                    name="job_date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobOrder.Customer')?.[genLabel]}
              </Label>
                  <Input
                    type="select"
                    onChange={(e) => {
                      handleInputs(e);
                      getContact(e.target.value);
                    }}
                    value={tenderDetails && tenderDetails.company_id}
                    name="company_id"
                    disabled
                  >
                    <option value="selected">Please Select</option>
                    {company &&
                      company.map((e) => {
                        return (
                          <option key={e.company_id} value={e.company_id}>
                            {' '}
                            {arb?e.company_name_arb:e.company_name}{' '}
                          </option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Col>
          
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobOrder.Reference')?.[genLabel]}
              </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            tenderDetails && tenderDetails.ref_no_job_arb ? tenderDetails.ref_no_job_arb :
                            (tenderDetails && tenderDetails.ref_no_job_arb !== null ? '' : tenderDetails && tenderDetails.ref_no_job)
                          )
                        : (tenderDetails && tenderDetails.ref_no_job)
                    }
                    name={arb ? 'ref_no_job_arb': 'ref_no_job'}
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <Label>SubCon</Label>
              <FormGroup>
                <Input
                  type="select"
                  name="sub_con_id"
                  onChange={handleInputs}
                  value={tenderDetails && tenderDetails.sub_con_id}

                >
                  <option value="">Select SubCon</option>

                  {subcon &&
                    subcon.map((ele) => {
                      return (
                        <option key={ele.sub_con_id} value={ele.sub_con_id}>
                          {ele.company_name}
                        </option>
                      );
                    })}
                </Input>
              </FormGroup>
            </Col>

              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobOrder.Status')?.[genLabel]}
              </Label>
                  <Input
                    type="select"
                    value={tenderDetails && tenderDetails.job_status}
                    onChange={handleInputs}
                    name="job_status"
                  >
                    <option selected="selected" value="New">
                      New
                    </option>
                    <option value="Quoted">Quoted</option>
                    <option value="Awarded">Awarded</option>
                    <option value="Not Awarded">Not Awarded</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Cancelled">Completed</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJobOrder.Net Total')?.[genLabel]}
              </Label>
                  <Input
                    type="text"
                    value={tenderDetails && tenderDetails.InvoiceAmount}
                    onChange={handleInputs}
                    name="InvoiceAmount"
                    disabled
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

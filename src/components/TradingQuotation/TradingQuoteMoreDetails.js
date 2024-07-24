import React, { useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import api from '../../constants/api';
import ComponentCard from '../ComponentCard';
import TenderContactDetails from './TenderContactDetails';

export default function TradingQuoteMoreDetails({
  tenderDetails,
  handleInputs,
  handleAddNewContact,
  company,
  contact,
  AddNewContact,
  addContactModal,
  addContactToggle,
  getContact,
  // arb,
  // arabic,
}) {
  TradingQuoteMoreDetails.propTypes = {
    tenderDetails: PropTypes.object,
    handleInputs: PropTypes.object,
    company: PropTypes.object,
    contact: PropTypes.any,
    addContactModal: PropTypes.any,
    addContactToggle: PropTypes.any,
    AddNewContact: PropTypes.any,
    handleAddNewContact: PropTypes.any,
    getContact: PropTypes.any,
    // arb: PropTypes.any,
    // arabic: PropTypes.any,
  };

  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };

  const selectedLanguage = getSelectedLanguageFromLocalStorage();

  // Use the selected language value as needed
  console.log('Selected language from localStorage:', selectedLanguage);

  const [arabic, setArabic] = useState([]);

  const arb = selectedLanguage === 'Arabic';

  //const eng = selectedLanguage === 'English';

  const getArabicCompanyName = () => {
    api
      .get('/tradingquote/getTranslationforTradingQuote')
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
    <div>
      {' '}
      <Form>
        <FormGroup>
          <ComponentCard title="Quotation Details" creationModificationDate={tenderDetails}>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {
                      arabic.find((item) => item.key_text === 'mdTradingQuote.Enquiry Code')?.[
                        genLabel
                      ]
                    }{' '}
                     </Label>{' '}
                    {/*Access the value property */}
                    <span className="required">*</span>
                 
                  <br />
                  <Link to={`/EnquiryEdit/${tenderDetails && tenderDetails.opportunity_id}`}>
                    {arb
                      ? tenderDetails && tenderDetails.opportunity_code_arb
                        ? tenderDetails.opportunity_code_arb
                        : tenderDetails && tenderDetails.opportunity_code_arb !== null
                        ? ''
                        : tenderDetails && tenderDetails.opportunity_code
                      : tenderDetails && tenderDetails.opportunity_code}
                  </Link>
                </FormGroup>
              </Col>

              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {
                      arabic.find((item) => item.key_text === 'mdTradingQuote.Quotation Code')?.[
                        genLabel
                      ]
                    }{' '}
                    {/*Access the value property */}
                    
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? tenderDetails && tenderDetails.quote_code_arb
                          ? tenderDetails.quote_code_arb
                          : tenderDetails && tenderDetails.quote_code_arb !== null
                          ? ''
                          : tenderDetails && tenderDetails.quote_code
                        : tenderDetails && tenderDetails.quote_code
                    }
                    name={arb ? 'quote_code_arb' : 'quote_code'}
                    disabled
                  ></Input>
                </FormGroup>
              </Col>
              {/* <Col md="3">
                <FormGroup>
                  <Label>
                    Quotation Code <span className="required"> *</span>
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.quote_code}
                    name="quote_code"
                    disabled
                  />
                </FormGroup>
              </Col> */}

              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {
                      arabic.find((item) => item.key_text === 'mdTradingQuote.Quotation Date')?.[
                        genLabel
                      ]
                    }{' '}
                    {/*Access the value property */}
                    {/* <span className="required">*</span> */}
                  </Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={
                      arb
                        ? tenderDetails && tenderDetails.quote_date_arb
                          ? tenderDetails.quote_date_arb
                          : tenderDetails && tenderDetails.quote_date_arb !== null
                          ? ''
                          : tenderDetails && tenderDetails.quote_date
                        : tenderDetails && tenderDetails.quote_date
                    }
                    name={arb ? 'quote_date_arb' : 'quote_date'}
                    disabled
                  ></Input>
                </FormGroup>
              </Col>

              <Col md="3">
                <FormGroup>
                  {arabic.find((item) => item.key_text === 'mdTradingQuote.Customer')?.[genLabel]}
                  {/* <span className="required"> *</span> */}
                  <Input
                    type="select"
                    onChange={(e) => {
                      handleInputs(e);
                      getContact(e.target.value);
                    }}
                    //className={inputClass}
                    value={tenderDetails?.company_id || ''}
                    name="company_id"
                    disabled
                  >
                    <option value="selected">Please Select</option>
                    {company &&
                      company.map((e) => {
                        return (
                          <option key={e.company_id} value={e.company_id}>
                            {' '}
                            {arb ? e.company_name_arb : e.company_name}{' '}
                          </option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Col>
              {/* <Col md="3">
                <FormGroup>
                  <Label>Company Name</Label>

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
                            {e.company_name}{' '}
                          </option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Col> */}

              <Col md="3">
                <FormGroup>
                  <Label>
                  {arabic.find((item) => item.key_text === 'mdTradingQuote.Contact')?.[genLabel]} (OR){' '}
                    <span className="anchor" onClick={addContactToggle.bind(null)}>
                      <b>
                        <u>{arb ?'قائمة الاقتباس':"Add New Contact"}
          </u>
                      </b>
                    </span>
                  </Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.contact_id}
                    name="contact_id"
                  >
                    <option value="" selected>
                      Please Select
                    </option>
                    {contact &&
                      contact.map((e) => {
                        return (
                          <option key={e.contact_id} value={e.contact_id}>
                           {arb ? e.first_name_arb : e.first_name}{' '}
                          </option>
                        );
                      })}
                    <TenderContactDetails
                      addContactModal={addContactModal}
                      addContactToggle={addContactToggle}
                      AddNewContact={AddNewContact}
                      handleAddNewContact={handleAddNewContact}
                    ></TenderContactDetails>
                  </Input>
                </FormGroup>
              </Col>

              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {
                      arabic.find((item) => item.key_text === 'mdTradingQuote.Reference')?.[
                        genLabel
                      ]
                    }{' '}
                   
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
                    disabled
                  ></Input>
                </FormGroup>
              </Col>
              {/* <Col md="3">
                <FormGroup>
                  <Label>Reference</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.office_ref_no}
                    name="office_ref_no"
                  />
                </FormGroup>
              </Col> */}
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdTradingQuote.Status')?.[genLabel]}{' '}
                    {/*Access the value property */}
                    
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? tenderDetails && tenderDetails.quote_status_arb
                          ? tenderDetails.quote_status_arb
                          : tenderDetails && tenderDetails.quote_status_arb !== null
                          ? ''
                          : tenderDetails && tenderDetails.quote_status
                        : tenderDetails && tenderDetails.quote_status
                    }
                    name={arb ? 'quote_status_arb' : 'quote_status'}
                  >
                    {' '}
                    <option selected="selected" value="New">
                      New
                    </option>
                    <option value="Quoted">Quoted</option>
                    <option value="Awarded">Awarded</option>
                    <option value="Not Awarded">Not Awarded</option>
                    <option value="Cancelled">Cancelled</option>
                  </Input>
                </FormGroup>
              </Col>
              {/* <Col md="3">
                <FormGroup>
                  <Label>Status</Label>
                  <Input
                    type="select"
                    value={tenderDetails && tenderDetails.quote_status}
                    onChange={handleInputs}
                    name="quote_status"
                  >
                    <option selected="selected" value="New">
                      New
                    </option>
                    <option value="Quoted">Quoted</option>
                    <option value="Awarded">Awarded</option>
                    <option value="Not Awarded">Not Awarded</option>
                    <option value="Cancelled">Cancelled</option>
                  </Input>
                </FormGroup>
              </Col> */}
            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>
    </div>
  );
}

import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

const ProposalDetails = () => {
  const [quotecode, setQuoteCode] = useState();
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const { id } = useParams();
  const navigate = useNavigate();
  

  //Api call for getting Enquiry dropdown
  const getEnquiryCode = () => {
    api.get('/proposal/getProjectQuoteCode').then((res) => {
      setQuoteCode(res.data.data);
    });
  };

  
  //Logic for adding tender in db
  const [tenderForms, setTenderForms] = useState({
    title: '',
    proposal_date: '',
    project_quote_id:'',
    proposal_code:'',
    
  });

  const handleInputsTenderForms = (e) => {
    setTenderForms({ ...tenderForms, [e.target.name]: e.target.value });
  };

  //Api for getting all countries
  
  //const[tenderDetails,setTenderDetails]=useState();
  const getProposalById = () => {
    api
      .post('/proposal/getProposalById', { proposal_id: id })
      .then((res) => {
        setTenderForms(res.data.data);
        // getContact(res.data.data.company_id);
      })
      .catch(() => {});
  };
  //get staff details
  const { loggedInuser } = useContext(AppContext);

  //console.log(tenderDetails);
  const insertProposal= (code) => {
    setFormSubmitted(true);
    if ( tenderForms.title.trim() !== '' && tenderForms.proposal_date.trim() !== '' && tenderForms.project_quote_id.trim() !== '') {
      tenderForms.proposal_code = code;
      tenderForms.creation_date = creationdatetime;
      tenderForms.created_by = loggedInuser.first_name;
      api
        .post('/proposal/insertProposal', tenderForms)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          getProposalById();
          message('Proposal inserted successfully.', 'success');
          //   setTimeout(() => {
          navigate(`/ProposalEdit/${insertedDataId}?tab=1`);
          //   }, 300);
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };

  const generateCode = () => {
    api
      .post('/tender/getCodeValue', { type: 'proposal' })
      .then((res) => {
        insertProposal(res.data.data);
      })
      .catch(() => {
        insertProposal('');
      });
  };

  useEffect(() => {
    // getCompany();
    getEnquiryCode();
  }, [id]);
const inputClass = `form-control ${
  formSubmitted && (!tenderForms.project_quote_id || tenderForms.project_quote_id === 'Please Select') ? 'highlight' : ''
}`;

  return (
    <div>
      <BreadCrumbs />
      <Row>
        <ToastContainer></ToastContainer>
        <Col md="6" xs="12">
          <ComponentCard title="New Proposal">
            <Form>
              <FormGroup>
                <Col md="9">
                  <Label>Quote Code <span className="required"> *</span>{' '}</Label>
                  <Input
                    type="select"
                    onChange={handleInputsTenderForms}
                    value={tenderForms && tenderForms.project_quote_id}
                    name="project_quote_id"
                    className={inputClass}
                  >
                    <option value="">Please Select</option>
                    {quotecode &&
                      quotecode.map((e) => {
                        return (
                          <option key={e.project_quote_id} value={e.project_quote_id}>
                            {' '}
                            {e.quote_code} - {e.company_name}
                          </option>
                        );
                      })}
                  </Input>
                  {(formSubmitted && !tenderForms.project_quote_id) && (
      <div className="error-message">Please Select</div>
    )}
                </Col>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md="9">
                    <Label>
                      {' '}
                      Proposal Date <span className="required"> *</span>{' '}
                    </Label>
                    <Input
                      type="date"
                      name="proposal_date"
                      value={tenderForms && tenderForms.proposal_date}
                      onChange={handleInputsTenderForms}
                      className={`form-control ${
                      formSubmitted && tenderForms.proposal_date.trim() === '' ? 'highlight' : ''
                    }`}
                    />
                    {formSubmitted && tenderForms.proposal_date.trim() === '' && (
                      <div className="error-message">Please Select the Date</div>
                    )}
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md="9">
                    <Label>
                      Title <span className="required"> *</span>{' '}
                    </Label>
                    <Input
                      type="text"
                      name="title"
                      //value={tenderForms && tenderForms.company_id}
                      onChange={handleInputsTenderForms}
                      className={`form-control ${
                      formSubmitted && tenderForms.title.trim() === '' ? 'highlight' : ''
                    }`}
                    ></Input>
                    {formSubmitted && tenderForms.title.trim() === '' && (
                      <div className="error-message">Please Enter the Title</div>
                    )}
                  </Col>
                </Row>
              </FormGroup>
              
              <Row>
                <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                  <Button
                    type="button"
                    color="primary"
                    className="btn mr-2 shadow-none"
                    onClick={() => {
                      generateCode();
                    }}
                  >
                    Save & Continue
                  </Button>
                  <Button
                    className="shadow-none"
                    color="dark"
                    onClick={() => {
                      if (
                        window.confirm(
                          'Are you sure you want to cancel  \n  \n You will lose any changes made',
                        )
                      ) {
                        navigate(-1);
                      }
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </Row>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
};

export default ProposalDetails;

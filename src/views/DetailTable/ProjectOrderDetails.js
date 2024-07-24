import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Form, FormGroup, Input, Button,Label } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

const OpportunityDetails = () => {
  const [quote, setQuote] = useState();
  const [insertQuote, setInsertQuote] = useState({
    project_quote_id: '',
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const { loggedInuser } = useContext(AppContext);
  //Api call for getting company dropdown
  const getQuote = () => {
    api.get('/projectsalesorder/getProjectQuote').then((res) => {
      setQuote(res.data.data);
    });
  };

  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  const selectedLanguage = getSelectedLanguageFromLocalStorage();

  // Use the selected language value as needed
  console.log('Selected language from localStorage:', selectedLanguage);
 

  const [arabic, setArabic] = useState([]);

  const arb = selectedLanguage === 'Arabic';

  // const eng = selectedLanguage === 'English';

  const getArabicCompanyName = () => {
    api
      .get('/finance/getTranslationforTradingOrder')
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
  const getOrdersByOrderId = () => {
    api.post('/finance/getFinanceById', { order_id: id }).then((res) => {
      setInsertQuote(res.data.data);
    
    });
  };
  const handleInputs = (e) => {
    setInsertQuote({ ...insertQuote, [e.target.name]: e.target.value });
  };


  //console.log(tenderDetails);
 const insertOrder = (orderCode,companyId) => {
  console.log('insertQuote.quote_id:', insertQuote.project_quote_id);
  if (insertQuote.project_quote_id !== '') {
    insertQuote.order_code = orderCode;
    insertQuote.creation_date = creationdatetime;
    insertQuote.created_by = loggedInuser.first_name;
    insertQuote.company_id = companyId;
    api
      .post('/projectsalesorder/insertOrder', insertQuote)
      .then((res) => {
        const insertedDataId = res.data.data.insertId;
        const quoteId = insertQuote.project_quote_id;

        // Navigate to OrdersEdit page with quote_id and insertedDataId as query parameters
  
        navigate(`/ProjectOrderEdit/${insertedDataId}/${quoteId}`);
        console.log('insertedDataId', insertedDataId);
        console.log('quoteId', quoteId);
      })
      .catch(() => {
        message('Network connection error.', 'error');
      });
  } else {
    message('Please fill all required fields', 'warning');
  }
};
  //QUTO GENERATED CODE
  // const generateCode = () => {
  //   api
  //     .post('/commonApi/getCodeValue', { type: 'orders' })
  //     .then((res) => {
  //       insertOrder(res.data.data);
  //     })
  //     .catch(() => {
  //       insertOrder('');
  //     });
  // };

  const generateCode = () => {
    api.post('/commonApi/getCodeValue', { type: 'projectorders' })
      .then((res) => {
        const orderCode = res.data.data;
  
        // Fetch company_id based on quote_id
        const selectedQuote = quote.find((quotes) => quotes.project_quote_id === insertQuote.project_quote_id);
        console.log('Selected Quote:', selectedQuote);
        console.log('Selected Quote:', selectedQuote);
        if (selectedQuote) {
          const companyId = selectedQuote.company_id;
          console.log('Company ID:', companyId);
          
          // Call insertOrder with quote code and company ID
          insertOrder(orderCode, companyId);
        } else {
          console.error('Selected quote not found');
          insertOrder(orderCode, ''); // If company_id not found, pass empty string
        }
      })
      .catch((error) => {
        console.error('Error fetching code value:', error);
        insertOrder('', ''); // If error, pass empty string for quote code and company_id
      });
  };


  useEffect(() => {
    getQuote();
    getOrdersByOrderId();
    
  }, [id]);

  return (
    <div>
      <BreadCrumbs />
      <Row>
        <ToastContainer></ToastContainer>
        <Col md="6" xs="12">
          <ComponentCard title="New Order">
            <Form>
              <FormGroup>
              
              </FormGroup>
              <FormGroup>
                <Row>
                  {/* <Col md="9">
                    <Label>
                    Quote Code <span className="required"> *</span>{' '}
                    </Label>
                    <Input
                      type="select"
                      name="quote_id"
                      value={insertQuote && insertQuote.quote_id}
                      onChange={handleInputs}
                    >
                      <option>Please Select</option>
                      {quote &&
                        quote.map((ele) => {
                          return (
                            <option key={ele.quote_id} value={ele.quote_id}>
                              {ele.quote_code}
                            </option>
                          );
                        })}
                    </Input>
                  </Col> */}

                  <Col md="9">
                <FormGroup>
                  <Label>
                  {arabic.find((item) => item.key_text === 'mdTradingOrder.Quote Code')?.[genLabel]}
                  <span className="required"> *</span>
                  </Label>
                  <Input
                    type="select"
                    onChange={(e) => {
                      setInsertQuote({ ...insertQuote, project_quote_id: e.target.value });
                      handleInputs(e);
                    }}
                    
                    value={insertQuote?.project_quote_id || ''}
                    name="project_quote_id"
                  >
                    <option value="selected">Please Select</option>
                    {quote &&
                      quote.map((e) => {
                        return (
                          <option key={e.project_quote_id} value={e.project_quote_id}>
                            {' '}
                            {arb?e.quote_code_arb:e.quote_code}{' '}
                          </option>
                        );
                      })}
                  </Input>
                </FormGroup>
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

export default OpportunityDetails;

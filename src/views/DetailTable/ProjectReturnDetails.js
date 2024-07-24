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

const ProjectReturnDetails = () => {
  const [invoice, setInvoice] = useState();
  const [insertReturn, setInsertReturn] = useState({
    project_invoice_id:'',
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const { loggedInuser } = useContext(AppContext);
  //Api call for getting company dropdown
  const getQuote = () => {
    api.get('/projectsalesreturn/getInvoice').then((res) => {
      setInvoice(res.data.data);
    });
  };

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInsertReturn({ ...insertReturn, [name]: value });
  };

  //console.log(tenderDetails);
  const insertOrder = () => {
    if (insertReturn.project_invoice_id !== '') {
      // Check if it's not an empty string
      insertReturn.creation_date = creationdatetime;
      insertReturn.created_by = loggedInuser.first_name;
      api
        .post('/projectsalesreturn/insertSalesReturn', insertReturn)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          const invoiceId = insertReturn.project_invoice_id;

          // Navigate to the next page with both invoice_id and sales_return_id
          navigate(`/ProjectReturnEdit/${insertedDataId}/${invoiceId}`);
          console.log('insertedDataId', insertedDataId);
          console.log('invoiceId', invoiceId);
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };

  useEffect(() => {
    getQuote();
    
  }, [id]);
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
    .get('/projectsalesreturn/getTranslationforTradingProjSalesReturn')
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

  // let genLabel = '';

  // if (arb === true) {
  //   genLabel = 'arb_value';
  // } else { 
  //   genLabel = 'value';
  // }

  return (
    <div>
      <BreadCrumbs />
      <Row>
        <ToastContainer></ToastContainer>
        <Col md="6" xs="12">
          <ComponentCard title={ arb ? 'عودة جديدة' :'New Return'}>
            <Form>
              <FormGroup></FormGroup>
              <FormGroup>
                <Row>
                  <Col md="9">
                  <Label>
                  {arb ? 'الفواتير' : ' Invoices'}
                      <span className="required"> *</span>{' '}
                    </Label>  
                  <Input
                      type="select"
                      name="project_invoice_id"
                      value={insertReturn.project_invoice_id}
                      onChange={handleInputs}
                    >
                      <option>
                      { arb ? 'الرجاء التحديد' : 'Please Select' }</option>
                      {invoice &&
                        invoice.map((ele) => {
                          return (
                            <option key={ele.project_invoice_id} value={ele.project_invoice_id}>
                              {' '}
                            {arb?ele.project_invoice_code_arb:ele.project_invoice_code} - {arb?ele.company_name_arb:ele.company_name}

                            </option>
                          );
                        })}
                    </Input>
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
                      insertOrder();
                    }}
                  >
                    {arb ?'حفظ ومتابعة':'Save & Continue'}
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
                    {arb ?'يلغي':'Cancel'}
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

export default ProjectReturnDetails;

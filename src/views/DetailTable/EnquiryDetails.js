import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';
import creationdatetime from '../../constants/creationdatetime';
import TenderCompanyDetails from '../../components/TenderTable/TenderCompanyDetails';
import AppContext from '../../context/AppContext';

const OpportunityDetails = () => {
  const [company, setCompany] = useState();
  const [allCountries, setallCountries] = useState();
  const [modal, setModal] = useState(false);
  const [categoryLinked, setCategoryLinked] = useState();
  //const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const toggle = () => {
    setModal(!modal);
  };
  const { loggedInuser } = useContext(AppContext);

  const [tenderForms, setTenderForms] = useState({
    title: '',
    company_id: '',
    category: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [addFormSubmitted, setAddFormSubmitted] = useState(false);

  //Api call for getting company dropdown
  const getCompany = () => {
    api.get('/company/getCompany').then((res) => {
      setCompany(res.data.data);
      // if (res.data.data && res.data.data.length > 0) {
      //   // Assuming the newly added company is at the end of the list
      //   const newlyAddedCompanyId = res.data.data[res.data.data.length - 1].company_id;
      //   setTenderForms({ ...tenderForms, company_id: newlyAddedCompanyId }); // Set the last company as selected
      // }
    });
  };

  //Logic for adding company in db
  const [companyInsertData, setCompanyInsertData] = useState({
    company_name: '',
    company_name_arb:'',
    address_street: '',
    address_street_arb:'',
    address_flat: '',
    address_flat_arb: '',
    address_country: '',
    address_po_code: '',
    address_po_code_arb: '',
    phone: '',
    fax: '',
    website: '',
    supplier_type: '',
    industry: '',
    company_size: '',
    source: '',
  });


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
      .get('/enquiry/getTranslationforTradingEnq')
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

  const handleInputs = (e) => {
    setCompanyInsertData({ ...companyInsertData, [e.target.name]: e.target.value });
  };

  const handleInputsTenderForms = (e) => {
    setTenderForms({ ...tenderForms, [e.target.name]: e.target.value });
  };

  const insertCompany = () => {
    if ((arb && companyInsertData.company_name_arb.trim() !== '') || (!arb && companyInsertData.company_name.trim() !== '') &&
    (arb && companyInsertData.address_flat_arb.trim() !== '') || (!arb && companyInsertData.address_flat.trim() !== '') &&
    (arb && companyInsertData.address_po_code_arb.trim() !== '') || (!arb && companyInsertData.address_po_code.trim() !== ''))
 {
      // // Check if the entered company name already exists in the company list
      // const isCompanyExists =
      //   company && company.some((comp) => comp.company_name === companyInsertData.company_name ||
      //                                    comp.company_name_arb === companyInsertData.company_name_arb);


      // if (isCompanyExists) {
      //   message('Company already exists.', 'error');
      // } else {
        api
          .post('/company/insertCompany', companyInsertData)
          .then((res) => {
            message('Company inserted successfully.', 'success');
            getCompany();
            console.log('rescomp', res.data.data);
            const newlyAddedCompanyId = res.data.data.insertId;
            setTenderForms({ ...tenderForms, company_id: newlyAddedCompanyId });
            setTenderForms({ ...tenderForms, company_id: res.data.data.insertId }); // Set selected company ID after insertion
            toggle();

            //window.location.reload();
          })
          .catch(() => {
            message('Network connection error.', 'error');
          });
      }
      setAddFormSubmitted(true);
    // } else {
    //   setAddFormSubmitted(true);
    //   message('Please fill all required fields.', 'warning');
    // }
  };

  //Logic for adding tender in db

  //Api for getting all countries
  const getAllCountries = () => {
    api
      .get('/clients/getCountry')
      .then((res) => {
        setallCountries(res.data.data);
      })
      .catch(() => {
        message('Country Data Not Found', 'info');
      });
  };
  //const[tenderDetails,setTenderDetails]=useState();
  const getTendersById = () => {
    api
      .post('/tender/getTendersById', { opportunity_id: id })
      .then((res) => {
        setTenderForms(res.data.data);
        // getContact(res.data.data.company_id);
      })
      .catch(() => {});
  };
  //console.log(tenderDetails);
  const insertTender = (code) => {
    if ( (arb && tenderForms.title_arb.trim() !== '') || (!arb && tenderForms.title.trim() !== '') ) {
      tenderForms.opportunity_code = code;
      tenderForms.creation_date = creationdatetime;
      tenderForms.created_by = loggedInuser.first_name;
      api
        .post('/tender/insertTenders', tenderForms)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          getTendersById();
          message('Tender inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/EnquiryEdit/${insertedDataId}?tab=1`);
          }, 300);
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      setFormSubmitted(true);
      message('Please fill all required fields', 'warning');
    }
  };

  //QUTO GENERATED CODE
  const generateCode = () => {
    api
      .post('/commonApi/getCodeValue', { type: 'enquiry' })
      .then((res) => {
        insertTender(res.data.data);
      })
      .catch(() => {
        insertTender('');
      });
  };

  const getCategory = () => {
    api.get('/tender/getCategoryFromValueList', categoryLinked).then((res) => {
      setCategoryLinked(res.data.data);
    });
  };

  useEffect(() => {
    getCompany();
    getCategory();
    getAllCountries();
  }, [id]);

  // const inputClass = `form-control ${
  //   formSubmitted && (!tenderForms.company_id || tenderForms.company_id === 'Please Select')
  //     ? 'highlight'
  //     : ''
  // }`;

  // const inputClass1 = `form-control ${
  //   formSubmitted && (!tenderForms.category || tenderForms.category === 'Please Select')
  //     ? 'highlight'
  //     : ''
  // }`;
 
  return (
    <div>
      <BreadCrumbs />
      <Row>
        <ToastContainer></ToastContainer>
        <Col md="6" xs="12">
          <ComponentCard title="New Enquiry">
            <Form>
              <FormGroup>
                <Row>
                
              <Col md="9">
                        <FormGroup>
                          <Label dir="rtl" style={{ textAlign: 'right' }}>
                            {
                              arabic.find((item) => item.key_text === 'mdTradingEnq.Title')?.[
                                genLabel
                              ]
                            }
                          </Label>
                          <span className="required">*</span>
                          <Input
                            type="text"
                            onChange={handleInputsTenderForms}
                            value={
                              arb
                                ? tenderForms && tenderForms.title_arb
                                  ? tenderForms.title_arb
                                  : tenderForms && tenderForms.title_arb !== null
                                  ? ''
                                  : tenderForms && tenderForms.title
                                : tenderForms && tenderForms.title
                            }
                            name={arb ? 'title_arb' : 'title'}
                            className={`form-control ${
                              formSubmitted &&
                              ((arb && tenderForms.title_arb.trim() === '') ||
                                (!arb && tenderForms.title.trim() === ''))
                                ? 'highlight'
                                : ''
                            }`}
                          />

                          {formSubmitted &&
                            ((arb &&
                              tenderForms &&
                              tenderForms.title_arb.trim() === '') ||
                              (!arb && tenderForms.title.trim() === '')) && (
                              <div className="error-message">Please Enter</div>
                            )}
                        </FormGroup>
                      </Col>
              
                  {/* <Col md="9">
                    <Label>
                      {' '}
                      Title <span className="required"> *</span>{' '}
                    </Label>
                    <Input
                      type="text"
                      name="title"
                      onChange={handleInputsTenderForms}
                      className={`form-control ${
                        formSubmitted && tenderForms && tenderForms.title.trim() === ''
                          ? 'highlight'
                          : ''
                      }`}
                    />
                    {formSubmitted && tenderForms && tenderForms.title.trim() === '' && (
                      <div className="error-message">Please Enter</div>
                    )}
                  </Col> */}
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                <Col md="9">
                <FormGroup>
                  {arabic.find((item) => item.key_text === 'mdTradingEnq.Client')?.[genLabel]}
                  <span className="required"> *</span>
                  <Input
                    type="select"
                    onChange={(e) => {
                      setTenderForms({ ...tenderForms, company_id: e.target.value });
                      handleInputsTenderForms(e);
                    }}
                    //className={inputClass}
                    value={tenderForms?.company_id || ''}
                    name="company_id"
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
                  {/* <Col md="9">
                    <Label>
                      Client <span className="required"> *</span>{' '}
                    </Label>
                    <Input
                      type="select"
                      name="company_id"
                      className={inputClass}
                      //value={tenderForms && tenderForms.company_id}
                      value={tenderForms?.company_id || ''}
                      onChange={(e) => {
                        setTenderForms({ ...tenderForms, company_id: e.target.value });
                        handleInputsTenderForms(e);
                      }}
                    >
                      <option value="" selected="selected">
                        Please Select
                      </option>
                      {company &&
                        company.map((ele) => {
                          return (
                            <option key={ele.company_id} value={ele.company_id}>
                              {ele.company_name}
                            </option>
                          );
                        })}
                    </Input>
                  </Col> */}
                  <Col md="3" className="addNew">
                    <Button color="primary" className="shadow-none" onClick={toggle.bind(null)}>
                        {arb ?'اضف جديد':'Add New'}
                    </Button>
                  </Col>
              
                </Row>
                {/* <FormGroup>
                  <Label>
                    Company Name (OR){' '}
                                     </Label>
                  <Input
                    type="select"
                    onChange={
                      handleInputsTenderForms
                      
                    }
                    value={companyInsertData && companyInsertData.company_name}
                    name="company_id"
                  >
                    <option >Please Select</option>
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
                </FormGroup> */}
              </FormGroup>
              <TenderCompanyDetails
                allCountries={allCountries}
                insertCompany={insertCompany}
                handleInputs={handleInputs}
                toggle={toggle}
                modal={modal}
                setModal={setModal}
                addFormSubmitted={addFormSubmitted}
                companyInsertData={companyInsertData}
                tenderForms={tenderForms}
              ></TenderCompanyDetails>
              <FormGroup>
                
              <Col md="9">
                <FormGroup>
                  {arabic.find((item) => item.key_text === 'mdTradingEnq.Category')?.[genLabel]}
                  <span className="required"> *</span>
                  <Input
                  type="select"
                  onChange={handleInputsTenderForms}
                  value={tenderForms && tenderForms.category}
                  name="category"
                  //className={inputClass1}
                  >
                    <option value="selected">Please Select</option>
                    {categoryLinked &&
                      categoryLinked.map((e) => {
                        return (
                          <option key={e.value} value={e.value}>
                            {' '}
                            {arb?e.value_arb:e.value}{' '}
                          </option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Col>
                {/* <Col md="9">
                  <Label>
                    Category <span className="required"> *</span>
                  </Label>
                  <Input
                    type="select"
                    onChange={handleInputsTenderForms}
                    value={tenderForms && tenderForms.category}
                    name="category"
                    className={inputClass1}
                  >
                    <option value="" selected="selected">
                      Please Select
                    </option>
                    {categoryLinked &&
                      categoryLinked.map((ele) => {
                        return <option value={ele.value}>{ele.value}</option>;
                      })}
                  </Input>
                  {formSubmitted && !tenderForms.category && (
                    <div className="error-message">Please Select</div>
                  )}
                </Col> */}
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

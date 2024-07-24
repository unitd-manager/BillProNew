import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button, TabPane, TabContent } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useNavigate, useParams } from 'react-router-dom';
import '../form-editor/editor.scss';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import creationdatetime from '../../constants/creationdatetime';
import ComponentCard from '../../components/ComponentCard';
//import ComponentCardV2 from '../../components/ComponentCardV2';
import message from '../../components/Message';
import api from '../../constants/api';
import WorkOrderLinked from '../../components/SubConModal/WorkOrderlinked';
import SubConTable from '../../components/SubConModal/SubConTable';
import ApiButton from '../../components/ApiButton';
import AppContext from '../../context/AppContext';
import Tab from '../../components/project/Tab';
import Tabs from '../../components/project/Tabs';


const SubConEdit = () => {
  //all state variables
  const [subCon, setSubCon] = useState();
  const [status, setStatus] = useState();
  const [subConWorkOrder, setSubConWorkOrder] = useState();
  const [allCountries, setAllCountries] = useState();
  const [editWorkOrderLinked, setEditWorkOrderLinked] = useState(false);
  const [subconStatus, setSubconStatus] = useState();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { loggedInuser } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('1');

  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  const tabs = [
    { id: '1', name: 'Job Order Linked' },
    
  ];
  const tabsArb = [
    { id: '1', name: 'أمر العمل مرتبط' },
   
  ];
  const toggle = (tab) => {
    setActiveTab(tab);
  };
const selectedLanguage = getSelectedLanguageFromLocalStorage();
const [arabic, setArabic] = useState([]);


  const arb =selectedLanguage === 'Arabic'
  

  const getArabicCompanyName = () => {
      api
      .get('/subcon/getTranslationForSubcon')
      .then((res) => {
        setArabic(res.data.data);
      })
      .catch(() => {
        // Handle error if needed
      });   
  };
  
  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }


  //navigation and params
  const { id } = useParams();
  const navigate = useNavigate();
  // Get SubCon By Id
  const getsubCon = () => {
    api
      .post('/subcon/getSubconById', { sub_con_id: id })
      .then((res) => {
        setSubCon(res.data.data[0]);
      })
      .catch(() => {
        message('subcon not found', 'info');
      });
  };

  const handleInputs = (e) => {
    setSubCon({ ...subCon, [e.target.name]: e.target.value });
  };
  //Logic for edit data in db
  const editSubConData = () => {
    
    if (subCon.company_name !== '' && subCon.address_flat !== ''){
      subCon.modification_date = creationdatetime;
      subCon.modified_by = loggedInuser.first_name;

      api
        .post('/subcon/edit-Subcon', subCon)
        .then(() => {
          message('Record editted successfully', 'success');
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
      }else {
        setFormSubmitted(true);
      message('Please fill all required fields.', 'warning');
    }
  };
  //Logic for edit data in db
  const Status = () => {
    api
      .post('/subcon/getStatus', { sub_con_id: id })
      .then((res) => {
        setStatus(res.data.data[0]);
      })

      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };
  const backToList = () => {
    navigate('/Subcon');
  };
  useEffect(() => {
    getsubCon();
    getArabicCompanyName();
  }, [id]);

  
  const subconeditdetails = () => {
    api
      .get('/supplier/getCountry')
      .then((res) => {
        setAllCountries(res.data.data);
      })
      .catch(() => {
        message('SubCon Data Not Found', 'info');
      });
  };
  //Api call for getting Staff Type From Valuelist
  const getSubconStatus = () => {
    api
      .get('/subcon/getValueList')
      .then((res) => {
        setSubconStatus(res.data.data);
      })
      .catch(() => {
        message('Status Data Not Found', 'info');
      });
  };
  useEffect(() => {
    // Get purchaseOrder By Id
  const getworkOrder = () => {
    api
      .post('/subcon/getJobWorkOrderLink', { sub_con_id: id })
      .then((res) => {
        setSubConWorkOrder(res.data.data);
      })
      // .catch(() => {
      //   message('SubCon not found', 'info');
      // });
  };
    getworkOrder();
    subconeditdetails();
    getSubconStatus();
    Status();
  }, []);
  return (
    <>
      <BreadCrumbs heading={subCon && subCon.company_name} />

      <Form>
        <FormGroup>
          {/* <ComponentCardV2>
            <Row>
              <Col>
                <Button
                  color="primary"
                  className="shadow-none"
                  onClick={() => {
                    editSubConData();
                    navigate('/Subcon');
                  }}
                >
                  {arb ?'يحفظ':'Save'}
                </Button>
              </Col>
              <Col>
                <Button
                  color="primary"
                  className="shadow-none"
                  onClick={() => {
                    editSubConData();
                  }}
                >
                  {arb ?'يتقدم':'Apply'}
                </Button>
              </Col>
              <Col>
                <Button
                  color="secondary"
                  className="shadow-none"
                  onClick={() => {
                    navigate('/Subcon');
                  }}
                >
                  {arb ?'الرجوع للقائمة':'Back to List'}
                </Button>
              </Col>
            </Row>
          </ComponentCardV2> */}
          <ApiButton
              editData={editSubConData}
              navigate={navigate}
              applyChanges={editSubConData}
              //deleteData={deleteBookingData}
              backToList={backToList}
              module="SubCon"
            ></ApiButton>
          <ComponentCard title="SubCon Details" creationModificationDate={subCon}>
            <Row>
              <Col md="3">
                <FormGroup>
                 
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdSubcon.Name')?.[genLabel]}
                
              </Label><span className="required"> *</span>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            subCon && subCon.company_name_arb ? subCon.company_name_arb :
                            (subCon && subCon.company_name_arb !== null ? '' : subCon && subCon.company_name)
                          )
                        : (subCon && subCon.company_name)
                    }
                    name={arb ? 'company_name_arb': 'company_name'}
                    className={`form-control ${
                      formSubmitted && subCon.company_name_arb && subCon.company_name === '' ? 'highlight' : ''
                    }`}
                  />
                </FormGroup>
                {formSubmitted &&  subCon.company_name_arb&&subCon.company_name === '' && (
                  <div className="error-message">Please Enter</div>
                )}
              </Col>
              <Col md="3">
                <FormGroup>
                 
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdSubcon.Email')?.[genLabel]}
              </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            subCon && subCon.email_arb ? subCon.email_arb :
                            (subCon && subCon.email_arb !== null ? '' : subCon && subCon.email)
                          )
                        : (subCon && subCon.email)
                    }
                    name={arb ? 'email_arb': 'email'}
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                 
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdSubcon.Fax')?.[genLabel]}
              </Label> 
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            subCon && subCon.fax_arb ? subCon.fax_arb :
                            (subCon && subCon.fax_arb !== null ? '' : subCon && subCon.fax)
                          )
                        : (subCon && subCon.fax)
                    }
                    name={arb ? 'fax_arb': 'fax'}
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
               
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdSubcon.Mobile')?.[genLabel]}
              </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            subCon && subCon.mobile_arb ? subCon.mobile_arb :
                            (subCon && subCon.mobile_arb !== null ? '' : subCon && subCon.mobile)
                          )
                        : (subCon && subCon.mobile)
                    }
                    name={arb ? 'mobile_arb': 'mobile'}
                  />
                </FormGroup>
              </Col>
              </Row>
              <Row>
              <Col md="3">
                <FormGroup>
                
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdSubcon.Status')?.[genLabel]}
              </Label>
                  <Input
                    type="select"
                    name="status"
                    onChange={handleInputs}
                    value={subCon && subCon.status}
                  >
                    <option defaultValue="selected">Please Select</option>
                    <option value="current">Current</option>
                    <option value="old">Old</option>
                    {subconStatus &&
                      subconStatus.map((ele) => {
                        return (
                          <option key={ele.value} value={ele.value}>
                            {ele.value}
                          </option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </ComponentCard>
        </FormGroup>
        <FormGroup>
          <ComponentCard title="Address">
            <Row>
              <Col md="3">
                <FormGroup>
               
                    <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdSubcon.Address 1')?.[genLabel]}
                
              </Label>
                 
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            subCon && subCon.address_flat_arb ? subCon.address_flat_arb :
                            (subCon && subCon.address_flat_arb !== null ? '' : subCon && subCon.address_flat)
                          )
                        : (subCon && subCon.address_flat)
                    }
                    name={arb ? 'address_flat_arb': 'address_flat'}
                    className={`form-control ${
                      formSubmitted &&  subCon.address_flat_arb && subCon.address_flat=== '' ? 'highlight' : ''
                    }`}
                  />
                </FormGroup>
                {formSubmitted &&  subCon.address_flat_arb && subCon.address_flat === '' && (
                  <div className="error-message">Please Enter</div>
                )}
              </Col>
              <Col md="3">
                <FormGroup>
               
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdSubcon.Address 2')?.[genLabel]}
              </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
            
                    value={
                      arb
                        ? (
                            subCon && subCon.address_street_arb ? subCon.address_street_arb :
                            (subCon && subCon.address_street_arb !== null ? '' : subCon && subCon.address_street)
                          )
                        : (subCon && subCon.address_street)
                    }
                    name={arb ? 'address_street_arb': 'address_street'}
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                 
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdSubcon.Country')?.[genLabel]}
              </Label>
                  <Input
                    type="select"
                    name="address_country"
                    onChange={handleInputs}
                    value={subCon && subCon.address_country}
                  >
                    <option defaultValue="selected">Please Select</option>
                    {allCountries &&
                      allCountries.map((country) => (
                        <option key={country.country_code} value={country.country_code}>
                          {country.name}
                        </option>
                      ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                 
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdSubcon.Postal Code')?.[genLabel]}
              </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            subCon && subCon.address_state_arb ? subCon.address_state_arb :
                            (subCon && subCon.address_state_arb !== null ? '' : subCon && subCon.address_state)
                          )
                        : (subCon && subCon.address_state)
                    }
                    name={arb ? 'address_state_arb': 'address_state'}
                  />
                </FormGroup>
              </Col>
            </Row>
            {status &&
              (status.status === 'New' ||
                status.status === 'Confirmed' ||
                status.status === 'Hold' ||
                status.status === 'Paid' ||
                status.status === 'Due' ||
                status.status === 'Partially Paid' ||
                status.status === 'paid') && (
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button
                      className="shadow-none"
                      onClick={() => {
                        setEditWorkOrderLinked(true);
                      }}
                      color="primary"
                    >
                      Make Sub Con Payment
                    </Button>
                  </div>
                </Row>
              )}
          </ComponentCard>
        </FormGroup>
      </Form>
      <WorkOrderLinked
        editWorkOrderLinked={editWorkOrderLinked}
        setEditWorkOrderLinked={setEditWorkOrderLinked}
      ></WorkOrderLinked>
        <ToastContainer></ToastContainer>
        <ComponentCard title="More Details">
{ arb === true ?
        <Tabs toggle={toggle} tabsArb={tabsArb} />: <Tab toggle={toggle} tabs={tabs} />
        }

        <TabContent className="p-4" activeTab={activeTab}>
       
<TabPane tabId="1">

        <SubConTable subConWorkOrder={subConWorkOrder}></SubConTable>
        </TabPane>
        </TabContent>
        </ComponentCard>
    </>
  );
};

export default SubConEdit;

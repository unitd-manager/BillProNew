import React, {useState,useEffect,useContext} from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

const ChartOfAccountDetails = () => {
  //Navigation and Parameter Constants
  const navigate = useNavigate();

  const [category, setCategory] = useState();

  const getGroup = () => {
    api.get('/accountsMap/getParentItem').then((res) => {
      setCategory(res.data.data);
    });
  };

  useEffect(() => {
    getGroup();
  }, []);


  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
const selectedLanguage = getSelectedLanguageFromLocalStorage();

// Use the selected language value as needed
console.log('Selected language from localStorage:', selectedLanguage);

const [arabic, setArabic] = useState([]);

const arb =selectedLanguage === 'Arabic'
//const eng =selectedLanguage === 'English'

const getArabicCompanyName = () => {
  api
  .get('/translation/getTranslationForCompanyAcc')
  .then((res) => {
    setArabic(res.data.data);
  })
  .catch(() => {
    // Handle error if needed
  });   
};

console.log('arabic',arabic)
useEffect(() => {
getArabicCompanyName();
}, []);

let genLabel = '';

if (arb === true) {
  genLabel = 'arb_value';
} else {
  genLabel = 'value';
}
const { loggedInuser } = useContext(AppContext);

  //Logic for adding Planning in db
  const [chartOfAccountForms, setChartOfAccountForms] = useState({
    title: '',
    title_arb: '',
    acc_category_id: '',
    opening_balance_credit: '0.0000',
    opening_balance_debit:'0.0000',
    opening_balance_credit_base:'0.0000',
    opening_balance_debit_base:'0.0000',
  });

  //setting data in PlanningForms
  const handleChartOfAccountForms = (e) => {
    setChartOfAccountForms({ ...chartOfAccountForms, [e.target.name]: e.target.value });
  };

  //Api for insertPlanning
  const insertChartOfAccount = () => {

    if ((chartOfAccountForms.title !== '' || chartOfAccountForms.title_arb !== '') && chartOfAccountForms.acc_category_id !== '') {      chartOfAccountForms.creation_date = creationdatetime;
      chartOfAccountForms.created_by = loggedInuser.first_name;
      api
        .post('/chartOfAccounts/insertChartAc', chartOfAccountForms)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          message('Record inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/ChartofACEdit/${insertedDataId}`);
          }, 300);
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };

  return (
    <div>
      <BreadCrumbs />
      <ToastContainer></ToastContainer>
      <Row>
        <Col md="6">
          <ComponentCard title="Key Details">
            <Form>
              <FormGroup>
                <Row>
                  <Col md="12">
                
                    <Label dir="rtl" style={{ textAlign: 'right' }}>
                        {arabic.find((item) => item.key_text === 'mdChartAcc.Title')?.[genLabel]}<span className="required"> *</span>
                      </Label>
                    <Input
                      type="text"
                      name=  {arb ? 'title_arb' : 'title'}
                      onChange={handleChartOfAccountForms} 
                    />
                  </Col>
                </Row>
                </FormGroup>
                <FormGroup>
                <Row>
                  <Col md="12">
                  
                    <Label dir="rtl" style={{ textAlign: 'right' }}>
                        {arabic.find((item) => item.key_text === 'mdChartAcc.Category')?.[genLabel]}
                      </Label>
                 
                      <Input type="select" name={arb ? 'acc_category_id' : 'acc_category_id'} onChange={handleChartOfAccountForms}>
                          <option value="">{arb ? 'الرجاء التحديد' : 'Please Select'}</option>
                          {category?.map(option => (
                              <option key={option.acc_category_id} value={`${option.acc_category_id}`}>
                                {arb ? option.title_arb : option.title}
                              </option>
                            ))}
                        </Input>

                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button
                      color="primary"
                      onClick={() => {
                        insertChartOfAccount();
                      }}
                      type="button"
                      className="btn mr-2 shadow-none"
                    >
                      Save & Continue
                    </Button>
                    <Button
                      onClick={() => {
                        navigate(-1);
                      }}
                      type="button"
                      className="btn btn-dark shadow-none"
                    >
                      Go to List
                    </Button>
                  </div>
                </Row>
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
};
export default ChartOfAccountDetails;

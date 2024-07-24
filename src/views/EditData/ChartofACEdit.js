import React, { useEffect, useState , useContext} from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import message from '../../components/Message';
import creationdatetime from '../../constants/creationdatetime';
import api from '../../constants/api';
//import AccountMapButton from '../../components/Accounts/AccountMapButton';
import ComponentCard from '../../components/ComponentCard';
import ApiButton from '../../components/ApiButton';
import AppContext from '../../context/AppContext';


const ChartofACEdit = () => {
  //Const Variables
  const [chartofAC, setChartofAC] = useState();
  const [menuItems, setMenuItems] = useState([]);

  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();

  // Button Save Apply Back List
 // const applyChanges = () => { };
  const backToList = () => {
    navigate('/ChartOfAccounts');
  };

  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
const selectedLanguage = getSelectedLanguageFromLocalStorage();

// Use the selected language value as needed
console.log('Selected language from localStorage:', selectedLanguage);

  // Get Leaves By Id
  const ChartofACById = () => {
    api
      .post('/chartofaccounts/getChartofACById', { acc_head_id: id })
      .then((res) => {
        setChartofAC(res.data.data[0]);
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  const getGroup = () => {
    api.get('/accountsMap/getParentItem').then((res) => {
      setMenuItems(res.data.data);
    });
  };
  const [arabic, setArabic] = useState([]);


  const arb =selectedLanguage === 'Arabic'

  

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

  // Handle Data
  const handleInputs = (e) => {
    setChartofAC({ ...chartofAC, [e.target.name]: e.target.value });
  };
  const { loggedInuser } = useContext(AppContext);

  //Logic for edit data in db 
  const editChartOfAcc = () => {
    chartofAC.modification_date = creationdatetime;
    chartofAC.modified_by = loggedInuser.first_name;

      api
        .post('/chartofaccounts/editChartAc', chartofAC)
        .then(() => {
          message('Record editted successfully', 'success');
          ChartofACById();
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
  };

  useEffect(() => {
    ChartofACById();
    getGroup();
  }, [id]);

  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }

  return (
    <>
      {/* BreadCrumbs */}
      <BreadCrumbs />
      <ToastContainer></ToastContainer>
    
      {/* Button */}
      {/* <AccountMapButton
        editData={editChartOfAcc}
        navigate={navigate}
        applyChanges={applyChanges}
        backToList={backToList}
      ></AccountMapButton> */}
<ApiButton
              editData={editChartOfAcc}
              navigate={navigate}
              applyChanges={editChartOfAcc}
              //deleteData={deleteBookingData}
              backToList={backToList}
              module="ChartofAC"
            ></ApiButton>
      {/* Main Details */}
      <ComponentCard title="Chart of AC Edit" creationModificationDate={chartofAC}>
        <Form>
          <FormGroup>
            <Row>
              <Col md="4">
            <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdChartAcc.Title')?.[genLabel]}
              </Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={
                  arb
                    ? (chartofAC && chartofAC.title_arb ? chartofAC && chartofAC.title_arb : 
                      (chartofAC && chartofAC.title_arb !== null ? '' : chartofAC && chartofAC.title)

                      )
                    : (chartofAC && chartofAC.title)
            
                }
                name={arb ? 'title_arb' : 'title'}
              />
            </FormGroup>
          </Col>
              <Col md="4">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdChartAcc.Code')?.[genLabel]}
              </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={chartofAC && chartofAC?.code}
                    name="code"
                  />
                </FormGroup>
              </Col>

              <Col md="4">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdChartAcc.Category')?.[genLabel]}
              </Label>
                  <Input 
                    type="select"
                    name={arb ? 'acc_category_id' : 'acc_category_id'}  
                    value={arb ? chartofAC && chartofAC?.acc_category_id:chartofAC && chartofAC?.acc_category_id} 
                    onChange={handleInputs}
                  >
                    <option value="selected">Please Select</option>
                    {menuItems?.map((item) => (
                      <option
                        key={item.acc_category_id}
                        value={item.acc_category_id}
                      >
                         {arb ? item.title_arb : item.title}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>

            </Row>
          </FormGroup>
        </Form>
      </ComponentCard>

    </>
  );
};
export default ChartofACEdit;

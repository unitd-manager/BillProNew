import React, { useState, useEffect } from 'react';
import {
  Row,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  CardTitle, Button
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import moment from 'moment';
import { ToastContainer } from 'react-toastify';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import api from '../../constants/api';
import message from '../../components/Message';

const JournalDetails = () => {
  const navigate = useNavigate();
  const [journalEntry, setJournalEntry] = useState('');

  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
const selectedLanguage = getSelectedLanguageFromLocalStorage();

// Use the selected language value as needed
console.log('Selected language from localStorage:', selectedLanguage);

const [arabic, setArabic] = useState([]);

const arb =selectedLanguage === 'Arabic'

const getArabicCompanyName = () => {
  api
  .get('/translation/getTranslationForCompanyJournal')
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


  const getJournalEntry = () => {
    api
      .get('/journal/getAccHeadTitle')
      .then((res) => {
        const options = res.data.data.map(item => ({
          value: arb ? item.title_arb : item.title,
          label: arb ? item.title_arb : item.title,
          id: item.acc_head_id,
        }));
        setJournalEntry(options);
      })
  };

  const [journalDetail, setJournalDetail] = useState({
    entry_date: moment(Date.now()).format('YYYY-MM-DD'),
    narration_main: '',
    narrationarb_main: '',
    acc_head1: null,
    acc_head2: null,
    debit1: 0,
    debit2: 0,
    credit1: 0,
    credit2: 0,
    narration1: '',
    narration2: '',
    narrationarb1: '',
    narrationarb2: '',
  });

    // Handle changes in input fields and select elements
    const handleInputs = (e) => {
      const { name, value } = e.target;
      setJournalDetail({
        ...journalDetail,
        [name]: value,
      });
    };

    const handleSelectChange = (name, selectedOption) => {
      const selectedValue = selectedOption ? selectedOption.id : null;
      setJournalDetail({
        ...journalDetail,
        [name]: selectedValue,
      });
    };

    const handleSaveAndContinue = async () => {
      if (
        !journalDetail.acc_head1 ||
        !journalDetail.acc_head2
      ) {
        // Handle validation error, e.g., show a message to the user.
        message('Please fill in all required fields.', 'warning');
        return;
      }
    
      if ((journalDetail.debit1 && journalDetail.credit1) || (journalDetail.debit2 && journalDetail.credit2)) {
        message('You can only insert either debit or credit in a row, not both.', 'warning');
        return;
      }

      const requestData = {
        entry_date: journalDetail.entry_date,
        voucher_type: 'Journal',
        narration: journalDetail.narration_main,
        narration_arb: journalDetail.narrationarb_main,
        creation_date: journalDetail.entry_date,
        modification_date: journalDetail.entry_date,
        acc_head_id_1: journalDetail.acc_head1,
        debit_1: journalDetail.debit1,
        credit_1: journalDetail.credit1,
        debit_base_1: 0,
        credit_base_1: 0,
        narration_1: journalDetail.narration1,
        narrationarb_1: journalDetail.narrationarb1,
        acc_head_id_2: journalDetail.acc_head2,
        debit_2: journalDetail.debit2,
        credit_2: journalDetail.credit2,
        debit_base_2:0,
        credit_base_2:0,
        narration_2: journalDetail.narration2,
        narrationarb_2: journalDetail.narrationarb2,
      };

      try {
        const response = await api.post('/journal/insertJournalAndMaster', requestData);
    
        if (response.status === 200) {
          // const insertedDataId = response.data.data.insertId;
          message('Record inserted successfully', 'success');
          setTimeout(() => {
            navigate(`/Journal`);
          }, 300);
        } else {
          console.error('API error:', response.data);
        }
      } catch (error) {
        console.error('API error:', error);
      }
    };

 useEffect(() => {
    getJournalEntry();
  }, []);


  return (
    <>
      <BreadCrumbs heading='' />
      <ToastContainer></ToastContainer>
      <Row>
        <Col md="12">
          <Card>
            <CardBody className="bg-light">
              <CardTitle tag="h4" className="mb-0">
                Journal Entry
              </CardTitle>
            </CardBody>
            <CardBody>
              <Form>
                <Row>
                  <Col md="4">
                    <FormGroup>
                      <Label>
                        Entry Date <span className="required"> *</span>
                      </Label>
                      <Input type="date" name="entry_date"
                        defaultValue={moment(Date.now()).format('YYYY-MM-DD')}
                        onChange={handleInputs}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="8">
                    <FormGroup>
                      <Label>Narration</Label>
                      <Input type="text" name={arb ? 'narrationarb_main' : 'narration_main'} onChange={handleInputs} />
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </CardBody>
            <CardBody>
              <div>
                <table className="table">
                  <thead>
                    <tr className="bg-light">
                      <th>
                        <Row>
                          <Col md="8">
                          {arabic.find((item) => item.key_text === 'mdJournal.Account')?.[genLabel]}
                          </Col>
                          <Col md="2">
                            Debit
                          </Col>
                          <Col md="2">
                            Credit
                          </Col>
                        </Row>
                      </th>
                      <th>
                        {/* Right side cell content */}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Row>
                          <Col md="8">
                            <FormGroup>
                              <Select
                                value={journalDetail.value}
                                onChange={(selectedOption) =>
                                  handleSelectChange('acc_head1', selectedOption)
                                }
                                options={journalEntry}
                              />
                              <Label></Label>
                              <Input type="text" name={arb ? 'narrationarb1' : 'narration1'} placeholder="Narration"
                                onChange={handleInputs}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="2">
                            <FormGroup>
                              <Input type="text" name="debit1" placeholder="Debit" onChange={handleInputs} />
                            </FormGroup>
                          </Col>
                          <Col md="2">
                            <FormGroup>
                              <Input type="text" name="credit1" placeholder="Credit" onChange={handleInputs} />
                            </FormGroup>
                          </Col>
                        </Row>
                      </td>
                      <td>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Row>
                          <Col md="8">
                            <FormGroup>
                              <Select
                                value={journalDetail.value}
                                onChange={(selectedOption) =>
                                  handleSelectChange('acc_head2', selectedOption)
                                }
                                options={journalEntry}
                              />
                              <Label></Label>
                              <Input type="text" name={arb ? 'narrationarb2' : 'narration2'} placeholder="Narration" onChange={handleInputs} />
                            </FormGroup>
                          </Col>
                          <Col md="2">
                            <FormGroup>
                              <Input type="text" name="debit2" placeholder="Debit" onChange={handleInputs} />
                            </FormGroup>
                          </Col>
                          <Col md="2">
                            <FormGroup>
                              <Input type="text" name="credit2" placeholder="Credit" onChange={handleInputs} />
                            </FormGroup>
                          </Col>
                        </Row>
                      </td>
                      <td>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardBody>
            <CardBody class="pt-0 card-body">
              <FormGroup>
                <Row>
                  <div className="d-flex align-items-center gap-2">
                    <Button
                      className="shadow-none"
                      color="primary"
                      onClick={() => {
                        handleSaveAndContinue();
                      }}
                    >
                      Save & Continue
                    </Button>
                    <Button
                      type="button"
                      className="btn btn-dark shadow-none"
                      onClick={() => {
                        navigate('/Journal');
                      }}
                    >
                      Go to List
                    </Button>
                  </div>
                </Row>
              </FormGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default JournalDetails
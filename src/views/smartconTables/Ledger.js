import React, { useEffect, useState } from 'react';
import { Row, Button, Col, Table, Card, CardBody, Label } from 'reactstrap';
import * as Icon from 'react-feather';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { ToastContainer } from 'react-toastify';
import api from '../../constants/api';
import ExportReport from '../../components/Report/ExportReport';

function Ledger() {

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
  .get('/translation/getTranslationForCompanyLedger')
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
const arabicCompanyName = arabic.find((item) => item.key_text === 'mdLedger.EntryDate')?.[genLabel];
const arabicEdit = arabic.find((item) => item.key_text === 'mdLedger.Edit')?.[genLabel];
const arabicSNo = arabic.find((item) => item.key_text === 'mdLedger.SNo')?.[genLabel];
const arabicNarration = arabic.find((item) => item.key_text === 'mdLedger.Narration')?.[genLabel];
const arabicDebit = arabic.find((item) => item.key_text === 'mdLedger.Debit')?.[genLabel];
const arabicCredit = arabic.find((item) => item.key_text === 'mdLedger.Credit')?.[genLabel];
const arabicplease = arabic.find((item) => item.key_text === 'mdLedger.please')?.[genLabel];
const arabicAccount = arabic.find((item) => item.key_text === 'mdLedger.Account')?.[genLabel];
const arabicLedger = arabic.find((item) => item.key_text === 'mdLedger.Ledger')?.[genLabel];
const arabicTotal = arabic.find((item) => item.key_text === 'mdLedger.Total')?.[genLabel];
const arabicGo = arabic.find((item) => item.key_text === 'mdLedger.Go')?.[genLabel];

  const columns = [
    {
      name: arabicSNo,
      selector: 'journal_id',
    },
    {
      name: arabicEdit,
      selector: 'edit',
      cell: () => <Icon.Edit2 />,
    },
    {
      name: arabicCompanyName,
      selector: 'entry_date',
    },
    {
      name: arabicNarration,
      selector:arb ? 'narrationarb_main' : 'narration_main',
    },
    {
      name: arabicDebit,
      selector: 'debit',
    },
    {
      name: arabicCredit,
      selector: 'credit',
    },
    // {
    //   name: 'Balance',
    //   selector: 'total_cpf',
    // },
  
  ];

  // New 
  const [journalEntry, setJournalEntry] = useState('');
  const [accountData, setAccountData] = useState('');
  const [totalCredit, setTotalCredit] = useState('');
  const [totalDebit, setTotalDebit] = useState('');
  const [ledgerBal, setLedgerBal] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');

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
  const [journalDetail, setJournalDetail] = useState({});
  const handleSelectChange = (name, selectedOption) => {

    const selectedValue = selectedOption ? selectedOption.id : null;
    const selectedAcc = selectedOption ? selectedOption.value : null;
    setSelectedAccount(selectedAcc)
    setJournalDetail({
      ...journalDetail,
      [name]: selectedValue,
    });
  };

  const getAccountsData = () => {
    api
      .post('/ledger/getAccounts', journalDetail)
      .then((res) => {
        let TotalCreditAmm = 0;
        let TotalDebitAmm = 0;
        setAccountData(res.data.data);
        console.log("getAccounts", res.data.data);
        res.data.data.forEach((el) => {
          TotalCreditAmm += el.credit;
          TotalDebitAmm += el.debit;
        });
        setTotalCredit(TotalCreditAmm);
        setTotalDebit(TotalDebitAmm);
        setLedgerBal(TotalCreditAmm - TotalDebitAmm)
      })
  };

  useEffect(() => {
    getJournalEntry()
  }, []);

  console.log("journalDetail", journalDetail)
  return (
    <div className="">
      <ToastContainer></ToastContainer>
      <div className="card p-2 shadow-none">
        <Row><Label className="p-2 text-center"> {arabicplease}</Label></Row>
        <Row>
          <Col></Col>
          <Col md="8">
            <Select
              value={journalDetail.value}
              onChange={(selectedOption) =>
                handleSelectChange('acc_head', selectedOption)
              }
              options={journalEntry}
            />
          </Col>
          <Col md="2">
            <Button
              color="primary"
              className="shadow-none"
              onClick={() => {
                getAccountsData();
              }}
            >
              {arabicGo}
            </Button>
          </Col>
          <Col></Col>
        </Row>
        <Row className='m-4'>
          <Col md="6">
            <b>{arabicAccount}:</b> &nbsp; <span>{selectedAccount}</span>
          </Col>
          <Col md="6">
            <b>{arabicLedger}.:</b> &nbsp; <span>{ledgerBal}</span>
          </Col>
        </Row>
      </div>

      <Card>
        <CardBody>
          <Row>
            <Col>
              <ExportReport columns={columns} data={accountData} exportValue="Ledger" />
            </Col>
          </Row>
        </CardBody>

        <CardBody>
          <Table>
            <thead>
              <tr>
                {columns.map((cell) => {
                  return <td key={cell.name}>{cell.name}</td>;
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <b></b>
                </td>
                <td>
                  <b></b>
                </td>
                <td>
                  <b></b>
                </td>
                <td>
                  <b>{arabicTotal}</b>
                </td>
                <td>
                  <b>-{totalDebit}</b>
                </td>
                <td>
                  <b>{totalCredit}</b>
                </td>
                <td>
                  <b></b>
                </td>
                <td>
                  <b></b>
                </td>
              </tr>
              {accountData &&
                accountData.map((element, index) => {
                  return (
                    <tr key={element.journal_id}>
                      <td>{index + 1}</td>
                      <td>
                        <Link to={`/JournalEdit/${element.journal_master_id}?tab=1`}>
                          <Icon.Edit2 />
                        </Link>
                      </td>
                      <td>{element.entry_date}</td>
                      <td>
                        {arb ? (
                          <span>{element.narrationarb_main}<br />{element.narration_arb}</span>
                        ) : (
                          <span>{element.narration_main}<br />{element.narration}</span>
                        )}
                    </td>
                      <td>{element.debit}</td>
                      <td>{element.credit}</td>
                      {/* <td></td> */}
                 
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Ledger
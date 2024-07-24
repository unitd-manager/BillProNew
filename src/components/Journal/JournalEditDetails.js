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
    CardTitle
} from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import api from '../../constants/api';

const JournalEditDetails = ({ journalData, handleInputs, journalMasterData, handleInputsMaster }) => {
    JournalEditDetails.propTypes = {
        journalData: PropTypes.bool,
        handleInputs: PropTypes.func,
        journalMasterData: PropTypes.bool,
        handleInputsMaster: PropTypes.func,
    };
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
    const [journalEntry, setJournalEntry] = useState('');

    const getJournalEntry = () => {
        api
            .get('/journal/getAccHeadTitle')
            .then((res) => {
                const options = res.data.data.map(item => ({
                    value: arb ? item.title_arb : item.title,
                    label: arb ? item.title_arb : item.title,
                    id: item.acc_head_id,
                }));
                console.log("options", options)
                setJournalEntry(options);
            })
    };

    useEffect(() => {
        getJournalEntry();
    }, []);
    const arabicNarration = arabic.find((item) => item.key_text === 'mdJournal.Narration')?.[genLabel];

    return (
        <>
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
                                          
                                         <Label >
                                            {arabic.find((item) => item.key_text === 'mdJournal.EntryDate')?.[genLabel]}<span className="required"> *</span>
                                        </Label>
                                            <Input type="date" name="entry_date" onChange={handleInputsMaster}
                                                value={moment(journalMasterData?.entry_date, 'YYYY-MM-DD').format('YYYY-MM-DD')}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="8">
                                        <FormGroup>
                                        <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdJournal.Narration')?.[genLabel]}
              </Label>
                                            <Input type="text" name={arb ? 'narration_arb' : 'narration'}  onChange={handleInputsMaster} defaultValue={arb ?journalMasterData.narration_arb:journalMasterData.narration} />
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
                                                        
                                        
                                            {arabic.find((item) => item.key_text === 'mdJournal.Account')?.[genLabel]}<span className="required"> *</span>
                                        
                                                    </Col>
                                                    <Col md="2">
                                                    {arabic.find((item) => item.key_text === 'mdJournal.Debit')?.[genLabel]}<span className="required"> *</span>

                                                    </Col>
                                                    <Col md="2">
                                                    {arabic.find((item) => item.key_text === 'mdJournal.Credit')?.[genLabel]}<span className="required"> *</span>

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
                                                            <Input
                                                                type="select"
                                                                onChange={(e) => handleInputs(e, journalData[0]?.journal_master_id, journalData[0]?.journal_id)}
                                                                value={journalData[0]?.acc_head_id}
                                                                name="acc_head_id"
                                                            >
                                                                <option value="">Please Select</option>
                                                                {journalEntry &&
                                                                    journalEntry.map((e) => (
                                                                        <option key={e.id} value={e.id}>
                                                                            {e.value}
                                                                        </option>
                                                                    ))}
                                                            </Input>
                                                            <Label></Label>
                                                            <Input type="text" name={arb ? 'narration_arb' : 'narration'}  placeholder={arabicNarration}
                                                                onChange={(e) => handleInputs(e, journalData[0]?.journal_master_id, journalData[0]?.journal_id)} defaultValue={arb?journalData[0]?.narration_arb:journalData[0]?.narration}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="2">
                                                        <FormGroup>
                                                            <Input type="text" name="debit" placeholder="Debit" onChange={(e) => handleInputs(e, journalData[0]?.journal_master_id, journalData[0]?.journal_id)} defaultValue={journalData[0]?.debit} />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="2">
                                                        <FormGroup>
                                                            <Input type="text" name="credit" placeholder="Credit" onChange={(e) => handleInputs(e, journalData[0]?.journal_master_id, journalData[0]?.journal_id)} defaultValue={journalData[0]?.credit} />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            </td>
                                            <td>
                                                {/* Right side cell content */}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Row>
                                                    <Col md="8">
                                                        <FormGroup>
                                                            <Input
                                                                type="select"
                                                                onChange={(e) => handleInputs(e, journalData[1]?.journal_master_id, journalData[1]?.journal_id)}
                                                                value={journalData[1]?.acc_head_id}
                                                                name="acc_head_id"
                                                            >
                                                                <option value="">Please Select</option>
                                                                {journalEntry &&
                                                                    journalEntry.map((e) => (
                                                                        <option key={e.id} value={e.id}>
                                                                            {e.value}
                                                                        </option>
                                                                    ))}
                                                            </Input>

                                                            <Label></Label>
                                                            <Input type="text" name={arb ? 'narration_arb' : 'narration'}  placeholder={arabicNarration} onChange={(e) => handleInputs(e, journalData[1]?.journal_master_id, journalData[1]?.journal_id)} defaultValue={arb?journalData[1]?.narration_arb:journalData[1]?.narration} />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="2">
                                                        <FormGroup>
                                                            <Input type="text" name="debit" placeholder="Debit" onChange={(e) => handleInputs(e, journalData[1]?.journal_master_id, journalData[1]?.journal_id)} defaultValue={journalData[1]?.debit} />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="2">
                                                        <FormGroup>
                                                            <Input type="text" name="credit" placeholder="Credit" onChange={(e) => handleInputs(e, journalData[1]?.journal_master_id, journalData[1]?.journal_id)} defaultValue={journalData[1]?.credit} />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            </td>
                                            <td>
                                                {/* Right side cell content */}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default JournalEditDetails
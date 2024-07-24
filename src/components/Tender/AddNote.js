import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Input } from 'reactstrap';
import message from '../Message';
import api from '../../constants/api';
import AppContext from '../../context/AppContext';
import creationdatetime from '../../constants/creationdatetime';


function AddNote({ recordId, roomName }) {
  AddNote.propTypes = {
    recordId: PropTypes.string,
    roomName: PropTypes.string,
  };
  const { loggedInuser } = useContext(AppContext);
  const [addNoteData, setAddNoteData] = useState({
    comments: '',
    comments_arb:'',
    room_name: roomName,
    record_id: recordId,
    creation_date: creationdatetime,
    created_by: loggedInuser.first_name,
  });
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
const selectedLanguage = getSelectedLanguageFromLocalStorage();
 
  const arb =selectedLanguage === 'Arabic'
  const handleData = (e) => {
    setAddNoteData({ ...addNoteData, [e.target.name]: e.target.value });
  };

  const SubmitNote = () => {
    api.post('/note/addNote', addNoteData).then(() => {
      message('Add Note Successfully', 'success');
      setTimeout(() => {
        window.location.reload();
      }, 400);
    });
  };

  return (
    <>
      <Row>
        {/* <textarea id="note" name="comments" rows="4" cols="50" onChange={handleData} /> */}
        <Input
                type="textarea"
                onChange={handleData}
                value={
                  arb
                    ? addNoteData && addNoteData.comments_arb
                    : addNoteData && addNoteData.comments
                }
                name={arb ? 'comments_arb' : 'comments'}
              />
      </Row>
      <Row className="mb-2"></Row>
      <Row className="mb-1">
        <Col md="1">
          <button type="button" className="btn btn-primary btn-sm shadow-none" onClick={SubmitNote}>
            Submit
          </button>
        </Col>
        <Col md="1">
          <button type="button" className="btn btn-dark btn-sm shadow-none">
            Cancel
          </button>
        </Col>
      </Row>
    </>
  );
}

export default AddNote;

import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'reactstrap';
import ComponentCardV2 from '../ComponentCardV2';

function JournalButton({ navigate,editJournalData,editJournalMasterData }) {
    JournalButton.propTypes = {
    navigate: PropTypes.any,
    editJournalData: PropTypes.func,
    editJournalMasterData: PropTypes.func,
  };
  return (
    <div>
      <ComponentCardV2>
      <Row>
          <Col>
          <Button
                className="shadow-none"
                color="primary"
                onClick={() => {
                  editJournalData()
                  editJournalMasterData()
                  setTimeout(() => {
                    navigate('/Journal');
                    //window.location.reload();
                  }, 800);
                }}
              >
                Save
              </Button>
          </Col>
          <Col>
            <Button
              color="primary"
              className="shadow-none"
              onClick={() => {
                editJournalData()
                editJournalMasterData()
              }}
            >
              Apply
            </Button>
          </Col>
         
          <Col>
            <Button
              className="shadow-none"
              color="dark"
              onClick={() => {
                navigate('/Journal');
              }}
            >
              Back to List
            </Button>
          </Col>
        </Row>
      </ComponentCardV2>
    </div>
  );
}

export default JournalButton;

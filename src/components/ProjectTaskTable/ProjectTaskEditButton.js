import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'reactstrap';
import ComponentCardV2 from '../ComponentCardV2';

function PojectTaskEditButton({ editTask, navigate,arb }) {
    PojectTaskEditButton.propTypes = {
    editTask: PropTypes.any,
    navigate: PropTypes.any,
    arb: PropTypes.any,
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
                    editTask();
                  setTimeout(() => {
                    navigate('/ProjectTask');
                  }, 800);
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
                editTask();
              }}
            >
             {arb ?'يتقدم':'Apply'}
            </Button>
          </Col>
         
          <Col>
            <Button
              className="shadow-none"
              color="dark"
              onClick={() => {
                navigate('/ProjectTask');
              }}
            >
             {arb ?'الرجوع للقائمة':'Back to List'}
            </Button>
          </Col>
        </Row>
      </ComponentCardV2>
    </div>
  );
}

export default PojectTaskEditButton;

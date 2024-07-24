/* eslint-disable */
import React from 'react';
import { Row, Col, Form, FormGroup, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { HasAccess ,usePermify} from '@permify/react-role';
import ComponentCardV2 from './ComponentCardV2';

const ApiButton = ({ editData, navigate, applyChanges, backToList, module }) => {
  ApiButton.propTypes = {
    editData: PropTypes.func,
    navigate: PropTypes.any,
    applyChanges: PropTypes.func,
    backToList: PropTypes.func,
    module: PropTypes.string,
  };
  const { isAuthorized, isLoading } = usePermify();

  
  const fetchData = async (type) => {
    // Pass roles and permissions accordingly
    // You can send empty array or null for first param to check permissions only
    if (await isAuthorized(null, `${module}-${type}`)) {
       return true
    }else{
      return false
    }
};

  return (
    <Form>
    <FormGroup>
      <ComponentCardV2>
          <Row>
            <Col >
         
              {/* <HasAccess
                roles={null}
                permissions={`${module}-edit`}
                renderAuthFailed={<p></p>}
        > */}
                <Button
                  onClick={() => {
                    editData();
                    setTimeout(()=>{
                      backToList();
                    },500)
                   
                  }}
                  color="primary">
                  Save
                </Button>
              {/* </HasAccess> */}
            </Col>
            <Col >
              {/* <HasAccess
                roles={null}
                permissions={`${module}-edit`}
                renderAuthFailed={<p></p>}
              > */}
                <Button
                  onClick={() => {
                    editData();
                    //applyChanges();
                  }}
                  color="primary"
                >
                  Apply
                </Button>
              {/* </HasAccess> */}
            </Col>
            <Col>
              <Button
                onClick={() => {
                  backToList();
                }}
                color="dark"
              >
                Back To List
              </Button>
            </Col>
            {/* <Col>
              <HasAccess
                roles={null}
                permissions={`${module}-remove`}
                renderAuthFailed={<p>You are not authorized to access!</p>}>
                <Button color="danger" onClick={() => {}}>
                  Delete
                </Button>
              </HasAccess>
            </Col> */}
          </Row>
        </ComponentCardV2>
      </FormGroup>
    </Form>
  );
};

export default ApiButton;

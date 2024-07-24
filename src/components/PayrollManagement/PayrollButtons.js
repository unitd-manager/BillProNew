import React from 'react'
import { Row,Col,FormGroup,Button } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCardV2 from '../ComponentCardV2';

function PayrollButtons({editPayrollData,navigate}) {
    PayrollButtons.propTypes={
        editPayrollData:PropTypes.func,
        navigate:PropTypes.object
    }
  return (
    <div>
          <FormGroup>
        <Row>
          <Col md="12">
            <ComponentCardV2>
              <Button
                type="submit"
                color="primary"
                className="btn shadow-none mr-2"
                onClick={()=>{editPayrollData();navigate('/payrollmanagement')}}
              >
                Save{' '}
              </Button>
              &nbsp;&nbsp;
              <Button
                type="submit"
                color="primary"
                className="btn shadow-none mr-2"
                onClick={()=>{editPayrollData();
                setTimeout(()=>{window.location.reload()},300)
                }}
              >
                Apply
              </Button>
              &nbsp;&nbsp;
              <Button
                type="submit"
                color="dark"
                className="btn shadow-none mr-2"
                onClick={() => navigate(-1)}
              >
                Back to List
              </Button>
              &nbsp;&nbsp;
            </ComponentCardV2>
          </Col>
        </Row>
      </FormGroup>

    </div>
  )
}

export default PayrollButtons
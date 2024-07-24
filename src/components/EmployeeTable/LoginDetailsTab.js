import React from 'react';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';

function LoginDetailsTab({ employeeDetails, handleInputChange, arb, arabic }) {
  // Define prop types
  LoginDetailsTab.propTypes = {
    employeeDetails: PropTypes.object.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    arb: PropTypes.bool,
    arabic: PropTypes.array.isRequired,
  };

  // Determine the label key based on the arb flag
  const genLabel = arb ? 'arb_value' : 'value';

  return (
    <div>
      <Row>
        <Col md="3">
          <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
              {arabic.find((item) => item.key_text === 'mdEmployee.Login Email')?.[genLabel]}
            </Label>
            <Input
              name={arb ? 'login_email_arb' : 'login_email'}
              value={
                arb
                  ? (employeeDetails?.login_email_arb ?? employeeDetails?.login_email)
                  : (employeeDetails?.login_email ?? '')
              }
              onChange={handleInputChange}
              type="email"
            />
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
              {arabic.find((item) => item.key_text === 'mdEmployee.Password')?.[genLabel]}
            </Label>
            <Input
              name={arb ? 'login_pass_word_arb' : 'login_pass_word'}
              value={
                arb
                  ? (employeeDetails?.login_pass_word_arb ?? employeeDetails?.login_pass_word)
                  : (employeeDetails?.login_pass_word ?? '')
              }
              onChange={handleInputChange}
              type="password"
            />
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
              {arabic.find((item) => item.key_text === 'mdEmployee.User Group')?.[genLabel]}
            </Label>
            <Input
              name="staff_user_group_id"
              value={employeeDetails?.staff_user_group_id ?? ''}
              onChange={handleInputChange}
              type="select"
            >
              <option value="2">{arb ? 'ليّن' : 'Tender'}</option>
              <option value="3">{arb ? 'الموارد البشرية' : 'HR'}</option>
              <option value="4">{arb ? 'المشرف والشراء' : 'Admin and Purchase'}</option>
              <option value="5">{arb ? 'المناقصة والمشروع' : 'Tender and Project'}</option>
              <option value="6">{arb ? 'المشاريع' : 'Projects'}</option>
              <option value="7">{arb ? 'حسابات' : 'Accounts'}</option>
              <option value="8">{arb ? 'المشرف الفائق' : 'Super Admin'}</option>
              <option value="9">{arb ? 'اختبار عالمي' : 'Testing Universal'}</option>
            </Input>
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>Published</Label>
            <br />
            <Label for="published-yes">Yes</Label>
            <Input
              id="published-yes"
              name="published"
              value="1"
              type="radio"
              checked={employeeDetails?.published === 1}
              onChange={() => handleInputChange({ target: { name: 'published', value: 1 } })}
            />
            <Label for="published-no">No</Label>
            <Input
              id="published-no"
              name="published"
              value="0"
              type="radio"
              checked={employeeDetails?.published === 0}
              onChange={() => handleInputChange({ target: { name: 'published', value: 0 } })}
            />
          </FormGroup>
        </Col>
      </Row>
    </div>
  );
}

export default LoginDetailsTab;
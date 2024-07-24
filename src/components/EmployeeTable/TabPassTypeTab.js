import React from 'react';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';

function TabPassTypeTab({ tabPassTypeDetails, handlePassTypeInputs,arb,arabic }) {
  TabPassTypeTab.propTypes = {
    tabPassTypeDetails: PropTypes.object,
    handlePassTypeInputs: PropTypes.func,
    arb: PropTypes.any,
    arabic: PropTypes.any,
  };

  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }

  return (
    <div>
      <Row>
     
      <Col md="4">
        <FormGroup>
          <Label dir="rtl" style={{ textAlign: 'right' }}>
          <span style={{ color: 'red' }}>*</span>
                {arabic.find((item) => item.key_text === 'mdEmployee.Pass Type')?.[genLabel]}
           
          </Label>
          <Input
          name= {arb ? 'citizen_arb' : 'citizen'}
          value={
            arb
              ? (
                tabPassTypeDetails && tabPassTypeDetails.citizen_arb ? tabPassTypeDetails.citizen_arb :
                  (tabPassTypeDetails && tabPassTypeDetails.citizen_arb !== null ? '' : tabPassTypeDetails && tabPassTypeDetails.citizen)
                )
              : (tabPassTypeDetails && tabPassTypeDetails.citizen)
          }
            
            type="select"
            onChange={handlePassTypeInputs}
          >
            <option value="">{arb ?'الرجاء التحديد':'Please Select'}</option>
            <option defaultValue="selected" value="Citizen">
            {arb ?'مواطن':'Citizen'}
            </option>
            <option value="PR">{arb ?'ص ر':'PR'}</option>
            <option value="EP">{arb ?'إي بي':'EP'}</option>
            <option value="SP">{arb ?'إس بي':'SP'}</option>
            <option value="WP">{arb ?'دبليو بي':'WP'}</option>
            <option value="DP">{arb ?'د ص':'DP'}</option>
          </Input>
        </FormGroup>
      </Col>
      {tabPassTypeDetails.citizen === 'Citizen' && (
        <Col md="4">
          <FormGroup>
          <Label dir="rtl" style={{ textAlign: 'right' }}> <span style={{ color: 'red' }}>*</span>
                {arabic.find((item) => item.key_text === 'mdEmployee.NRIC No')?.[genLabel]}
              
            </Label>
            <Input
            name= {arb ? 'nric_no_arb' : 'nric_no'}
            value={
              arb
                ? (
                  tabPassTypeDetails && tabPassTypeDetails.nric_no_arb ? tabPassTypeDetails.nric_no_arb :
                    (tabPassTypeDetails && tabPassTypeDetails.nric_no_arb !== null ? '' : tabPassTypeDetails && tabPassTypeDetails.nric_no)
                  )
                : (tabPassTypeDetails && tabPassTypeDetails.nric_no)
            }
              
              type="text"
              onChange={handlePassTypeInputs}
            />
          </FormGroup>
        </Col>
      )}
      </Row>
      {tabPassTypeDetails.citizen === 'SP' && (
        <Row>
          {' '}
          <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}> <span style={{ color: 'red' }}>*</span>
                {arabic.find((item) => item.key_text === 'mdEmployee.Fin No')?.[genLabel]}
                
              </Label>
              <Input
              name= {arb ? 'fin_no_arb' : 'fin_no'}
                
              value={
                arb
                  ? (
                    tabPassTypeDetails && tabPassTypeDetails.fin_no_arb ? tabPassTypeDetails.fin_no_arb :
                      (tabPassTypeDetails && tabPassTypeDetails.fin_no_arb !== null ? '' : tabPassTypeDetails && tabPassTypeDetails.fin_no)
                    )
                  : (tabPassTypeDetails && tabPassTypeDetails.fin_no)
              }
                
                type="text"
                onChange={handlePassTypeInputs}
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Fin No Expiry date')?.[genLabel]}</Label>
              <Input
                name="fin_no_expiry_date"
                value={moment(tabPassTypeDetails && tabPassTypeDetails.fin_no_expiry_date).format(
                  'YYYY-MM-DD',
                )}
                type="date"
                onChange={handlePassTypeInputs}
              />
            </FormGroup>
          </Col>
        </Row>
      )}
      {tabPassTypeDetails.citizen === 'EP' && (
        <Row>
          {' '}
          <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Fin No')?.[genLabel]} <span style={{ color: 'red' }}>*</span>
              </Label>
              <Input
                name= {arb ? 'fin_no_arb' : 'fin_no'}
                value={
                  arb
                    ? (
                      tabPassTypeDetails && tabPassTypeDetails.fin_no_arb ? tabPassTypeDetails.fin_no_arb :
                        (tabPassTypeDetails && tabPassTypeDetails.fin_no_arb !== null ? '' : tabPassTypeDetails && tabPassTypeDetails.fin_no)
                      )
                    : (tabPassTypeDetails && tabPassTypeDetails.fin_no)
                }
                type="text"
                onChange={handlePassTypeInputs}
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Fin No Expiry date')?.[genLabel]}</Label>
              <Input
                name="fin_no_expiry_date"
                value={moment(tabPassTypeDetails && tabPassTypeDetails.fin_no_expiry_date).format(
                  'YYYY-MM-DD',
                )}
                type="date"
                onChange={handlePassTypeInputs}
              />
            </FormGroup>
          </Col>
        </Row>
      )}
      {tabPassTypeDetails.citizen === 'PR' && (
        <Row>
          {' '}
          <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.NRIC No')?.[genLabel]}<span style={{ color: 'red' }}>*</span>
              </Label>
              <Input
                name= {arb ? 'nric_no_arb' : 'nric_no'}
                value={
                  arb
                    ? (
                      tabPassTypeDetails && tabPassTypeDetails.nric_no_arb ? tabPassTypeDetails.nric_no_arb :
                        (tabPassTypeDetails && tabPassTypeDetails.nric_no_arb !== null ? '' : tabPassTypeDetails && tabPassTypeDetails.nric_no)
                      )
                    : (tabPassTypeDetails && tabPassTypeDetails.nric_no)
                }
                type="text"
                onChange={handlePassTypeInputs}
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.SPR Year')?.[genLabel]}</Label>
              <Input
              name= {arb ? 'spr_year_arb' : 'spr_year'}
                
                value={
                  arb
                    ? (
                      tabPassTypeDetails && tabPassTypeDetails.spr_year_arb ? tabPassTypeDetails.spr_year_arb :
                        (tabPassTypeDetails && tabPassTypeDetails.spr_year_arb !== null ? '' : tabPassTypeDetails && tabPassTypeDetails.spr_year)
                      )
                    : (tabPassTypeDetails && tabPassTypeDetails.spr_year)
                }
                
                onChange={handlePassTypeInputs}
                type="select"
              >
                <option defaultValue="selected">{arb ?'الرجاء التحديد':'Please Select'}</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
      )}

      {tabPassTypeDetails.citizen === 'DP' && (
        <Row>
          {' '}
          <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Fin No')?.[genLabel]}<span style={{ color: 'red' }}>*</span>
              </Label>
              <Input
                name= {arb ? 'fin_no_arb' : 'fin_no'}
                
                value={
                  arb
                    ? (
                      tabPassTypeDetails && tabPassTypeDetails.fin_no_arb ? tabPassTypeDetails.fin_no_arb :
                        (tabPassTypeDetails && tabPassTypeDetails.fin_no_arb !== null ? '' : tabPassTypeDetails && tabPassTypeDetails.fin_no)
                      )
                    : (tabPassTypeDetails && tabPassTypeDetails.fin_no)
                }
                type="text"
                onChange={handlePassTypeInputs}
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
            <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Fin No Expiry date')?.[genLabel]} </Label>
              <Input
                name="fin_no_expiry_date"
                value={moment(tabPassTypeDetails && tabPassTypeDetails.fin_no_expiry_date).format(
                  'YYYY-MM-DD',
                )}
                type="date"
                onChange={handlePassTypeInputs}
              />
            </FormGroup>
          </Col>
        </Row>
      )}
      {tabPassTypeDetails.citizen === 'WP'  && (
        <>
          {' '}
          <Row>
            <Col md="4">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Fin No')?.[genLabel]}
                </Label>
                <Input
                  name= {arb ? 'fin_no_arb' : 'fin_no'}
                
                  value={
                    arb
                      ? (
                        tabPassTypeDetails && tabPassTypeDetails.fin_no_arb ? tabPassTypeDetails.fin_no_arb :
                          (tabPassTypeDetails && tabPassTypeDetails.fin_no_arb !== null ? '' : tabPassTypeDetails && tabPassTypeDetails.fin_no)
                        )
                      : (tabPassTypeDetails && tabPassTypeDetails.fin_no)
                  }
                  type="text"
                  onChange={handlePassTypeInputs}
                />
              </FormGroup>
            </Col>
            {/* <Col md="4">
              <FormGroup>
                <Label>Fin No Expiry date </Label>
                <Input
                  name="fin_no_expiry_date"
                  value={moment(tabPassTypeDetails && tabPassTypeDetails.fin_no_expiry_date).format(
                    'YYYY-MM-DD',
                  )}
                  type="date"
                  onChange={handlePassTypeInputs}
                />
              </FormGroup>
            </Col> */}
          </Row>
          <Row>
            <Col md="4">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}><span style={{ color: 'red' }}>*</span> 
                {arabic.find((item) => item.key_text === 'mdEmployee.Work Permit No')?.[genLabel]} </Label>
                <Input
                name= {arb ? 'work_permit_arb' : 'work_permit'}
                  
                value={
                  arb
                    ? (
                      tabPassTypeDetails && tabPassTypeDetails.work_permit_arb ? tabPassTypeDetails.work_permit_arb :
                        (tabPassTypeDetails && tabPassTypeDetails.work_permit_arb !== null ? '' : tabPassTypeDetails && tabPassTypeDetails.work_permit)
                      )
                    : (tabPassTypeDetails && tabPassTypeDetails.work_permit)
                }
                  
                  type="text"
                  onChange={handlePassTypeInputs}
                />
              </FormGroup>
            </Col>
            {/* <Col md="4">
              <FormGroup>
                <Label>Work Expiry date </Label>
                <Input
                  name="work_permit_expiry_date"
                  value={moment(
                    tabPassTypeDetails && tabPassTypeDetails.work_permit_expiry_date,
                  ).format('YYYY-MM-DD')}
                  type="date"
                  onChange={handlePassTypeInputs}
                />
              </FormGroup>
            </Col> */}
            {/* <Col md="3">
              <FormGroup>
                <Label>Work Permit Expiry date</Label>
                <Input
                  type="date"
                  onChange={handlePassTypeInputs}
                  name="work_permit_expiry_date"
                  value={moment(
                    tabPassTypeDetails && tabPassTypeDetails.work_permit_expiry_date,
                  ).format('YYYY-MM-DD')}
                  // value={
                  //   tabPassTypeDetails && moment(tabPassTypeDetails.work_permit_expiry_date).format('YYYY-MM-DD')
                  // }
                  min={moment().format('YYYY-MM-DD')}
                />
              </FormGroup>
            </Col> */}
            
          </Row>
        </>
      )}
       <Col md="4">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Work Permit Expiry date')?.[genLabel]}</Label>
                <Input
                  type="date"
                  onChange={handlePassTypeInputs}
                  name="work_permit_expiry_date"
                  value={moment(
                    tabPassTypeDetails && tabPassTypeDetails.work_permit_expiry_date,
                  ).format('YYYY-MM-DD')}
                  // value={
                  //   tabPassTypeDetails && moment(tabPassTypeDetails.work_permit_expiry_date).format('YYYY-MM-DD')
                  // }
                  min={moment().format('YYYY-MM-DD')}
                />
              </FormGroup>
            </Col>
    </div>
  );
}

export default TabPassTypeTab;

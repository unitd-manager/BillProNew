import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
} from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import TimesheetModal from './TimesheetModal';

const MonthYear = ({
  chooseMonthYear,
  setChooseMonthYear,
  getSingleEmployeeData,
  setSingleEmployeeData,
}) => {
  MonthYear.propTypes = {
    chooseMonthYear: PropTypes.bool,
    setChooseMonthYear: PropTypes.func,
    getSingleEmployeeData: PropTypes.any,
    setSingleEmployeeData: PropTypes.any,
  };

  console.log('get Single Employee Data ', getSingleEmployeeData);

  const [currentMonth, setCurrentMonth] = useState();
  const [currentYear, setCurrentYear] = useState();
  const [timesheet, setTimesheet] = useState(false);

  useEffect(() => {
    setCurrentMonth(moment().month() + 1);
    setCurrentYear(moment().year());
  }, []);


  console.log('currentMonth', currentMonth);
  return (
    <>
      <Modal size="md" isOpen={chooseMonthYear}>
        <ModalHeader>
          Choose Month and Year
          <Button
            color="secondary"
            onClick={() => {
              setChooseMonthYear(false);
            }}
          >
            X
          </Button>
        </ModalHeader>

        <ModalBody>
          <Row>
            <Col md="12" className="mb-4">
              <Row>
                <Col>
                  <FormGroup>
                    <Label>Year: </Label>
                    <Input
                      type="select"
                      name="year"
                      defaultValue={currentYear}
                      onChange={(e) => {
                        setCurrentYear(e.target.value);
                      }}
                    >
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>Month: </Label>
                    <Input
                      type="select"
                      name="month"
                      defaultValue={currentMonth}
                      onChange={(e) => {
                        setCurrentMonth(e.target.value);
                      }}
                    >
                      <option value="1">January</option>
                      <option value="2">February</option>
                      <option value="3">March</option>
                      <option value="4">April</option>
                      <option value="5">May</option>
                      <option value="6">June</option>
                      <option value="7">July</option>
                      <option value="8">August</option>
                      <option value="9">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
            </Col>
          </Row>
        </ModalBody>

        <ModalFooter>
          <Button
            color="primary"
            className="shadow-none"
            onClick={() => {
              setTimesheet(true);
              setChooseMonthYear(false);
            }}
          >
            Save
          </Button>
          <Button
            color="secondary"
            className="shadow-none"
            onClick={() => {
              setChooseMonthYear(false);
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>

      <TimesheetModal
        timesheet={timesheet}
        setTimesheet={setTimesheet}
        getSingleEmployeeData={getSingleEmployeeData}
        setSingleEmployeeData={setSingleEmployeeData}
        currentMonth={currentMonth}
        currentYear={currentYear} 
      />
    </>
  );
};

export default MonthYear;

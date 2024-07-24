/* eslint-disable */
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
import { useParams } from 'react-router-dom';
import * as $ from 'jquery';
import PropTypes from 'prop-types';
import message from '../Message';
import api from '../../constants/api';
import moment from 'moment';
import creationdatetime from '../../constants/creationdatetime';
import PdfEmpTimesheet from '../PDF/PdfEmpTimesheetold';

//npm audit fix
const TimesheetModal = ({
  timesheet,
  setTimesheet,
  getSingleEmployeeData,
  setSingleEmployeeData,
}) => {
  TimesheetModal.propTypes = {
    timesheet: PropTypes.bool,
    setTimesheet: PropTypes.func,
    getSingleEmployeeData: PropTypes.any,
    setSingleEmployeeData: PropTypes.any,
  };

  const { id } = useParams();
  const [dateOfmonth, setDateOfMonth] = useState();
  const [selectedmonth, setSelectedMonth] = useState();
  console.log("monthend",selectedmonth)
  const [selectedDay, setSelectedDay] = useState();
  const currentYear = moment().year();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const [getGroupDatas, setGroupDatas] = useState();
  const [salary, setSalary] = useState();
  const [totalEmpTimesheetRecord, setTotalEmpTimesheetRecord] = useState();

  const [totalNormal, setTotalNormal] = useState({
    project_id: id,
    employee_id: '',
    creation_date: creationdatetime,
    normal_hours: parseFloat($('#totalNormalHr').val()) || 0,
    ot_hours: parseFloat($('#totalOTHr').val()) || 0,
    ph_hours: parseFloat($('#totalPHHr').val()) || 0,
    month: selectedmonth || moment().month() + 1,
    year: selectedYear || moment().year(),
    day: selectedDay,
  });

  //handle inputs

  // other code...

  // handle inputs
  const handleInputs = (e) => {
    setTotalNormal({ ...totalNormal, [e.target.name]: e.target.value });
  };

  
  const years = typeof selectedYear != 'number' ? parseInt(selectedYear) : selectedYear;
  const months = typeof selectedmonth != 'number' ? parseInt(selectedmonth) : selectedmonth;

  const insertTimeSheetData = (valObj, name, date) => {
    const existingRecord = totalEmpTimesheetRecord?.find(
      (record) =>
        record.day === date &&
        record.month === months &&
        record.year === years &&
        record.employee_id === getSingleEmployeeData?.employee_id &&
        record.project_id === getSingleEmployeeData?.project_id,
    );

    if (existingRecord && getSingleEmployeeData?.employee_id && id) {
      const updatedRecord = {
        ...existingRecord,
        modification_date: creationdatetime,
        ot_hours: parseFloat(name === 'ot_hours' ? valObj : existingRecord.ot_hours),
        normal_hours: parseFloat(name === 'normal_hours' ? valObj : existingRecord.normal_hours),
        ph_hours: parseFloat(name === 'ph_hours' ? valObj : existingRecord.ph_hours),
        employee_id: getSingleEmployeeData?.employee_id,
        project_id: id,
      };
      api
        .post('/timesheet/updateTimesheetMonth', updatedRecord)
        .then(() => {
          message('Record Update successfully', 'success');
          setTotalNormal('')
          showEmpDataInTimsheet()
        })
        .catch(() => {
          message('Unable to insert record.', 'error');
        });
    } else {
      if (valObj !== '') {
        totalNormal.project_id = id;
        totalNormal.creation_date = creationdatetime;
        totalNormal.employee_id = getSingleEmployeeData?.employee_id;
        totalNormal.ot_hours = parseFloat(name === 'ot_hours' ? valObj : '0');
        totalNormal.normal_hours = parseFloat(name === 'normal_hours' ? valObj : '0');
        totalNormal.ph_hours = parseFloat(name === 'ph_hours' ? valObj : '0');
        totalNormal.month = months;
        totalNormal.year = years;
        totalNormal.day = selectedDay;

        api
          .post('/timesheet/insertTimesheetMonth', totalNormal)
          .then(() => {
            message('Record inserted successfully', 'success');
            setTotalNormal('')
            showEmpDataInTimsheet()
          })
          .catch(() => {
            message('Unable to insert record.', 'error');
          });
      } else {
        message('Please Enter Hours', 'error');
      }
    }
  };

  const showEmpDataInTimsheet = () => {
    api.get('/timesheet/getAllEmpTimesheet').then((res) => {
      setTotalEmpTimesheetRecord(res.data.data);
    });
  };

  const weekDates = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

  const getDaysOfMonths = (year, month) => {
    var monthIndex = month - 1;

    var date = new Date(year, monthIndex, 1);
    var result = [];
    while (date.getMonth() == monthIndex) {
      result.push({ date: date.getDate(), day: weekDates[date.getDay()] });
      date.setDate(date.getDate() + 1);
    }
    setDateOfMonth(result);
  };


  // const [totalPerHour, setTotalPerHour] = useState({
  //   project_id: id,
  //   employee_id: '',
  //   creation_date: creationdatetime,
  //   normal_hourly_rate: parseFloat($('#totalOtRate').val()) || 0,
  //   ot_hourly_rate: parseFloat($('#totalOTHr').val()) || 0,
  //   ph_hourly_rate: parseFloat($('#totalPhRate').val()) || 0,
  //   month: selectedmonth || moment().month() + 1,
  //   year: selectedYear || moment().year(),
  // });

  //handle inputs and set data
  const timesheethandleInputs = (e) => {
    setSingleEmployeeData({ ...getSingleEmployeeData, [e.target.name]: e.target.value });
    console.log("getSingleEmployeeData Total",{ ...getSingleEmployeeData, [e.target.name]: e.target.value })

    console.log("months",months)
  };

  //Logic for edit data in db

  const updateTimesheetData = () => {

    console.log("totalEmpTimesheetRecord",totalEmpTimesheetRecord)
    console.log("getSingleEmployeeData",getSingleEmployeeData)

    totalEmpTimesheetRecord?.map((e,i)=>{
      console.log(`totalEmpTimesheetRecord testing ${i+1}`, e?.month === months)
    })

    const existingRecord = totalEmpTimesheetRecord?.find(
      (record) =>
        record.employee_id === getSingleEmployeeData?.employee_id &&
        record.project_id === getSingleEmployeeData?.project_id &&
        record.month === months &&
        record.year=== years
    );
    console.log("existingRecord",existingRecord)
   

    if (existingRecord && getSingleEmployeeData?.employee_id && id) {
      const updatedRecord = {
        ...existingRecord,
        modification_date: creationdatetime,
        ot_hourly_rate: parseFloat(getSingleEmployeeData?.ot_hourly_rate),
        normal_hourly_rate: parseFloat(getSingleEmployeeData?.normal_hourly_rate),
        ph_hourly_rate: parseFloat(getSingleEmployeeData?.ph_hourly_rate),
        employee_id: getSingleEmployeeData?.employee_id,
        project_id: id,
      };

      api
        .post('/timesheet/updateTimesheet', updatedRecord)
        .then(() => {
          message('Record updated successfully', 'success');
          setTimeout(() => {
            // window.location.reload();
          }, 300);
        })
        .catch(() => {
          message('Unable to update record.', 'error');
        });
    } else {
      getSingleEmployeeData.project_id = id;
      getSingleEmployeeData.creation_date = creationdatetime;
      getSingleEmployeeData.employee_id = getSingleEmployeeData?.employee_id;
      getSingleEmployeeData.ot_hourly_rate = parseFloat(getSingleEmployeeData?.ot_hourly_rate);
      getSingleEmployeeData.normal_hourly_rate = parseFloat(
        getSingleEmployeeData?.normal_hourly_rate,
      );
      getSingleEmployeeData.ph_hourly_rate = parseFloat(getSingleEmployeeData?.ph_hourly_rate);
      getSingleEmployeeData.month = selectedmonth;
      getSingleEmployeeData.year = selectedYear;
      getSingleEmployeeData.day = moment().date();

      api
        .post('/timesheet/insertTimesheetRate', getSingleEmployeeData)
        .then(() => {
          message('Record inserted successfully', 'success');
          setTimeout(() => {
            window.location.reload();
          }, 300);
        })
        .catch(() => {
          message('Unable to insert record.', 'error');
        });
    }
  };

  // API for Calculate total
  const SalaryCalculation = () => {
    api
      .post('/timesheet/getTotalSalary',{
        month :months,
        year : years
      })
      .then((res) => {        
        const filteredData = res.data.data.filter(
          (entry) =>
            entry.employee_id == getSingleEmployeeData.employee_id &&
            entry.project_id == getSingleEmployeeData.project_id &&
            entry.month == months &&
            entry.year == years
        );        
        if (filteredData.length > 0) {
          setSalary(filteredData[0]);
        } else {
          setSalary('')
        }
      })
      .catch(() => {
        //message('Unable to fetch data.', 'error');
        setSalary(''); 
      });
  };

  const GetGroupData = () => {
    api.get('/timesheet/getGroupData').then((res) => {
      setGroupDatas(res.data.data);
    });
  };

  // const normalhourlyRateData = () => {
  //   if (selectedmonth === totalPerHour.month) {
  //     return totalPerHour.normal_hourly_rate;
  //   }
  //   const totalValue =
  //     totalEmpTimesheetRecord?.find(
  //       (record) =>
  //         record.employee_id === getSingleEmployeeData?.employee_id &&
  //         record.project_id === getSingleEmployeeData?.project_id &&
  //         record?.month === months &&
  //         record?.year === years,
  //     )?.normal_hourly_rate || '';
  //   return totalValue;
  // };
  
  const normalhourlyRateData = () => {
    if (
      getSingleEmployeeData?.month === months &&
      getSingleEmployeeData?.year === years
    ) {
      return getSingleEmployeeData?.normal_hourly_rate;
    } else {
      return '';
    }
  };

  const othourlyRateData = () => {
    if (
      getSingleEmployeeData?.ot_hourly_rate &&
      getSingleEmployeeData?.month === months &&
      getSingleEmployeeData?.year === years
    ) {
      return getSingleEmployeeData?.ot_hourly_rate;
    } else {
      return '';
    }
  };
  const phhourlyRateData = () => {
    if (
      getSingleEmployeeData?.ph_hourly_rate &&
      getSingleEmployeeData?.month === months &&
      getSingleEmployeeData?.year === years
    ) {
      return getSingleEmployeeData?.ph_hourly_rate;
    } else {
      return '';
    }
  };
  const TotalNormalHRS = () => {   
    if (salary?.total_normal_hours) {
      return salary?.total_normal_hours;
    } else {
      return '';
    }
  };
  const TotalOTHRS = () => {
    if (
      salary?.total_ot_hours
    ) {
      return salary?.total_ot_hours;
    } else {
      return '';
    }
  };
  const TotalPHHRS = () => {
    if (
      salary?.total_ph_hours
    ) {
      return salary?.total_ph_hours;
    } else {
      return '';
    }
  };

  const totalNormalHrDay = (day) => {
    if (day.date === selectedDay) {
      return totalNormalHrDay.day;
      // if any bug occure totalNormal?.normal_hours
    }
    const record = totalEmpTimesheetRecord?.find(
      (record) =>
        record.employee_id === getSingleEmployeeData?.employee_id &&
        record.project_id === getSingleEmployeeData?.project_id &&
        record.day === day.date &&
        record?.month === months &&
        record?.year === years
    );
  
    return record?.normal_hours || ''; // Return normal_hours from the record if found
  };
  
  const totalOTHr = (day) => {

    if (day.date === selectedDay) {
      return totalOTHr.day;
      // if any bug occure totalNormal?.normal_hours
    }    const record = totalEmpTimesheetRecord?.find(
      (record) =>
        record.employee_id === getSingleEmployeeData?.employee_id &&
        record.project_id === getSingleEmployeeData?.project_id &&
        record.day === day.date &&
        record?.month === months &&
        record?.year === years
    );
  
    return record?.ot_hours || ''; // Return ot_hours from the record if found
  };
  
  const totalPHHr = (day) => {
    if (day.date === selectedDay) {
      return totalPHHr.day;
      // if any bug occure totalNormal?.normal_hours
    }
    const record = totalEmpTimesheetRecord?.find(
      (record) =>
        record.employee_id === getSingleEmployeeData?.employee_id &&
        record.project_id === getSingleEmployeeData?.project_id &&
        record.day === day.date &&
        record?.month === months &&
        record?.year === years
    );
  
    return record?.ph_hours || ''; // Return ph_hours from the record if found
  };
  
  const [totalNormalHours, setTotalNormalHours] = useState(0);
  const [totalOTHours, setTotalOTHours] = useState(0);
  const [totalPHHours, setTotalPHHours] = useState(0);

  // Function to calculate total hours
  const calculateTotalHours = () => {
    // Calculate total normal hours
    const totalNormal = getTotalHours('normal_hours');
    setTotalNormalHours(totalNormal);

    // Calculate total OT hours
    const totalOT = getTotalHours('ot_hours');
    setTotalOTHours(totalOT);

    // Calculate total PH hours
    const totalPH = getTotalHours('ph_hours');
    setTotalPHHours(totalPH);
  };

  const getTotalHours = (type) => {
    let total = 0;
    dateOfmonth && dateOfmonth.forEach((day) => {
      const record = totalEmpTimesheetRecord?.find(
        (record) =>
          record.employee_id === getSingleEmployeeData?.employee_id &&
          record.project_id === getSingleEmployeeData?.project_id &&
          record.day === day.date &&
          record.month === months &&
          record.year === years
      );
      total += parseFloat(record?.[type] || 0);
    });
    return total;
  };
  const generateMonths = (selectedYear) => {
    const currentYear = moment().year();
    const maxMonth = selectedYear === currentYear ? moment().month() + 1 : 12; // Get max month based on selected year
    const months = [];
    for (let i = 1; i <= maxMonth; i++) {
      months.push({ value: i, label: moment().month(i - 1).format("MMMM") });
    }
    return months;
  };
  
  
  const generateYears = () => {
    const currentYear = moment().year();
    const years = [];
    for (let i = currentYear; i >= currentYear - 1; i--) {
      years.push(i);
    }
    return years;
  };
  
  

  useEffect(() => {
    calculateTotalHours();
  }, [totalEmpTimesheetRecord]);

  useEffect(() => {
    getDaysOfMonths(moment().year(), moment().month() + 1);
    setSelectedMonth(moment().month() + 1);
    setSelectedYear(moment().year());
    GetGroupData();
    showEmpDataInTimsheet();
    SalaryCalculation();
    return () => {
      getDaysOfMonths(selectedYear, selectedmonth);
    };
  }, [id, getSingleEmployeeData]);

  useEffect(() => {
       SalaryCalculation();
  }, [id, getSingleEmployeeData,months,years]);

  return (
    <>
      <Modal size="xl" isOpen={timesheet}>
        <ModalHeader>
          Add Timesheet
          <Button
            color="secondary"
            onClick={() => {
              setTimesheet(false);
            }}
          >
            X
          </Button>
        </ModalHeader>

        <ModalBody>
          <Row>
            <Col md="12" className="mb-4">
              <Row>
                <Col md="4">
                  Employee Name: {getSingleEmployeeData && getSingleEmployeeData.first_name}
                </Col>
                <Col md="2"> <PdfEmpTimesheet getSingleEmployeeData={getSingleEmployeeData} selectedmonth={selectedmonth} selectedYear={selectedYear}  /> </Col>

                <Col md="2">Total Cost: {salary?.total_cost}</Col>
                <Col md="2">
                  <FormGroup>
                    <Label>Year: </Label>
                    <Input
  type="select"
  name="year"
  defaultValue={selectedYear}
  onChange={(e) => {
    const selectedYear = parseInt(e.target.value);
    setSelectedYear(selectedYear);
    const currentYear = moment().year();
    const maxMonth = selectedYear === currentYear ? moment().month() + 1 : 12;
    const currentMonth = moment().month() + 1;
    setSelectedMonth(currentMonth <= maxMonth ? currentMonth : maxMonth);
    getDaysOfMonths(selectedYear, selectedmonth);
  }}
>
  {generateYears().map((year) => (
    <option key={year} value={year}>
      {year}
    </option>
  ))}
</Input>

                  </FormGroup>
                </Col>
                <Col md="2">
                  <FormGroup>
                    <Label>Month: </Label>
                    <Input
                      type="select"
                      defaultValue={selectedmonth}
                      name="month"
                      onChange={(e) => {
                        setSelectedMonth(e.target.value);
                        getDaysOfMonths(selectedYear, e.target.value);
                      }}
                    >
                      {generateMonths(selectedYear).map((month) => (
                        <option key={month.value} value={month.value}>
                          {month.label}
                        </option>
                      ))}
                    </Input>

                  </FormGroup>
                </Col>
                <Col md="2">
                  <FormGroup>
                    <Label>Timesheet Sign * </Label>
                    <Input type="select" name="month">
                      <option defaultValue="selected">Please Select</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
            </Col>
          </Row>

          <table className="lineitem" id="myTable">
            <thead>
              <tr style={{ display: 'flex', alignItems: 'end' }}>
                <th scope="col" colSpan="2">
                  Normal Rate / HR:
                  <Input
                    type="text"
                    name="normal_hourly_rate"
                    id="totalNormalRate"
                    onChange={timesheethandleInputs}
                    value={normalhourlyRateData()}
                  />
                </th>
                <th scope="col" colSpan="2">
                  OT Rate / HR:
                  <Input
                    type="text"
                    name="ot_hourly_rate"
                    id="totalOtRate"
                    onChange={timesheethandleInputs}
                    value={othourlyRateData()}
                  />
                </th>
                <th scope="col" colSpan="2">
                  PH Rate / HR:
                  <Input
                    type="text"
                    name="ph_hourly_rate"
                    id="totalPhRate"
                    onChange={timesheethandleInputs}
                    value={phhourlyRateData()}
                  />
                </th>
                <th scope="col" colSpan="2">
                  Total Normal HRS:
                  <Input type="text" name="Total_Normal_HRS" disabled value={totalNormalHours} />
                </th>
                <th scope="col" colSpan="2">
                  Total OT HRS:
                  <Input type="text" name="Total_OT_HRS" disabled value={totalOTHours} />
                </th>
                <th scope="col" colSpan="2">
                  Total PH HRS:
                  <Input
                    type="text"
                    name="Total_PH_HRS"
                    disabled
                    // value={salary?.total_ph_hours}
                    value={totalPHHours}
                  />
                </th>
                <th scope="col">Normal Rate</th>
                <th scope="col">OT Rate Row 2</th>
                <th scope="col">PH Rate Row 3</th>
                <th scope="col">
                  <Button
                    color="primary"
                    onClick={() => {
                      updateTimesheetData();
                    }}
                  >
                    Save
                  </Button>
                </th>
              </tr>
            </thead>
          </table>

          <Row>
            {dateOfmonth &&
              dateOfmonth.map((day, index) => {
                return (
                  <Col
                    key={index.toString()}
                    size={1}
                    lg={1}
                    style={{ textAlign: 'center', marginBottom: 20 }}
                    className={
                      day.day == 'sun' ? 'sunday' : '' || day.day == 'sat' ? 'saturday' : ''
                    }
                  >
                    {day.day.charAt(0).toUpperCase() + day.day.slice(1)}
                    <br></br>
                    {day.date}
                    <Input
                      className="mb-1"
                      id="totalNormalHr"
                      name="normal_hours"
                      value={totalNormalHrDay(day)}
                      onChange={handleInputs}
                      onBlur={(e) => {
                        insertTimeSheetData(e.target.value, 'normal_hours', day.date);
                      }}
                      onFocus={() => {
                        setSelectedDay(day.date);
                      }}
                    ></Input>
                    <Input
                      className="mb-1"
                      id="totalOTHr"
                      name="ot_hours"
                      value={totalOTHr(day)}
                      onChange={handleInputs}
                      onBlur={(e) => {
                        insertTimeSheetData(e.target.value, 'ot_hours', day.date);
                      }}
                      onFocus={() => {
                        setSelectedDay(day.date);
                      }}
                    ></Input>
                    <Input
                      className="mb-1"
                      id="totalPHHr"
                      name="ph_hours"
                      value={totalPHHr(day)}
                      onChange={handleInputs}
                      onBlur={(e) => {
                        insertTimeSheetData(e.target.value, 'ph_hours', day.date);
                      }}
                      onFocus={() => {
                        setSelectedDay(day.date);
                      }}
                    ></Input>
                  </Col>
                );
              })}
          </Row>
        </ModalBody>

        <ModalFooter>
          <Button
            color="secondary"
            className="shadow-none"
            onClick={() => {
              setTimesheet(false);
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default TimesheetModal;

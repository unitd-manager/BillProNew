import React from 'react';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import ComponentCard from '../ComponentCard';

function AttendanceDetails({ attendanceDetails }) {
  AttendanceDetails.propTypes = {
    attendanceDetails: PropTypes.object,
  };

  const calculateDuration = (checkInTime, checkOutTime) => {
    const startMoment = moment(checkInTime, 'h:mm:ss a');
    const endMoment = moment(checkOutTime, 'h:mm:ss a');
  
    if (startMoment.isValid() && endMoment.isValid()) {
      const duration = moment.duration(endMoment.diff(startMoment));
  
      const totalHours = Math.floor(duration.asHours());
      const totalMinutes = Math.floor(duration.asMinutes()) % 60;
      const totalSeconds = Math.floor(duration.asSeconds()) % 60;
  
      const totalTime = `${totalHours.toString().padStart(2, '0')}:${totalMinutes
        .toString()
        .padStart(2, '0')}:${totalSeconds.toString().padStart(2, '0')}`;
      return totalTime;
    }
  
    return '';
  };

  const dayCheckInDuration = calculateDuration(
    attendanceDetails?.day_check_in_time,
    attendanceDetails?.day_check_out_time,
  );

    const nightCheckInDuration = calculateDuration(
      attendanceDetails?.night_check_In_time,
      attendanceDetails?.night_check_out_time
    );

    console.log("dayCheckInDuration",dayCheckInDuration)
    console.log("nightCheckInDuration",nightCheckInDuration)

  return (
    <ComponentCard title="Attendance Details">
      <Row>
        <Col md="3">
          <FormGroup>
            <Label>Employee Name</Label>
            <Input
              type="text"
              value={attendanceDetails && attendanceDetails.first_name}
              name="emp_name"
              disabled
            />
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>Product Name</Label>
            <Input
              type="text"
              value={attendanceDetails && attendanceDetails.title}
              name="title"
              disabled
            />
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>Attendance Date</Label>
            <Input
              type="text"
              value={attendanceDetails && attendanceDetails.date}
              name="date"
              disabled
            />
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>Total Time</Label>
            <Input
              type="text"
              value= {dayCheckInDuration || nightCheckInDuration }
              name="minimum_order_level"
              disabled
            />
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col md="3">
          <FormGroup>
            <Label>Day CheckIn</Label>
            <Input
              type="text"
              value={attendanceDetails && attendanceDetails.day_check_in_time}
              name="item_code"
              disabled
            />
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>Day CheckOut</Label>
            <Input
              type="text"
              value={attendanceDetails && attendanceDetails.day_check_out_time}
              name="unit"
              disabled
            />
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>Night CheckIn</Label>
            <Input
              type="text"
              defaultValue={attendanceDetails && attendanceDetails.night_check_In_time}
              name="minimum_order_level"
              disabled
            />
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>Night CheckOut</Label>
            <Input
              type="text"
              defaultValue={attendanceDetails && attendanceDetails.night_check_out_time}
              name="notes"
              disabled
            ></Input>
          </FormGroup>
        </Col>
      </Row>
    </ComponentCard>
  );
}

export default AttendanceDetails;

import React, { useEffect, useState } from 'react';
import { Row, Col, Button, TabPane, TabContent } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import ComponentCardV2 from '../../components/ComponentCardV2';
import message from '../../components/Message';
import Tab from '../../components/project/Tab';
import api from '../../constants/api';
import AttendanceDetails from '../../components/AttendanceTable/AttendanceDetails';

const AttendanceEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const backToList = () => {
    navigate('/Attendance');
  };

  const [activeTab, setActiveTab] = useState('1');
  const tabs = [
    { id: '1', name: 'Day CheckIn' },
    { id: '2', name: 'Day CheckOut' },
    { id: '3', name: 'Night CheckIn' },
    { id: '4', name: 'Night CheckOut' },
  ];
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const [attendanceDetails, setAttendanceDetails] = useState();

  // Get Attendance By Id

  const getAttendanceById = () => {
    api
      .post('/attendance/getAttendanceDataById', { id })
      .then((res) => {
        setAttendanceDetails(res.data.data);
      })
      .catch(() => {
        message('Network connection error.', 'error');
      });
  };

  useEffect(() => {
    getAttendanceById();
  }, [id]);

  const dayCheckInLatitude = attendanceDetails?.day_checkIn_latitude;
  const dayCheckInLongitude = attendanceDetails?.day_checkIn_longitude;
  const dayCheckIn =
    dayCheckInLatitude || dayCheckInLongitude
      ? `https://maps.google.com/maps?q=${dayCheckInLatitude},${dayCheckInLongitude}&hl=es;&output=embed`
      : '';

  const dayCheckOutLatitude = attendanceDetails?.day_checkOut_latitude;
  const dayCheckOutLongitude = attendanceDetails?.day_checkOut_longitude;
  const dayCheckOut =
    dayCheckOutLatitude || dayCheckOutLongitude
      ? `https://maps.google.com/maps?q=${dayCheckOutLatitude},${dayCheckOutLongitude}&hl=es;&output=embed`
      : '';

  const nightCheckInlatitude = attendanceDetails?.night_checkIn_latitude;
  const nightCheckInlongitude = attendanceDetails?.night_checkIn_longitude;
  const nightCheckIn =
    nightCheckInlatitude || nightCheckInlongitude
      ? `https://maps.google.com/maps?q=${nightCheckInlatitude},${nightCheckInlongitude}&hl=es;&output=embed`
      : '';

  const nightCheckOutLatitude = attendanceDetails?.night_checkOut_latitude;
  const nightCheckOutLongitude = attendanceDetails?.night_checkOut_longitude;
  const nightCheckOut =
    nightCheckOutLatitude || nightCheckOutLongitude
      ? `https://maps.google.com/maps?q=${nightCheckOutLatitude},${nightCheckOutLongitude}&hl=es;&output=embed`
      : '';

  return (
    <>
      <BreadCrumbs />
      <ComponentCardV2>
        <Row>
          <Col>
            <Button
              className="shadow-none"
              color="dark"
              onClick={() => {
                backToList();
              }}
            >
              {' '}
              Back to List{' '}
            </Button>
          </Col>
        </Row>
      </ComponentCardV2>

      <AttendanceDetails attendanceDetails={attendanceDetails} />

      <ComponentCard title="Location">
        <Tab toggle={toggle} tabs={tabs} />

        <TabContent className="p-4" activeTab={activeTab}>
          
          {dayCheckIn ? (
            <TabPane tabId="1">
              <iframe
                title="Google Map"
                src={dayCheckIn}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </TabPane>
          ) : (
            ' '
          )}

          {dayCheckOut ? (
            <TabPane tabId="2">
              <iframe
                title="Google Map"
                src={dayCheckOut}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </TabPane>
          ) : (
            ''
          )}

          {nightCheckIn ? (
            <TabPane tabId="3">
              <iframe
                title="Google Map"
                src={nightCheckIn}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </TabPane>
          ) : (
            ' '
          )}

          {nightCheckOut ? (
            <TabPane tabId="4">
              <iframe
                title="Google Map"
                src={nightCheckOut}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </TabPane>
          ) : (
            ''
          )}
        </TabContent>
      </ComponentCard>
    </>
  );
};
export default AttendanceEdit;

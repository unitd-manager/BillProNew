import React from 'react';
import { Row, Col, Button, Card } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
// import 'datatables.net-buttons/js/buttons.html5';
// import 'datatables.net-buttons/js/buttons.print';
import { Link } from 'react-router-dom';
import { TextArea } from '@blueprintjs/core';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';

const Attendance = () => {
  return (
    <div className="MainDiv pt-xs-25">
      <BreadCrumbs />
      <Row>
        <Col md="4">
          <Card
            style={{
              width: '25rem',
            }}
          >
            <Col md="6">
              <Button color="secondary" className="shadow-none">
                Sulfiya
              </Button>
              <br />
              <Link to="/TaskDetails">
                <Button color="primary" className="shadow-none" size="sm">
                  Login
                </Button>
              </Link>
              <TextArea></TextArea>
            </Col>
          </Card>
        </Col>
      </Row>
      <Card
        style={{
          width: '25rem',
        }}
      >
        <Row>
          <Col md="6">
            <Button color="secondary" className="shadow-none">
              Gokila
            </Button>
            <br />
            <Link to="/TaskDetails">
              <Button color="primary" className="my-3 shadow-none" size="sm">
                Login
              </Button>
            </Link>
            <TextArea></TextArea>
          </Col>
        </Row>
      </Card>
    </div>
  );
};
export default Attendance;
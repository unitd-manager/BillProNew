import React from 'react';
import * as Icon from 'react-feather';
import { Input, Card, Row, Col, Button, FormGroup, Table } from 'reactstrap';

function ProjectReportSection() {
  return (
    <div>
      <Card style={{ padding: '10px' }}>
        <Row className="mb-1">
          <Col className="d-flex ">
            <Icon.Home />
            <h2 className="ms-3 fw-bolder">Reports</h2>
          </Col>
          <Col className="d-flex justify-content-end ">
            <p style={{ marginRight: '10px' }} className="fw-bolder">
              Choose Report Name
            </p>

            <FormGroup>
              <Input
                type="select"
                name="Select Category"
                style={{ padding: '5px 120px', alignItems: 'left' }}
              >
                <option>Sales by Model [by Qty]</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row className="mb-1">
          <Col className="d-flex justify-content-end px-10">
            <div>
              <Input type="select" className="custom-select">
                <option value="0">Start Month</option>
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
            </div>
            <div className="ms-2">
              <Input type="select" className="custom-select">
                <option value="0">Start Month</option>
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
            </div>

            <Button
              style={{ background: '#4684B3', border: '1px solid #CEE1EF', marginLeft: '5px' }}
            >
              <Icon.Search /> Show Report
            </Button>
            <Icon.MoreVertical className="mt-2" />
            <Button style={{ background: '#2CB562', border: '1px solid #CEE1EF' }}>
              <Icon.FileText />
            </Button>
          </Col>
        </Row>
        <Row className="fw-bolder" style={{ fontfamily: 'Square Peg' }}>
          <h2>Sales by Model [by Qty]</h2>
          <p>Start Month: </p>
          <p>End Month: </p>
        </Row>

        <Table className="border">
          <thead className="text-center">
            <th className="border" md-2>
              #
            </th>
            <th>Sub Model</th>
          </thead>
          <tbody className="text-light bg-dark" style={{ textAlign: 'right' }}>
            <tr>
              <td colSpan="2">Total Qty</td>
            </tr>
          </tbody>
        </Table>
      </Card>
    </div>
  );
}

export default ProjectReportSection;
import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, Row, Col, ListGroupItem } from 'reactstrap';
import moment from 'moment';
import api from '../../constants/api';

const TenderSummaryCard = () => {
  const today = new Date();
  const currentYear = moment().format().slice(0, 4);
  const premonthzero = today.getMonth().toLocaleString('en-US', {
    month: 'long',
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const monthNumber = (today.getMonth() + 1).toLocaleString('en-US', {
    month: 'long',
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const month = today.toLocaleString('default', { month: 'long' }).slice(0, 3);
  today.setMonth(today.getMonth() - 1);
  const premonth = today.toLocaleString('en-US', { month: 'long' }).slice(0, 3);

  const [noOfRecord, setNoOfRecord] = useState();
  const [crnMonth, setCrnMonth] = useState();
  const [preMonth, setPreMonth] = useState();
  const [bestTenderTotal, setBestTenderTotal] = useState();
  const [bestTenderMonth, setBestTenderMonth] = useState();
  const getTenders = () => {
    api.get('/tender/getTenders').then((res) => {
      setNoOfRecord(res.data.data?.length);
      let countCurrentRecord = 0;
      let countPreRecord = 0;
      res.data.data?.forEach((el) => {
        const CurrentMonth = moment(el.actual_submission_date).format('MM');
        if (CurrentMonth === monthNumber) {
          countCurrentRecord++;
        } else if (CurrentMonth === premonthzero) {
          countPreRecord++;
        }
        setCrnMonth(countCurrentRecord);
        setPreMonth(countPreRecord);
      });
    });
    api.get('/tender/getTenderBestMonthSummary').then((res) => {
      if (res.data.data.length > 0) {
        setBestTenderTotal(res.data.data[0].total);
        const bestMonth = moment(res.data.data[0].monthYear).format('MMM');
        setBestTenderMonth(bestMonth);
      }
    });
  };

  const [noOfInvoiceRecord, setNoOfInvoiceRecord] = useState();
  const [crnInvoiceMonth, setCrnInvoiceMonth] = useState();
  const [preInvoiceMonth, setPreInvoiceMonth] = useState();
  const [bestInvoiceMonth, setBestInvoiceMonth] = useState();
  const [bestInvoiceMonthYear, setBestInvoiceMonthYear] = useState();
  const getInvoice = () => {
    api.get('/invoice/getMainInvoice').then((res) => {
      setNoOfInvoiceRecord(res.data.data.length);
      let countCurrentInvoiceRecord = 0;
      let invoiceLastMonthTotal = 0;
      res.data.data.forEach((el) => {
        const CurrentInvoiceMonth = el.invoice_date?.slice(5, 7);

        if (`${currentYear}-${premonthzero}` === el.invoice_date?.slice(0, 7)) {
          invoiceLastMonthTotal += el.invoice_amount;
        } else if (CurrentInvoiceMonth === monthNumber) {
          countCurrentInvoiceRecord++;
        }
        setCrnInvoiceMonth(countCurrentInvoiceRecord);
        setPreInvoiceMonth(invoiceLastMonthTotal.toFixed(2));
      });
    });
    api.get('/invoice/getInvoiveBestMonthSummary').then((res) => {
      if (res.data.data.length > 0) {
        setBestInvoiceMonth(res.data.data[0].totalAmount);
        const bestMonth = moment(res.data.data[0].monthYear).format('MMM');
        setBestInvoiceMonthYear(bestMonth);
      }
    });
  };

  useEffect(() => {
    getTenders();
    getInvoice();
  }, []);

  return (
    <>
      <Row>
        <Col sm="12" lg="6">
          <Card className="bg-primary text-dark-white card">
            <CardBody className="p-4">
              <CardTitle tag="h3" className="text-white">
                Tender Summary
              </CardTitle>
              <ListGroupItem className="text-white bg-transparent p-0 border-0">
                (Total / Awarded)
              </ListGroupItem>
              <Row className="mt-4 pt-2">
                <Col sm="12" lg="4" className="xs-margin visible-xs">
                  <h5 className="text-white mb-0">
                    <i className="ti-arrow-up"></i>Current Month ({month})
                  </h5>
                  <span className="text-white op-5">
                    ({crnMonth}/{noOfRecord})
                  </span>
                </Col>
                <Col sm="12" lg="4" className="xs-margin visible-xs">
                  <h5 className="text-white mb-0">
                    <i className="ti-arrow-up"></i>Last Month ({premonth})
                  </h5>
                  <span className="text-white op-5">
                    ({preMonth}/{noOfRecord})
                  </span>
                </Col>
                <Col sm="12" lg="4" className="xs-margin visible-xs">
                  <h5 className="text-white mb-0">
                    <i className="ti-arrow-up"></i>Best Month ({bestTenderMonth})
                  </h5>
                  <span className="text-white op-5">
                    ({bestTenderTotal}/{noOfRecord})
                  </span>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>

        <Col sm="12" lg="6">
          <Card className="bg-info card">
            <CardBody className="p-4">
              <CardTitle tag="h3" className="text-white mb-5">
                Invoice Summary
              </CardTitle>
              <Row className="mt-4 pt-2">
                <Col sm="12" lg="4" className="xs-margin visible-xs">
                  <h5 className="text-white mb-0">
                    <i className="ti-arrow-up"></i>Current Month ({month})
                  </h5>
                  <span className="text-white op-5">
                    ({crnInvoiceMonth}/{noOfInvoiceRecord})
                  </span>
                </Col>
                <Col sm="12" lg="4" className="xs-margin visible-xs">
                  <h5 className="text-white mb-0">
                    <i className="ti-arrow-up"></i>Last Month ({premonth})
                  </h5>
                  <span className="text-white op-5">(${preInvoiceMonth})</span>
                </Col>
                <Col sm="12" lg="4" className="xs-margin visible-xs">
                  <h5 className="text-white mb-0">
                    <i className="ti-arrow-up"></i>Best Month ({bestInvoiceMonthYear})
                  </h5>
                  <span className="text-white op-5">(${bestInvoiceMonth})</span>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default TenderSummaryCard;

import React, { useEffect } from 'react';
import {
  Card,
  CardBody,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from 'reactstrap';
import PropTypes from 'prop-types';

function TerminatingPayslipModal({
  terminatingPayslipModal,
  setTerminatingPayslipModal,
  terminatingPayslip,
  generateTerminatingPayslips,
}) {
  TerminatingPayslipModal.propTypes = {
    terminatingPayslipModal: PropTypes.bool,
    setTerminatingPayslipModal: PropTypes.func,
    terminatingPayslip: PropTypes.array,
    generateTerminatingPayslips: PropTypes.func,
  };

  const alcolumns = [
    {
      name: 'S.No',
    },

    {
      name: 'Employee Name',
    },
    {
      name: 'NRIC/Fin.no',
    },
    {
      name: 'Balance Loan',
    },
  ];
  useEffect(() => {}, []);

  return (
    <>
      <Modal isOpen={terminatingPayslipModal}>
        <ModalHeader>Generate Terminating Payslip</ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
              <Card className="shadow-none">
                <CardBody>
                  <Table id="example" className="display border border-secondary rounded">
                    <thead>
                      <tr>
                        {alcolumns.map((cell) => {
                          return <td key={cell.name}>{cell.name}</td>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {terminatingPayslip &&
                        terminatingPayslip.map((element, index) => {
                          return (
                            <tr key={element.employee_id}>
                              <td>{index + 1}</td>
                              <td>{element.employee_name}</td>
                              <td>
                                {element.nric_no}/{element.fin_no}
                              </td>
                              <td>{element.amount_payable}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            color="dark"
            className="shadow-none"
            onClick={() => {
              setTerminatingPayslipModal(false);
            }}
          >
            {' '}
            Cancel{' '}
          </Button>
          <Button
            color="primary"
            className="shadow-none"
            onClick={() => {
              generateTerminatingPayslips();
              setTerminatingPayslipModal(false);
            }}
          >
            {' '}
            OK{' '}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default TerminatingPayslipModal;

import React, { useState, useEffect } from 'react';
import { FormGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import api from '../../constants/api';

const ViewQuoteLogLineItem = ({ quoteLogViewLineItem, setQuoteLogViewLineItem, id }) => {
  ViewQuoteLogLineItem.propTypes = {
    quoteLogViewLineItem: PropTypes.bool,
    setQuoteLogViewLineItem: PropTypes.func,
    id: PropTypes.any,
  };
  const [quotation, setQuotelogLineItems] = useState();
  const QuotationViewLineItem = () => {
    api
      .get('/tender/getTabQuoteLineItems', {
        opportunity_id: id,
      })
      .then((res) => {
        setQuotelogLineItems(res.data.data);
      })
  }; //
  useEffect(() => {
    QuotationViewLineItem();
  }, []);
  return (
    <>
      <Modal size="xl" isOpen={quoteLogViewLineItem}>
        <ModalHeader>View Quote Log Line Items</ModalHeader>
        <ModalBody>
          <FormGroup>
            <table className="lineitem">
              <thead>
                <tr>
                  <th scope="col">Title </th>
                  <th scope="col">Description </th>
                  <th scope="col">Qty</th>
                  <th scope="col">Unit Price</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Updated By</th>
                </tr>
              </thead>
              <tbody>
                {quotation &&
                  quotation.map((e) => {
                    return (
                      <tr>
                        <td>{e.title}</td>
                        <td>{e.description}</td>
                        <td>{e.quantity}</td>
                        <td>{e.unit_price}</td>
                        <td>{e.amount} </td>
                        <td></td>
                        <td></td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            className="shadow-none"
            onClick={() => {
              setQuoteLogViewLineItem(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ViewQuoteLogLineItem;

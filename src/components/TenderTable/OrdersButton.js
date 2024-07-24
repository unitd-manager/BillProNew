import React from 'react';
import { Row, Col, Form, FormGroup, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCardV2 from '../ComponentCardV2';
import api from '../../constants/api';
import message from '../Message';

export default function TenderButtons({ editTenderData, applyChanges, backToList, quoteId, id,orderDetails }) {
  TenderButtons.propTypes = {
    editTenderData: PropTypes.func,
    applyChanges: PropTypes.func,
    backToList: PropTypes.func,
    quoteId: PropTypes.any,
    id: PropTypes.any,
    orderDetails: PropTypes.any,
  };
  console.log('id', id);
  const generateData = () => {
    
    // Step 1: Delete old order items by quote_id
    api.delete(`/finance/deleteorder_item/${quoteId}`).then(() => {
      api
        .post('/tender/getQuoteLineItemsById', { quote_id: quoteId })
        .then((res) => {
          const quoteItems = res.data.data;

          console.log('Received quote items:', quoteItems);

          if (quoteItems.length === 0) {
            console.warn('No quote items to insert');
            return;
          }

          api
            .get('/finance/checkOrderItems')
            .then((response) => {
              const ExistingOrderItemsId = response.data.data;
              console.log('ExistingOrderItemsId',response.data.data)
              console.log('quoteitems',quoteItems)
              const insertOrderItems = (index) => {
                if (index < quoteItems.length) {
                  const QuoteItem = quoteItems[index];
                  // Check if the po_product_id  already exists in the ExistingReceiptItemsId array
                  if (ExistingOrderItemsId.includes(QuoteItem.quote_id)) {
                    console.warn(
                      `Order item for quote_id  ${QuoteItem.quote_id} already exists, skipping insertion`,
                    );
                    message('Order items are already Inserted', 'warning');
                    insertOrderItems(index + 1);
                  } else {
                    // Insert the order item
                    const orderItemData = {
                      order_id: id,
                      order_code: QuoteItem.order_code,
                      qty: QuoteItem.quantity,
                      cost_price: QuoteItem.amount,
                      item_title: QuoteItem.title,
                      quote_id: QuoteItem.quote_id,
                      unit: QuoteItem.unit,
                      unit_price: QuoteItem.unit_price,
                      quote_items_id: QuoteItem.quote_items_id,
                    };

                    console.log(`Inserting order item ${index + 1}:`, orderItemData);
                    // Send a POST request to your /finance/insertorder_item API with the current order item
                    api
                      .post('/finance/insertorder_item', orderItemData)
                      .then((result) => {
                        if (result.data.msg === 'Success') {
                          console.log(`Order item ${index + 1} inserted successfully`);
                        } else {
                          console.error(`Failed to insert order item ${index + 1}`);
                        }
                        // Continue to the next item
                        insertOrderItems(index + 1);
                      })
                      .catch((error) => {
                        console.error(`Error inserting order item ${index + 1}`, error);
                        // Continue to the next item
                        insertOrderItems(index + 1);
                      });
                  }
                } else {
                  console.log('All order items inserted successfully');
                 // window.location.reload(); // Reload the page after all order
                  // You might want to trigger a UI update here
                }
              };

              // Start inserting order items from index 0
              insertOrderItems(0);
            })
            .catch((error) => {
              console.error('Error fetching quote items', error);
            });
        })
        .catch((error) => {
          console.error('Error deleting old order items', error);
        });
    });
  }

  const renderGenerateDataButton = () => {
    if (orderDetails && orderDetails.order_status === 'Invoiced') {
      // If order status is 'invoiced', return null to hide the button
      return null;
    }

    // If order status is not 'invoiced', render the button
    return (
      <Button
        className="shadow-none"
        color="primary"
        onClick={generateData}
      >
        Generate Data
      </Button>
    );
  };

    return (
    <Form>
      <FormGroup>
        <ComponentCardV2>
          <Row>
            <Col>
              {/* <Button
                className="shadow-none"
                color="primary"
                onClick={() => {
                  generateData();
                }}
              >
                Generate Data
              </Button> */}
              <Col>{renderGenerateDataButton()}</Col>

            </Col>

            <Col>
              <Button
                className="shadow-none"
                color="primary"
                onClick={() => {
                  editTenderData(true); // Call editTenderData with navigation
                }}
              >
                Save
              </Button>
            </Col>

            <Col>
              <Button
                className="shadow-none"
                color="primary"
                onClick={() => {
                  editTenderData(false); // Call editTenderData without navigation
                  applyChanges();
                }}
              >
                Apply
              </Button>
            </Col>
            <Col>
              <Button
                className="shadow-none"
                color="dark"
                onClick={() => {
                  backToList();
                }}
              >
                Back to List
              </Button>
            </Col>
          </Row>
        </ComponentCardV2>
      </FormGroup>
    </Form>
  );

}

import React from 'react';
import { Row, Col, Form, FormGroup, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCardV2 from '../ComponentCardV2';
import api from '../../constants/api';

export default function TenderButtons({ editTenderData, applyChanges, backToList, quoteId, id, orderDetails }) {
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
    console.log('Starting generateData function');
    console.log('Fetching quote items for project_quote_id:', quoteId);
  
    // Step 1: Fetch quote items by quote_id
    api.post('/projectsalesorder/getQuoteLineItemsById', { project_quote_id: quoteId })
      .then((res) => {
        const quoteItems = res.data.data;
        console.log('Received quote items:', quoteItems);
  
        if (quoteItems.length === 0) {
          console.warn('No quote items to process');
          return;
        }
  
        // Step 2: Fetch existing project_quote_items_id from the project_order_item table
        api.post('/projectsalesorder/getOrderItemsByOrderId', { project_order_id: id })
          .then((existingItemsRes) => {
            const existingItems = existingItemsRes.data.data;
            const existingQuoteItemIds = new Set(existingItems.map(item => item.project_quote_items_id));
            console.log('Existing project_quote_items_id:', existingQuoteItemIds);
  
            const processOrderItems = (index) => {
              if (index < quoteItems.length) {
                const quoteItem = quoteItems[index];
  
                const orderItemData = {
                  project_order_id: id,
                  order_code: quoteItem.order_code,
                  qty: quoteItem.quantity,
                  cost_price: quoteItem.amount,
                  item_title: quoteItem.title,
                  project_quote_id: quoteItem.project_quote_id,
                  unit: quoteItem.unit,
                  unit_price: quoteItem.unit_price,
                  project_quote_items_id: quoteItem.project_quote_items_id,
                };
  
                if (existingQuoteItemIds.has(quoteItem.project_quote_items_id)) {
                  // Update the existing order item
                  console.log(`Updating existing order item ${index + 1}:`, orderItemData);
  
                  api.post('/projectsalesorder/update_project_order_item', orderItemData)
                    .then((result) => {
                      if (result.data.msg === 'Success') {
                        console.log(`Order item ${index + 1} updated successfully`);
                      } else {
                        console.error(`Failed to update order item ${index + 1}`);
                      }
                      processOrderItems(index + 1);
                    })
                    .catch((error) => {
                      console.error(`Error updating order item ${index + 1}`, error);
                      processOrderItems(index + 1);
                    });
                } else {
                  // Insert new order item
                  console.log(`Inserting order item ${index + 1}:`, orderItemData);
  
                  api.post('/finance/insert_project_order_item', orderItemData)
                    .then((result) => {
                      if (result.data.msg === 'Success') {
                        console.log(`Order item ${index + 1} inserted successfully`);
                        // Add the inserted item to the set to avoid future duplicates
                        existingQuoteItemIds.add(quoteItem.project_quote_items_id);
                      } else {
                        console.error(`Failed to insert order item ${index + 1}`);
                      }
                      processOrderItems(index + 1);
                    })
                    .catch((error) => {
                      console.error(`Error inserting order item ${index + 1}`, error);
                      processOrderItems(index + 1);
                    });
                }
              } else {
                console.log('All order items processed successfully');
                // Optionally reload the page or trigger a state update
              window.location.reload();
              }
            };
  
            // Start processing order items from index 0
            processOrderItems(0);
          })
          .catch((error) => {
            console.error('Error fetching existing project order items', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching quote items', error);
      });
  };
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
 import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Table, Button, Col } from 'reactstrap';
import api from '../../constants/api';
// import PdfSalesOrder from '../PDF/PdfSalesOrder';
// import message from '../Message';

export default function CustomerFinanceInvoice({ ordersDetails, quoteId , id, orderDetails}) {
  CustomerFinanceInvoice.propTypes = {
    ordersDetails: PropTypes.array,
    quoteId: PropTypes.any,
    id: PropTypes.any,
    orderDetails: PropTypes.any
  };
  // const generateData = () => {
    
  //   // Step 1: Delete old order items by quote_id
  //   api.delete(`/finance/deleteorder_item/${quoteId}`).then(() => {
  //     api
  //       .post('/tender/getQuoteLineItemsById', { quote_id: quoteId })
  //       .then((res) => {
  //         const quoteItems = res.data.data;

  //         console.log('Received quote items:', quoteItems);

  //         if (quoteItems.length === 0) {
  //           console.warn('No quote items to insert');
  //           return;
  //         }

  //         api
  //           .get('/finance/checkOrderItems')
  //           .then((response) => {
  //             const ExistingOrderItemsId = response.data.data;
  //             console.log('ExistingOrderItemsId',response.data.data)
  //             console.log('quoteitems',quoteItems)
  //             const insertOrderItems = (index) => {
  //               if (index < quoteItems.length) {
  //                 const QuoteItem = quoteItems[index];
  //                 // Check if the po_product_id  already exists in the ExistingReceiptItemsId array
  //                 if (ExistingOrderItemsId.includes(QuoteItem.quote_id)) {
  //                   console.warn(
  //                     `Order item for quote_id  ${QuoteItem.quote_id} already exists, skipping insertion`,
  //                   );
  //                   message('Order items are already Inserted', 'warning');
  //                   insertOrderItems(index + 1);
  //                 } else {
  //                   // Insert the order item
  //                   const orderItemData = {
  //                     order_id: id,
  //                     order_code: QuoteItem.order_code,
  //                     qty: QuoteItem.quantity,
  //                     cost_price: QuoteItem.amount,
  //                     item_title: QuoteItem.title,
  //                     quote_id: QuoteItem.quote_id,
  //                     unit: QuoteItem.unit,
  //                     unit_price: QuoteItem.unit_price,
  //                     quote_items_id: QuoteItem.quote_items_id,
  //                   };

  //                   console.log(`Inserting order item ${index + 1}:`, orderItemData);
  //                   // Send a POST request to your /finance/insertorder_item API with the current order item
  //                   api
  //                     .post('/finance/insertorder_item', orderItemData)
  //                     .then((result) => {
  //                       if (result.data.msg === 'Success') {
  //                         console.log(`Order item ${index + 1} inserted successfully`);
  //                         setTimeout(() => {
  //                           window.location.reload()
  //                         }, 100);
  //                       } else {
  //                         console.error(`Failed to insert order item ${index + 1}`);
  //                       }
  //                       // Continue to the next item
  //                       insertOrderItems(index + 1);
  //                     })
  //                     .catch((error) => {
  //                       console.error(`Error inserting order item ${index + 1}`, error);
  //                       // Continue to the next item
  //                       insertOrderItems(index + 1);
  //                     });
  //                 }
  //               } else {
  //                 console.log('All order items inserted successfully');
  //                // window.location.reload(); // Reload the page after all order
  //                 // You might want to trigger a UI update here
  //               }
  //             };

  //             // Start inserting order items from index 0
  //             insertOrderItems(0);
  //           })
  //           .catch((error) => {
  //             console.error('Error fetching quote items', error);
  //           });
  //       })
  //       .catch((error) => {
  //         console.error('Error deleting old order items', error);
  //       });
  //   });
  // }

  const generateData = () => {
    console.log('Starting generateData function');
    console.log('Fetching quote items for quote_id:', quoteId);
  
    // Step 1: Fetch quote items by quote_id
    api.post('/tender/getQuoteLineItemsById', { quote_id: quoteId })
      .then((res) => {
        const quoteItems = res.data.data;
        console.log('Received quote items:', quoteItems);
  
        if (quoteItems.length === 0) {
          console.warn('No quote items to process');
          return;
        }
  
        // Step 2: Fetch existing project_quote_items_id from the project_order_item table
        api.post('/finance/getOrderItemsByOrderId', { order_id: id })
          .then((existingItemsRes) => {
            const existingItems = existingItemsRes.data.data;
            const existingQuoteItemIds = new Set(existingItems.map(item => item.quote_items_id));
            console.log('Existing quote_items_id:', existingQuoteItemIds);
  
            const processOrderItems = (index) => {
              if (index < quoteItems.length) {
                const quoteItem = quoteItems[index];
  
                const orderItemData = {
                  order_id: id,
                  order_code: quoteItem.order_code,
                  qty: quoteItem.quantity,
                  cost_price: quoteItem.amount,
                  item_title: quoteItem.title,
                  quote_id: quoteItem.quote_id,
                  unit: quoteItem.unit,
                  unit_price: quoteItem.unit_price,
                  quote_items_id: quoteItem.quote_items_id,
                };
  
                if (existingQuoteItemIds.has(quoteItem.quote_items_id)) {
                  // Update the existing order item
                  console.log(`Updating existing order item ${index + 1}:`, orderItemData);
  
                  api.post('/finance/update_order_item', orderItemData)
                    .then((result) => {
                      if (result.data.msg === 'Success') {
                        console.log(`Order item ${index + 1} updated successfully`);
                      } else {
                        console.error(`Failed to update order item ${index + 1}`);
                      }
                      processOrderItems(index + 1);
                      setTimeout(() => {
                        window.location.reload();
                      }, 1000);
                    })
                    .catch((error) => {
                      console.error(`Error updating order item ${index + 1}`, error);
                      processOrderItems(index + 1);
                    });
                } else {
                  // Insert new order item
                  console.log(`Inserting order item ${index + 1}:`, orderItemData);
  
                  api.post('/finance/insert_order_item', orderItemData)
                    .then((result) => {
                      if (result.data.msg === 'Success') {
                        console.log(`Order item ${index + 1} inserted successfully`);
                        // Add the inserted item to the set to avoid future duplicates
                        existingQuoteItemIds.add(quoteItem.quote_items_id);
                      } else {
                        console.error(`Failed to insert order item ${index + 1}`);
                      }
                      processOrderItems(index + 1);
                      setTimeout(() => {
                        window.location.reload();
                      }, 1000);
                    })
                    .catch((error) => {
                      console.error(`Error inserting order item ${index + 1}`, error);
                      processOrderItems(index + 1);
                    });
                }
              } else {
                console.log('All order items processed successfully');
                // Optionally reload the page or trigger a state update
                // window.location.reload();
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

  
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };

  const selectedLanguage = getSelectedLanguageFromLocalStorage();

  // Use the selected language value as needed
  console.log('Selected language from localStorage:', selectedLanguage);

  const arb = selectedLanguage === 'Arabic';

  // const eng =selectedLanguage === 'English'

  const [arabic, setArabic] = useState([]);

  const getArabicCompanyName = () => {
    api
      .get('/finance/getTranslationforTradingOrder')
      .then((res) => {
        setArabic(res.data.data);
      })
      .catch(() => {
        // Handle error if needed
      });
  };

  console.log('arabic', arabic);
  useEffect(() => {
    getArabicCompanyName();
  }, []);

  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }

  //Structure of Invoice table
  const invoiceTableColumns = [
    { name: arabic.find((item) => item.key_text === 'mdTradingOrder.Order Code')?.[genLabel] },
    { name: arabic.find((item) => item.key_text === 'mdTradingOrder.Item Title')?.[genLabel] },
    { name: arabic.find((item) => item.key_text === 'mdTradingOrder.Unit')?.[genLabel] },
    { name: arabic.find((item) => item.key_text === 'mdTradingOrder.Price')?.[genLabel] },
    { name: arabic.find((item) => item.key_text === 'mdTradingOrder.Quantity')?.[genLabel] },
    { name: arabic.find((item) => item.key_text === 'mdTradingOrder.Total Cost')?.[genLabel] },
  ];

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
    // Invoice Tab

    <Form>
      <div className="MainDiv">
        <div className="container">
        <Col>{renderGenerateDataButton()}</Col>
          <Table id="example">
            <thead>
              <tr>
                {invoiceTableColumns.map((cell) => {
                  return <td key={cell.name}>{cell.name}</td>;
                })}
              </tr>
            </thead>
            <tbody>
              {ordersDetails &&
                ordersDetails.map((element) => {
                  return (
                    <tr key={element.order_id}>
                      <td>{element.order_code}</td>

                      <td>
                        {arb && element.item_title_arb
                          ? element.item_title_arb
                          : element.item_title}
                      </td>

                      <td>{arb && element.unit_arb ? element.unit_arb : element.unit}</td>
                      <td>{element.unit_price}</td>
                      <td>{element.qty}</td>
                      <td>{element.cost_price}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </div>
    </Form>
  );
}

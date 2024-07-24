import React, { useState } from 'react';
import {
  Table,
  Row,
 Button
} from 'reactstrap';
import PropTypes from 'prop-types';
import EditRequestForQuoteLine from './EditRequestForQuoteLine'; 

export default function RequestPurchase({
  orderDetails, 
}) {
  RequestPurchase.propTypes = {
    orderDetails: PropTypes.array,
  };
  console.log('orderDetails:', orderDetails);


  const [editRequestForQuoteLine, setEditRequestForQuoteLine] = useState(false);
  // const [editRequestForQuoteLineInsert, setEditRequestForQuoteLineInsert] = useState(false);

  const handleEditButtonClick = () => {
    setEditRequestForQuoteLine(true);
  };
  const columns1 = [
    { name: 'Item Code' },
    { name: 'Item' },
    { name: 'Description' },
    { name: 'Unit' },
    { name: 'quantity' },
    { name: 'Amount' },
    { name: 'Total Amount ' },
  ];

  return (
    <>
 <Button onClick={handleEditButtonClick} color="primary" style={{marginBottom:'10px'}}>Edit Table</Button>
 {orderDetails && (
              <Row>
                <div className="container">
                  <Table id="example" className="display border border-secondary rounded">
                    <thead>
                      <tr>
                        {columns1.map((cell) => {
                          return <td key={cell.name}>{cell.name}</td>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                    {orderDetails &&
                      orderDetails.map((e) => {
                        return (
                          <tr key={e.purchase_quote_id}>
                            <td>{e.product_code}</td>
                            <td>{e.title}</td>
                            <td>{e.description}</td>
                            <td>{e.unit}</td>
                            <td>{e.quantity}</td>
                            <td>{e.amount}</td>
                            <td>{e.total_cost}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
                </div>
                </Row>
            )}
      {editRequestForQuoteLine && (
        <EditRequestForQuoteLine
          editRequestForQuoteLine={editRequestForQuoteLine}
          setEditRequestForQuoteLine={setEditRequestForQuoteLine}
          data={orderDetails}
        />
      )}
     
      
    </>
  );
}

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Form, Table } from 'reactstrap';
import ComponentCard from '../ComponentCard';

export default function SupplierTable({ purchaseOrder,arb,arabic }) {
  SupplierTable.propTypes = {
    purchaseOrder: PropTypes.array,
    arb: PropTypes.any,
    arabic: PropTypes.any,
  };
  let genLabel = '';

if (arb === true) {
  genLabel = 'arb_value';
} else {
  genLabel = 'value';
}
  // structure of makesupplier payment tables
  const supplierTableColumn = [
    {
      name: arabic.find(item => item.key_text === 'mdSupplier.PoDate')?.[genLabel],
    },
    {
     
      name: arabic.find(item => item.key_text === 'mdSupplier.PoCode')?.[genLabel],
    },
    {
   
      name: arabic.find(item => item.key_text === 'mdSupplier.PoValue')?.[genLabel],
    },
    {
      
      name: arabic.find(item => item.key_text === 'mdSupplier.Balance')?.[genLabel],
    },
    {
      
      name: arabic.find(item => item.key_text === 'mdSupplier.PaymentStatus')?.[genLabel],
    },
    {
      
      name: arabic.find(item => item.key_text === 'mdSupplier.History')?.[genLabel],
    },
  ];

  return (
    <ComponentCard title="Purchase Order Linked">
      <Form>
        <div className="MainDiv">
          <div className="container">
            <Table id="example" className="display border border-secondary rounded">
              <thead>
                <tr>
                  {supplierTableColumn.map((cell) => {
                    return <td key={cell.name}>{cell.name}</td>;
                  })}
                </tr>
              </thead>
              <tbody>
                {purchaseOrder &&
                  purchaseOrder.map((element) => {
                    return (
                      <tr key={element.purchase_order_id}>
                        <td>{element.purchase_order_date?moment(element.purchase_order_date).format('YYYY-MM-DD'):''}</td>
                        <td>
                          <Link to={`/PurchaseOrderEdit/${element.purchase_order_id}`}>
                            {element.po_code}
                          </Link>
                        </td>
                        <td>{element.po_value}</td>
                        <td>
  {Number.isNaN(parseFloat(element.po_value) - parseFloat(element.prev_amount))
    ? "0"
    : Math.max(parseFloat(element.po_value) - parseFloat(element.prev_amount), 0)}
</td>
                        <td>{element.payment_status}</td>
                        <td>
                          <Link to={`/SupplierHistory/${element.purchase_order_id}`}>
                           {arb?'عرض السجل':'View History'}
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        </div>
      </Form>
    </ComponentCard>
  );
}

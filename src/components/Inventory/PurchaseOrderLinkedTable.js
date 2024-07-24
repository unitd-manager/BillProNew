import React from 'react';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import ComponentCard from '../ComponentCard';


function PurchaseOrderLinkedTable({ tabPurchaseOrdersLinked, eng, arb, }) {
    PurchaseOrderLinkedTable.propTypes = {
    tabPurchaseOrdersLinked: PropTypes.array,
    eng: PropTypes.any,
    arb: PropTypes.any,
  };


  return (
    <div>
      <ComponentCard title={arb ? 'أوامر الشراء مرتبطة': 'Purchase Orders Linked'}>
        <Table id="example" className="display border border-secondary rounded">
          <thead>
            <tr>
            <th scope="col">{arb ?'رمز الشراء':'PO Code'}</th>
            <th scope="col">{arb ?'تاريخ أمر الشراء':'PO Date'}</th>
            <th scope="col">{arb ?'كمية ':'Amount'}</th>
            <th scope="col">{arb ?'كمية':'Qty'}</th>
            <th scope="col">{arb ?'المورد':'Supplier'}</th>     
            </tr>
          </thead>
          <tbody>
            {tabPurchaseOrdersLinked &&
              tabPurchaseOrdersLinked.map((element) => {
                return (
                  <tr>
                    <td>
                      <Link to={`/PurchaseOrderEdit/${element.purchase_order_id}`}>
                      {eng ===true && element.po_code}
                        { arb === true && element.po_code_arb} 
                      </Link>
                    </td>

                    <td>
                      {element.purchase_order_date
                        ? moment(element.purchase_order_date).format('DD-MM-YYYY')
                        : ''}
                    </td>
                    <td>{eng ===true && element.cost_price}
                        { arb === true && element.cost_price_arb}</td>
                    <td>{eng ===true && element.qty}
                        { arb === true && element.qty_arb}</td>
                    <td>{eng ===true && element.company_name}
                        { arb === true && element.company_name_arb}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </ComponentCard>
    </div>
  );
}

export default PurchaseOrderLinkedTable;

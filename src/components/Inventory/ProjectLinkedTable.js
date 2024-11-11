import React from 'react';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import ComponentCard from '../ComponentCard';


function ProjectLinkedTable({ projectsLinked, arb, }) {
    ProjectLinkedTable.propTypes = {
    projectsLinked: PropTypes.array,
    arb: PropTypes.any,
  };


  return (
    <div>

      <ComponentCard title={arb ? 'الفاتورة مرتبطة': 'Invoice Linked'}>
        <Table id="examplepl" className="display border border-secondary rounded">
          <thead>
            <tr>
            <th scope="col">{arb ?'رقم التعريف الخاص بالطلب':'Order ID'}</th>
            <th scope="col">{arb ?'رمز الفاتورة':'Invoice Code'}</th>
            <th scope="col">{arb ?'تاريخ':'Date'}</th>
            <th scope="col">{arb ?'كمية':'Qty'}</th>
            <th scope="col">{arb ?'كمية':'Amount'}</th> 
            </tr>
          </thead>
          <tbody>
            {projectsLinked &&
              projectsLinked.map((element) => {
                return (
                  <tr>
                      <td>{element.order_id}</td>
                    <td>
                      <Link to={`/FinancetEdit/${element.order_id}`}>  {element.invoice_code} </Link>
                    </td>
                    <td>{moment(element.invoice_date).format('DD-MM-YYYY')}</td>
                    <td>{element.qty}</td>
                        <td>{element.invoice_amount}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </ComponentCard>
    </div>
  );
}

export default ProjectLinkedTable;

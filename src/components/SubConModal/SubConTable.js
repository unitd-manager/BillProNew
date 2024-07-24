import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Form, Table } from 'reactstrap';
import ComponentCard from '../ComponentCard';

export default function SupplierTable({ subConWorkOrder }) {
  SupplierTable.propTypes = {
    subConWorkOrder: PropTypes.array,
  };

  const subConTableColumn = [
   
    {
      name: 'Job Code',
    },
    {
      name: 'Title',
    },
    {
      name: 'Date',
    },
   
    {
      name: 'Project',
    },
    {
      name: 'Status',
    },
 
    {
      name: '',
    },
  ];

  return (
    <ComponentCard title="Job Order Linked">
      <Form>
        <div className="MainDiv">
          <div className="container">
            <Table id="example" className="display border border-secondary rounded">
              <thead title=" Work Order Linked ">
                <tr>
                  {subConTableColumn.map((cell) => {
                    return <td key={cell.name}>{cell.name}</td>;
                  })}
                </tr>
              </thead>
              <tbody>
                {subConWorkOrder &&
                  subConWorkOrder.map((element) => {
                    return (
                      <tr key={element.project_job_id}>
                        <td>{element.job_code}</td>
                        <td>{element.job_title}</td>
                        <td>{moment(element.job_date).format('YYYY-MM-DD')}</td>
                        <td>
                          <Link to={`/ProjectEdit/${element.project_id}/${element.proposal_id}?tab=1`}>{element.title}</Link>
                        </td>
                        <td>{element.job_status}</td>
                       
                      
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

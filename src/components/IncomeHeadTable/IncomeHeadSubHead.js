import React from 'react';
import { Form, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as Icon from 'react-feather';

export default function IncomeHeadSubHead({
  SubincomeDetails,
  setIncomeData,
  SetIncomeSuphead,
  deleteRecord,
}) {
  IncomeHeadSubHead.propTypes = {
    SubincomeDetails: PropTypes.any,
    setIncomeData: PropTypes.any,
    SetIncomeSuphead: PropTypes.func,
    deleteRecord: PropTypes.func,
  
  };

  
  // Structure of subHead List view
  const columns = [
    {
      name: 'Title',
      id: 1,
    },

    {
      name: 'Edit',
      id: 2,
    },
    {
      name: 'Del',
      id: 3,
    },
  ];
  return (
    // ExpenseHeadSubHead Table
    <Form>
      <Table id="example" className="display">
        <thead>
          <tr>
            {columns.map((cell) => {
              return <td key={cell.id}>{cell.name}</td>;
            })}
          </tr>
        </thead>
        <tbody>
          {SubincomeDetails &&
            SubincomeDetails.map((element) => {
              return (
                <tr key={element.income_Sub_group_id}>
                  <td>{element.title}</td>
                  <td>
                  <Link to="">
                  <span
                    onClick={() => {
                      setIncomeData(element);
                      SetIncomeSuphead(true);
                    }}
                  >
                    <Icon.Edit2 />
                  </span>
                </Link>
              
              </td>
              <td>
                  <Link to="">
                  <span onClick={() => deleteRecord(element.income_sub_group_id)}>
                    <Icon.Trash2 />
                  </span>
                </Link>
               
              </td>
                
                </tr>
              );
            })}
        </tbody>
      </Table>
    </Form>
  );
}

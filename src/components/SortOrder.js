import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Row, Col } from 'reactstrap';
// import * as Icon from 'react-feather';
import api from '../constants/api';
import message from './Message';

const SortOrder = ({ value, tablename, idColumn, idValue }) => {
  const [initialValue, setValue] = useState(value);
  SortOrder.propTypes = {
    tablename: PropTypes.string,
    idColumn: PropTypes.string,
    idValue: PropTypes.any,
    value: PropTypes.any,
  };
  const SortingOrder = (e) => {
    const newValue = e.target.value;
    if (newValue === '') {
      message('Enter valid sort order', 'warning');
    } else {
      api
        .post('/commonApi/updateSortOrder', {
          tablename,
          idColumn,
          idValue,
          value:newValue,
        })
        .then((res) => {
          if (res.status === 200) {
            // window.location.reload();
            setValue(newValue);
          } else {
            message('Unable to edit record.', 'error');
          }
        })
        .catch(() => {
          message('Network connection error.');
        });
    }
  };
  return (
    <div>
      <Row>
        <Col md="4" className="mx-0 px-0">
          <Input
            onBlur={(e) => {
              SortingOrder(e);
            }}
            onClick={(e) => {
              SortingOrder(e);
            }}
            style={{ minWidth: 70 }}
            type="number"
            name="sort_order"
            defaultValue={initialValue ? initialValue.toString() : '0'}
            onChange={(e) => setValue(e.target.value)}
          ></Input>
        </Col>
      </Row>
    </div>
  );
};

export default SortOrder;

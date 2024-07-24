import React, { useEffect, useState } from 'react';
import moment from 'moment';
import CommonTable from '../CommonTable';
import message from '../Message';
import api from '../../constants/api';

const WorkpermitExpirySummary = () => {
  const [remainderLists, setRemainderLists] = useState([]);

  const today = new Date();
  const lastDate = new Date(new Date().setDate(today.getDate() + 60));

  const getAllEmployees = () => {
    api
      .get('/employeeModule/getCurrentEmployee')
      .then((res) => {
        const remainders = res.data.data.filter((el) => {
          return (
            new Date(el.work_permit_expiry_date) >= today &&
            new Date(el.work_permit_expiry_date) <= lastDate
          );
        });

        setRemainderLists(remainders);
      })
      .catch(() => {
        message('Employee Data Not Found', 'info');
      });
  };

  useEffect(() => {
    getAllEmployees();
  }, []);
  return (
    <>
      <CommonTable title="Workpermit Expiry Reminders (next 60 days)">
        {remainderLists.length > 0 && (
          <>
            {' '}
            <thead>
              <tr>
                <td>Name</td>
                <td>Expiry Date</td>
              </tr>
            </thead>
            <tbody>
              {remainderLists &&
                remainderLists.map((elem) => {
                  return (
                    <tr key={elem.employee_id_duplicate}>
                      <td>{elem.first_name}</td>
                      <td>{moment(elem.work_permit_expiry_date).format('DD-MM-YYYY')}</td>
                    </tr>
                  );
                })}
            </tbody>
          </>
        )}
        {remainderLists.length <= 0 && <span>No employee has renewal for next 60 days.</span>}
      </CommonTable>
    </>
  );
};

export default WorkpermitExpirySummary;

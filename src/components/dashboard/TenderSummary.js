import React, { useEffect, useState } from 'react';
import CommonTable from '../CommonTable';
import api from '../../constants/api';
import TenderSummaryBarChart from './TenderSummaryBarChart';

const TenderSummary = () => {
  const [tenders, setTenders] = useState();

  useEffect(() => {
    api.get('/tender/getTenders').then((res) => {
      setTenders(res.data.data);
    });
  }, []);

  const columns = [
    {
      name: 'S.No',
      selector: '',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: 'Quot Ref No',
      selector: 'opportunity_id',
      grow: 0,
      wrap: true,
    },
    {
      name: 'Desc',
      selector: 'company_name',
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
    {
      name: 'Main Con',
      selector: 'delete',
      grow: 0,
      width: 'auto',
      wrap: true,
    },
    {
      name: 'Contact',
      selector: 'opportunity_code',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Submission Date',
      selector: 'title',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'Bid Amount',
      selector: 'company_name',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Submitted',
      selector: 'status',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'Awarded',
      selector: 'status',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'Price Submitted',
      selector: 'status',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'Remarks',
      selector: 'status',
      sortable: true,
      grow: 2,
      wrap: true,
    },
  ];

  return (
    <>
      <CommonTable title="Tender Detail Summary">
        <thead>
          <tr>
            {columns.map((cell) => {
              return <td key={cell.name}>{cell.name}</td>;
            })}
          </tr>
        </thead>
        <tbody>
          {tenders &&
            tenders.map((element,i) => {
              return (
                <tr key={element.opportunity_id}>
                  <td>{i + 1}</td>
                  <td>{element.quote_ref}</td>
                  <td>{element.title}</td>
                  <td>{element.company_name}</td>
                  <td>{element.contact_name}</td>
                  <td>{element.actual_submission_date}</td>
                  <td>{element.price}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              );
            })}
        </tbody>
      </CommonTable>
      <TenderSummaryBarChart />
    </>
  );
};

export default TenderSummary;

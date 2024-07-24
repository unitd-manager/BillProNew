import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, CardHeader, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import { ToastContainer } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import api from '../../constants/api';
import message from '../../components/Message';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ExportReport from '../../components/Report/ExportReport';

const BalanceSheetReports = () => {
  const [groups, setGroups] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const transformData = (data) => {
    const groupedData = data.reduce((acc, item) => {
      if (!acc[item.acc_category]) {
        acc[item.acc_category] = [];
      }
      acc[item.acc_category].push(item);
      return acc;
    }, {});

    return Object.entries(groupedData).map(([category, items]) => ({
      acc_category: category,
      titles: items.map((item) => item.acc_head),
      amounts: items.map((item) => item.total_amount),
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [incomeGroup, incomeGroupBank, incomeGroupCA, incomeGroupCL, incomeGroupEX, incomeGroupIN,incomeGroupSC,incomeGroupSD] = await Promise.all([
          api.get('/accounts/getIncomeGroupAmountss'),
          api.get('/accounts/getIncomeGroupBank'),
          api.get('/accounts/getIncomeGroupCA'),
          api.get('/accounts/getIncomeGroupCL'),
          api.get('/accounts/getIncomeGroupEX'),
          api.get('/accounts/getIncomeGroupIN'),
          api.get('/accounts/getIncomeGroupSC'),
          api.get('/accounts/getIncomeGroupSD'),
        ]);

        setGroups([
         transformData(incomeGroup.data.data),
          transformData(incomeGroupBank.data.data),
          transformData(incomeGroupCA.data.data),
          transformData(incomeGroupCL.data.data),
          transformData(incomeGroupEX.data.data),
          transformData(incomeGroupIN.data.data),
          transformData(incomeGroupSC.data.data),
          transformData(incomeGroupSD.data.data),
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
        message('Failed to fetch data', 'error');
      }
    };

    fetchData();
  }, []);

  const offset = currentPage * itemsPerPage;
  const pageCount = Math.ceil(groups.reduce((total, group) => total + group.length, 0) / itemsPerPage);

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

  const renderTableRows = (group) => {
    return group.map((g) => (
      <>
        {g.titles.map((title, index) => (
          // Check if total_amount exists and is truthy
          (g.amounts[index] !== undefined && g.amounts[index] !== null) &&
          <tr key={title}>
            <td>{title}</td>
            <td style={{ textAlign: 'right' }}>{g.amounts[index]}</td>
          </tr>
        ))}
        {/* Calculate total only if amounts exist */}
        {g.amounts.length > 0 && g.amounts.filter(amount => amount !== undefined && amount !== null).length > 0 &&
          <tr key={`${g.acc_category}-total`}>
            <td><b>Total</b></td>
            <td style={{ textAlign: 'right' }}>{g.amounts.reduce((total, amount) => total + (amount || 0), 0)}</td>
          </tr>
        }
      </>
    ));
  };
  
  const columns = [
    { name: 'Title', selector: 'title' },
    { name: 'Amount', selector: 'amount' },
  ];
  
  // Flatten the grouped data
  const flattenData = groups.flatMap(group => {
    return group.map(g => {
      return g.titles.map((title, index) => ({
        title,
        amount: g.amounts[index],
      }));
    });
  }).flat();
  

  return (
    <>
      <BreadCrumbs />
      <ToastContainer />

      <Card>
        <CardHeader className="card p-2 text-center">
          <b>Balance Sheet Report</b>
        </CardHeader>
      </Card>
      <Card>
        <CardBody>
        <ExportReport columns={columns} data={flattenData} />
          <Row className="table-row">
            <Col md="6" className="table-col">
              <Table id="assetsTable">
                <thead>
                  <tr>
                    <th colSpan="2">
                      <b>Assets</b>
                    </th>
                  </tr>
                </thead>
                <tbody>
                {groups.length > 0 && renderTableRows(groups[0].slice(offset, offset + itemsPerPage))}                
              </tbody>
              </Table>
              <Table id="currentassetsTable">
                <thead>
                  <tr>
                    <th colSpan="2">
                      <b>Current Assets</b>
                    </th>
                  </tr>
                </thead>
                <tbody>
                {groups.length > 2 && renderTableRows(groups[2].slice(offset, offset + itemsPerPage))}               
               </tbody>
              </Table>
              <Table id="expenseTable">
                <thead>
                  <tr>
                    <th colSpan="2">
                      <b>EXPENSE</b>
                    </th>
                  </tr>
                </thead>
                <tbody>
                {groups.length > 4 && renderTableRows(groups[4].slice(offset, offset + itemsPerPage))}     
               </tbody>
              </Table>
              <Table id="creditorsTable">
                <thead>
                  <tr>
                    <th colSpan="2">
                      <b>SUNDRY CREDITORS</b>
                    </th>
                  </tr>
                </thead>
                <tbody>
                {groups.length > 6 && renderTableRows(groups[6].slice(offset, offset + itemsPerPage))}     
               </tbody>
              </Table>
            </Col>
            <Col md="6" className="table-col">
              <Table id="liabilitiesTable">
                <thead>
                  <tr>
                    <th colSpan="2">
                      <b>Liabilities</b>
                    </th>
                  </tr>
                </thead>
                <tbody>
                {groups.length > 1 && renderTableRows(groups[1].slice(offset, offset + itemsPerPage))}               
               </tbody>
              </Table>
              <Table id="currentliabilitiesTable">
                <thead>
                  <tr>
                    <th colSpan="2">
                      <b>Current Liabilities</b>
                    </th>
                  </tr>
                </thead>
                <tbody>
                {groups.length > 3 && renderTableRows(groups[3].slice(offset, offset + itemsPerPage))}              
                </tbody>
              </Table>
              <Table id="incomeTable">
                <thead>
                  <tr>
                    <th colSpan="2">
                      <b>INCOME</b>
                    </th>
                  </tr>
                </thead>
                <tbody>
                {groups.length > 5 && renderTableRows(groups[5].slice(offset, offset + itemsPerPage))}     
               </tbody>
              </Table>
              <Table id="debtorsTable">
                <thead>
                  <tr>
                    <th colSpan="2">
                      <b>SUNDRY DEBTORS</b>
                    </th>
                  </tr>
                </thead>
                <tbody>
                {groups.length > 7 && renderTableRows(groups[7].slice(offset, offset + itemsPerPage))}     
               </tbody>
              </Table>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        pageCount={pageCount}
       
        onPageChange={handlePageClick}
        containerClassName="navigationButtons"
        previousLinkClassName="previousButton"
        nextLinkClassName="nextButton"
        disabledClassName="navigationDisabled"
        activeClassName="navigationActive"
      />
    </>
  );
};

export default BalanceSheetReports;

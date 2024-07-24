import React, { useEffect, useState } from 'react';
import { Card} from 'reactstrap';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import { v4 as uuidv4 } from 'uuid';
import CommonTable from '../CommonTable';
import message from '../Message';
import api from '../../constants/api';

const PurchaseOrderSummary = () => {
 
  const [purchaseorderdata, setPurchaseOrderData] = useState('');
  
  //get Purchase Order Data
  const getPurchaseOrderData = () => {
    api
      .get('/dashboardforpurchaseorder/getPurchaseOrderDataForSummary')
      .then((res) => {
        setPurchaseOrderData(res.data.data);
      })
      .catch(() => {
        message('Purchase Order Data not found', 'error');
      });
  };

  
 
 
  
  const [page, setPage] = useState(0);

  const PurchaseOrderDataPerPage = 20;
  const numberofPurchaseorders = page * PurchaseOrderDataPerPage;
  const displayPurchaseOrder = purchaseorderdata.slice(
    numberofPurchaseorders,
    numberofPurchaseorders + PurchaseOrderDataPerPage,
  );
  const totalPages = Math.ceil(purchaseorderdata.length / PurchaseOrderDataPerPage);
  const changePage = ({ selected }) => {
    setPage(selected);
  };

  useEffect(() => {
    getPurchaseOrderData();
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
      name: 'Purchase Order Code',
      selector: 'po_code',
      grow: 0,
      wrap: true,
    },
    {
        name: 'Project Name',
        selector: 'title',
        grow: 0,
        width: 'auto',
        button: true,
        sortable: false,
      },
    {
      name: 'Customer Name',
      selector: 'customer_name',
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
    {
      name: 'Supplier Name',
      selector: 'supplier_name',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
        name: 'PO Status',
        selector: 'status',
        grow: 0,
        width: 'auto',
        wrap: true,
      },
    {
      name: 'PO Date',
      selector: 'purchase_order_date',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
        name: 'PO Delivery Date',
        selector: 'delivery_date',
        grow: 0,
        wrap: true,
      },
      {
        name: 'Total Invoice Amount',
        selector: 'total_cost',
        sortable: true,
        grow: 0,
        wrap: true,
      },
      {
        name: 'Paid Amount',
        selector: 'payment',
        sortable: true,
        grow: 0,
        wrap: true,
      },
   
   
   
  ];

  return (
    <>
      <Card>
        <CommonTable title="PurchaseOrder Summary">
          <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {displayPurchaseOrder &&
              displayPurchaseOrder.map((el, i) => {
                return (
                  <tr key={uuidv4()}>
                    <td>{i + 1}</td>
                    {/*
                      {el.invoice_due_date ? moment(el.invoice_due_date).format('DD-MM-YYYY') : ''}
                    </td> */}
                    <td>{el.po_code}</td>
                    <td>{el.title}</td>
                    <td>{el.customer_name}</td>
                    <td>{el.supplier_name}</td>
                    <td>{el.status}</td>
                    <td>{el.purchase_order_date ? moment(el.purchase_order_date).format('DD-MM-YYYY') : ''}</td>
                    <td>{el.delivery_date ? moment(el.delivery_date).format('DD-MM-YYYY') : ''}</td>
                    <td>{el.total_cost}</td>
                    <td>{el.payment}</td>
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          pageCount={totalPages}
          onPageChange={changePage}
          containerClassName="navigationButtons"
          previousLinkClassName="previousButton"
          nextLinkClassName="nextButton"
          disabledClassName="navigationDisabled"
          activeClassName="navigationActive"
        />
      </Card>
    </>
  );
};

export default PurchaseOrderSummary;

import React, { useEffect, useState } from 'react';
import { Form,Table,Label } from 'reactstrap';
import moment from 'moment';
import message from '../Message';
import api from '../../constants/api';

const SupplierSummary = () =>{

    const [supplier, setSupplier] = useState();
    const [purchaseOrder, setPurchaseOrder] = useState();


     // Gettind data from Supplier
  const getSupplier = () => {
    api
      .get('/purchaseorder/getSupplier')
      .then((res) => {
        setSupplier(res.data.data);
      })
      .catch(() => {
        message('Supplier Data Not Found', 'info');
      });
  };

const getpurchaseOrder = (suppliers) => {
    api
      .post('/supplier/getPurchaseOrderLinkedss', { supplier_id: suppliers })
      .then((res) => {
        setPurchaseOrder(res.data.data);
      })
      .catch(() => {
        message('Supplier not found', 'info');
      });
    }

const supplierTableColumn = [
    {
      name: 'PO Date',
    },
    {
      name: 'PO CODE',
    },
    {
      name: 'PO value',
    },
    {
      name: 'Balance',
    },
    {
      name: 'Payment Status',
    },
    {
      name: 'History',
    },
  ];

  useEffect(() => {
    getSupplier ();
    getpurchaseOrder ();
  }, []);

  return (
    <ComponentCard title="Purchase Order Linked">
         <Col md="3">
                <FormGroup>
                  <Label>Supplier Name</Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={purchaseDetails && purchaseDetails.supplier_id}
                    name="supplier_id"
                  >
                    <option defaultValue="selected">Please Select</option>
                    {supplier &&
                      supplier.map((e) => {
                        return (
                          <option key={e.supplier_id} value={e.supplier_id}>
                            {e.company_name}
                          </option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Col>
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
                        <td>{moment(element.po_date).format('YYYY-MM-DD')}</td>
                        <td>{element.purchase_order_title}</td>
                        <td>{element.po_value}</td>
                        <td>
  {Number.isNaN(parseFloat(element.po_value) - parseFloat(element.prev_amount))
    ? "0"
    : Math.max(parseFloat(element.po_value) - parseFloat(element.prev_amount), 0)}
</td>
                        <td>{element.payment_status}</td>
                        
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

export default SupplierSummary;


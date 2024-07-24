import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import moment from 'moment';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useParams, Link } from 'react-router-dom';
import { Form, Table } from 'reactstrap';
import ComponentCard from '../ComponentCard';
import message from '../Message';
import api from '../../constants/api';

const SupplierHistory = () => {
  const [history, setHistory] = useState();
  const { id } = useParams();
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
const selectedLanguage = getSelectedLanguageFromLocalStorage();

// Use the selected language value as needed
console.log('Selected language from localStorage:', selectedLanguage);

const arb =selectedLanguage === 'Arabic'

  // const eng =selectedLanguage === 'English'

  const [arabic, setArabic] = useState([]);

  const getArabicCompanyName = () => {
    api
    .get('/translation/getTranslationForSupplier')
    .then((res) => {
      setArabic(res.data.data);
    })
    .catch(() => {
      // Handle error if needed
    });   
};

console.log('arabic',arabic)
useEffect(() => {
  getArabicCompanyName();
}, []);

let genLabel = '';

if (arb === true) {
  genLabel = 'arb_value';
} else {
  genLabel = 'value';
}
  // Get  By Id
  const getHistoryById = () => {
    api
      .post('/supplier/SupplierPayment', { purchase_order_id: id })
      .then((res) => {
        setHistory(res.data.data);
      })
      .catch(() => {
        message('Supplier Data Not Found', 'info');
      });
  };

  useEffect(() => {
    getHistoryById();
  }, []);

  const supplierHistoryColumn = [
    {
      
      name: arabic.find(item => item.key_text === 'mdSupplier.Date')?.[genLabel],
    },
    {
  
      name: arabic.find(item => item.key_text === 'mdSupplier.Amount')?.[genLabel],
    },
    {
     
      name: arabic.find(item => item.key_text === 'mdSupplier.ModeOfPayment')?.[genLabel],
    },
    {
  
      name: arabic.find(item => item.key_text === 'mdSupplier.Cancel')?.[genLabel],
    },
  ];

  const Supplier = (subConPaymentsId) => {
    Swal.fire({
      title: `Are you sure? ${id}`,
      text: 'Do you like to cancel the receipt?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
    }).then((result) => {
      if (result.isConfirmed) {
        api.put('/supplier/updateSupplierPaymentsAndPurchaseOrder', { supplier_receipt_id: subConPaymentsId,purchase_order_id: id }).then(() => {
          Swal.fire('Cancelled!');
          getHistoryById();
        });
      }
    });
  };

  return (
    <>
      <ComponentCard>
        <ToastContainer></ToastContainer>
        <Form>
          <div className="MainDiv">
            <div className="container">
              <Table id="Purchase Order Linked" className="display">
                <thead title="Purchase Order Linked ">
                  <tr>
                    {supplierHistoryColumn.map((cell) => {
                      return <td key={cell.name}>{cell.name}</td>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {history &&
                    history.map((element) => {
                      return (
                        <tr key={element.supplier_receipt_id}>
                          <td>{moment(element.date).format('YYYY-MM-DD')}</td>
                          <td>{element.amount}</td>
                          <td>{element.mode_of_payment}</td>
                          <td>
              {element.receipt_status !== 'Cancelled' ? (
                <Link to="">
                <span onClick={() => Supplier(element.supplier_receipt_id,element.purchase_order_id,element.supplier_id)}>
                  <u>{arb?'يلغي':'Cancel'}</u>
                  </span>
                  </Link>
              ) : (
                'Cancelled'
              )}
            </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </div>
          </div>
        </Form>
      </ComponentCard>
    </>
  );
};
export default SupplierHistory;

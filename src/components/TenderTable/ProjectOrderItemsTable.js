import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Table } from 'reactstrap';
import api from '../../constants/api';
// import PdfSalesOrder from '../PDF/PdfSalesOrder';

export default function CustomerFinanceInvoice({ ordersDetails }) {
  CustomerFinanceInvoice.propTypes = {
    ordersDetails: PropTypes.array,
  };

  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };

  const selectedLanguage = getSelectedLanguageFromLocalStorage();

  // Use the selected language value as needed
  console.log('Selected language from localStorage:', selectedLanguage);

  const arb = selectedLanguage === 'Arabic';

  // const eng =selectedLanguage === 'English'

  const [arabic, setArabic] = useState([]);

  const getArabicCompanyName = () => {
    api
      .get('/finance/getTranslationforTradingOrder')
      .then((res) => {
        setArabic(res.data.data);
      })
      .catch(() => {
        // Handle error if needed
      });
  };

  console.log('arabic', arabic);
  useEffect(() => {
    getArabicCompanyName();
  }, []);

  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }

  //Structure of Invoice table
  const invoiceTableColumns = [
    { name: arabic.find((item) => item.key_text === 'mdTradingOrder.Item Title')?.[genLabel] },
    { name: arabic.find((item) => item.key_text === 'mdTradingOrder.Unit')?.[genLabel] },
    { name: arabic.find((item) => item.key_text === 'mdTradingOrder.Price')?.[genLabel] },
    { name: arabic.find((item) => item.key_text === 'mdTradingOrder.Quantity')?.[genLabel] },
  ];

  return (
    // Invoice Tab

    <Form>
      <div className="MainDiv">
        <div className="container">
          <Table id="example">
            <thead>
              <tr>
                {invoiceTableColumns.map((cell) => {
                  return <td key={cell.name}>{cell.name}</td>;
                })}
              </tr>
            </thead>
            <tbody>
              {ordersDetails &&
                ordersDetails.map((element) => {
                  return (
                    <tr key={element.project_order_id}>
                      <td>
                        {arb && element.item_title_arb
                          ? element.item_title_arb
                          : element.item_title}
                      </td>

                      <td>{arb && element.unit_arb ? element.unit_arb : element.unit}</td>
                      <td>{element.cost_price}</td>
                      <td>{element.qty}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </div>
    </Form>
  );
}

import React, { useContext, useState, useEffect } from 'react';
import {
  FormGroup,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Label,
  Input,
} from 'reactstrap';
import PropTypes from 'prop-types';
import api from '../../constants/api';
import message from '../Message';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

//partialinvoiceeditmodal From VehicleEdit
const ProjectPartialInvoiceEdit = ({ partialinvoiceeditmodal, setPartialInvoiceEditModal, SalesInvoiceId }) => {
    ProjectPartialInvoiceEdit.propTypes = {
    partialinvoiceeditmodal: PropTypes.bool,
    setPartialInvoiceEditModal: PropTypes.func,
    SalesInvoiceId: PropTypes.any,
    // arb: PropTypes.any,
    // arabic: PropTypes.any

  };
  // let genLabel = '';

  // if (arb === true) {
  //   genLabel = 'arb_value';
  // } else {
  //   genLabel = 'value';
  // }

  // All State Variable

  const [partialinvoiceeditdetails, setPartialInvoiceEditDetails] = useState();
  // get staff details
  const { loggedInuser } = useContext(AppContext);

  const [totalAmount, setTotalAmount] = useState(0);

  const handleCalc = (Qty, UnitPrice) => {
    if (!Qty) Qty = 0;
    if (!UnitPrice) UnitPrice = 0;

    const calculatedTotalAmount = parseFloat(Qty) * parseFloat(UnitPrice);
    setTotalAmount(calculatedTotalAmount);
    // Do something with calculatedTotalAmount if needed.
  };
  function updateState(index, property, e) {
    const copyDeliverOrderProducts = [...partialinvoiceeditdetails];
    const updatedObject = { ...copyDeliverOrderProducts[index], [property]: e.target.value };

    const quantity = parseFloat(updatedObject.project_invoice_qty) || 0;
    const unitPrice = parseFloat(updatedObject.unit_price) || 0;
    updatedObject.total_cost = quantity * unitPrice;
    updatedObject.modification_date = creationdatetime;
    updatedObject.modified_by = loggedInuser.first_name;
    updatedObject.project_invoice_qty = e.target.value; // Set project_invoice_qty to the entered value

    const InvoiceQty = updatedObject.project_invoice_qty;
    const orderedQty = updatedObject.qty;

    if (InvoiceQty > orderedQty) {
      alert('Entered quantity exceeds ordered quantity!');
      return;
    }

    copyDeliverOrderProducts[index] = updatedObject;
    setPartialInvoiceEditDetails(copyDeliverOrderProducts);
  }
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };

  const selectedLanguage = getSelectedLanguageFromLocalStorage();
  const [arabic, setArabic] = useState([]);

  const arb = selectedLanguage === 'Arabic';

  // const eng = selectedLanguage === 'English';

  const getArabicCompanyName = () => {
    api
      .get('/invoice/getTranslationforTradingSalesInvoice')
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

  //Api call for getting Vehicle Insurance Data By ID
  const OrderLineItemsById = () => {
    api
      .post('/projectsalesinvoice/getInvoiceByOrderItemId', { project_invoice_id: SalesInvoiceId })
      .then((res) => {
        setPartialInvoiceEditDetails(res.data.data);
      })
      .catch(() => {
        message('Order Data Not Found', 'info');
      });
  };

  //Api call for Insert Vehicle Insurance Data
  const editSalesInvoice = () => {

    partialinvoiceeditdetails.forEach((item) => {
      console.log('API Request Payload:', item);
      api
        .post('/projectsalesinvoice/editInvoiceItems', item)
        .then(() => {
          message('Line Item Edited Successfully', 'sucess');
          window.location.reload();
        })
        .catch(() => {
          message('Cannot Edit Line Items', 'error');
        });
    })
  };

  // useEffect for Vehicle Insurance
  useEffect(() => {
    OrderLineItemsById();
  }, [SalesInvoiceId]);

  return (
    <>
      <Modal size="xl" isOpen={partialinvoiceeditmodal}>
        <ModalHeader>
          {arb ? 'عناصر الفاتورة' : 'Invoice Items'}
          <Button
            color="secondary"
            onClick={() => {
              setPartialInvoiceEditModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <Table bordered className="lineitem">
              <thead>
                <tr>
                  <th scope="col"> {arb ? 'عنوان' : 'Title'}</th>
                  <th scope="col">{arb ? 'وحدة' : 'Unit'}</th>
                  <th scope="col">{arb ? 'سعر الوحدة' : 'Unit Price'}</th>
                  <th scope="col">{arb ? 'الكمية المطلوبة' : 'ordered Quantity'}</th>
                  <th scope="col">{arb ? 'كمية الفاتورة' : 'invoice Quantity'}</th>
                  <th scope="col">{arb ? 'المبلغ الإجمالي' : 'Total Amount'}</th>
                  <th scope="col"> {arb ? 'تم التحديث بواسطة' : 'Updated By'}</th>


                </tr>
              </thead>
              <tbody>
                {partialinvoiceeditdetails &&
                  partialinvoiceeditdetails.map((invoiceItem, index) => {
                    return (
                      <tr key={invoiceItem.id}>
                        <td>
                          <Label dir="rtl" style={{ textAlign: 'right' }}>
                            {arabic.find((item) => item.key_text === 'mdTradingSalesInvoice.Title')?.[genLabel]}{' '}
                          </Label>
                          <Input
                            type="text"
                            disabled
                            defaultValue={
                              arb
                                ? invoiceItem && invoiceItem.item_title_arb
                                  ? invoiceItem.item_title_arb
                                  : invoiceItem && invoiceItem.item_title_arb !== null
                                    ? ''
                                    : invoiceItem && invoiceItem.item_title
                                : invoiceItem && invoiceItem.item_title
                            }
                            name={arb ? 'item_title_arb' : 'item_title'}
                          />
                        </td>
                        <td >
                          <Label dir="rtl" style={{ textAlign: 'right' }}>
                            {arabic.find((item) => item.key_text === 'mdTradingSalesInvoice.Unit')?.[genLabel]}{' '}
                          </Label>
                          <Input
                            type="text"
                            disabled
                            defaultValue={
                              arb
                                ? invoiceItem && invoiceItem.unit_arb
                                  ? invoiceItem.unit_arb
                                  : invoiceItem && invoiceItem.unit_arb !== null
                                    ? ''
                                    : invoiceItem && invoiceItem.unit
                                : invoiceItem && invoiceItem.unit
                            }
                            name={arb ? 'unit_arb' : 'unit'}
                          />

                        </td>
                        <td >
                          <Label dir="rtl" style={{ textAlign: 'right' }}>
                            {arabic.find((item) => item.key_text === 'mdTradingSalesInvoice.Unit Price')?.[genLabel]}{' '}
                          </Label>
                          <Input
                            type="text"
                            onChange={(e) => {
                              updateState(index, 'unit_price', e);

                            }}
                            disabled
                            defaultValue={
                              arb
                                ? invoiceItem && invoiceItem.unit_price_arb
                                  ? invoiceItem.unit_price_arb
                                  : invoiceItem && invoiceItem.unit_price_arb !== null
                                    ? ''
                                    : invoiceItem && invoiceItem.unit_price
                                : invoiceItem && invoiceItem.unit_price
                            }
                            name={arb ? 'unit_price_arb' : 'unit_price'}
                          />
                        </td>
                        <td >
                          <Label dir="rtl" style={{ textAlign: 'right' }}>
                            {arabic.find((item) => item.key_text === 'mdTradingSalesInvoice.Ordered Quantity')?.[genLabel]}{' '}
                          </Label>
                          <Input
                            type="text"
                            disabled
                            defaultValue={
                              arb
                                ? invoiceItem && invoiceItem.qty_arb
                                  ? invoiceItem.qty_arb
                                  : invoiceItem && invoiceItem.qty_arb !== null
                                    ? ''
                                    : invoiceItem && invoiceItem.qty
                                : invoiceItem && invoiceItem.qty
                            }
                            name={arb ? 'qty_arb' : 'qty'}
                          />
                        </td>
                        <td>
                        <Label dir="rtl" style={{ textAlign: 'right' }}>
                            {arabic.find((item) => item.key_text === 'mdTradingSalesInvoice.Invoice Quantity')?.[genLabel]}{' '}
                          </Label>
                          <Input
                            type="text"
                            onChange={(e) => {
                              updateState(index, 'project_invoice_qty', e);
                            }}
                            defaultValue={
                              arb
                                ? invoiceItem && invoiceItem.project_invoice_qty_arb
                                  ? invoiceItem.project_invoice_qty_arb
                                  : invoiceItem && invoiceItem.project_invoice_qty_arb !== null
                                    ? ''
                                    : invoiceItem && invoiceItem.project_invoice_qty
                                : invoiceItem && invoiceItem.project_invoice_qty
                            }
                            name={arb ? 'project_invoice_qty_arb' : 'project_invoice_qty'}
                          />
                        </td>
                        <td>
                        <Label dir="rtl" style={{ textAlign: 'right' }}>
                            {arabic.find((item) => item.key_text === 'mdTradingSalesInvoice.Total Amount')?.[genLabel]}{' '}
                          </Label>

                          <Input
                            type="text"
                            onChange={(e) => {
                              updateState(index, 'total_cost', e);
                              handleCalc(invoiceItem.project_invoice_qty, invoiceItem.unit_price);
                            }}
                            defaultValue={
                              arb
                                ? totalAmount ||invoiceItem && invoiceItem.total_cost_arb
                                  ? totalAmount ||invoiceItem.total_cost_arb
                                  : totalAmount ||invoiceItem && invoiceItem.total_cost_arb !== null
                                    ? ''
                                    : totalAmount ||invoiceItem && invoiceItem.total_cost
                                :totalAmount || invoiceItem && invoiceItem.total_cost
                            }
                            name={arb ? 'total_cost_arb' : 'total_cost'}
                            disabled

                          />

                        </td>
                        <td>{invoiceItem.modification_date ? `${invoiceItem.modified_by} (Modified on ${invoiceItem.modification_date})` : `${invoiceItem.created_by} (Created on ${invoiceItem.creation_date})`}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            type="button"
            onClick={() => {
              editSalesInvoice();
              setPartialInvoiceEditModal(false);
              // setTimeout(() => {
              //   window.location.reload()
              // }, 100);
            }}
          >
            Submit
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              setPartialInvoiceEditModal(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ProjectPartialInvoiceEdit;

import React, { useState, useEffect } from 'react';
import {
 Table,
  FormGroup, 
} from 'reactstrap';
import PropTypes from 'prop-types';
import * as Icon from 'react-feather';
import Swal from 'sweetalert2';
import message from '../Message';
import api from '../../constants/api';

export default function TenderQuotation({
   
    quote,
    project,
    PurchaseRequestID,
    arb

  }) {
    TenderQuotation.propTypes = {
      
      project: PropTypes.object,
      quote: PropTypes.object,
      PurchaseRequestID: PropTypes.object,
      arb: PropTypes.any,
    };

    const [vehicleinsurancegetdetails, setVehicleInsuranceGetDetails] = useState();
// const [editLineModelItem, setEditLineModelItem] = useState(null);
// const [editLineModal, setEditLineModal] = useState(false);
const QuoteProject = project.find((element) => {
    return element.purchase_request_id === PurchaseRequestID;
  });
  const deleteRecord = (deleteID) => {
    Swal.fire({
      title: `Are you sure? ${deleteID}`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        api.post('/purchaserequest/deleteEditItem', { purchase_request_items_id: deleteID }).then(() => {
          Swal.fire('Deleted!', 'Your Line Items has been deleted.', 'success');
          window.location.reload();
        });
      }
    });
  };
//Api call for getting Vehicle Insurance Data By ID
const getVehicleInsuranceDataById = () => {
    api
      .post('/purchaserequest/PurchaseRequestLineItemById',{purchase_request_id: PurchaseRequestID})
      .then((res) => {
        setVehicleInsuranceGetDetails(res.data.data);
      })
      .catch(() => {
        message('Vehicle Data Not Found', 'info');
      });
  };

  useEffect(() => {
    getVehicleInsuranceDataById();
  }, []);

return (
    

<FormGroup>
<Table bordered className="lineitem">
                      <thead>
                        <tr>
                          <th scope="col">  # </th>
                          <th scope="col">{arb ?'عنوان':'Title'}</th>
                          <th scope="col">{arb ?'وحدة':'Unit'}</th>
                          <th scope="col">{arb ?'كمية':'Quantity'}</th>
                          <th scope="col">{arb ?'انشأ من قبل':'Created By'}</th>
                          <th scope="col">{arb ?'تم التحديث بواسطة':'Updated By'}</th>
                          <th scope="col">{arb ?'وحفعلدة':'Action'}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {vehicleinsurancegetdetails &&
                          vehicleinsurancegetdetails.map((e,index) => {
                            return (
                              <tr>
                                <td data-label="S.No">{index + 1}</td>
                                <td data-label="Title">{arb?e.title_arb:e.title}</td>
                                <td data-label="Unit">{arb?e.unit_arb:e.unit || 'N/A'}</td>
                                <td data-label="Quantity">{arb?e.purchase_request_qty_arb:e.purchase_request_qty}</td>
                                <td data-label="Created By">{arb?e.created_by_arb:e.created_by}</td>
                                <td data-label="Updated By">{arb?e.modified_by_arb:e.modified_by}</td>
                                {quote && QuoteProject === undefined && (
                                  <td data-label="Actions">
                                    {/* <span
                                      className="addline"
                                      onClick={() => {
                                        // setEditLineModelItem(e);
                                        // setEditLineModal(true);
                                      }}
                                    >
                                      <Icon.Edit2 />
                                    </span> */}
                                    <span
                                      className="addline"
                                      onClick={() => {
                                        deleteRecord(e.purchase_request_items_id);
                                      }}
                                    >
                                      <Icon.Trash2 />
                                    </span>
                                  </td>
                                )}
                              </tr>
                            );
                          })}
                      </tbody>
                    </Table>
                  </FormGroup>
                  
);
}
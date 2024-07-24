/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Row, Button, Table } from 'reactstrap';
import * as Icon from 'react-feather';
import PropTypes from 'prop-types';
import api from '../../constants/api';
// import { purchaseTableColumn } from '../../data/PurchaseOrder/PurchaseTableColumn';

function PurchaseReturnhistoryTable({
  products,
  setProduct,
  getCheckedPoProducts,
  setEditModal,
  setViewHistoryModal,
  deletePoProduct,
  setHistoryProduct,
}) {
  PurchaseReturnhistoryTable.propTypes = {
    products: PropTypes.array,
    setProduct: PropTypes.func,
    getCheckedPoProducts: PropTypes.func,
    setEditModal: PropTypes.func,
    setViewHistoryModal: PropTypes.func,
    deletePoProduct: PropTypes.func,
    setHistoryProduct: PropTypes.func,
  };
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
    .get('/purchaseorder/getTranslationForPurchaseOrder')
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
const alcolumns = [    
    {
        name: '',
      },
      // {
      //   name: 'D.O',
      // },
      {
        name: '#',
      },  
    {
      name: "Returned Qty",
     
    },
      
    {
        name: "Created By",
        
      },
      {
        name: "Creation Date",
        
      }

  ]
  const purchaseTableColumn = [
    {
      name: '',
    },
    // {
    //   name: 'D.O',
    // },
    {
      name: '#',
    },
    {
      name: arabic.find(item => item.key_text === 'mdPurchaseOrder.Product Code')?.[genLabel],
  
    },
    {
      name: arabic.find(item => item.key_text === 'mdPurchaseOrder.Product Title')?.[genLabel],
    },
    {
      name: arabic.find(item => item.key_text === 'mdPurchaseOrder.Cost Price')?.[genLabel],
    },
    {
      name: arabic.find(item => item.key_text === 'mdPurchaseOrder.Selling Price')?.[genLabel],
    },
    {
      name: arabic.find(item => item.key_text === 'mdPurchaseOrder.GST')?.[genLabel],
    },
    {
      name: arabic.find(item => item.key_text === 'mdPurchaseOrder.Stock')?.[genLabel],
  
    },
    {
      name: arabic.find(item => item.key_text === 'mdPurchaseOrder.Qty')?.[genLabel],
    },
    {
      name: arabic.find(item => item.key_text === 'mdPurchaseOrder.Damaged Qty')?.[genLabel],
    },
    {
      name: arabic.find(item => item.key_text === 'mdPurchaseOrder.Added to Stock')?.[genLabel],
    },
    {
      name: arabic.find(item => item.key_text === 'mdPurchaseOrder.Qty Balance')?.[genLabel],
    },
    {
      name: arabic.find(item => item.key_text === 'mdPurchaseOrder.Status')?.[genLabel],
    },
    {
      name: arabic.find(item => item.key_text === 'mdPurchaseOrder.Total Amount')?.[genLabel],
  
    },
    {
      name: arabic.find(item => item.key_text === 'mdPurchaseOrder.Actual Total Amount')?.[genLabel],
    },
    // {
    //   name: 'Edit	',
    //   selector: 'edit',
    //   cell: () => <Icon.Edit2 />,
    //   grow: 0,
    //   width: 'auto',
    //   button: true,
    //   sortable: false,
    // },
    // {
    //   name: 'Delete',
    //   selector: 'delete',
    //   cell: () => <Icon.Trash />,
    //   grow: 0,
    //   width: 'auto',
    //   wrap: true,
    // },
    // {
    //   name: arabic.find(item => item.key_text === 'mdPurchaseOrder.History')?.[genLabel],
    // },
  ];
  return (
    <div>
      <Row>
        <Table id="example" className="display border border-secondary rounded">
          <thead title="Purchase Order Linked ">
            <tr>
              {alcolumns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((element, index) => {
                return (
                  <tr key={element.po_product_id}>
                    <td>
                      <input
                        type="checkbox"
                        id="sno"
                        name="sno"
                        value={element.po_product_id}
                        onChange={(e) => {
                          getCheckedPoProducts(e, index, element);
                        }}
                      />
                    </td>
                  
                    <td>{index + 1}</td>
                    <td>{element.purchase_return_qty}</td>
                
                <td>{element.created_by}</td>
                <td>{element.creation_date}</td>
                {/* <td>{element.modified_by}{element.modification_date}</td> */}
            
                </tr>
                );
              })}
          </tbody>
        </Table>
      </Row>
    </div>
  );
}

export default PurchaseReturnhistoryTable;

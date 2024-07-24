import React, { useState, useEffect } from 'react';
import * as Icon from 'react-feather';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Form,
} from 'reactstrap';
import moment from 'moment';
import { ToastContainer } from 'react-toastify';
import message from '../Message';
import api from '../../constants/api';
import AccMapSIngleDataEditModal from './AccMapSIngleDataEditModal';

const NewMenuItemModal = ({ menuItemModal, setMenuItemModal }) => {
  NewMenuItemModal.propTypes = {
    menuItemModal: PropTypes.bool,
    setMenuItemModal: PropTypes.func,
  };

  const [title, setTitle] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [parentOptions, setParentOptions] = useState();
  const [selectedParent, setSelectedParent] = useState(null);
  const [openItems, setOpenItems] = useState([]);
  const [clickedMenuItem, setClickedMenuItem] = useState(null);
  // const [chartofaccounts, setChartOfAccounts] = useState(null);

  // Open Edit Modal
  const [editMenuItemModal, setEditMenuItemModal] = useState(false);
  const toggle = () => {
    setEditMenuItemModal(!editMenuItemModal);
  };
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
const selectedLanguage = getSelectedLanguageFromLocalStorage();

// Use the selected language value as needed
console.log('Selected language from localStorage:', selectedLanguage);

const [arabic, setArabic] = useState([]);

const arb =selectedLanguage === 'Arabic'
//const eng =selectedLanguage === 'English'

const getArabicCompanyName = () => {
  api
  .get('/translation/getTranslationForCompanyAccMap')
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

  //  insert parent Item 
  const SaveData = () => {
    let parentid = 0;
    let sortOrder = 1;
  
    if (selectedParent !== null && selectedParent !== "") {
      parentid = parseInt(selectedParent, 10);
      const existingItem = menuItems.find((item) => item.parent_id === parentid);
      if (existingItem) {
        const sameParentItems = menuItems.filter((item) => item.parent_id === parentid);
        sortOrder = sameParentItems.length + 1;
      }
    } else {
      parentid = 0;
      const itemCount = menuItems.reduce((count, item) => {
        if (item.parent_id === 0) {
          return count + 1;
        }
        return count;
      }, 0);
      sortOrder = itemCount + 1;
    }
  
    const data = {
      title,
      title_arb: document.querySelector('input[name="title_arb"]').value, // Adding title_arb from input field
      code: document.querySelector('input[name="code"]').value, // Adding code from input field
      sort_order: sortOrder,
      parent_id: parentid || 0,
      creation_date: moment(Date.now()).format('YYYY-MM-DD'),
      modification_date: "",
      category_type: "",
    };
  
    if(data.title !== '' && data.title_arb !== '') { // Check both title and title_arb
      api
      .post('/accountsMap/insertMenuItems', data)
      .then((res) => {
        setTitle(res.data.data);
        message('Record edited successfully', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch(() => {
        message('Menu Item Data Not inserted', 'info');
      });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };
  
  const getGroup = () => {
    api.get('/accountsMap/getParentItem').then((res) => {
      setParentOptions(res.data.data);
      setMenuItems(res.data.data);
    });
  };

  const handleInputs = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "") {
      // User selected "Please Select"
      setSelectedParent(null);
    } else {
      // Split the selected value to get acc_category_id
      const [accCategoryId] = selectedValue.split(",");
      setSelectedParent(accCategoryId);
    }
  };


    // get Chart Of Accounts List
    // const getChartOfAccounts = () => {
    //   api
    //     .get('/chartofaccounts/getChartOfAccounts')
    //     .then((res) => {
    //       setChartOfAccounts(res.data.data);
    //      })
    // };

  useEffect(() => {
    getGroup();
    // getChartOfAccounts();
  }, []);

  useEffect(() => {
    const allItemIds = menuItems.map((item) => item.acc_category_id);
    setOpenItems(allItemIds);
  }, [menuItems]);

  const toggleItem = (itemId) => {
    if (openItems.includes(itemId)) {
      setOpenItems(openItems.filter((item) => item !== itemId));
    } else {
      setOpenItems([...openItems, itemId]);
    }
  };

  // Rendering logic for menu items

  const renderMenuItem = (item) => {
    const hasChildren = menuItems.some((childItem) => childItem.parent_id === item.acc_category_id);
    const isOpen = openItems.includes(item.acc_category_id);

    const handleChildTitleClick = (clickedItem) => {
      setClickedMenuItem(clickedItem);
      toggle();
    };

    return (
      <li key={item.acc_category_id}>
        <div className={`menu-item ${hasChildren ? 'open' : 'closed'}`}>
          <span onClick={(e) => { e.stopPropagation(); toggleItem(item.acc_category_id); }}>
            {hasChildren ? (isOpen ? <Icon.MinusSquare size={20} color='blue' /> : <Icon.PlusSquare size={20} color='blue' />) : ''}
          </span>
          &nbsp;<span onClick={() => handleChildTitleClick(item)}> {arb?item.title_arb:item.title} </span>
        </div>
        {hasChildren && isOpen && (
          <ul style={{ listStyle: 'none' }}>
            {menuItems
              .filter((childItem) => childItem.parent_id === item.acc_category_id)
              .map((childItem) => renderMenuItem(childItem))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <>
    <ToastContainer></ToastContainer>
      <Modal size="1" isOpen={menuItemModal}>
        <ModalHeader>
          New Menu Item
          <Button
            color="secondary"
            onClick={() => {
              setMenuItemModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>

        <ModalBody>
          <Row>
            <Col md="12">
              <Form>
                <Row>
                  <Col md="12">
                    <FormGroup>
                    <Label dir="rtl" style={{ textAlign: 'right' }}>
                        {arabic.find((item) => item.key_text === 'mdAccMap.Parent')?.[genLabel]}
                      </Label>
                      <Input type="select" name={arb ? 'parent_id' : 'parent_id'} onChange={handleInputs}>
                        <option value="">Please Select</option>

                        {parentOptions?.map((option) => (
                          <option key={option.acc_category_id} value={`${option.acc_category_id},${option.sort_order}`}>
                            {arb ? option.title_arb : option.title}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <FormGroup>
                    <Label dir="rtl" style={{ textAlign: 'right' }}>
                        {arabic.find((item) => item.key_text === 'mdAccMap.Ttile')?.[genLabel]}<span className="required"> *</span>
                      </Label>
                      <Input
                        type="text"
                        name="title"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <FormGroup>
                    <Label dir="rtl" style={{ textAlign: 'right' }}>
                        {arabic.find((item) => item.key_text === 'mdAccMap.TitleArb')?.[genLabel]}<span className="required"> *</span>
                      </Label>                     
                       <Input
                        type="text"
                        name="title_arb"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <FormGroup>
                    <Label dir="rtl" style={{ textAlign: 'right' }}>
                        {arabic.find((item) => item.key_text === 'mdAccMap.Code')?.[genLabel]}
                      </Label> 
                      <Input
                        type="text"
                        name="code"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                {/* <Row>
                  <Col md="12">
                    <FormGroup>
                        <Label>{arb === true ? 'يرجى اختيار' : 'Customer'}</Label>
                        <Input type="select" name={arb ? 'category_type_arb' : 'category_type'} 
                            onChange={handleInputs} >
                            <option>{arb === true ? 'حدد العميل' : 'Select Customer'}</option>
                            <option value={arb === true ? 'حساب بنكي' : "Bank Account"}>{arb === true ? 'حساب بنكي' : 'Bank Account'}</option>
                            <option value={arb === true ? 'حساب نقدي' : 'Cash Account'}>{arb === true ? 'حساب نقدي' : 'Cash Account'}</option>
                            <option value={arb === true ? 'دائن / متنوع متنوع' : 'Sundry Creditor / Debtor'}>{arb === true ? 'دائن / مدين متنوع' : 'Sundry Creditor / Debtor'}</option>
                            <option value={arb === true ? 'عداد' : 'Counter'}>{arb === true ? 'عداد' : 'Counter'}</option>
                        </Input>
                    </FormGroup>
                </Col>
                </Row> */}
              </Form>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            className="shadow-none"
            color="primary"
            onClick={() => {
              SaveData();
            }}
          >
            Save
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              setMenuItemModal(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <div>
        <ul style={{ listStyle: 'none' }}>
          {menuItems.filter(item => item.parent_id === 0).map(item => renderMenuItem(item, menuItems))}
        </ul>
      </div>

      <AccMapSIngleDataEditModal
        editMenuItemModal={editMenuItemModal}
        setEditMenuItemModal={setEditMenuItemModal}
        menuItems={menuItems}
        clickedMenuItem={clickedMenuItem}
        arb={arb}
      />

    </>
  );
};

export default NewMenuItemModal;

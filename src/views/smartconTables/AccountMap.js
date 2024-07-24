import React, { useState } from 'react';
import { Button } from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import NewMenuItemModal from '../../components/Accounts/NewMenuItemModal';

const AccountMap = () => {
    const [menuItemModal, setMenuItemModal] = useState(false);
    const toggle = () => {
        setMenuItemModal(!menuItemModal);
      };

  return (
    <>
      <BreadCrumbs />
      <Button color="primary" className="shadow-none" onClick={toggle.bind(null)}> Add New Menu Item </Button>
      <hr/>
      <NewMenuItemModal menuItemModal={menuItemModal} setMenuItemModal={setMenuItemModal} />
    </>
  );
};
export default AccountMap;

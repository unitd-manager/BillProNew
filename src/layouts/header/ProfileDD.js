import React from 'react';
import { DropdownItem } from 'reactstrap';
import PropTypes from 'prop-types';
// import { User, 
//   FileText, Star, Settings, Droplet 
// } from 'react-feather';
import user1 from '../../assets/images/users/user1.jpg';

const ProfileDD = ({ userEmail }) => {
  return (
    <div>
      {/* <div className="d-flex gap-3 p-3 border-bottom pt-2 align-items-center">
        <img src={user1} alt="user" className="rounded-circle" width="60" />
        <span>
          <h6 className="mb-0">John Deo</h6>
          <small>info@wrappixel.com</small>
        </span>
      </div> */}
      <div className="d-flex gap-3 p-3 border-bottom pt-2 align-items-center">
        <img src={user1} alt="user" className="rounded-circle" width="60" />
            <h6 className="mb-0">{userEmail}</h6>
      </div>
      {/* <DropdownItem className="px-4 py-3">
        <User size={20} />
        &nbsp; My Profile
      </DropdownItem> */}
      {/* <DropdownItem className="px-4 py-3">
        <FileText size={20} />
        &nbsp; Edit Profile
      </DropdownItem>
      <DropdownItem className="px-4 py-3">
        <Star size={20} />
        &nbsp; My Balance
      </DropdownItem>
      <DropdownItem className="px-4 py-3">
        <Droplet size={20} />
        &nbsp; Customize
      </DropdownItem>
      <DropdownItem divider />
      <DropdownItem className="px-4 py-3">
        <Settings size={20} />
        &nbsp; Settings
      </DropdownItem> */}
      <DropdownItem divider />
    </div>
  );
};
ProfileDD.propTypes = {
  userEmail: PropTypes.string.isRequired,
}

export default ProfileDD;

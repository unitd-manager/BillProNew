import { Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import img1 from '../../../assets/images/users/user4.jpg';

const EmployeeCard = ({ image, title, empId, gender,projectDesignation,joinDate,arb }) => {

  const calculateTotalExperience = (dateJoined) => {
    if (!dateJoined) {
      return ""; 
    }
    

    const joinDateTime = new Date(dateJoined);
    
    const currentDate = new Date();
    
    const difference = currentDate - joinDateTime;
    
    const totalYears = difference / (1000 * 60 * 60 * 24 * 365.25);
    
    const totalMonths = totalYears * 12;
    
    const years = Math.floor(totalYears);
    const months = Math.floor(totalMonths % 12);

    
    let experienceString = '';
    if (years > 0) {
      experienceString += `${years} year${years > 1 ? 's' : ''}`;
    }
    if (months > 0) {
      if (experienceString) {
        experienceString += ' ';
      }
      experienceString += `${months} month${months > 1 ? 's' : ''}`;
    }
    return experienceString;
  };

  const totalExperience = calculateTotalExperience(joinDate);

  return (
    <>
      <Card>
        <CardBody className="d-flex p-4 border-bottom">
          {gender === 'Female' ? (
            <img src={image} className="rounded-circle" width="80" alt="avatar" />
          ) : (
            <img src={img1} className="rounded-circle" width="80" alt="avatar" />
          )}
          <CardTitle tag="h4" className="fw-bold ml-3 mt-3 mb-0 profile_detail">
            <Link to={`/EmployeeEdit/${empId}?tab=1`}>{title}</Link>
            <CardSubtitle className="text-muted mt-2" style={{fontSize:15}}>{projectDesignation}</CardSubtitle>
            <CardSubtitle className="text-muted mt-2" style={{fontSize:15}}>{arb ?'خبرة':'Experience'}: {totalExperience}</CardSubtitle>
          </CardTitle>
        </CardBody>
      </Card>
    </>
  );
};

EmployeeCard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  empId: PropTypes.any,
  projectDesignation: PropTypes.string,
  gender: PropTypes.string,
  joinDate: PropTypes.string,
  arb: PropTypes.any,
};

export default EmployeeCard;

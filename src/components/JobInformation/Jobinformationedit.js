import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, FormGroup } from 'reactstrap';
//import ComponentCardV2 from '../ComponentCardV2';
import JobInformation from '../SupplierModal/JobInformationEditModal';
// import PdfKET from '../PDF/PdfKET';
import ApiButton from '../ApiButton';
// import PdfEmployeeContract from '../PDF/PdfEmployeeContract';

export default function Jobinformationedit({
  editJobData,
  //id,
  // applyChanges,
  navigate,
  //insertJobInformation,
  JobInformationEditModal,
  setJobInformationEditModal,
  deletejobData
  // job,
}) {
  Jobinformationedit.propTypes = {
    // applyChanges: PropTypes.func,
    editJobData: PropTypes.any,
    //id: PropTypes.any,
    //insertJobInformation: PropTypes.any,
    JobInformationEditModal: PropTypes.any,
    setJobInformationEditModal: PropTypes.any,
    navigate: PropTypes.any,
    deletejobData:PropTypes.any,
    //job: PropTypes.any,
  };
  const backToList = () => {
    navigate('/JobInformation');
  };
  return (
    <Form>
      <FormGroup>
        
          <Row>
          
            <ApiButton
              editData={editJobData}
              navigate={navigate}
              applyChanges={editJobData}
              backToList={backToList}
              deleteData={deletejobData}
              // deleteData={deleteLoanData}
              module="Job Information"
            ></ApiButton>
            <Col>
              {/* <Button className="shadow-none" onClick={() => insertJobInformation(id)} color="dark">
                Duplicate
              </Button> */}
              <JobInformation
                JobInformationEditModal={JobInformationEditModal}
                setJobInformationEditModal={setJobInformationEditModal}
              ></JobInformation>
            </Col>
          </Row>
       
      </FormGroup>
    </Form>
  );
}

import React, { useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import * as Icon from 'react-feather';
import { ToastContainer } from 'react-toastify';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import message from '../../components/Message';
import api from '../../constants/api';
import ComponentCard from '../../components/ComponentCard';
//import VehicleButton from '../../components/VehicleTable/VehicleButton';
import VehicleDetailsTable from '../../components/VehicleTable/VehicleDetailsTable';
import VehicleFuelModal from '../../components/VehicleTable/VehicleFuelModal';
import VehicleInsuranceModal from '../../components/VehicleTable/VehicleInsuranceModal';
import VehicleServiceModal from '../../components/VehicleTable/VehicleServiceModal';
import creationdatetime from '../../constants/creationdatetime';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import ApiButton from '../../components/ApiButton';

const VehicleEdit = () => {
  // All state variables
  const [vehicleeditdetails, setVehicleEditDetails] = useState();
  const [vehiclefuelmodal, setVehicleFuelModal] = useState(false);
  const [vehicleinsurancemodal, setVehicleInsuranceModal] = useState(false);
  const [vehicleservicemodal, setVehicleServiceModal] = useState(false);
  const [RoomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState('');
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });

  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();

  //All Functions/Methods
  //Setting Data in Vehicle Details
  const vehiclehandleInputs = (e) => {
    setVehicleEditDetails({ ...vehicleeditdetails, [e.target.name]: e.target.value });
  };

  // Route Change
  // const applyChanges = () => {};
  // const saveChanges = () => {
  //   if (vehicleeditdetails.vehicle_no !== '') {
  //     navigate('/Vehicle');
  //   }
  //   window.location.reload();
  // };
  const backToList = () => {
    navigate('/Vehicle');
  };

  //Attachments
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
  };

  //Api call for getting Vehicle Data By ID
  const getVehicleById = () => {
    api
      .post('/vehicle/getVehicleById', { vehicle_id: id })
      .then((res) => {
        setVehicleEditDetails(res.data.data);
      })
      .catch(() => {
        message('Vehicle Data Not Found', 'info');
      });
  };

  //Api call for Editing Vehicle Details
  const editVehicleData = () => {
    vehicleeditdetails.modification_date = creationdatetime;
    if (vehicleeditdetails.vehicle_no !== '') {
      api
        .post('/vehicle/editVehicle', vehicleeditdetails)
        .then(() => {
          message('Record editted successfully', 'success');
          getVehicleById();
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };

  //Api call for Deleting Vahicle Data
  const deleteVehicleData = () => {
    api
      .post('/vehicle/deleteVehicle', { vehicle_id: id })
      .then(() => {
        message('Record editted successfully', 'success');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  useEffect(() => {
    getVehicleById();
  }, [id]);

  return (
    <>
      <BreadCrumbs />
      <ToastContainer />

      {/* Import From Vehicle Button */}
      {/* <VehicleButton
        navigate={navigate}
        saveChanges={saveChanges}
        applyChanges={applyChanges}
        backToList={backToList}
        editVehicleData={editVehicleData}
        deleteVehicleData={deleteVehicleData}
        id={id}
      ></VehicleButton> */}
<ApiButton
              editData={editVehicleData}
              navigate={navigate}
              applyChanges={editVehicleData}
              deleteData={deleteVehicleData}
              backToList={backToList}
              module="Vehicle"
            ></ApiButton>
      {/* Import From Vehicle Details Table */}
      <VehicleDetailsTable
        vehicleeditdetails={vehicleeditdetails}
        vehiclehandleInputs={vehiclehandleInputs}
        setVehicleFuelModal={setVehicleFuelModal}
        setVehicleInsuranceModal={setVehicleInsuranceModal}
        setVehicleServiceModal={setVehicleServiceModal}
        vehicleinsurancemodal={vehicleinsurancemodal}
        vehicleservicemodal={vehicleservicemodal}
      />

      {/* Import From Vehicle Fuel Modal */}
      <VehicleFuelModal
        vehiclefuelmodal={vehiclefuelmodal}
        setVehicleFuelModal={setVehicleFuelModal}
      />

      {/* Import From Vehicle Insurance Modal */}
      <VehicleInsuranceModal
        vehicleinsurancemodal={vehicleinsurancemodal}
        setVehicleInsuranceModal={setVehicleInsuranceModal}
      />

      {/* Import From Vehicle Service Modal */}
      <VehicleServiceModal
        vehicleservicemodal={vehicleservicemodal}
        setVehicleServiceModal={setVehicleServiceModal}
      />

      <Form>
        <FormGroup>
          <ComponentCard title="Attachments">
            <Row>
              <Col xs="12" md="3" className="mb-3">
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    setRoomName('Vehicle');
                    setFileTypes(['JPG','JPEG', 'PNG', 'GIF', 'PDF']);
                    dataForAttachment();
                    setAttachmentModal(true);
                  }}
                >
                  <Icon.File className="rounded-circle" width="20" />
                </Button>
              </Col>
            </Row>
            <AttachmentModalV2
              moduleId={id}
              attachmentModal={attachmentModal}
              setAttachmentModal={setAttachmentModal}
              roomName={RoomName}
              fileTypes={fileTypes}
              altTagData="VehicleRelated Data"
              desc="VehicleRelated Data"
              recordType="RelatedPicture"
              mediaType={attachmentData.modelType}
            />
            <ViewFileComponentV2 moduleId={id} roomName="Vehicle" recordType="RelatedPicture" />
          </ComponentCard>
        </FormGroup>
      </Form>
    </>
  );
};

export default VehicleEdit;

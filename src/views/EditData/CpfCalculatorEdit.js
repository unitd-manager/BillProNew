import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Button
} from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import * as Icon from 'react-feather';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import ComponentCard from '../../components/ComponentCard';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import message from '../../components/Message';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import api from '../../constants/api';
import CpfCalculatorMainDetails from '../../components/CpfCalculator/CpfCalculatorMainDetails';
import ApiButton from '../../components/ApiButton';

const CpfCalculatorEdit = () => {
  //Const Variables
  
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [cpfRecordDetails, setCpfRecordDetails] = useState({});
  const [RoomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState('');
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  
  const [update, setUpdate] = useState(false);

  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();

  // Button Save Apply Back List
  const applyChanges = () => {};
  const backToList = () => {
    navigate('/CPFCalculator');
  };

 
  // Get Leaves By Id
  const editCpfRecordById = () => {
    api
      .post('/cpfCalculator/getCpfCalculatorRecordById', { cpf_calculator_id: id })
      .then((res) => {
        setCpfRecordDetails(res.data.data[0]);
       
      })
      .catch(() => {
        message('leaves Data Not Found', 'info');
      });
  };
  //Leave Functions/Methods
  const handleInputs = (e) => {
    setCpfRecordDetails({ ...cpfRecordDetails, [e.target.name]: e.target.value });
  
  };
  // Attachment
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
  };

  //Logic for edit data in db
  const editCpfCalculator = () => {
    
   
      api
        .post('/cpfCalculator/editCpfCalculator', cpfRecordDetails)
        .then(() => {
          message('Record editted successfully', 'success');
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    
  };

  useEffect(() => {
    editCpfRecordById();
  }, [id]);

  return (
    <>
      {/* BreadCrumbs */}
      <BreadCrumbs heading={cpfRecordDetails && cpfRecordDetails.employee_name} />
      {/* Button */}
      <ApiButton
        editData={editCpfCalculator}
        navigate={navigate}
        applyChanges={applyChanges}
        backToList={backToList}
        module="CPF Calculater"
      ></ApiButton>
<ToastContainer></ToastContainer>
      {/* Main Details */}
      <CpfCalculatorMainDetails
        handleInputs={handleInputs}
        cpfRecordDetails={cpfRecordDetails}
      ></CpfCalculatorMainDetails>

      {/* Nav tab */}
      <ComponentCard title="Attachment">

      <Form>
              <FormGroup>
                  <Row>
                    <Col xs="12" md="3" className="mb-3">
                      <Button
                        className="shadow-none"
                        color="primary"
                        onClick={() => {
                          setRoomName('CpfCalculator');
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
                    altTagData="CpfCalculator Data"
                    desc="CpfCalculator Data"
                    recordType="CpfCalculator Picture"
                    mediaType={attachmentData.modelType}
                    update={update}
                    setUpdate={setUpdate}
                  />
                  <ViewFileComponentV2 moduleId={id} roomName="CpfCalculator" recordType="CpfCalculatorPicture" update={update}
                    setUpdate={setUpdate}/>
              </FormGroup>
            </Form>
      </ComponentCard>
    </>
  );
};
export default CpfCalculatorEdit;

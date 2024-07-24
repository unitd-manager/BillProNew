import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Form, FormGroup, Button, TabContent, TabPane } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useNavigate, useParams } from 'react-router-dom';
import '../form-editor/editor.scss';
import * as Icon from 'react-feather';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
//import ComponentCardV2 from '../../components/ComponentCardV2';
import creationdatetime from '../../constants/creationdatetime';
import message from '../../components/Message';
import api from '../../constants/api';
import AppContext from '../../context/AppContext';
import Tab from '../../components/project/Tab';
import UomDetails from '../../components/UomModal/UomDetails';
import ApiButton from '../../components/ApiButton';

const UomEdit = () => {
  //all state variables
  const [uom, setUoM] = useState();
  const [uomStatus, setUomStatus] = useState();
  const [RoomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState('');
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  //const [update, setUpdate] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  // Navigation and Parameter Constants

  //navigation and params
  const { id } = useParams();
  const navigate = useNavigate();
  //const applyChanges = () => {};

  // Function to toggle tabs
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const tabs = [{ id: '1', name: 'Attachment' }];

  // Attachment
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
  };

  //Handle input function
  const handleInputs = (e) => {
    setUoM({ ...uom, [e.target.name]: e.target.value });
  };
  const backToList = () => {
    navigate('/UoM');
  };
  //get staff details
  const { loggedInuser } = useContext(AppContext);

  // Get Supplier By Id
  const editUomById = () => {
    api
      .post('/uom/getUoMById', { uom_id: id })
      .then((res) => {
        setUoM(res.data.data[0]);
      })
      .catch(() => {
        message('UoM Data Not Found', 'info');
      });
  };

  //Logic for edit data in db
  const editUomData = () => {
    if (uom.uom_name !== '') {
      uom.modification_date = creationdatetime;
      uom.modified_by = loggedInuser.first_name;

      api
        .post('/uom/edit-UoM', uom)
        .then(() => {
          message('Record editted successfully', 'success');
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields.', 'error');
    }
  };

  useEffect(() => {
    editUomById();
  }, [id]);

  //Api call for getting Staff Type From Valuelist
  const getUomStatus = () => {
    api
      .get('/uom/getValueList')
      .then((res) => {
        setUomStatus(res.data.data);
      })
      .catch(() => {
        message('Status Data Not Found', 'info');
      });
  };
  useEffect(() => {
    getUomStatus();
  }, []);

  return (
    <>
      <BreadCrumbs />
      {/* <Form>
        <FormGroup>
          <ComponentCardV2>
            <Row>
              <Col>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    editUomData();
                    navigate('/UoM');
                  }}
                >
                  Save
                </Button>
              </Col>
              <Col>
                <Button
                  color="primary"
                  className="shadow-none"
                  onClick={() => {
                    editUomData();
                    setTimeout(() => {
                      applyChanges();
                    }, 800);
                  }}
                >
                  Apply
                </Button>
              </Col>
              <Col>
                <Button
                  color="dark"
                  className="shadow-none"
                  onClick={() => {
                    applyChanges();
                    navigate('/UoM');
                  }}
                >
                  Back to List
                </Button>
              </Col>
            </Row>
          </ComponentCardV2>
        </FormGroup>
      </Form> */}
      <ApiButton
              editData={editUomData}
              navigate={navigate}
              applyChanges={editUomData}
              //deleteData={deleteBookingData}
              backToList={backToList}
              module="UoM"
            ></ApiButton>
      <ComponentCard title="UoM Details" creationModificationDate={uom}>
        <UomDetails handleInputs={handleInputs} uom={uom} uomStatus={uomStatus}></UomDetails>
      </ComponentCard>

      {/* Attachment Tab */}
      <ComponentCard title="More Details">
        <ToastContainer></ToastContainer>
        <Tab toggle={toggle} tabs={tabs} />
        <TabContent className="p-4" activeTab={activeTab}>
          <TabPane tabId="1">
            <Form>
              <FormGroup>
                <Row>
                  <Col xs="12" md="3" className="mb-3">
                    <Button
                      className="shadow-none"
                      color="primary"
                      onClick={() => {
                        setRoomName('Supplier');
                        setFileTypes(['JPG', 'JPEG', 'PNG', 'GIF', 'PDF']);
                        dataForAttachment();
                      }}
                    >
                      <Icon.File className="rounded-circle" width="20" />
                    </Button>
                  </Col>
                </Row>
                <AttachmentModalV2
                  moduleId={id}
                  roomName={RoomName}
                  fileTypes={fileTypes}
                  altTagData="SupplierRelated Data"
                  desc="SupplierRelated Data"
                  recordType="RelatedPicture"
                  mediaType={attachmentData.modelType}
                />
                <ViewFileComponentV2
                  moduleId={id}
                  roomName="Supplier"
                  recordType="RelatedPicture"
                  
                />
              </FormGroup>
            </Form>
          </TabPane>
        </TabContent>
      </ComponentCard>
    </>
  );
};

export default UomEdit;

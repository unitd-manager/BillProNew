import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import * as Icon from 'react-feather';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import message from '../../components/Message';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import api from '../../constants/api';
//import SectionButton from '../../components/SectionTable/SectionButton';
import creationdatetime from '../../constants/creationdatetime';
import ApiButton from '../../components/ApiButton';

const SectionEdit = () => {
  //Const Variables
  const [section, setSection] = useState();
  const [activeTab, setActiveTab] = useState('1');
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [RoomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState('');
  const [valuelist, setValuelist] = useState();
  const [pictureData, setDataForPicture] = useState({
    modelType: '',
  });
  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();
  //  toggle Expense
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  // Abi for Picture attachment
  const dataForPicture = () => {
    setDataForPicture({
      modelType: 'picture',
    });
  };

  //  button position
  //const applyChanges = () => {};

  const backToList = () => {
    navigate('/Section');
  };
  //  Get section by id
  const editSectionyId = () => {
    api
      .post('/section/getSectionById', { section_id: id })
      .then((res) => {
        setSection(res.data.data[0]);
      })
      .catch(() => {
        message('Section Data Not Found', 'info');
      });
  };
  //Section Functions/Methods
  const handleInputs = (e) => {
    setSection({ ...section, [e.target.name]: e.target.value });
  };
  //Logic for section edit data in db
  const editSectionData = () => {
    if (section.section_title !== '') {
      section.modification_date = creationdatetime;
      api
        .post('/section/editSection', section)
        .then(() => {
          message('Record editted successfully', 'success');
          editSectionyId();
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };
  // delete section
  const DeleteSection = () => {
    api
      .post('/section/deleteSection', { section_id: id })
      .then(() => {
        message('Record editted successfully', 'success');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };
  //Api call for getting valuelist dropdown
  const getValuelist = () => {
    api
      .get('/section/getValueList')
      .then((res) => {
        setValuelist(res.data.data);
      })
      .catch(() => {
        message('valuelist not found', 'info');
      });
  };
  useEffect(() => {
    editSectionyId();
    getValuelist();
  }, [id]);

  return (
    <>
      <BreadCrumbs heading={section && section.section_title} />
      {/* Button */}
      {/* <SectionButton
        editSectionData={editSectionData}
        navigate={navigate}
        applyChanges={applyChanges}
        DeleteSection={DeleteSection}
        backToList={backToList}
        id={id}
      ></SectionButton> */}
<ApiButton
              editData={editSectionData}
              navigate={navigate}
              applyChanges={editSectionData}
              deleteData={DeleteSection}
              backToList={backToList}
              module="Section"
            ></ApiButton>
      {/* Main Details */}
      <Form>
        <FormGroup>
          <ComponentCard title="Section Details" creationModificationDate={section}>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>
                    Title<span className="required"> *</span>
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={section && section.section_title}
                    name="section_title"
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Section Type</Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={section && section.section_type}
                    name="section_type"
                  >
                    <option defaultValue="selected">Please Select</option>
                    {valuelist &&
                      valuelist.map((e) => {
                        return (
                          <option key={e.value} value={e.value}>
                            {e.value}
                          </option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="4">
                <Label>Button Position</Label>
                <Input
                  type="select"
                  onChange={handleInputs}
                  value={section && section.button_position}
                  name="button_position"
                >
                  <option defaultValue="selected">Please Select</option>
                  <option value="Top">Top</option>
                  <option value="Admin">Admin</option>
                  <option value="Reports">Reports</option>
                </Input>
              </Col>
              <Col md="3">
                <Label>Groups</Label>
                <Input
                  type="select"
                  onChange={handleInputs}
                  value={section && section.groups}
                  name="groups"
                >
                  <option defaultValue="selected">Please Select</option>
                  <option value="Reports">Reports</option>
                  <option value="Home">Home</option>
                  <option value="Tender/Project">Tender/Project</option>
                  <option value="Project">Project</option>
                  <option value="Finance/Purchase">Finance/Purchase</option>
                  <option value="Payroll/HR">Payroll/HR</option>
                  <option value="Planning">Planning</option>
                  <option value="Trading">Trading</option>
                  <option value="Accounts">Accounts</option>
                  <option value="Inventory">Inventory</option>
                  <option value="Purchase">Purchase</option>
                  <option value="Admin">Admin</option>
                </Input>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Routes</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={section && section.routes}
                    name="routes"
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Number Of Rows</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={section && section.number_of_rows}
                    name="number_of_rows"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <Label>Published</Label>
                <FormGroup>
                  <Input
                    type="radio"
                    name="published"
                    value="1"
                    onChange={handleInputs}
                    defaultChecked={section && section.published === 1 && true}
                  />
                  <Label>Yes</Label>

                  <Input
                    type="radio"
                    name="published"
                    value="0"
                    onChange={handleInputs}
                    defaultChecked={section && section.published === 0 && true}
                  />
                  <Label>No</Label>
                </FormGroup>
              </Col>
            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>
      {/* Creation and Modification date & time */}
      {/* Tab start */}
      <ComponentCard>
        <ToastContainer></ToastContainer>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={activeTab === '1' ? 'active' : ''}
              onClick={() => {
                toggle('1');
              }}
            >
              Picture
            </NavLink>
          </NavItem>
        </Nav>
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
                        setRoomName('SectionPic');
                        setFileTypes(['JPG','JPEG','PNG', 'GIF']);
                        dataForPicture();
                        setAttachmentModal(true);
                      }}
                    >
                      <Icon.Image className="rounded-circle" width="20" />
                    </Button>
                  </Col>
                </Row>
                <AttachmentModalV2
                  moduleId={id}
                  attachmentModal={attachmentModal}
                  setAttachmentModal={setAttachmentModal}
                  roomName={RoomName}
                  fileTypes={fileTypes}
                  altTagData="Section Data"
                  desc="Section Data"
                  recordType="Picture"
                  mediaType={pictureData.modelType}
                />
                <ViewFileComponentV2 moduleId={id} roomName="SectionPic" recordType="Picture" />
              </FormGroup>
            </Form>
          </TabPane>
        </TabContent>
      </ComponentCard>
    </>
  );
};
export default SectionEdit;

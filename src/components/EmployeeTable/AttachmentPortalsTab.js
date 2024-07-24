import React, { useState,useEffect } from 'react';
import { Row, Col, Form, FormGroup, Button } from 'reactstrap';
import * as Icon from 'react-feather';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';
import AttachmentModalV2 from '../Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../ProjectModal/ViewFileComponentV2';
import api from '../../constants/api';


function AttachmentPortalsTab({
  dataForPicture,
  dataForAttachment,
  setAttachmentModal,
  id,
  attachmentModal,
  pictureData,
  attachmentData,
  // arb,
}) {
  AttachmentPortalsTab.propTypes = {
    dataForPicture: PropTypes.any,
    dataForAttachment: PropTypes.func,
    setAttachmentModal: PropTypes.func,
    id: PropTypes.any,
    attachmentModal: PropTypes.bool,
    pictureData: PropTypes.any,
    attachmentData: PropTypes.any,
    // arb: PropTypes.any,
  };
  const [roomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState('');
  const [update, setUpdate] = useState(false);
  const [pictureAttachmentModal, setPictureAttachmentModal] = useState(false);
  const [pictureAttachmentModalProperties, setPictureAttachmentModalProperties] = useState({
    altTagData: "",
    desc: "",
    recordType: "",
  });

  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };

  const selectedLanguage = getSelectedLanguageFromLocalStorage();

  const [arabic, setArabic] = useState([]);

  const arb = selectedLanguage === 'Arabic';

  //const eng = selectedLanguage === 'English';

  const getArabicCompanyName = () => {
    api
      .get('/employeeModule/getTranslationForEmployee')
      .then((res) => {
        setArabic(res.data.data);
      })
      .catch(() => {
        // Handle error if needed
      });
  };
  useEffect(() => {
    
    getArabicCompanyName();
    
  }, []);
  return (
    <div>
      <Row>
        <Form>
          <FormGroup>
            <Row>
              <Col md="6">
                <ComponentCard title= {arb ?'صورة':'Picture'}>
                  <Row>
                    <Col xs="12" md="3" className="mb-3">
                      <Button
                        className="shadow-none"
                        color="primary"
                        onClick={() => {
                          setRoomName('Picture');
                          setFileTypes(['JPG', 'PNG', 'GIF']);
                          dataForPicture();
                          setPictureAttachmentModalProperties({
                            altTagData: "PictureData",
                            desc: "Picture Data",
                            recordType: "Picture",
                          })
                          setAttachmentModal(true);
                        }}
                      >
                        <Icon.Image className="rounded-circle" width="20" />
                      </Button>
                    </Col>
                  </Row>
                  <AttachmentModalV2
                    moduleId={id}
                    attachmentModal={pictureAttachmentModal}
                    setAttachmentModal={setPictureAttachmentModal}
                    roomName={roomName}
                    fileTypes={fileTypes}
                    altTagData={pictureAttachmentModalProperties.altTagData}
                    desc={pictureAttachmentModalProperties.desc}
                    recordType={pictureAttachmentModalProperties.recordType}
                    mediaType={pictureData.modelType}
                    update={update}
                    setUpdate={setUpdate}
                    arb={arb}
                  />
                  <ViewFileComponentV2
                    moduleId={id}
                    roomName="Picture"
                    recordType="Picture"
                    update={update}
                    setUpdate={setUpdate}
                    arb={arb}
                    arabic={arabic}
                  />
                </ComponentCard>
              </Col>
              <Col md="6">
                <ComponentCard title={arb ?'تصريح العمل':'Work Permit'}>
                  <Row>
                    <Col xs="12" md="3" className="mb-3">
                      <Button
                        className="shadow-none"
                        color="primary"
                        onClick={() => {
                          setRoomName('Work Permit');
                          setFileTypes(['JPG', 'JPEG', 'PNG', 'GIF', 'PDF']);
                          dataForAttachment();
                          setPictureAttachmentModalProperties({
                            altTagData: "Work Permit",
                            desc: "workRelated Data",
                            recordType: "RelatedPicture",
                          })
                          setAttachmentModal(true);
                        }}
                      >
                        <Icon.File className="rounded-circle" width="20" />
                      </Button>
                    </Col>
                  </Row>
                  {/* <AttachmentModalV2
                    moduleId={id}
                    attachmentModal={attachmentModal}
                    setAttachmentModal={setAttachmentModal}
                    roomName={roomName}
                    fileTypes={fileTypes}
                    altTagData="Work Permit"
                    desc="workRelated Data"
                    recordType="RelatedPicture"
                    mediaType={attachmentData.modelType}
                    update={update}
                    setUpdate={setUpdate}
                  /> */}
                  <ViewFileComponentV2
                    moduleId={id}
                    roomName="Work Permit"
                    recordType="RelatedPicture"
                    update={update}
                    setUpdate={setUpdate}
                    arb={arb}
                  />
                </ComponentCard>
              </Col>
            </Row>
          </FormGroup>
        </Form>
      </Row>
      <Row>
        {/* Picture and Attachments Form */}
        <Form>
          <FormGroup>
            <Row>
              <Col md="6">
                <ComponentCard title= {arb ?'دبليو اس س':'WSQ'}>
                  <Row>
                    <Col xs="12" md="3" className="mb-3">
                      <Button
                        className="shadow-none"
                        color="primary"
                        onClick={() => {
                          setRoomName('WSQ');
                          setFileTypes(['JPG', 'JPEG', 'PNG', 'GIF', 'PDF']);
                          dataForAttachment();
                          setPictureAttachmentModalProperties({
                            altTagData: "WSQ",
                            desc: "WSQRelated Data",
                            recordType: "RelatedPicture",
                          })
                          setAttachmentModal(true);
                        }}
                      >
                        <Icon.File className="rounded-circle" width="20" />
                      </Button>
                    </Col>
                  </Row>
                  {/* <AttachmentModalV2
                    moduleId={id}
                    attachmentModal={attachmentModal}
                    setAttachmentModal={setAttachmentModal}
                    roomName={roomName}
                    fileTypes={fileTypes}
                    altTagData="WSQ"
                    desc="WSQRelated Data"
                    recordType="RelatedPicture"
                    mediaType={attachmentData.modelType}
                    update={update}
                    setUpdate={setUpdate}
                  /> */}
                  <ViewFileComponentV2
                    moduleId={id}
                    roomName="WSQ"
                    recordType="RelatedPicture"
                    update={update}
                    setUpdate={setUpdate}
                    arb={arb}
                  />
                </ComponentCard>
              </Col>
              <Col md="6">
                <ComponentCard title= {arb ?'علامة رقمية':'Digital Sign'}>
                  <Row>
                    <Col xs="12" md="3" className="mb-3">
                      <Button
                        className="shadow-none"
                        color="primary"
                        onClick={() => {
                          setRoomName('Digital Sign');
                          setFileTypes(['JPG', 'JPEG', 'PNG', 'GIF', 'PDF']);
                          dataForAttachment();
                          setPictureAttachmentModalProperties({
                            altTagData: "Digital Sign",
                            desc: "DigitalSign Related Data",
                            recordType: "RelatedPicture",
                          })
                          setAttachmentModal(true);
                        }}
                      >
                        <Icon.File className="rounded-circle" width="20" />
                      </Button>
                    </Col>
                  </Row>
                  {/* <AttachmentModalV2
                    moduleId={id}
                    attachmentModal={attachmentModal}
                    setAttachmentModal={setAttachmentModal}
                    roomName={roomName}
                    fileTypes={fileTypes}
                    altTagData="Digital Sign"
                    desc="DigitalSign Related Data"
                    recordType="RelatedPicture"
                    mediaType={attachmentData.modelType}
                    update={update}
                    setUpdate={setUpdate}
                  /> */}
                  <ViewFileComponentV2
                    moduleId={id}
                    roomName="Digital Sign"
                    recordType="RelatedPicture"
                    update={update}
                    setUpdate={setUpdate}
                    arb={arb}
                  />
                </ComponentCard>
              </Col>
            </Row>
          </FormGroup>
        </Form>
      </Row>

      <Row>
        {/* Picture and Attachments Form */}
        <Form>
          <FormGroup>
            <Row>
              <Col md="6">
                <ComponentCard title= {arb ?'سي إس أو سي':'CSOC'}>
                  <Row>
                    <Col xs="12" md="3" className="mb-3">
                      <Button
                        className="shadow-none"
                        color="primary"
                        onClick={() => {
                          setRoomName('CSO');
                          setFileTypes(['JPG', 'JPEG', 'PNG', 'GIF', 'PDF']);
                          dataForAttachment();
                          setPictureAttachmentModalProperties({
                            altTagData: "CSO",
                            desc: "CSO Related Data",
                            recordType: "RelatedPicture",
                          })
                          setAttachmentModal(true);
                        }}
                      >
                        <Icon.File className="rounded-circle" width="20" />
                      </Button>
                    </Col>
                  </Row>
                  {/* <AttachmentModalV2
                    moduleId={id}
                    attachmentModal={attachmentModal}
                    setAttachmentModal={setAttachmentModal}
                    roomName={roomName}
                    fileTypes={fileTypes}
                    altTagData="CSO"
                    desc="CSO Related Data"
                    recordType="RelatedPicture"
                    mediaType={attachmentData.modelType}
                    update={update}
                    setUpdate={setUpdate}
                  /> */}
                  <ViewFileComponentV2
                    moduleId={id}
                    roomName="CSO"
                    recordType="RelatedPicture"
                    update={update}
                    setUpdate={setUpdate}
                    arb={arb}
                  />
                </ComponentCard>
              </Col>
              <Col md="6">
                <ComponentCard title= {arb ?'ملفات اخرى':'Other Files'}>
                  <Row>
                    <Col xs="12" md="3" className="mb-3">
                      <Button
                        className="shadow-none"
                        color="primary"
                        onClick={() => {
                          setRoomName('Other Files');
                          setFileTypes(['JPG', 'JPEG', 'PNG', 'GIF', 'PDF']);
                          dataForAttachment();
                          setPictureAttachmentModalProperties({
                            altTagData: "Other Files",
                            desc: "Other Files Related Data",
                            recordType: "RelatedPicture",
                          })
                          setAttachmentModal(true);
                        }}
                      >
                        <Icon.File className="rounded-circle" width="20" />
                      </Button>
                    </Col>
                  </Row>
                  {/* <AttachmentModalV2
                    moduleId={id}
                    attachmentModal={attachmentModal}
                    setAttachmentModal={setAttachmentModal}
                    roomName={roomName}
                    fileTypes={fileTypes}
                    altTagData="Other Files"
                    desc="Other Files Related Data"
                    recordType="RelatedPicture"
                    mediaType={attachmentData.modelType}
                    update={update}
                    setUpdate={setUpdate}
                  /> */}
                  <ViewFileComponentV2
                    moduleId={id}
                    roomName="Other Files"
                    recordType="RelatedPicture"
                    update={update}
                    setUpdate={setUpdate}
                    arb={arb}
                  />
                </ComponentCard>
              </Col>
            </Row>
          </FormGroup>
        </Form>
      </Row>
      <Row>
        {/* Picture and Attachments Form */}
        <Form>
          <FormGroup>
            <ComponentCard title= {arb ?'السكن / الإقامة':'Housing / Accommodation'}>
              <Row>
                <Col xs="12" md="3" className="mb-3">
                  <Button
                    className="shadow-none"
                    color="primary"
                    onClick={() => {
                      setRoomName('Housing');
                      setFileTypes(['JPG', 'JPEG', 'PNG', 'GIF', 'PDF']);
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
                roomName={roomName}
                fileTypes={fileTypes}
                altTagData="Housing"
                desc="Housing Related Data"
                recordType="RelatedPicture"
                mediaType={attachmentData.modelType}
                update={update}
                setUpdate={setUpdate}
                arb={arb}
              />
              <ViewFileComponentV2
                moduleId={id}
                roomName="Housing"
                recordType="RelatedPicture"
                update={update}
                setUpdate={setUpdate}
                arb={arb}
              />
            </ComponentCard>
          </FormGroup>
        </Form>
      </Row>
    </div>
  );
}

export default AttachmentPortalsTab;

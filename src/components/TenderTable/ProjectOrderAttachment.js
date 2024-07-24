import React,{useState} from 'react';
import {Row,Col,Button} from 'reactstrap';
import * as Icon from 'react-feather';
import {  useParams } from 'react-router-dom';
import AttachmentModalV2 from '../Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../ProjectModal/ViewFileComponentV2';

export default function OrderAttachment() {
    OrderAttachment.propTypes = {
    }
    const { insertedDataId } = useParams();
    const [update, setUpdate] = useState(false);
    const [attachmentModal, setAttachmentModal] = useState(false);
    const [RoomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState('');
  //  AttachmentModal
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });

  //attachment for upload file
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
  };
  return (
    <div> <Row>
    <Col xs="12" md="3" className="mb-3">
      <Button
        className="shadow-none"
        color="primary"
        onClick={() => {
          setRoomName('ProjectSalesOrder');
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
    moduleId={insertedDataId}
    attachmentModal={attachmentModal}
    setAttachmentModal={setAttachmentModal}
    roomName={RoomName}
    fileTypes={fileTypes}
    altTagData="OrderRelated Data"
    desc="OrderRelated Data"
    recordType="RelatedPicture"
    mediaType={attachmentData.modelType}
    update={update}
    setUpdate={setUpdate}
  />
  <ViewFileComponentV2 moduleId={insertedDataId} roomName="ProjectSalesOrder" recordType="RelatedPicture" update={update}
    setUpdate={setUpdate} /></div>
  )
}

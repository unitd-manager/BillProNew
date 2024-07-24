import React, { useState,useEffect } from 'react';
import {
    Row,
    Col,
    Form,
    FormGroup,
    TabContent, TabPane, Button
} from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import * as Icon from 'react-feather';
import { ToastContainer } from 'react-toastify';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
//import JournalButton from '../../components/Journal/JournalButton';
import ComponentCard from '../../components/ComponentCard';
import Tab from '../../components/project/Tab';
import JournalEditDetails from '../../components/Journal/JournalEditDetails';
import message from '../../components/Message';
import ApiButton from '../../components/ApiButton';

const JournalEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('1');
    const [update, setUpdate] = useState(false);
    const [attachmentModal, setAttachmentModal] = useState(false);
    const [RoomName, setRoomName] = useState('');
    const [fileTypes, setFileTypes] = useState('');
    const [attachmentData, setDataForAttachment] = useState({
        modelType: '',
    });
    const [journalData, setJournalData] = useState('');

    // Function to toggle tabs
    const toggle = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };
    const tabs = [
        { id: '1', name: 'Attachment' },
    ];
    // Attachment
    const dataForAttachment = () => {
        setDataForAttachment({
            modelType: 'attachment',
        });
    };

      //setting data in bookingDetails


const handleInputs = (e, journalMasterId, journalId) => {

    const updatedJournalData = [...journalData];

    const indexToUpdate = updatedJournalData.findIndex(
        (item) => item.journal_master_id === journalMasterId && item.journal_id === journalId
    );

    console.log("indexToUpdate", indexToUpdate);

    if (indexToUpdate !== -1) {
        updatedJournalData[indexToUpdate] = {
            ...updatedJournalData[indexToUpdate],
            [e.target.name]: e.target.value,
        };

        setJournalData(updatedJournalData);
        console.log(updatedJournalData);
    }
};

const backToList = () => {
  navigate('/Journal');
};
  //Logic for edit data in db
  const editJournalData = () => {
    journalData.modification_date = creationdatetime;
      api
        .post('/journal/editJournalById', journalData)
        .then(() => {
          message('Record editted successfully', 'success');
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } 

// Get Journal data By Journal Id
  const getJournalDataById = () => {
    api
      .post('/journal/getJournalById', { journal_master_id: id })
      .then((res) => {
        setJournalData(res.data.data);
        console.log("multi data",res.data.data)
      })
  };

  const [journalMasterData, setJournalMasterData] = useState({
    entry_date: '',
    voucher_type: '',
    narration_main: '',
    narrationarb_main: '',
    ledger_authorized: '',
    creation_date: '',
    modification_date: ''
  });

// Get Journal data By Journal Id
const getJournalMasterDataById = () => {
    api
      .post('/journal/getJournalMasterById', { journal_master_id: id })
      .then((res) => {
        console.log("getJournalMasterById", res.data.data);
        setJournalMasterData(res.data.data[0]);
      });
  };

const handleInputsMaster = (e) => {
  console.log("journalMasterData", { ...journalMasterData, [e.target.name]: e.target.value });
  setJournalMasterData({ ...journalMasterData, [e.target.name]: e.target.value });
};

  //Logic for edit data in db
const editJournalMasterData = () => {
journalMasterData.modification_date = creationdatetime;
  api
    .post('/journal/editJournalMaster', journalMasterData)
    .then(() => {
      message('Record editted successfully', 'success');
    })
    .catch(() => {
      message('Unable to edit record.', 'error');
    });
} 

  useEffect(() => {
    getJournalDataById();
    getJournalMasterDataById()
  }, [id]);
    return (
        <>
            <BreadCrumbs heading='' />
            {/* <JournalButton navigate={navigate} editJournalData={editJournalData} editJournalMasterData={editJournalMasterData} /> */}
            <ApiButton
              editData={editJournalData}
              navigate={navigate}
              applyChanges={editJournalData}
              editJournalMasterData={editJournalMasterData}
              //deleteData={deleteBookingData}
              backToList={backToList}
              module="JournalEdit"
            ></ApiButton>
            <JournalEditDetails journalData={journalData} handleInputs={handleInputs} journalMasterData={journalMasterData} handleInputsMaster={handleInputsMaster} />
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
                                                setRoomName('Journal');
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
                                    roomName={RoomName}
                                    fileTypes={fileTypes}
                                    altTagData="JournalRequestRelated Data"
                                    desc="JournalRequestRelated Data"
                                    recordType="RelatedPicture"
                                    mediaType={attachmentData.modelType}
                                    update={update}
                                    setUpdate={setUpdate}
                                />
                                <ViewFileComponentV2 moduleId={id} roomName="Journal" recordType="RelatedPicture" update={update}
                                    setUpdate={setUpdate} />
                            </FormGroup>
                        </Form>
                    </TabPane>
                </TabContent>
            </ComponentCard>

        </>
    );
};
export default JournalEdit

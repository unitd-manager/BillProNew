import React, { useState } from 'react';
import { FormGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import { FileUploader } from 'react-drag-drop-files';
import api from '../../constants/api';
import message from '../Message';

const AttachmentModalV2 = ({
  attachmentModal,
  setAttachmentModal,
  moduleId,
  roomName,
  fileTypes,
  altTagData,
  desc,
  update,
  setUpdate,
  arb
}) => {
  AttachmentModalV2.propTypes = {
    attachmentModal: PropTypes.bool,
    setAttachmentModal: PropTypes.func,
    moduleId: PropTypes.string,
    roomName: PropTypes.string,
    altTagData: PropTypes.string,
    desc: PropTypes.string,
    fileTypes: PropTypes.any,
    setUpdate: PropTypes.func,
    update: PropTypes.bool,
    arb: PropTypes.any,
  };

  const [file, setFile] = useState([]);
  const [handleValue, setHandleValue] = useState();
  const [uploaded, setUploaded] = useState(null);

  const handleChange = (fiels) => {
    const arrayOfObj = Object.entries(fiels).map((e) => e[1]);
    setFile(fiels);
    setHandleValue(arrayOfObj);
  };

  const uploadFile = () => {
    if (file) {
      const data = new FormData();
      const arrayOfObj = Object.entries(file).map((e) => e[1]);
      arrayOfObj.forEach((ele) => {
        data.append(`files`, ele);
      });
      data.append('record_id', moduleId);
      data.append('room_name', roomName);
      data.append('alt_tag_data', altTagData);
      data.append('description', desc);

      api
        .post('/file/uploadFiles', data, {
          onUploadProgress: (filedata) => {
            setUploaded(Math.round((filedata.loaded / filedata.total) * 100));
          },
        })
        .then(() => {
          message('Files Uploaded Successfully', 'success')
          setAttachmentModal(false);
          setUpdate(!update)
        })
        .catch(() => {
          setAttachmentModal(false);
          message('Unable to upload File', 'error');
          setUpdate(!update)
        });
    } else {
      message('No files selected', 'info');
    }
  };

  return (
    <div>
      <Modal isOpen={attachmentModal}>
        <ModalHeader>{arb ?'تحميل الوسائط':'Upload Media'}</ModalHeader>
        <ModalBody>
          <FormGroup>
            <FileUploader multiple handleChange={handleChange} name="file" types={fileTypes} />

            {handleValue ? (
              handleValue.map((e) => (
                <div key={e.name}>
                  <span> {arb ?'اسم:':'Name:'} {e.name} </span>
                </div>
              ))
            ) : (
              <span>{arb ?'لم يتم اختيار اي ملف':'No file selected'}</span>
            )}
          </FormGroup>
          {uploaded && (
            <div className="progress mt-2">
              <div
                className="progress-bar h-4"
                role="progressbar"
                aria-valuenow={uploaded}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: `${uploaded}%` }}
              >
                {`${uploaded}% uploaded`}
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="shadow-none"
            onClick={() => {
              uploadFile();
            }}
          >
            {arb ?'رفع':'Upload'}
          </Button>
          <Button
            color="secondary"
            className="shadow-none"
            onClick={() => {
              setAttachmentModal();
            }}
          >
            {arb ?'يلغي':'Cancel'}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AttachmentModalV2;

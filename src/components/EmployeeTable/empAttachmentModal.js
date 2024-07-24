import React from 'react';
import { FormGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import { FileUploader } from 'react-drag-drop-files';
import api from '../../constants/api';
import message from '../Message';

const EmpAttachmentModal = ({ empAttachmentModal, setEmpAttachmentModal, employeeId }) => {
  EmpAttachmentModal.propTypes = {
    empAttachmentModal: PropTypes.bool,
    setEmpAttachmentModal: PropTypes.func,
    employeeId: PropTypes.string,
  };
  const fileTypes = ['JPG','JPEG','PNG', 'GIF', 'PDF'];

  const [file, setFile] = React.useState(null);

  const handleChange = (fiels) => {
    setFile(fiels);
  };

  const uploadFile = () => {
    if (file) {
      // getFiles();
      const data = new FormData();
      data.append('file', file);
      data.append('record_id', employeeId); //opportunity_id
      data.append('room_name', 'employee');
      data.append('alt_tag_data', 'picture');
      data.append('description', 'Image for employee');
      api
        .post('/file/uploadFile', data, { 'Content-Type': 'multipart/form-data' })
        .then(() => {
          setEmpAttachmentModal(false);
          message('Files Uploaded Successfully', 'success');

          setTimeout(() => {
            window.location.reload();
          }, 400);
        })
        .catch(() => {
          setEmpAttachmentModal(false);
          message('Unable to upload File', 'error');
          setTimeout(() => {
            window.location.reload();
          }, 400);
        });
    } else {
      message('No files selected', 'info');
    }
  };

  return (
    <div>
      <Modal isOpen={empAttachmentModal}>
        <ModalHeader>Upload Media</ModalHeader>
        <ModalBody>
          <FormGroup>
            <FileUploader
              multiple={false}
              handleChange={handleChange}
              name="file"
              types={fileTypes}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              uploadFile();
            }}
          >
            Upload
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              setEmpAttachmentModal(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default EmpAttachmentModal;

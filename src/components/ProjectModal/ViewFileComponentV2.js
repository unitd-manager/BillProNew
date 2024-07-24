import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import * as Icon from 'react-feather';
import message from '../Message';
import api from '../../constants/api';

function ViewFileComponentV2({ moduleId, roomName, update, setUpdate, arb }) {
  ViewFileComponentV2.propTypes = {
    moduleId: PropTypes.string,
    roomName: PropTypes.string,
    update: PropTypes.bool,
    setUpdate: PropTypes.func,
    arb: PropTypes.any
  };

  const tableStyle = {};
  const [getFile, setGetFile] = useState(null);

  const getFiles = () => {
    api.post('/file/getListOfFiles', { record_id: moduleId, room_name: roomName }).then((res) => {
      setGetFile(res.data);
    });
  };

  const deleteFile = (fileId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .post('/file/deleteFile', { media_id: fileId })
          .then((res) => {
            console.log(res);
            Swal.fire('Deleted!', 'Media has been deleted.', 'success');
            setUpdate(!update);
          })
          .catch(() => {
            message('Unable to Delete Media', 'info');
          });
      }
    });
  };

  useEffect(() => {
    getFiles();
  }, [update]);

  useEffect(() => {
    getFiles();
  }, []);

  const getHostnameUrl = () => {
    const { hostname } = window.location;
    if (hostname === 'erpardemo.unitdtechnologies.com') {
      return 'https://erpardemo.unitdtechnologies.com/storage/uploads/';
    }
    if (hostname === 'erpclient.unitdtechnologies.com') {
      return 'https://erpclient.unitdtechnologies.com/storage/uploads/';
    }
    if (hostname === 'localhost.com') {
      return 'http://localhost.com/storage/uploads/';
    }
    return '';
  };

  return (
    <>
      <table style={tableStyle}>
        <thead>
          <tr style={tableStyle}>
            <th style={tableStyle}>{arb ? 'اسم الملف' : 'File Name'}</th>
            <th width="5%"></th>
          </tr>
        </thead>
        <tbody>
          {getFile ? (
            getFile.map((res) => (
              <tr key={res.media_id}>
                <td style={tableStyle}>
                  <a
                    href={`${getHostnameUrl()}${res.name}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {res.name}
                  </a>
                </td>
                <td style={tableStyle}>
                  <button
                    type="button"
                    className="btn shadow-none"
                    onClick={() => {
                      deleteFile(res.media_id);
                    }}
                  >
                    <Icon.Trash2 />{' '}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>
                <p>{arb ? 'لم يتم تحميل أي ملفات حتى الآن' : 'No files uploaded yet'}</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default ViewFileComponentV2;
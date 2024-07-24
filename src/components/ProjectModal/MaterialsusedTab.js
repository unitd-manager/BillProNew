import React, { useEffect, useState } from 'react';
import { CardTitle, Row, Col, Form, FormGroup, Label, Button } from 'reactstrap';
import * as Icon from 'react-feather';
import PropTypes from 'prop-types';
import AddMaterialsUsed from './AddMaterialsUsed';
import api from '../../constants/api';
import EditMaterialused from './EditMaterialused';
import PdfMaterialUsed from '../PDF/PdfMaterialUsed';
import ReturnStockModal from './ReturnStockModal';
import ReturnStockLogsModal from './ReturnStockLogsModal';

const MaterialsusedTab = ({ projectId }) => {
  MaterialsusedTab.propTypes = { 
    projectId: PropTypes.any,
  };

  const [addMaterialsUsed, setAddMaterialsUsed] = useState(false);
  const [editMaterialsUsed, setEditMaterialsUsed] = useState(false);
  const [editMaterialsUsedData, setEditMaterialsUsedData] = useState(null);
  const [materialusedportal, setMaterialusedportal] = useState();
  const [returnStockModal, setReturnStockModal] = useState(false);
  const [returnItem, setReturnItem] = useState({});
  const [returnItemLogsModal, setReturnItemLogsModal] = useState(false);

  const getTableData = () => {
 // Get Material Used Portal Data
 api
 .post('/projecttabmaterialusedportal/TabMaterialUsedPortal', { project_id: projectId })
 .then((res) => {
   setMaterialusedportal(res.data.data);
 })

 }  
 
 useEffect(() => {
  getTableData()
  }, [projectId]);

  return (
    <>
      <AddMaterialsUsed
        addMaterialsUsed={addMaterialsUsed}
        setAddMaterialsUsed={setAddMaterialsUsed}
      />
      <EditMaterialused
        editMaterialsUsed={editMaterialsUsed}
        setEditMaterialsUsed={setEditMaterialsUsed}
        FetchMaterialsUsed={editMaterialsUsedData}
        getTableData= {getTableData}
      />
      {returnStockModal && (
        <ReturnStockModal
          returnStockModal={returnStockModal}
          setReturnStockModal={setReturnStockModal}
          returnItem={returnItem}
        />
      )}
       {returnItemLogsModal && (
        <ReturnStockLogsModal
        returnItemLogsModal={returnItemLogsModal}
        setReturnItemLogsModal={setReturnItemLogsModal}
        returnItem={returnItem}
        />
      )}
      <Row className="mb-4">
        <Col>
          <PdfMaterialUsed
            materialusedportal={materialusedportal}
            addMaterialsUsed={addMaterialsUsed}
            id={projectId}
          ></PdfMaterialUsed>
        </Col>
        <Col md="3">
          <Button color="primary" className="shadow-none" onClick={() => setAddMaterialsUsed(true)}>
            Add materials used
          </Button>
        </Col>
      </Row>
      <Row>
        <CardTitle tag="h4" className="border-bottom bg-secondary p-2 mb-0 text-white">
          {' '}
          Materials used{' '}
        </CardTitle>
      </Row>

      <Form className="mt-4">
        <Row className="border-bottom mb-3">
          <Col>
            <FormGroup>
              <Label>Title</Label>{' '}
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>UoM</Label>{' '}
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Quantity</Label>{' '}
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Remarks</Label>{' '}
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Status</Label>{' '}
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Action</Label>{' '}
            </FormGroup>
          </Col>
        </Row>
      </Form>
      {materialusedportal &&
        materialusedportal.map((res) => {
          return (
            <Row key={res.project_materials_id}>
              <Col>
                <FormGroup>{res.title}</FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <span>{res.unit}</span>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>{res.quantity}</Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>{res.description}</Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>{res.status}</Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Row>
                    <Col md="2">
                      <Label>
                        <div className="anchor">
                          <span
                            onClick={() => {
                              setEditMaterialsUsed(true);
                              setEditMaterialsUsedData(res);
                            }}
                          >
                            <Icon.Edit />
                          </span>
                        </div>
                      </Label>
                    </Col>
                    <Col md="2">
                      <Label>
                        <div className="anchor">
                          {' '}
                          <span onClick={()=>{
                             setReturnItem(res);
                            setReturnItemLogsModal(true);
                          }}>
                            <Icon.Eye />
                          </span>{' '}
                        </div>
                      </Label>
                    </Col>
                    <Col md="8">
                      <Label>
                        <div className="anchor">
                          <span
                            onClick={() => {
                              setReturnItem(res);
                              setReturnStockModal(true);
                            }}
                          >
                            Return To Stock
                          </span>
                        </div>
                      </Label>
                    </Col>
                    {/* <Col md="8">
                      <Label>
                        <div className="anchor">
                          <span>View</span>
                        </div>
                      </Label>
                    </Col> */}
                  </Row>
                </FormGroup>
              </Col>
            </Row>
          );
        })}
    </>
  );
};

export default MaterialsusedTab;

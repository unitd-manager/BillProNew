import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';
import creationdatetime from '../../constants/creationdatetime';

const VehicleDetails = () => {
  // All state variables
  const [vehicledetails, setVehicleDetails] = useState({
    vehicle_no: '',
  });

  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();

  //All Functions/Methods

  //Setting Data in Vehicle Details
  const handleInputs = (e) => {
    setVehicleDetails({ ...vehicledetails, [e.target.name]: e.target.value });
  };

  //Api call for Insert Vehicle Data
  const insertVehicleData = () => {
    vehicledetails.creation_date = creationdatetime;
    if (vehicledetails.vehicle_no !== '') {
      api
        .post('/vehicle/insertVehicle', vehicledetails)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          message('Staff Details inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/VehicleEdit/${insertedDataId}`);
          }, 300);
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };

  useEffect(() => {}, [id]);

  return (
    <div>
      <BreadCrumbs />
      <ToastContainer />
      <Row>
        <Col md="6" xs="12">
          <ComponentCard title="key Details">
            <Form>
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>
                      Vehicle No<span className="required"> *</span>
                    </Label>
                    <Input
                      type="text"
                      onChange={handleInputs}
                      value={vehicledetails && vehicledetails.vehicle_no}
                      name="vehicle_no"
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button
                      color="primary"
                      type="button"
                      className="btn mr-2 shadow-none"
                      onClick={() => {
                        insertVehicleData();
                      }}
                    >
                      Save & Continue
                    </Button>
                    <Button
                      type="submit"
                      className="btn btn-dark shadow-none"
                      onClick={(e) => {
                        if (window.confirm('Are you sure you want to cancel? ')) {
                          navigate('/Vehicle');
                        } else {
                          e.preventDefault();
                        }
                      }}
                    >
                      Go to List
                    </Button>
                  </div>
                </Row>
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
};

export default VehicleDetails;

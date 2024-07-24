import React from 'react';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import ComponentCard from '../ComponentCard';

export default function ContentMoreDetails({
  contentDetails,
  handleInputs,
  section,
  valuelist,
  subcategoryLinked,
  subgroup,
  getCategory,
}) {
  ContentMoreDetails.propTypes = {
    contentDetails: PropTypes.object,
    handleInputs: PropTypes.any,
    section: PropTypes.array,
    valuelist: PropTypes.object,
    subcategoryLinked: PropTypes.func,
    subgroup: PropTypes.any,
    getCategory: PropTypes.func,
  };
  return (
    <div>
      <ComponentCard title="Content Details" creationModificationDate={contentDetails}>
        {' '}
        <ToastContainer></ToastContainer>
        <Row>
          <Col md="4">
            <FormGroup>
              <Label> Title </Label>
              <span className="required"> *</span>
              <Input
                type="text"
                onChange={handleInputs}
                defaultValue={contentDetails && contentDetails.title}
                name="title"
              />
            </FormGroup>
          </Col>

          <Col md="4">
            <Label>Section</Label>
            <Input
              type="select"
              name="section_id"
              onChange={(e) => {
                getCategory(e.target.value);
                handleInputs(e);
              }}
              value={contentDetails && contentDetails.section_id}
            >
              <option defaultValue="selected">Please Select</option>
              {section &&
                section.map((ele) => {
                  return (
                    <option key={ele.section_id} value={ele.section_id}>
                      {ele.section_title}
                    </option>
                  );
                })}
            </Input>
          </Col>
          <Col md="4">
            <Label>Category </Label>
            <Input
              type="select"
              name="category_id"
              onChange={handleInputs}
              value={contentDetails && contentDetails.category_id}
            >
              <option defaultValue="selected">Please Select</option>
              {subgroup &&
                subgroup.map((ele) => {
                  return (
                    <option key={ele.category_id} value={ele.category_id}>
                      {ele.category_title}
                    </option>
                  );
                })}
            </Input>
          </Col>
        </Row>
        <Row>
          {/* subcategory title from sub Category table */}
          <Col md="4">
            <FormGroup>
              <Label>Sub Category</Label>
              <Input
                type="select"
                name="sub_category_id"
                value={contentDetails && contentDetails.sub_category_id}
                onChange={handleInputs}
              >
                <option defaultValue="selected">Please Select</option>
                {subcategoryLinked &&
                  subcategoryLinked.map((ele) => {
                    return (
                      <option key={ele.sub_category_id} value={ele.sub_category_id}>
                        {ele.sub_category_title}
                      </option>
                    );
                  })}
              </Input>
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label>Content Type</Label>
              <Input
                type="select"
                onChange={handleInputs}
                value={contentDetails && contentDetails.content_type}
                name="content_type"
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
        </Row>
      </ComponentCard>
      {/* Content Details Form */}
      <ComponentCard title="Content details">
        <Row>
          <Col md="4">
            <FormGroup>
              <Label> Show Title</Label>
              <br></br>
              <Label> Yes </Label>
              <Input
                name="show_title"
                value="1"
                type="radio"
                defaultChecked={contentDetails && contentDetails.show_title === 1 && true}
                onChange={handleInputs}
              />
              <br />
              <Label> No </Label>
              <Input
                name="show_title"
                value="0"
                type="radio"
                defaultChecked={contentDetails && contentDetails.show_title === 0 && true}
                onChange={handleInputs}
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label>Published</Label>
              <br></br>
              <Label>Yes</Label>
              <Input
                name="published"
                value="1"
                type="radio"
                defaultChecked={contentDetails && contentDetails.published === 1 && true}
                onChange={handleInputs}
              />
              <br />
              <Label>No</Label>
              <Input
                name="published"
                value="0"
                type="radio"
                defaultChecked={contentDetails && contentDetails.published === 0 && true}
                onChange={handleInputs}
              />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label> Content Date </Label>
              <Input
                type="date"
                onChange={handleInputs}
                defaultValue={contentDetails && contentDetails.content_date}
                name="content_date"
              />
            </FormGroup>
          </Col>
        </Row>
      </ComponentCard>
    </div>
  );
}

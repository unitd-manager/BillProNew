import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

export default function CategoryDetailComp({ categoryDetails, handleInputs, section, valuelist, genLabel,arabic, formSubmitted, arb }) {
  CategoryDetailComp.propTypes = {
    categoryDetails: PropTypes.object,
    handleInputs: PropTypes.func,
    section: PropTypes.array,
    valuelist: PropTypes.array,
    genLabel: PropTypes.any,
    arabic: PropTypes.any,
    formSubmitted: PropTypes.any,
    arb: PropTypes.any,
  };
  return (
    <>
      <Form>
        <FormGroup>
          <ComponentCard title={arb ? 'تفاصيل الفئة': 'Category Details'} creationModificationDate={categoryDetails}>
            <Row>
            <Col md="4">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdCategory.CategoryTitle')?.[genLabel]}
              </Label><span className='required'>*</span>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            categoryDetails && categoryDetails.category_title_arb ? categoryDetails.category_title_arb :
                            (categoryDetails && categoryDetails.category_title_arb !== null ? '' : categoryDetails && categoryDetails.category_title)
                          )
                        : (categoryDetails && categoryDetails.category_title)
                    }
                    name={arb ? 'category_title_arb' : 'category_title'}
                    className={`form-control ${
                    formSubmitted && ((arb && categoryDetails.category_title_arb.trim() === '') ||(!arb && categoryDetails.category_title.trim() === '')) ? 'highlight' : ''
                  }`}
                />
                {formSubmitted && ((arb && categoryDetails.category_title_arb.trim() === '') || (!arb && categoryDetails.category_title.trim() === '')) && (
                  <div className="error-message">Please Enter</div>
              )}
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdCategory.Section')?.[genLabel]}
              </Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={categoryDetails && categoryDetails.section_id}
                    name="section_id"
                  >
                    <option defaultValue="selected">Please Select</option>
                    {section &&
                      section.map((e) => {
                        return (
                          <option key={e.section_id} value={e.section_id}>
                            {' '}
                            {arb && e.section_title_arb ?e.section_title_arb : e.section_title}
                            {' '}
                          </option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdCategory.CategoryType')?.[genLabel]}
              </Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            categoryDetails && categoryDetails.category_type_arb ? categoryDetails.category_type_arb :
                            (categoryDetails && categoryDetails.category_type_arb !== null ? '' : categoryDetails && categoryDetails.category_type)
                          )
                        : (categoryDetails && categoryDetails.category_type)
                    }
                    name={arb ? 'category_type_arb' : 'category_type'}
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
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdCategory.InternalLink')?.[genLabel]}
              </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            categoryDetails && categoryDetails.internal_link_arb ? categoryDetails.internal_link_arb :
                            (categoryDetails && categoryDetails.internal_link_arb !== null ? '' : categoryDetails && categoryDetails.internal_link)
                          )
                        : (categoryDetails && categoryDetails.internal_link)
                    }
                    name={arb ? 'internal_link_arb' : 'internal_link'}
                  ></Input>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdCategory.InternalLink')?.[genLabel]}
              </Label>
              <br></br>
                  {/* <Input
                    type="radio"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            categoryDetails && categoryDetails.published_arb ? categoryDetails.published_arb :
                            (categoryDetails && categoryDetails.published_arb !== null ? '' : categoryDetails && categoryDetails.published)
                          )
                        : (categoryDetails && categoryDetails.published)
                    }
                    name={arb ? 'published_arb' : 'published'}></Input> */}
                  
                  <Input
                    name="published"
                    value="1"
                    type="radio"
                    defaultChecked={categoryDetails && categoryDetails.published === 1 && true}
                    onChange={handleInputs}
                  />
                  <Label> Yes </Label>
                  <Input
                    name="published"
                    value="0"
                    type="radio"
                    defaultChecked={categoryDetails && categoryDetails.published === 0 && true}
                    onChange={handleInputs}
                  />
                  <Label>No</Label>
                </FormGroup>
              </Col>
            </Row>
          </ComponentCard>
          <ComponentCard title={arb ? 'بيانات تعريف الصفحة': 'Page Meta Data'} >
            <Row>
              <Col md="6">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdCategory.PageTitle')?.[genLabel]}
              </Label>
              <br></br>
                  <Input
                    type="textarea"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            categoryDetails && categoryDetails.meta_title_arb ? categoryDetails.meta_title_arb :
                            (categoryDetails && categoryDetails.meta_title_arb !== null ? '' : categoryDetails && categoryDetails.meta_title)
                          )
                        : (categoryDetails && categoryDetails.meta_title)
                    }
                    name={arb ? 'meta_title_arb' : 'meta_title'}></Input>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdCategory.PageDescription')?.[genLabel]}
              </Label>
              <br></br>
                  <Input
                    type="textarea"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            categoryDetails && categoryDetails.meta_description_arb ? categoryDetails.meta_description_arb :
                            (categoryDetails && categoryDetails.meta_description_arb !== null ? '' : categoryDetails && categoryDetails.meta_description)
                          )
                        : (categoryDetails && categoryDetails.meta_description)
                    }
                    name={arb ? 'meta_description_arb' : 'meta_description'}></Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdCategory.PageKeywords')?.[genLabel]}
              </Label>
              <br></br>
                  <Input
                    type="textarea"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            categoryDetails && categoryDetails.meta_keyword_arb ? categoryDetails.meta_keyword_arb :
                            (categoryDetails && categoryDetails.meta_keyword_arb !== null ? '' : categoryDetails && categoryDetails.meta_keyword)
                          )
                        : (categoryDetails && categoryDetails.meta_keyword)
                    }
                    name={arb ? 'meta_keyword_arb' : 'meta_keyword'}></Input>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdCategory.SEOTitle')?.[genLabel]}
              </Label>
              <br></br>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            categoryDetails && categoryDetails.seo_title_arb ? categoryDetails.seo_title_arb :
                            (categoryDetails && categoryDetails.seo_title_arb !== null ? '' : categoryDetails && categoryDetails.seo_title)
                          )
                        : (categoryDetails && categoryDetails.seo_title)
                    }
                    name={arb ? 'seo_title_arb' : 'seo_title'}></Input>
                </FormGroup>
              </Col>
            </Row>
          </ComponentCard>
          <Row></Row>
        </FormGroup>
      </Form>
    </>
  );
}

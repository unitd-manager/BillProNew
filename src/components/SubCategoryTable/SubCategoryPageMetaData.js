import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

export default function SubCategoryPageMetaData({ subcategoryeditdetails, handleInputs, arb, arabic}) {
  SubCategoryPageMetaData.propTypes = {
    subcategoryeditdetails: PropTypes.object,
    handleInputs: PropTypes.func,
    arb: PropTypes.any,
    arabic: PropTypes.any,
  };
  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }
  return (
    <>
      <Form>
        <FormGroup>
          {/* Page Meta Data Details */}
          <ComponentCard title={arb ? 'بيانات تعريف الصفحة': 'Page Meta Data'}>
            <Row>
              <Col md="4">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdSubCategory.PageTitle')?.[genLabel]}
              </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            subcategoryeditdetails && subcategoryeditdetails.meta_title_arb ? subcategoryeditdetails.meta_title_arb :
                            (subcategoryeditdetails && subcategoryeditdetails.meta_title_arb !== null ? '' : subcategoryeditdetails && subcategoryeditdetails.meta_title)
                          )
                        : (subcategoryeditdetails && subcategoryeditdetails.meta_title)
                    }
                    name={arb ? 'meta_title_arb' : 'meta_title'}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdSubCategory.PageDescription')?.[genLabel]}
              </Label>
                  <Input
                    type="textarea"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            subcategoryeditdetails && subcategoryeditdetails.meta_description_arb ? subcategoryeditdetails.meta_description_arb :
                            (subcategoryeditdetails && subcategoryeditdetails.meta_description_arb !== null ? '' : subcategoryeditdetails && subcategoryeditdetails.meta_description)
                          )
                        : (subcategoryeditdetails && subcategoryeditdetails.meta_description)
                    }
                    name={arb ? 'meta_description_arb' : 'meta_description'}
                  ></Input>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdSubCategory.PageKeywords')?.[genLabel]}
              </Label>
                  <Input
                    type="textarea"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            subcategoryeditdetails && subcategoryeditdetails.meta_keyword_arb ? subcategoryeditdetails.meta_keyword_arb :
                            (subcategoryeditdetails && subcategoryeditdetails.meta_keyword_arb !== null ? '' : subcategoryeditdetails && subcategoryeditdetails.meta_keyword)
                          )
                        : (subcategoryeditdetails && subcategoryeditdetails.meta_keyword)
                    }
                    name={arb ? 'meta_keyword_arb' : 'meta_keyword'}
                  ></Input>
                </FormGroup>
              </Col>
            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>
      <Form>
        <FormGroup>
          <Row>
            <Col md="4">
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdSubCategory.SEOTitle')?.[genLabel]}
              </Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={
                  arb
                    ? (
                        subcategoryeditdetails && subcategoryeditdetails.seo_title_arb ? subcategoryeditdetails.seo_title_arb :
                        (subcategoryeditdetails && subcategoryeditdetails.seo_title_arb !== null ? '' : subcategoryeditdetails && subcategoryeditdetails.seo_title)
                      )
                    : (subcategoryeditdetails && subcategoryeditdetails.seo_title)
                }
                name={arb ? 'seo_title_arb' : 'seo_title'}
              />
            </Col>
          </Row>
        </FormGroup>
      </Form>
    </>
  );
}

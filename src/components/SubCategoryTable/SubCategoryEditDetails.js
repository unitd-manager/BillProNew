import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

export default function SubCategoryEditDetails({ subcategoryeditdetails, handleInputs, category, formSubmitted, arb, arabic, subcategorytypedetails}) {
  SubCategoryEditDetails.propTypes = {
    subcategoryeditdetails: PropTypes.object,
    handleInputs: PropTypes.func,
    category: PropTypes.array,
    formSubmitted: PropTypes.any,
    arb: PropTypes.any,
    arabic: PropTypes.any,
    subcategorytypedetails: PropTypes.any
  };
  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }

  return (
    <Form>
      <FormGroup>
        {/* Sub Category  Details */}
        <ComponentCard
          title={arb ? 'تفاصيل الفئة الفرعية': 'SubCategory Details'}
          creationModificationDate={subcategoryeditdetails}
        >
          <Row>
            <Col md="3">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdSubCategory.Title')?.[genLabel]}
              </Label><span className='required'>*</span>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            subcategoryeditdetails && subcategoryeditdetails.sub_category_title_arb ? subcategoryeditdetails.sub_category_title_arb :
                            (subcategoryeditdetails && subcategoryeditdetails.sub_category_title_arb !== null ? '' : subcategoryeditdetails && subcategoryeditdetails.sub_category_title)
                          )
                        : (subcategoryeditdetails && subcategoryeditdetails.sub_category_title)
                    }
                    name={arb ? 'sub_category_title_arb' : 'sub_category_title'}
                    className={`form-control ${
                      formSubmitted && ((arb && subcategoryeditdetails.sub_category_title_arb.trim() === '') ||(!arb && subcategoryeditdetails.sub_category_title.trim() === '')) ? 'highlight' : ''
                  }`}
                />
                {formSubmitted && ((arb && subcategoryeditdetails.sub_category_title_arb.trim() === '') || (!arb && subcategoryeditdetails.sub_category_title.trim() === '')) && (
                  <div className="error-message">Please Enter</div>
              )}
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                  {arabic.find((item) => item.key_text === 'mdSubCategory.Category')?.[genLabel]}
                  </Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={subcategoryeditdetails && subcategoryeditdetails.category_id}
                    name="category_id"
                  >
                    <option value="selected">Please Select</option>
                    {category &&
                      category.map((e) => {
                        return (
                          <option key={e.category_id} value={e.category_id}>
                            {' '}
                            {arb && e.concattitle_arb ?e.concattitle_arb : e.concattitle}
                            {' '}
                          </option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdSubCategory.SubCategoryType')?.[genLabel]}
              </Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            subcategoryeditdetails && subcategoryeditdetails.sub_category_type_arb ? subcategoryeditdetails.sub_category_type_arb :
                            (subcategoryeditdetails && subcategoryeditdetails.sub_category_type_arb !== null ? '' : subcategoryeditdetails && subcategoryeditdetails.sub_category_type)
                          )
                        : (subcategoryeditdetails && subcategoryeditdetails.sub_category_type)
                    }
                    name={arb ? 'sub_category_type_arb' : 'sub_category_type'}
                  >
                    <option defaultValue="selected">Please Select</option>
                    {subcategorytypedetails &&
                      subcategorytypedetails.map((e) => {
                        return (
                          <option key={e.value} value={e.value}>
                            {e.value}
                          </option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Col>
            {/* <Col md="3">
              <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdSubCategory.SubCategoryType')?.[genLabel]}
                </Label>
                    <Input
                      type="select"
                      onChange={handleInputs}
                      value={
                        arb
                          ? (
                              subcategoryeditdetails && subcategoryeditdetails.sub_category_type_arb ? subcategoryeditdetails.sub_category_type_arb :
                              (subcategoryeditdetails && subcategoryeditdetails.sub_category_type_arb !== null ? '' : subcategoryeditdetails && subcategoryeditdetails.sub_category_type)
                            )
                          : (subcategoryeditdetails && subcategoryeditdetails.sub_category_type)
                      }
                      name={arb ? 'sub_category_type_arb' : 'sub_category_type'}
                      >
                      <option value="">{arb ?'الرجاء التحديد':'Please Select'}</option>
                        <option value="New">{arb ?'جديد':'Content'}</option>
                        <option value="Quoted">{arb ?'مقتبس':'Enquiry Form '}</option>
                        <option value="Awarded">{arb ?'منحت':'Regisration'}</option>
                      </Input>
              </FormGroup>
            </Col> */}
            <Col md="3">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdSubCategory.ExternalLink')?.[genLabel]}
                </Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={
                    arb
                      ? (
                          subcategoryeditdetails && subcategoryeditdetails.external_link_arb ? subcategoryeditdetails.external_link_arb :
                          (subcategoryeditdetails && subcategoryeditdetails.external_link_arb !== null ? '' : subcategoryeditdetails && subcategoryeditdetails.external_link)
                        )
                      : (subcategoryeditdetails && subcategoryeditdetails.external_link)
                  }
                  name={arb ? 'external_link_arb' : 'external_link'}
                />
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdSubCategory.InternalLink')?.[genLabel]}
                </Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={
                    arb
                      ? (
                          subcategoryeditdetails && subcategoryeditdetails.internal_link_arb ? subcategoryeditdetails.internal_link_arb :
                          (subcategoryeditdetails && subcategoryeditdetails.internal_link_arb !== null ? '' : subcategoryeditdetails && subcategoryeditdetails.internal_link)
                        )
                      : (subcategoryeditdetails && subcategoryeditdetails.internal_link)
                  }
                  name={arb ? 'internal_link_arb' : 'internal_link'}
                />
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdSubCategory.Published')?.[genLabel]}
                </Label>
                <br></br>
                {/* <Input
                name="published"
                  value="1"
                  type="radio"
                  defaultChecked={subcategoryeditdetails && subcategoryeditdetails.published === 1 && true}
                  // defaultChecked={
                  //  ( (subcategoryeditdetails && subcategoryeditdetails.published === 1) ||
                  //  (subcategoryeditdetails && subcategoryeditdetails.published_arb === 1) ) && true
                  // }
                  onChange={handleInputs}
                />
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdSubCategory.PublishedYes')?.[genLabel]}
                </Label>
                <Input
                  name="published"
                  value="0"
                  type="radio"
                  defaultChecked={subcategoryeditdetails && subcategoryeditdetails.published === 0 && true}
                  // defaultChecked={
                  //   ( (subcategoryeditdetails && subcategoryeditdetails.published === 0) ||
                  //   (subcategoryeditdetails && subcategoryeditdetails.published_arb === 0) ) && true
                  // }
                  onChange={handleInputs}
                />
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdSubCategory.PublishedNo')?.[genLabel]}
                </Label> */}
                <Input
                    name="published"
                    value="1"
                    type="radio"
                    defaultChecked={subcategoryeditdetails && subcategoryeditdetails.published === 1 && true}
                    onChange={handleInputs}
                  />
                  <Label> Yes </Label>
                  <Input
                    name="published"
                    value="0"
                    type="radio"
                    defaultChecked={subcategoryeditdetails && subcategoryeditdetails.published === 0 && true}
                    onChange={handleInputs}
                  />
                  <Label>No</Label>
              </FormGroup>
            </Col>
          </Row>
        </ComponentCard>
      </FormGroup>
    </Form>
  );
}

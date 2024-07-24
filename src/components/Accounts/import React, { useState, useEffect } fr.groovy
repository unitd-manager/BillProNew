import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    Row,
    Col,
    FormGroup,
    Label,
    Input,
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    Form,
} from 'reactstrap';
import moment from 'moment';
import message from '../Message';
import api from '../../constants/api';

const AccMapSIngleDataEditModal = ({ editMenuItemModal, setEditMenuItemModal, clickedMenuItem, menuItems, arb }) => {
    AccMapSIngleDataEditModal.propTypes = {
        editMenuItemModal: PropTypes.bool,
        setEditMenuItemModal: PropTypes.func,
        clickedMenuItem: PropTypes.object,
        menuItems: PropTypes.any,
        arb: PropTypes.string, // Pass arb as a prop
    };

    const [formData, setFormData] = useState({
        title: '',
        title_arb: '',
        code: '',
        modification_date: moment(Date.now()).format('YYYY-MM-DD'),
        parent_id: '',
        category_type: '',
        category_type_arb: '',
        acc_category_id: ''
    });

    useEffect(() => {
        if (editMenuItemModal && clickedMenuItem) {
            setFormData({
                title: clickedMenuItem.title,
                title_arb: clickedMenuItem.title_arb,
                code: clickedMenuItem.code,
                modification_date: moment(Date.now()).format('YYYY-MM-DD'),
                parent_id: clickedMenuItem?.parent_id,
                category_type: clickedMenuItem.category_type,
                category_type_arb: clickedMenuItem.category_type_arb,
                acc_category_id: clickedMenuItem.acc_category_id,
            });
        }
    }, [editMenuItemModal, clickedMenuItem, arb]);

    const handleInputs = (e) => {
        const { name, value } = e.target;
        if (name === "acc_category_id") {
            setFormData({ ...formData, parent_id: value });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const UpdateData = () => {
        api
            .post('/accountsMap/editMenuItems', formData)
            .then(() => {
                message(arb === true ? 'تم تعديل السجل بنجاح' : 'Record edited successfully', 'success');
                setTimeout(() => {
                    window.location.reload();
                  }, 300);
            })
            .catch(() => {
                message(arb === true ? 'غير قادر على تحرير السجل.' : 'Unable to edit record.', 'error');
            });
    };

    return (
        <>
            <Modal size="1" isOpen={editMenuItemModal}>
                <ModalHeader>
                    {arb === true ? 'عنصر قائمة جديد' : 'New Menu Item'}
                    <Button
                        color="secondary"
                        onClick={() => {
                            setEditMenuItemModal(false);
                        }}
                    >
                        X
                    </Button>
                </ModalHeader>

                <ModalBody>
                    <Row>
                        <Col md="12">
                            <Form>
                                <Row>
                                    <Col md="12">

                                        <FormGroup>
                                            <Label>{arb === true ? 'الأصل' : 'Parent'}</Label>
                                            <Input type="select" name="acc_category_id" defaultValue={clickedMenuItem ? clickedMenuItem?.parent_id : ''} onChange={handleInputs} >
                                                <option value="">{arb === true ? 'يرجى الاختيار' : 'Please Select'}</option>
                                                {menuItems?.filter(option => arb ? option.title_arb : option.title).map((item) => (
                                                    <option
                                                        key={item.acc_category_id}
                                                        value={item.acc_category_id}
                                                        selected={item?.acc_category_id === clickedMenuItem?.parent_id}
                                                    >
                                                        {arb === true ? item?.title_arb : item?.title}
                                                    </option>
                                                ))}
                                            </Input>
                                        </FormGroup>

                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12">
                                        <FormGroup>
                                            <Label>{arb === true ? 'العنوان' : 'Title'}</Label>
                                            <Input
                                                type="text"
                                                name={arb ? 'title_arb' : 'title'}
                                                defaultValue={clickedMenuItem ? (arb === true ? clickedMenuItem.title_arb : clickedMenuItem.title) : ''}
                                                onChange={handleInputs}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12">
                                        <FormGroup>
                                            <Label>{arb === true ? 'الرمز' : 'Code'}</Label>
                                            <Input
                                                type="text"
                                                name="code"
                                                defaultValue={clickedMenuItem ? clickedMenuItem.code : ''}
                                                onChange={handleInputs}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12">
                                        <FormGroup>
                                            <Label>{arb === true ? 'يرجى اختيار' : 'Customer'}</Label>
                                            <Input type="select" name={arb ? 'category_type_arb' : 'category_type'} 
                                                defaultValue={clickedMenuItem ? (arb === true ? clickedMenuItem.category_type_arb : clickedMenuItem.category_type) : ''}
                                                onChange={handleInputs} >
                                                <option>{arb === true ? 'حدد العميل' : 'Select Customer'}</option>
                                                <option value={arb === true ? 'حساب بنكي' : "Bank Account"}>{arb === true ? 'حساب بنكي' : 'Bank Account'}</option>
                                                <option value={arb === true ? 'حساب نقدي' : 'Cash Account'}>{arb === true ? 'حساب نقدي' : 'Cash Account'}</option>
                                                <option value={arb === true ? 'دائن / متنوع متنوع' : 'Sundry Creditor / Debtor'}>{arb === true ? 'دائن / مدين متنوع' : 'Sundry Creditor / Debtor'}</option>
                                                <option value={arb === true ? 'عداد' : 'Counter'}>{arb === true ? 'عداد' : 'Counter'}</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </ModalBody>

                <ModalFooter>
                    <Button
                        className="shadow-none"
                        color="primary"
                        onClick={() => {
                            UpdateData();
                        }}
                    >
                        {arb === true ? 'حفظ' : 'Save'}
                    </Button>
                    <Button
                        color="secondary"
                        onClick={() => {
                            setEditMenuItemModal(false);
                        }}
                    >
                        {arb === true ? 'إلغاء' : 'Cancel'}
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default AccMapSIngleDataEditModal;

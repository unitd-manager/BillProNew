import React, {useContext, useEffect, useState } from 'react';
import { TabPane, TabContent, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
// import { Editor } from 'react-draft-wysiwyg';
// import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
// import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import * as Icon from 'react-feather';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
//import ProductEditButtons from '../../components/Product/ProductEditButtons';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import AppContext from '../../context/AppContext';
import ApiButton from '../../components/ApiButton';
import Tab from '../../components/project/Tab';
import Tabs from '../../components/project/Tabs';


const ProductUpdate = () => {
  // All state variables

  const [productDetails, setProductDetails] = useState();
  const [categoryLinked, setCategoryLinked] = useState([]);
  // const [description, setDescription] = useState('');
  const [pictureroomname, setPictureRoomName] = useState('');
  const [attachmentroomname, setAttachmentRoomName] = useState('');
  const [picturefiletypes, setPictureFileTypes] = useState('');
  const [attachmentfiletypes, setAttachmentFileTypes] = useState('');
  const [picturemodal, setPictureModal] = useState(false);
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const [pictureData, setDataForPicture] = useState({
    modelType: '',
  });
const [pictureupdate, setPictureUpdate] = useState(false);
const [attachmentupdate, setAttachmentUpdate] = useState(false);
const [unitdetails, setUnitDetails] = useState();
// const [updatepic, setUpdatePic] = useState(false);
  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();
  const backToList = () => {
    navigate('/Product');
  };
  //get staff details
  const { loggedInuser } = useContext(AppContext);
  const [formSubmitted, setFormSubmitted] = useState(false);

  //Setting data in productDetails
  const handleInputs = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
const selectedLanguage = getSelectedLanguageFromLocalStorage();

const [arabic, setArabic] = useState([]);


  const arb =selectedLanguage === 'Arabic'


  const eng =selectedLanguage === 'English'
   

  const getTranslationForProduct = () => {
      api
      .get('/product/getTranslationForProduct')
      .then((res) => {
        setArabic(res.data.data);
      })
      .catch(() => {
        // Handle error if needed
      });   
  };
  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }

  const [activeTab, setActiveTab] = useState('1');

  const tabs = [
    { id: '1', name: 'Attachment' },
  ];
  const tabsArb = [ 
    { id: '1', name: 'مرفق' },
  ];
  const toggle = (tab) => {
    setActiveTab(tab);
  };

  //setting data in Description Modal productDetails
  // const handleDataEditor = (e, type) => {
  //   setProductDetails({
  //     ...productDetails,
  //     [type]: draftToHtml(convertToRaw(e.getCurrentContent())),
  //   });
  // };
  // //Description Modal
  // const convertHtmlToDraft = (existingQuoteformal) => {
  //   const contentBlock = htmlToDraft(existingQuoteformal && existingQuoteformal);
  //   if (contentBlock) {
  //     const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
  //     const editorState = EditorState.createWithContent(contentState);
  //     setDescription(editorState);
  //   }
  // };
  // Get Product data By product id
  const getProductById = () => {
    api
      .post('/product/getProduct', { product_id: id })
      .then((res) => {
        setProductDetails(res.data.data[0]);
        // convertHtmlToDraft(res.data.data[0].description);
      })
      .catch(() => {
        
      });
  };
  //Edit Product
  const editProductData = () => {
    setFormSubmitted(true);
    if ((arb && productDetails.title_arb.trim() !== '') || (!arb && productDetails.title.trim() !== '')) 
   {
      productDetails.modification_date = creationdatetime;
      productDetails.modified_by= loggedInuser.first_name; 
      api
        .post('/product/edit-Product', productDetails)
        .then(() => {
          message('Record edited successfully', 'success');
        })

        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };

  // getting data from Category
  const getCategory = () => {
    api
      .get('/product/getCategory')
      .then((res) => {
        setCategoryLinked(res.data.data);
      })
      .catch(() => {
        
      });
  };

  //Api call for getting Unit From Valuelist
  const getUnit = () => {
    api
      .get('/product/getUnitFromValueList')
      .then((res) => {
        setUnitDetails(res.data.data);
      })
      .catch(() => {
        message('Staff Data Not Found', 'info');
      });
  };

  //Attachments
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
  };
  //Pictures
  const dataForPicture = () => {
    setDataForPicture({
      modelType: 'picture',
    });
  };
  //useEffect
  useEffect(() => {
    getCategory();
    getProductById();
    getUnit();
    getTranslationForProduct();
  }, [id]);

  return (
    <>
      <BreadCrumbs heading={productDetails && productDetails.title}/>
      <Form>
        <FormGroup>
          {/* <ProductEditButtons id={id} editProductData={editProductData} navigate={navigate} formSubmitted={formSubmitted}
        setFormSubmitted={setFormSubmitted} /> */}
          {/* <ProductEditButtons id={id} editProductData={editProductData} navigate={navigate} /> */}
          <ApiButton
              editData={editProductData}
              navigate={navigate}
              applyChanges={editProductData}
             // deleteData={deleteBookingData}
              backToList={backToList}
              module="Product"
            ></ApiButton>
          {/* Content Details Form */}
          <ComponentCard title="Product Details" creationModificationDate={productDetails}>
            <ToastContainer></ToastContainer>
            <Row>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdProduct.ItemCode')?.[genLabel]}
              </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            productDetails && productDetails.item_code_arb ? productDetails.item_code_arb :
                            (productDetails && productDetails.item_code_arb !== null ? '' : productDetails && productDetails.item_code)
                          )
                        : (productDetails && productDetails.item_code)
                    }
                    name={arb ? 'item_code_arb' : 'item_code'}
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdProduct.ProductName')?.[genLabel]}
              </Label><span className='required'>*</span>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            productDetails && productDetails.title_arb ? productDetails.title_arb :
                            (productDetails && productDetails.title_arb !== null ? '' : productDetails && productDetails.title)
                          )
                        : (productDetails && productDetails.title)
                    }
                    name={arb ? 'title_arb' : 'title'}
                    className={`form-control ${
                      formSubmitted && ((arb && productDetails.title_arb.trim() === '') ||(!arb && productDetails.title.trim() === '')) ? 'highlight' : ''
                  }`}
                />
                {formSubmitted && ((arb && productDetails.title_arb.trim() === '') || (!arb && productDetails.title.trim() === '')) && (
                  <div className="error-message">Please Enter</div>
              )}
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  {/* Category title from Category table */}
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdProduct.Category')?.[genLabel]}
              </Label>
                  <Input
                    type="select"
                    name="category_id"
                    value={productDetails && productDetails.category_id}
                    onChange={handleInputs}
                  >
                    <option defaultValue="selected">Please Select</option>
                    {categoryLinked &&
                      categoryLinked.map((ele) => {
                        return (
                          <option key={ele.category_id} value={ele.category_id}>
                            {ele.category_title}
                          </option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdProduct.ProductType')?.[genLabel]}
              </Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            productDetails && productDetails.product_type_arb ? productDetails.product_type_arb :
                            (productDetails && productDetails.product_type_arb !== null ? '' : productDetails && productDetails.product_type)
                          )
                        : (productDetails && productDetails.product_type)
                    }
                    name={arb ? 'product_type_arb' : 'product_type'}
                  >
                    <option defaultValue="selected"> Please Select </option>
                    <option value="materials">Materials</option>
                    <option value="tools">Tools</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdProduct.QuantityinStock')?.[genLabel]}
              </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            productDetails && productDetails.actual_stock_arb ? productDetails.actual_stock_arb :
                            (productDetails && productDetails.actual_stock_arb !== null ? '' : productDetails && productDetails.actual_stock)
                          )
                        : (productDetails && productDetails.actual_stock)
                    }
                    name={arb ? 'actual_stock_arb' : 'actual_stock'}
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdProduct.Price')?.[genLabel]}
              </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            productDetails && productDetails.price_arb ? productDetails.price_arb :
                            (productDetails && productDetails.price_arb !== null ? '' : productDetails && productDetails.price)
                          )
                        : (productDetails && productDetails.price)
                    }
                    name={arb ? 'price_arb' : 'price'}
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdProduct.Unit')?.[genLabel]}
              </Label>
                  <Input

                  type="select"
                  name="unit"
                  onChange={handleInputs}
                  value={productDetails && productDetails.unit}
                >
                  <option defaultValue="selected">Please Select</option>
                  {unitdetails &&
                    unitdetails.map((ele) => {
                      return (
                        <option key={ele.value} value={ele.value}>
                          {ele.value}
                        </option>
                      );
                    })}
                </Input>
                  {/* <Input
                    type="text"
                    onChange={handleInputs}
                    value={productDetails && productDetails.unit}
                    name="unit"
                  /> */}
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdProduct.ShortDescription')?.[genLabel]}
              </Label>
                  <Input
                    type="textarea"
                    onChange={handleInputs}
                    value={
                      arb
                        ? (
                            productDetails && productDetails.description_short_arb ? productDetails.description_short_arb :
                            (productDetails && productDetails.description_short_arb !== null ? '' : productDetails && productDetails.description_short)
                          )
                        : (productDetails && productDetails.description_short)
                    }
                    name={arb ? 'description_short_arb' : 'description_short'}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="4">
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdProduct.Published')?.[genLabel]}
              </Label>
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdProduct.PublishedYes')?.[genLabel]}
              </Label>
                  &nbsp;
                  <Input
                    name="published"
                    value="1"
                    type="radio"
                    defaultChecked={productDetails && productDetails.published === 1 && true}
                    onChange={handleInputs}
                  />
                  &nbsp; &nbsp;
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdProduct.PublishedNo')?.[genLabel]}
              </Label>
                  &nbsp;
                  <Input
                    name="published"
                    value="0"
                    type="radio"
                    defaultChecked={productDetails && productDetails.published === 0 && true}
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>
            </Row>
          </ComponentCard>
          {/* Product Details Form */}
          {/* <ComponentCard title="Product details">
            <Row> */}
              {/* Description form */}
              {/* <ComponentCard title="Description">
                <Editor
                  editorState={description}
                  wrapperClassName="demo-wrapper mb-0"
                  editorClassName="demo-editor border mb-4 edi-height"
                  onEditorStateChange={(e) => {
                    handleDataEditor(e, 'description');
                    setDescription(e);
                  }}
                />
              </ComponentCard> */}
            {/* </Row>
          </ComponentCard> */}
        </FormGroup>
      </Form>
{/* Picture and Attachments Form */}



      <br />

      <ComponentCard title={arb ? 'المزيد من التفاصيل' : 'More Details'}>
        <ToastContainer></ToastContainer>
        {eng === true &&

        <Tab toggle={toggle} tabs={tabs} />
        }
        { arb === true &&
        <Tabs toggle={toggle} tabsArb={tabsArb} />
        }
        <TabContent className="p-4" activeTab={activeTab}>
         
          <TabPane tabId="1">
          <Form>
              <FormGroup>
              <ComponentCard title="Picture">
                  <Row>
                    <Col xs="12" md="3" className="mb-3">
                      <Button
                        className="shadow-none"
                        color="primary"
                        onClick={() => {
                          setPictureRoomName('ProductPic');
                          setPictureFileTypes(['JPG','JPEG', 'PNG', 'GIF']);
                          dataForPicture();
                          setPictureModal(true);
                        }}
                      >
                        <Icon.File className="rounded-circle" width="20" />
                      </Button>
                    </Col>
                  </Row>
                  <AttachmentModalV2
                    moduleId={id}
                    attachmentModal={picturemodal}
                    setAttachmentModal={setPictureModal}
                    roomName={pictureroomname}
                    fileTypes={picturefiletypes}
                    altTagData="Product Data"
                    desc="Product Data"
                    recordType="Picture"
                    mediaType={pictureData.modelType}
                    update={pictureupdate}
                    setUpdate={setPictureUpdate}
                  />
                  <ViewFileComponentV2 moduleId={id} roomName="ProductPic" recordType="Picture" update={pictureupdate}
                    setUpdate={setPictureUpdate}/>
                    </ComponentCard>
              </FormGroup>
            </Form>
      
      <Form>
              <FormGroup>
              <ComponentCard title="Attachments">
                  <Row>
                    <Col xs="12" md="3" className="mb-3">
                      <Button
                        className="shadow-none"
                        color="primary"
                        onClick={() => {
                          setAttachmentRoomName('Product');
                          setAttachmentFileTypes(['JPG','JPEG', 'PNG', 'GIF', 'PDF']);
                          dataForAttachment();
                          setAttachmentModal(true);
                        }}
                      >
                        <Icon.File className="rounded-circle" width="20" />
                      </Button>
                    </Col>
                  </Row>
                  <AttachmentModalV2
                    moduleId={id}
                    attachmentModal={attachmentModal}
                    setAttachmentModal={setAttachmentModal}
                    roomName={attachmentroomname}
                    fileTypes={attachmentfiletypes}
                    altTagData="ProductRelated Data"
                    desc="ProductRelated Data"
                    recordType="RelatedPicture"
                    mediaType={attachmentData.modelType}
                    update={attachmentupdate}
                    setUpdate={setAttachmentUpdate}
                  />
                  <ViewFileComponentV2 moduleId={id} roomName="Product" recordType="RelatedPicture" update={attachmentupdate}
                    setUpdate={setAttachmentUpdate}/>
                    </ComponentCard>
              </FormGroup>
            </Form>
          </TabPane>
        </TabContent>
      </ComponentCard>
    </>
  );
};
export default ProductUpdate;

import React, { useEffect, useState , useContext} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import { ToastContainer } from 'react-toastify';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
//import SubCategoryButton from '../../components/SubCategoryTable/SubCategoryButton';
import SubCategoryEditDetails from '../../components/SubCategoryTable/SubCategoryEditDetails';
import SubCategoryPageMetaData from '../../components/SubCategoryTable/SubCategoryPageMetaData';
import message from '../../components/Message';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';
import ApiButton from '../../components/ApiButton';


const SubCategoryEdit = () => {
  // All state variables
  const [category, setCategory] = useState();
  const [subcategoryeditdetails, setSubCategoryEditDetails] = useState();
  const [subcategorytypedetails, setSubCategoryTypetDetails] = useState();

  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const { loggedInuser } = useContext(AppContext);

  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
const selectedLanguage = getSelectedLanguageFromLocalStorage();

const [arabic, setArabic] = useState([]);


  const arb =selectedLanguage === 'Arabic'

  // const eng =selectedLanguage === 'English'
   

  const getTranslationForSubCategory = () => {
      api
      .get('/subcategory/getTranslationForSubCategory')
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



  //All Functions/Methods

  //Setting Data in SubCategory Edit Details
  const handleInputs = (e) => {
    setSubCategoryEditDetails({ ...subcategoryeditdetails, [e.target.name]: e.target.value });
  };

  // Route Change
  // const applyChanges = () => {};
  // const saveChanges = () => {
  //   if ((arb && subcategoryeditdetails.sub_category_title_arb.trim() !== '') || (!arb && subcategoryeditdetails.sub_category_title.trim() !== '')) {
  //     navigate('/SubCategory');
  //   }
  // };
  const backToList = () => {
    navigate('/SubCategory');
  };

  //Api call for Category Dropdown data
  const getCategory = () => {
    api
      .get('/subcategory/getCategory')
      .then((res) => {
        setCategory(res.data.data);
      })
      .catch(() => {
        message('SubCategory Data Not Found', 'info');
      });
  };

  //Api call for Editting SubCategory By Id
  const editSubCategoryById = () => {
    api
      .post('/subcategory/getSubCategoryById', { sub_category_id: id })
      .then((res) => {
        const resObj = res.data.data[0];
        if (!resObj.sub_category_type) {
          resObj.sub_category_type = 'Content';
        }
        setSubCategoryEditDetails(resObj);
      })
      .catch(() => {
        message('SubCategory Data Not Found', 'info');
      });
  };

  //Api call for getting Staff Type From Valuelist
  const getSubCategoryType = () => {
    api
      .get('/subcategory/getSubCategoryTypeFromValueList')
      .then((res) => {
        setSubCategoryTypetDetails(res.data.data);
      })
      .catch(() => {
        message('SubCategory Type Data Not Found', 'info');
      });
  };

  

  //Api call for Editing SubCategory Details
  const editSubCategoryData = () => {
    setFormSubmitted(true);
    if ((arb && subcategoryeditdetails.sub_category_title_arb.trim() !== '') || (!arb && subcategoryeditdetails.sub_category_title.trim() !== '')) {
      subcategoryeditdetails.modification_date = creationdatetime;
      subcategoryeditdetails.modified_by = loggedInuser.first_name;
      api
        .post('/subcategory/editSubCategory', subcategoryeditdetails)
        .then(() => {
          message('Record editted successfully', 'success');
          editSubCategoryById();
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };

  //Api call for Deleting SubCategory Details
  const deleteSubCategoryData = () => {
    api
      .post('/subcategory/deleteSubCategory', { sub_category_id: id })
      .then(() => {
        message('Record editted successfully', 'success');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  

  useEffect(() => {
    editSubCategoryById();
    getCategory();
    getSubCategoryType();
    getTranslationForSubCategory();
  }, [id]);

  return (
    <>
      <BreadCrumbs />
      <ToastContainer />
      {/* SubCategory Button Details */}
      {/* <SubCategoryButton
        saveChanges={saveChanges}
        applyChanges={applyChanges}
        backToList={backToList}
        editSubCategoryData={editSubCategoryData}
        deleteSubCategoryData={deleteSubCategoryData}
        navigate={navigate}
        id={id}
        formSubmitted={formSubmitted}
        setFormSubmitted={setFormSubmitted}
      ></SubCategoryButton> */}
<ApiButton
              editData={editSubCategoryData}
              navigate={navigate}
              applyChanges={editSubCategoryData}
              deleteData={deleteSubCategoryData}
              backToList={backToList}
              module="SubCategory"
            ></ApiButton>
      {/* Sub Category  Details */}
      <BreadCrumbs />
      <SubCategoryEditDetails
        subcategoryeditdetails={subcategoryeditdetails}
        handleInputs={handleInputs}
        category={category}
        subcategorytypedetails={subcategorytypedetails}
        arb={arb}
        formSubmitted={formSubmitted}
        arabic={arabic}
        genLabel={genLabel}
      ></SubCategoryEditDetails>

      {/* Page Meta Data Details */}
      <SubCategoryPageMetaData
        subcategoryeditdetails={subcategoryeditdetails}
        handleInputs={handleInputs}
        arb={arb}
        arabic={arabic}
        genLabel={genLabel}
      ></SubCategoryPageMetaData>
    </>
  );
};

export default SubCategoryEdit;

import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
// import 'datatables.net-buttons/js/buttons.html5';
// import 'datatables.net-buttons/js/buttons.print';
import { Link, useParams } from 'react-router-dom';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';
import Publish from '../../components/Publish';
import SortOrder from '../../components/SortOrder';

const SubCategory = () => {
  // All state variables
  const [subcategory, setSubCategory] = useState();
  const [loading, setLoading] = useState(false)

  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
  const selectedLanguage = getSelectedLanguageFromLocalStorage();

  // Navigation and Parameter Constants
  const { id } = useParams();

  //Api call for getting SubCategory Data
  const getSubCategory = () => {
    api
      .get('/subcategory/getSubCategory')
      .then((res) => {
        setSubCategory(res.data.data);
        $('#example').DataTable({
          pagingType: 'full_numbers',
          pageLength: 20,
          processing: true,
          dom: 'Bfrtip',
        //   buttons: [ {
        //     extend: 'print',
        //     text: "Print",
        //     className:"shadow-none btn btn-primary",
        // }],
        });
        setLoading(false)
      }).catch(()=>{
        setLoading(false)
      });
    };
  
  useEffect(() => {
    getSubCategory();
  }, [id]);

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


  useEffect(() => {
    getTranslationForSubCategory();
  }, []);

  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }

  //Structure of Subcategory List view
  const columns = [
    {
      name: '#',
      selector: '',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdSubCategory.Edit')?.[genLabel], 
      selector: 'edit',
      cell: () => <Icon.Edit2 />,
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
    {
      name: arabic.find(item => item.key_text === 'mdSubCategory.Title')?.[genLabel],
      selector: 'sub_category_title',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdSubCategory.Order')?.[genLabel],
      selector: 'sort_order',
      sortable: true,
      grow: 0,
      width: 'auto',
    },
    {
      name: arabic.find(item => item.key_text === 'mdSubCategory.SubCatChildType')?.[genLabel],
      selector: 'sub_category_type',
      sortable: true,
      grow: 0,
    },
    {
      name: arabic.find(item => item.key_text === 'mdSubCategory.Section')?.[genLabel],
      selector: 'section_title',
      sortable: true,
      grow: 0,
    },
    {
      name: arabic.find(item => item.key_text === 'mdSubCategory.Category')?.[genLabel],
      selector: 'category_title',
      sortable: true,
      grow: 2,
      width: 'auto',
    },
    {
      name: arabic.find(item => item.key_text === 'mdSubCategory.ID')?.[genLabel], 
      selector: 'sub_category_id',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdSubCategory.Published')?.[genLabel],
      selector: 'published',
      sortable: true,
      grow: 2,
      wrap: true,
    },
  ];

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />

        <CommonTable
        loading={loading}
          title={arb ? 'قائمة الفئات الفرعية': 'SubCategory List'}
          module='SubCategory'
          Button={
            <Link to="/SubCategoryDetails">
              <Button color="primary" className="shadow-none mr-2">
                Add New
              </Button>
            </Link>
          }
        >
          <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {subcategory &&
              subcategory.map((element, index) => {
                return (
                  <tr key={element.sub_category_id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/SubCategoryEdit/${element.sub_category_id}`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{arb && element.sub_category_title_arb ?element.sub_category_title_arb : element.sub_category_title}</td>
                    <td>
                    <SortOrder
                       idValue={element.sub_category_id}
                       idColumn="sub_category_id"
                       tablename="sub_category"
                       value={element.sort_order}>
                    </SortOrder>
                    </td>
                    <td>{arb && element.sub_category_type_arb ?element.sub_category_type_arb : element.sub_category_type}</td>
                    <td>{arb && element.section_title_arb ?element.section_title_arb : element.section_title}</td>
                    <td>{arb && element.category_title_arb ?element.category_title_arb : element.category_title}</td>
                    <td>{element.sub_category_id}</td>
                    <td>
                    <Publish
                        idColumn="sub_category_id"
                        tablename="sub_category"
                        idValue={element.sub_category_id.toString()}
                        value={arb && element.published_arb ?element.published_arb : element.published}
                      ></Publish>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
};

export default SubCategory;

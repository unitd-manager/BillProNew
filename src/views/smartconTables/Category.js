import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Button, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
// import 'datatables.net-buttons/js/buttons.html5';
// import 'datatables.net-buttons/js/buttons.print';
import { Link } from 'react-router-dom';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';
import Publish from '../../components/Publish';
import SortOrder from '../../components/SortOrder';

const Category = () => {
  //state variable
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(false);
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
const selectedLanguage = getSelectedLanguageFromLocalStorage();
  //get category data
  const getCategory = () => {
    api
      .get('/category/getCategory')
      .then((res) => {
        setCategory(res.data.data);
        $('#example').DataTable({
          pagingType: 'full_numbers',
          pageLength: 20,
          processing: true,
          dom: 'Bfrtip',
          // buttons: [
          //   {
          //     extend: 'print',
          //     text: 'Print',
          //     className: 'shadow-none btn btn-primary',
          //   },
          // ],
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const [arabic, setArabic] = useState([]);


  const arb =selectedLanguage === 'Arabic'

  // const eng =selectedLanguage === 'English'
   

  const getTranslationForCategory = () => {
      api
      .get('/category/getTranslationForCategory')
      .then((res) => {
        setArabic(res.data.data);
      })
      .catch(() => {
        // Handle error if needed
      });   
  };


  useEffect(() => {
    getCategory();
    getTranslationForCategory();
  }, []);

  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }
  //  stucture of Category list view
  const columns = [
    {
      name: '#',
      selector: '',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name:arabic.find(item => item.key_text === 'mdCategory.Edit')?.[genLabel],
      selector: 'edit',
      cell: () => <Icon.Edit2 />,
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
    {
      name: arabic.find(item => item.key_text === 'mdCategory.CategoryTitle')?.[genLabel],
      selector: 'category_title',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdCategory.Order')?.[genLabel],
      selector: 'sort_order',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdCategory.CategoryType')?.[genLabel],
      selector: 'category_type',
      sortable: true,
      grow: 0,
    },
    {
      name: arabic.find(item => item.key_text === 'mdCategory.Section')?.[genLabel],
      selector: 'section_title',
      sortable: true,
      width: 'auto',
      grow: 2,
    },
    {
      name: arabic.find(item => item.key_text === 'mdCategory.ID')?.[genLabel],
      selector: 'category_id',
      sortable: true,
      grow: 2,
      width: 'auto',
    },
    {
      name: arabic.find(item => item.key_text === 'mdCategory.Published')?.[genLabel],
      selector: 'published',
      sortable: true,
      grow: 2,
      width: 'auto',
    },
  ];

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />

        <CommonTable
          loading={loading}s
          title={arb ? 'قائمة الفئات': 'Category List'}
          module='Categoty'
          Button={
            <>
            <Col>
            <Link to="/CategoryDetails">
              <Button color="primary" className="shadow-none mr-2">
                New
              </Button>
            </Link>
            </Col>
            </>
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
            {category &&
              category.map((element, index) => {
                return (
                  <tr key={element.category_id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/CategoryEdit/${element.category_id}`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{arb && element.category_title_arb ?element.category_title_arb : element.category_title}</td>
                    <td>
                      <SortOrder
                        idValue={element.category_id}
                        idColumn="category_id"
                        tablename="category"
                        value={element.sort_order}
                      ></SortOrder>
                    </td>
                    <td>{arb && element.category_type_arb ?element.category_type_arb : element.category_type}</td>
                    <td>{arb && element.section_title_arb ?element.section_title_arb : element.section_title}</td>
                    <td>{element.category_id}</td>
                    <td>
                      <Publish
                        idColumn="category_id"
                        tablename="category"
                        idValue={element.category_id.toString()}
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
export default Category;

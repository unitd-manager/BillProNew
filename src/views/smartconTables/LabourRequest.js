import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Button } from 'reactstrap';
// import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import moment from 'moment';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
// import 'datatables.net-buttons/js/buttons.html5';
// import 'datatables.net-buttons/js/buttons.print';
import { Link } from 'react-router-dom';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';

const LabourRequest = () => {
  //Const Variables
  const [planning, setPlanning] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
const selectedLanguage = getSelectedLanguageFromLocalStorage();


// const fetchTranslations = async () => {
//   try {
//     const res2 = await api.get('/labourrequest/getLabourRequest');
//     res2.data.data.forEach(async (itemId) => {
//        console.log('LabourId',itemId.labour_request_id)
    
//     const res1 = await api.get('/labourrequest/getTranslationColumn');
//     res1.data.data.forEach(async (item) => {
//       const columnNames = item.COLUMN_NAME_TRUNCATED;
      
//       console.log('columnNames',columnNames)
//       const res = await api.post('/labourrequest/getLabourTranslation', { labour_request_id: itemId.labour_request_id, columnNames });
     
//         console.log('resss',res.data.data)
//       res.data.data.forEach(async (cell) => {
//         Object.keys(cell).forEach(async(property) => {
//           console.log('colm', cell[property]);
      

//         try {
//           const response = await axios.post(
//             'https://translation.googleapis.com/language/translate/v2',
//             {},
//             {
//               params: {
//                 q:cell[property],
//                 target: 'ar',
//                 key: 'AIzaSyA_eJTEvBDRBHo8SYmq_2PyCh8s_Pl6It4', // Replace with your Google Translate API key
//               },
//             }
//           );
//            console.log(property,'_arb')
//            console.log('trabsss', response.data.data.translations[0].translatedText);
//            await api.post('/labourrequest/editLabourRequestArb', {
              
//             labour_request_id:itemId.labour_request_id,
//             [`${property}_arb`]: response.data.data.translations[0].translatedText,
//             value: response.data.data.translations[0].translatedText,
//         columnName:`${property}_arb`
//           });
//         } catch (error) {
//           console.error('Error occurred during translation:', error);
//         }
//       });
//     });
//     });
//   });
  
//   } catch (error) { 
//     console.error('Error fetching translation column names:', error);
//   }
// };
const tablevalue =  [
  {name:'labour_request'},
  // {name:'employee'},
];
  // Fetch translation when selectedLanguage or plannings changes
  const fetchTranslation = async () => {
    try {
      tablevalue.forEach(async (table) => {
        console.log('tableName',table.name)
        const tableNames = table.name
        const whereCondition = [`${tableNames}_id`]
        const res2 = await api.post('/labourrequest/getTranslationGetApi',{tableNames,whereCondition});
       res2.data.data.forEach(async (itemId) => {
       console.log('LabourId',itemId.labour_request_id)
      const res1 = await api.post('/labourrequest/getTranslationColumnFromTables',{tableNames});
      res1.data.data.forEach(async (item) => {
        const columnNames = item.COLUMN_NAME_TRUNCATED;
        
        console.log('columnNames',columnNames)
        const whereId = itemId.labour_request_id; 
        // const whereCondition = [`${tableNames}_id`]
        console.log('whereId',whereId)
        console.log('WhereCondition',whereCondition)
        const res = await api.post('/labourrequest/getTableTranslation', { whereId, columnNames,tableNames,whereCondition});
       
          console.log('resss',res.data.data)
        res.data.data.forEach(async (cell) => {

          Object.keys(cell).forEach(async(property) => {
            console.log('colm', cell[property]);
        
  
          // try {
          //   const response = await axios.post(
          //     'https://translation.googleapis.com/language/translate/v2',
          //     {},
          //     {
          //       params: {
          //         q:cell[property],
          //         target: 'ar',
          //         key: 'AIzaSyA_eJTEvBDRBHo8SYmq_2PyCh8s_Pl6It4', // Replace with your Google Translate API key
          //       },
          //     }
          //   );
          //    console.log(property,'_arb')
          //    console.log('trabsss', response.data.data.translations[0].translatedText);
          //   await api.post('/labourrequest/editRequestArb', {
          //     tableNames,
          //     whereId,
          //     whereCondition,
          //     labour_request_id:itemId.labour_request_id,
          //     [`${property}_arb`]: response.data.data.translations[0].translatedText,
          //     value: response.data.data.translations[0].translatedText,
          // columnName:`${property}_arb`
          //   });
          // } catch (error) {
          //   console.error('Error occurred during translation:', error);
          // }
        });
      });
      });
    });
  });
    } catch (error) {
      console.error('Error fetching translation column names:', error);
    }
  };


const [arabic, setArabic] = useState([]);

  const arb =selectedLanguage === 'Arabic'
  
  const getArabicCompanyName = () => {
      api
      .get('/labourrequest/getTranslationForLabourRequest')
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
  // get Leave
  const getPlanning = () => {
    api
      .get('/labourrequest/getLabourRequest')
      .then((res) => {
        setPlanning(res.data.data);
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

  useEffect(() => {
    getPlanning();
    getArabicCompanyName();
    // fetchTranslation();
  }, []);
  //  stucture of leave list view
  const columns = [
    {
      name: 'id',
      selector: 'labour_request_id',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: 'Edit',
      selector: 'edit',
      cell: () => <Icon.Edit2 />,
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },

    {
     
      name: arabic.find(item => item.key_text === 'mdLabourRequest.Project Name')?.[genLabel],
      selector: 'project_name',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
     
      name: arabic.find(item => item.key_text === 'mdLabourRequest.Code')?.[genLabel],
      selector: 'project_code',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
     
      name: arabic.find(item => item.key_text === 'mdLabourRequest.Request Date')?.[genLabel],
      selector: 'request_date',
      sortable: true,
      grow: 2,
      width: 'auto',
    },
    {
     
      name: arabic.find(item => item.key_text === 'mdLabourRequest.Start Date')?.[genLabel],
      selector: 'request_start_date',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
     
      name: arabic.find(item => item.key_text === 'mdLabourRequest.End Date')?.[genLabel],
      selector: 'request_end_date',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    
  ];

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />
        <Button color="primary" className="shadow-none"  onClick={() => {
                  fetchTranslation();
                }}>
                Update Arb
              </Button>
        <CommonTable
          loading={loading}
          title="Labour Request"
          module="Labour Request"
          Button={
            <Link to="/LabourRequestDetails">
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
            {planning &&
              planning.map((element, i) => {
                return (
                  <tr key={element.labour_request_id}>
                    <td>{i + 1}</td>
                    <td>
                      <Link to={`/LabourRequestEdit/${element.labour_request_id}/${element.project_id }`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.proj_title}</td>
                    <td>{element.project_code}</td>
                    <td>{(element.request_date)?moment(element.request_date).format('DD-MM-YYYY'):''}</td>
                    <td>{(element.request_start_date)?moment(element.request_start_date).format('DD-MM-YYYY'):''}</td>
                    <td>{(element.request_end_date)?moment(element.request_end_date).format('DD-MM-YYYY'):''}</td>

                    </tr>
                );
              })}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
};

export default LabourRequest;

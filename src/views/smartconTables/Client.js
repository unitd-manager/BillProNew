import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Button } from 'reactstrap';
// import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
// import 'datatables.net-buttons/js/buttons.html5';
// import 'datatables.net-buttons/js/buttons.print';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';
import Flag from '../../components/Flag';
import message from '../../components/Message';
import CommonTranslationList from '../../components/CommonTranslationList';

const Clients = () => {
  const [clients, setClients] = useState(null);
  const [loading, setLoading] = useState(false);




  // const tablevalue =  [
  //   {name:'company'},
  //   // {name:'contact'},
  //   // {name:'invoice_item'},
  //   // {name:'company'},
  //   // {name:'employee'},
  // ];
  //   // Fetch translation when selectedLanguage or plannings changes
  //   const fetchTranslation = async () => {
  //     try {
  //       tablevalue.forEach(async (table) => {
  //         console.log('tableName',table.name)
  //         const tableNames = table.name
  //         const whereCondition = [`${tableNames}_id`]
  //         const res2 = await api.post('/labourrequest/getTranslationGetApi',{tableNames,whereCondition});
  //        res2.data.data.forEach(async (itemId) => {
  //        console.log('LabourId',itemId)
  //        const whereId = itemId; 
  //       const res1 = await api.post('/labourrequest/getTranslationColumnFromTables',{tableNames});
  //       res1.data.data.forEach(async (item) => {
  //         const columnNames = item.COLUMN_NAME_TRUNCATED;
          
  //         console.log('columnNames',columnNames)
          
  //         // const whereCondition = [`${tableNames}_id`]
  //         console.log('whereId',whereId)
  //         console.log('WhereCondition',whereCondition)
  //         const res = await api.post('/labourrequest/getTableTranslation', { whereId, columnNames,tableNames,whereCondition});
         
  //           console.log('resss',res.data.data)
  //         res.data.data.forEach(async (cell) => {
  
  //           Object.keys(cell).forEach(async(property) => {
  //             console.log('colm', cell[property]);
          
    
  //           // try {
  //           //   const response = await axios.post(
  //           //     'https://translation.googleapis.com/language/translate/v2',
  //           //     {},
  //           //     {
  //           //       params: {
  //           //         q:cell[property],
  //           //         target: 'ar',
  //           //         key: 'AIzaSyA_eJTEvBDRBHo8SYmq_2PyCh8s_Pl6It4', // Replace with your Google Translate API key
  //           //       },
  //           //     }
  //           //   );
  //           //    console.log(property,'_arb')
  //           //    console.log('trabsss', response.data.data.translations[0].translatedText);
  //           //   await api.post('/labourrequest/editRequestArb', {
  //           //     tableNames,
  //           //     whereId,
  //           //     whereCondition,
  //           //     labour_request_id:itemId.labour_request_id,
  //           //     [`${property}_arb`]: response.data.data.translations[0].translatedText,
  //           //     value: response.data.data.translations[0].translatedText,
  //           // columnName:`${property}_arb`
  //           //   });
  //           // } catch (error) {
  //           //   console.error('Error occurred during translation:', error);
  //           // }
  //         });
  //       });
  //       });
  //     });
  //   });
  //     } catch (error) {
  //       console.error('Error fetching translation column names:', error);
  //     }
  //   };
  
    const tablevalue =  [
      {name:'company'},
      {name:'contact'},
      // {name:'employee'},
    ];
    const whereCondition = 'company_id'
    const tableNameUni = 'company'
      // // Fetch translation when selectedLanguage or plannings changes
      // const fetchTranslation = async () => {
      //   try {
      //     tablevalue.forEach(async (table) => {
      //       console.log('tableName',table.name)
      //       const tableNames = table.name
      //       const tableNameUni ='company'
      //       const whereCondition = 'company_id'
      //       const res2 = await api.post('/labourrequest/getTranslationGetApi',{tableNameUni,whereCondition});
      //      res2.data.data.forEach(async (itemId) => {
      //       console.log('LabourId', itemId[whereCondition]);
      //     const res1 = await api.post('/labourrequest/getTranslationColumnFromTables',{tableNames});
      //     res1.data.data.forEach(async (item) => {
      //       const columnNames = item.COLUMN_NAME_TRUNCATED;
            
      //       console.log('columnNames',columnNames)
      //       const whereId = itemId[whereCondition];  
      //       // const whereCondition = [`${tableNames}_id`]
      //       console.log('whereId',whereId)
      //       console.log('WhereCondition',whereCondition)
      //       const res = await api.post('/labourrequest/getTableTranslation', { whereId, columnNames,tableNames,whereCondition});
           
      //         console.log('resss',res.data.data)
      //       res.data.data.forEach(async (cell) => {
    
      //         Object.keys(cell).forEach(async(property) => {
      //           console.log('colm', cell[property]);
      //           const condition = `${property}_arb`
      //           const res5 = await api.post('/labourrequest/getTableTranslationArbValue', { whereId, condition,tableNames,whereCondition});
      //           console.log('res5',res5.data.data)
      //           res5.data.data.forEach(async(obj) => {
      //             console.log('obj',obj[condition])
      //             // Assuming you want to check the value of the 'company_name_arb' property
      //             if (obj[condition] === '' || obj[condition] === null) {
      //                try {
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
      //            console.log('trabsss', response.data.data.translations[0].translatedText);
      //           await api.post('/labourrequest/editRequestArb', {
      //             tableNames,
      //             whereId,
      //             whereCondition,
      //             // labour_request_id:id,
      //             [`${property}_arb`]: response.data.data.translations[0].translatedText,
      //             value: response.data.data.translations[0].translatedText,
      //         columnName:`${property}_arb`
      //           });
      //         } catch (error) {
      //           console.error('Error occurred during translation:', error);
      //         }
      //             } else {
      //               console.log('resnull');
      //             }
      //           });
      
             
      //       });
      //     });
      //     });
      //   });
      // });
      //   } catch (error) {
      //     console.error('Error fetching translation column names:', error);
      //   }
      // };
    
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
const selectedLanguage = getSelectedLanguageFromLocalStorage();

// Use the selected language value as needed
console.log('Selected language from localStorage:', selectedLanguage);

const arb =selectedLanguage === 'Arabic'

  // const eng =selectedLanguage === 'English'

  const [arabic, setArabic] = useState([]);

  const getArabicCompanyName = () => {
    api
    .get('/translation/getTranslationForCompany')
    .then((res) => {
      setArabic(res.data.data);
    })
    .catch(() => {
      // Handle error if needed
    });   
};

console.log('arabic',arabic)
useEffect(() => {
  getArabicCompanyName();
}, []);

let genLabel = '';

if (arb === true) {
  genLabel = 'arb_value';
} else {
  genLabel = 'value';
}

  const columns = [
    {
      name: 'id',
      selector: 'company_id',
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
      name: 'Flag',
      selector: 'flag',
      cell: () => <Icon.Flag />,
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
    {
      name: arabic.find(item => item.key_text === 'mdClient.companyName')?.[genLabel],
      selector: 'company_name',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdClient.email')?.[genLabel],
      selector: 'email',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdClient.status')?.[genLabel],
      selector: 'status',
      sortable: true,
      grow: 0,
    },
    {
      name: arabic.find(item => item.key_text === 'mdClient.phone')?.[genLabel],
      selector: 'phone',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
  ];

  const getClients = () => {
    api
      .get('/clients/getClients')
      .then((res) => {
        setClients(res.data.data);
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


  const updateFlag = (obj) => {
    obj.flag = !obj.flag;
    api
      .post('/clients/update-flag', obj)
      .then(() => {
        getClients();
        message('Flag updated successfully', 'success');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  useEffect(() => {
    getClients();
    
  }, []);

  return (
    <div className="MainDiv">
      <div className="pt-xs-25">
        <BreadCrumbs />
        <ToastContainer></ToastContainer>
        <CommonTranslationList tablevalue = {tablevalue} tableNameUni = {tableNameUni} whereCondition = {whereCondition}></CommonTranslationList>
        {/* <Button color="primary" className="shadow-none"  onClick={() => {
                  fetchTranslation();
                }}>
                Update Arb
              </Button> */}
        <CommonTable
          loading={loading}
          title="Client List"
          module='Client'
          Button={
            <Link to="/ClientDetails">
              <Button color="primary" className="shadow-none mr-2">
                Add New
              </Button>
            </Link>
          }
        >
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.selector}>{col.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {clients &&
              clients.map((element, i) => (
                <tr key={element.company_id}>
                  <td>{i + 1}</td>
                  <td>
                    <Link to={`/ClientEdit/${element.company_id}?tab=1`}>
                      <Icon.Edit2 />
                    </Link>
                  </td>
                  <td>
                    <span
                      onClick={() => {
                        updateFlag(element);
                      }}
                    >
                      <Flag value={element.flag ? 1 : 0} />
                    </span>
                  </td>
                  <td>{arb && element.company_name_arb ?element.company_name_arb : element.company_name}</td>
                  <td>{arb && element.email_arb ?element.email_arb : element.email}</td>
                  <td>{arb && element.status_arb ?element.status_arb : element.status}</td>
                  <td>{arb && element.phone_arb ?element.phone_arb : element.phone}</td>
                </tr>
              ))}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
};

export default Clients;

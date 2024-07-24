import { Col,Button} from 'reactstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import api from '../constants/api';

const CommonTranslationEdit = ({tablevalue,id,whereCondition}) => {
  CommonTranslationEdit.propTypes = {
    tablevalue: PropTypes.any,
    id: PropTypes.any,
    whereCondition: PropTypes.any,
  };
console.log('tablevalue',tablevalue)
console.log('id',id)
console.log('whereCondition',whereCondition)
  const fetchTranslation = async () => {
    try {
      tablevalue.forEach(async (table) => {
        console.log('tableName',table.name)
        const tableNames = table.name
        const res1 = await api.post('/commonApi/getTranslationColumnFromTables',{tableNames});
        res1.data.data.forEach(async (item) => {
        const columnNames = item.COLUMN_NAME_TRUNCATED;
        
        console.log('columnNames',columnNames)
        const whereId = id;
        // const whereCondition ='company_id'
        console.log('tableNames',tableNames)
        console.log('whereId',whereId)
        console.log('WhereCondition',whereCondition)
        const res = await api.post('/commonApi/getTableTranslation', { whereId, columnNames,tableNames,whereCondition});
       
        console.log('resss',res.data.data)
        res.data.data.forEach(async (cell) => {

          Object.keys(cell).forEach(async(property) => {
            console.log('colm', cell[property]);
            const condition = `${property}_arb` 
            console.log('condition',condition)
            const res5 = await api.post('/commonApi/getTableTranslationArbValue', { whereId, condition,tableNames,whereCondition});
            console.log('res5',res5.data.data)
            res5.data.data.forEach(async(obj) => {
            console.log('obj',obj[condition])
              // Assuming you want to check the value of the 'company_name_arb' property
              if (obj[condition] === '' || obj[condition] === null) {
                 try {
            const response = await axios.post(
              'https://translation.googleapis.com/language/translate/v2',
              {},
              {
                params: {
                  q:cell[property],
                  target: 'ar',
                  key: 'AIzaSyA_eJTEvBDRBHo8SYmq_2PyCh8s_Pl6It4', // Replace with your Google Translate API key
                },
              }
            );
             console.log('trabsss', response.data.data.translations[0].translatedText);
            await api.post('/commonApi/editRequestArb', {
              tableNames,
              whereId,
              whereCondition,
              // labour_request_id:id,
              [`${property}_arb`]: response.data.data.translations[0].translatedText,
              value: response.data.data.translations[0].translatedText,
              columnName:`${property}_arb`
            });
          } catch (error) {
            console.error('Error occurred during translation:', error);
          }
              } else {
                console.log('resnull');
              }
            });
         
        });
      });
      });
    });
    } catch (error) {
      console.error('Error fetching translation column names:', error);
    }
  };

  return (
   <>
    <Col>
              <Button
                className="shadow-none"
                color="primary"
                onClick={() => {
                  fetchTranslation();
               
                }}
              >
                Updates Arb
              </Button>
            </Col>
   </>
  );
};

export default CommonTranslationEdit;

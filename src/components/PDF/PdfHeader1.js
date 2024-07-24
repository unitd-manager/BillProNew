import React from '@react-pdf/renderer';
import PropTypes from 'prop-types';

const { View, Image, Text } = React;

const PdfHeader1 = ({ findCompany }) => {
  const styles = {
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    logo: {
      width: 160,
      height: 'auto', // Adjust this value accordingly
    },
    companyInfo: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
    companyText: {
      fontSize: 10,
      textAlign: 'right',
    },
  };
  
  return (
    <View style={styles.headerContainer}>
      <Image src={`${findCompany('cp.companyAddress1')}`} style={styles.logo}></Image> 
      <View style={styles.companyInfo}>
        <Text style={styles.companyText}>
          {`${findCompany('cp.companyAddress1')} ${findCompany('cp.companyAddress2')}`}
        </Text>
        <Text style={styles.companyText}>
          {`${findCompany('cp.companyAddress3')}\n${findCompany('cp.companyEmail')}`}
        </Text>
        <Text style={styles.companyText}>
          {`${findCompany('cv.newcompanyAddress1')} ${findCompany('cv.newcompanyAddress2')}`}
        </Text>
        <Text style={styles.companyText}>
          {`${findCompany('cv.newcompanyAddress3')}\n${findCompany('cv.newcompanyEmail')}`}
        </Text>
      </View>
    </View>
  );
};


PdfHeader1.propTypes = {
  findCompany: PropTypes.func.isRequired,
};

export default PdfHeader1;

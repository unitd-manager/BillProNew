import React, { useState } from 'react';
import { Col, FormGroup, Input } from 'reactstrap';

const Language = () => {
  // Use object destructuring for useState
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    // Initialize selectedLanguage with the value from localStorage, if available
    return localStorage.getItem('selectedLanguage') || '';
  });

  const handleLanguageChange = (e) => {
    const { value } = e.target;
    setSelectedLanguage(value);
    // Save selected language to localStorage
    localStorage.setItem('selectedLanguage', value);
    console.log('Selected language saved:', value);
    window.location.reload();
  };

  // Log the updated value of selectedLanguage after the state has been updated
  console.log('selectedLanguage', selectedLanguage);

  return (
    <Col md="7">
      <FormGroup>
        <Input
          type="select"
          name="category"
          value={selectedLanguage}
          onChange={handleLanguageChange}
        >
          <option value="">Please Select</option>
          <option value="English">English</option>
          <option value="Arabic">Arabic</option>
        </Input>
      </FormGroup>
    </Col>
  );
};

export default Language;

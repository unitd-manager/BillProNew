import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Convert = ({ text, }) => {
  const [convertedText, setConvertedText] = useState('');
  const [error, setError] = useState('');
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  const selectedLanguage = getSelectedLanguageFromLocalStorage();

  useEffect(() => {
    const fetchTranslation = async () => {
      try {
        const response = await axios.post(
          'https://translation.googleapis.com/language/translate/v2',
          {},
          {
            params: {
              q: text,
              target: selectedLanguage,
              key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM' // Replace with your Google Translate API key
            }
          }
        );
        setConvertedText(response.data.data.translations[0].translatedText);
        setError('');
      } catch (error) {
        setError('Translation failed. Please try again later.');
        console.error('Translation error:', error);
      }
    };

    fetchTranslation();
  }, [text, selectedLanguage]);

  return (
    <div>
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <div>{convertedText}</div>
      )}
    </div>
  );
};

export default Convert;

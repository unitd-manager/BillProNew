// GoogleTranslate.js
import axios from 'axios';

const API_KEY = 'YOUR_GOOGLE_TRANSLATE_API_KEY';
const API_URL = 'https://translation.googleapis.com/language/translate/v2';

const translateText = async (text, targetLanguage) => {
  const response = await axios.post(
    `${API_URL}?key=${API_KEY}`,
    {
      q: text,
      target: targetLanguage,
    }
  );

  return response.data.data.translations[0].translatedText;
};

export default translateText;
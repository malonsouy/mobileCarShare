import en_US from './en_US';
import es_ES from './es_ES';

//require('moment/locale/es');
const _langs = {en_US, es_ES};
const defaultLenguage = 'en_US';

const i18n = (text, lang = defaultLenguage) => {
  return _langs[lang][text.split('.')[0]][text.split('.')[1]];
};

export default i18n;

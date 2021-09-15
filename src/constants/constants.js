import enLocale from 'dayjs/locale/en';
import jaLocale from 'dayjs/locale/ja';

const constants = {
  enDayJSLocaleObj: {
    ...(enLocale || {}),
    formats: {
      ...(enLocale?.formats || {}),
      LTS: 'hh:mm:ss A',
      LT: 'hh:mm A',
      L: 'DD/MM/YYYY',
    },
  },
  jaDayJSLocaleObj: {
    ...(jaLocale || {}),
    formats: {
      ...(jaLocale?.formats || {}),
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'YYYY/MM/DD',
    },
  },
};
export default constants;

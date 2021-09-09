import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import constants from '../../constants/constants';
import i18nInstance from '../../setup/i18next';
import { capitalize } from '../index';

let locale = i18nInstance.language?.substring(0, 2);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.extend(updateLocale);
dayjs.locale(locale);
dayjs.updateLocale(
  locale,
  locale === 'en' ? constants.enDayJSLocaleObj : constants.jaDayJSLocaleObj,
);

const formatDate = (date) => date && dayjs(date).format('L');

const formatTime = (time) => time && dayjs(time).format('LT');

const formatDateAndTime = (date) => date && dayjs(date).format('L LT');

const formatDateBySpecifiedFormat = (date, format) =>
  date && format && dayjs(date).format(format);

const fromNow = (date) => dayjs(date).fromNow();

const toNow = (date) => dayjs(date).toNow();

const timeTo = (date) => {
  let returnValue = '-';
  if (date) {
    let today = dayjs();
    let checkingDate = dayjs(date);
    let diff = dayjs.duration(checkingDate.diff(today));

    let hoursDiff = parseInt(diff.asHours(), 10);

    let minutesDiff = parseInt(diff.asMinutes(), 10) % 60;

    if (hoursDiff > 24) {
      returnValue = capitalize(dayjs(date).toNow(true));
    } else {
      returnValue = `${hoursDiff} ${
        hoursDiff > 1 ? 'hours' : 'hour'
      } ${minutesDiff} ${minutesDiff > 1 ? 'minutes' : 'minute'}`;
    }
  }
  return returnValue;
};

export {
  formatDate,
  formatTime,
  formatDateAndTime,
  formatDateBySpecifiedFormat,
  fromNow,
  toNow,
  timeTo,
};

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import duration from 'dayjs/plugin/duration';
import constants from '../../constants/constants';
import i18nInstance from '../../setup/i18next';
import { capitalize } from '../index';

const locale = i18nInstance.language?.substring(0, 2);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.extend(updateLocale);
dayjs.extend(duration);
dayjs.locale(locale);
dayjs.updateLocale(
  locale,
  locale === 'en' ? constants.enDayJSLocaleObj : constants.jaDayJSLocaleObj,
);

const formatDate = (date) => (date ? dayjs(date).format('L') : '');

const formatTime = (time) => (time ? dayjs(time).format('LT') : '');

const formatDateAndTime = (date) => (date ? dayjs(date).format('L LT') : '');

const formatDateBySpecifiedFormat = (date, format) => (date ? format && dayjs(date).format(format) : '');

const fromNow = (date) => (date ? dayjs(date).fromNow() : '');

const toNow = (date) => (date ? dayjs(date).toNow() : '');

const timeTo = (date) => {
  let returnValue = '-';
  if (date) {
    const today = dayjs();
    const checkingDate = dayjs(date);
    const diff = dayjs.duration(checkingDate.diff(today));

    const hoursDiff = parseInt(diff.asHours(), 10);

    const minutesDiff = parseInt(diff.asMinutes(), 10) % 60;

    if (hoursDiff > 24) {
      returnValue = capitalize(dayjs(date).toNow(true));
    } else {
      returnValue = `${hoursDiff} ${
        hoursDiff === 1 ? 'hour' : 'hours'
      } ${minutesDiff} ${minutesDiff === 1 ? 'minute' : 'minutes'}`;
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

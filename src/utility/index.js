import {
  formatDate,
  formatTime,
  formatDateBySpecifiedFormat,
  formatDateAndTime,
  fromNow,
  timeTo,
  toNow,
} from './methods/date';
import { getToken, removeToken, saveToken } from './methods/localStorage';
import {
  getBaseURL,
  getFileExtensionFromName,
  getFileNameFromURL,
  getHeaderTitle,
  getSidebarMenuClasses,
  showToast,
  useStateCallback,
} from './methods/others';
import {
  capitalize,
  getStringWithDays,
  getStringWithHours,
  removeAllSpacesFromString,
  titleCase,
} from './methods/string';
import { sortingMethodIconMapper, statusToColorMapper } from './mappers/';

export {
  formatDate,
  formatTime,
  formatDateBySpecifiedFormat,
  formatDateAndTime,
  fromNow,
  toNow,
  timeTo,
  titleCase,
  capitalize,
  getFileNameFromURL,
  getStringWithDays,
  getStringWithHours,
  getFileExtensionFromName,
  removeAllSpacesFromString,
  getToken,
  saveToken,
  removeToken,
  useStateCallback,
  getHeaderTitle,
  getSidebarMenuClasses,
  getBaseURL,
  showToast,
  sortingMethodIconMapper,
  statusToColorMapper,
};

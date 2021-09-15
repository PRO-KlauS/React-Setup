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
  capitalizeSentence,
  getStringWithDays,
  getStringWithHours,
  removeAllSpacesFromString,
  snakeCaseToTitleCase,
} from './methods/string';
import { sortingMethodIconMapper, statusToColorMapper } from './mappers';

export {
  formatDate,
  formatTime,
  formatDateBySpecifiedFormat,
  formatDateAndTime,
  fromNow,
  toNow,
  timeTo,
  snakeCaseToTitleCase,
  capitalize,
  capitalizeSentence,
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

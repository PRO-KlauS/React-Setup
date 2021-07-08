import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';

dayjs.extend(relativeTime);

const formatDate = (date) => date && dayjs(date).format('DD-MM-YYYY');

const showToast = (message) =>
  message &&
  toast(message, {
    style: {
      background: '#333',
      color: '#fff',
    },
  });

const formatTime = (time) => time && dayjs(time).format('hh:mm A');

const formatDateAndTime = (date) =>
  date && dayjs(date).format('DD-MM-YYYY hh:mm A');

const formatDateBySpecifiedFormat = (date, format) =>
  date && format && dayjs(date).format(format);

const fromNow = (date) => dayjs(date).fromNow();

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

const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);

const titleCase = (s) => {
  let sentence = s && s.split('_');
  sentence = sentence && sentence.map((se) => capitalize(se));

  return sentence && sentence.join(' ');
};

const getFileNameFromURL = (url) => {
  let tempName =
    (url && url.split('/').pop().split('#')[0].split('?')[0]) || '';
  return tempName.replace(/%20/g, ' ');
};

const getStringWithDays = (s) => {
  let modifiedString = s || '-';
  if (modifiedString > 1) {
    modifiedString += ' days';
  } else if (modifiedString == 1) {
    modifiedString += ' day';
  }
  return modifiedString;
};

const getStringWithHours = (s) => {
  let modifiedString = s || '-';
  if (modifiedString > 1) {
    modifiedString += ' hours';
  } else if (modifiedString == 1) {
    modifiedString += ' hour';
  }
  return modifiedString;
};

const getFileExtensionFromName = (name) => {
  if (name) {
    let nameArray = name.split('.') || [];
    let extensionArray =
      (nameArray[nameArray.length - 1] &&
        nameArray[nameArray.length - 1].split('?')) ||
      [];
    return extensionArray[0] || '';
  }
};

const removeAllSpacesFromString = (s) => s && s.replace(/ /g, '');

const getToken = async () => {
  try {
    const token = await localStorage.getItem('TOKEN');
    if (token !== null) {
      return token;
    }
  } catch (e) {
    return e;
  }
};

const saveToken = async (token) => {
  try {
    await localStorage.setItem('TOKEN', token);
  } catch (e) {
    return e;
  }
};

const removeToken = async () => {
  try {
    await localStorage.removeItem('TOKEN');
  } catch (e) {
    return e;
  }
};

const useStateCallback = (initialState) => {
  const [state, setState] = useState(initialState);
  const cbRef = useRef(null); // mutable ref to store current callback

  const setStateCallback = (state, cb) => {
    cbRef.current = cb; // store passed callback to ref
    setState(state);
  };

  useEffect(() => {
    // cb.current is `null` on initial render, so we only execute cb on state *updates*
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null; // reset callback after execution
    }
  }, [state]);

  return [state, setStateCallback];
};

const getHeaderTitle = (path) => {
  if (path.match(/^\/profile/)) {
    return 'Manage Profile';
  } else if (path.match(/^\/dashboard/)) {
    return 'Dashboard';
  } else if (path.match(/^\/add-new-user/)) {
    return 'Add User';
  } else if (path.match(/^\/edit-user/)) {
    return 'Edit User';
  } else if (path.match(/^\/manage-users/)) {
    return 'Manage Users';
  }
  return 'Yet to be set';
};

const getSidebarMenuClasses = (path) => {
  let sidebarMenuClasses = {
    dashboard: '',
    manageUsers: '',
  };
  if (path.match(/^\/dashboard/)) {
    sidebarMenuClasses.dashboard = 'active';
  } else if (
    path.match(/^\/add-new-user/) ||
    path.match(/^\/manage-users/) ||
    path.match(/^\/edit-user/)
  ) {
    sidebarMenuClasses.manageUsers = 'active';
  }
  return sidebarMenuClasses;
};

const getBaseURL = () => {
  if (!process.env.REACT_APP_ENV) {
    return process.env.REACT_APP_LOCAL_URL;
  } else if (process.env.REACT_APP_ENV === 'staging') {
    return process.env.REACT_APP_STAGING_URL;
  } else if (process.env.NODE_ENV === 'production') {
    return process.env.REACT_APP_PRODUCTION_URL;
  }
};

export {
  formatDate,
  formatTime,
  formatDateBySpecifiedFormat,
  formatDateAndTime,
  fromNow,
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
};

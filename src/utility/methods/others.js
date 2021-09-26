import { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';

const showToast = (message) => message
  && toast(message, {
    style: {
      background: '#333',
      color: '#fff',
    },
  });

const getFileNameFromURL = (url) => {
  const tempName = url ? url.split('/').pop().split('#')[0].split('?')[0] : '';
  return tempName.replace(/%20/g, ' ');
};

const getFileExtensionFromName = (name) => {
  if (name) {
    const nameArray = name.split('.') || [];
    const extensionArray = (nameArray[nameArray.length - 1]
        && nameArray[nameArray.length - 1].split('?'))
      || [];
    return extensionArray[0] || '';
  } else {
    return '';
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
  if (/profile/.test(path)) {
    return 'Manage Profile';
  } else if (/dashboard/.test(path)) {
    return 'Dashboard';
  } else if (/add-new-user/.test(path)) {
    return 'Add User';
  } else if (/edit-user/.test(path)) {
    return 'Edit User';
  } else if (/manage-users/.test(path)) {
    return 'Manage Users';
  }
  return 'Yet to be set';
};

const getSidebarMenuClasses = (path) => {
  const sidebarMenuClasses = {
    dashboard: '',
    manageUsers: '',
  };
  if (/dashboard/.test(path)) {
    sidebarMenuClasses.dashboard = 'active';
  } else if (
    /add-new-user/.test(path)
    || /manage-users/.test(path)
    || /edit-user/.test(path)
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
  } else if (process.env.REACT_APP_ENV === 'production') {
    return process.env.REACT_APP_PRODUCTION_URL;
  } else {
    return '';
  }
};

export {
  showToast,
  getFileNameFromURL,
  getFileExtensionFromName,
  useStateCallback,
  getHeaderTitle,
  getSidebarMenuClasses,
  getBaseURL,
};

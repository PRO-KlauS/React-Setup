import moment from "moment";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";

const formatDate = (date) => date && moment(date).format("DD-MM-YYYY");

const showToast = (message) =>
  message &&
  toast(message, {
    style: {
      background: "#333",
      color: "#fff",
    },
  });

const formatTime = (time) => time && moment(time).format("hh:mm A");

const formatDateAndTime = (date) =>
  date && moment(date).format("DD-MM-YYYY hh:mm A");

const fromNow = (date) => moment(date).fromNow();

const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);

const getToken = async () => {
  try {
    const token = await localStorage.getItem("TOKEN");
    if (token !== null) {
      return token;
    }
  } catch (e) {
    return e;
  }
};

const saveToken = async (token) => {
  try {
    await localStorage.setItem("TOKEN", token);
  } catch (e) {
    return e;
  }
};

const removeToken = async () => {
  try {
    await localStorage.removeItem("TOKEN");
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
    return "Manage Profile";
  } else if (path.match(/^\/dashboard/)) {
    return "Dashboard";
  } else if (path.match(/^\/add-new-user/)) {
    return "Add User";
  } else if (path.match(/^\/edit-user/)) {
    return "Edit User";
  } else if (path.match(/^\/manage-users/)) {
    return "Manage Users";
  }
  return "Yet to be set";
};

const getSidebarMenuClasses = (path) => {
  let sidebarMenuClasses = {
    dashboard: "",
    manageUsers: "",
  };
  if (path.match(/^\/dashboard/)) {
    sidebarMenuClasses.dashboard = "active";
  } else if (
    path.match(/^\/add-new-user/) ||
    path.match(/^\/manage-users/) ||
    path.match(/^\/edit-user/)
  ) {
    sidebarMenuClasses.manageUsers = "active";
  }
  return sidebarMenuClasses;
};

const getBaseURL = () => {
  if (!process.env.REACT_APP_ENV) {
    return process.env.REACT_APP_LOCAL_URL;
  } else if (process.env.REACT_APP_ENV === "staging") {
    return process.env.REACT_APP_STAGING_URL;
  } else if (process.env.NODE_ENV === "production") {
    return process.env.REACT_APP_PRODUCTION_URL;
  }
};

export {
  formatDate,
  formatTime,
  getToken,
  saveToken,
  removeToken,
  capitalize,
  fromNow,
  useStateCallback,
  getHeaderTitle,
  getSidebarMenuClasses,
  getBaseURL,
  showToast,
  formatDateAndTime,
};

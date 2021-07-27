const SET_LANGUAGE = 'SET_LANGUAGE';
const changeLanguageAction = (language) => {
  return {
    type: SET_LANGUAGE,
    payload: language,
  };
};

export { changeLanguageAction, SET_LANGUAGE };

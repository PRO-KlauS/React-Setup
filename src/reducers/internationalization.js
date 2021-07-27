import { SET_LANGUAGE } from '../actions/internationalization';

const languageReducer = (language = 'en', action) => {
  switch (action.type) {
    case SET_LANGUAGE: {
      return action.payload;
    }
    default: {
      return language;
    }
  }
};

export default languageReducer;

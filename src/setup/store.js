import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer, { initialState } from './rootReducer';

const isDev = process.env.NODE_ENV !== 'production';

const persistConfig = {
  key: 'react_setup',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
// To add redux devtools extension support
const composeEnhancers = (typeof window !== 'undefined'
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
  || compose;

const middleware = [thunkMiddleware];
const enhancer = isDev
  ? composeEnhancers(applyMiddleware(...middleware))
  : applyMiddleware(...middleware);

const store = createStore(persistedReducer, initialState, enhancer);

const persistor = persistStore(store);

export default store;

export { persistor };

import React from 'react';
import Routes from './setup/routes';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import store, { persistor } from './setup/store';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'pretty-checkbox/src/pretty-checkbox.scss';
import 'react-pro-sidebar/dist/css/styles.css';
import './styles/index.scss';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
};

export default App;

import React from 'react';
import {LogBox, StatusBar} from 'react-native';
import Route from './source/screen/Navigation/Route';
import {Provider} from 'react-redux';
import store from './source/redux/Store/store';

LogBox.ignoreLogs(['Warning: ...']);
//Ignore all log notifications
LogBox.ignoreAllLogs();

const App = () => {
  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
};
export default App;

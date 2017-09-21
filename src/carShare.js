import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Provider } from 'react-redux';
import Store from './store/createStore';
import { Navigator } from './navigator';

class CaddieApp extends Component {

  render() {
    return (
    <Provider store={Store}>
      <Navigator />
    </Provider>
    );
  }
}

export default CaddieApp;

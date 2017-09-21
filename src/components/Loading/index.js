import React, { Component, PropTypes } from 'react';
import { ActivityIndicator, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';

class LoadingSpinner extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isFetching } = this.props;
    if (isFetching) {
      return (
        <Spinner
          visible={isFetching}
          overlayColor="rgba(0,0,0,0.55)"
          size={'large'}
          textStyle={{ color: '#FFF' }}
        />
      );
    }
    return null;
  }
}

const mapStateToLoading = state => {
  return {
    isFetching: state.isFetching
  };
};

const styles = EStyleSheet.create({});

export default connect(mapStateToLoading)(LoadingSpinner);

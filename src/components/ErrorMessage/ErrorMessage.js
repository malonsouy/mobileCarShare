import React, { Component } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { connect } from "react-redux";
import { setErrorMessage } from "../../actions";

class GenericModal extends Component {
  constructor(props) {
    super(props);
    this._hide = this._hide.bind(this);
  }

  render() {
    const { message, show } = this.props;
    const errorMessage = message && typeof message === "object"
      ? message.errorMessage
      : message;
    const component = show
      ? <TouchableOpacity onPress={this._hide} activeOpacity={0.5}>
          <View onPress={this._hide} style={styles.container}>
            <Text style={styles.message}>{errorMessage}</Text>
          </View>
        </TouchableOpacity>
      : null;

    return component;
  }

  _hide() {
    const { setErrorMessage } = this.props;
    setErrorMessage({ show: false });
  }
}

const styles = EStyleSheet.create({
  message: {
    fontFamily: "San Francisco Display",
    fontSize: 16,
    color: "white",
    width: "80%",
    textAlign: "center"
  },
  container: {
    marginTop: 5,
    marginBottom: 10,
    height: 100,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "$redError"
  }
});

const mapStateToLoading = state => {
  return {
    ...state.errorMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setErrorMessage: data => dispatch(setErrorMessage(data))
  };
};

export default connect(mapStateToLoading, mapDispatchToProps)(GenericModal);

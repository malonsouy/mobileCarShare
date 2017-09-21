import React, { Component, PropTypes } from 'react';
import { View, TextInput, findNodeHandle } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import TextInputState from 'react-native/lib/TextInputState';

class FormInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { style, error } = this.props;

    return (
      <TextInput
        {...this.props}
        underlineColorAndroid="transparent"
        placeholderTextColor="#7f9fbf"
        selectionColor={'black'}
        style={[styles.formInput, error ? styles.error : {}, style ? style : {}]}
      />
    );
  }
}

FormInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.bool
};

export function focusTextInput(node) {
  try {
    TextInputState.focusTextInput(findNodeHandle(node));
  } catch (e) {
    console.log("Couldn't focus text input: ", e.message);
  }
}

const styles = EStyleSheet.create({
  formInput: {
    paddingLeft: 8,
    color: '$inputColor',
    marginTop: 10,
    width: '90%',
    height: 44,
    borderWidth: 1,
    borderColor: '$inputColor',
    fontFamily: 'San Francisco Display',
    fontWeight: '500'
  },
  error: {
    borderColor: 'red'
  }
});

export default FormInput;

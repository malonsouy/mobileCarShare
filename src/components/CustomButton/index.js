import React, { Component, PropTypes } from 'react';
import {
  View,
} from 'react-native';
import { Button } from 'react-native-elements'

import EStyleSheet from 'react-native-extended-stylesheet';

class CustomButton extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {size, style, circle, type, textStyle} = this.props;
    return (
      <View style={styles.buttonContainer}>
        <Button
          buttonStyle={
            [styles.button,styles[size], styles[type]
            ,circle ? { height: styles['_' + size].width } : {}
            ,style ? style : {}]
          }
          textStyle= {[ styles.textDefault , textStyle ]}
          raised
          borderRadius={circle ? 100 : 20}
          {...this.props} />
      </View>
    );
  }
}

CustomButton.propTypes = {
  size: PropTypes.string.isRequired,
  style: PropTypes.object,
  circle: PropTypes.bool,
};

const styles = EStyleSheet.create({

  buttonContainer: {
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '$buttonDefault',
  },
  buttonGreen: {
    backgroundColor: '$greenCaddie',
  },
  buttonBlue: {
    backgroundColor: '$blueGolfer',
  },
  buttonGrey: {
    backgroundColor: '$itemGrey',
  },
  large: {
    width: '93%',
  },
  medium: {
    width: '64%',
  },
  small: {
    width: '35%',
  },
  textDefault: {
    fontWeight: '400',
    fontFamily: 'San Francisco Display'
  },

});

export default CustomButton;

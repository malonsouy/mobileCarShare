import React, { Component, PropTypes } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

class Checkbox extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const {style,checked,label,onPress,iconStyle,textStyle} = this.props;

    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
        <View style={[styles.checkbox, style]}>
          <Image
            style={[styles.image,iconStyle]}
            source={checked ? require('../../assets/icons/ic_radial_sm_sel.png') : 
                    require('../../assets/icons/ic_radial_sm.png')}
          />
          {label ? <Text style={[styles.text, textStyle]}>{label}</Text> : null}
        </View>
      </TouchableOpacity>
    );
  }
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  onPress: PropTypes.func,
  style: PropTypes.obj,
  iconStyle: PropTypes.obj,
  textStyle: PropTypes.obj,
  label: PropTypes.string
};

const styles = EStyleSheet.create({

  image: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 14,
    borderColor: '$buttonGrey',
    borderWidth: 1
  },
  text: {
    textAlign: 'left',
    marginLeft: 10,
    width: 90
  },
  checkbox: {
    flexDirection: 'row',
    height: 30,
    paddingLeft: 10
  },
  error: {
    borderColor: 'red',
  }
});

export default Checkbox;

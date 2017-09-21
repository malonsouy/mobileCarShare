import React, { Component } from 'react';
import { View, Text } from 'react-native';
import I18n from '../../utils/i18n';
import CStyle from '../../utils/commonStyles';
import CustomButton from '../../components/CustomButton';
import EStyleSheet from 'react-native-extended-stylesheet';

class Home extends Component {
  static navigationOptions = {
    header: {
      visible: false
    }
  };

  render() {
    return (
      <View style={styles.screen}>
        <Text style={CStyle.title}>Home</Text>
        <CustomButton
          onPress={() => this.props.navigation.navigate('SignUp')}
          type="buttonBlue"
          size="medium"
          title="Go to signup"
        />
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '$greenCaddie'
  },
  form: {
    height: '40%',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Home;

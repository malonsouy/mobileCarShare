import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import I18n from '../../utils/i18n';
import { Button } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import CustomButton from '../../components/CustomButton';
import { connect } from 'react-redux';

class SignUp extends Component {
  static navigationOptions = {
    headerVisible: false
  };

  componentWillMount() {
    const { userData } = this.props;
    if (userData && userData._id) {
      this.props.navigation.navigate('BookCaddie');
    }
  }

  render() {
    return (
      <Image style={styles.container} source={require('../../images/Login-Bg.png')}>
        <View style={styles.header}>
          <Button
            onPress={() => this.props.navigation.navigate('Login')}
            textStyle={styles.loginText}
            buttonStyle={styles.login}
            backgroundColor="transparent"
            title="Log In"
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.welcome}>{I18n('signUp.title')}</Text>
          <Text style={styles.subtitle}>{I18n('signUp.subtitle')}</Text>
          <Text style={styles.text}>{I18n('signUp.text')}</Text>
        </View>
        <View style={styles.startSection}>
          <Text style={styles.getStarted}>Get started</Text>
          <CustomButton
            onPress={() => this.props.navigation.navigate('GolferAccountForm')}
            type="buttonBlue"
            size="medium"
            title="I am a Golfer"
          />
          <CustomButton
            type="buttonGreen"
            size="medium"
            onPress={() => this.props.navigation.navigate('CaddieAccountForm')}
            title="I am a Caddie"
          />
        </View>
        <View style={styles.emptySpace} />
      </Image>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end'
  },
  emptySpace: {
    height: '2%'
  },
  section: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  startSection: {
    height: '25%',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  createButton: {
    marginTop: 5
  },
  welcome: {
    fontSize: 56,
    textAlign: 'center',
    color: 'white',
    margin: 10,
    backgroundColor: 'transparent',
    '@media ios': {
      fontFamily: 'MichiganState'
    },
    '@media android': {
      fontFamily: 'michigan'
    },
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    backgroundColor: 'transparent',
    fontFamily: 'San Francisco Display',
    fontWeight: 'bold'
  },
  text: {
    fontSize: 15,
    color: 'white',
    width: '65%',
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontFamily: 'San Francisco Display',
    fontWeight: '300'
  },
  getStarted: {
    fontSize: 17,
    color: 'white',
    width: '65%',
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontFamily: 'San Francisco Display'
  },
  loginText: {
    fontSize: 15,
    fontFamily: 'Asap',
    fontWeight: 'bold'
  },
  login: {
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: -20
  }
});

const mapStateToProps = state => {
  return {
    userData: state.userData
  };
};

export default connect(mapStateToProps, null)(SignUp);

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import I18n from '../../utils/i18n';
import CStyle from '../../utils/commonStyles';
import FormInput from '../../components/FormInput';
import ErrorMessage from '../../components/ErrorMessage';
import CustomButton from '../../components/CustomButton';
import EStyleSheet from 'react-native-extended-stylesheet';
import { userLogin, navigate } from '../../actions';
import { connect } from 'react-redux';
import Utils from '../../utils/Utils';
import { focusTextInput } from '../../components/FormInput';

import Loading from '../../components/Loading';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: {
        value: '',
        type: 'email',
        error: false
      },
      password: {
        value: '',
        type: 'password',
        error: false
      }
    };

    this._logIn = this._logIn.bind(this);
  }

  static navigationOptions = {
    headerVisible: true,
    headerTintColor: 'white',
    headerStyle: { backgroundColor: '#488b2d' }
  };

  render() {
    const { email, password } = this.state;
    const { navigation: { navigate } } = this.props;
    return (
      <View style={styles.screen}>
        <Loading />
        <Text style={CStyle.title}>{I18n('login.title')}</Text>
        <ErrorMessage />
        <View style={styles.form}>
          <Text style={[CStyle.formTitle, { marginTop: 20 }]}>{I18n('login.email')}</Text>
          <FormInput
            placeholder={I18n('placeHolder.email')}
            ref="email"
            keyboardType="email-address"
            value={email.value}
            error={email.error}
            returnKeyType="next"
            autoCapitalize="none"
            onSubmitEditing={() => focusTextInput(this.refs.password)}
            onChangeText={email => this.setState({
              email: { value: email, type: 'email', error: false }
            })}
          />
          <View style={styles.titleForgot}>
            <Text style={[CStyle.formTitle, { marginTop: 20 }]}>
              {I18n('login.password')}
            </Text>
            <Text 
              style={styles.forgot}
              onPress={() => navigate('ForgotPassword')} >
              Forgot?
            </Text>
          </View>
          <FormInput
            placeholder={I18n('placeHolder.password')}
            secureTextEntry={true}
            style={styles.passwordInput}
            returnKeyType="send"
            ref="password"
            value={password.value}
            error={password.error}
            onSubmitEditing={this._logIn}
            onChangeText={password => this.setState({
              password: { value: password, type: 'password', error: false }
            })}
          />
        </View>
        <CustomButton
          onPress={this._logIn}
          style={CStyle.screenBottom}
          size="medium"
          title={I18n('login.title')}
        />
      </View>
    );
  }

  _logIn() {
    const { userLogin } = this.props;
    const { email, password } = this.state;
    const result = Utils.validateForm(this.state);
    if (!result.valid) {
      this.setState(result.form);
    } else {
      userLogin({ email: email.value, password: password.value });
    }
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
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleForgot: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  forgot: {
    marginBottom: -3,
    fontFamily: 'San Francisco Display',
    fontSize: 12,
    alignSelf: 'flex-end',
    color: 'white',
    fontWeight: 'bold'
  },
  passwordInput: {
    marginTop: 0
  }
});

const mapDispatchToProps = dispatch => {
  return {
    userLogin: data => dispatch(userLogin(data))
  };
};

export default connect(null, mapDispatchToProps)(Login);

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import I18n from '../../utils/i18n';
import CStyle from '../../utils/commonStyles';
import FormInput from '../../components/FormInput';
import ErrorMessage from '../../components/ErrorMessage';
import CustomButton from '../../components/CustomButton';
import EStyleSheet from 'react-native-extended-stylesheet';
import { requestNewPassword } from '../../actions';
import { connect } from 'react-redux';
import Utils from '../../utils/Utils';
import Loading from '../../components/Loading';
import GenericModal from '../../components/Modal';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: {
        value: '',
        type: 'email',
        error: false
      }
    };

    this._onSubmit = this._onSubmit.bind(this);
  }

  static navigationOptions = {
    headerVisible: true,
    headerTintColor: 'white',
    headerStyle: { backgroundColor: '#488b2d' }
  };

  render() {
    const { email } = this.state;
    return (
      <View style={styles.screen}>
        <Loading />
        <Text style={CStyle.title}>{I18n('forgotPassword.title')}</Text>
        <Text style={CStyle.subTitle}>{I18n('forgotPassword.subtitle')}</Text>
        <ErrorMessage />
        <View style={styles.form}>
          <Text style={[CStyle.formTitle, { marginTop: 20 }]}>{I18n('login.email')}</Text>
          <FormInput
            placeholder={I18n('placeHolder.email')}
            keyboardType="email-address"
            value={email.value}
            error={email.error}
            returnKeyType="send"
            autoCapitalize="none"
            onSubmitEditing={this._onSubmit}
            onChangeText={email => this.setState({
              email: { value: email, type: 'email', error: false }
            })}
          />
        </View>
        <CustomButton    
          onPress={this._onSubmit}   
          style={CStyle.screenBottom}
          size="medium"
          title="Send"
        />
        <GenericModal/>
      </View>
    );
  }

  _onSubmit() {
    const { requestNewPassword } = this.props;
    const { email } = this.state;
    const result = Utils.validateForm(this.state);
    if (!result.valid) {
      this.setState(result.form);
    } else {
     requestNewPassword(email.value);
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
    height: '30%',
    width: '90%',
    justifyContent: 'flex-start',
    marginTop: 20,
    alignItems: 'center'
  }
});

const mapDispatchToProps = dispatch => {
  return {
    requestNewPassword: data => dispatch(requestNewPassword(data))
  };
};

export default connect(null, mapDispatchToProps)(ForgotPassword);

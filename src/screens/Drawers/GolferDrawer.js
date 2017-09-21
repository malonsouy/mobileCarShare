import React, { Component } from 'react';
import { View, Text, Image, Linking } from 'react-native';
import I18n from '../../utils/i18n';
import EStyleSheet from 'react-native-extended-stylesheet';
import MenuItem from './MenuItem';
import CustomButton from '../../components/CustomButton';
import { logout, updateUser, resetStackNavigatorTo } from '../../actions';
import { connect } from 'react-redux';

class GolferDrawer extends Component {
  constructor(props) {
    super(props);

    this._logout = this._logout.bind(this);
    this._onChangeNote = this._onChangeNote.bind(this);    
  }

  static navigationOptions = {
    header: {
      visible: false
    }
  };

  render() {
    const { navigation: { navigate }, notificationOn, resetStackNavigatorTo } = this.props;

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.logo}>{I18n('signUp.title')}</Text>
          <View style={styles.options}>
            <MenuItem
              icon={require('../../assets/left-menu/menu_home.png')} 
              text="Home"
              onPress={() => resetStackNavigatorTo('GolferHome')}
            />
            <MenuItem
              iconStyle={{ marginLeft:9, marginRight:9, width:23,height:23}}
              icon={require('../../assets/left-menu/menu_caddies.png')}
              text="Caddies"
              onPress={() => navigate('CaddiesContacts')}
            />
            <MenuItem
              icon={require('../../assets/left-menu/menu_personalinfo.png')}
              text="Personal Info"
              onPress={() => navigate('EditGolferAccount')}
            />
            <MenuItem
              icon={require('../../assets/left-menu/menu_paymentinfo.png')}
              text="Payment Info"
              onPress={() => navigate('EditCardForm')}
            />
            <MenuItem
              icon={require('../../assets/left-menu/menu_notifications.png')}
              text="Notifications" onSwitchChange={this._onChangeNote}
              notificationOn={notificationOn}
              onPress={() => navigate('GolferNotifications')}
            />
            <MenuItem 
              icon={require('../../assets/left-menu/menu_faq.png')} 
              text="FAQ"
              onPress={() => navigate('FaqView')} />
            <MenuItem 
              icon={require('../../assets/left-menu/menu_contact.png')} 
              text="Contact Us"
              onPress={() => Linking.openURL("mailto:hi@dixtra.co")}
            />
          </View>
        </View>

        <CustomButton
          type="buttonGreen"
          buttonStyle={styles.logout}
          textStyle={styles.logoutText}
          size="medium"
          onPress={this._logout}
          title="Log Out"
        />
      </View>
    );
  }

  _onChangeNote(value) {
    const { updateUser } = this.props;
    updateUser({pushNotificationsOn: value });
  }

  _logout() {
    this.props.logout();
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    marginTop: -20,
    paddingTop: 40,
    backgroundColor: '$blueGolfer',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2000
  },
  logoutText: {
    color: '#e3e4e8',
    fontFamily: 'San Francisco Display',
    fontSize: 16
  },
  logout: {
    marginBottom: 30,
    width: 200,
    borderRadius: 120,
    backgroundColor: 'transparent',
    borderWidth: 0.5,
    borderColor: '#e3e4e8'
  },
  options: {
    marginTop: 20
  },
  logo: {
    fontSize: 36,
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
  }
});

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    updateUser: (data) => dispatch(updateUser(data)),
    resetStackNavigatorTo: (screen) => dispatch(resetStackNavigatorTo(screen))
  };
};

const mapStateToDrawer = state => {
  return {
    notificationOn: state.userData.pushNotificationsOn,
  };
};

export default connect(mapStateToDrawer, mapDispatchToProps)(GolferDrawer);

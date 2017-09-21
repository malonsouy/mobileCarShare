import React, { Component } from 'react';
import { TouchableOpacity, View, Text,Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

class MenuButton extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {navigate} = this.props;
    return(
      <TouchableOpacity onPress={() => navigate('DrawerOpen')}>
        <Image source={require('../../assets/nav/nav_menu.png')} style={{marginLeft: 7,}}/>
      </TouchableOpacity>
    );
  }
  
}


const styles = EStyleSheet.create({
  message: {
    fontFamily: 'San Francisco Display',
    fontSize: 16,
    color : 'white',
    width: '80%',
    textAlign: 'center',
  },
  container: {
    marginTop: 10,
    marginBottom: -20,
    height:100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$redError',
  }
});

export default MenuButton;

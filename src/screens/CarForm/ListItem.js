import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import I18n from '../../utils/i18n';
import CStyle from '../../utils/commonStyles';
import CustomButton from '../../components/CustomButton';
import EStyleSheet from 'react-native-extended-stylesheet';
import { navigate } from '../../actions';
import { connect } from 'react-redux';

class ListItem extends Component {

  constructor (props) {
    super(props)
    this.state = {imageLoaded: false}
  }

  handleLoad () {
    this.setState({imageLoaded:true})
  }

  render() {
    const { onRemove, carKey } = this.props;
    const {imageLoaded} = this.state;
    return (
      <View style={styles.item}>
        <Image
          style={styles.image}
          onLoad={this.handleLoad.bind(this)}
          source={require('../../assets/icons/user_avatar.jpg')}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{carKey["owner-name"]}</Text>
          <View style={styles.exp}>
            <Text style={styles.years}>{carKey.id}</Text>
            <Text style={styles.subtitle}>Tarjeta</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => onRemove(carKey)} activeOpacity={0.5}>
          <Image style={styles.button} source={require('../../assets/icons/remove_item.png')} />
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = EStyleSheet.create({
  name: {
    fontFamily: 'San Francisco Display',
    fontSize: 20,
    marginTop: 7
  },
  subtitle: {
    fontFamily: 'San Francisco Display',
    marginTop: 7,
    fontSize: 12,
    color: '$itemGrey'
  },
  years: {
    fontFamily: 'San Francisco Display',
    marginTop: 6,
    marginRight: 6,
    fontWeight: 'bold',
    fontSize: 13,
    color: '$itemGrey'
  },
  exp: {
    flexDirection: 'row'
  },
  image: {
    borderRadius: 25,
    height: 50,
    width: 50
  },
  button: {
    marginLeft: 5,
    height: 50,
    width: 50
  },

  info: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  item: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white'
  }
});
const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(null, null)(ListItem);

import React, { Component } from 'react';
import {View,Text,Image,TouchableOpacity} from 'react-native';
import { Button } from 'react-native-elements'
import I18n from '../../utils/i18n';
import CStyle from '../../utils/commonStyles';
import CustomButton from '../../components/CustomButton';
import EStyleSheet from 'react-native-extended-stylesheet';
import { navigate } from '../../actions';
import { connect } from 'react-redux';
import moment from 'moment';
import Utils from '../../utils/Utils';

class CaddieListItem extends Component {

  render() {
    const {onSelect, notification, notification: {round}} = this.props;
    let date, monthDate, time;
    
    if (notification.type !== 'tip'){
      date = moment(round.scheduleTime).format('llll').split(' ')[0].split(',')[0].toUpperCase();
      monthDate = moment(round.scheduleTime).format('ll').split(',')[0].toUpperCase();
      time = moment(round.scheduleTime).format('LT').toUpperCase();      
    }

    return (
    <TouchableOpacity onPress={() => onSelect()} activeOpacity={0.5}>
      <View style={styles.item}>
        <View style={styles.info}>
          <Text style={styles.name} >{notification.creator.name}</Text>
          <Text style={styles.notification} >{` ${notification.message}`}</Text>
          {notification.type !== 'tip' ?
            [<Text style={styles.notification} >{` ${date} ${monthDate} @ ${time}`}</Text>
            ,<Text style={styles.details}>
              {` ${Utils.capitalize(round.type)} | ${round.bags ? round.bags+" Bags |"  : ''} ${round.putters} Putters`}
              </Text>]
            : null
          }
        </View>
        <Image
          style={styles.button}
          source={require('../../assets/misc/cell_arrow.png')}
        />
      </View>
    </TouchableOpacity>
    );
  }
}
const styles = EStyleSheet.create({
  name: {
    fontFamily: 'San Francisco Display',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5
  },
  notification: {
    alignSelf: 'center'
  },
  image:{
    borderRadius: 25,
    height: 50,
    width: 50,
  },
  info: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '80%'
  },
  item: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  }
});

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(null, mapDispatchToProps)(CaddieListItem);

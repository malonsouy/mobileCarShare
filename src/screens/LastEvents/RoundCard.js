import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import I18n from '../../utils/i18n';
import CustomButton from '../../components/CustomButton';
import EStyleSheet from 'react-native-extended-stylesheet';
import moment from 'moment';
import Utils from '../../utils/Utils';

class CarItem extends Component {
  render() {
    const { onAccept, onDecline, car, onStart, onComplete } = this.props;
    //const { putters, bags, amount } = car;

    //const date = moment(car.scheduleTime).format('llll').split(' ')[0].toUpperCase();
    //const monthDate = moment(car.scheduleTime).format('ll').split(',')[0].toUpperCase();
    //const time = moment(car.scheduleTime).format('LT').toUpperCase();

    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Image
            style={styles.backgroundImage}
            source={
              {uri:car.image}//require('../../assets/icons/user_avatar.jpg')
            }
          />
          <View style={styles.cardHeader}>

            <Text style={styles.overlayText}>{car.name}</Text>
            <Text style={car.state === 1 ? styles.stateRed : styles.state}>{car.state === 1 ? "Sin conexión" : "Disponible"}</Text>
            <Text style={styles.comments}>
              {'7 llaves asignadas'}
            </Text>
          </View>
          <View style={[styles.row, styles.buttons]}>
            {onStart ?
              <CustomButton style={styles.transparent} onPress={() => onStart(car)} type="buttonBlue" size="medium" title="Start car" /> :
              onComplete ?
              <CustomButton onPress={() => onComplete(car)} type="buttonGreen" size="medium" title="Complete car" /> :            
              [<CustomButton  onPress={() => onAccept(car)} type="buttonBlue" size="small" title="Edit" />
              ,<CustomButton onPress={() => onDecline(car)} type="buttonGreen" size="small" title="Add key" />]
            }
          </View>
        </View>

      </View>
    );
  }
}

const styles = EStyleSheet.create({
  transparent:{
    backgroundColor: 'transparent',
  },
  container: {
    height: 180,
    flex: 1,
    width: '100%'
  },
  card: {
    marginTop: 20,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    height: 160,
    alignItems: 'center',

  },
  row: {
    flexDirection: 'row',
  },
  cardHeader: {
    width: '80%',
    position: 'absolute',
    top: 0,
    flexDirection: 'column',
    justifyContent:"flex-start"
  },
  overlayText: {
    textShadowColor: "black",
    textShadowOffset: {width: 1.5, height: 1.5},
    marginTop: 5,
    color: 'white',
    fontFamily: 'San Francisco Display',
    fontSize: 20,
    marginLeft: 20
  },
  state: {
    color: 'white',
    marginTop: 15,
    fontFamily: 'San Francisco Display',
    fontSize: 16,
    textShadowColor: "$greenCaddie",
    textShadowOffset: {width: 1.5, height: 1.5},
    marginLeft: 20
  },
  stateRed: {
    color: 'white',
    marginTop: 15,
    fontFamily: 'San Francisco Display',
    fontSize: 16,
    textShadowColor: "red",
    textShadowOffset: {width: 1.5, height: 1.5},
    marginLeft: 20
  },
  comments: {
    color: 'white',
    marginTop: 10,
    marginLeft: 20,
    fontFamily: 'San Francisco Display',
    fontSize: 14,
    textShadowColor: "$blueGolfer",
    textShadowOffset: {width: 1.5, height: 1.5},
  },
  icon: {
    height: 20,
    width: 20,
    marginTop: 10,
    marginRight: 10,
    marginBottom: -22,
    alignSelf: 'flex-end'
  },
  backgroundImage: {
    flex: 1,
    opacity: 0.4,
    width: '100%',
    height: '90%',
    resizeMode: 'cover', // or 'stretch'
    backgroundColor: 'rgba(0,0,0,1)'
  },
  image: {
    borderRadius: 25,
    height: 50,
    width: 50,
    marginRight: 20
  },

  monthDate: {
    marginTop: 5,
    color: 'black',
    marginLeft: 5,
    fontFamily: 'San Francisco Display',
    fontWeight: 'bold',
    fontSize: 20
  },
  details: {
    marginTop: 5,
    color: '$itemGrey',
    fontFamily: 'San Francisco Display',
    fontSize: 13
  },
  buttons: {
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 3,
  }
});

export default CarItem;

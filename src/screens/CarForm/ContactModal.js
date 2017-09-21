import React, { Component } from 'react';
import { Platform, View, Text, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import CustomButton from '../../components/CustomButton';
import Modal from 'react-native-modalbox';
import { connect } from 'react-redux';

class GenericModal extends Component {

  render() {

    const {show, onCancel, onCall, onText} = this.props;

    return (
      <Modal
        style={styles.modal}
        position={'bottom'}
        isOpen={show}
        swipeToClose={false}
        backdropPressToClose={false}
      >
        <View style={styles.topSection} >
          <TouchableOpacity activeOpacity={0.8} style={styles.callButton}
          onPress={onCall}>
            <Text style={styles.title}>Call Caddie</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.textButton}
          onPress={onText}>
            <Text style={styles.title}>Text Caddie</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity activeOpacity={0.8} style={styles.cancelButton}
        onPress={onCancel}>
          <Text style={styles.title}>Cancel</Text>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const styles = EStyleSheet.create({
  title: {
    fontFamily: 'San Francisco Display',
    color: '$modalBlue',
    fontSize: 20
  },
  image: {
    marginBottom: 10,
    height: 140,
    width: '90%'
  },
  modal: {
    bottom: '44%',
    height: '40%',
    width: '95%',
    position: 'absolute', 
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  topSection: {
    height: 120,
    width: '95%',
    borderRadius: 10, 
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    height: 60,
    width: '95%',
    borderRadius: 10, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  callButton: {
    height: 60,
    width: '95%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$modalGrey'
  },
  textButton: {
    height: 60,
    width: '95%',
    borderTopWidth: 1,
    borderTopColor: '#bdc1bf',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$modalGrey'
  }
});

export default GenericModal;

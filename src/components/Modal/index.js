import React, { Component } from 'react';
import { Platform, View, Image, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import CustomButton from '../../components/CustomButton';
import Modal from 'react-native-modal'
import { connect } from 'react-redux';
import { setModal } from '../../actions';

class GenericModal extends Component {
  constructor(props) {
    super(props);
    this._confirm = this._confirm.bind(this);
  }

  render() {
    const { title, message, show } = this.props;

    return (
      <Modal
        style={styles.modal}
        isVisible={show}
        backdropOpacity={0.5}
      >
        <Image style={styles.image} source={require('../../images/Modal-back.png')} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <CustomButton
          style={styles.button}
          onPress={this._confirm}
          type="buttonBlue"
          size="medium"
          title="Okay"
        />
      </Modal>
    );
  }
  
  _confirm () {
    const { dispatch, onConfirm } = this.props;
    const data = {
      show: false,
    }
    dispatch(setModal(data));
    if(onConfirm){
      onConfirm(dispatch);
    }
  }  

}

const styles = EStyleSheet.create({
  message: {
    fontFamily: 'San Francisco Display',
    fontSize: 16,
    height: 58,
    width: '80%',
    textAlign: 'center',
    marginTop: 12
  },
  button: {
    marginTop: 10
  },
  title: {
    marginTop: 5,
    fontFamily: 'San Francisco Display',
    color: '$greenCaddie',
    fontSize: 25
  },
  image: {
    marginBottom: 10,
    height: 140,
    width: '90%'
  },
  modal: {
    marginTop: 110,
    height: (Platform.OS === 'ios') ? 300 : 350,
    width: '90%',
    position: 'absolute', 
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white'
  }
});

const mapStateToLoading = state => {
  return {
    ...state.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setModal: data => dispatch(setModal(data))
  };
};

export default connect(mapStateToLoading,null)(GenericModal);

import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import Camera from 'react-native-camera';
import EStyleSheet from 'react-native-extended-stylesheet';
import { signUpUser } from '../../actions';
import { connect } from 'react-redux';

class PhotoCamera extends Component {
  constructor(props){
    super(props);

    this.state = {
      currentCamera: 'back'
    };

    this.changeCamera = this.changeCamera.bind(this);
  }

  render() {
    const {currentCamera} = this.state;

    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          captureTarget={Camera.constants.CaptureTarget.disk}
          aspect={"fill"}
          type={currentCamera} >
          <TouchableOpacity 
            activeOpacity={0.5} 
            style={styles.capture} 
            onPress={this.takePicture.bind(this)} /> 
          <TouchableOpacity 
            activeOpacity={0.5} 
            style={styles.changeCamera} 
            onPress={this.changeCamera} >
            <Image
              style={styles.cameraIcon}
              source={require('../../assets/icons/rotate.png')} />
          </TouchableOpacity>
        </Camera>
      </View>
    );
  }

  takePicture() {
    this.camera.capture()
      .then((data) => this.props.callback(data))
      .catch(err => alert(err));
  }

  changeCamera() {
    const {currentCamera} = this.state;
    const newCamera = (currentCamera == 'back') ? 'front' : 'back';
    this.setState({currentCamera: newCamera});
  }

}

const styles = EStyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  capture: {
    flex: 0,
    backgroundColor: '$greenCaddie',
    height: 80,
    width: 80,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: '#144400',
    marginBottom: 20
  },
  changeCamera: {
    flex: 0,
    position: 'absolute',
    top: 40,
    right: 40  
  },
  cameraIcon: {
    width: 30,
    height: 30
  }
});

const mapDispatchToProps = (dispatch) => {
  return {
    signUpUser: (data) => dispatch(signUpUser(data)),
  };
};

export default connect(null, mapDispatchToProps)(PhotoCamera);

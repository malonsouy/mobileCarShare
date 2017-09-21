import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
  findNodeHandle,
  Platform
} from "react-native";
import I18n from "../../utils/i18n";
import CStyle from "../../utils/commonStyles";
import FormInput from "../../components/FormInput";
import CustomButton from "../../components/CustomButton";
import Loading from "../../components/Loading";
import EStyleSheet from "react-native-extended-stylesheet";
import ImagePicker from "react-native-image-picker";
import { signUpUser } from "../../actions";
import {
  KeyboardAwareScrollView
} from "react-native-keyboard-aware-scroll-view";
import { saveScreenData, navigate } from "../../actions";
import { connect } from "react-redux";
import Utils from "../../utils/Utils";
import { focusTextInput } from "../../components/FormInput";
import ErrorMessage from "../../components/ErrorMessage";
import CheckBox from "../../components/Checkbox/Checkbox";
import ImageResizer from "react-native-image-resizer";

const pickerOptions = {
  title: "Select Profile image",
  noData: true,
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};

class CarForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: {
        value: "",
        type: "name",
        error: false
      },
      number: {
        value: null,
        type: "number",
        error: false
      },
      showCamera: false,
      imageData: null,
      imageError: false,
      terms: false
    };

    this._continue = this._continue.bind(this);
  }

  static navigationOptions = {
    headerVisible: true,
    title: "New car",
    headerTintColor: 'white',
    headerStyle: { backgroundColor: '#7f9fbf' }
  };

  render() {
    const {
      name,
      number,
      showCamera,
      imageData,
      imageError,
      terms
    } = this.state;

    return (
      <KeyboardAwareScrollView ref="scroll" style={styles.scroll}>
        <Loading />
        <View style={styles.screen}>
          <ErrorMessage />
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              {!imageData
                ? <TouchableOpacity
                    style={[
                      styles.photo,
                      !imageError ? styles.photo : styles.circleError
                    ]}
                    onPress={this._showCamera.bind(this)}
                  >
                    <View>
                      <Text style={styles.plus}>+</Text>
                      <Text style={styles.subTitle}>Add Profile Photo</Text>
                    </View>
                  </TouchableOpacity>
                : <TouchableOpacity
                    style={styles.photo}
                    onPress={this._showCamera.bind(this)}
                  >
                    <Image
                      style={styles.image}
                      source={{ uri: imageData.path }}
                    />
                  </TouchableOpacity>}

            </View>
              <FormInput
                placeholder={"Name"}
                error={name.error}
                ref="firstName"
                value={name.value}
                returnKeyType="next"
                autoCapitalize="words"
                onSubmitEditing={() => focusTextInput(this.refs.lastName)}
                onChangeText={name =>
                  this.setState({
                    name: { value: name, type: "name", error: false }
                  })}
              />
            <FormInput
              placeholder={"IP address"}
              error={number.error}
              ref="number"
              value={number.value}
              returnKeyType="next"
              keyboardType="numeric"
              onSubmitEditing={() => focusTextInput(this.refs.numberFourDigits)}
              onChangeText={number =>
                this.setState({
                  number: { value: number, type: "number", error: false }
                })}
            />
            <Text style={CStyle.formTitle}>
              {"KEYS"}
            </Text>
          </View>
          <View style={styles.form}>


          </View>
          <CustomButton
            onPress={this._continue}
            style={styles.keyButton}
            size="small"
            title="Add Key"
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }

  _showCamera(imageData) {
    ImagePicker.showImagePicker(pickerOptions, response => {
      if (response.uri) {
        ImageResizer.createResizedImage(
          response.uri.replace("file:", ""),
          300,
          300,
          "JPEG",
          80,
          response.originalRotation
        )
          .then(resizedImageUri => {
            this.setState({
              imageData: { path: resizedImageUri },
              showCamera: false,
              isImageNull: true
            });
          })
          .catch(err => {
            alert(err);
          });
      }
    });
  }

  _continue() {

  }
}
const styles = EStyleSheet.create({
  scroll: {
    backgroundColor: "white"
  },
  screen: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "white"
  },
  checkIcon: {
    backgroundColor: "$greenCaddie"
  },
  photo: {
    justifyContent: "center",
    width: "90%",
    borderWidth: 1,
    borderColor: "#7f9fbf",
    marginTop: 11,
    height: 148,
  },
  circleError: {
    borderColor: "red"
  },
  image: {
    borderColor: "white",
    borderRadius: 9,
    width: "90%",
    height: 148,
  },
  nameInput: {
    width: "90% - 108",
    alignSelf: "flex-start"
  },
  checkbox: {
    paddingLeft: 0,
    alignItems: "center",
    borderWidth: 0,
    marginLeft: 0,
    width: "90%",
    marginBottom: 30,
    marginTop: 20
  },
  checkText: {
    width: "80%",
    color: "white"
  },
  form: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center"
  },
  inputContainer: {
    flexDirection: "row",
    alignSelf: "center"
  },
  columnContainer: {
    flexDirection: "column",
    width: "90% - 98"
  },
  login: {
    fontSize: 20,
    alignSelf: "flex-end",
    marginRight: 20
  },
  plus: {
    alignSelf: "center",
    color: "white",
    fontSize: 40,
    backgroundColor: "transparent",
    color: "$placeholderDefault",
    fontFamily: "San Francisco Display"
  },
  subTitle: {
    color: "white",
    fontSize: 15,
    color: "$placeholderDefault",
    fontFamily: "San Francisco Display",
    backgroundColor: "transparent",
    textAlign: "center",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20
  }
});

const mapDispatchToProps = dispatch => {
  return {
    signUpUser: data => dispatch(signUpUser(data))
  };
};

export default connect(null, mapDispatchToProps)(CarForm);

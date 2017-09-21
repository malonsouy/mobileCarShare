import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Platform
} from "react-native";
import I18n from "../../utils/i18n";
import CStyle from "../../utils/commonStyles";
import FormInput from "../../components/FormInput";
import CustomButton from "../../components/CustomButton";
import Camera from "../../components/Camera/PhotoCamera";
import Loading from "../../components/Loading";
import EStyleSheet from "react-native-extended-stylesheet";
import {
  KeyboardAwareScrollView
} from "react-native-keyboard-aware-scroll-view";
import {updateUser, saveScreenData, navigate, goBack} from "../../actions";
import { connect } from "react-redux";
import Utils from "../../utils/Utils";
import { focusTextInput } from "../../components/FormInput";
import { Button } from "react-native-elements";
import ErrorMessage from "../../components/ErrorMessage";
import ListItem from './ListItem';

class EditCar extends Component {
  constructor(props) {
    super(props);

    const {params: {car}} = this.props.navigation.state;

    this.state = {
      editOn: false,
      name: {
        value: car.name,
        type: "name",
        error: false
      },
      number: {
        value: car.ip,
        type: "number",
        error: false
      },
      keys: car.keys,
      profileUrl: car.image,
      showCamera: false,
      imageData: null,
      imageError: false
    };

    this._cameraCallback = this._cameraCallback.bind(this);
    this._saveProfile = this._saveProfile.bind(this);
    this._cancel = this._cancel.bind(this);
  }

  componentDidMount() {
    this.props.navigation.setParams({ handleDone: this._saveProfile });
    this.props.navigation.setParams({ handleCancel: this._cancel });
    this.props.navigation.setParams({ title: "Edit" });
  }

  static navigationOptions = ({navigation}) => ({
    cardStyle: { backgroundColor: "transparent" },
    title: "Edit Key",
    headerTitleStyle: {
      alignSelf: 'center'
    },
    headerLeft: (
      <Button
        buttonStyle={{ padding: 0 }}
        onPress={() => {
          navigation.state.params.handleCancel();
        }}
        textStyle={{
          fontSize: 16,
          fontFamily: "San Francisco Display",
          color: "white"
        }}
        backgroundColor="transparent"
        title="Cancel"
      />
    ),

    headerRight: (
      <Button
        buttonStyle={{ padding: 0 }}
        onPress={() => {
          navigation.state.params.handleDone();
        }}
        textStyle={{
          fontSize: 16,
          fontFamily: "San Francisco Display",
          color: "white"
        }}
        backgroundColor="transparent"
        title= {navigation.state.params ? navigation.state.params.title : "Edit"}
      />
    ),
    headerVisible: true,
    headerTintColor: "white",
    headerStyle: { backgroundColor: "#7f9fbf" },
  });

  render() {
    const {
      name,
      number,
      keys,
      profileUrl,
      showCamera,
      imageData,
      imageError,
      editOn
    } = this.state;

    const { navigation: { navigate } } = this.props;

    if (showCamera) {
      return <Camera callback={this._cameraCallback} />;
    }

    return (
      <KeyboardAwareScrollView ref="scroll" style={styles.scroll}>
        <Loading />
        <View style={styles.screen}>
          <ErrorMessage />
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              {!profileUrl
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
                      source={{ uri: profileUrl }}
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
            {keys.map(key => {
              return (
                <ListItem key={key.rfid} carKey={key} onDelete={this._onDeleteKey} />
              );
            })}
          </View>
          <View style={styles.form}>


          </View>
          <CustomButton
            onPress={this._continue}
            style={styles.keyButton}
            type="buttonGreen"
            size="small"
            title="Add Key"
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }

  _showCamera(imageData) {
    this.setState({ showCamera: true });
  }

  _cameraCallback(imageData) {
    this.setState({ imageData, showCamera: false, isImageNull: true });
  }

  _onDeleteKey(key) {

  }

  _saveProfile() {
    const {
      email,
      imageData,
      experience,
      name,
      lastName,
      number,
      editOn
    } = this.state;

    if(!editOn){
      this.props.navigation.setParams({ title: "Save" });
      this.setState({editOn: true});
      return;
    }

    const { updateUser } = this.props;
    const result = Utils.validateForm(this.state);
    if (!result.valid) {
      result.form.imageError = imageData === null ? true : false;
      this.setState(result.form);
    } else {
      updateUser({
        email: email.value,
        name: name.value + " " + lastName.value,
        experience: experience.value,
        phone: number.value
      });
    }
  }

  _cancel() {
    const {goBack} = this.props;
    goBack();
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
  keyButton:{
    marginTop: 13,
    marginBottom: 13,
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

const mapStateToProps = state => {
  return {
    userData: state.userData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: data => dispatch(updateUser(data)),
    goBack: () => dispatch(goBack())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCar);
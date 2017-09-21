import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
  Platform
} from "react-native";
import I18n from "../../utils/i18n";
import CStyle from "../../utils/commonStyles";
import FormInput from "../../components/FormInput";
import CustomButton from "../../components/CustomButton";
import Loading from "../../components/Loading";
import EStyleSheet from "react-native-extended-stylesheet";
import { signUpUser } from "../../actions";
import {
  KeyboardAwareScrollView
} from "react-native-keyboard-aware-scroll-view";
import { saveScreenData, navigate, addKey } from "../../actions";
import { connect } from "react-redux";
import Utils from "../../utils/Utils";
import { focusTextInput } from "../../components/FormInput";
import ErrorMessage from "../../components/ErrorMessage";
import CheckBox from "../../components/Checkbox/Checkbox";
import DatePicker from 'react-native-datepicker';
import Modal from '../../components/Modal';


class AddKey extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: {
        value: "",
        type: "name",
        error: false
      },
      id: {
        value: null,
        type: "string",
        error: false
      },
      terms: false
    };

  }

  static navigationOptions = {
    headerVisible: true,
    title: "New key",
    headerTintColor: 'white',
    headerStyle: { backgroundColor: '#7f9fbf' }
  };

  render() {
    const {
      name,
      id,
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

            </View>
              <FormInput
                placeholder={"Owner Name"}
                error={name.error}
                ref="firstName"
                value={name.value}
                returnKeyType="next"
                autoCapitalize="words"
                onSubmitEditing={() => focusTextInput(this.refs.id)}
                onChangeText={name =>
                  this.setState({
                    name: { value: name, type: "name", error: false }
                  })}
              />
              <FormInput
                placeholder={"Rfid"}
                error={id.error}
                ref="id"
                value={id.value}
                returnKeyType="next"
                autoCapitalize="words"
                onSubmitEditing={() => focusTextInput(this.refs.lastName)}
                onChangeText={id =>
                  this.setState({
                    id: { value: id, type: "id", error: false }
                  })}
              />
            <Text style={CStyle.formTitle}>
              {"Available hour intervals"}
            </Text>


          <View style={styles.hourForm}>
            <DatePicker
              style={styles.datePicker}
              date={this.state.fromHour}
              mode="time"
              iconSource= {require('../../assets/misc/button_arrow.png')}
              placeholder={I18n('placeHolder.time')}
              is24Hour={false}
              minuteInterval={30}
              format="h:mm A"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{ dateIcon: styles.dateIcon, dateInput: styles.dateInput  }}
              onDateChange={(fromHour) => {this.setState({fromHour: fromHour})}}
            />
            <DatePicker
              style={styles.datePicker}
              date={this.state.toHour}
              mode="time"
              iconSource= {require('../../assets/misc/button_arrow.png')}
              placeholder={I18n('placeHolder.time')}
              is24Hour={false}
              minuteInterval={30}
              format="h:mm A"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{ dateIcon: styles.dateIcon, dateInput: styles.dateInput  }}
              onDateChange={(toHour) => {this.setState({toHour: toHour})}}
            />
            <CustomButton
              onPress={this._continue}
              style={styles.keyButton}
              size="small"
              title="+"
            />
          </View>



          </View>
            <CustomButton
              onPress={this._addKey.bind(this)}
              style={styles.addButton}
              size="large"
              title="Add Key to Car"
            />
        </View>
        <Modal/>
      </KeyboardAwareScrollView>
    );
  }


  _addKey() {
    const {addKey} = this.props;
    addKey({id: this.state.id.value, "owner-name": this.state.name.value, "intervals": []});
  }
}
const styles = EStyleSheet.create({
  scroll: {
    backgroundColor: "white"
  },
  keyButton:{
    marginTop: 10,
    marginLeft: 0,
    width: '10%',
  },
  addButton:{
    alignSelf: "flex-end",
    marginLeft: 0,
    marginRight: 0,
    marginTop: 30
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
  datePicker: {
    marginRight: 0,
    borderColor: '$buttonGrey',
    width: '40%',
    marginTop: 10
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
  hourForm: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
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
    addKey: data => dispatch(addKey(data))
  };
};

export default connect(null, mapDispatchToProps)(AddKey);

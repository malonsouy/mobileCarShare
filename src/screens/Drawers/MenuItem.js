import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, Switch } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteOn: props.notificationOn !== null ? props.notificationOn : false
    };
    this._onChange = this._onChange.bind(this);
  }

  render() {
    const { icon, text, onPress, iconStyle, onSwitchChange } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.item}>
          <Image
            source={icon}
            style={[styles.itemIcon, iconStyle ? iconStyle : {}]}
          />
          <View
            style={[styles.textBorder, onSwitchChange ? styles.withSwitch : {}]}
          >
            <Text style={styles.itemText}>{text}</Text>
            {onSwitchChange
              ? <Switch
                  onValueChange={v => this._onChange(v)}
                  onTintColor="#e8ebef"
                  thumbTintColor="white"
                  tintColor="#e8ebef"
                  value={this.state.noteOn}
                />
              : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  _onChange(value) {
    const { onSwitchChange } = this.props;
    this.setState({ noteOn: value });
    onSwitchChange(value);
  }
}

const styles = EStyleSheet.create({
  itemText: {
    fontSize: 20,
    color: "white",
    backgroundColor: "transparent",
    fontFamily: "San Francisco Display"
  },
  itemIcon: {
    width: 40,
    height: 40
  },
  textBorder: {
    justifyContent: "center",
    width: 200,
    marginLeft: 10,
    height: 45,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e3e4e8"
  },
  withSwitch: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 5
  },
  logo: {
    fontSize: 36,
    textAlign: "center",
    color: "white",
    margin: 10,
    backgroundColor: "transparent",
    fontFamily: "MichiganState"
  },
  item: {
    width: 250,
    marginLeft: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    height: 50
  }
});

export default MenuItem;

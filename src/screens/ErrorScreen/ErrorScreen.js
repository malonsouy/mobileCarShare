import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import I18n from "../../utils/i18n";
import { Button } from "react-native-elements";
import EStyleSheet from "react-native-extended-stylesheet";
import CustomButton from "../../components/CustomButton";
import { connect } from "react-redux";

class ErrorScreen extends Component {
  componentWillMount() {
    const { userData } = this.props;
    if (userData && userData._id) {
      this.props.navigation.navigate("BookCaddie");
    }
  }

  render() {
    return (
      <Image style={styles.container}>
        <View style={styles.section}>
          <Image
            style={styles.icon}
            source={require("../../assets/icons/ic_error.png")}
          />
          <Text style={styles.text}>{I18n("error.text")}</Text>
        </View>
        <View style={styles.startSection}>
          <CustomButton
            onPress={() => this.props.navigation.navigate("CaddieHome")}
            type="buttonBlue"
            size="medium"
            title="Home"
          />
        </View>
        <View style={styles.emptySpace} />
      </Image>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "space-around",
    backgroundColor: "#404040"
  },
  emptySpace: {
    height: "2%"
  },
  section: {
    justifyContent: "center",
    alignItems: "center"
  },
  startSection: {
    height: "25%",
    justifyContent: "space-around",
    alignItems: "center"
  },
  text: {
    fontSize: 25,
    color: "white",
    width: "65%",
    backgroundColor: "transparent",
    textAlign: "center",
    fontFamily: "San Francisco Display",
    fontWeight: "400"
  }
});

const mapStateToProps = state => {
  return {
    userData: state.userData
  };
};

export default connect(mapStateToProps, null)(ErrorScreen);
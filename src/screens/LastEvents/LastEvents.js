import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from "react-native";
import I18n from "../../utils/i18n";
import RoundCard from "./RoundCard";
import CustomButton from "../../components/CustomButton";
import MenuButton from "../../components/MenuButton";
import Modal from "../../components/Modal";
import CStyle from "../../utils/commonStyles";
import EStyleSheet from "react-native-extended-stylesheet";
import {
  fetchCars,
  updateRoundState,
  sendPubnubMessage
} from "../../actions";
import { connect } from "react-redux";
import Constants from "../../utils/constants";
const {
  PENDING,
  ACCEPTED,
  CANCELED,
  IN_PROGRESS,
  COMPLETED
} = Constants.roundState;

class MyCars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false
    };

    this._onAcceptRound = this._onAcceptRound.bind(this);
    this._onDeclineRound = this._onDeclineRound.bind(this);
    this._onStartRound = this._onStartRound.bind(this);
    this._onCompleteRound = this._onCompleteRound.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
  }

  static navigationOptions = ({navigation}) => ({
    headerLeft: <MenuButton navigate={navigation.navigate} />,
    headerTitle: "Cars",
    headerVisible: true,
    headerTintColor: "white",
    headerStyle: { backgroundColor: "#7f9fbf" },
    tabBarLabel: "Cars",
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ focused }) => {
      const icono = focused
        ? require("../../assets/nav/tab_notifications_sel.png")
        : require("../../assets/nav/tab_notification.png");
      return <Image source={icono} style={{}} />;
    }   
  });

  componentDidMount() {
    this.props.fetchCars();
  }

  render() {
    const { cars } = this.props;

    if (cars.length === 0) {
      return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.noUpcomingRounds}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh}
              colors={["#ccf", "#88f", "#3e7be6"]}
              progressBackgroundColor="#fff"
            />
          }
        >
          <Image
            style={styles.icon}
            source={require("../../assets/nav/notificationBig.png")}
          />
          <Text style={styles.text}>You are not connected to any car.</Text>
        </ScrollView>
      );
    }

    return (
      <View style={styles.screen}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh}
              colors={["#ccf", "#88f", "#3e7be6"]}
              progressBackgroundColor="#fff"
            />
          }
        >
          <View style={styles.screen}>
            {cars.map(car => {
              return (
                <RoundCard
                  car={car}
                  onAccept={this._onAcceptRound}
                  onDecline={this._onDeclineRound}
                />
              );
            })}
          </View>
          <View style={styles.emptySpace} />
        </ScrollView>
        <Modal />
      </View>
    );
  }

  _onAcceptRound(car) {
    const { navigation: { navigate } } = this.props;
    navigate("EditCar", {car} );
  }

  _onDeclineRound(round) {
    const { updateRoundState } = this.props;
    updateRoundState(round._id, { state: CANCELED });
  }

  _onStartRound(round) {
    const { updateRoundState } = this.props;
    updateRoundState(round._id, { state: IN_PROGRESS });
  }

  _onCompleteRound(round) {
    const { updateRoundState } = this.props;
    updateRoundState(round._id, { state: COMPLETED });
  }

  _onRefresh() {
    this.setState({ isRefreshing: true });
    this.props.fetchCars();
    setTimeout(
      () => {
        this.setState({
          isRefreshing: false
        });
      },
      2000
    );
  }
}

const styles = EStyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  emptySpace: {
    height: "5%"
  },
  noUpcomingRounds: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    width: "80%",
    textAlign: "center",
    fontSize: 18,
    color: "$itemGrey",
    marginTop: 20
  }
});

const mapStateToLoading = state => {
  return {
    cars: state.cars
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCars: () => dispatch(fetchCars()),
    updateRoundState: (id, data) => dispatch(updateRoundState(id, data)),
    sendPubnubMessage: m => dispatch(sendPubnubMessage(m))
  };
};

export default connect(mapStateToLoading, mapDispatchToProps)(MyCars);

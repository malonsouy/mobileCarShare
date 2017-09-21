import React, { Component } from "react";
import {
  View,
  Text,
  ListView,
  Image,
  RefreshControl,
  ScrollView
} from "react-native";
import CaddieListItem from "./NotificationItem";
import EStyleSheet from "react-native-extended-stylesheet";
import { connect } from "react-redux";
import MenuButton from "../../components/MenuButton";
import { fetchUserNotifications } from "../../actions";

class Notifications extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      data: ds.cloneWithRows([]),
      isRefreshing: false
    };
    this._onSelect = this._onSelect.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notifications) {
      this.setState({
        data: this.state.data.cloneWithRows(nextProps.notifications)
      });
    }
  }

  static navigationOptions = ({navigation}) => ({
    tabBarLabel: "Notifications",
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ focused }) => {
      const icono = focused
        ? require("../../assets/nav/tab_notifications_sel.png")
        : require("../../assets/nav/tab_notification.png");
      return <Image source={icono} style={{}} />;
    },
    headerLeft: <MenuButton navigate={navigation.navigate} />,
    headerTitle: "Notifications",
    headerVisible: true,
    headerTintColor: "white",
    headerStyle: { backgroundColor: "#7f9fbf" },
  });

  componentDidMount() {
    this.props.fetchUserNotifications();
  }

  render() {
    const { notifications } = this.props;

    if (notifications.length === 0) {
      return (
        <View style={styles.screen}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollView}
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
            <Text style={styles.text}>
              You currently have no notifications.
            </Text>
          </ScrollView>
        </View>
      );
    }
    return (
      <ListView
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
            colors={["#ccf", "#88f", "#3e7be6"]}
            progressBackgroundColor="#fff"
          />
        }
        dataSource={this.state.data}
        renderRow={notification => (
          <CaddieListItem
            notification={notification}
            key={notification._id}
            onSelect={this._onSelect}
          />
        )}
      />
    );
  }

  _onSelect () {
    const { navigation:{navigate} } = this.props;
    navigate("GolfRequests");
  }

  _onRefresh() {
    this.setState({ isRefreshing: true });
    setTimeout(
      () => {
        this.props.fetchUserNotifications();
        this.setState({
          isRefreshing: false
        });
      },
      3000
    );
  }
}

const styles = EStyleSheet.create({
  noNotifications: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  scrollView: {
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

const mapStateToNotifications = state => {
  return {
    notifications: state.notifications
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserNotifications: () => dispatch(fetchUserNotifications())
  };
};

export default connect(mapStateToNotifications, mapDispatchToProps)(
  Notifications
);
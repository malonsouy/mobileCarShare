import React, { Component } from 'react';
import {
  Home,
  Login,
  SignUp,
  CaddieDrawer,
  Notifications,
  GolferDrawer,
  LastEvents,
  ErrorScreen,
  CarForm,
  EditCar,
  AddKey,
  EditKey,
} from './screens';
import {
  StackNavigator,
  TabNavigator,
  DrawerNavigator,
  TabView,
  addNavigationHelpers
} from 'react-navigation';
import { connect } from 'react-redux';

// GOLFER CONFIGURATION

const AdminTabBar = TabNavigator(
  {
    BookCaddie: {
      screen: LastEvents
    }
  },
  {
    tabBarComponent: TabView.TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#488b2d'
    }
  }
);

const StackGolfer = {
  AdminHome: {screen: AdminTabBar},
};

const AdminDrawerRoute = {
  AdminTabBar: {
    screen: StackNavigator(StackGolfer, { initialRouteName: 'AdminTabBar' })
  },
};

const AdminDrawerMenu = DrawerNavigator(AdminDrawerRoute, {
  initialRouteName: 'AdminTabBar',
  drawerWidth: 270,
  contentComponent: ({ navigation }) => (
    <GolferDrawer navigation={navigation} routes={AdminDrawerRoute} />
  ),
  mode: 'modal'
});

// CADDIE CONFIGURATION

const UserTabBar = TabNavigator(
  {
    LastEvents: {
      screen: LastEvents
    },
    Notifications: {
      screen: Notifications
    }
  },
  {
    tabBarComponent: TabView.TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#003366'
    }
  }
);

const StackCaddie = {
  UserTabBar: {screen: UserTabBar},
  CaddieHome: {screen: UserTabBar},
  CarForm:  {screen: CarForm},
  EditCar:  {screen: EditCar},
  AddKey:  {screen: AddKey},
  EditKey:  {screen: EditKey},
  Notifications: {screen: UserTabBar}
};

const UserDrawerRoute = {
  UserTabBar: {
    screen: StackNavigator(StackCaddie, { initialRouteName: 'UserTabBar' })
  },
};

const UserDrawerMenu = DrawerNavigator(UserDrawerRoute, {
  initialRouteName: 'UserTabBar',
  drawerWidth: 270,
  contentComponent: ({ navigation }) => (
    <CaddieDrawer navigation={navigation} routes={UserDrawerRoute} />
  ),
  mode: 'modal'
});

const StackUnlogged = {
  SignUp: { screen: SignUp},
  Login: { screen: Login  }
}

const routes = {
  WelcomeScreen: {screen: SignUp},
  SignUpStack: { screen: StackNavigator(StackUnlogged, { initialRouteName: 'SignUp', headerMode: 'screen' })},
  AdminHome: {screen: AdminDrawerMenu},
  UserHome: {screen: UserDrawerMenu},
};

const options = {
  headerMode: 'none'
};

export const AppNavigator = StackNavigator(routes, options);

export class NavigatorWithState extends React.Component {
  render() {
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav
        })}
      />
    );
  }
}

const mapNavToState = state => {
  return {
    nav: state.nav
  };
};

export const Navigator = connect(mapNavToState)(NavigatorWithState);

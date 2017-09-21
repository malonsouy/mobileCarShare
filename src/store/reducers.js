import { AppNavigator } from '../navigator';
import Utils from "../utils/Utils";

const rootReducer = (state = initialState, action) => {

  if(action.type.includes('Navigation')){
    
    // This handle React-Navigator state and set it on the root state
    const newNav = AppNavigator.router.getStateForAction(action, state.nav);
    const newState = { ...state, nav: newNav};
    newState.errorMessage.show = false;
    newState.modal.show = false;
    return newState;

  }else{

    const newState = Object.assign({}, state);

    switch (action.type) {
      case 'IS_FETCHING':
        newState.isFetching = action.isFetching;
        return newState;

      case 'SET_MODAL':
        newState.modal = {
          show: action.show,
          message: action.message,
          title: action.title,
          onConfirm: action.onConfirm
        };
        return newState;

      case 'SET_ERROR_MESSAGE':
        newState.errorMessage = { show: action.show, message: action.message };
        return newState;

      case 'SET_USER_DATA':
        newState.userData = action.userData;
        return newState;

      case 'SAVE_SCREEN_DATA':
        newState.screens[action.screenName] = action.data;
        return newState;

      case 'SET_CARS_LIST':
        newState.cars = action.cars;
        return newState;

      case 'SET_USER_NOTIFICATIONS':
        newState.notifications = action.notifications;
        return newState;

      case 'USER_RESET':
        return initialState;

      default:
        return newState;
    }
  }
};

export let initialState = {

  //Digital keys
  cars: [],
  keys: [],

  // Error Message properties
  errorMessage: {
    show: false,
    message: null
  },
  // Modal properties
  modal: {
    show: false,
    title: null,
    text: null,
    onConfirm: null
  },
  // Boolean used for loading screen
  isFetching: false,
  // User data
  userData: {},
  // Screens data
  screens: {},
  // React-Navigator initial state
  nav: {
    index: 0,
    routes: [
      {
        routeName: 'WelcomeScreen',
        key: 'Init'
      }
    ]
  },
  notifications: [],
};

export default rootReducer;

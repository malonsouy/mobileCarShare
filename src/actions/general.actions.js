import { NavigationActions } from 'react-navigation';


export const setCars = cars => {
  return {
    type: 'SET_CARS_LIST',
    cars
  };
};

export const setKeys = keys => {
  return {
    type: 'SET_KEYS_LIST',
    keys
  };
};

export const addKey = key => {
  return {
    type: 'ADD_KEY',
    key
  };
};

export const removeKey = keyId => {
  return {
    type: 'REMOVE_KEY',
    keyId
  };
};

export const fetchCars = () => {
  return {
    type: 'FETCH_CARS'
  };
};

export const fetchKeys = () => {
  return {
    type: 'FETCH_KEYS'
  };
};


export const resetStackNavigatorTo = screenName => {
  return NavigationActions.reset({
    key: null,
    index: 0,
    actions: [NavigationActions.navigate({ routeName: screenName })]
  });
};

export const goBack = screenName => {
  return NavigationActions.back({key: screenName});
};

export const navigate = (routeName, params, action) => {
  return NavigationActions.navigate({routeName, params, action})
};

export const sendPubnubMessage = message => {
  return {
    type: 'SEND_PUBNUB_MESSAGE',
    message
  };
};

export const setModal = ({ show, title, message, onConfirm }) => {
  return {
    type: 'SET_MODAL',
    show,
    title,
    message,
    onConfirm
  };
};

export const setErrorMessage = ({ show, message }) => {
  return {
    type: 'SET_ERROR_MESSAGE',
    show,
    message
  };
};

export const isFetching = isFetching => {
  return {
    type: 'IS_FETCHING',
    isFetching
  };
};

export const saveScreenData = (screenName, data) => {
  return {
    type: 'SAVE_SCREEN_DATA',
    screenName,
    data
  };
};

export const communicationFail = errorMsg => {
  return {
    type: 'COMMUNICATION_FAIL',
    errorMsg
  };
};

export const setFaqIndex = faqIndex => {
  return {
    type: 'FAQ_INDEX',
    faqIndex
  };
};
import { call, put, fork, takeEvery, select } from "redux-saga/effects";
import { AsyncStorage, Platform } from "react-native";
import {
  communicationFail,
  navigate,
  goBack,
  setUserData,
  setModal,
  isFetching,
  setErrorMessage,
  setKeys,
  setCars,
  resetStackNavigatorTo
} from "../actions";
import Api from "../utils/RESTClient-Mock";
import { getSessionToken } from "../store/selectors";
import NotificationsSagas from "./notifications.sagas.js";
import {exHandler} from "./common.sagas";

function* initialize() {
  try {
    //const _user = yield AsyncStorage.getItem("@user");
    const _user = '{ "name": "Manu", "role": 1}';
    if (_user) {
      const userData = JSON.parse(_user);
      yield put(setUserData(userData));
      yield call(redirectUserToHome, userData);
    } else {
      yield put(navigate("SignUpStack"));
    }
  } catch (e) {
    yield put(communicationFail(e.message));
  }
}

function* redirectUserToHome(user) {
  if (user.role === 1) {
    yield put(resetStackNavigatorTo("UserHome"));
  } else {
    yield put(resetStackNavigatorTo("AdminHome"));
  }
}

function* fetchCars() {

  const sessionToken = yield select(getSessionToken);
  const result = yield call(Api.Car.fetchCars, sessionToken);
  if (result.status === "success") {
    let keys = yield call(fetchKeys);
    result.data[0].keys = keys;
    yield put(setCars(result.data));
  } else if (result.status === "error") {
    yield put(communicationFail(result.message));
  }
}

function* fetchKeys() {

  const sessionToken = yield select(getSessionToken);
  const result = yield call(Api.Key.fetchKeys);
  //return result;
  if (result.status === "success") {
    return result.data;
  } else if (result.status === "error") {
    yield put(communicationFail(result.message));
  }
}


function* addKey({key}) {

  const sessionToken = yield select(getSessionToken);
  const result = yield call(Api.Key.add, key);
  if (result) {
    /*yield put(
      setModal({
        show: true,
        title: "Added!",
        message: "The key was successfully persisted.",
        onConfirm: dispatch => dispatch(goBack())
      })
    );*/
    alert("The key was successfully persisted.");
  } else if (result.status === "error") {
    yield put(communicationFail(result.message));
  }
}

function* removeKey({keyId}) {

  const sessionToken = yield select(getSessionToken);
  const result = yield call(Api.Key.remove, keyId);
  if (result.status === "success") {
    const result = yield call(fetchCars);
  } else if (result.status === "error") {
    yield put(communicationFail(result.message));
  }
}


export default function* root() {
  yield [
    fork(initialize),
    fork(fetchCars),
    fork(fetchKeys),
    takeEvery("ADD_KEY", exHandler(addKey)),
    takeEvery("REMOVE_KEY", exHandler(removeKey)),
    fork(NotificationsSagas),
  ];
}

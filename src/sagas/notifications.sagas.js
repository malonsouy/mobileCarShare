import { call, put, fork, takeEvery, select } from "redux-saga/effects";
import {
  navigate,
  isFetching,
  setErrorMessage,
  setUserNotifications,
} from "../actions";
import Api from "../utils/RESTClient";
import {exHandler} from "./common.sagas";
import { getSessionToken, getUser } from "../store/selectors";

export function* fetchUserNotifications() {

  const sessionToken = yield select(getSessionToken);
  const user = yield select(getUser);
  const result = yield call(
    Api.Notifications.notificationsForUser,
    sessionToken,
    user._id
  );
  if (result.status === "success") {
    yield put(setUserNotifications(result.data));
  } else if (result.status === "error") {
    yield put(communicationFail(result.message));
  }
}

function* submitNotification({ notification }) {

  yield put(isFetching(true));
  const sessionToken = yield select(getSessionToken);
  const user = yield select(getUser);
  const result = yield call(Api.Notifications.create, sessionToken, {
    notification
  });
  yield put(isFetching(false));

}

export default function* root() {
  yield [
    takeEvery("USER_NOTIFICATIONS_FETCH", exHandler(fetchUserNotifications)),
    takeEvery("NOTIFICATION_SUBMIT", exHandler(submitNotification)),
  ];
}

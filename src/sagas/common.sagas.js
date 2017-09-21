import { call, put, fork, takeEvery, select } from "redux-saga/effects";
import {
  navigate,
  isFetching,
  setErrorMessage,
} from "../actions";

// Unit Exception handler for a saga
export function exHandler(generator) {
  return function* exHandler(...args) {
  
    try {
      yield call(generator, ...args);
  
    } catch (e) {
      yield put(isFetching(false));
      yield put(
        setErrorMessage({ show: true, message: e.message })
      );
    }
  }
}
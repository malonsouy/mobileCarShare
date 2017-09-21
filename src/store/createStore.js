import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import rootReducer, { initialState } from  './reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import Reactotron from 'reactotron-react-native';

let envCreateStore = createStore; 
let sagaMiddleware;

if (__DEV__) {
  envCreateStore = Reactotron.createStore;
  const sagaMonitor = Reactotron.createSagaMonitor();
  sagaMiddleware = createSagaMiddleware({ sagaMonitor });
}else {
  sagaMiddleware = createSagaMiddleware();
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Prevents Redux DevTools from re-dispatching all previous actions.
        shouldHotReload: false
    }) : compose;
const appReducer = 
  rootReducer
;

const store = envCreateStore(
    appReducer,
    initialState,
    composeEnhancers( applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

export default store;

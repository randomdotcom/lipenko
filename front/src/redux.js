import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import combinedReducers from "./reducers";
import createHistory from "history/createBrowserHistory";
import saga from './sagas'

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createHistory()

export default createStore(
  combinedReducers,
  composeEnhancers(applyMiddleware(sagaMiddleware, history))
);

sagaMiddleware.run(saga);
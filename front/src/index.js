import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter as Router } from "connected-react-router";
import axios from "axios";
import App from "./containers/AppContainer";
import * as serviceWorker from "./serviceWorker";
import store, { history } from "./redux";
import { initializePreviousToken } from "./authentication";
import "./index.css";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
initializePreviousToken(store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App className="root" />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

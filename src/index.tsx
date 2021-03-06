import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ModalsRoot } from "./components/Modals/Modals";
import store from "./redux/store";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <ModalsRoot>
      <Provider store={store}>
        <App />
      </Provider>
    </ModalsRoot>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

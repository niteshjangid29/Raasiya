import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import { Alert } from "react-bootstrap";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

const AlertTemplate = ({ style, options, message, close }) => (
  <div className="error">
    <Alert variant={options.type === "error" ? "danger" : options.type}>
      {message}
    </Alert>
    {/* <button onClick={close}>X</button> */}
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>
);

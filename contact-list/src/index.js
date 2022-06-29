import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { createStore } from "redux";
import { Provider } from "react-redux";
import contactReducer from "./redux/contactReducer";
import { composeWithDevTools } from "redux-devtools-extension";
const store = createStore(contactReducer,composeWithDevTools());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

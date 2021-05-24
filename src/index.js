import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";

// REDUX
import { Provider } from "react-redux";
import store from "./state/store";

// COMPONENTS
import Popup from "./Popup";
import FormDisplay from "./FormDisplay";

const popupRoot = document.getElementById("popup-root");

// Most pages wont share a common element so we create one to insert content in the
const insertionPoint = document.createElement("div");
insertionPoint.id = "insertion-point";
document.body.parentNode.insertBefore(insertionPoint, document.body);

// The next portion decides if either the in-page element is rendered
// or the popup is rendered
// !popupRoot &&
//   ReactDOM.render(
//     <Provider store={store}>
//       <FormDisplay />
//     </Provider>,
//     insertionPoint
//   );

// popupRoot &&
//   ReactDOM.render(
//     <Provider store={store}>
//       <Popup />
//     </Provider>,
//     popupRoot
//   );

ReactDOM.render(
  <Provider store={store}>
    <Popup />
  </Provider>,
  document.getElementById("root")
);

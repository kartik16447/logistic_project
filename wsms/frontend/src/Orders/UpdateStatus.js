import React from "react";
import ReactDom from "react-dom";
import { useState } from "react";

import Order from "./Order";
import Vendors from "./Vendors";

function UpdateStatus(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popupInner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          CLOSE
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default UpdateStatus;

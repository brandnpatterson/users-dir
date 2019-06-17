import React from "react";
import { func, string } from "prop-types";

const propTypes = {
  className: string.isRequired,
  onClick: func.isRequired
};

function Notification(props) {
  return (
    <div className={props.className}>
      <button
        onClick={props.onClick}
        className="delete"
        style={{ right: "1.4rem", top: "1.4rem" }}
      />
      {props.children}
    </div>
  );
}

Notification.propTypes = propTypes;

export default Notification;

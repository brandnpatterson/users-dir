import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { sanitize } from "dompurify";
import { Context } from "../context";
import { inputs, initialFormData } from "../data";
import { postNewUser, resetStatus } from "../context/api";

import Notification from "../components/Notification";

function AddUser() {
  const context = useContext(Context);
  const { flashMessage, redirect } = context.state;
  const [formData, setFormData] = useState(initialFormData);

  function onSubmit(e) {
    e.preventDefault();

    postNewUser({ context, formData });
  }

  function onChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: sanitize(e.target.value)
    });
  }

  return (
    <div className="container">
      {flashMessage && (
        <Notification
          className="notification is-warning"
          onClick={() => resetStatus({ context })}
        >
          {flashMessage}
        </Notification>
      )}
      <form onSubmit={onSubmit} action="post">
        {inputs.map(input => (
          <div key={input.value} className="field">
            <label htmlFor={input.value}>{input.name}</label>
            <div className="control">
              <input
                id={input.value}
                className="input"
                name={input.value}
                type={input.type}
                value={formData[input.value]}
                onChange={onChange}
                required
              />
            </div>
          </div>
        ))}
        <div className="form-group">
          <button type="submit" className="button is-link">
            Submit
          </button>
        </div>
      </form>
      {redirect.status && <Redirect to="/thank-you" />}
    </div>
  );
}

export default AddUser;

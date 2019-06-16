import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { Context } from "../context";
import { inputs } from "../data";
import { sanitize } from "dompurify";
import { resetStatus, postNewUser } from "../context/api";

function AddUser() {
  const context = useContext(Context);
  const { flashMessage, redirect } = context.state;
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    location: "",
    jobtitle: ""
  });

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
        <div className="notification">
          <button
            onClick={() => resetStatus({ context })}
            className="delete"
            style={{ right: "1.4rem", top: "1.4rem" }}
          />
          {flashMessage}
        </div>
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

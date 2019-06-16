import React, { Fragment, useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { Context } from "../context";
import { postNewUser } from "../context/api";
import { inputs } from "../data";
import { sanitize } from "dompurify";

function AddUser() {
  const context = useContext(Context);
  const { flashMessage, redirect } = context.state;
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    location: "",
    jobtitle: "",
    picture: ""
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
    <Fragment>
      {flashMessage && <p>{flashMessage}</p>}
      <form onSubmit={onSubmit} action="post">
        {inputs.map(input => (
          <div key={input.value} className="form-group">
            <label htmlFor={input.value}>{input.name}</label>
            <input
              id={input.value}
              name={input.value}
              type={input.type}
              value={formData[input.value]}
              onChange={onChange}
            />
          </div>
        ))}
        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
      {redirect.value === true && <Redirect to="/thank-you" />}
    </Fragment>
  );
}

export default AddUser;

import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { sanitize } from "dompurify";
import { Context } from "../context";
import { postNewUser, resetStatus } from "../context/api";

import Notification from "../components/Notification";
import UserForm from "../components/UserForm";

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

  if (redirect.status) {
    return <Redirect to="/thank-you" />;
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
      <UserForm formData={formData} onChange={onChange} onSubmit={onSubmit}>
        <div className="form-group">
          <button type="submit" className="button is-link">
            Submit
          </button>
        </div>
      </UserForm>
    </div>
  );
}

export default AddUser;

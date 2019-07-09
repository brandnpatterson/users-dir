import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { Context } from "../context";
import { postNewUser, resetStatus } from "../context/api";

import Notification from "../components/Notification";
import UserForm from "../components/UserForm";

function AddUser() {
  const context = useContext(Context);
  const { flashMessage, redirect } = context.state;
  const [formData, setFormData] = useState({
    firstname: {
      value: "",
      valid: true
    },
    lastname: {
      value: "",
      valid: true
    },
    username: {
      value: "",
      valid: true
    },
    email: {
      value: "",
      valid: true
    },
    location: {
      value: "",
      valid: true
    },
    jobtitle: {
      value: "",
      valid: true
    }
  });

  function onSubmit() {
    postNewUser({ context, formData });
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
      <UserForm
        formData={formData}
        onSubmit={onSubmit}
        setFormData={setFormData}
      >
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

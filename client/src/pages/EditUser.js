import React, { Fragment, useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Context } from "../context";
import { filterToEditUser, putUpdateUser } from "../context/api";
import { inputs } from "../data";
import { sanitize } from "dompurify";

function EditUser({ history }) {
  const context = useContext(Context);
  const { flashMessage, redirect, users, userToEdit } = context.state;
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    location: "",
    jobtitle: "",
    picture: ""
  });

  useEffect(() => {
    if (!userToEdit) {
      const paramId = history.location.pathname.split("/")[2];

      filterToEditUser({ context, users, userId: Number(paramId) });
    } else if (!flashMessage) {
      setFormData({
        firstname: userToEdit.firstname,
        lastname: userToEdit.lastname,
        email: userToEdit.email,
        location: userToEdit.location,
        jobtitle: userToEdit.jobtitle,
        picture: userToEdit.picture
      });
    }
  }, [
    context,
    flashMessage,
    history.location.pathname,
    setFormData,
    users,
    userToEdit
  ]);

  function onSubmit(e) {
    e.preventDefault();

    putUpdateUser({ context, formData });
  }

  function onChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: sanitize(e.target.value)
    });
  }

  function onClick() {
    console.log("Are you sure?");
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
        <div className="form-group">
          <button onClick={onClick} type="button">
            Delete
          </button>
        </div>
      </form>
      {redirect.value === true && <Redirect to="/success" />}
    </Fragment>
  );
}

export default EditUser;

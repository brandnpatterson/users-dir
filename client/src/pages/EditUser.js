import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import { Redirect } from "react-router-dom";
import { Context } from "../context";
import { inputs } from "../data";
import { sanitize } from "dompurify";
import {
  deleteUser,
  filterUserSingle,
  putUpdateUser,
  resetStatus
} from "../context/api";

function EditUser({ history }) {
  const context = useContext(Context);
  const { flashMessage, redirect, users, userSingle } = context.state;
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    location: "",
    jobtitle: ""
  });
  const prevUsers = useRef();

  useEffect(() => {
    if (!userSingle) {
      const username = history.location.pathname.split("/")[2];

      filterUserSingle({ context, username });
    } else if (!prevUsers.current) {
      prevUsers.current = true;

      setFormData({
        firstname: userSingle.firstname,
        lastname: userSingle.lastname,
        username: userSingle.username,
        email: userSingle.email,
        location: userSingle.location,
        jobtitle: userSingle.jobtitle
      });
    }
  }, [
    context,
    flashMessage,
    history.location.pathname,
    setFormData,
    users,
    userSingle
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

  function onToggleModal() {
    setModal(true);
  }

  function onConfirmDelete() {
    deleteUser({ context, formData });
  }

  return (
    <Fragment>
      {flashMessage && (
        <div className="notification is-info">
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="control">
            <button type="submit" className="button is-success">
              Update
            </button>
          </div>
          <div className="control">
            <button onClick={onToggleModal} type="button" className="button">
              Delete
            </button>
          </div>
        </div>
      </form>
      <div className={"modal" + (modal ? " is-active" : "")}>
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">
              Are you sure you want to delete this User?
            </p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => setModal(false)}
            />
          </header>
          <footer className="modal-card-foot">
            <button
              onClick={onConfirmDelete}
              type="button"
              className="button is-danger"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => setModal(false)}
              className="button"
            >
              Cancel
            </button>
          </footer>
        </div>
      </div>
      {redirect.status && <Redirect to="/" />}
    </Fragment>
  );
}

export default EditUser;

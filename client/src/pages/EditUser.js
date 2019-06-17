import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import { Redirect } from "react-router-dom";
import { sanitize } from "dompurify";
import { Context } from "../context";
import { filterUserSingle, putUpdateUser, resetStatus } from "../context/api";

import ModalConfirmDelete from "../components/ModalConfirmDelete";
import Notification from "../components/Notification";
import UserForm from "../components/UserForm";

function EditUser({ history }) {
  const context = useContext(Context);
  const { flashMessage, redirect, users, userSingle } = context.state;
  const [isModal, setIsModal] = useState(false);
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
    setIsModal(true);
  }

  return (
    <Fragment>
      {flashMessage && (
        <Notification
          className="notification is-success"
          onClick={() => resetStatus({ context })}
        >
          {flashMessage}
        </Notification>
      )}
      <UserForm formData={formData} onChange={onChange} onSubmit={onSubmit}>
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
      </UserForm>
      <ModalConfirmDelete isModal={isModal} setIsModal={setIsModal} />
      {redirect.status && <Redirect to="/" />}
    </Fragment>
  );
}

export default EditUser;

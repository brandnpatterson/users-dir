import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import { Redirect } from "react-router-dom";
import { Context } from "../context";
import { filterUserSingle, putUpdateUser, resetStatus } from "../context/api";

import ModalConfirmDelete from "../components/ModalConfirmDelete";
import Notification from "../components/Notification";
import UserForm from "../components/UserForm";

function EditUser({ history }) {
  const context = useContext(Context);
  const { flashMessage, redirect, users, userSingle } = context.state;
  const [isModal, setIsModal] = useState(false);
  const [notUserRedirect, setNotUserRedirect] = useState(false);
  const [formData, setFormData] = useState({
    firstname: {
      valid: true,
      value: ""
    },
    lastname: {
      valid: true,
      value: ""
    },
    username: {
      valid: true,
      value: ""
    },
    email: {
      valid: true,
      value: ""
    },
    location: {
      valid: true,
      value: ""
    },
    jobtitle: {
      valid: true,
      value: ""
    }
  });
  const prevUsers = useRef();

  useEffect(() => {
    if (!userSingle) {
      const username = history.location.pathname.split("/")[2];
      const userExists = users.filter(user => user.username === username);

      if (userExists.length > 0) {
        filterUserSingle({ context, username });
      } else {
        setNotUserRedirect(true);
      }
    } else if (!prevUsers.current) {
      prevUsers.current = true;

      setFormData({
        firstname: {
          valid: true,
          value: userSingle.firstname
        },
        lastname: {
          valid: true,
          value: userSingle.lastname
        },
        username: {
          valid: true,
          value: userSingle.username
        },
        email: {
          valid: true,
          value: userSingle.email
        },
        location: {
          valid: true,
          value: userSingle.location
        },
        jobtitle: {
          valid: true,
          value: userSingle.jobtitle
        }
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

  function onSubmit() {
    putUpdateUser({ context, formData });
  }

  function onToggleModal() {
    setIsModal(true);
  }

  if (notUserRedirect) {
    return <Redirect to="/" />;
  }

  if (redirect.status) {
    return <Redirect to="/" />;
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
      <UserForm
        formData={formData}
        onSubmit={onSubmit}
        setFormData={setFormData}
      >
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
      {}
    </Fragment>
  );
}

export default EditUser;

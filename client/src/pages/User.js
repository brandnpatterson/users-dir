import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Context } from "../context";
import { filterUserSingle } from "../context/api";

function User({ history, userId }) {
  const context = useContext(Context);
  const { users, userSingle } = context.state;
  const [notUserRedirect, setNotUserRedirect] = useState(false);

  useEffect(() => {
    if (!userSingle) {
      const username = history.location.pathname.split("/")[2];
      const userExists = users.filter(user => user.username === username);

      if (userExists.length > 0) {
        filterUserSingle({ context, username });
      } else {
        setNotUserRedirect(true);
      }
    }
  }, [context, history.location.pathname, userSingle, users]);

  if (notUserRedirect) {
    return <Redirect to="/" />;
  }

  if (!userSingle) {
    return false;
  }

  return (
    <Fragment>
      <div className="media">
        <figure className="media-left">
          <p className="image is-64x64">
            <img src={userSingle.picture} alt={`${userSingle.firstname}`} />
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <p>
              <strong style={{ marginRight: "0.5rem" }}>
                {userSingle.firstname} {userSingle.lastname}
              </strong>
              <small>@{userSingle.username}</small>
              <br />
            </p>
            <p>{userSingle.email}</p>
            <p>{userSingle.location}</p>
            <p>{userSingle.jobtitle}</p>
          </div>
        </div>
        <div className="media-right">
          <Link
            to={`/users/${userSingle.username}/edit`}
            style={{ fontSize: "0.9rem", textAlign: "right" }}
          >
            Edit
          </Link>
        </div>
      </div>
    </Fragment>
  );
}

export default User;

import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context";
import { filterUserSingle } from "../context/api";

function User({ history, userId }) {
  const context = useContext(Context);
  const { userSingle } = context.state;

  useEffect(() => {
    if (!userSingle) {
      const username = history.location.pathname.split("/")[2];

      filterUserSingle({ context, username });
    }
  }, [context, userSingle, history.location.pathname]);

  if (!userSingle) {
    return false;
  }

  return (
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
  );
}

export default User;

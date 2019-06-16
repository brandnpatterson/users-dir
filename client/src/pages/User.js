import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context";
import { filterToSingleUser } from "../context/api";

function User({ history, userId }) {
  const context = useContext(Context);
  const { filteredUser } = context.state;

  useEffect(() => {
    if (!filteredUser) {
      const username = history.location.pathname.split("/")[2];

      filterToSingleUser({ context, username });
    }
  }, [context, filterToSingleUser, filteredUser]);

  if (!filteredUser) {
    return false;
  }

  return (
    <div className="content">
      <p>
        <strong style={{ marginRight: "0.5rem" }}>
          {filteredUser.firstname} {filteredUser.lastname}
        </strong>
        <small>@{filteredUser.username}</small>
        <br />
      </p>
      <p>{filteredUser.email}</p>
      <p>{filteredUser.location}</p>
      <p>{filteredUser.jobtitle}</p>
      <Link
        to={`/${filteredUser.username}/edit`}
        style={{ fontSize: "0.9rem", textAlign: "right" }}
      >
        Edit
      </Link>
    </div>
  );
}

export default User;

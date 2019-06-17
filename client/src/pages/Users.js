import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Context } from "../context";
import {
  filterByUsername,
  filterUserSingle,
  resetStatus
} from "../context/api";

import Placeholder from "../components/Placeholder";

function Users() {
  const context = useContext(Context);
  const { loading, redirect, users, usersFiltered } = context.state;
  const [currentUsers, setCurrentUsers] = useState(users);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (redirect) {
      resetStatus({ context });
    }

    if (usersFiltered) {
      setCurrentUsers(usersFiltered);
    } else {
      setCurrentUsers(users);
    }

    filterByUsername({ context, value: input });
  }, [context, input, redirect, users, usersFiltered]);

  function onNavigateToUser(user) {
    filterUserSingle({ context, userId: user.id });
    setInput("");
  }

  function onChange(e) {
    setInput(e.target.value);
  }

  return (
    <StyledUsers>
      <input onChange={onChange} value={input} type="text" />
      {loading && (
        <Fragment>
          <Placeholder />
          <Placeholder />
          <Placeholder />
          <Placeholder />
        </Fragment>
      )}
      {loading === false && users.length === 0 ? (
        <Fragment>
          <div className="media">
            <figure className="media-left">
              <p className="image is-64x64">
                <img
                  src="https://randomuser.me/api/portraits/med/men/11.jpg"
                  alt="user"
                />
              </p>
            </figure>
            <div className="media-content">
              <div className="content">
                <p>
                  <strong style={{ marginRight: "0.5rem" }}>John Doe</strong>
                  <small>@username</small>
                  <br />
                </p>
                <p>Welcome!</p>
                <Link style={{ fontSize: "0.9rem" }} to="/users/add">
                  Add a user to begin
                </Link>
              </div>
            </div>
            <div className="media-right" />
          </div>
          <Placeholder />
          <Placeholder />
          <Placeholder />
        </Fragment>
      ) : (
        currentUsers.map(user => (
          <div className="media" key={user.id}>
            <figure className="media-left">
              <p className="image is-64x64">
                <img src={user.picture} alt={`${user.firstname}`} />
              </p>
            </figure>
            <div className="media-content">
              <div className="content">
                <p>
                  <strong style={{ marginRight: "0.5rem" }}>
                    {user.firstname} {user.lastname}
                  </strong>
                  <Link
                    onClick={() => onNavigateToUser(user)}
                    to={`/users/${user.username}`}
                    style={{ fontSize: "0.9rem", textAlign: "right" }}
                  >
                    @{user.username}
                  </Link>
                  <br />
                </p>
                <p>{user.email}</p>
                <p>{user.location}</p>
                <p>{user.jobtitle}</p>
              </div>
            </div>
            <div className="media-right">
              <Link
                onClick={() => onNavigateToUser(user)}
                to={`/users/${user.username}/edit`}
                style={{ fontSize: "0.9rem", textAlign: "right" }}
              >
                Edit
              </Link>
            </div>
          </div>
        ))
      )}
    </StyledUsers>
  );
}

const StyledUsers = styled.div`
  .media {
    border: 2px solid #f5f5f5;
    min-height: 164px;
    padding: 1.5rem;

    p {
      font-size: 0.9rem;
    }
  }

  .media-left {
    background: #f5f5f5;
    height: 64px;
    width: 64px;
  }

  .placeholder-text {
    background: #f5f5f5;
    height: 1rem;
    width: 10rem;

    &:first-of-type {
      margin-bottom: 1rem;
    }
  }
`;

export default Users;

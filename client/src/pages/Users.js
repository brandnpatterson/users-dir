import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Context } from "../context";
import { filterToEditUser, resetStatus } from "../context/api";

function Users() {
  const context = useContext(Context);
  const { loading, redirect, users } = context.state;

  useEffect(() => {
    if (redirect.value) {
      resetStatus({ context });
    }
  });

  function onClick(user) {
    filterToEditUser({ context, users, userId: user.id });
  }

  return (
    <StyledUsers>
      {loading && (
        <div className="media">
          <figure className="media-left">
            <p className="image is-64x64">
              <div
                style={{
                  background: "#f5f5f5",
                  height: "64px",
                  width: "64px"
                }}
              />
            </p>
          </figure>
          <div className="media-content">
            <div
              style={{
                background: "#f5f5f5",
                height: "1rem",
                marginBottom: "1rem",
                width: "10rem"
              }}
            />
            <div
              style={{
                background: "#f5f5f5",
                height: "1rem",
                width: "10rem"
              }}
            />
            <br />
            <div
              style={{
                background: "#f5f5f5",
                height: "1rem",
                width: "10rem"
              }}
            />
          </div>
          <div className="media-right" />
        </div>
      )}
      {loading === false && users.length === 0 ? (
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
      ) : (
        users.map(user => (
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
                  <small>@{user.username}</small>
                  <br />
                </p>
                <p>{user.email}</p>
                <p>{user.location}</p>
                <p>{user.jobtitle}</p>
              </div>
            </div>
            <div className="media-right">
              <Link
                onClick={() => onClick(user)}
                to={`users/${user.id}`}
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
`;

export default Users;

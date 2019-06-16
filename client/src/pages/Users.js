import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Context } from "../context";
import { filterToEditUser, resetStatus } from "../context/api";

function Users() {
  const context = useContext(Context);
  const { redirect, users } = context.state;

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
      {users.length === 0 ? (
        <div className="media">
          <figure className="media-left">
            <p className="image is-64x64">
              <img
                src="https://randomuser.me/api/portraits/women/1.jpg"
                alt="user"
              />
            </p>
          </figure>
          <div className="media-content">
            <div className="content" />
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
                  <small>@johnsmith</small>
                  <br />
                </p>
                <p>{user.email}</p>
                <p>{user.location}</p>
                <p>{user.jobtitle}</p>
                <p>{user.picture}</p>
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
    padding: 2rem;

    p {
      font-size: 0.9rem;
    }
  }
`;

export default Users;

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context";
import { filterToEditUser } from "../context/api";

function Users() {
  const context = useContext(Context);
  const { users } = context.state;

  function onClick(user) {
    filterToEditUser({ context, users, userId: user.id });
  }

  return (
    <div>
      <h1>Users</h1>
      {users.map(user => (
        <div key={user.id}>
          <p>First Name:{user.firstname}</p>
          <p>Last Name:{user.lastname}</p>
          <p>Email:{user.email}</p>
          <p>Location: {user.location}</p>
          <p>Job Title: {user.jobtitle}</p>
          <p>Picture: {user.picture}</p>
          <Link onClick={() => onClick(user)} to={`/users/${user.id}`}>
            Edit
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Users;

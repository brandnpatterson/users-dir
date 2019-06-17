import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { Context } from "../context";

function ThankYou() {
  const context = useContext(Context);
  const { data, status } = context.state.redirect;

  if (!status) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h1>Thank you for signing up {data.firstname}!</h1>
      <Link to="/"> See all users</Link>
    </div>
  );
}

export default ThankYou;

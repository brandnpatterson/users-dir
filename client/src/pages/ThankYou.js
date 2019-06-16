import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { Context } from "../context";

function ThankYou() {
  const context = useContext(Context);
  const { data } = context.state.redirect;

  if (!data) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h1>Thank you for singing up, {data.firstname}!</h1>
      <Link to="/"> See all users</Link>
    </div>
  );
}

export default ThankYou;

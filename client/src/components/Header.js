import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Context } from "../context";
import { resetStatus } from "../context/api";

function Header() {
  const context = useContext(Context);

  function onClick() {
    if (context.state.redirect !== null) {
      resetStatus({ context });
    }
  }

  return (
    <StyledHeader>
      <NavLink exact to="/" onClick={onClick}>
        Users
      </NavLink>
      <NavLink to="/add" onClick={onClick}>
        Add
      </NavLink>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  font-size: 1.5rem;
  padding: 2rem 0 5rem;

  a {
    color: black;
    margin-right: 1rem;
    padding: 0.5rem;
    text-decoration: none;

    &:hover {
      border-bottom: 4px solid lightgray;
    }
  }
  .active {
    border-bottom: 4px solid lightgray;
    box-shadow: 0 10px 6px -6px rgba(0, 0, 0, 0.125);
  }
`;

export default Header;

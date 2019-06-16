import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Context } from "../context";
import { resetFlashMessage } from "../context/api";

function Header() {
  const context = useContext(Context);

  function onClick() {
    if (context.state.redirect !== null) {
      resetFlashMessage({ context });
    }
  }

  return (
    <StyledHeader>
      <NavLink exact to="/" onClick={onClick}>
        Users
      </NavLink>
      <NavLink to="/users/add" onClick={onClick}>
        Add
      </NavLink>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  font-size: 2rem;
  padding: 2rem 0 5rem;
  a {
    color: black;
    text-decoration: none;
    padding: 1rem;
    margin-right: 1rem;
    &:hover {
      border-bottom: 4px solid black;
    }
  }
  .active {
    border-bottom: 4px solid black;
    box-shadow: 0 10px 6px -6px rgba(0, 0, 0, 0.125);
  }
`;

export default Header;

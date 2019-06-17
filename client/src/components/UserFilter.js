import React, { useContext, useEffect, useState } from "react";
import { func, string } from "prop-types";
import styled from "styled-components";
import { Context } from "../context";
import { filterByAutocomplete } from "../context/api";

const propTypes = {
  onChange: func.isRequired,
  filterInput: string.isRequired
};

export const radioButtons = [
  {
    checked: true,
    name: "First Name",
    value: "firstname"
  },
  {
    checked: false,
    name: "Last Name",
    value: "lastname"
  },
  {
    checked: false,
    name: "Username",
    value: "username"
  },
  {
    checked: false,
    name: "Email",
    value: "email"
  },
  {
    checked: false,
    name: "Location",
    value: "location"
  },
  {
    checked: false,
    name: "Job Title",
    value: "jobtitle"
  }
];

function UserFilter({ onChange, filterInput }) {
  const context = useContext(Context);

  const [radio, setRadio] = useState("firstname");
  const [isToggled, setIsToggled] = useState(false);

  useEffect(() => {
    filterByAutocomplete({ radio, context, filterInput });
  }, [context, filterInput, radio]);

  function onRadioChange(e) {
    filterByAutocomplete({ radio: e.target.value, context, filterInput });
    setRadio(e.target.value);
  }

  function onsetIsToggled() {
    setIsToggled(!isToggled);
  }

  return (
    <StyledUserFilter>
      <button class="button" onClick={onsetIsToggled}>
        {isToggled ? <h1>Filter By &#9650;</h1> : <h1>Filter By &#9660;</h1>}
      </button>
      <div className="radio-group" onChange={onRadioChange}>
        {isToggled &&
          radioButtons.map(radio => {
            return (
              <label key={radio.value} className="radio">
                <input
                  type="radio"
                  name="filter-by"
                  className="radio"
                  defaultChecked={radio.checked}
                  value={radio.value}
                />
                <span>{radio.name}</span>
              </label>
            );
          })}
      </div>
      {isToggled && (
        <input
          aria-label="filter users"
          id="filterByAutocomplete"
          onChange={onChange}
          value={filterInput}
          type="text"
        />
      )}
    </StyledUserFilter>
  );
}

const StyledUserFilter = styled.div`
  .button {
    margin-bottom: 1rem;
  }

  .radio-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .radio {
    border: 2px solid #f5f5f5;
    border-radius: 5px;
    display: flex;
    align-items: center;
    margin-right: 0.25rem;
    padding: 0 0.5rem;

    span {
      margin-left: 0.5rem;
    }
  }

  input {
    border: 2px solid #f5f5f5;
    height: 2rem;
    margin: 1rem auto;
    padding-left: 0.5rem;
  }

  .radio + .radio {
    margin-left: 0;
  }
`;

UserFilter.propTypes = propTypes;

export default UserFilter;

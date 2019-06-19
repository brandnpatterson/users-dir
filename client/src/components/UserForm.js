import React from "react";
import { func, shape, string } from "prop-types";
import { inputs } from "../data";

const propTypes = {
  formData: shape({
    firstname: string.isRequired,
    lastname: string.isRequired,
    username: string.isRequired,
    email: string.isRequired,
    location: string.isRequired,
    jobtitle: string.isRequired
  }),
  onChange: func.isRequired,
  onSubmit: func.isRequired
};

function UserForm({ children, formData, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} action="post">
      {inputs.map(input => (
        <div key={input.value} className="field">
          <label htmlFor={input.value}>{input.name}</label>
          <div className="control">
            <input
              id={input.value}
              className="input"
              name={input.value}
              type={input.type}
              value={formData[input.value]}
              onChange={onChange}
              maxLength="20"
              required
            />
          </div>
        </div>
      ))}
      {children}
    </form>
  );
}

UserForm.propTypes = propTypes;

export default UserForm;

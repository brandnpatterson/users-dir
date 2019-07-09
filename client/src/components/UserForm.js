import React from "react";
import { bool, func, shape, string } from "prop-types";
import { inputs } from "../data";
import { sanitize } from "dompurify";

const propTypes = {
  formData: shape({
    firstname: shape({
      value: string.isRequired,
      valid: bool.isRequired
    }),
    lastname: shape({
      value: string.isRequired,
      valid: bool.isRequired
    }),
    username: shape({
      value: string.isRequired,
      valid: bool.isRequired
    }),
    email: shape({
      value: string.isRequired,
      valid: bool.isRequired
    }),
    location: shape({
      value: string.isRequired,
      valid: bool.isRequired
    }),
    jobtitle: shape({
      value: string.isRequired,
      valid: bool.isRequired
    })
  }),
  onSubmit: func.isRequired,
  setFormData: func
};

function UserForm({ children, formData, onSubmit, setFormData }) {
  function onChange(e) {
    function isValid() {
      const input = inputs.find(
        input => input.name.toLowerCase().replace(" ", "") === e.target.name
      );

      if (input.regex) {
        return input.regex.test(e.target.value);
      }

      return true;
    }

    setFormData({
      ...formData,
      [e.target.name]: {
        value: sanitize(e.target.value),
        valid: isValid()
      }
    });
  }

  function onHandleSubmit(e) {
    e.preventDefault();

    const formValues = Object.values(formData).map(input => input);

    const validation = inputs.reduce((acc, input, index) => {
      const inputName = input.name.toLowerCase().replace(/\s/g, "");
      const formValue = sanitize(formValues[index].value);

      if (input.regex) {
        const valid = input.regex.test(formValue);

        acc[inputName] = {
          valid,
          value: formValue
        };
      }

      return acc;
    }, {});

    setFormData({
      ...formData,
      ...validation
    });

    const invalid = Object.values(validation).filter(item => !item.valid);

    if (invalid.length === 0) {
      onSubmit();
    }
  }

  return (
    <form onSubmit={onHandleSubmit} action="post">
      {inputs.map((input, index) => {
        const formValues = Object.values(formData).map(input => input);

        return (
          <div key={input.value} className="field">
            <label htmlFor={input.value}>{input.name}</label>
            <div className="control">
              <input
                id={input.value}
                className="input"
                name={input.value}
                type={input.type}
                value={formData[input.value].value}
                onChange={onChange}
                maxLength="50"
              />
              {formValues[index].valid === false && (
                <span style={{ color: "red" }}>{input.error}</span>
              )}
            </div>
          </div>
        );
      })}
      {children}
    </form>
  );
}

UserForm.propTypes = propTypes;

export default UserForm;

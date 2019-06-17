export const inputs = [
  {
    name: "First Name",
    type: "text",
    value: "firstname"
  },
  {
    name: "Last Name",
    type: "text",
    value: "lastname"
  },
  {
    name: "Username",
    type: "text",
    value: "username"
  },
  {
    name: "Email",
    type: "email",
    value: "email"
  },
  {
    name: "Location",
    type: "text",
    value: "location"
  },
  {
    name: "Job Title",
    type: "text",
    value: "jobtitle"
  }
];

// assign the input values to object keys with the value of an empty string
export const initialFormData = {};

inputs.forEach(input => {
  if (!initialFormData[input.value]) initialFormData[input.value] = "";
});

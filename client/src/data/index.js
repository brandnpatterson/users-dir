export const inputs = [
  {
    checked: true,
    error: "Please enter your first name",
    name: "First Name",
    regex: /^[A-Za-z\s]+$/,
    value: "firstname"
  },
  {
    checked: false,
    error: "Please enter your last name",
    name: "Last Name",
    regex: /^[A-Za-z\s]+$/,
    value: "lastname"
  },
  {
    checked: false,
    error: "Please enter a username",
    name: "Username",
    regex: /^[a-zA-Z0-9]+$/,
    value: "username"
  },
  {
    checked: false,
    error: "Please enter a valid email",
    name: "Email",
    regex: /\S+@\S+\.\S+/,
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

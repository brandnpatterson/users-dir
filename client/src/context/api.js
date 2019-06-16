import axios from "axios";
import {
  FETCH_USERS,
  FILTER_USERS,
  FILTER_USER,
  FLASH_MESSAGE,
  REDIRECT_STATUS,
  LOADING_STATUS
} from "./actions";

const usersUrl = "/api/users";

/* GET */
export async function fetchUsers({ context }) {
  const response = await axios.get(usersUrl);

  context.dispatch({
    type: FETCH_USERS,
    payload: response.data
  });

  context.dispatch({
    type: LOADING_STATUS,
    payload: false
  });
}

/* POST */
export async function postNewUser({ context, formData }) {
  try {
    await axios.post(usersUrl, formData);

    fetchUsers({ context });

    context.dispatch({
      type: REDIRECT_STATUS,
      payload: { data: formData, status: true }
    });
  } catch (error) {
    context.dispatch({
      type: FLASH_MESSAGE,
      payload: "User already exists with that username"
    });
  }
}

/* PUT */
export async function putUpdateUser({ context, formData }) {
  try {
    await axios.put(`${usersUrl}/${context.state.userToEdit.id}`, formData);

    fetchUsers({ context });

    context.dispatch({
      type: FLASH_MESSAGE,
      payload: `${formData.firstname} updated successfully`
    });
  } catch (error) {
    context.dispatch({
      type: FLASH_MESSAGE,
      payload: `Unable to update ${formData.firstname}. Please try again`
    });
  }
}

/* DELETE */
export async function deleteUser({ context, formData }) {
  try {
    await axios.delete(`${usersUrl}/${context.state.userToEdit.id}`);

    fetchUsers({ context });

    context.dispatch({
      type: REDIRECT_STATUS,
      payload: { data: null, status: true }
    });
  } catch (error) {
    context.dispatch({
      type: FLASH_MESSAGE,
      payload: `Unable to delete ${formData.firstname}. Please try again`
    });
  }
}

export function resetStatus({ context }) {
  context.dispatch({
    type: FLASH_MESSAGE,
    payload: null
  });

  context.dispatch({
    type: REDIRECT_STATUS,
    payload: { data: null, status: false }
  });
}

/* Filter to single user */
export function filterToSingleUser({ context, username }) {
  const user = context.state.users.filter(user => user.username === username);

  context.dispatch({
    type: FILTER_USER,
    payload: user[0]
  });
}

/* Filter by username */
export function filterByUsername({ context, value }) {
  const filtered = context.state.users.filter(user => {
    return user.firstname.toLowerCase().indexOf(value.toLowerCase()) > -1;
  });

  context.dispatch({
    type: FILTER_USERS,
    payload: filtered
  });
}

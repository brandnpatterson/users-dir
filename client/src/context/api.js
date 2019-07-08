import axios from "axios";
import {
  FETCH_USERS,
  FILTER_USER,
  FILTER_USERS,
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
  const userId = context.state.userSingle.id;

  try {
    await axios.put(`${usersUrl}/${userId}`, formData);

    fetchUsers({ context });

    context.dispatch({
      type: FLASH_MESSAGE,
      payload: `${formData.firstname.value} updated successfully`
    });
  } catch (error) {
    context.dispatch({
      type: FLASH_MESSAGE,
      payload: `Unable to update ${formData.firstname.value}. Please try again`
    });
  }
}

/* DELETE */
export async function deleteUser({ context }) {
  const userId = context.state.userSingle.id;

  try {
    await axios.delete(`${usersUrl}/${userId}`);

    fetchUsers({ context });

    context.dispatch({
      type: REDIRECT_STATUS,
      payload: { data: null, status: true }
    });
  } catch (error) {
    context.dispatch({
      type: FLASH_MESSAGE,
      payload: `Unable to delete user. Please try again`
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

/* Filter single user */
export function filterUserSingle({ context, username }) {
  const userSingle = context.state.users.filter(
    user => user.username === username
  )[0];

  context.dispatch({
    type: FILTER_USER,
    payload: userSingle
  });
}

/* Filter users by autocomplete */
export function filterByAutocomplete({ context, filterInput, radio }) {
  if (radio) {
    const usersFiltered = context.state.users.filter(user => {
      return user[radio].toLowerCase().indexOf(filterInput.toLowerCase()) > -1;
    });

    return context.dispatch({
      type: FILTER_USERS,
      payload: usersFiltered
    });
  }

  context.dispatch({
    type: FILTER_USERS,
    payload: context.state.users
  });
}

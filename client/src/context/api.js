import axios from "axios";
import {
  FETCH_USERS,
  EDIT_USER,
  DELETE_USER,
  FLASH_MESSAGE,
  REDIRECT_STATUS
} from "./actions";

const usersUrl = "/api/users";

/* GET */
export async function fetchUsers({ context }) {
  const response = await axios.get(usersUrl);

  context.dispatch({
    type: FETCH_USERS,
    payload: response.data
  });
}

/* POST */
export async function postNewUser({ context, formData }) {
  try {
    await axios.post(usersUrl, formData);

    fetchUsers({ context });

    context.dispatch({
      type: REDIRECT_STATUS,
      payload: { formData, value: true }
    });
  } catch (error) {
    context.dispatch({
      type: FLASH_MESSAGE,
      payload: "Something went wrong. Please try again."
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
      payload: `${formData.firstname} updated successfully.`
    });
  } catch (error) {
    context.dispatch({
      type: FLASH_MESSAGE,
      payload: `Unable to update ${formData.firstname}. Please try again.`
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
      payload: { formData: null, value: true }
    });
  } catch (error) {
    context.dispatch({
      type: FLASH_MESSAGE,
      payload: `Unable to delete ${formData.firstname}. Please try again.`
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
    payload: { formData: null, value: null }
  });
}

export function filterToEditUser({ context, users, userId }) {
  const user = users.filter(user => user.id === userId);

  context.dispatch({
    type: EDIT_USER,
    payload: user[0]
  });
}

export function filterToDeleteUser({ context, users, userId }) {
  const user = users.filter(user => user.id === userId);

  context.dispatch({
    type: DELETE_USER,
    payload: user[0]
  });
}

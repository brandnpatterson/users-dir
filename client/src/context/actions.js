export const FETCH_USERS = "FETCH_USERS";
export const EDIT_USER = "EDIT_USER";
export const DELETE_USER = "DELETE_USER";
export const REDIRECT_STATUS = "REDIRECT_STATUS";
export const FLASH_MESSAGE = "FLASH_MESSAGE";

export const actions = {
  [FETCH_USERS]: (state, action) => ({
    ...state,
    users: [...action.payload]
  }),
  [EDIT_USER]: (state, action) => ({
    ...state,
    userToEdit: action.payload
  }),
  [DELETE_USER]: (state, action) => ({
    ...state,
    userToDelete: action.payload
  }),
  [REDIRECT_STATUS]: (state, action) => ({
    ...state,
    redirect: {
      value: action.payload.value,
      data: action.payload.formData
    }
  }),
  [FLASH_MESSAGE]: (state, action) => ({
    ...state,
    flashMessage: action.payload
  })
};
